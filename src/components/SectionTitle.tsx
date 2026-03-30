import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme/tokens';

type SectionTitleProps = {
  title: string;
  action: string;
};

export function SectionTitle({ title, action }: SectionTitleProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.action}>{action}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    letterSpacing: -0.5,
  },
  action: {
    color: colors.accent,
    fontWeight: '600',
    fontSize: 14,
  },
});
