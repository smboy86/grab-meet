import * as React from 'react';
import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { Header } from '~/components/layout/header';

export default function Screen() {
  return (
    <Container className='items-center justify-center'>
      <Header type='default' />
      <Wrap type='default' full className='mt-6'></Wrap>
    </Container>
  );
}
