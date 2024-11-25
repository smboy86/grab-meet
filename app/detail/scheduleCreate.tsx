// TODO - 달력, 오늘 이전 날짜는 선택 불가능
// TODO - 일정 생성시 Alert 창만 보여줄건지
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
import { cn, convertToScheduleArray, toggleSelectedTime } from '~/lib/utils';
import * as z from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useMutationInsertSchedule, { useMutationInsertScheduleProps } from '~/api/useMutationInsertSchedule';
import { DateTime } from '~/types/schedule.types';

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
    },
  });
  const [targetDateTime, setTargetDateTime] = React.useState<DateTime>([]); // 달력 선택시 나열되는 타겟 날짜들 폼

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
    const params: useMutationInsertScheduleProps = {
      title: data.title,
      member_cnt: Number(data.member_cnt),
      date_time: data.selected_days,
    };

    insertSchedule(
      { ...params },
      {
        onSuccess: () => {
          alert('생성 되었습니다.');
          router.replace('/home');
        },
        onError: (err) => {
          console.log('errrr  ', err);
        },
      },
    );
  };

  // 날짜 선택시 선택 유무 업데이트
  const updateTimeSelection = (scheduleData: DateTime, targetDate: string, targetTime: string): DateTime => {
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

  // 날짜 삭제시 날짜 값을 삭제하는 함수
  const deleteDate = (data: DateTime, date: string): DateTime => {
    // 해당 날짜를 제외한 데이터만 반환
    return data.filter((item) => !Object.keys(item).includes(date));
  };

  // 현재 날짜와 시간이 존재하는지 체크 (for 활성화)
  const checkTimeExists = (data: DateTime, date: string, time: string): boolean => {
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
        <Wrap type='default' scroll>
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
