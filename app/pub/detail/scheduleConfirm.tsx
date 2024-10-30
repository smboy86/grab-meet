import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { GrabDateItem } from '~/components/screen/grabDateItem';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

export default function Screen() {
  return (
    <Container className='items-center justify-center'>
      <Wrap type='default' full className='mt-6'>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className='mb-6'>
            <Text className='mb-2 text-sm text-[#111111]'>일정 확정 공유</Text>
            <Button
              variant='outline'
              className='mb-3'
              // size={'lg'}
              onPress={() => {
                alert('일정 확인 공유하기');
              }}>
              <Text>일정 확인 공유하기</Text>
            </Button>
            <Button
              variant='outline'
              className=''
              onPress={() => {
                alert('카카오로 공유하기');
              }}>
              <Text>카카오로 공유하기</Text>
            </Button>
          </View>
          <View className='mb-6 w-full border-t border-[#E5E5EC]' />
          <View className='mb-6'>
            <Text className='mb-2 text-sm text-[#111111]'>일정 제목</Text>
            <Text className='text-[15px] font-semibold text-[#111111]'>24회 동창회 모임</Text>
          </View>
          <View className='mb-6'>
            <Text className='mb-2 text-sm text-[#111111]'>참여 인원</Text>
            <Text className='text-[15px] font-semibold text-[#111111]'>4명</Text>
          </View>
          <View className='mb-6'>
            <Text className='mb-2 text-sm text-[#111111]'>일정 확정</Text>
            <Text className='text-[15px] font-semibold text-[#111111]'>🔥︎2024.10.17(목) 14:00🔥︎</Text>
          </View>
          <View className='mb-6'>
            <Text className='mb-2 text-sm text-[#111111]'>투표 결과</Text>
            <View className='mb-6 flex'>
              {/* 일정 투표 A */}
              <View className='mb-2 rounded-md border border-[#E5E5EC] bg-white px-5 py-3'>
                <Text className='text-[14px] font-semibold'>2024.10.15 (목)</Text>
                {/* 막대기 Box*/}
                <View className='gab-1'>
                  {/* 막대기 1 */}
                  <GrabDateItem date={'10:00'} userCnt={4} selectedCnt={1} />
                  {/* 막대기 2 */}
                  <GrabDateItem date={'13:00'} userCnt={4} selectedCnt={4} />
                </View>
              </View>
              {/* 일정 투표 B */}
              <View className='mb-2 rounded-md border border-[#E5E5EC] bg-white px-5 py-3'>
                <Text className='text-[14px] font-semibold'>2024.10.16 (목)</Text>
                {/* 막대기 List Box*/}
                <View className='gab-1'>
                  <GrabDateItem date={'10:00'} userCnt={4} selectedCnt={0} />
                  <GrabDateItem date={'11:00'} userCnt={4} selectedCnt={0} />
                  <GrabDateItem date={'12:00'} userCnt={4} selectedCnt={3} />
                </View>
              </View>
              {/* 일정 투표 C */}
              <View className='mb-2 rounded-md border border-[#E5E5EC] bg-white px-5 py-3'>
                <Text className='text-[14px] font-semibold'>2024.10.17 (목)</Text>
                {/* 막대기 List Box*/}
                <View className='gab-1'>
                  <GrabDateItem isSelected date={'14:00'} userCnt={4} selectedCnt={4} />
                  <GrabDateItem date={'15:00'} userCnt={4} selectedCnt={0} />
                  <GrabDateItem date={'16:00'} userCnt={4} selectedCnt={0} />
                  <GrabDateItem date={'17:00'} userCnt={4} selectedCnt={4} />
                  <GrabDateItem date={'18:00'} userCnt={4} selectedCnt={0} />
                  <GrabDateItem date={'19:00'} userCnt={4} selectedCnt={3} />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </Wrap>
    </Container>
  );
}
