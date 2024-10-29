import { Text } from 'react-native';
import { Stack } from 'expo-router';
import { useSession } from '~/components/Providers';

export default function Layout() {
  const { isLoading, session } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
