import { Link } from 'expo-router';
import * as React from 'react';
import { View } from 'react-native';
import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { Header } from '~/components/layout/header';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

export default function Screen() {
  return (
    <Container className='items-center justify-center'>
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
