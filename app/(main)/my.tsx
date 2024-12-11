import { Link, Stack, useRouter } from 'expo-router';
import * as React from 'react';
import { useAuth } from '~/providers/AuthProvider';
import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { Header } from '~/components/layout/header';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

export default function My() {
  const router = useRouter();
  const { isLogin } = useAuth();

  const handleMoveWeb = (url: string) => {
    WebBrowser.openBrowserAsync(url);
  };

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
              Alert.alert('그랩밋', '로그인이 필요합니다.');
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
        <Button
          variant='outline'
          className='mb-2 border border-brand'
          onPress={() =>
            handleMoveWeb('https://play.google.com/store/apps/details?id=com.naldacompany.grabmeet')
          }>
          <Text>스토어 앱리뷰 쓰기</Text>
        </Button>
        <Button
          variant='outline'
          className='mb-2 border border-brand'
          onPress={() =>
            handleMoveWeb(
              'https://doc-hosting.flycricket.io/geuraebmis-privacy-policy/3cc3338f-e703-4780-9705-3e4e0eef1a28/privacy',
            )
          }>
          <Text>개인정보 처리방침</Text>
        </Button>
        {!isLogin && (
          <Link
            href={{
              pathname: '/auth/login',
            }}
            asChild>
            <Button variant='outline' className='mb-2 mt-4 border border-brand'>
              <Text>로그인 하기</Text>
            </Button>
          </Link>
        )}
      </Wrap>
    </Container>
  );
}
