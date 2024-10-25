import * as React from 'react';
import { View } from 'react-native';
import { cn } from '~/lib/utils';
import { ViewRef } from '@rn-primitives/types';
import { SafeAreaView } from 'react-native-safe-area-context';

type ContainerProps = React.ComponentPropsWithoutRef<typeof View>;

const Container = React.forwardRef<ViewRef, React.ComponentPropsWithoutRef<typeof View>>(
  ({ className, ...props }, ref) => {
    return (
      <SafeAreaView className={cn('flex flex-1')}>
        <View className={cn('flex h-full flex-col', className)} ref={ref} {...props} />
      </SafeAreaView>
    );
  },
);
Container.displayName = 'Container';

export { Container };
export type { ContainerProps };
