import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useMemo, useState } from 'react';
import { BottomTabBar, TabKey } from './src/components/BottomTabBar';
import { EditorScreen } from './src/screens/EditorScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { PremiumScreen } from './src/screens/PremiumScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { VersoProvider } from './src/state/VersoContext';
import { colors } from './src/theme/tokens';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  const content = useMemo(() => {
    if (!hasCompletedOnboarding) {
      return (
        <OnboardingScreen
          onContinue={() => setHasCompletedOnboarding(true)}
          onExplorePremium={() => {
            setHasCompletedOnboarding(true);
            setActiveTab('premium');
          }}
        />
      );
    }

    switch (activeTab) {
      case 'edit':
        return <EditorScreen onOpenPremium={() => setActiveTab('premium')} />;
      case 'premium':
        return <PremiumScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'home':
      default:
        return <HomeScreen onStartEditing={() => setActiveTab('edit')} onOpenPremium={() => setActiveTab('premium')} />;
    }
  }, [activeTab, hasCompletedOnboarding]);

  return (
    <VersoProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <View style={styles.appShell}>
          <View style={styles.content}>{content}</View>
          {hasCompletedOnboarding && <BottomTabBar activeTab={activeTab} onChange={setActiveTab} />}
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
