// TODO - 카카오 공유하기
import { Stack, useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, Platform, Pressable, ScrollView, View } from 'react-native';
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
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import useMutationScheduleInfo from '~/api/useMutationScheduleInfo';
import { isEmpty } from 'lodash';
import { DateTime } from '~/types/schedule.types';
import { isActive } from '~/lib/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { domain } from '~/constants/options';
import * as Clipboard from 'expo-clipboard';
import { shareCustomTemplate, shareFeedTemplate, shareTextTemplate } from '@react-native-kakao/share';

import 'dayjs/locale/ko'; // TODO - web에서 locale 지정이 풀리는 문제 발견
dayjs.locale('ko');

const TimeSlotScheme = z.object({
  time: z.string(),
});

const DayTimeScheme = z.array(
  z.record(
    z.string(), // Date 형태의 키를 사용합니다.
    z.array(TimeSlotScheme),
  ),
);

const TForm = z.object({
  confirm_date: DayTimeScheme.nonempty({
    message: '일정을 선택해주세요.',
  }),
});

export default function ScheduleInfo() {
  const { id, mode } = useLocalSearchParams<{ id: string; mode: string }>();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { data, isLoading, refetch } = useGetScheduleDetail({ id });
  const scheduleData = useMemo(() => {
    return data && data.length > 0 ? data[0] : null;
  }, [data]);

  const [selectedDateTime, setSelectedDateTime] = useState<DateTime>([]);

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

  const handleConfirmTime = async (data: z.infer<typeof TForm>) => {
    updateScheduleInfo(
      {
        id,
        confirm_date: data.confirm_date,
      },
      {
        onSuccess: () => {
          alert('확정 되었습니다.');
          router.replace('/(main)/home');
        },
      },
    );
  };

  // label 처리
  const getLabelAtDateTime = (date: DateTime) => {
    if (date.length < 1) return '';

    const yyyymmdd = Object.keys(date[0])[0];
    return `${yyyymmdd} (${dayjs(yyyymmdd).format('dd')}) ${date[0][yyyymmdd][0].time} `;
  };

  useEffect(() => {
    trigger(); // 수동으로 체크하는 이게 최선인가..?

    // if (scheduleData?.confirm_date && !isEmpty(scheduleData.confirm_date)) {
    //   setSelectedDateTime(JSON.parse(scheduleData.confirm_date));
    //   setValue('confirm_date', JSON.parse(scheduleData.confirm_date), { shouldValidate: true });
    // }
    if (scheduleData?.confirm_date && !isEmpty(scheduleData.confirm_date)) {
      const parsedConfirmDate = JSON.parse(scheduleData.confirm_date);

      if (typeof parsedConfirmDate === 'string' || typeof parsedConfirmDate === 'number') {
        setSelectedDateTime(parsedConfirmDate);
        setValue('confirm_date', parsedConfirmDate.toString(), { shouldValidate: true });
      } else {
        console.error('Invalid confirm_date format:', parsedConfirmDate);
      }
    }
  }, []);

  // 포커스 재조회
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: '미팅 상세',
          headerRight: () => {
            if (mode === 'view') {
              return null;
            }

            return (
              <Button
                className='bg-brand'
                variant={'default'}
                size={'small'}
                onPress={() => {
                  setOpen(true);
                }}
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
                        {/* {times.map((time: string) => ( */}
                        {times.map(({ time }) => (
                          <GrabDateItem
                            isEditable={mode === 'edit'}
                            key={`${date}-${time}`}
                            isInit={selectedDateTime.length === 0}
                            isSelected={isActive(selectedDateTime, date, time)}
                            date={time}
                            userCnt={scheduleData.member_cnt ?? 0}
                            selectedCnt={0}
                            onAction={() => {
                              setSelectedDateTime([{ [date]: [{ time }] }]);
                              setValue('confirm_date', [{ [date]: [{ time }] }], { shouldValidate: true });
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
                    {`${domain}/public/grab/${id}`}
                  </Text>
                </View>
                <Pressable
                  className=''
                  onPress={async () => {
                    await Clipboard.setStringAsync(`${domain}/public/grab/${id}`);
                    alert('복사 완료');
                  }}>
                  <ImageBox source={images.icon_copy} style={{ width: 20, height: 20 }} className='h-5 w-5' />
                </Pressable>
              </View>
            </View>
            <View className='mb-6'>
              <Button
                variant='outline'
                className=''
                onPress={() => {
                  // const template = {
                  //   content: KakaoTemplateContent;
                  //   // itemContent?: KakaoTemplateItemContent;
                  //   // social?: KakaoTemplateSocial;
                  //   // buttons?: KakaoTemplateButton[];
                  //   buttonTitle?: '하이';
                  // }
                  if (Platform.OS === 'web') {
                    Alert.alert('안내', '웹에서는 카카오 공유하기가 작동하지 않습니다.');
                    return;
                  }

                  shareCustomTemplate({
                    templateId: 114268,
                    templateArgs: {},
                    serverCallbackArgs: {},
                    // useWebBrowserIfKakaoTalkNotAvailable: true,
                  }).catch(console.log);
                  // shareTextTemplate({
                  //   template: {
                  //     text: 'text',
                  //     link: {
                  //       webUrl: 'https://mjstudio.net',
                  //       mobileWebUrl: 'https://mjstudio.net',
                  //       iosExecutionParams: {},
                  //       androidExecutionParams: {},
                  //     },
                  //     buttons: [
                  //       {
                  //         title: '앱에서 보기',
                  //         link: {
                  //           webUrl: 'https://mjstudio.net',
                  //           mobileWebUrl: 'https://mjstudio.net',
                  //           iosExecutionParams: {},
                  //           androidExecutionParams: {},
                  //         },
                  //       },
                  //     ],
                  //   },
                  //   serverCallbackArgs: {},
                  // }).catch((e) => {
                  //   console.log('ffff ', e);
                  // });

                  // export interface KakaoTextTemplate {
                  //   text: string;
                  //   link: KakaoTemplateLink;
                  //   buttons?: KakaoTemplateButton[];
                  //   buttonTitle?: string;
                  // }
                  // try {
                  //   shareTextTemplate({
                  //     template: {
                  //       link: {
                  //         webUrl: `${domain}/public/grab/${id}`,
                  //         mobileWebUrl: `${domain}/public/grab/${id}`,
                  //       },
                  //       text: '공유해보자ㅣㅏㅏㅏ',
                  //     },
                  //     serverCallbackArgs: {},
                  //   })
                  //     .then((data) => {
                  //       console.log('4444  ', data);
                  //     })
                  //     .catch((e) => {
                  //       console.log('eeeee  ', e);
                  //     });
                  // } catch (e) {
                  //   console.log('ffffffff  ', e);
                  // }
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
                {/* 2024.10.17(목) 10:00 */}
                {getLabelAtDateTime(selectedDateTime)}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction className='w-[50%] text-center' onPress={handleSubmit(handleConfirmTime)}>
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
