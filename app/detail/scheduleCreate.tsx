import { FlashList } from '@shopify/flash-list';
import { Stack, useRouter } from 'expo-router';
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
import useMutationInsertSchedule, { useMutationInsertScheduleProps } from '~/api/useMutationInsertSchedule';

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
};

type DateTimeSlot = {
  [key: string]: {
    time: string;
  }[];
};

type TargetDateTimeSlot = {
  [key: string]: {
    time: string;
  }[];
};

const TimeSlotScheme = z.object({
  time: z.string(),
});

const DayTimeScheme = z.array(
  z.record(
    z.string(), // Date 형태의 키를 사용합니다.
    z.array(TimeSlotScheme),
  ),
);

export const TForm = z.object({
  // title: z.string({ required_error: '필수값이에요' }).max(3, { message: 'err 일정 제목이 너무 길어요' }),
  // title: z.string().min(1, { message: 'errrrr' }),
  title: z.string().min(3, {
    message: '일정 제목을 입력해주세요 (3자 이상)',
  }),
  member_cnt: z.string().min(1, {
    message: '인원을 선택해주세요',
  }),
  selected_days: DayTimeScheme.min(1, { message: 'err 시간을 선택해주세요' }),
});

export default function Screen() {
  const router = useRouter();
  const { control, handleSubmit, formState, setValue, trigger } = useForm<z.infer<typeof TForm>>({
    resolver: zodResolver(TForm),
    mode: 'onChange',
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
  const [targetDateTime, setTargetDateTime] = React.useState<DateTimeSlot[]>([]); // 달력 선택시 나열되는 타겟 날짜들 폼

  // for calendar
  const [markedDates, setMarkedDates] = React.useState<Record<string, { selected: boolean }>>({}); // ex) {"2024-10-15": {"selected": true}}

  const { mutateAsync: insertSchedule } = useMutationInsertSchedule();

  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  const handleCreateSchedule = async (data: z.infer<typeof TForm>) => {
    console.log('최종 제출 :::  ', JSON.stringify(data));
    const params: useMutationInsertScheduleProps = {
      title: data.title,
      member_cnt: Number(data.member_cnt),
      date_time: data.selected_days,
    };

    insertSchedule(
      { ...params },
      {
        onSuccess: (data) => {
          alert('생성 되었습니다.');
          router.replace('/home');
        },
        onError: (err) => {
          console.log('errrr  ', err);
        },
      },
    );
  };

  // 선택된 날짜를 투표 날짜로 변환
  const convertToScheduleArray = (dates: string[]): { [key: string]: TimeSlot[] }[] => {
    dates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    return dates.map((date) => ({
      [date]: Array.from({ length: 12 }, (_, index) => ({
        time: `${('0' + (9 + index)).slice(-2)}:00`, // '09:00', '10:00', ..., '21:00'
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

  // 날짜 선택시 선택 유무 업데이트
  const updateTimeSelection = (
    scheduleData: DateTimeSlot[],
    targetDate: string,
    targetTime: string,
  ): DateTimeSlot[] => {
    return scheduleData.map((dateObj) => {
      // 날짜가 일치하는 경우에만 처리
      if (dateObj[targetDate]) {
        return {
          [targetDate]: dateObj[targetDate].map((timeSlot) => {
            // 시간이 일치하는 경우 isSelected 값을 변경
            if (timeSlot.time === targetTime) {
              // return { ...timeSlot, isSelected: !timeSlot.isSelected };
              return { ...timeSlot };
            }
            return timeSlot;
          }),
        };
      }
      return dateObj;
    });
  };

  // 시간 선택시 변수 값을 추가/삭제하는 토글 함수
  const toggleSelectedTime = (
    data: TargetDateTimeSlot[],
    date: string,
    time: string,
  ): TargetDateTimeSlot[] => {
    // 현재 데이터의 복사본 생성
    let result = [...data];

    // 해당 날짜의 데이터 찾기
    const dateIndex = result.findIndex((item) => Object.keys(item)[0] === date);

    if (dateIndex === -1) {
      // 날짜가 존재하지 않으면 새로 추가
      return [...result, { [date]: [{ time }] }];
    }

    const dateData = result[dateIndex];
    const timeSlots = dateData[date];

    // 해당 시간이 이미 존재하는지 확인
    const timeIndex = timeSlots.findIndex((slot) => slot.time === time);

    if (timeIndex === -1) {
      // 시간이 존재하지 않으면 추가
      dateData[date] = [...timeSlots, { time }];
    } else {
      // 시간이 존재하면 삭제
      dateData[date] = timeSlots.filter((slot) => slot.time !== time);

      // 해당 날짜의 모든 시간이 삭제되었다면 날짜도 제거
      if (dateData[date].length === 0) {
        result = result.filter((_, index) => index !== dateIndex);
      }
    }

    return result;
  };

  // 날짜 삭제시 날짜 값을 삭제하는 함수
  const deleteDate = (data: DateTimeSlot[], date: string): DateTimeSlot[] => {
    // 해당 날짜를 제외한 데이터만 반환
    return data.filter((item) => !Object.keys(item).includes(date));
  };

  // 현재 날짜와 시간이 존재하는지 체크 (for 활성화)
  const checkTimeExists = (data: TargetDateTimeSlot[], date: string, time: string): boolean => {
    // 해당 날짜의 데이터 찾기
    const dateData = data.find((item) => Object.keys(item)[0] === date);

    if (!dateData) {
      return false;
    }

    // 해당 시간이 존재하는지 확인
    return dateData[date].some((timeSlot) => timeSlot.time === time);
  };

  React.useEffect(() => {
    trigger();
  }, []);

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
              disabled={!formState.isValid}
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
              <Text className='mb-2 text-sm text-[#111111]'>
                일정 제목{' '}
                {formState.errors.title && (
                  <Text className='ml-1.5 text-xs text-[#E73B2F]'>*{formState.errors.title.message}</Text>
                )}
              </Text>
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
            </View>
            <View className='mb-6'>
              <Text className='mb-2 text-sm text-[#111111]'>
                인원 선택{' '}
                {formState.errors.member_cnt && (
                  <Text className='ml-1.5 text-xs text-[#E73B2F]'>
                    *{formState.errors.member_cnt.message}
                  </Text>
                )}
              </Text>
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
                        placeholder='인원을 선택해주세요'
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

                      setTargetDateTime(convertSelectedDays);
                      return newMarkedDates; // Return the updated object
                    });
                  }}
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
                    data={targetDateTime}
                    renderItem={({ item }) => {
                      const keyDate = item ? Object.keys(item)[0] : '';
                      const valueTime = item ? item[keyDate] : [];

                      return (
                        <View key={keyDate} className='mb-2 bg-white px-5 py-3'>
                          <View className='mb-2.5 flex w-full flex-row justify-between'>
                            <Text className='mb-2 text-sm font-semibold text-[#000000]'>{keyDate}</Text>
                            <Pressable
                              onPress={() => {
                                // 1) form 데이터 셋팅
                                onChange(deleteDate(value, keyDate));
                                // 2) 달력에서 삭제
                                setMarkedDates((prev) => {
                                  const newMarkedDates = { ...prev };

                                  if (newMarkedDates[keyDate]) {
                                    delete newMarkedDates[keyDate]; // Remove the date
                                  } else {
                                    newMarkedDates[keyDate] = { selected: true }; // Add the date
                                  }

                                  // 시간 선택 리스트
                                  const selectedDateArray = Object.keys(newMarkedDates)?.filter(
                                    (date) => newMarkedDates[date].selected,
                                  );

                                  return newMarkedDates; // Return the updated object
                                });
                                // 3) 시간선택 리스트에서 삭제
                                setTargetDateTime((prev) => deleteDate(targetDateTime, keyDate));
                              }}>
                              <ImageBox source={images.icon_remove} className='h-5 w-5' />
                            </Pressable>
                          </View>
                          <View className='justify-starts flex flex-row flex-wrap'>
                            {(valueTime ?? []).map((subItem, index) => {
                              return (
                                <Pressable
                                  onPress={() => {
                                    // 1) form 데이터 셋팅
                                    onChange(toggleSelectedTime(value, keyDate, subItem.time));

                                    // 2) selcted 렌더링
                                    setTargetDateTime((prev) =>
                                      updateTimeSelection(targetDateTime, keyDate, subItem.time),
                                    );
                                  }}
                                  key={index}
                                  className={cn(
                                    'h-[38px] items-center justify-center rounded-md border border-[#E5E5EC]',
                                    checkTimeExists(value, keyDate, subItem.time)
                                      ? 'bg-brand'
                                      : 'bg-[#F1F1F5]',
                                  )}
                                  style={{
                                    width: width / 4 - 40, // margin 값 기준으로 40만큼 깍아서 좌우 정렬 맞춤 4열
                                    margin: 8,
                                  }}>
                                  <Text
                                    className={cn(
                                      checkTimeExists(value, keyDate, subItem.time)
                                        ? 'text-white'
                                        : 'text-[#999999]',
                                    )}>
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
