import * as React from 'react';
import { View } from 'react-native';
import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { Header } from '~/components/layout/header';
import { Text } from '~/components/ui/text';

export default function Home() {
  return (
    <Container className='items-center justify-center'>
      <Header type='btn' onAction={() => alert('일정 추가')} actionBtnText='일정 추가' />
      <Wrap type='default' full className='mt-6'>
        <View className='items-center pt-12'>
          <Text className='mb-1 text-[#767676]'>일정이 없습니다.</Text>
          <Text className='text-[#767676]'>상단의 '일정 추가' 버튼을 눌러 추가해 주세요.</Text>
        </View>
      </Wrap>
    </Container>
  );
}
