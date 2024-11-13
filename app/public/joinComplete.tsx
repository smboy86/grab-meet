import { useRouter } from 'expo-router';
import * as React from 'react';
import { View } from 'react-native';
import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { Header } from '~/components/layout/header';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

export default function Screen() {
  const router = useRouter();
  return (
    <Container className='items-center justify-center'>
      <Wrap type='default' full className='mt-6 flex flex-col justify-between'>
        <View className='flex items-center justify-center pt-[130px]'>
          <Text className='text-lg font-semibold text-[#111111]'>미팅 참석 요청이 완료 되었습니다.</Text>
          <Text className='text-lg font-semibold text-[#111111]'>감사합니다 🧡</Text>
        </View>
        <Button
          onPress={() => {
            // TODO - 뒤로가기가 아니라 페이지 종료
            alert('종료');
          }}
          variant='default'
          className='bg-[#111111] shadow shadow-foreground/5'>
          <Text>종료</Text>
        </Button>
      </Wrap>
    </Container>
  );
}
