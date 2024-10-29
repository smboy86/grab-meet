import { Link, Routes, useRouter } from 'expo-router';
import * as React from 'react';
import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { Header } from '~/components/layout/header';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

type Menu = {
  title: string;
  link: Routes;
};

// TODO - 메뉴 화면 링크 or 기능 추가
const MENU_LIST: Array<Menu> = [
  {
    title: '앱정보',
    link: '/pub/',
  },
  {
    title: '패스워드 재설정',
    link: '/pub/detail/setting/resetPassword',
  },
  {
    title: '스토어 평점주기',
    link: '/pub',
  },
];

export default function My() {
  const router = useRouter();

  return (
    <Container className='items-center justify-center'>
      <Header type='default' onAction={() => alert('일정 추가')} actionBtnText='일정 추가' />
      <Wrap type='default' full className='mt-6'>
        {MENU_LIST.map((item, index) => (
          <Link
            key={index.toString()}
            href={{
              pathname: item.link,
            }}
            asChild>
            {/* <Button variant='outline' className='border-brand mb-2 border'> */}
            <Button variant='outline' className='mb-2 border border-brand'>
              <Text>{item.title}</Text>
            </Button>
          </Link>
        ))}
        <Button
          variant='outline'
          className='mb-2 border-[#E5E5EC] bg-[#E5E5EC]'
          onPress={() => {
            // router.push('/pub/details/setting/resetPassword');
            alert('로그아웃');
          }}>
          <Text className='text-[#505050]'>로그아웃</Text>
        </Button>
      </Wrap>
    </Container>
  );
}
