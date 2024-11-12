import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import useGetScheduleDetail from '~/api/useGetScheduleInfo';
import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { GrabDateItem } from '~/components/screen/grabDateItem';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog';
import { Button } from '~/components/ui/button';
import { ImageBox } from '~/components/ui/imageBox';
import { Text } from '~/components/ui/text';
import images from '~/constants/images';
import dayjs from 'dayjs';
import { updateDateTime } from '~/lib/utils';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import useMutationScheduleInfo from '~/api/useMutationScheduleInfo';
import { isEmpty } from 'lodash';

export type DateTime = Array<{ [date: string]: string[] }>;

const TForm = z.object({
  confirm_date: z
    .array(
      z.record(
        z.string(), // Date 형태의 키를 사용합니다.
        z.array(z.string()),
      ),
    )
    .nonempty({
      message: '일정을 선택해주세요.',
    }),
});

export default function ScheduleInfo() {
  const { id, mode } = useLocalSearchParams<{ id: string; mode: string }>();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const { data, isLoading, refetch } = useGetScheduleDetail({ id });
  const scheduleData = React.useMemo(() => {
    return data && data.length > 0 ? data[0] : null;
  }, [data]);

  const [selectedDateTime, setSelectedDateTime] = React.useState<DateTime>([]);
  const { handleSubmit, formState, setValue, trigger } = useForm<z.infer<typeof TForm>>({
    resolver: zodResolver(TForm),
    defaultValues: {
      confirm_date: selectedDateTime,
    },
    shouldFocusError: true,
    criteriaMode: 'firstError',
    mode: 'all',
  });

  const { mutateAsync: updateScheduleInfo } = useMutationScheduleInfo();

  // console.log('ffff ', formState);

  if (data && data.length > 0) {
    // console.log('111  ', data);
    // console.log('2222  ', scheduleData);
    // console.log('2222  ', scheduleData?.confirm_date);
    // console.log('333 선택 날짜  ', selectedDateTime);
  }

  // 활성화된 날짜와 시간을 확인하는 함수
  const isActive = (date: string, time: string): boolean => {
    return selectedDateTime.some((entry) => date in entry && entry[date].includes(time));
  };

  const handleUpdateDateTime = (date: string, time: string) => {
    const resultValue = updateDateTime(selectedDateTime, date, time);
    setSelectedDateTime(resultValue);
  };

  const handleConfirmTime = async (data: z.infer<typeof TForm>) => {
    updateScheduleInfo(
      {
        id,
        confirm_date: data.confirm_date,
      },
      {
        onSuccess: (data) => {
          alert('확정 되었습니다.');
          router.replace('/home');
        },
      },
    );
  };

  React.useEffect(() => {
    trigger(); // 수동으로 체크하는 이게 최선인가..?

    if (scheduleData?.confirm_date && !isEmpty(scheduleData.confirm_date)) {
      setSelectedDateTime(JSON.parse(scheduleData.confirm_date));
      setValue('confirm_date', JSON.parse(scheduleData.confirm_date), { shouldValidate: true });
    }
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: '화면에서 타이틀 재정의',
          headerRight: () => {
            if (mode === 'view') {
              return null;
            }

            return (
              <Button
                className='bg-brand'
                variant={'default'}
                size={'small'}
                onPress={handleSubmit(handleConfirmTime)}
                disabled={!formState.isValid}>
                <Text>일정 확정</Text>
              </Button>
            );
          },
        }}
      />
      <Container gray className='items-center justify-center'>
        <Wrap type='default' scroll className='mt-6'>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className='mb-6'>
              <Text className='mb-2 text-sm text-[#111111]'>일정 제목</Text>
              <Text className='text-[15px] font-semibold text-[#111111]'>{scheduleData?.title}</Text>
            </View>
            <View className='mb-6'>
              <Text className='mb-2 text-sm text-[#111111]'>참여 인원</Text>
              <Text className='text-[15px] font-semibold text-[#111111]'>{scheduleData?.member_cnt}명</Text>
            </View>
            <View className='mb-6 flex'>
              <Text className='mb-2 text-sm text-[#111111]'>
                일정 선택{'  '}
                {formState.errors.confirm_date && (
                  <Text className='text-xs text-[#E73B2F]'>* {formState.errors.confirm_date.message}</Text>
                )}
              </Text>
              {Array.isArray(scheduleData?.date_time) &&
                (scheduleData?.date_time as DateTime).map((item) => {
                  const date = Object.keys(item)[0];
                  const times = item[date];

                  return (
                    <View key={date} className='mb-2 rounded-md border border-[#E5E5EC] bg-white px-5 py-3'>
                      <Text className='text-[14px] font-semibold'>
                        {date} ({dayjs(date).format('dd')})
                      </Text>
                      <View className='gab-1'>
                        {times.map((time: string) => (
                          <GrabDateItem
                            isEditable={mode === 'edit'}
                            key={`${date}-${time}`}
                            isInit={selectedDateTime.length === 0}
                            isSelected={isActive(date, time)}
                            date={time}
                            userCnt={scheduleData.member_cnt ?? 0}
                            selectedCnt={2}
                            onAction={() => {
                              // handleUpdateDateTime(date, time);
                              setSelectedDateTime([{ [date]: [time] }]);
                              setValue('confirm_date', [{ [date]: [time] }], { shouldValidate: true });
                            }}
                          />
                        ))}
                      </View>
                    </View>
                  );
                })}
            </View>
            {/* 일정 투표 링크 */}
            <View className='mb-6'>
              <Text className='mb-2 text-sm text-[#111111]'>일정 투표 링크</Text>
              <View className='flex w-full flex-row justify-between rounded-md border border-[#E5E5EC] bg-white p-3'>
                <View className='w-10/12 flex-nowrap'>
                  <Text className='flex-nowrap' numberOfLines={1}>
                    https://url.kr/a99a6whttpsttps://url.kr/a99a6w
                  </Text>
                </View>
                <Pressable className='' onPress={() => alert('복사 완료')}>
                  <ImageBox source={images.icon_copy} style={{ width: 20, height: 20 }} className='h-5 w-5' />
                </Pressable>
              </View>
            </View>
            <View className='mb-6'>
              <Button
                variant='outline'
                className=''
                onPress={() => {
                  alert('카카오로 공유하기');
                }}>
                <Text>카카오로 공유하기</Text>
              </Button>
            </View>
          </ScrollView>
        </Wrap>
        {/* alert */}
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>일정을 확정하시겠습니까?</AlertDialogTitle>
              <AlertDialogDescription className=''>
                <Text>선택된 일정</Text> {'\n'}
                2024.10.17(목) 10:00{'\n'}
                2024.10.18(금) 10:00, 11:00
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction
                className='w-[50%] text-center'
                onPress={() => {
                  router.push('/pub/detail/scheduleConfirm');
                }}>
                <Text>확정</Text>
              </AlertDialogAction>
              <AlertDialogCancel className='w-[50%] text-center'>
                <Text>취소</Text>
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Container>
    </>
  );
}
