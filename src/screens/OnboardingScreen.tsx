import { StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors, radii, spacing } from '../theme/tokens';

type OnboardingScreenProps = {
  onContinue: () => void;
  onExplorePremium: () => void;
};

const steps = [
  {
    title: 'Transforme o cotidiano em arte.',
    copy: 'Uma experiência clean, chic e intuitiva para editar imagens com personalidade visual.',
  },
  {
    title: 'Filtros inspirados em câmeras icônicas.',
    copy: 'Film, instant e digital em uma linguagem curada para o universo do Verso.',
  },
  {
    title: 'Premium pensado para crescer junto.',
    copy: 'Filtros bloqueados, preview premium e um fluxo pronto para assinatura no próximo passo.',
  },
];

export function OnboardingScreen({ onContinue, onExplorePremium }: OnboardingScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>VERSO STUDIO</Text>
        <Text style={styles.title}>Comece com a atmosfera certa.</Text>
        <Text style={styles.copy}>
          Antes de entrar no app, aqui está a essência do produto e do que já pode ser explorado na
          prévia atual.
        </Text>
      </View>

      <View style={styles.steps}>
        {steps.map((step, index) => (
          <View key={step.title} style={styles.stepCard}>
            <View style={styles.stepIndex}>
              <Text style={styles.stepIndexText}>0{index + 1}</Text>
            </View>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepCopy}>{step.copy}</Text>
          </View>
        ))}
      </View>

      <View style={styles.actions}>
        <PrimaryButton label="Entrar no Verso" onPress={onContinue} />
        <PrimaryButton label="Ver premium" onPress={onExplorePremium} variant="light" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    gap: spacing.lg,
    backgroundColor: colors.background,
  },
  hero: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  eyebrow: {
    alignSelf: 'flex-start',
    color: colors.accent,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  title: {
    color: colors.text,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '700',
    letterSpacing: -1.2,
  },
  copy: {
    color: colors.mutedText,
    fontSize: 15,
    lineHeight: 24,
  },
  steps: {
    gap: spacing.md,
  },
  stepCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  stepIndex: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accentMuted,
    borderRadius: radii.round,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
  },
  stepIndexText: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '700',
  },
  stepTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.4,
  },
  stepCopy: {
    color: colors.mutedText,
    fontSize: 14,
    lineHeight: 22,
  },
  actions: {
    gap: spacing.sm,
    alignItems: 'flex-start',
  },
});
