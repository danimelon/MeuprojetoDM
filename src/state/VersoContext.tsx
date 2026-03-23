import { createContext, useContext, useState } from 'react';
import { filters, styleExtras } from '../data/filters';
import { mockPhotos } from '../data/mockPhotos';

type CompareMode = 'after' | 'before';
type EditorPanel = 'Filtros' | 'Estilo' | 'Ajustes' | 'Comparar';
type SavedLook = {
  id: string;
  photoName: string;
  filterName: string;
  styleExtraName: string;
  intensity: number;
};

type VersoContextValue = {
  selectedFilterIndex: number;
  selectedStyleExtraIndex: number;
  selectedPhotoIndex: number;
  intensity: number;
  compareMode: CompareMode;
  activePanel: EditorPanel;
  favoriteFilterIndexes: number[];
  savedLooks: SavedLook[];
  setSelectedFilterIndex: (index: number) => void;
  setSelectedStyleExtraIndex: (index: number) => void;
  setSelectedPhotoIndex: (index: number) => void;
  setIntensity: (value: number) => void;
  setCompareMode: (mode: CompareMode) => void;
  setActivePanel: (panel: EditorPanel) => void;
  startEditingWithFilter: (index: number) => void;
  startEditingWithPhoto: (index: number) => void;
  toggleFavoriteFilter: (index: number) => void;
  saveCurrentLook: () => void;
};

const defaultValue: VersoContextValue = {
  selectedFilterIndex: 0,
  selectedStyleExtraIndex: styleExtras.length - 1,
  selectedPhotoIndex: 0,
  intensity: 75,
  compareMode: 'after',
  activePanel: 'Filtros',
  favoriteFilterIndexes: [0, 5],
  savedLooks: [],
  setSelectedFilterIndex: () => {},
  setSelectedStyleExtraIndex: () => {},
  setSelectedPhotoIndex: () => {},
  setIntensity: () => {},
  setCompareMode: () => {},
  setActivePanel: () => {},
  startEditingWithFilter: () => {},
  startEditingWithPhoto: () => {},
  toggleFavoriteFilter: () => {},
  saveCurrentLook: () => {},
};

const VersoContext = createContext<VersoContextValue>(defaultValue);

export function VersoProvider({ children }: { children: JSX.Element }) {
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);
  const [selectedStyleExtraIndex, setSelectedStyleExtraIndex] = useState(styleExtras.length - 1);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [intensity, setIntensity] = useState(75);
  const [compareMode, setCompareMode] = useState<CompareMode>('after');
  const [activePanel, setActivePanel] = useState<EditorPanel>('Filtros');
  const [favoriteFilterIndexes, setFavoriteFilterIndexes] = useState<number[]>([0, 5]);
  const [savedLooks, setSavedLooks] = useState<SavedLook[]>([]);

  return (
    <VersoContext.Provider
      value={{
        selectedFilterIndex,
        selectedStyleExtraIndex,
        selectedPhotoIndex,
        intensity,
        compareMode,
        activePanel,
        favoriteFilterIndexes,
        savedLooks,
        setSelectedFilterIndex: (index) => {
          if (filters[index]) {
            setSelectedFilterIndex(index);
            setCompareMode('after');
            setActivePanel('Filtros');
          }
        },
        setSelectedStyleExtraIndex: (index) => {
          if (styleExtras[index]) {
            setSelectedStyleExtraIndex(index);
          }
        },
        setSelectedPhotoIndex: (index) => {
          if (mockPhotos[index]) {
            setSelectedPhotoIndex(index);
            setCompareMode('after');
          }
        },
        setIntensity,
        setCompareMode,
        setActivePanel,
        startEditingWithFilter: (index) => {
          if (filters[index]) {
            setSelectedFilterIndex(index);
            setCompareMode('after');
            setActivePanel('Filtros');
          }
        },
        startEditingWithPhoto: (index) => {
          if (mockPhotos[index]) {
            setSelectedPhotoIndex(index);
            setCompareMode('after');
            setActivePanel('Filtros');
          }
        },
        toggleFavoriteFilter: (index) => {
          if (!filters[index]) {
            return;
          }

          if (favoriteFilterIndexes.includes(index)) {
            setFavoriteFilterIndexes(favoriteFilterIndexes.filter((item) => item !== index));
            return;
          }

          setFavoriteFilterIndexes([...favoriteFilterIndexes, index]);
        },
        saveCurrentLook: () => {
          const currentFilter = filters[selectedFilterIndex];
          const currentStyleExtra = styleExtras[selectedStyleExtraIndex];
          const currentPhoto = mockPhotos[selectedPhotoIndex];

          setSavedLooks([
            {
              id: `${Date.now()}`,
              photoName: currentPhoto.name,
              filterName: currentFilter.name,
              styleExtraName: currentStyleExtra.name,
              intensity,
            },
            ...savedLooks,
          ]);
        },
      }}
    >
      {children}
    </VersoContext.Provider>
  );
}

export function useVersoEditor() {
  return useContext(VersoContext);
}
