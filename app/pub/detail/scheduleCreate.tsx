import { FlashList } from '@shopify/flash-list';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { Header } from '~/components/layout/header';
import { DateItem } from '~/components/screen/dateItem';
import { Button } from '~/components/ui/button';
import { CalendarBox } from '~/components/ui/calendar';
import { Input } from '~/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Text } from '~/components/ui/text';

export default function Screen() {
  const [value, setValue] = React.useState({ title: '', password: '' });
  const [selectDate, setSelectedDate] = React.useState('');
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  return (
    <Container gray className='items-center justify-center'>
      <Wrap type='default' scroll className='mt-6'>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className='mb-6'>
            <Text className='mb-2 text-sm text-[#111111]'>일정 제목</Text>
            <Input
              value={value.title}
              onChangeText={(text) => setValue((prev) => ({ ...prev, title: text }))}
              placeholder='이메일을 입력하세요'
              className='mb-3'
            />
          </View>
          <View className='mb-6'>
            <Text className='mb-2 text-sm text-[#111111]'>인원 선택</Text>
            <Select
              onValueChange={(option) => {
                // ex)  {"label": "2명", "value": "2"}
                console.log('ddd  ', option);
              }}>
              <SelectTrigger className='w-full'>
                <SelectValue
                  className='native:text-lg text-sm text-foreground'
                  placeholder='인원을 선택해주세요'
                />
              </SelectTrigger>
              <SelectContent insets={contentInsets} className='w-full'>
                <SelectGroup>
                  <SelectLabel>선택</SelectLabel>
                  <SelectItem label='1명' value='1'>
                    1 명
                  </SelectItem>
                  <SelectItem label='2명' value='2'>
                    2 명
                  </SelectItem>
                  <SelectItem label='3명' value='3'>
                    3 명
                  </SelectItem>
                  <SelectItem label='4명' value='4'>
                    4 명
                  </SelectItem>
                  <SelectItem label='5명' value='5'>
                    5 명
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </View>
          <View className='mb-6'>
            <Text className='mb-2 text-sm text-[#111111]'>날짜 선택</Text>
            <View>
              <CalendarBox
                input
                onDaySelect={(day, days) => {
                  // 날짜 선택시 이벤트
                  console.log('111 selected day', day);
                  console.log('2222 selected day', days);
                }}
              />
            </View>
          </View>

          <View className='mb-6'>
            <Text className='mb-2 text-sm text-[#111111]'>시간 선택</Text>
            <FlashList
              data={[...Array(11)].fill('')}
              renderItem={({ item }) => (
                <DateItem status={'a'} onPress={() => alert('일정 상세보기 :::  ' + JSON.stringify(item))} />
              )}
              ListFooterComponent={<View className='py-10' />}
              estimatedItemSize={40}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </ScrollView>
      </Wrap>
    </Container>
  );
}
