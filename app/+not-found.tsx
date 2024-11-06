import { Link, Stack } from 'expo-router';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not Page', headerBackTitleVisible: false }} />
      <View>
        <Text>해당 화면이 존재하지 않습니다!</Text>

        <Link href='/'>
          <Text>메인으로 돌아갑니다.</Text>
        </Link>
      </View>
    </>
  );
}
