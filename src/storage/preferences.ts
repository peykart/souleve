import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  hasSeenWelcome: 'souleve.hasSeenWelcome',
} as const;

export async function getHasSeenWelcome() {
  const value = await AsyncStorage.getItem(STORAGE_KEYS.hasSeenWelcome);
  return value === 'true';
}

export async function setHasSeenWelcome(value: boolean) {
  await AsyncStorage.setItem(STORAGE_KEYS.hasSeenWelcome, String(value));
}
