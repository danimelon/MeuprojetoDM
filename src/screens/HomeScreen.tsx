import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CollectionCard, FilterCard, StyleExtraCard } from '../components/cards';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenHeader } from '../components/ScreenHeader';
import { SectionTitle } from '../components/SectionTitle';
import { collections, filters, highlightedFilters, styleExtras } from '../data/filters';
import { mockPhotos } from '../data/mockPhotos';
import { useVersoEditor } from '../state/VersoContext';
import { colors, radii, spacing } from '../theme/tokens';

type HomeScreenProps = {
  onStartEditing: () => void;
  onOpenPremium: () => void;
};

export function HomeScreen({ onStartEditing, onOpenPremium }: HomeScreenProps) {
  const {
    favoriteFilterIndexes,
    importRealPhoto,
    importedPhotoName,
    proUnlocked,
    startEditingWithFilter,
    startEditingWithPhoto,
  } = useVersoEditor();
  const favoriteFilters = favoriteFilterIndexes.map((index) => filters[index]).filter(Boolean);

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <ScreenHeader title="Verso" subtitle="poesia visual para o cotidiano" />

      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Verso Studio</Text>
        <Text style={styles.heroTitle}>Transforme o cotidiano em arte.</Text>
        <Text style={styles.heroCopy}>
          Filtros inspirados em câmeras icônicas e um fluxo de edição pensado para criar imagens
          com atmosfera, de forma simples e sofisticada.
        </Text>
        <View style={styles.heroActions}>
          <PrimaryButton label="Editar uma foto" onPress={onStartEditing} />
          <PrimaryButton
            label={importedPhotoName ? 'Trocar foto real' : 'Importar foto real'}
            onPress={async () => {
              await importRealPhoto();
              onStartEditing();
            }}
            variant="light"
          />
        </View>
      </View>

      <SectionTitle title="Comece por uma cena" action="mock gallery" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
        {mockPhotos.map((photo, index) => (
          <TouchableOpacity
            key={photo.name}
            activeOpacity={0.85}
            onPress={() => {
              startEditingWithPhoto(index);
              onStartEditing();
            }}
            style={styles.photoStartCard}
          >
            <View style={[styles.photoStartSwatch, { backgroundColor: photo.background }]}>
              <View style={[styles.photoStartGlow, { backgroundColor: photo.glow }]} />
            </View>
            <Text style={styles.photoStartName}>{photo.name}</Text>
            <Text style={styles.photoStartMeta}>{photo.mood}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <SectionTitle title="Coleções" action="ver tudo" />
      <View style={styles.collectionGrid}>
        {collections.map((collection) => (
          <CollectionCard key={collection.name} collection={collection} />
        ))}
      </View>

      <SectionTitle title="Filtros em destaque" action="explorar" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
        {highlightedFilters.map((filter) => {
          const filterIndex = indexOfFilter(filter.name);

          return (
            <TouchableOpacity
              key={filter.name}
              activeOpacity={0.85}
              onPress={() => {
                if (filter.premium && !proUnlocked) {
                  onOpenPremium();
                  return;
                }
                startEditingWithFilter(filterIndex);
                onStartEditing();
              }}
            >
              <FilterCard filter={filter} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <SectionTitle title="Favoritos rápidos" action={`${favoriteFilters.length} salvos`} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
        {favoriteFilters.map((filter) => {
          const filterIndex = indexOfFilter(filter.name);

          return (
            <TouchableOpacity
              key={filter.name}
              activeOpacity={0.85}
              onPress={() => {
                if (filter.premium && !proUnlocked) {
                  onOpenPremium();
                  return;
                }
                startEditingWithFilter(filterIndex);
                onStartEditing();
              }}
            >
              <FilterCard filter={filter} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <SectionTitle title="Toques extras" action="opcional" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
        {styleExtras.map((styleExtra) => (
          <StyleExtraCard key={styleExtra.name} styleExtra={styleExtra} />
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.lg,
  },
  hero: {
    padding: spacing.lg,
    borderRadius: radii.xl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  eyebrow: {
    color: colors.accent,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    fontSize: 12,
    fontWeight: '700',
  },
  heroTitle: {
    color: colors.text,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '700',
    letterSpacing: -1.2,
  },
  heroCopy: {
    color: colors.mutedText,
    lineHeight: 24,
    fontSize: 15,
  },
  heroActions: {
    gap: spacing.sm,
    alignItems: 'flex-start',
  },
  photoStartCard: {
    width: 170,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  photoStartSwatch: {
    height: 112,
    borderRadius: radii.md,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: spacing.sm,
  },
  photoStartGlow: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  photoStartName: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 16,
  },
  photoStartMeta: {
    color: colors.mutedText,
    fontSize: 12,
    lineHeight: 18,
  },
  collectionGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  horizontalList: {
    gap: spacing.md,
    paddingRight: spacing.lg,
  },
});

function indexOfFilter(filterName: string) {
  return filters.findIndex((item) => item.name === filterName);
}
