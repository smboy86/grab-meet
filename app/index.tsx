import * as React from 'react';
import { View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { Link } from 'expo-router';
import { useAssets } from 'expo-asset';

const GITHUB_AVATAR_URI = 'https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg';

export default function Screen() {
  const [progress, setProgress] = React.useState(78);

  // const [assets, error] = useAssets([require('~/assets/icon/icon_grab_meet')]);

  return (
    <View className='flex h-full w-full justify-center'>
      <View className='mb-4'>
        <Link
          href={{
            pathname: '/pub',
          }}
          asChild>
          <Button variant='outline' className='shadow shadow-foreground/5'>
            <Text>퍼블리싱 메인으로 move</Text>
          </Button>
        </Link>
      </View>
      <Link
        href={{
          pathname: '/modal',
        }}
        asChild>
        <Button variant='outline' className='shadow shadow-foreground/5'>
          <Text>모달창</Text>
        </Button>
      </Link>
    </View>
  );
}
