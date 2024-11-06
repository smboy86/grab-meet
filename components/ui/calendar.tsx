import * as React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '~/lib/utils';
import { ViewRef } from '@rn-primitives/types';
import images from '~/constants/images';
import { ImageBox } from '../ui/imageBox';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Theme } from 'react-native-calendars/src/types';

interface CalendarBoxProps extends ViewProps {
  input?: boolean; // 입력모드
  initMarkedDates?: Record<string, { selected: boolean }>; // 초기 선택된 날짜
  onDaySelect?: (selectDay: string, selectedDays: string[]) => void; // 날짜 선택시 이벤트
}

// Theme 타입 확장
interface CustomTheme {
  'stylesheet.calendar.header'?: {
    header?: {
      flexDirection?: string;
      justifyContent?: string;
      paddingLeft?: number;
      paddingRight?: number;
      marginTop?: number;
      alignItems?: string;
    };
  };
}

LocaleConfig.locales.kr = {
  monthNames: [
    '01월',
    '02월',
    '03월',
    '04월',
    '05월',
    '06월',
    '07월',
    '08월',
    '09월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '01월',
    '02월',
    '03월',
    '04월',
    '05월',
    '06월',
    '07월',
    '08월',
    '09월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
};
LocaleConfig.defaultLocale = 'kr';

const CalendarBox = React.forwardRef<ViewRef, CalendarBoxProps>(
  ({ input, initMarkedDates, onDaySelect }, ref) => {
    const [selectedDate, setSelectedDate] = React.useState<string | null>(null);
    const [markedDates, setMarkedDates] = React.useState<Record<string, { selected: boolean }>>(
      initMarkedDates || {},
    ); // ex) {"2024-10-15": {"selected": true}}

    const updatedMarkedDates = React.useMemo(() => ({ ...markedDates }), [markedDates]);

    const handleToggleDate = (date: string) => {
      setMarkedDates((prev) => {
        const newMarkedDates = { ...prev }; // Create a new copy of the current markedDates

        // If the date exists, remove it; otherwise, add it
        if (newMarkedDates[date]) {
          delete newMarkedDates[date]; // Remove the date
        } else {
          newMarkedDates[date] = { selected: true }; // Add the date
        }

        // 상위 컴포넌트 이벤트 호출
        if (onDaySelect) {
          onDaySelect(
            date,
            Object.keys(newMarkedDates)?.filter((date) => newMarkedDates[date].selected),
          );
        }

        return newMarkedDates; // Return the updated object
      });
    };

    return (
      <View className={cn('w-full', !input && 'rounded-md border border-[#E5E5EC] p-4')}>
        <Calendar
          onDayPress={(day) => {
            handleToggleDate(day.dateString);
          }}
          markedDates={updatedMarkedDates}
          renderArrow={(direction) => {
            return direction === 'left' ? (
              <ImageBox className={'h-5 w-5'} source={images.icon_arrow_left} />
            ) : (
              <ImageBox className={'h-5 w-5'} source={images.icon_arrow_right} />
            );
          }}
          // 이하 스타일관련
          monthFormat='MM월'
          style={{
            // backgroundColor: '#000', // 날짜 제외 부분 배경색 거의 의미 없음
            paddingLeft: 24,
            paddingRight: 24,
            paddingTop: 20,
            paddingBottom: 30,
          }}
          theme={
            {
              calendarBackground: '#ffffff', // 캘린더 배경색
              selectedDayBackgroundColor: input ? '#F59917' : '#FCEA60', // 선택한 날짜 동그란 배경색
              selectedDayTextColor: '#000', // 선택한 날짜 텍스트 색상
              todayTextColor: '#111111', // 오늘날짜 텍스트 색상
              dayTextColor: '#999999', // 해당 월 날짜 색상
              textDayHeaderFontSize: 13, // dayName 폰트 사이즈
              // ## 이하 스타일 강제 정의
              'stylesheet.calendar.header': {
                header: {
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 6,
                  alignItems: 'center',
                },
                dayTextAtIndex0: { color: 'red' }, // 일요일 dayName 색상 빨간색
                dayTextAtIndex1: { color: '#111111' }, // d dayName 색상 빨간색
                dayTextAtIndex2: { color: '#111111' }, // 일요일 dayName 색상 빨간색
                dayTextAtIndex3: { color: '#111111' }, // 일요일 dayName 색상 빨간색
                dayTextAtIndex4: { color: '#111111' }, // 일요일 dayName 색상 빨간색
                dayTextAtIndex5: { color: '#111111' }, // 일요일 dayName 색상 빨간색
                dayTextAtIndex6: { color: '#111111' }, // 일요일 dayName 색상 빨간색
              },
            } as Theme
          }
        />
      </View>
    );
  },
);
CalendarBox.displayName = 'Calendar';

export { CalendarBox };
export type { CalendarBoxProps };
