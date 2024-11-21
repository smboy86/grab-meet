import * as React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Text } from '~/components/ui/text';
import { getKeyHashAndroid, initializeKakaoSDK } from '@react-native-kakao/core';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');
initializeKakaoSDK('dd4dbb779927ca4fc5601741e00024c2');

export default function App() {
  React.useEffect(() => {
    // kakao hashKey 값 추출
    getKeyHashAndroid().then((d) => {
      console.log('kakao sdk hashAndroid :: ', d);
    }); //
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size='large' color='#0000ff' />
      <Text>App '/'' 로딩중...</Text>
    </View>
  );
}
