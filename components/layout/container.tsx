import * as React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { cn } from '~/lib/utils';
import { ViewRef } from '@rn-primitives/types';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

type ContainerProps = {
  main?: boolean; // main bottom 일때 하단 그라데이션 제어
  gray?: boolean; // background 설정
} & React.ComponentPropsWithoutRef<typeof View>;

// TODO - Defail 페이지 내부 회색
// TODO - LinearGradient 중복코드 리펙토링
const Container = React.forwardRef<ViewRef, ContainerProps>(
  ({ children, className, main = false, gray = false, ...props }, ref) => {
    if (Platform.OS === 'ios') {
      return (
        <>
          <SafeAreaProvider>
            <StatusBar barStyle='dark-content' />
            <SafeAreaView
              className={cn('relative flex h-full flex-1', gray && 'bg-[#F7F7FB]', main && 'bg-[#ffffff]')}>
              <View className={cn('flex h-full flex-col items-center', className)} ref={ref} {...props}>
                {children}
                {main && (
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
                )}
              </View>
            </SafeAreaView>
            {main && (
              <SafeAreaView
                mode='padding'
                edges={['bottom']}
                style={{
                  flex: 0,
                  height: 10,
                  backgroundColor: '#F7F7FB',
                }}
              />
            )}
          </SafeAreaProvider>
        </>
      );
    } else {
      return (
        <SafeAreaProvider>
          <SafeAreaView className={cn('relative flex flex-1')}>
            <View
              className={cn('flex h-full flex-col items-center', main && 'bg-[#ffffff]', className)}
              ref={ref}
              {...props}>
              {children}
              {main && (
                <View className={cn('absolute -bottom-[0px] h-[94px] w-full bg-transparent')}>
                  <LinearGradient
                    // Background Linear Gradient
                    colors={['rgba(217, 217, 217, 0)', 'rgba(247, 247, 251, 100)']}
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: 0,
                      height: 94,
                    }}
                  />
                </View>
              )}
            </View>
          </SafeAreaView>
        </SafeAreaProvider>
      );
    }
  },
);
Container.displayName = 'Container';

export { Container };
export type { ContainerProps };
