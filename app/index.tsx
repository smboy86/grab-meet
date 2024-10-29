import * as React from 'react';
import { View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { Link, Slot, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useStorageState } from '~/hooks/useStorageState';

const GITHUB_AVATAR_URI = 'https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg';

export default function App() {
  const [appIsReady, setAppIsReady] = React.useState(false); //
  const router = useRouter(); // temp

  // for splash / font / asset
  React.useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  // 로그인 유무 판단해서 분기 처리 / 위에 있는거랑 합쳐야 되나..
  React.useEffect(() => {
    if (appIsReady) {
      router.push('/pub');
    }
  }, [appIsReady]);

  const onLayoutRootView = React.useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  return (
    <View className='flex h-full w-full justify-center' onLayout={onLayoutRootView}>
      {/* 여기서 무엇을 보여줄 것인가 */}
    </View>
  );
}
