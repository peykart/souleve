import { PropsWithChildren, Suspense } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SQLiteProvider } from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';

import { theme } from '@/constants/theme';
import { DATABASE_NAME, initializeDatabase } from '@/storage/database';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <Suspense fallback={<AppLoadingScreen />}>
      <SQLiteProvider
        databaseName={DATABASE_NAME}
        onInit={initializeDatabase}
        useSuspense={true}
      >
        <StatusBar style="light" />
        {children}
      </SQLiteProvider>
    </Suspense>
  );
}

function AppLoadingScreen() {
  return (
    <View style={styles.loadingScreen}>
      <ActivityIndicator color={theme.colors.text} size="small" />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
});
