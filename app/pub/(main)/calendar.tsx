import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { Header } from '~/components/layout/header';
import { DateItem } from '~/components/screen/dateItem';
import { CalendarBox } from '~/components/ui/calendar';

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
        <ScrollView className='mt-4 h-full' contentContainerStyle={{ flexGrow: 1 }}>
          {[...Array(7)].map((item, key) => {
            return (
              <DateItem
                key={key.toString()}
                status={key === 0 ? 'a' : key === 1 ? 'b' : 'c'}
                onPress={() => alert('일정 상세보기 :::  ' + (key + 1).toString())}
              />
            );
          })}
          {/* empty item Required */}
          <View className='py-5' />
        </ScrollView>
      </Wrap>
    </Container>
  );
}
