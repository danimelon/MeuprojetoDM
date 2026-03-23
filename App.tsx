import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useMemo, useState } from 'react';
import { BottomTabBar, TabKey } from './src/components/BottomTabBar';
import { EditorScreen } from './src/screens/EditorScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { PremiumScreen } from './src/screens/PremiumScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { VersoProvider } from './src/state/VersoContext';
import { colors } from './src/theme/tokens';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');

  const content = useMemo(() => {
    switch (activeTab) {
      case 'edit':
        return <EditorScreen />;
      case 'premium':
        return <PremiumScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'home':
      default:
        return <HomeScreen onStartEditing={() => setActiveTab('edit')} />;
    }
  }, [activeTab]);

  return (
    <VersoProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <View style={styles.appShell}>
          <View style={styles.content}>{content}</View>
          <BottomTabBar activeTab={activeTab} onChange={setActiveTab} />
        </View>
      </SafeAreaView>
    </VersoProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  appShell: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
});
