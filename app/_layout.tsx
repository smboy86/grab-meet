import '~/global.css';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform } from 'react-native';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import { PortalHost } from '@rn-primitives/portal';
import { ThemeToggle } from '~/components/ThemeToggle';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import { AuthProvider } from '~/providers/AuthProvider';
import QueryProvider from '~/providers/QueryProvider';

export const unstable_settings = {
  initialRouteName: '/pub/index',
};

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const router = useRouter();

  // for splash / font / asset
  React.useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem('theme');
      if (Platform.OS === 'web') {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add('bg-background');
      }
      if (!theme) {
        AsyncStorage.setItem('theme', colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === 'dark' ? 'dark' : 'light';
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);
        setAndroidNavigationBar(colorTheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      setAndroidNavigationBar(colorTheme);
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
      // TODO - 좀 언섹시
      router.replace('/home');
    });
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <QueryProvider>
        <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
          <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
          {/* 스크린 명시적 선언 - header 지정 가능 */}
          {/* headerShadowVisible - 헤더 밑줄 삭제 */}
          <Stack
            screenOptions={{
              headerShown: true,
              headerShadowVisible: false,
              headerBackTitleVisible: false,
            }}>
            <Stack.Screen
              name='(main)'
              options={{
                title: '초기 진입 화면',
                headerRight: () => <ThemeToggle />,
                headerShown: false,
              }}
            />
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
            <Stack.Screen
              name='detail/scheduleCreate'
              options={{
                title: '일정 생성',
              }}
            />
            <Stack.Screen
              name='detail/scheduleShare'
              options={{
                title: '일정 투표 공유',
              }}
            />
            <Stack.Screen
              name='public/joinMeet'
              options={{
                title: '미팅 선택 참여',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name='public/joinComplete'
              options={{
                title: '미팅 참여 완료',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name='modal/index'
              options={{
                headerShown: false,
                presentation: 'modal',
              }}
            />
          </Stack>

          <PortalHost />
        </ThemeProvider>
      </QueryProvider>
    </AuthProvider>
  );
}
