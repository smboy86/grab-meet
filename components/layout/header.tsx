import * as React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '~/lib/utils';
import { ViewRef } from '@rn-primitives/types';
import images from '~/constants/images';
import { ImageBox } from '../ui/imageBox';

interface HeaderProps extends ViewProps {
  type?: 'default' | 'btn';
  // TODO create rightBtn
}

const Header = React.forwardRef<ViewRef, HeaderProps>(({ type = 'defalut' }, ref) => {
  return (
    <View className={cn('borde flex h-14 flex-row items-center justify-center')} ref={ref}>
      {/* <ImageBox className='w-[28.8%]' source={images.icon_grab} /> */}
      <ImageBox className='w-[104px]' source={images.icon_grab} />
    </View>
  );
});
Header.displayName = 'Header';

export { Header };
export type { HeaderProps };
