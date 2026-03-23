import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ScreenHeader } from '../components/ScreenHeader';
import { colors, radii, spacing } from '../theme/tokens';

const items = [
  'Coleções salvas',
  'Assinatura',
  'Preferências visuais',
  'Ajuda e suporte',
];

export function ProfileScreen() {
  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <ScreenHeader title="Perfil" subtitle="seu espaço dentro do Verso" badge="PF" />

      <View style={styles.card}>
        <Text style={styles.name}>Verso Member</Text>
        <Text style={styles.copy}>
          Área preparada para histórico, assinatura, preferências e organização futura da conta.
        </Text>
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
