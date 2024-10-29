import * as React from 'react';
import { Pressable, View, ViewProps } from 'react-native';
import { cn } from '~/lib/utils';
import { Text } from '../ui/text';

interface GrabDateItemProps extends ViewProps {
  isSelected?: boolean;
  date?: string;
  userCnt: number;
  selectedCnt: number;
  onAction?: () => void;
}

const GrabDateItem = React.forwardRef<React.ElementRef<typeof Pressable>, GrabDateItemProps>(
  ({ isSelected = false, date = '', userCnt = 0, selectedCnt = 0, onAction }, ref) => {
    const percent = Math.round((selectedCnt / userCnt) * 100);
    return (
      <Pressable onPress={onAction}>
        <View
          className={cn(
            'relative mt-3 rounded-md border bg-[#F1F1F5]',
            isSelected ? 'border-brand' : 'border-[#F1F1F5]',
          )}>
          {/* 1/2) 미선택 회색 / 선택시 노란색  */}
          <View
            className={cn('absolute h-full rounded-md', isSelected ? 'bg-[#FCEA60]' : 'bg-[#E5E5EC]')}
            style={{
              width: `${percent}%`,
            }}
          />
          {/* 2/2) 중요 정보 막대 */}
          <View className='flex h-[38px] flex-row items-center justify-between px-3 text-[13px]'>
            <Text className=''>{date}</Text>
            <View className='flex flex-row gap-1'>
              {percent === 100 && <Text>🔥︎</Text>}
              <Text>{selectedCnt}명</Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  },
);
GrabDateItem.displayName = 'GrabDateItem';

export { GrabDateItem };
export type { GrabDateItemProps };
