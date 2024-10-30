import { useNavigation, useRouter } from 'expo-router';
import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { GrabDateItem } from '~/components/screen/grabDateItem';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog';
import { Button } from '~/components/ui/button';
import { ImageBox } from '~/components/ui/imageBox';
import { Text } from '~/components/ui/text';
import images from '~/constants/images';

export default function ScheduleInfo() {
  const navigation = useNavigation();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('aaaa');

  // 스크린 안에서 헤더 버튼 생성
  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button variant={'small'} size={'small'} onPress={() => setOpen(true)}>
          <Text>일정 확정</Text>
        </Button>
      ),
    });
  }, [navigation, value]);

  return (
    <Container gray className='items-center justify-center'>
      <Wrap type='default' scroll className='mt-6'>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className='mb-6'>
            <Text className='mb-2 text-sm text-[#111111]'>일정 제목</Text>
            <Text className='text-[15px] font-semibold text-[#111111]'>24회 동창회 모임</Text>
          </View>
          <View className='mb-6'>
            <Text className='mb-2 text-sm text-[#111111]'>참여 인원</Text>
            <Text className='text-[15px] font-semibold text-[#111111]'>4명</Text>
          </View>
          <View className='mb-6 flex'>
            <Text className='mb-2 text-sm text-[#111111]'>일정 선택</Text>
            {/* 일정 투표 A */}
            <View className='mb-2 rounded-md border border-[#E5E5EC] bg-white px-5 py-3'>
              <Text className='text-[14px] font-semibold'>2024.10.15 (화)</Text>
              {/* 막대기 Box*/}
              <View className='gab-1'>
                {/* 막대기 1 */}
                <GrabDateItem
                  date={'10:00'}
                  userCnt={4}
                  selectedCnt={1}
                  onAction={() => {
                    alert('일정 선택 1');
                  }}
                />
                {/* 막대기 2 */}
                <GrabDateItem
                  date={'13:00'}
                  userCnt={4}
                  selectedCnt={4}
                  onAction={() => {
                    alert('일정 선택 1');
                  }}
                />
              </View>
            </View>
            {/* 일정 투표 B */}
            <View className='mb-2 rounded-md border border-[#E5E5EC] bg-white px-5 py-3'>
              <Text className='text-[14px] font-semibold'>2024.10.16 (수)</Text>
              {/* 막대기 List Box*/}
              <View className='gab-1'>
                <GrabDateItem
                  date={'10:00'}
                  userCnt={4}
                  selectedCnt={0}
                  onAction={() => {
                    alert('일정 선택 5');
                  }}
                />
                <GrabDateItem
                  date={'11:00'}
                  userCnt={4}
                  selectedCnt={0}
                  onAction={() => {
                    alert('일정 선택 5');
                  }}
                />
                <GrabDateItem
                  date={'12:00'}
                  userCnt={4}
                  selectedCnt={3}
                  onAction={() => {
                    alert('일정 선택 5');
                  }}
                />
              </View>
            </View>
            {/* 일정 투표 C */}
            <View className='mb-2 rounded-md border border-[#E5E5EC] bg-white px-5 py-3'>
              <Text className='text-[14px] font-semibold'>2024.10.17 (목)</Text>
              {/* 막대기 List Box*/}
              <View className='gab-1'>
                <GrabDateItem
                  isSelected
                  date={'14:00'}
                  userCnt={4}
                  selectedCnt={4}
                  onAction={() => {
                    alert('일정 선택 5');
                  }}
                />
                <GrabDateItem
                  date={'15:00'}
                  userCnt={4}
                  selectedCnt={0}
                  onAction={() => {
                    alert('일정 선택 5');
                  }}
                />
                <GrabDateItem
                  date={'16:00'}
                  userCnt={4}
                  selectedCnt={0}
                  onAction={() => {
                    alert('일정 선택 5');
                  }}
                />
                <GrabDateItem
                  date={'17:00'}
                  userCnt={4}
                  selectedCnt={4}
                  onAction={() => {
                    alert('일정 선택 5');
                  }}
                />
                <GrabDateItem
                  date={'18:00'}
                  userCnt={4}
                  selectedCnt={0}
                  onAction={() => {
                    alert('일정 선택 5');
                  }}
                />
                <GrabDateItem
                  date={'19:00'}
                  userCnt={4}
                  selectedCnt={3}
                  onAction={() => {
                    alert('일정 선택 5');
                  }}
                />
              </View>
            </View>
          </View>
          {/* 일정 투표 링크 */}
          <View className='mb-6'>
            <Text className='mb-2 text-sm text-[#111111]'>일정 투표 링크</Text>
            <View className='flex w-full flex-row justify-between rounded-md border border-[#E5E5EC] bg-white p-3'>
              <View className='w-10/12 flex-nowrap'>
                <Text className='flex-nowrap' numberOfLines={1}>
                  https://url.kr/a99a6whttpsttps://url.kr/a99a6w
                </Text>
              </View>
              <Pressable className='' onPress={() => alert('복사 완료')}>
                <ImageBox source={images.icon_copy} style={{ width: 20, height: 20 }} className='h-5 w-5' />
              </Pressable>
            </View>
          </View>
          <View className='mb-6'>
            <Button
              variant='outline'
              className=''
              onPress={() => {
                alert('카카오로 공유하기');
              }}>
              <Text>카카오로 공유하기</Text>
            </Button>
          </View>
        </ScrollView>
      </Wrap>
      {/* alert */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>일정을 확정하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription className=''>
              <Text>선택된 일정</Text> {'\n'}
              2024.10.17(목) 10:00{'\n'}
              2024.10.18(금) 10:00, 11:00
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              className='w-[50%] text-center'
              onPress={() => {
                router.push('/pub/detail/scheduleConfirm');
              }}>
              <Text>확정</Text>
            </AlertDialogAction>
            <AlertDialogCancel className='w-[50%] text-center'>
              <Text>취소</Text>
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Container>
  );
}
