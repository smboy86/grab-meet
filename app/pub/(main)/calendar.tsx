import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { Calendar } from 'react-native-calendars';
import { Header } from '~/components/layout/header';
import { Text } from '~/components/ui/text';

export default function CalendarScreen() {
  return (
    <Container>
      <Header type='btn' onAction={() => alert('일정 추가')} actionBtnText='일정 추가' />
      <Wrap type='default' full className='mt-6 border border-yellow-600'>
        <View className='w-ful border border-red-500'>
          <Calendar
            onDayPress={(day) => {
              console.log('selected day', day);
            }}
          />
        </View>
        <ScrollView className='h-full border border-blue-500' contentContainerStyle={{ flexGrow: 1 }}>
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
