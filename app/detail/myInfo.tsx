import { unlink } from '@react-native-kakao/user';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, View } from 'react-native';
import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { useAuth } from '~/providers/AuthProvider';
import { supabase } from '~/utils/supabase';

export default function Screen() {
  const router = useRouter();
  const { session } = useAuth();

  const handleLogout = async () => {
    Alert.alert('그랩밋', '로그아웃 하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '확인',
        onPress: async () => {
          const { error } = await supabase.auth.signOut();
          if (error) {
            console.error(error);
          }

          router.replace('/(main)/home');
        },
      },
    ]);
  };

  const deleteUser = () => {
    Alert.alert('그랩밋', '회원탈퇴 하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '확인',
        onPress: async () => {
          try {
            // 0) (필요시) data table 삭제
            // 1) supabase auth 유저 삭제
            // endpoint - https://dhlfezdmcnodzwreqzrj.supabase.co/functions/v1/delete-user
            await supabase.functions.invoke('delete-user');
            // 2) supabase 로그아웃
            await supabase.auth.signOut();
            // 3) social 언링크
            if (session?.user.app_metadata.provider === 'kakao') {
              unlink();
            }
            Alert.alert('회원탈퇴가 정상적으로 처리 되었습니다.\n이용해주셔서 감사합니다.');
          } catch (error) {
            console.log('errrr  ', error);
          } finally {
            router.replace('/(main)/home');
          }
        },
      },
    ]);
  };

  // useEffect(() => {
  // console.log('ffff  ', session?.user);
  // console.log('ffff  ', session?.user.app_metadata.provider);
  // });

  return (
    <>
      {/* <Stack.Screen options={{ title: '스크린 제목' }} /> */}
      <Container className='items-center justify-center'>
        <Wrap type='default' full>
          <View className=''>
            <Input editable={false} value={session?.user.email} className='mb-[12px]' />
            <View>
              <Button variant='outline' className='mb-2 border-[#E5E5EC] bg-[#E5E5EC]' onPress={handleLogout}>
                <Text className='text-[#505050]'>로그아웃</Text>
              </Button>
              <Button variant='outline' className='mb-2 border-[#E5E5EC] bg-[#E5E5EC]' onPress={deleteUser}>
                <Text className='text-[#505050]'>회원탈퇴</Text>
              </Button>
            </View>
          </View>
        </Wrap>
      </Container>
    </>
  );
}
