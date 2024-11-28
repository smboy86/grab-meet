import { Text } from '~/components/ui/text';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Dimensions, Platform, View } from 'react-native';
import { Button } from '../ui/button';
import { Dispatch, SetStateAction, useState } from 'react';
import { Input } from '../ui/input';

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onAction: (value: string) => void;
};

const { width } = Dimensions.get('window'); // Get screen width

export default function GrabJoinAlert(props: Props) {
  const { open = false, setOpen, onAction } = props;

  const [value, setValue] = useState('');

  return (
    <Dialog open={open} onOpenChange={setOpen} className='w-full'>
      <DialogContent className='w-full'>
        <DialogHeader>
          <DialogTitle>참석자 정보 입력</DialogTitle>
          <DialogDescription className='flex flex-col pt-1' asChild>
            <View className='flex w-full flex-col'>
              <View className='flex items-center justify-center pb-3 pt-4'>
                <Text className='text-sm text-[#505050]'>주최자가 일정을 확정하면</Text>
                <Text className='text-sm text-[#505050]'>핸드폰번호로 안내드립니다.</Text>
              </View>
              <View className=''>
                <Input
                  value={value}
                  onChangeText={setValue}
                  placeholder='핸드폰 번호를 입력하세요.'
                  className='my-2 w-full'
                  // style={{
                  //   // width: Platform.OS === 'web' ? '100%' : '100%',
                  // }}
                  keyboardType='number-pad'
                />
              </View>
            </View>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={value.length <= 0} onPress={() => onAction(value)}>
              <Text>확인</Text>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
