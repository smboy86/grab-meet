import { Link, Stack, useRouter } from 'expo-router';
import * as React from 'react';
import { useAuth } from '~/providers/AuthProvider';
import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { Header } from '~/components/layout/header';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { Alert } from 'react-native';

export default function My() {
  const router = useRouter();
  const { isLogin } = useAuth();

  return (
    <Container main className='items-center justify-center'>
      <Stack.Screen options={{ title: 'Sign up' }} />
      <Header type='default' />
      <Wrap type='default' full>
        <Button
          variant='outline'
          className='mb-2 border border-brand'
          onPress={() => {
            if (!isLogin) {
              Alert.alert('미팅을 잡자', '로그인이 필요합니다.');
              return;
            }
            router.push('/detail/myInfo');
          }}>
          <Text>내정보</Text>
        </Button>
        <Link
          href={{
            pathname: '/detail/setting/resetPassword',
          }}
          asChild>
          <Button variant='outline' className='mb-2 border border-brand'>
            <Text>패스워드 재설정</Text>
          </Button>
        </Link>
        <Link
          href={{
            pathname: '/home',
          }}
          asChild>
          <Button variant='outline' className='mb-2 border border-brand'>
            <Text>스토어 평점주기</Text>
          </Button>
        </Link>
        {!isLogin && (
          <Link
            href={{
              pathname: '/auth/login',
            }}
            asChild>
            <Button variant='outline' className='mb-2 border border-brand'>
              <Text>로그인 하기</Text>
            </Button>
          </Link>
        )}
      </Wrap>
    </Container>
  );
}
