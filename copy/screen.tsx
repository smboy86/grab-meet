import * as React from 'react';
import { View } from 'react-native';
import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { Header } from '~/components/layout/header';
import { Text } from '~/components/ui/text';

export default function Screen() {
  return (
    <Container className='items-center justify-center'>
      <Header type='default' />
      <Wrap type='default' full className='mt-6'>
        <Text>스케쥴 상세</Text>
      </Wrap>
    </Container>
  );
}
