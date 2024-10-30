import { useRouter } from 'expo-router';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { Header } from '~/components/layout/header';
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';

// TODO - 멀티 선택 처리
export default function Screen() {
  const [selected, setSelected] = React.useState(100);
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <Container className='items-center justify-center'>
      <Header type='default' />
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
                  isInit={selected > 99}
                  isSelected={selected === 0}
                  date={'10:00'}
                  userCnt={4}
                  selectedCnt={1}
                  onAction={() => {
                    setSelected(0);
                  }}
                />
                {/* 막대기 2 */}
                <GrabDateItem
                  isInit={selected > 99}
                  isSelected={selected === 1}
                  date={'13:00'}
                  userCnt={4}
                  selectedCnt={4}
                  onAction={() => {
                    setSelected(1);
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
                  isInit={selected > 99}
                  isSelected={selected === 2}
                  date={'10:00'}
                  userCnt={4}
                  selectedCnt={0}
                  onAction={() => {
                    setSelected(2);
                  }}
                />
                <GrabDateItem
                  isInit={selected > 99}
                  isSelected={selected === 3}
                  date={'11:00'}
                  userCnt={4}
                  selectedCnt={0}
                  onAction={() => {
                    setSelected(3);
                  }}
                />
                <GrabDateItem
                  isInit={selected > 99}
                  isSelected={selected === 4}
                  date={'12:00'}
                  userCnt={4}
                  selectedCnt={3}
                  onAction={() => {
                    setSelected(4);
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
                  isInit={selected > 99}
                  isSelected={selected === 5}
                  date={'14:00'}
                  userCnt={4}
                  selectedCnt={4}
                  onAction={() => {
                    setSelected(5);
                  }}
                />
                <GrabDateItem
                  isInit={selected > 99}
                  isSelected={selected === 6}
                  date={'15:00'}
                  userCnt={4}
                  selectedCnt={0}
                  onAction={() => {
                    setSelected(6);
                  }}
                />
                <GrabDateItem
                  isInit={selected > 99}
                  isSelected={selected === 7}
                  date={'16:00'}
                  userCnt={4}
                  selectedCnt={0}
                  onAction={() => {
                    setSelected(7);
                  }}
                />
                <GrabDateItem
                  isInit={selected > 99}
                  isSelected={selected === 8}
                  date={'17:00'}
                  userCnt={4}
                  selectedCnt={4}
                  onAction={() => {
                    setSelected(8);
                  }}
                />
                <GrabDateItem
                  isInit={selected > 99}
                  isSelected={selected === 9}
                  date={'18:00'}
                  userCnt={4}
                  selectedCnt={0}
                  onAction={() => {
                    setSelected(9);
                  }}
                />
                <GrabDateItem
                  isInit={selected > 99}
                  isSelected={selected === 10}
                  date={'19:00'}
                  userCnt={4}
                  selectedCnt={3}
                  onAction={() => {
                    setSelected(10);
                  }}
                />
              </View>
            </View>
          </View>
          <Button
            onPress={() => setOpen(true)}
            variant='default'
            className='shadow shadow-foreground/5'
            disabled={selected > 99}>
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
                  <Input
                    value={value}
                    onChangeText={setValue}
                    placeholder='핸드폰 번호를 입력하세요'
                    className='my-2 w-full'
                  />
                </View>
                <Text className='text-[#505050]'>일정이 확정되면, 위 번호로 안내해드립니다.</Text>
              </View>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                disabled={value.length < 3}
                onPress={() => {
                  router.push('/pub/public/joinComplete');
                }}>
                <Text>확인</Text>
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
