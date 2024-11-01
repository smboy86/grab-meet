import { Link } from 'expo-router';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Container } from '~/components/layout/container';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

export default function Screen() {
  return (
    <Container className='items-center justify-center gap-2'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className='flex w-full'
        contentContainerClassName='items-center justify-center gap-2'>
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
        <Link
          href={{
            pathname: '/pub/detail/scheduleInfo',
          }}
          asChild>
          <Button variant='outline' className='shadow shadow-foreground/5'>
            <Text>Detail - 일정 상세</Text>
          </Button>
        </Link>
        <Link
          href={{
            pathname: '/pub/detail/scheduleConfirm',
          }}
          asChild>
          <Button variant='outline' className='shadow shadow-foreground/5'>
            <Text>Detail - 일정 확정</Text>
          </Button>
        </Link>
        <Link
          href={{
            pathname: '/pub/detail/scheduleCreate',
          }}
          asChild>
          <Button variant='outline' className='shadow shadow-foreground/5'>
            <Text>Detail - 일정 생성</Text>
          </Button>
        </Link>
        <Link
          href={{
            pathname: '/pub/detail/scheduleShare',
          }}
          asChild>
          <Button variant='outline' className='shadow shadow-foreground/5'>
            <Text>Detail - 일정 투표 공유</Text>
          </Button>
        </Link>
        <View className='my-4 w-full border-t' />
        <Link
          href={{
            pathname: '/pub/public/joinMeet',
          }}
          asChild>
          <Button variant='outline' className='shadow shadow-foreground/5'>
            <Text>미팅선택 참여</Text>
          </Button>
        </Link>
        <Link
          href={{
            pathname: '/pub/public/joinComplete',
          }}
          asChild>
          <Button variant='outline' className='shadow shadow-foreground/5'>
            <Text>미팅 참여 완료</Text>
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
      </ScrollView>
    </Container>
  );
}
