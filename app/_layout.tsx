import '~/global.css';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack, useRootNavigationState, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform } from 'react-native';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import { PortalHost } from '@rn-primitives/portal';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import { AuthProvider, useAuth } from '~/providers/AuthProvider';
import QueryProvider from '~/providers/QueryProvider';

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
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();

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
      if (Platform.OS === 'ios') {
        setTimeout(() => {
          SplashScreen.hideAsync();
          //TODO - 언섹시...
          router.replace('/home');
        }, 1000);
      } else {
        setTimeout(() => {
          SplashScreen.hideAsync();
          router.replace('/home');
        }, 1000);
        // setImmediate(() => {
        //   SplashScreen.hideAsync();
        //   router.replace('/home');
        // });
      }
    });
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  // if (!rootNavigationState?.key) return null;

  return (
    <AuthProvider>
      <QueryProvider>
        <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
          <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
          <Stack
            screenOptions={{
              headerShown: true,
              // headerBackTitleVisible: false,
              headerBackTitle: '',
            }}>
            <Stack.Screen
              name='(main)'
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name='detail/index' />
            <Stack.Screen
              name='public/joinComplete'
              options={{
                headerShown: false,
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
