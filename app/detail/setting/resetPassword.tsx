import * as React from 'react';
import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { Input } from '~/components/ui/input';

// TODO - btn 유효성검사 및 disabled 처리
export default function ResetPassword() {
  const [value, setValue] = React.useState('');

  return (
    <Container className='items-center justify-center'>
      <Wrap type='default' full>
        <View className='h-full flex-col justify-between'>
          <View>
            <View className='mb-6 flex items-center justify-center'>
              <Text className='text-gray03'>패스워드를 재설정하는데</Text>
              <Text className='text-gray03'>필요한 이메일 주소를 입력해주세요.</Text>
            </View>
            <View>
              <Input
                value={value}
                onChangeText={setValue}
                placeholder='이메일을 입력하세요'
                className='mb-3'
                keyboardType='email-address'
              />
            </View>
          </View>
          <Button variant='default' className='shadow shadow-foreground/5' disabled={value.length < 3}>
            <Text>이메일 발송하기</Text>
          </Button>
        </View>
      </Wrap>
    </Container>
  );
}
