import { ActivityIndicator, Text } from 'react-native';
import { Redirect, Stack } from 'expo-router';
import { isEmpty } from 'lodash';
import { useAuth } from '~/providers/AuthProvider';

export default function AuthLayout() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <ActivityIndicator size='large' color='blue' />;
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
