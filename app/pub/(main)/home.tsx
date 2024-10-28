import * as React from 'react';
import { View } from 'react-native';
import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { Header } from '~/components/layout/header';
import { Text } from '~/components/ui/text';
import { FlashList } from '@shopify/flash-list';
import { DateItem } from '~/components/screen/dateItem';

export default function Home() {
  const [isEmpty, setIsEmpty] = React.useState(false);

  return (
    <Container className='items-center justify-center'>
      <Header type='btn' onAction={() => alert('일정 추가')} actionBtnText='일정 추가' />
      <Wrap type='default' full className='mt-6'>
        {isEmpty ? (
          <View className='items-center pt-12'>
            <Text className='mb-1 text-[#767676]'>일정이 없습니다.</Text>
            <Text className='text-[#767676]'>상단의 '일정 추가' 버튼을 눌러 추가해 주세요.</Text>
          </View>
        ) : (
          <FlashList
            data={[...Array(11)].fill('')}
            renderItem={({ item }) => (
              <DateItem status={'a'} onPress={() => alert('일정 상세보기 :::  ' + JSON.stringify(item))} />
            )}
            ListFooterComponent={<View className='py-5' />}
            estimatedItemSize={40}
            showsVerticalScrollIndicator={false}
          />
        )}
      </Wrap>
    </Container>
  );
}
