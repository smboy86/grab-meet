import * as React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { cn } from '~/lib/utils';
import { ViewRef } from '@rn-primitives/types';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

type ContainerProps = React.ComponentPropsWithoutRef<typeof View>;

//TODO - Defail 페이지 내부 회색
const Container = React.forwardRef<ViewRef, React.ComponentPropsWithoutRef<typeof View>>(
  ({ children, className, ...props }, ref) => {
    if (Platform.OS === 'ios') {
      return (
        <>
          <SafeAreaProvider>
            <StatusBar barStyle='dark-content' />
            <SafeAreaView className={cn('relative flex h-full flex-1')}>
              <View className={cn('flex h-full flex-col items-center', className)} ref={ref} {...props}>
                {children}
                <View className={cn('absolute -bottom-[34px] h-[84px] w-full bg-transparent')}>
                  <LinearGradient
                    // Background Linear Gradient
                    colors={['rgba(217, 217, 217, 0)', 'rgba(247, 247, 251, 100)']}
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: 0,
                      height: 84,
                    }}
                  />
                </View>
              </View>
            </SafeAreaView>
            <SafeAreaView
              mode='padding'
              edges={['bottom']}
              style={{
                flex: 0,
                height: 10,
                backgroundColor: '#F7F7FB',
              }}
            />
          </SafeAreaProvider>
        </>
      );
    } else {
      return (
        <SafeAreaView className={cn('relative flex flex-1 bg-[#F7F7FB]')}>
          <View className={cn('flex h-full flex-col items-center', className)} ref={ref} {...props}>
            {children}
            <View className='absolute bottom-0 h-[84px] w-full bg-transparent'>
              <LinearGradient
                // Background Linear Gradient
                colors={['rgba(217, 217, 217, 0)', 'rgba(247, 247, 251, 100)']}
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  height: 84,
                }}
              />
            </View>
          </View>
        </SafeAreaView>
      );
    }
  },
);
Container.displayName = 'Container';

export { Container };
export type { ContainerProps };
