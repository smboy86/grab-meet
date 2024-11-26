import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { Header } from '~/components/layout/header';
import { Text } from '~/components/ui/text';

export default function Screen() {
  return (
    <Container className='items-center justify-center'>
      <Header type='default' />
      <Wrap type='default' full>
        <Text>안녕하세요 미팅을 잡자 입니다.</Text>
      </Wrap>
    </Container>
  );
}
