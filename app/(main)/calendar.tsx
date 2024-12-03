// TODO - 스크롤 할때 달력 위로 말려 올라가는 애니메이션

import { FlashList } from '@shopify/flash-list';
import dayjs from 'dayjs';
import { useFocusEffect, useRouter } from 'expo-router';
import { isEmpty } from 'lodash';
import { useCallback, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { View } from 'react-native';
import useGetCalrendarList from '~/api/useGetCalrendarList';
import { EmptyList } from '~/components/EmptyList';
import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { Header } from '~/components/layout/header';
import { DateItem } from '~/components/screen/dateItem';
import { CalendarBox } from '~/components/ui/calendar';
import { checkDateExists, extractDate, extractTime } from '~/lib/utils';
import { useAuth } from '~/providers/AuthProvider';

export default function CalendarScreen() {
  const { isLogin } = useAuth();
  const router = useRouter();
  // for calendar
  // const [markedDates, setMarkedDates] = useState<Record<string, { selected: boolean }>>({}); // ex) {"2024-10-15": {"selected": true}}
  const [markedDates, setMarkedDates] = useState<Record<string, { selected: boolean }>>({
    [`${dayjs().format('YYYY-MM-DD')}`]: { selected: true },
  }); // ex) {"2024-10-15": {"selected": true}} // 오늘 날짜 셋팅
  const { data, isLoading, refetch } = useGetCalrendarList({ date: '' });

  const listData = useMemo(() => {
    if (isEmpty(data)) return [];

    const searchDateTime = Object.keys(markedDates).filter((date) => markedDates[date]);
    const filteredData = data?.filter((item) => {
      const convertJson = item?.confirm_date === null ? null : JSON.parse(item.confirm_date as string);
      const isChecked = checkDateExists(convertJson, searchDateTime);
      return isChecked;
    });
    return filteredData;
  }, [markedDates, data]);

  const handleAddSchedule = () => {
    if (!isLogin) {
      Alert.alert('로그인', '로그인이 필요합니다.', [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            router.push(`/auth/login`);
          },
        },
      ]);

      return;
    }

    //
    router.push(`/detail/scheduleCreate`);
  };

  // 포커스 재조회
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );

  if (isLoading) return null;

  return (
    <Container main>
      <Header type='btn' onAction={handleAddSchedule} actionBtnText='일정 추가' />
      <Wrap type='default' full>
        <CalendarBox
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

              return newMarkedDates; // Return the updated object
            });
          }}
        />
        <View className='mt-4 flex flex-1'>
          <FlashList
            data={listData}
            renderItem={({ item }) => {
              return (
                <DateItem
                  title={item.title || ''}
                  member_cnt={item.member_cnt || 0}
                  confirm_date={extractDate(item.confirm_date)}
                  confirm_time={extractTime(item.confirm_date)}
                  status={item.status || ''}
                  onPress={() => {
                    router.push({
                      pathname: `/detail/schedule/[id]`,
                      params: {
                        id: item.schedule_id as string,
                        mode: 'view',
                      },
                    });
                  }}
                />
              );
            }}
            ListFooterComponent={<View className='py-10' />}
            estimatedItemSize={40}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <EmptyList content={['해당 날짜에 일정이 없습니다.', '달력의 날짜를 선택하세요']} />
            }
          />
        </View>
      </Wrap>
    </Container>
  );
}
