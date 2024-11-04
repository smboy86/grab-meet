import * as React from 'react';
import { Pressable, View, ViewProps } from 'react-native';
import { cn } from '~/lib/utils';
import { PressableRef, ViewRef } from '@rn-primitives/types';
import { Text } from '../ui/text';

interface DateItemProps {
  ref?: PressableRef;
  title: string;
  status: string; // 투표중, 확정, 종료
  member_cnt: number;
  confirm_date: string | null; // 확정일 2024. 10. 11
  onPress: (item: string) => void;
}

const DateItem = React.forwardRef<React.ElementRef<typeof Pressable>, DateItemProps>(
  ({ title, status = 'a', member_cnt = 0, confirm_date, onPress }, ref) => {
    return (
      <Pressable
        onPress={() => onPress(status)}
        className='mb-2 flex w-full flex-row justify-between border border-[#E5E5EC] p-5'>
        <View className='w-9/12 items-start justify-center'>
          <Text
            className='text-ellipsis text-lg font-semibold text-[#111111]'
            ellipsizeMode='tail'
            numberOfLines={1}>
            {title}
          </Text>
          <Text className='text-sm text-[#767676]'>
            {confirm_date ? confirm_date : '____.__.__'} 참여인원 {member_cnt}명
          </Text>
        </View>
        <View className='flex w-2/12'>
          <View
            className={cn(
              'h-[50px] w-[50px] items-center justify-center rounded-full',
              status === '투표중' && 'bg-[#F59917]',
              status === '확정' && 'bg-[#FCEA60]',
              status === '종료' && 'bg-[#F1F1F5]',
            )}>
            <Text className={cn('text-[13px]', status === '종료' && 'text-[#767676]')}>{status}</Text>
          </View>
        </View>
      </Pressable>
    );
  },
);
DateItem.displayName = 'DateItem';

export { DateItem };
