import { Link } from 'expo-router';
import * as React from 'react';
import { View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

export default function PubMain() {
  return (
    <View className='flex-1 justify-center items-center gap-5 p-6 bg-secondary/30'>
      <Text>퍼블리싱 목록</Text>
      <Link
        href={{
          pathname: '/auth/login',
        }}
        asChild>
        <Button variant='outline' className='shadow shadow-foreground/5'>
          <Text>1.login</Text>
        </Button>
      </Link>
      <View className='w-full border-t border-1' />
      <Link
        href={{
          pathname: '/pub/(main)/calendar',
        }}
        asChild>
        <Button variant='outline' className='shadow shadow-foreground/5'>
          <Text>Main - 캘린더</Text>
        </Button>
      </Link>
      <Link
        href={{
          pathname: '/pub/(main)/home',
        }}
        asChild>
        <Button variant='outline' className='shadow shadow-foreground/5'>
          <Text>Main - 홈</Text>
        </Button>
      </Link>
      <Link
        href={{
          pathname: '/pub/(main)/my',
        }}
        asChild>
        <Button variant='outline' className='shadow shadow-foreground/5'>
          <Text>Main - 마이페이지</Text>
        </Button>
      </Link>
    </View>
  );
}
