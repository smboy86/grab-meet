// TODO - 멀티 선택 처리
import { Stack, useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import useGetScheduleDetail from '~/api/useGetScheduleInfo';
import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { Header } from '~/components/layout/header';
import { GrabDateItem } from '~/components/screen/grabDateItem';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import dayjs from 'dayjs';
import { DateTime } from '~/types/schedule.types';
import { isEmpty } from 'lodash';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { DayTimeScheme } from '~/types/scheme';
import { zodResolver } from '@hookform/resolvers/zod';
import { FlashList } from '@shopify/flash-list';
import { cn, isActive, toggleSelectedTime } from '~/lib/utils';
import { Json } from '~/types/database.types';

type PageProps = {
  id: string;
};

const { width } = Dimensions.get('window'); // Get screen width

export const TForm = z.object({
  selected_days: DayTimeScheme.min(1, { message: '시간을 선택해주세요' }),
});

export const TFormSec = z.object({
  hp: z.string().min(1),
});

export default function Screen() {
  const { id } = useLocalSearchParams<PageProps>();
  const { data, isLoading, refetch } = useGetScheduleDetail({ id });
  const scheduleData = React.useMemo(() => {
    return data && data.length > 0 ? data[0] : null;
  }, [data]);
  const scheduleTargetDateTime = React.useMemo(() => {
    if (!data) return [];
    if (data.length <= 0) return [];

    const value = data[0].date_time as Json[];
    return value.map((item) => item) as DateTime;
  }, [data]);
  const { control, handleSubmit, formState, setValue, trigger, watch } = useForm<z.infer<typeof TForm>>({
    resolver: zodResolver(TForm),
    defaultValues: {
      selected_days: [],
    },
    shouldFocusError: true,
    criteriaMode: 'firstError',
    mode: 'all',
  });

  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(100); // temp
  // const [value, setValue] = React.useState(''); // temp

  // 현재 날짜와 시간이 존재하는지 체크 (for 활성화)
  const checkTimeExists = (data: DateTime, date: string, time: string): boolean => {
    // 해당 날짜의 데이터 찾기
    const dateData = data.find((item) => Object.keys(item)[0] === date);

    if (!dateData) {
      return false;
    }

    // 해당 시간이 존재하는지 확인
    return dateData[date].some((timeSlot) => timeSlot.time === time);
  };

  React.useEffect(() => {
    trigger(); // 수동으로 체크하는 이게 최선인가..?
  }, []);

  if (isLoading) return null;

  return (
    <>
      <Stack.Screen
        options={{
          title: '미팅 일정 선택하기',
          headerShown: false,
        }}
      />
      <Container className='items-center justify-center'>
        <Header type='default' />
        <Wrap type='default' scroll className='mt-6'>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className='mb-6'>
              <Text className='mb-2 text-sm text-[#111111]'>일정 제목</Text>
              <Text className='text-[15px] font-semibold text-[#111111]'>{scheduleData?.title}</Text>
            </View>
            <View className='mb-6'>
              <Text className='mb-2 text-sm text-[#111111]'>참여 인원</Text>
              <Text className='text-[15px] font-semibold text-[#111111]'>{scheduleData?.member_cnt}명</Text>
            </View>
            <View className='mb-6 flex'>
              <Text className='mb-2 text-sm text-[#111111]'>일정 선택</Text>
              <Controller
                name='selected_days'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <FlashList
                    extraData={[]}
                    data={scheduleTargetDateTime}
                    renderItem={({ item }) => {
                      const keyDate = item ? Object.keys(item)[0] : '';
                      const valueTime: Array<{ time: string }> = item ? item[keyDate] : [];

                      console.log('selected_days ::: value :::   ', value);

                      return (
                        <View className='mb-2 rounded-md border border-[#E5E5EC] bg-white px-5 py-3'>
                          <Text className='text-[14px] font-semibold'>
                            {keyDate} ({dayjs(keyDate).format('dd')})
                          </Text>

                          <View className='gab-1'>
                            {(valueTime ?? []).map((subItem) => {
                              const isActivett = isActive(value, keyDate, subItem.time);
                              return (
                                <GrabDateItem
                                  key={`${keyDate}-${subItem.time}`}
                                  isEditable
                                  isInit={false}
                                  isSelected={isActive(value, keyDate, subItem.time)}
                                  date={subItem.time}
                                  userCnt={scheduleData?.member_cnt ?? 0}
                                  selectedCnt={3}
                                  onAction={() => {
                                    // 1) form 데이터 셋팅
                                    onChange(toggleSelectedTime(value, keyDate, subItem.time));
                                    // 2) 렌더링 데이터 셋팅
                                  }}
                                />
                              );
                            })}
                          </View>
                        </View>
                      );
                    }}
                    ListFooterComponent={<View className='py-10' />}
                    estimatedItemSize={5}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                      <View>
                        <Text className='text-[#999999]'>선택한 일정이 없습니다.</Text>
                      </View>
                    }
                  />
                )}
              />
            </View>
            <Button
              onPress={() => setOpen(true)}
              variant='default'
              className='shadow shadow-foreground/5'
              disabled={!formState.isValid}>
              <Text>일정 선택 완료</Text>
            </Button>
          </ScrollView>
        </Wrap>
        {/* Dialog */}
        {/* TODO - 다이얼로그 취소 버튼 및 디자인 */}
        <Dialog open={open} onOpenChange={setOpen} className='w-full'>
          <DialogContent className='w-full'>
            <DialogHeader>
              <DialogTitle>미팅 확정</DialogTitle>
              <DialogDescription className='flex flex-col pt-1' asChild>
                <View className='flex flex-col'>
                  <Text>참석자 정보</Text>
                  <View>
                    {/* <Input
                      value={value}
                      onChangeText={setValue}
                      placeholder='핸드폰 번호를 입력하세요'
                      className='my-2 w-full'
                    /> */}
                  </View>
                  <Text className='text-[#505050]'>일정이 확정되면, 위 번호로 안내해드립니다.</Text>
                </View>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  disabled={false}
                  onPress={() => {
                    router.push('/public/joinComplete');
                  }}>
                  <Text>확인</Text>
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
}
