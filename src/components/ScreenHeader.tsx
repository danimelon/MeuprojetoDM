import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme/tokens';

type ScreenHeaderProps = {
  title: string;
  subtitle: string;
  badge?: string;
};

export function ScreenHeader({ title, subtitle, badge = 'VS' }: ScreenHeaderProps) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{badge}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.md,
  },
  title: {
    fontSize: 32,
    color: colors.text,
    fontWeight: '600',
    letterSpacing: -1,
  },
  subtitle: {
    marginTop: 4,
    color: colors.mutedText,
    fontSize: 14,
  },
  badge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: colors.accent,
    fontWeight: '700',
  },
});
