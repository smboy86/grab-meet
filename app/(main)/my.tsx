import { Link, Stack, useRouter } from 'expo-router';
import * as React from 'react';
import { useAuth } from '~/providers/AuthProvider';
import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { Header } from '~/components/layout/header';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { supabase } from '~/utils/supabase';

export default function My() {
  const router = useRouter();
  const { isLogin } = useAuth();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    }

    router.replace('/(main)/home');
  };

  return (
    <Container className='items-center justify-center'>
      <Stack.Screen options={{ title: 'Sign up' }} />
      <Header type='default' onAction={() => alert('일정 추가')} actionBtnText='일정 추가' />
      <Wrap type='default' full>
        <Link
          href={{
            pathname: '/public/grab/[id]',
            params: {
              id: '4ac40eef-718e-4d9b-8aa9-8e6924d4845d',
            },
          }}
          asChild>
          <Button variant='outline' className='mb-2 border border-brand'>
            <Text>test 참여하기</Text>
          </Button>
        </Link>
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
