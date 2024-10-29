import { Stack } from 'expo-router';
import { useSession } from '~/components/Providers';
import { Button } from '~/components/ui/button';
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
        title: '퍼블홈',
        headerShadowVisible: false /** 헤더 밑줄 삭제 */,
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name='(main)'
        options={{
          title: '메인 바텀 탭',
          headerShown: false,
        }}
      />
      {/* Details screen... */}
      <Stack.Screen
        name='detail/setting/resetPassword'
        options={{
          title: '패스워드 재설정',
        }}
      />
      <Stack.Screen
        name='detail/scheduleInfo'
        options={{
          title: '일정 상세',
        }}
      />
      <Stack.Screen
        name='detail/scheduleConfirm'
        options={{
          title: '일정 확정 공유',
        }}
      />
    </Stack>
  );
}
