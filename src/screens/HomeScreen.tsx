import { ScrollView, StyleSheet, View } from 'react-native';
import { CollectionCard, FilterCard, StyleExtraCard } from '../components/cards';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenHeader } from '../components/ScreenHeader';
import { SectionTitle } from '../components/SectionTitle';
import { collections, highlightedFilters, styleExtras } from '../data/filters';
import { colors, radii, spacing } from '../theme/tokens';
import { Text } from 'react-native';

type HomeScreenProps = {
  onStartEditing: () => void;
};

export function HomeScreen({ onStartEditing }: HomeScreenProps) {
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
        <PrimaryButton label="Editar uma foto" onPress={onStartEditing} />
      </View>

      <SectionTitle title="Coleções" action="ver tudo" />
      <View style={styles.collectionGrid}>
        {collections.map((collection) => (
          <CollectionCard key={collection.name} collection={collection} />
        ))}
      </View>

      <SectionTitle title="Filtros em destaque" action="explorar" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
        {highlightedFilters.map((filter) => (
          <FilterCard key={filter.name} filter={filter} />
        ))}
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
  collectionGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  horizontalList: {
    gap: spacing.md,
    paddingRight: spacing.lg,
  },
});
