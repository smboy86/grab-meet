import '~/global.css';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform } from 'react-native';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import { PortalHost } from '@rn-primitives/portal';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import { AuthProvider } from '~/providers/AuthProvider';
import QueryProvider from '~/providers/QueryProvider';
import { getKeyHashAndroid, initializeKakaoSDK } from '@react-native-kakao/core';

export const unstable_settings = {
  initialRouteName: '(main)',
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
  // TODO - AOS 배포시 한번더 체크
  // ref. https://rnkakao.dev/docs/core/get-android-keyhash
  getKeyHashAndroid().then(console.log);
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  // for splash / font / asset
  React.useEffect(() => {
    // kakao init
    initializeKakaoSDK('dd4dbb779927ca4fc5601741e00024c2');

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
    })();
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <QueryProvider>
        <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
          <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
          <Stack
            screenOptions={{
              headerShown: true,
              headerBackTitle: '',
            }}>
            <Stack.Screen
              name='(main)'
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name='detail/schedule/confirmed/[id]'
              options={{
                title: '일정 확정 공유',
              }}
            />
            <Stack.Screen
              name='public/index'
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name='public/joinComplete'
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name='public/meet/[id]'
              options={{
                title: '일정 확정 공유',
                headerBackVisible: false,
              }}
            />
            <Stack.Screen
              name='auth'
              options={{
                headerShown: true /* 로그인은 헤더가 있으면 이상해보인다. */,
                title: '',
                headerShadowVisible: false,
              }}
            />
          </Stack>
          <PortalHost />
        </ThemeProvider>
      </QueryProvider>
    </AuthProvider>
  );
}
