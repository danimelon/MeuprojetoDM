import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radii, spacing } from '../theme/tokens';

export type TabKey = 'home' | 'edit' | 'premium' | 'profile';

type BottomTabBarProps = {
  activeTab: TabKey;
  onChange: (tab: TabKey) => void;
};

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: 'home', label: 'Home' },
  { key: 'edit', label: 'Editar' },
  { key: 'premium', label: 'Premium' },
  { key: 'profile', label: 'Perfil' },
];

export function BottomTabBar({ activeTab, onChange }: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const active = tab.key === activeTab;

        return (
          <TouchableOpacity
            key={tab.key}
            activeOpacity={0.85}
            onPress={() => onChange(tab.key)}
            style={styles.item}
          >
            <View style={[styles.icon, active && styles.iconActive]} />
            <Text style={[styles.label, active && styles.labelActive]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radii.round,
    borderWidth: 1,
    borderColor: colors.border,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  item: {
    alignItems: 'center',
    gap: 8,
    minWidth: 64,
  },
  icon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.divider,
  },
  iconActive: {
    backgroundColor: colors.accent,
  },
  label: {
    color: colors.mutedText,
    fontSize: 12,
    fontWeight: '500',
  },
  labelActive: {
    color: colors.accent,
    fontWeight: '700',
  },
});
