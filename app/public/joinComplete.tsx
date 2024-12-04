import { useRouter } from 'expo-router';
import * as React from 'react';
import { Platform, View } from 'react-native';
import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { Button } from '~/components/ui/button';
import { ImageBox } from '~/components/ui/imageBox';
import { Text } from '~/components/ui/text';
import images from '~/constants/images';

export default function Screen() {
  const router = useRouter();
  return (
    <Container className='items-center justify-center bg-white'>
      <Wrap type='default' full className='flex flex-col justify-between'>
        <View className='flex items-center justify-center pt-[130px]'>
          <ImageBox source={images.gif_promise} className='mr-1 h-[80px] w-[80px]' />
          <Text className='text-lg font-semibold text-[#111111]'>미팅 참석 요청이 완료 되었습니다.</Text>
          <Text className='text-lg font-semibold text-[#111111]'>감사합니다 🧡</Text>
        </View>
        {/* 웹에서는 동작 안해서 삭제 */}
        {Platform.OS !== 'web' && (
          <Button
            onPress={() => {
              // 강제 종료 (트릭) - 동작 안함
              if (Platform.OS === 'web') {
                window.opener = null;
                window.open('', '_self');
                window.close();
                // DEV - 미로그인 웹 접근 사용자를 위한 페이지 작성?
                // router.replace('/public');
              } else {
                router.replace('/(main)/home');
              }
            }}
            variant='default'
            className='bg-[#111111] shadow shadow-foreground/5'>
            <Text>종료</Text>
          </Button>
        )}
      </Wrap>
    </Container>
  );
}
