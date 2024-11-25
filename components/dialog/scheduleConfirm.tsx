import * as React from 'react';
import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { Header } from '~/components/layout/header';
import { Text } from '~/components/ui/text';

export default function ScheduleConfirm() {
  return (
    <Container className='items-center justify-center'>
      <Header type='default' />
      <Wrap type='default' full>
        <Text>스케쥴 상세</Text>
      </Wrap>
    </Container>
  );
}
