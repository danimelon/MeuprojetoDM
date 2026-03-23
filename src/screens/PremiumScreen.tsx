import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenHeader } from '../components/ScreenHeader';
import { colors, radii, spacing } from '../theme/tokens';

const benefits = [
  'Todos os filtros da biblioteca Verso.',
  'Coleções mensais inspiradas em câmeras icônicas.',
  'Extras visuais opcionais para finalizar a imagem.',
  'Base pronta para evoluir assinatura e retenção.',
];

export function PremiumScreen() {
  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <ScreenHeader title="Premium" subtitle="o universo completo do Verso" badge="PR" />

      <View style={styles.heroCard}>
        <Text style={styles.eyebrow}>Verso Studio</Text>
        <Text style={styles.title}>Assinatura pensada para crescer com o produto.</Text>
        <Text style={styles.copy}>
          O foco principal continua sendo filtros fortes e uma experiência elegante. Os extras
          visuais entram só como detalhe final.
        </Text>
        <PrimaryButton label="Assinar mensalmente" variant="light" />
      </View>

      <View style={styles.listCard}>
        {benefits.map((benefit) => (
          <View key={benefit} style={styles.benefitRow}>
            <View style={styles.dot} />
            <Text style={styles.benefitText}>{benefit}</Text>
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
  heroCard: {
    backgroundColor: colors.accent,
    borderRadius: radii.xl,
    padding: spacing.lg,
    gap: spacing.md,
  },
  eyebrow: {
    alignSelf: 'flex-start',
    backgroundColor: colors.onAccentSoft,
    color: colors.accent,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: radii.round,
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 0.6,
  },
  title: {
    color: colors.onAccent,
    fontWeight: '700',
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.8,
  },
  copy: {
    color: colors.onAccentSoft,
    fontSize: 15,
    lineHeight: 23,
  },
  listCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  benefitRow: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-start',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 6,
    backgroundColor: colors.accent,
  },
  benefitText: {
    flex: 1,
    color: colors.text,
    lineHeight: 24,
    fontSize: 15,
  },
});
