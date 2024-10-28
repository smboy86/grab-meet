import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { Header } from '~/components/layout/header';
import { CalendarBox } from '~/components/ui/calendar';
import { Text } from '~/components/ui/text';

export default function CalendarScreen() {
  return (
    <Container>
      <Header type='btn' onAction={() => alert('일정 추가')} actionBtnText='일정 추가' />
      <Wrap type='default' full className='mt-6'>
        <CalendarBox
          onDaySelect={(day, days) => {
            // 날짜 선택시 이벤트
            console.log('111 selected day', day, days);
          }}
        />
        <ScrollView className='mt-4 h-full border border-blue-500' contentContainerStyle={{ flexGrow: 1 }}>
          <View className='border py-10'>
            <Text>11111</Text>
          </View>
          <View className='border py-10'>
            <Text>11111</Text>
          </View>
          <View className='border py-10'>
            <Text>11111</Text>
          </View>
          <View className='border py-10'>
            <Text>11111</Text>
          </View>
          <View className='border py-10'>
            <Text>11111</Text>
          </View>
          <View className='border py-10'>
            <Text>11111</Text>
          </View>
          <View className='border py-10'>
            <Text>11111</Text>
          </View>
          <View className='border py-10'>
            <Text>11111</Text>
          </View>
          <View className='border py-10'>
            <Text>11111</Text>
          </View>
          <View className='border py-10'>
            <Text>11111</Text>
          </View>
          <View className='border py-10'>
            <Text>11111</Text>
          </View>
          <View className='border py-10'>
            <Text>11111</Text>
          </View>
        </ScrollView>
      </Wrap>
    </Container>
  );
}
