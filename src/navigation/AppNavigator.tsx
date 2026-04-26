import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { theme } from '@/constants/theme';
import { CalculatorScreen } from '@/screens/CalculatorScreen';
import { GuideScreen } from '@/screens/GuideScreen';
import { HomeScreen } from '@/screens/HomeScreen';
import { ProgramScreen } from '@/screens/ProgramScreen';
import { WorkoutLoggerScreen } from '@/screens/WorkoutLoggerScreen';

import type { MainTabParamList, RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.background,
    card: theme.colors.backgroundElevated,
    text: theme.colors.text,
    border: theme.colors.border,
    primary: theme.colors.text,
  },
};

export function AppNavigator() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        screenOptions={{
          animation: 'slide_from_right',
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.text,
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      >
        <Stack.Screen
          component={MainTabs}
          name="MainTabs"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={WorkoutLoggerScreen}
          name="WorkoutLogger"
          options={({ route }) => ({
            title: route.params.dayName,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.backgroundElevated,
          borderTopColor: theme.colors.border,
          height: 72,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: theme.colors.text,
        tabBarInactiveTintColor: '#8B919C',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          letterSpacing: 0.4,
        },
        tabBarIconStyle: {
          marginBottom: 2,
        },
      }}
    >
      <Tab.Screen
        component={HomeScreen}
        name="Home"
        options={{ tabBarIcon: ({ color }) => <TabGlyph color={color} glyph="H" /> }}
      />
      <Tab.Screen
        component={ProgramScreen}
        name="Program"
        options={{ tabBarIcon: ({ color }) => <TabGlyph color={color} glyph="P" /> }}
      />
      <Tab.Screen
        component={CalculatorScreen}
        name="Calculator"
        options={{ tabBarIcon: ({ color }) => <TabGlyph color={color} glyph="C" /> }}
      />
      <Tab.Screen
        component={GuideScreen}
        name="Guide"
        options={{ tabBarIcon: ({ color }) => <TabGlyph color={color} glyph="G" /> }}
      />
    </Tab.Navigator>
  );
}

function TabGlyph({ color, glyph }: { color: string; glyph: string }) {
  return (
    <Text style={{ color, fontSize: 11, fontWeight: '800' }}>
      {glyph}
    </Text>
  );
}
