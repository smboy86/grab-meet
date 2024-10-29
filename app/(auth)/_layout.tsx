import { Text } from 'react-native';
import { Redirect, Stack } from 'expo-router';
import { isEmpty } from 'lodash';
import { useSession } from '~/components/Providers';

export default function AuthLayout() {
  const { isLoading, session } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isEmpty(session)) {
    // return <Redirect href={'/auth/login'} />;
    return <Redirect href={'/'} />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      {/* 현재 루트 폴더 or 루트 파일만 지정 */}
      {/* <Stack.Screen
        name='setting'
        options={{
          title: '패스워드 재설정',
          headerShown: true,
        }}
      /> */}
    </Stack>
  );
}
