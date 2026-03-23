import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ScreenHeader } from '../components/ScreenHeader';
import { filters, styleExtras } from '../data/filters';
import { mockPhotos } from '../data/mockPhotos';
import { useVersoEditor } from '../state/VersoContext';
import { colors, radii, spacing } from '../theme/tokens';

const items = [
  'Coleções salvas',
  'Assinatura',
  'Preferências visuais',
  'Ajuda e suporte',
];

export function ProfileScreen() {
  const {
    selectedFilterIndex,
    selectedStyleExtraIndex,
    selectedPhotoIndex,
    intensity,
    favoriteFilterIndexes,
    savedLooks,
  } = useVersoEditor();
  const currentFilter = filters[selectedFilterIndex];
  const currentStyleExtra = styleExtras[selectedStyleExtraIndex];
  const currentPhoto = mockPhotos[selectedPhotoIndex];

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <ScreenHeader title="Perfil" subtitle="seu espaço dentro do Verso" badge="PF" />

      <View style={styles.card}>
        <Text style={styles.name}>Verso Member</Text>
        <Text style={styles.copy}>
          Área preparada para histórico, assinatura, preferências e organização futura da conta.
        </Text>
      </View>

      <View style={styles.sessionCard}>
        <Text style={styles.sessionTitle}>Sessão atual</Text>
        <Text style={styles.sessionCopy}>Foto: {currentPhoto.name}</Text>
        <Text style={styles.sessionCopy}>Filtro: {currentFilter.name}</Text>
        <Text style={styles.sessionCopy}>Toque extra: {currentStyleExtra.name}</Text>
        <Text style={styles.sessionCopy}>Intensidade: {intensity}%</Text>
      </View>

      <View style={styles.sessionCard}>
        <Text style={styles.sessionTitle}>Biblioteca pessoal</Text>
        <Text style={styles.sessionCopy}>Filtros favoritos: {favoriteFilterIndexes.length}</Text>
        <Text style={styles.sessionCopy}>Looks salvos: {savedLooks.length}</Text>
        {savedLooks.slice(0, 2).map((look) => (
          <Text key={look.id} style={styles.sessionCopy}>
            {look.photoName} · {look.filterName} · {look.intensity}%
          </Text>
        ))}
      </View>

      <View style={styles.listCard}>
        {items.map((item) => (
          <View key={item} style={styles.row}>
            <Text style={styles.rowText}>{item}</Text>
            <Text style={styles.rowArrow}>›</Text>
          </View>
        ))}
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
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  name: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.7,
  },
  copy: {
    color: colors.mutedText,
    fontSize: 15,
    lineHeight: 24,
  },
  listCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  sessionCard: {
    backgroundColor: colors.card,
    borderRadius: radii.xl,
    padding: spacing.lg,
    gap: 6,
  },
  sessionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  sessionCopy: {
    color: colors.mutedText,
    fontSize: 14,
    lineHeight: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '500',
  },
  rowArrow: {
    color: colors.accent,
    fontSize: 22,
    lineHeight: 22,
  },
});
