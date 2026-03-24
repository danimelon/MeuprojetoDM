import { createContext, useContext, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
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
  importedPhotoUri: string | null;
  importedPhotoName: string | null;
  favoriteFilterIndexes: number[];
  savedLooks: SavedLook[];
  proUnlocked: boolean;
  setSelectedFilterIndex: (index: number) => void;
  setSelectedStyleExtraIndex: (index: number) => void;
  setSelectedPhotoIndex: (index: number) => void;
  setIntensity: (value: number) => void;
  setCompareMode: (mode: CompareMode) => void;
  setActivePanel: (panel: EditorPanel) => void;
  startEditingWithFilter: (index: number) => void;
  startEditingWithPhoto: (index: number) => void;
  importRealPhoto: () => Promise<void>;
  toggleFavoriteFilter: (index: number) => void;
  saveCurrentLook: () => void;
  unlockProPreview: () => void;
};

const defaultValue: VersoContextValue = {
  selectedFilterIndex: 0,
  selectedStyleExtraIndex: styleExtras.length - 1,
  selectedPhotoIndex: 0,
  intensity: 75,
  compareMode: 'after',
  activePanel: 'Filtros',
  importedPhotoUri: null,
  importedPhotoName: null,
  favoriteFilterIndexes: [0, 5],
  savedLooks: [],
  proUnlocked: false,
  setSelectedFilterIndex: () => {},
  setSelectedStyleExtraIndex: () => {},
  setSelectedPhotoIndex: () => {},
  setIntensity: () => {},
  setCompareMode: () => {},
  setActivePanel: () => {},
  startEditingWithFilter: () => {},
  startEditingWithPhoto: () => {},
  importRealPhoto: async () => {},
  toggleFavoriteFilter: () => {},
  saveCurrentLook: () => {},
  unlockProPreview: () => {},
};

const VersoContext = createContext<VersoContextValue>(defaultValue);

export function VersoProvider({ children }: { children: JSX.Element }) {
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);
  const [selectedStyleExtraIndex, setSelectedStyleExtraIndex] = useState(styleExtras.length - 1);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [intensity, setIntensity] = useState(75);
  const [compareMode, setCompareMode] = useState<CompareMode>('after');
  const [activePanel, setActivePanel] = useState<EditorPanel>('Filtros');
  const [importedPhotoUri, setImportedPhotoUri] = useState<string | null>(null);
  const [importedPhotoName, setImportedPhotoName] = useState<string | null>(null);
  const [favoriteFilterIndexes, setFavoriteFilterIndexes] = useState<number[]>([0, 5]);
  const [savedLooks, setSavedLooks] = useState<SavedLook[]>([]);
  const [proUnlocked, setProUnlocked] = useState(false);

  return (
    <VersoContext.Provider
      value={{
        selectedFilterIndex,
        selectedStyleExtraIndex,
        selectedPhotoIndex,
        intensity,
        compareMode,
        activePanel,
        importedPhotoUri,
        importedPhotoName,
        favoriteFilterIndexes,
        savedLooks,
        proUnlocked,
        setSelectedFilterIndex: (index) => {
          if (filters[index] && (!filters[index].premium || proUnlocked)) {
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
            setImportedPhotoUri(null);
            setImportedPhotoName(null);
            setCompareMode('after');
          }
        },
        setIntensity,
        setCompareMode,
        setActivePanel,
        startEditingWithFilter: (index) => {
          if (filters[index] && (!filters[index].premium || proUnlocked)) {
            setSelectedFilterIndex(index);
            setCompareMode('after');
            setActivePanel('Filtros');
          }
        },
        startEditingWithPhoto: (index) => {
          if (mockPhotos[index]) {
            setSelectedPhotoIndex(index);
            setImportedPhotoUri(null);
            setImportedPhotoName(null);
            setCompareMode('after');
            setActivePanel('Filtros');
          }
        },
        importRealPhoto: async () => {
          const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

          if (!permission.granted) {
            return;
          }

          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
          });

          if (result.canceled || !result.assets?.length) {
            return;
          }

          const asset = result.assets[0];

          setImportedPhotoUri(asset.uri);
          setImportedPhotoName(asset.fileName ?? 'Foto importada');
          setCompareMode('after');
          setActivePanel('Filtros');
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
          const currentPhotoName = importedPhotoName ?? mockPhotos[selectedPhotoIndex].name;

          setSavedLooks([
            {
              id: `${Date.now()}`,
              photoName: currentPhotoName,
              filterName: currentFilter.name,
              styleExtraName: currentStyleExtra.name,
              intensity,
            },
            ...savedLooks,
          ]);
        },
        unlockProPreview: () => {
          setProUnlocked(true);
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
