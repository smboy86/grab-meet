import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
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
        <ScrollView className='mt-4 h-full' contentContainerStyle={{ flexGrow: 1 }}>
          {[...Array(7)].map((item, key) => {
            return (
              <Pressable
                onPress={() => alert('일정 상세보기 :::  ' + (key + 1).toString())}
                key={key.toString()}
                className='mb-2 flex w-full flex-row justify-between border border-[#E5E5EC] p-5'>
                <View className='w-9/12 items-start justify-center'>
                  <Text
                    className='text-ellipsis text-lg font-semibold text-[#111111]'
                    ellipsizeMode='tail'
                    numberOfLines={1}>
                    24회 동창회 모임222222222222222222222222 33333333333
                  </Text>
                  <Text className='text-sm text-[#767676]'>____.__.__ 참여인원 5명</Text>
                </View>
                <View className='flex w-2/12'>
                  {key === 0 /* style 1/3 */ ? (
                    <View className='h-[50px] w-[50px] items-center justify-center rounded-full bg-[#F59917]'>
                      <Text className='text-[13px]'>투표중</Text>
                    </View>
                  ) : key === 1 /* style 2/3 */ ? (
                    <View className='h-[50px] w-[50px] items-center justify-center rounded-full bg-[#FCEA60] text-[13px]'>
                      <Text className='text-[13px]'>확정</Text>
                    </View>
                  ) : (
                    /* style 3/3 */
                    <View className='h-[50px] w-[50px] items-center justify-center rounded-full bg-[#F1F1F5] text-[13px]'>
                      <Text className='text-[13px] text-[#767676]'>종료</Text>
                    </View>
                  )}
                </View>
              </Pressable>
            );
          })}
          {/* empty item Required */}
          <View className='py-5' />
        </ScrollView>
      </Wrap>
    </Container>
  );
}
