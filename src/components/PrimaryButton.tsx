import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, radii, spacing } from '../theme/tokens';

type PrimaryButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: 'accent' | 'light';
};

export function PrimaryButton({ label, onPress, variant = 'accent' }: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.button, variant === 'light' && styles.buttonLight]}
    >
      <Text style={[styles.label, variant === 'light' && styles.labelLight]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radii.round,
  },
  buttonLight: {
    backgroundColor: colors.onAccent,
  },
  label: {
    color: colors.onAccent,
    fontWeight: '700',
    fontSize: 15,
  },
  labelLight: {
    color: colors.accent,
  },
});
