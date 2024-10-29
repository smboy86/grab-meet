import * as React from 'react';
import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { Header } from '~/components/layout/header';
import { Text } from '~/components/ui/text';
import { Link } from 'expo-router';
import { Button } from '~/components/ui/button';
import { useRouter } from 'expo-router';

export default function ResetPassword() {
  const router = useRouter();
  return (
    <Container className='items-center justify-center'>
      <Header type='default' />
      <Wrap type='default' full className='mt-6'>
        <Text>패스워드 재설정 </Text>
        <Link
          href={{
            pathname: '/pub/(main)/my',
          }}
          asChild>
          <Button variant='outline' className='shadow shadow-foreground/5'>
            <Text>Main - 마이페이지</Text>
          </Button>
        </Link>
        <Text onPress={() => router.push('/(auth)/setting/resetPasswordTest')}>Open a card</Text>
      </Wrap>
    </Container>
  );
}
