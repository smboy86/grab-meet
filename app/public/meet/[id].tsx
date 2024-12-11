import { shareCustomTemplate } from '@react-native-kakao/share';
import dayjs from 'dayjs';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { isEmpty } from 'lodash';
import { useCallback, useMemo } from 'react';
import { Alert, Platform, ScrollView, View } from 'react-native';
import useGetGrabStatus from '~/api/useGetGrabStatus';
import useGetScheduleDetail from '~/api/useGetScheduleInfo';
import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { GrabDateItem } from '~/components/screen/grabDateItem';
import { Button } from '~/components/ui/button';
import { ImageBox } from '~/components/ui/imageBox';
import { Text } from '~/components/ui/text';
import images from '~/constants/images';
import { findMatchSchedules, isActive } from '~/lib/utils';
import { DateTime, GrabDateTime } from '~/types/schedule.types';

export default function Screen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading, refetch } = useGetScheduleDetail({ id });
  const { data: grabData, refetch: grabRefetch } = useGetGrabStatus({ id });

  const scheduleData = useMemo(() => {
    if (data === undefined || data.length <= 0 || isEmpty(data)) {
      return null;
    }

    if (!data[0]?.confirm_date || isEmpty(data[0].confirm_date)) {
      return null;
    }

    const parsedConfirmDate: DateTime = JSON.parse(data[0].confirm_date as string);

    const dateKey = Object.keys(parsedConfirmDate[0])[0];
    const timeValue = parsedConfirmDate[0][dateKey][0].time;

    return { ...data[0], selectedDateTime: parsedConfirmDate, date: dateKey, time: timeValue };
  }, [data]);

  const grabScheduleData = useMemo(() => {
    if (!grabData) return [];
    if (grabData.length <= 0) return [];

    const result: GrabDateTime = [];
    grabData.forEach((item) => {
      if (item.date_time === null) return;
      const dateTimeList = item.date_time as DateTime;
      dateTimeList.forEach((subItem) => {
        Object.entries(subItem).forEach(([date, times]) => {
          times.forEach((subItemTime) => {
            result.push({
              [date]: {
                time: subItemTime.time,
              },
            });
          });
        });
      });
    });

    return result;
  }, [grabData]);

  const confirmDateLabel = (dateTime: DateTime) => {
    const dateKey = Object.keys(dateTime[0])[0];
    const timeValue = dateTime[0][dateKey][0].time;

    return `${dayjs(dateKey).format('YYYY-MM-DD (dd)')} ${timeValue} `;
  };

  // 포커스 재조회
  useFocusEffect(
    useCallback(() => {
      refetch();
      grabRefetch();
    }, []),
  );

  if (isLoading) {
    return null;
  }

  return (
    <Container className='items-center justify-center bg-white'>
      <Wrap type='default' full>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className='mb-6 flex justify-center text-center'>
            <View className='items-center pt-4'>
              <ImageBox source={images.gif_ok} className='mr-1 h-[80px] w-[80px]' />
            </View>
            <Text className='font-Pretendard-Semibold text-center'>일정이 확정 되었습니다.</Text>
            <Text className='font-Pretendard-Semibold mb-6 text-center'>참여자들에게 공유해주세요!</Text>
            <Button
              variant='kakao'
              className=''
              onPress={() => {
                if (Platform.OS === 'web') {
                  Alert.alert('안내', '웹에서는 카카오 공유하기가 작동하지 않습니다.');
                  return;
                }

                try {
                  shareCustomTemplate({
                    templateId: 114801,
                    templateArgs: {
                      title: '그랩밋',
                      date: '가능한 미팅날을 선택해주세요',
                      time: `14:00`,
                      url: `public/grab/${id}`, // 앞에 / 붙이면 중복 에러
                    },
                    serverCallbackArgs: {},
                  })
                    .then((data) => {
                      // console.log('4444  ', data);
                      // >> data : 42
                    })
                    .catch((e) => {
                      console.log('eeeee  ', e);
                    });
                } catch (e) {
                  console.log('ffffffff  ', e);
                }
              }}>
              <Text>카카오로 공유하기</Text>
            </Button>
          </View>
          <View className='mb-6 w-full border-t border-[#E5E5EC]' />
          <View className='mb-6'>
            <Text className='mb-2 text-sm text-[#111111]'>일정 제목</Text>
            <Text className='font-Pretendard-Semibold text-[15px] text-[#111111]'>{scheduleData?.title}</Text>
          </View>
          <View className='mb-6'>
            <Text className='mb-2 text-sm text-[#111111]'>참여 인원</Text>
            <Text className='font-Pretendard-Semibold text-[15px] text-[#111111]'>
              {grabData !== undefined && grabData?.length <= 0
                ? `${scheduleData?.member_cnt}`
                : `${grabData?.length}/${scheduleData?.member_cnt}`}
              명
            </Text>
          </View>
          <View className='mb-6'>
            <Text className='mb-2 text-sm text-[#111111]'>일정 확정</Text>
            <Text className='font-Pretendard-Semibold text-[15px] text-[#111111]'>
              🔥︎
              {`${dayjs(scheduleData?.date).format('YYYY-MM-DD (dd)')} ${scheduleData?.time}`}
              🔥︎
            </Text>
          </View>
          <View className='mb-6'>
            <Text className='mb-2 text-sm text-[#111111]'>투표 결과</Text>
            <View className='mb-6 flex'>
              {Array.isArray(scheduleData?.date_time) &&
                (scheduleData?.date_time as DateTime).map((item) => {
                  const date = Object.keys(item)[0];
                  const times = item[date];

                  return (
                    <View key={date} className='mb-2 rounded-md border border-[#E5E5EC] bg-white px-5 py-3'>
                      <Text className='font-Pretendard-Semibold text-[14px]'>
                        {date} ({dayjs(date).format('dd')})
                      </Text>
                      <View className='gab-1'>
                        {times.map(({ time }) => {
                          const isActiveValue = isActive(scheduleData.selectedDateTime, date, time);
                          const cntGrabDateTime = findMatchSchedules(grabScheduleData, date, time);

                          return (
                            <GrabDateItem
                              isEditable={false}
                              key={`${date}-${time}`}
                              isInit={scheduleData?.selectedDateTime.length === 0}
                              isSelected={isActiveValue}
                              date={time}
                              userCnt={scheduleData?.member_cnt ?? 0}
                              selectedCnt={cntGrabDateTime}
                            />
                          );
                        })}
                      </View>
                    </View>
                  );
                })}
            </View>
            {Platform.OS !== 'web' && (
              <View className='mb-6 flex'>
                <Button
                  onPress={() => {
                    router.replace('/(main)/home');
                  }}
                  variant='default'
                  className='bg-[#111111] shadow shadow-foreground/5'>
                  <Text>종료</Text>
                </Button>
              </View>
            )}
          </View>
        </ScrollView>
      </Wrap>
    </Container>
  );
}
