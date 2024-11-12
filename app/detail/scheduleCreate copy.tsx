import { FlashList } from '@shopify/flash-list';
import { Stack, useNavigation } from 'expo-router';
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

type TForm = {
  values: {
    [T: string]: string | number; // form 에 들어갈 모든 타입
  };
  errors: {
    [key: string]: boolean;
  };
};

const initialForm: TForm = {
  values: {
    title: '',
    member_cnt: 0,
  },
  errors: {
    title: false,
    member_cnt: false,
  },
};

export default function Screen() {
  const [form, setForm] = React.useState({ title: '', member_cnt: 0 });
  const [formData, updateFormData] = React.useReducer((prev: TForm, next: Pick<TForm, 'values'>) => {
    //들어온 값 확인
    const newState = { ...prev, values: { ...prev.values, ...next.values } };

    console.log('newState  ', newState.values);

    // 유효성 검사
    return newState;
  }, initialForm);

  const [selectDay, setSelectedDay] = React.useState<string[]>([]);
  const [selectTime, setSelectedTime] = React.useState<string[]>([]);
  interface DataObject {
    time: string;
    isSelected?: boolean;
  }
  interface DataItem {
    [key: string]: DataObject[];
  }

  const tempData: DataItem[] = [
    {
      '2024.10.17(목)': [
        { time: '09:00', isSelected: false },
        { time: '10:00', isSelected: true },
        { time: '14:00', isSelected: false },
        { time: '16:00', isSelected: true },
        { time: '17:00', isSelected: false },
      ],
    },
    {
      '2024.10.18(금)': [
        { time: '09:00', isSelected: false },
        { time: '10:00', isSelected: false },
        { time: '11:00', isSelected: false },
        { time: '12:00', isSelected: false },
        { time: '13:00', isSelected: false },
        { time: '14:00', isSelected: false },
        { time: '15:00', isSelected: false },
        { time: '16:00', isSelected: false },
        { time: '17:00', isSelected: false },
      ],
    },
    {
      '2024.10.19(토)': [
        { time: '09:00', isSelected: false },
        { time: '10:00', isSelected: false },
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
    <>
      <Stack.Screen
        options={{
          title: '일정 추가',
          headerRight: () => (
            <Button
              variant={'default'}
              size={'small'}
              onPress={() => alert('일정 확정')}
              disabled={true}
              className='bg-brand'>
              <Text>완료</Text>
            </Button>
          ),
        }}
      />
      <Container gray className='items-center justify-center'>
        <Wrap type='default' scroll className='mt-6'>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className='mb-6'>
              <Text className='mb-2 text-sm text-[#111111]'>일정 제목</Text>
              <Input
                value={formData.values.title as string}
                // onChangeText={(text) => setForm((prev) => ({ ...prev, title: text }))}
                onChangeText={(text) => updateFormData({ values: { title: text } })}
                placeholder='일정 제목을 입력하세요'
                className='mb-3'
              />
            </View>
            <View className='mb-6'>
              <Text className='mb-2 text-sm text-[#111111]'>인원 선택</Text>
              <Select
                onValueChange={(option) => {
                  // setForm((prev) => ({ ...prev, member_cnt: Number(option?.value) }));
                  updateFormData({ values: { member_cnt: Number(option?.value) } });
                }}>
                <SelectTrigger className='w-full'>
                  <SelectValue
                    className='native:text-lg text-sm text-foreground'
                    placeholder='인원을 선택해주세요'
                  />
                </SelectTrigger>
                <SelectContent insets={contentInsets} className='w-full'>
                  <SelectGroup>
                    <SelectLabel>선택</SelectLabel>
                    <SelectItem label='1명' value='1'>
                      1 명
                    </SelectItem>
                    <SelectItem label='2명' value='2'>
                      2 명
                    </SelectItem>
                    <SelectItem label='3명' value='3'>
                      3 명
                    </SelectItem>
                    <SelectItem label='4명' value='4'>
                      4 명
                    </SelectItem>
                    <SelectItem label='5명' value='5'>
                      5 명
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </View>
            <View className='mb-6'>
              <Text className='mb-2 text-sm text-[#111111]'>날짜 선택</Text>
              <View>
                <CalendarBox
                  editable
                  initMarkedDates={{}}
                  onDaySelect={(day, days) => {
                    // TODO - 날짜 가공
                    // 날짜 선택시 이벤트
                    // console.log('111 selected day', day);
                    // console.log('2222 selected day', days);
                    setSelectedDay(days);
                  }}
                />
              </View>
            </View>
            <View className='mb-6'>
              <Text className='text-smtext-[#111111] mb-2'>시간 선택</Text>
              <FlashList
                data={tempData}
                renderItem={({ item }) => {
                  const keyDate = Object.keys(item)[0];
                  const valueTime = item[keyDate];

                  return (
                    <View key={keyDate} className='bg-white px-5 py-3'>
                      <View className='mb-2.5 flex w-full flex-row justify-between'>
                        <Text className='mb-2 text-sm font-semibold text-[#000000]'>{keyDate}</Text>
                        <Pressable
                          onPress={() => {
                            alert('remove');
                          }}>
                          <ImageBox source={images.icon_remove} className='h-5 w-5' />
                        </Pressable>
                      </View>
                      <View className='justify-starts flex flex-row flex-wrap'>
                        {valueTime.map((subItem, index) => {
                          return (
                            <Pressable
                              onPress={() => {
                                setSelectedTime((prev) => {
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
    </>
  );
}