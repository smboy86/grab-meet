import * as React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Text } from '~/components/ui/text';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size='large' color='#0000ff' />
      <Text>App '/'' 로딩중...</Text>
    </View>
  );
}
