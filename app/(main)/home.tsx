import * as React from 'react';
import { View } from 'react-native';
import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { Header } from '~/components/layout/header';
import { Text } from '~/components/ui/text';
import { FlashList } from '@shopify/flash-list';
import { DateItem } from '~/components/screen/dateItem';
import { useAuth } from '~/providers/AuthProvider';
import { useRouter } from 'expo-router';
import useGetHomeList from '~/api/useGetHomeList';

export default function Home() {
  const [isEmpty, setIsEmpty] = React.useState(false);
  const { isLogin } = useAuth();
  const router = useRouter();
  const { data, isLoading } = useGetHomeList();

  const handleAddSchedule = () => {
    if (!isLogin) {
      alert('로그인이 필요합니다.');
      router.replace(`/auth/login`);
      return;
    }

    alert('일정 추가');
  };

  if (isLoading) {
    return null;
  }

  return (
    <Container className='items-center justify-center'>
      <Header type='btn' onAction={handleAddSchedule} actionBtnText='일정 추가' />
      <Wrap type='default' full className='mt-6'>
        {isEmpty ? (
          <View className='items-center pt-12'>
            <Text className='mb-1 text-[#767676]'>일정이 없습니다.</Text>
            <Text className='text-[#767676]'>상단의 '일정 추가' 버튼을 눌러 추가해 주세요.</Text>
          </View>
        ) : (
          <FlashList
            data={data}
            renderItem={({ item }) => (
              <DateItem
                title={item.title || ''}
                member_cnt={item.member_cnt || 0}
                confirm_date={item.confirm_date || null}
                status={item.status || ''}
                onPress={() => alert('일정 상세보기 :::  ' + JSON.stringify(item))}
              />
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
