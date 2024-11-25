import { FlashList } from '@shopify/flash-list';
import { useNavigation } from 'expo-router';
import * as React from 'react';
import { Dimensions, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { Button } from '~/components/ui/button';
import { CalendarBox } from '~/components/ui/calendar';
import { ImageBox } from '~/components/ui/imageBox';
import { Input } from '~/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Text } from '~/components/ui/text';
import images from '~/constants/images';
import { cn } from '~/lib/utils';

const { width } = Dimensions.get('window'); // Get screen width

export default function Screen() {
  const navigation = useNavigation();
  const [value, setValue] = React.useState({ title: '', password: '' });
  const [selectDay, setSelectedDay] = React.useState<string[]>([]);
  const [selectTime, setSelectedTime] = React.useState<string[]>([]);
  interface DataObject {
    time: string;
    isSelected: boolean;
  }
  interface DataItem {
    [key: string]: DataObject[];
  }

  const tempData: DataItem[] = [
    {
      '2024.10.17(목)': [
        { time: '10:00', isSelected: true },
        { time: '16:00', isSelected: true },
      ],
    },
    {
      '2024.10.18(금)': [
        { time: '09:00', isSelected: true },
        { time: '16:00', isSelected: true },
        { time: '17:00', isSelected: true },
        { time: '18:00', isSelected: true },
        { time: '19:00', isSelected: true },
        { time: '20:00', isSelected: true },
      ],
    },
    {
      '2024.10.19(토)': [
        { time: '09:00', isSelected: true },
        { time: '10:00', isSelected: true },
      ],
    },
  ];

  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  return (
    <Container gray className='items-center justify-center'>
      <Wrap type='default' scroll>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className='mb-6'>
            <Text className='mb-2 text-sm text-[#111111]'>링크 복사</Text>
            <View className='mb-3 flex w-full flex-row justify-between rounded-md border border-[#E5E5EC] bg-white p-3'>
              <View className='w-10/12 flex-nowrap'>
                <Text className='flex-nowrap' numberOfLines={1}>
                  https://url.kr/a99a6whttpsttps://url.kr/a99a6w
                </Text>
              </View>
              <Pressable className='' onPress={() => alert('복사 완료')}>
                <ImageBox source={images.icon_copy} style={{ width: 20, height: 20 }} className='h-5 w-5' />
              </Pressable>
            </View>
            <Button
              onPress={() => {
                alert('카카오 공유');
              }}
              className='bg-[#FEE500]'>
              <Text className='text-[#111111'>카카오로 공유하기</Text>
            </Button>
          </View>
          <View className='mb-6'>
            <Text className='mb-2 text-sm text-[#111111]'>일정 제목</Text>
            <Text className='text-[15px] font-semibold text-[#111111]'>24회 동창회 모임</Text>
          </View>
          <View className='mb-6'>
            <Text className='mb-2 text-sm text-[#111111]'>참여 인원</Text>
            <Text className='text-[15px] font-semibold text-[#111111]'>4명</Text>
          </View>
          <View className='mb-6'>
            <Text className='mb-2 text-sm text-[#111111]'>일정 확인</Text>
            <FlashList
              data={tempData}
              renderItem={({ item }) => {
                const keyDate = Object.keys(item)[0];
                const valueTime = item[keyDate];

                return (
                  <View key={keyDate} className='mb-2 bg-white px-5 py-3'>
                    <View className='mb-2.5 flex w-full flex-row justify-between'>
                      <Text className='mb-2 text-sm font-semibold text-[#000000]'>{keyDate}</Text>
                    </View>
                    <View className='justify-starts flex flex-row flex-wrap'>
                      {valueTime.map((subItem, index) => {
                        return (
                          <Pressable
                            onPress={() => {
                              console.log('ddddd ');
                              setSelectedTime((prev) => {
                                console.log('ffff  ', { ...prev, [subItem.time]: !subItem.isSelected });
                                return { ...prev, [subItem.time]: !subItem.isSelected };
                              });
                            }}
                            key={index}
                            className={cn(
                              'h-[38px] items-center justify-center rounded-md border border-[#E5E5EC]',
                              subItem.isSelected ? 'bg-brand' : 'bg-[#F1F1F5]',
                            )}
                            style={{
                              width: width / 4 - 40, // margin 값 기준으로 40만큼 깍아서 좌우 정렬 맞춤 4열
                              margin: 8,
                            }}>
                            <Text className={cn(subItem.isSelected ? 'text-white' : 'text-[#999999]')}>
                              {subItem.time}
                            </Text>
                          </Pressable>
                        );
                      })}
                    </View>
                  </View>
                );
              }}
              ListFooterComponent={<View className='py-10' />}
              estimatedItemSize={40}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View>
                  <Text className='text-[#999999]'>선택한 일정이 없습니다.</Text>
                </View>
              }
            />
          </View>
        </ScrollView>
      </Wrap>
    </Container>
  );
}
