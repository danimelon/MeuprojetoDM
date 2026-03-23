import { StyleSheet, Text, View } from 'react-native';
import { Collection, Filter, StyleExtra } from '../data/filters';
import { colors, radii, spacing } from '../theme/tokens';

export function CollectionCard({ collection }: { collection: Collection; key?: string }) {
  return (
    <View style={styles.collectionCard}>
      <Text style={styles.collectionName}>{collection.name}</Text>
      <Text style={styles.collectionDescription}>{collection.description}</Text>
    </View>
  );
}

export function FilterCard({ filter }: { filter: Filter; key?: string }) {
  return (
    <View style={styles.filterCard}>
      <View style={[styles.filterSwatch, { backgroundColor: filter.swatch }]} />
      {filter.premium && (
        <View style={styles.premiumBadge}>
          <Text style={styles.premiumBadgeText}>PRO</Text>
        </View>
      )}
      <Text style={styles.filterName}>{filter.name}</Text>
      <Text style={styles.filterMeta}>{filter.family}</Text>
      <Text style={styles.filterDescription}>{filter.description}</Text>
    </View>
  );
}

export function StyleExtraCard({ styleExtra }: { styleExtra: StyleExtra; key?: string }) {
  return (
    <View style={styles.styleExtraCard}>
      <View style={[styles.styleExtraPreview, styleExtra.featured && styles.styleExtraPreviewFeatured]}>
        <View style={styles.styleExtraInner} />
      </View>
      <Text style={styles.styleExtraName}>{styleExtra.name}</Text>
      <Text style={styles.styleExtraDescription}>{styleExtra.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  collectionCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 132,
    justifyContent: 'space-between',
  },
  collectionName: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
  },
  collectionDescription: {
    color: colors.mutedText,
    lineHeight: 21,
    fontSize: 13,
  },
  filterCard: {
    width: 170,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  filterSwatch: {
    height: 112,
    borderRadius: radii.md,
  },
  premiumBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accentMuted,
    borderRadius: radii.round,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
  },
  premiumBadgeText: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  filterName: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 16,
  },
  filterMeta: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  filterDescription: {
    color: colors.mutedText,
    lineHeight: 20,
    fontSize: 13,
  },
  styleExtraCard: {
    width: 128,
    gap: spacing.sm,
  },
  styleExtraPreview: {
    width: '100%',
    height: 140,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
  },
  styleExtraPreviewFeatured: {
    borderColor: colors.accent,
    borderWidth: 1.5,
  },
  styleExtraInner: {
    flex: 1,
    borderRadius: radii.md,
    backgroundColor: '#D5C4B3',
  },
  styleExtraName: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 15,
  },
  styleExtraDescription: {
    color: colors.mutedText,
    fontSize: 12,
    lineHeight: 18,
  },
});
