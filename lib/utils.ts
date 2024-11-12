import { clsx, type ClassValue } from 'clsx';
import { isEmpty } from 'lodash';
import { twMerge } from 'tailwind-merge';
import { DateTime } from '~/app/detail/schedule/[id]';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractDate(dateString: string | null): string {
  try {
    if (isEmpty(dateString)) {
      return '____.__.__';
    }
    const parsedData = JSON.parse(dateString as string);
    const dateKey = Object.keys(parsedData[0])[0];
    return dateKey;
  } catch (error) {
    // throw new Error('유효하지 않은 날짜 형식입니다.');
    return '____.__.__';
  }
}

// 선택한 날짜와 시간을 업데이트하는 함수
export const updateDateTime = (data: DateTime, date: string, time: string): DateTime => {
  // 날짜가 이미 존재하는지 확인
  const existingDateIndex = data.findIndex((entry) => date in entry);

  if (existingDateIndex !== -1) {
    // 날짜가 존재하면, 새 배열을 생성하여 불변성 유지
    const newData = [...data];
    const existingTimes = newData[existingDateIndex][date];

    if (existingTimes.includes(time)) {
      // 시간이 이미 존재하면 제거
      newData[existingDateIndex] = {
        [date]: existingTimes.filter((t) => t !== time),
      };
      // 시간 목록이 비어있으면 날짜 항목 제거
      if (newData[existingDateIndex][date].length === 0) {
        newData.splice(existingDateIndex, 1);
      }
    } else {
      // 시간이 존재하지 않으면 추가
      newData[existingDateIndex] = {
        [date]: [...existingTimes, time],
      };
    }
    return newData;
  } else {
    // 날짜가 존재하지 않으면 새로운 항목 추가
    return [...data, { [date]: [time] }];
  }
};
