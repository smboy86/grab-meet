import * as React from 'react';
import { View } from 'react-native';
import { cn } from '~/lib/utils';
import { ViewRef } from '@rn-primitives/types';
import { Text } from '../ui/text';

interface WrapProps extends React.ComponentPropsWithoutRef<typeof View> {
  /**
   * default : full 화면, padding x 5
   * large :  padding x 8
   * */
  type?: 'default' | 'large';
  full?: boolean; // default true
  scroll?: boolean;
}

const Wrap = React.forwardRef<ViewRef, WrapProps>(
  ({ className, children, type = 'default', full = true, scroll = false, ...props }, ref) => {
    return (
      <View
        className={cn(
          `flex w-full max-w-[372px] flex-col ${full && 'flex-1'} ${type === 'default' ? 'px-5' : 'px-8'}`,
          className,
        )}
        ref={ref}
        {...props}>
        {children}
      </View>
    );
  },
);
Wrap.displayName = 'Wrap';

export { Wrap };
export type { WrapProps };
