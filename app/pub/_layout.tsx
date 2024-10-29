import { Stack } from 'expo-router';
import { useSession } from '~/components/Providers';
import { Text } from '~/components/ui/text';

export default function Layout() {
  const { isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: '퍼블 홈',
      }}>
      <Stack.Screen
        name='(main)'
        options={{
          title: '메인 바텀 탭',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='details'
        options={{
          title: '상세 화면',
          headerShown: true,
        }}
      />
    </Stack>
  );
}
