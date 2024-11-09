import { Stack } from 'expo-router';
import * as React from 'react';
import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { Header } from '~/components/layout/header';
import { Text } from '~/components/ui/text';

export default function Screen() {
  return (
    <>
      <Stack.Screen options={{ title: '스크린 제목' }} />
      <Container className='items-center justify-center'>
        <Header type='default' />
        <Wrap type='default' full className='mt-6'>
          <Text>스케쥴 상세</Text>
        </Wrap>
      </Container>
    </>
  );
}

/**
 * 
[
  {
    "2024-11-05": [
      "09:00",
      "10:00"
    ]
  },
  {
    "2024-11-06": [
      "09:00",
      "10:00",
      "12:00",
      "13:00"
    ]
  }
]
 */
