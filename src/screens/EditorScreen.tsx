import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useMemo } from 'react';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenHeader } from '../components/ScreenHeader';
import { SectionTitle } from '../components/SectionTitle';
import { filters, styleExtras } from '../data/filters';
import { mockPhotos } from '../data/mockPhotos';
import { useVersoEditor } from '../state/VersoContext';
import { colors, radii, spacing } from '../theme/tokens';

const intensityPresets = [25, 50, 75, 100];

export function EditorScreen() {
  const {
    selectedFilterIndex,
    setSelectedFilterIndex,
    selectedStyleExtraIndex,
    setSelectedStyleExtraIndex,
    selectedPhotoIndex,
    setSelectedPhotoIndex,
    intensity,
    setIntensity,
    compareMode,
    setCompareMode,
    activePanel,
    setActivePanel,
    favoriteFilterIndexes,
    toggleFavoriteFilter,
    savedLooks,
    saveCurrentLook,
  } = useVersoEditor();

  const selectedFilter = filters[selectedFilterIndex];
  const selectedStyleExtra = styleExtras[selectedStyleExtraIndex];
  const selectedPhoto = mockPhotos[selectedPhotoIndex];
  const isFavoriteFilter = favoriteFilterIndexes.includes(selectedFilterIndex);

  const previewPalette = useMemo(() => {
    const base = compareMode === 'before' ? selectedPhoto.background : selectedFilter.swatch;

    return {
      background: base,
      glow: compareMode === 'before' ? selectedPhoto.glow : selectedPhoto.glow,
      accent: compareMode === 'before' ? selectedPhoto.accent : colors.accentMuted,
      badge: compareMode === 'before' ? 'Original' : selectedStyleExtra.name,
    };
  }, [compareMode, selectedFilter.swatch, selectedPhoto, selectedStyleExtra.name]);

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <ScreenHeader title="Editor" subtitle="edite com atmosfera e leveza" badge="EX" />

      <View style={styles.editorCard}>
        <View style={styles.editorTopBar}>
          <Text style={styles.editorLabel}>Imagem</Text>
          <Text style={styles.editorAction}>Exportar</Text>
        </View>

        <SectionTitle title="Foto base" action={selectedPhoto.mood} />
        <View style={styles.photoPickerRow}>
          {mockPhotos.map((photo, index) => (
            <TouchableOpacity
              key={photo.name}
              activeOpacity={0.85}
              onPress={() => setSelectedPhotoIndex(index)}
              style={[styles.photoPickerCard, index === selectedPhotoIndex && styles.photoPickerCardActive]}
            >
              <View style={[styles.photoPickerSwatch, { backgroundColor: photo.background }]}>
                <View style={[styles.photoPickerGlow, { backgroundColor: photo.glow }]} />
              </View>
              <Text style={[styles.photoPickerName, index === selectedPhotoIndex && styles.photoPickerNameActive]}>
                {photo.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.photoFrame}>
          <View style={styles.photoMat}>
            <View style={[styles.photoPreview, { backgroundColor: previewPalette.background }]}>
              <View style={[styles.photoGlow, { backgroundColor: previewPalette.glow }]} />
              <View style={[styles.photoAccent, { backgroundColor: previewPalette.accent }]} />
            </View>
          </View>
          <View style={styles.frameBadge}>
            <Text style={styles.frameBadgeText}>{previewPalette.badge}</Text>
          </View>
        </View>

        <View style={styles.editorSection}>
          <Text style={styles.editorSectionTitle}>Filtro selecionado</Text>
          <View style={styles.selectedFilterCard}>
            <View style={[styles.selectedFilterSwatch, { backgroundColor: selectedFilter.swatch }]} />
            <View style={styles.selectedFilterInfo}>
              <Text style={styles.selectedFilterName}>{selectedFilter.name}</Text>
              <Text style={styles.selectedFilterCopy}>{selectedFilter.description}</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => toggleFavoriteFilter(selectedFilterIndex)}
              style={[styles.favoriteButton, isFavoriteFilter && styles.favoriteButtonActive]}
            >
              <Text style={[styles.favoriteButtonText, isFavoriteFilter && styles.favoriteButtonTextActive]}>
                {isFavoriteFilter ? 'Favorito' : 'Salvar'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.editorSection}>
          <Text style={styles.editorSectionTitle}>Intensidade</Text>
          <View style={styles.sliderTrack}>
            <View style={[styles.sliderProgress, { width: `${intensity}%` }]} />
            <View style={[styles.sliderThumb, { left: `${Math.max(0, intensity - 2)}%` }]} />
          </View>
          <View style={styles.intensityRow}>
            {intensityPresets.map((step) => (
              <TouchableOpacity
                key={step}
                activeOpacity={0.85}
                onPress={() => setIntensity(step)}
                style={[styles.intensityChip, intensity === step && styles.intensityChipActive]}
              >
                <Text style={[styles.intensityChipText, intensity === step && styles.intensityChipTextActive]}>
                  {step}%
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <SectionTitle title="Escolha rápida" action="filtros" />
        <View style={styles.chipRow}>
          {filters.slice(0, 4).map((filter, index) => (
            <TouchableOpacity
              key={filter.name}
              activeOpacity={0.85}
              onPress={() => setSelectedFilterIndex(index)}
              style={[styles.chip, index === selectedFilterIndex && styles.chipActive]}
            >
              <Text style={[styles.chipText, index === selectedFilterIndex && styles.chipTextActive]}>
                {filter.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.tabRow}>
          {(['Filtros', 'Estilo', 'Ajustes', 'Comparar'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              activeOpacity={0.85}
              onPress={() => setActivePanel(tab)}
              style={[styles.tab, activePanel === tab && styles.tabActive]}
            >
              <Text style={[styles.tabText, activePanel === tab && styles.tabTextActive]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {activePanel === 'Estilo' && (
          <View style={styles.activePanel}>
            <Text style={styles.panelTitle}>Toques finais</Text>
            <View style={styles.styleExtraRow}>
              {styleExtras.map((styleExtra, index) => (
                <TouchableOpacity
                  key={styleExtra.name}
                  activeOpacity={0.85}
                  onPress={() => setSelectedStyleExtraIndex(index)}
                  style={[styles.styleExtraChip, index === selectedStyleExtraIndex && styles.styleExtraChipActive]}
                >
                  <Text
                    style={[
                      styles.styleExtraChipText,
                      index === selectedStyleExtraIndex && styles.styleExtraChipTextActive,
                    ]}
                  >
                    {styleExtra.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {activePanel === 'Ajustes' && (
          <View style={styles.activePanel}>
            <Text style={styles.panelTitle}>Ajustes rápidos</Text>
            <Text style={styles.panelCopy}>
              Intensidade em {intensity}% com foco em acabamento clean e resposta visual rápida.
            </Text>
          </View>
        )}

        {activePanel === 'Comparar' && (
          <View style={styles.activePanel}>
            <Text style={styles.panelTitle}>Antes / depois</Text>
            <View style={styles.compareRow}>
              {(['before', 'after'] as const).map((mode) => (
                <TouchableOpacity
                  key={mode}
                  activeOpacity={0.85}
                  onPress={() => setCompareMode(mode)}
                  style={[styles.compareChip, compareMode === mode && styles.compareChipActive]}
                >
                  <Text style={[styles.compareChipText, compareMode === mode && styles.compareChipTextActive]}>
                    {mode === 'before' ? 'Original' : 'Com filtro'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>

      <View style={styles.helperCard}>
        <Text style={styles.helperTitle}>Editor MVP em andamento</Text>
        <Text style={styles.helperCopy}>
          Agora o editor já tem foto mock selecionável, troca de filtro, intensidade e comparação
          antes/depois. O próximo salto é conectar imagem real e exportação.
        </Text>
        <View style={styles.helperActions}>
          <PrimaryButton label="Salvar look" onPress={saveCurrentLook} />
          <Text style={styles.savedLooksText}>{savedLooks.length} look(s) salvo(s)</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.lg,
  },
  editorCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  editorTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  photoPickerRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  photoPickerCard: {
    flex: 1,
    gap: 8,
    padding: 8,
    borderRadius: radii.lg,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.card,
  },
  photoPickerCardActive: {
    borderColor: colors.accent,
    backgroundColor: colors.surface,
  },
  photoPickerSwatch: {
    height: 72,
    borderRadius: radii.md,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: 8,
  },
  photoPickerGlow: {
    alignSelf: 'flex-end',
    width: 28,
    height: 28,
    borderRadius: 14,
    opacity: 0.9,
  },
  photoPickerName: {
    color: colors.mutedText,
    fontWeight: '600',
    fontSize: 12,
  },
  photoPickerNameActive: {
    color: colors.accent,
  },
  editorLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
  },
  editorAction: {
    color: colors.accent,
    fontWeight: '700',
  },
  photoFrame: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  photoMat: {
    backgroundColor: colors.photoMat,
    borderRadius: radii.xl,
    padding: 12,
    width: '100%',
  },
  photoPreview: {
    width: '100%',
    minHeight: 280,
    borderRadius: radii.lg,
    overflow: 'hidden',
    backgroundColor: '#B49476',
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  photoGlow: {
    alignSelf: 'flex-end',
    width: 140,
    height: 140,
    borderRadius: 999,
    backgroundColor: '#E9D4B5',
    opacity: 0.9,
  },
  photoAccent: {
    width: 88,
    height: 88,
    borderRadius: radii.round,
    backgroundColor: colors.accentMuted,
    borderWidth: 3,
    borderColor: colors.accent,
  },
  frameBadge: {
    position: 'absolute',
    bottom: 16,
    right: 12,
    backgroundColor: colors.surface,
    borderRadius: radii.round,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  frameBadgeText: {
    color: colors.accent,
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 0.4,
  },
  editorSection: {
    gap: spacing.sm,
  },
  editorSectionTitle: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 15,
  },
  selectedFilterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    padding: spacing.md,
  },
  selectedFilterSwatch: {
    width: 52,
    height: 52,
    borderRadius: radii.md,
  },
  selectedFilterInfo: {
    flex: 1,
    gap: 4,
  },
  favoriteButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: radii.round,
    backgroundColor: colors.surface,
  },
  favoriteButtonActive: {
    backgroundColor: colors.accent,
  },
  favoriteButtonText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '700',
  },
  favoriteButtonTextActive: {
    color: colors.onAccent,
  },
  selectedFilterName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  selectedFilterCopy: {
    color: colors.mutedText,
    lineHeight: 19,
    fontSize: 13,
  },
  sliderTrack: {
    height: 6,
    borderRadius: radii.round,
    backgroundColor: colors.divider,
    justifyContent: 'center',
  },
  sliderProgress: {
    position: 'absolute',
    height: 6,
    borderRadius: radii.round,
    backgroundColor: colors.accent,
  },
  sliderThumb: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderRadius: radii.round,
    backgroundColor: colors.surface,
    borderWidth: 3,
    borderColor: colors.accent,
  },
  intensityRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  intensityChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: radii.round,
    backgroundColor: colors.card,
  },
  intensityChipActive: {
    backgroundColor: colors.accentMuted,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  intensityChipText: {
    color: colors.mutedText,
    fontWeight: '600',
    fontSize: 12,
  },
  intensityChipTextActive: {
    color: colors.accent,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: radii.round,
    backgroundColor: colors.card,
  },
  chipActive: {
    backgroundColor: colors.accent,
  },
  chipText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '500',
  },
  chipTextActive: {
    color: colors.onAccent,
    fontWeight: '700',
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderRadius: radii.round,
    backgroundColor: colors.card,
  },
  tabActive: {
    backgroundColor: colors.accentMuted,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  tabText: {
    color: colors.mutedText,
    fontWeight: '600',
    fontSize: 13,
  },
  tabTextActive: {
    color: colors.accent,
  },
  activePanel: {
    gap: spacing.sm,
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: radii.lg,
  },
  panelTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  panelCopy: {
    color: colors.mutedText,
    fontSize: 13,
    lineHeight: 20,
  },
  styleExtraRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  styleExtraChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: radii.round,
    backgroundColor: colors.surface,
  },
  styleExtraChipActive: {
    backgroundColor: colors.accent,
  },
  styleExtraChipText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
  styleExtraChipTextActive: {
    color: colors.onAccent,
  },
  compareRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  compareChip: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radii.round,
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  compareChipActive: {
    backgroundColor: colors.accent,
  },
  compareChipText: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 13,
  },
  compareChipTextActive: {
    color: colors.onAccent,
  },
  helperCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  helperTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  helperCopy: {
    color: colors.mutedText,
    fontSize: 15,
    lineHeight: 24,
  },
  helperActions: {
    gap: spacing.sm,
  },
  savedLooksText: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '600',
  },
});
