import { Text } from 'react-native';
import { Stack } from 'expo-router';
import { useSession } from '~/components/Providers';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
