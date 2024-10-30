import { FlashList } from '@shopify/flash-list';
import * as React from 'react';
import { View } from 'react-native';
import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { Header } from '~/components/layout/header';
import { DateItem } from '~/components/screen/dateItem';
import { CalendarBox } from '~/components/ui/calendar';

// TODO - 스크롤 할때 달력 위로 말려 올라가는 애니메이션

export default function CalendarScreen() {
  return (
    <Container>
      <Header type='btn' onAction={() => alert('일정 추가')} actionBtnText='일정 추가' />
      <Wrap type='default' full className='mt-6'>
        <CalendarBox
          onDaySelect={(day, days) => {
            // 날짜 선택시 이벤트
            // console.log('111 selected day', day, days);
          }}
        />
        <View className='mt-4 flex flex-1'>
          <FlashList
            data={[...Array(11)].fill('')}
            renderItem={({ item }) => (
              <DateItem status={'a'} onPress={() => alert('일정 상세보기 :::  ' + JSON.stringify(item))} />
            )}
            ListFooterComponent={<View className='py-10' />}
            estimatedItemSize={40}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </Wrap>
    </Container>
  );
}
