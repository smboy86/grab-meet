import { useNavigation } from 'expo-router';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

export default function ScheduleInfo() {
  const navigation = useNavigation();
  const [value, setValue] = React.useState('aaaa');

  // 스크린 안에서 헤더 버튼 생성
  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button variant={'small'} size={'small'} onPress={() => alert(value)}>
          <Text>일정 확정</Text>
        </Button>
      ),
    });
  }, [navigation, value]);

  return (
    <Container gray className='items-center justify-center'>
      <Wrap type='default' full className='mt-6'>
        <View className='mb-6'>
          <Text className='mb-3 text-sm text-[#111111]'>일정 제목</Text>
          <Text className='text-sm font-semibold text-[#111111]'>24회 동창회 모임</Text>
        </View>
        <View className='mb-6'>
          <Text className='mb-3 text-sm text-[#111111]'>참여 인원</Text>
          <Text className='text-sm font-semibold text-[#111111]'>4명</Text>
        </View>
        <View className='mb-6 flex'>
          <Text className='mb-3 text-sm text-[#111111]'>일정 선택</Text>
          {/* 일정 투표 A */}
          <View className='mb-2 rounded-md border border-[#E5E5EC] bg-white px-5 py-3'>
            <Text className='text-[14px] font-semibold'>2024.10.17 (목)</Text>
            {/* 막대기 Box*/}
            <View className='gab-1'>
              {/* 막대기 1 */}
              <Pressable
                onPress={() => {
                  alert('일정 선택1');
                }}>
                <View className='mt-3 rounded-[6px] bg-[#E5E5EC]'>
                  <View className='flex h-[38px] flex-row items-center justify-between px-3 text-[13px]'>
                    <Text className=''>10:00</Text>
                    <View className='flex flex-row gap-1'>
                      <Text>(불)</Text>
                      <Text>2명</Text>
                    </View>
                  </View>
                </View>
              </Pressable>
              {/* 막대기 2 */}
              <Pressable
                onPress={() => {
                  alert('일정 선택2');
                }}>
                <View className='mt-3 rounded-[6px] bg-[#E5E5EC]'>
                  <View className='flex h-[38px] flex-row items-center justify-between px-3 text-[13px]'>
                    <Text className=''>10:00</Text>
                    <View className='flex flex-row gap-1'>
                      <Text>(불)</Text>
                      <Text>2명</Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            </View>
          </View>
          {/* 일정 투표 B */}
          <View className='mb-2 rounded-md border border-[#E5E5EC] bg-white px-5 py-3'>
            <Text className='text-[14px] font-semibold'>2024.10.17 (목)</Text>
            {/* 막대기 Box*/}

            <View className='gab-1'>
              {/* 막대기 3 */}
              <Pressable
                onPress={() => {
                  alert('일정 선택3');
                }}>
                <View className='mt-3 rounded-[6px] bg-[#E5E5EC]'>
                  <View className='flex h-[38px] flex-row items-center justify-between px-3 text-[13px]'>
                    <Text className=''>10:00</Text>
                    <View className='flex flex-row gap-1'>
                      <Text>(불)</Text>
                      <Text>2명</Text>
                    </View>
                  </View>
                </View>
              </Pressable>
              {/* 막대기 4 */}
              <Pressable
                onPress={() => {
                  alert('일정 선택 4');
                }}>
                <View className='mt-3 rounded-[6px] bg-[#E5E5EC]'>
                  <View className='flex h-[38px] flex-row items-center justify-between px-3 text-[13px]'>
                    <Text className=''>10:00</Text>
                    <View className='flex flex-row gap-1'>
                      <Text>(불)</Text>
                      <Text>2명</Text>
                    </View>
                  </View>
                </View>
              </Pressable>
              {/* 막대기 5 */}
              <Pressable
                onPress={() => {
                  alert('일정 선택 5');
                }}>
                <View className='mt-3 rounded-[6px] bg-[#E5E5EC]'>
                  <View className='flex h-[38px] flex-row items-center justify-between px-3 text-[13px]'>
                    <Text className=''>10:00</Text>
                    <View className='flex flex-row gap-1'>
                      <Text>(불)</Text>
                      <Text>2명</Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </Wrap>
    </Container>
  );
}
