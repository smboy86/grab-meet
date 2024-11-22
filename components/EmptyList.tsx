import { View } from 'react-native';
import { Text } from './ui/text';

type Props = {
  content: string[];
};

export function EmptyList(props: Props) {
  return (
    <View className='flex h-28 items-center justify-end'>
      {props.content.map((item) => (
        <Text key={`empty-list-${item}`} className='mb-1 text-[#767676]'>
          {item}
        </Text>
      ))}
    </View>
  );
}
