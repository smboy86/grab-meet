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
import { extractDate, extractTime } from '~/lib/utils';
import { useAuth } from '~/providers/AuthProvider';

export default function CalendarScreen() {
  const { isLogin } = useAuth();
  const router = useRouter();
  // for calendar
  const [curMonth, setCurMonth] = useState(dayjs());
  const [markedDates, setMarkedDates] = useState<Record<string, { selected: boolean }>>(); // ex) [{"2024-10-15": {"selected": true}}] // 오늘 날짜 셋팅
  const { data, isLoading, refetch } = useGetCalrendarList({ date: '' });

  const listData = useMemo(() => {
    if (isEmpty(data)) return [];
    // 1) 필터 - 현재 월에 해당하는 데이터만 보임
    const filteredData = data?.filter((item) => {
      const parsedData: null | Array<{ [date: string]: string }> =
        item?.confirm_date === null ? null : JSON.parse(item.confirm_date as string);
      if (parsedData === null) return false;
      const dateKey = Object.keys(parsedData[0])[0]; // only 1

      return curMonth.isSame(dateKey, 'month'); //   같은 달만 보이게
    });

    const markedDays = filteredData?.map((item) => {
      const parsedData: null | Array<{ [date: string]: string }> =
        item?.confirm_date === null ? null : JSON.parse(item.confirm_date as string);
      if (parsedData === null) return {};
      const dateKey = Object.keys(parsedData[0])[0]; // only 1

      return {
        [dateKey]: { selected: true },
      };
    });

    // 2) 달력 마크 표시 생성
    const converedMarkedDays = markedDays ? Object.assign({}, ...markedDays) : {};
    setMarkedDates(converedMarkedDays);

    // 2) 정렬 - 날짜 내림차순으로 정렬 (다가오는 순)
    const sortedData = filteredData?.sort((a, b) => {
      const parsedDataA: null | Array<{ [date: string]: string }> =
        a?.confirm_date === null ? null : JSON.parse(a.confirm_date as string);
      const parsedDataB: null | Array<{ [date: string]: string }> =
        b?.confirm_date === null ? null : JSON.parse(b.confirm_date as string);
      if (parsedDataA === null || parsedDataB === null) return 0;

      const dateA = Object.keys(parsedDataA[0])[0];
      const dateB = Object.keys(parsedDataB[0])[0];

      return dayjs(dateA).diff(dayjs(dateB));
    });

    return sortedData;
  }, [curMonth, data]);

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
          onMonthChange={(date) => {
            // {"dateString": "2025-01-04", "day": 4, "month": 1, "timestamp": 1735948800000, "year": 2025}
            setCurMonth(dayjs(date.dateString));
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
