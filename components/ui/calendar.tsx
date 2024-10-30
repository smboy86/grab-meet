import * as React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '~/lib/utils';
import { ViewRef } from '@rn-primitives/types';
import images from '~/constants/images';
import { ImageBox } from '../ui/imageBox';
import { Text } from '../ui/text';
import { Button } from '../ui/button';
import { Calendar, DateData, LocaleConfig, CalendarProps } from 'react-native-calendars';
import { Theme } from 'react-native-calendars/src/types';

interface CalendarBoxProps extends ViewProps {
  input?: boolean; // 입력모드
  onDaySelect?: (selectDay: string, selectedDays: string[] | undefined) => void; // 날짜 선택시 이벤트
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

const CalendarBox = React.forwardRef<ViewRef, CalendarBoxProps>(({ input, onDaySelect }, ref) => {
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);
  const [markedDates, setMarkedDates] = React.useState<Record<string, { selected: boolean }>>({});

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
          Object.keys(markedDates)?.filter((date) => markedDates[date].selected),
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
        // 이하 스타일관련
        renderArrow={(direction) => {
          return direction === 'left' ? (
            <ImageBox className={'h-5 w-5'} source={images.icon_arrow_left} />
          ) : (
            <ImageBox className={'h-5 w-5'} source={images.icon_arrow_right} />
          );
        }}
        // 여기서 headerStyle은 상단과 날짜 요일을 같이 잡는듯 하다
        // headerStyle={{
        //   flexDirection: 'column',
        //   justifyContent: 'center',
        //   alignItems: 'center',
        // }}
        theme={
          {
            calendarBackground: '#ffffff', // 캘린더 배경색
            selectedDayBackgroundColor: input ? '#F59917' : '#FCEA60', // 선택한 날짜 동그란 배경색
            selectedDayTextColor: '#000', // 선택한 날짜 텍스트 색상
            todayTextColor: '#d9d9d9', // 오늘날짜 텍스트 색상
            //   // 파악중
            //   // backgroundColor: '#000', // 변화 없음
            //   // textSectionTitleColor: '#999999',
            //   // 백업
            //   // arrowStyle: {
            //   //   padding: 10,
            //   // },
            'stylesheet.calendar.header': {
              header: {
                flexDirection: 'row',
                justifyContent: 'center',
                // paddingLeft: 50,
                // paddingRight: 100,
                marginTop: 6,
                alignItems: 'center',
              },
            },
          } as Theme
        }
        // renderHeader={(date: string) => {
        //   return (
        //     <View>
        //       <Text>222</Text>
        //     </View>
        //   );
        // }}
      />
    </View>
  );
});
CalendarBox.displayName = 'Calendar';

export { CalendarBox };
export type { CalendarBoxProps };
