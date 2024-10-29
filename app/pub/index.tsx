import { Link } from 'expo-router';
import * as React from 'react';
import { View } from 'react-native';
import { Container } from '~/components/layout/container';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

export default function Screen() {
  return (
    <Container className='items-center justify-center gap-2'>
      <Link
        href={{
          pathname: '/pub/auth/login',
        }}
        asChild>
        <Button variant='outline' className='shadow shadow-foreground/5'>
          <Text>1.login</Text>
        </Button>
      </Link>
      <View className='my-4 w-full border-t' />
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
      <View className='my-4 w-full border-t' />
      <Link
        href={{
          pathname: '/pub/detail/setting/resetPassword',
        }}
        asChild>
        <Button variant='outline' className='shadow shadow-foreground/5'>
          <Text>Detail - 패스워드 재설정</Text>
        </Button>
      </Link>
      <View className='my-4 w-full border-t' />
      <Link
        href={{
          pathname: '/modal',
        }}
        asChild>
        <Button variant='outline' className='shadow shadow-foreground/5'>
          <Text>모달창</Text>
        </Button>
      </Link>
    </Container>
  );
}
