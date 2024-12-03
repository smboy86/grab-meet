import * as React from 'react';
import { Alert, Platform, View } from 'react-native';
import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { Header } from '~/components/layout/header';
import { FlashList } from '@shopify/flash-list';
import { DateItem } from '~/components/screen/dateItem';
import { useAuth } from '~/providers/AuthProvider';
import { useFocusEffect, useRouter } from 'expo-router';
import useGetHomeList from '~/api/useGetHomeList';
import { extractDate, extractTime } from '~/lib/utils';
import { Text } from '~/components/ui/text';
import { ImageBox } from '~/components/ui/imageBox';
import images from '~/constants/images';

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
    <Container main className='items-center justify-center'>
      <Header type='btn' onAction={handleAddSchedule} actionBtnText='일정 추가' />
      <Wrap type='default' full>
        <FlashList
          data={data}
          renderItem={({ item }) => (
            <DateItem
              title={item.title || ''}
              member_cnt={item.member_cnt || 0}
              confirm_date={extractDate(item.confirm_date)}
              confirm_time={extractTime(item.confirm_date)}
              status={item.status || ''}
              onPress={() => {
                if (item.status === '확정') {
                  router.push({
                    pathname: `/detail/schedule/confirmed/[id]`,
                    params: {
                      id: item.schedule_id as string,
                    },
                  });
                } else {
                  router.push({
                    pathname: `/detail/schedule/[id]`,
                    params: {
                      id: item.schedule_id as string,
                      mode: item.status === '투표중' ? 'edit' : 'view',
                    },
                  });
                }
              }}
            />
          )}
          ListFooterComponent={<View className={Platform.OS === 'ios' ? 'py-5' : 'py-14'} />}
          estimatedItemSize={40}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            // <EmptyList content={['일정이 없습니다.', '상단의 "일정 추가" 버튼을 눌러 추가해 주세요.']} />
            <View className='items-center pt-16 text-center'>
              <View className='pb-3'>
                <ImageBox source={images.gif_promise_2} className='mr-1 h-[80px] w-[80px]' />
              </View>
              <Text className='text-[15px] font-semibold text-[#767676]'>일정이 없습니다.</Text>
              <Text className='text-[15px] font-semibold text-[#767676]'>
                <Text className='text-[15px] font-semibold text-[#F59917]'>'일정등록</Text> 상단의 버튼을 눌러
                등록해주세요.
              </Text>
            </View>
          }
        />
      </Wrap>
    </Container>
  );
}
