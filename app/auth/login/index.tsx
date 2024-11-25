// 실제 메인 index가 로그인이라 이해 내용은 쓰지 않음

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { supabase } from '~/utils/supabase';
import { User as SupabaseUser } from '@supabase/auth-js'; // supabase User 타입 임포트
import { Container } from '~/components/layout/container';
import { Header } from '~/components/layout/header';
import { Wrap } from '~/components/layout/\bwrap';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { ImageBox } from '~/components/ui/imageBox';
import images from '~/constants/images';
import { Stack, useRouter } from 'expo-router';

interface User {
  id: string;
  email: string | undefined;
  // 필요한 다른 속성들 추가
}

interface Session {
  // 필요한 속성들 추가
}

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [user, setUser] = useState<SupabaseUser | null>(null);

  const signInWithEmail = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error);
      alert(error);
    } else {
      // alert(`로그인 성공 :: ` + JSON.stringify(data.user, null, 2));
      setUser(data.user); // user 객체만 추출하여 setUser에 전달
      // TODO 성공 후 메인화면으로 전환
      router.replace('/(main)/home');
    }
  };

  const signUpWithEmail = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error(error);
    } else {
      setUser(data.user); // user 객체만 추출하여 setUser에 전달
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    } else {
      setUser(null);
    }
  };

  return (
    <Container className='items-center justify-center'>
      <Stack.Screen options={{ title: '화면에서 타이틀 재정의', headerBackTitle: '' }} redirect />
      <Header type='default' />
      <Wrap type='default' full>
        <View className='flex h-full justify-between'>
          <View className=''>
            <Input
              value={email}
              onChangeText={setEmail}
              placeholder='이메일을 입력하세요'
              className='mb-[12px]'
            />
            <Input
              value={password}
              onChangeText={setPassword}
              placeholder='비밀번호를 입력하세요'
              className='mb-[24px]'
              secureTextEntry
            />
            <View>
              <Button size={'base'} onPress={signInWithEmail} variant={'default'} className='h-[52px]'>
                <Text className='font-semibold'>로그인</Text>
              </Button>
            </View>
          </View>
          <View className='btm pb-6'>
            <Button
              size={'base'}
              className='mb-[8px] flex h-[52px] flex-row bg-[#F1F1F5]'
              onPress={() => {
                alert('구글로 시작하기');
              }}>
              <ImageBox source={images.icon_google} className='mr-1 h-[20px] w-[20px]' />
              <Text className='text-[#505050]'>구글로 시작하기</Text>
            </Button>
            <Button
              className='mb-[8px] flex h-[52px] flex-row bg-[#F1F1F5]'
              size={'base'}
              onPress={() => {
                alert('카카오로 시작하기');
              }}>
              <ImageBox source={images.icon_kakao} className='mr-1 h-[20px] w-[20px]' />
              <Text className='text-[#505050]'>카카오로 시작하기</Text>
            </Button>
            <Button
              className='flex h-[52px] flex-row bg-[#F1F1F5] text-[16px]'
              size={'base'}
              onPress={() => {
                alert('애플로 시작하기');
              }}>
              <ImageBox source={images.icon_apple} className='mr-1 h-[20px] w-[20px]' />
              <Text className='text-lg text-[#505050]'>애플로 시작하기</Text>
            </Button>
          </View>
        </View>
      </Wrap>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});
