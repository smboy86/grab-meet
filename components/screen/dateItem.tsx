import * as React from 'react';
import { Pressable, View, ViewProps } from 'react-native';
import { cn } from '~/lib/utils';
import { PressableRef, ViewRef } from '@rn-primitives/types';
import { Text } from '../ui/text';

interface DateItemProps {
  ref?: PressableRef;
  status?: 'a' | 'b' | 'c'; // 투표중, 확정, 종료
  onPress: (item: string) => void;
  // TODO create rightBtn
}

const DateItem = React.forwardRef<React.ElementRef<typeof Pressable>, DateItemProps>(
  ({ status = 'a', onPress }, ref) => {
    return (
      <Pressable
        onPress={() => onPress(status)}
        className='mb-2 flex w-full flex-row justify-between border border-[#E5E5EC] p-5'>
        <View className='w-9/12 items-start justify-center'>
          <Text
            className='text-ellipsis text-lg font-semibold text-[#111111]'
            ellipsizeMode='tail'
            numberOfLines={1}>
            24회 동창회 모임222222222222222222222222 33333333333
          </Text>
          <Text className='text-sm text-[#767676]'>____.__.__ 참여인원 5명</Text>
        </View>
        <View className='flex w-2/12'>
          {status === 'a' /* style 1/3 */ ? (
            <View className='h-[50px] w-[50px] items-center justify-center rounded-full bg-[#F59917]'>
              <Text className='text-[13px]'>투표중</Text>
            </View>
          ) : status === 'b' /* style 2/3 */ ? (
            <View className='h-[50px] w-[50px] items-center justify-center rounded-full bg-[#FCEA60] text-[13px]'>
              <Text className='text-[13px]'>확정</Text>
            </View>
          ) : (
            /* style 3/3 */
            <View className='h-[50px] w-[50px] items-center justify-center rounded-full bg-[#F1F1F5] text-[13px]'>
              <Text className='text-[13px] text-[#767676]'>종료</Text>
            </View>
          )}
        </View>
      </Pressable>
    );
  },
);
DateItem.displayName = 'DateItem';

export { DateItem };
export type { DateItemProps };
