import { FlashList } from '@shopify/flash-list';
import { Stack } from 'expo-router';
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
import * as z from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const { width } = Dimensions.get('window'); // Get screen width

const options = [
  { value: '1', label: '1명' },
  { value: '2', label: '2명' },
  { value: '3', label: '3명' },
  { value: '4', label: '4명' },
  { value: '5', label: '5명' },
  { value: '6', label: '6명' },
  { value: '7', label: '7명' },
];

type TimeSlot = {
  time: string;
  isSelected: boolean;
};

const TimeSlotSchema = z.object({
  time: z.string(),
  isSelected: z.boolean(),
});

export const TForm = z.object({
  title: z.string().min(1, {
    message: 'err 일정 제목을 입력해주세요',
  }),
  member_cnt: z.string().min(1, {
    message: 'err 인원을 선택해주세요',
  }),
  selected_days: z.array(
    z.record(
      z.string(), // Date 형태의 키를 사용합니다.
      z.array(TimeSlotSchema),
    ),
  ),
});

export default function Screen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, defaultValues },
    setValue,
  } = useForm<z.infer<typeof TForm>>({
    resolver: zodResolver(TForm),
    defaultValues: {
      title: '',
      member_cnt: '',
      selected_days: [],
      //   selectedDays: [
      //     {
      //       '2024.10.17(목)': [
      //         { time: '09:00', isSelected: false },
      //         { time: '10:00', isSelected: true },
      //         { time: '14:00', isSelected: false },
      //         { time: '16:00', isSelected: true },
      //         { time: '17:00', isSelected: false },
      //       ],
      //     },
      //     {
      //       '2024.10.18(금)': [
      //         { time: '09:00', isSelected: false },
      //         { time: '10:00', isSelected: false },
      //         { time: '11:00', isSelected: false },
      //         { time: '12:00', isSelected: false },
      //         { time: '13:00', isSelected: false },
      //         { time: '14:00', isSelected: false },
      //         { time: '15:00', isSelected: false },
      //         { time: '16:00', isSelected: false },
      //         { time: '17:00', isSelected: false },
      //       ],
      //     },
      //     {
      //       '2024.10.19(토)': [
      //         { time: '09:00', isSelected: false },
      //         { time: '10:00', isSelected: false },
      //       ],
      //     },
      //   ],
    },
  });

  // console.log('dddd  ', defaultValues?.selectedDays);

  const [selectDay, setSelectedDay] = React.useState<string[]>([]);
  const [selectTime, setSelectedTime] = React.useState<string[]>([]);

  // for calendar
  const [markedDates, setMarkedDates] = React.useState<Record<string, { selected: boolean }>>({}); // ex) {"2024-10-15": {"selected": true}}

  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  const handleCreateSchedule = async (data: z.infer<typeof TForm>) => {
    console.log('All fromData  ', data);
  };

  // 선택된 날짜를 투표 날짜로 변환
  const convertToScheduleArray = (dates: string[]): { [key: string]: TimeSlot[] }[] => {
    dates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    return dates.map((date) => ({
      [date]: Array.from({ length: 12 }, (_, index) => ({
        time: `${('0' + (9 + index)).slice(-2)}:00`, // '09:00', '10:00', ..., '21:00'
        isSelected: false,
      })),
    }));
  };

  // 선택한 날짜 값 삭제
  function removeDate(
    dateToRemove: string,
    scheduleArray: { [key: string]: TimeSlot[] }[],
  ): { [key: string]: TimeSlot[] }[] {
    return scheduleArray.filter((item) => Object.keys(item)[0] !== dateToRemove);
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: '일정 추가',
          headerRight: () => (
            <Button
              variant={'default'}
              size={'small'}
              onPress={handleSubmit(handleCreateSchedule)}
              disabled={!isValid}
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
              <Controller
                name='title'
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onBlur={onBlur}
                    value={value}
                    onChangeText={onChange}
                    placeholder='일정 제목을 입력하세요'
                    className='mb-3'
                  />
                )}
              />
              {errors.title && <Text>This field is required.</Text>}
            </View>
            <View className='mb-6'>
              <Text className='mb-2 text-sm text-[#111111]'>인원 선택</Text>
              <Controller
                name='member_cnt'
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <Select
                    value={options.find((c) => c.value === value)}
                    onValueChange={(option) => {
                      onChange(option?.value);
                    }}>
                    <SelectTrigger className='w-full'>
                      <SelectValue
                        className='native:text-lg text-sm text-foreground'
                        placeholder='인원을 선택해주세요222'
                      />
                    </SelectTrigger>
                    <SelectContent insets={contentInsets} className='w-full'>
                      <SelectGroup>
                        <SelectLabel>선택</SelectLabel>
                        {options.map((item) => (
                          <SelectItem key={item.value} label={item.label} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </View>
            <View className='mb-6'>
              <Text className='mb-2 text-sm text-[#111111]'>날짜 선택</Text>
              <View>
                <CalendarBox
                  editable
                  initMarkedDates={{}}
                  markedDates={markedDates}
                  onDaySelect={(day) => {
                    setMarkedDates((prev) => {
                      const newMarkedDates = { ...prev }; // Create a new copy of the current markedDates

                      // If the date exists, remove it; otherwise, add it
                      if (newMarkedDates[day]) {
                        delete newMarkedDates[day]; // Remove the date
                      } else {
                        newMarkedDates[day] = { selected: true }; // Add the date
                      }

                      // 시간 선택 리스트
                      const selectedDateArray = Object.keys(newMarkedDates)?.filter(
                        (date) => newMarkedDates[date].selected,
                      );

                      const convertSelectedDays = convertToScheduleArray(selectedDateArray);
                      // console.log('convertSelectedDays  ', JSON.stringify(convertSelectedDays));

                      setValue('selected_days', convertSelectedDays);
                      return newMarkedDates; // Return the updated object
                    });
                  }}
                  // onDaySelect={(day, days) => {
                  //   // TODO - 날짜 가공
                  //   // 날짜 선택시 이벤트
                  //   console.log('111 selected day', day);
                  //   console.log('2222 selected day', days);
                  //   // setSelectedDay(days);
                  //   // setValue;

                  //   const ttt = convertToScheduleArray(days);
                  //   // console.log('ttt  ', JSON.stringify(ttt));

                  //   setValue('selected_days', ttt);
                  // }}
                />
              </View>
            </View>
            <View className='mb-6'>
              <Text className='text-smtext-[#111111] mb-2'>시간 선택</Text>
              <Controller
                name='selected_days'
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <FlashList
                    data={value}
                    renderItem={({ item }) => {
                      const keyDate = item ? Object.keys(item)[0] : '';
                      const valueTime = item ? item[keyDate] : [];

                      return (
                        <View key={keyDate} className='mb-2 bg-white px-5 py-3'>
                          <View className='mb-2.5 flex w-full flex-row justify-between'>
                            <Text className='mb-2 text-sm font-semibold text-[#000000]'>{keyDate}</Text>
                            <Pressable
                              onPress={() => {
                                // 1) formDate 에서 삭제
                                const removedDate = removeDate(keyDate, value);
                                setValue('selected_days', removedDate);

                                // 2) 달력에서 삭제
                                console.log('dddd  ', markedDates);
                                // const ttt = removeDate(keyDate, markedDates)
                              }}>
                              <ImageBox source={images.icon_remove} className='h-5 w-5' />
                            </Pressable>
                          </View>
                          <View className='justify-starts flex flex-row flex-wrap'>
                            {(valueTime ?? []).map((subItem, index) => {
                              return (
                                <Pressable
                                  onPress={() => {
                                    console.log('선택한 시간 ::: ', keyDate, subItem.time);
                                    setSelectedTime((prev) => {
                                      return { ...prev, [subItem?.time as string]: !subItem?.isSelected };
                                    });
                                  }}
                                  key={index}
                                  className={cn(
                                    'h-[38px] items-center justify-center rounded-md border border-[#E5E5EC]',
                                    (subItem?.isSelected as boolean) ? 'bg-brand' : 'bg-[#F1F1F5]',
                                  )}
                                  style={{
                                    width: width / 4 - 40, // margin 값 기준으로 40만큼 깍아서 좌우 정렬 맞춤 4열
                                    margin: 8,
                                  }}>
                                  <Text className={cn(subItem?.isSelected ? 'text-white' : 'text-[#999999]')}>
                                    {subItem?.time}
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
                )}
              />
            </View>
          </ScrollView>
        </Wrap>
      </Container>
    </>
  );
}
