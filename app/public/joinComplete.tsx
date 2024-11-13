// TODO - 종료버튼 닫기나 뒤로 가기하기가 애매함.. web, native

import * as React from 'react';
import { View } from 'react-native';
import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

export default function Screen() {
  return (
    <Container className='items-center justify-center bg-white'>
      <Wrap type='default' full className='mt-6 flex flex-col justify-between'>
        <View className='flex items-center justify-center pt-[130px]'>
          <Text className='text-lg font-semibold text-[#111111]'>미팅 참석 요청이 완료 되었습니다.</Text>
          <Text className='text-lg font-semibold text-[#111111]'>감사합니다 🧡</Text>
        </View>
        <Button
          onPress={() => {
            // TODO - 뒤로가기가 아니라 페이지 종료
          }}
          variant='default'
          className='bg-[#111111] shadow shadow-foreground/5'>
          <Text>종료</Text>
        </Button>
      </Wrap>
    </Container>
  );
}
