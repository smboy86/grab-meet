import { Link } from 'expo-router';
import * as React from 'react';
import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { Header } from '~/components/layout/header';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

// TODO - 메뉴 화면 링크 or 기능 추가
const MENU_LIST = [
  {
    title: '앱정보',
    link: '',
  },
  {
    title: '패스워드 재설정',
    link: '',
  },
  {
    title: '스토어 평점주기',
    link: '',
  },
];

export default function My() {
  return (
    <Container className='items-center justify-center'>
      <Header type='default' onAction={() => alert('일정 추가')} actionBtnText='일정 추가' />
      <Wrap type='default' full className='mt-6'>
        {MENU_LIST.map((item, index) => (
          <Link
            key={index.toString()}
            href={{
              pathname: '/',
            }}
            asChild>
            <Button variant='outline' className='mb-2 border border-[#1B2679]'>
              <Text>{item.title}</Text>
            </Button>
          </Link>
        ))}
        <Button
          variant='outline'
          className='mb-2 bg-[#E5E5EC]'
          onPress={() => {
            alert('로그아웃');
          }}>
          <Text className='text-[#505050]'>로그아웃</Text>
        </Button>
      </Wrap>
    </Container>
  );
}
