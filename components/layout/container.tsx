import * as React from 'react';
import { View } from 'react-native';
import { cn } from '~/lib/utils';
import { ViewRef } from '@rn-primitives/types';

type ContainerProps = React.ComponentPropsWithoutRef<typeof View>;

const Container = React.forwardRef<ViewRef, React.ComponentPropsWithoutRef<typeof View>>(
  ({ className, ...props }, ref) => {
    return <View className={cn('flex flex-col space-y-1.5 p-6', className)} ref={ref} {...props} />;
  },
);
Container.displayName = 'Container';

export { Container };
export type { ContainerProps };
