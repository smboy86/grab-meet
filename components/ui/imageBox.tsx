import * as React from 'react';
import { View } from 'react-native';
import { cn } from '~/lib/utils';
import { ViewRef } from '@rn-primitives/types';
import { Image, ImageProps } from 'expo-image';

interface ImageBoxProps extends ImageProps {
  className: string;
  type?: 'default' | 'btn';
}

// const defaultUri = 'https://picsum.photos/seed/696/3000/2000'; // 초록색 산 모양
const defaultUri = require('~/assets/icon/icon_grab.png'); // local
// 깜빡이는 문제 있어서 주석
// const blurhash =
//   '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const ImageBox = React.forwardRef<ViewRef, ImageBoxProps>(
  ({ className, type = 'defalut', source = defaultUri }, ref) => {
    // 기본적으로 height 풀
    // 피그마에서 가로 길이를 계산해서 className 에 넣어 그린다. w-[28.8%]
    return (
      <View className={cn('flex h-full w-full', className)} ref={ref}>
        <Image
          style={{ flex: 1 }}
          source={source}
          contentFit='contain' // default
          transition={150}
          // placeholder={{ blurhash }}
        />
      </View>
    );
  },
);
ImageBox.displayName = 'ImageBox';

export { ImageBox };
export type { ImageBoxProps };
