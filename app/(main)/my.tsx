import { Link, Stack, useRouter } from 'expo-router';
import * as React from 'react';
import { useAuth } from '~/providers/AuthProvider';
import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { Header } from '~/components/layout/header';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { supabase } from '~/utils/supabase';
import { Alert } from 'react-native';

export default function My() {
  const router = useRouter();
  const { isLogin } = useAuth();

  const handleLogout = async () => {
    Alert.alert('미팅을 잡자', '로그아웃 하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '확인',
        onPress: async () => {
          const { error } = await supabase.auth.signOut();
          if (error) {
            console.error(error);
          }

          router.replace('/(main)/home');
        },
      },
    ]);
  };

  return (
    <Container className='items-center justify-center'>
      <Stack.Screen options={{ title: 'Sign up' }} />
      <Header type='default' />
      <Wrap type='default' full>
        <Link
          href={{
            pathname: '/home',
          }}
          asChild>
          <Button variant='outline' className='mb-2 border border-brand'>
            <Text>앱정보</Text>
          </Button>
        </Link>
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
        {isLogin ? (
          <Button variant='outline' className='mb-2 border-[#E5E5EC] bg-[#E5E5EC]' onPress={handleLogout}>
            <Text className='text-[#505050]'>로그아웃</Text>
          </Button>
        ) : (
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
