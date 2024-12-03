import * as React from 'react';
import { Pressable, View } from 'react-native';
import { cn } from '~/lib/utils';
import { PressableRef } from '@rn-primitives/types';
import { Text } from '../ui/text';
import { Json } from '~/types/database.types';
import dayjs from 'dayjs';
import { ImageBox } from '../ui/imageBox';
import images from '~/constants/images';

interface DateItemProps {
  ref?: PressableRef;
  title: string;
  status: string; // 투표중, 확정, 종료
  member_cnt: number;
  confirm_date: Json | null; // 확정일 2024. 10. 11
  confirm_time: string | null; // 확정 시간 14:00
  onPress: (item: string) => void;
}

const DateItem = React.forwardRef<React.ElementRef<typeof Pressable>, DateItemProps>(
  ({ title, status = 'a', member_cnt = 0, confirm_date, confirm_time, onPress }, ref) => {
    return (
      <Pressable
        onPress={() => onPress(status)}
        className='mb-3 flex w-full flex-row justify-between rounded-[20px] border border-[#E5E5EC] p-5'>
        <View className='w-9/12 items-start justify-center'>
          <Text
            className='text-ellipsis text-lg font-semibold text-[#111111]'
            ellipsizeMode='tail'
            numberOfLines={1}>
            {title}
          </Text>
          <View className='flex flex-row'>
            <Text className='pr-2 text-sm text-[#767676]'>
              {confirm_date ? confirm_date.toString() : '____.__.__'}
            </Text>
            <Text className='pr-2 text-sm text-[#767676]'>참여인원 {member_cnt}명</Text>
            <View className='flex-row items-end justify-center pr-1'>
              <ImageBox source={images.icon_clock} className='mr-1 h-[16px] w-[16px]' />
              <Text className='text-sm text-[#767676]'>{confirm_time}</Text>
            </View>
          </View>
        </View>
        <View className='flex w-2/12'>
          <View
            className={cn(
              'h-[50px] w-[50px] items-center justify-center rounded-full',
              status === '투표중' && 'bg-[#F59917]',
              status === '확정' && 'bg-[#FCEA60]',
              status === '종료' && 'bg-[#F1F1F5]',
            )}>
            <Text className={cn('text-[13px]', status === '종료' && 'text-[#767676]')}>
              {status === '확정'
                ? `D-${Math.floor(dayjs(confirm_date?.toString() ?? '').diff(dayjs(), 'day', true))}`
                : status}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  },
);
DateItem.displayName = 'DateItem';

export { DateItem };
