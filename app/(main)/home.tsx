import * as React from 'react';
import { Alert, View } from 'react-native';
import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { Header } from '~/components/layout/header';
import { Text } from '~/components/ui/text';
import { FlashList } from '@shopify/flash-list';
import { DateItem } from '~/components/screen/dateItem';
import { useAuth } from '~/providers/AuthProvider';
import { useFocusEffect, useRouter } from 'expo-router';
import useGetHomeList from '~/api/useGetHomeList';

export default function Home() {
  const { isLogin } = useAuth();
  const router = useRouter();
  const { data, isLoading, refetch } = useGetHomeList();

  const handleAddSchedule = () => {
    if (!isLogin) {
      Alert.alert('로그인', '로그인이 필요합니다.', [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            router.push(`/auth/login`);
          },
        },
      ]);

      return;
    }

    //
    router.push(`/detail/scheduleCreate`);
  };

  // 포커스 재조회
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, []),
  );

  if (isLoading) {
    return null;
  }

  return (
    <Container className='items-center justify-center'>
      <Header type='btn' onAction={handleAddSchedule} actionBtnText='일정 추가' />
      <Wrap type='default' full className='mt-6'>
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
          ListEmptyComponent={
            <View className='flex h-28 items-center justify-end'>
              <Text className='mb-1 text-[#767676]'>일정이 없습니다.</Text>
              <Text className='text-[#767676]'>상단의 '일정 추가' 버튼을 눌러 추가해 주세요.</Text>
            </View>
          }
        />
      </Wrap>
    </Container>
  );
}
