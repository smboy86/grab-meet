import { Link, Routes, useRouter } from 'expo-router';
import * as React from 'react';
import { useAuth } from '~/providers/AuthProvider';
import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { Header } from '~/components/layout/header';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { supabase } from '~/utils/supabase';

type Menu = {
  title: string;
  link: Routes;
};

// TODO - 메뉴 화면 링크 or 기능 추가
// const MENU_LIST: Array<Menu> = [
//   {
//     title: '앱정보',
//     link: '/(main)/home',
//   },
//   {
//     title: '패스워드 재설정',
//     link: '/',
//   },
//   {
//     title: '스토어 평점주기',
//     link: '/',
//   },
// ];

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
      <Header type='default' onAction={() => alert('일정 추가')} actionBtnText='일정 추가' />
      <Wrap type='default' full className='mt-6'>
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
            <Text>앱정보</Text>
          </Button>
        </Link>
        {isLogin && (
          <Button variant='outline' className='mb-2 border-[#E5E5EC] bg-[#E5E5EC]' onPress={handleLogout}>
            <Text className='text-[#505050]'>로그아웃</Text>
          </Button>
        )}
      </Wrap>
    </Container>
  );
}
