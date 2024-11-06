import { Pressable, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import images from '~/constants/images';
import { ImageBox } from '../ui/imageBox';

type Props = {
  onPress: () => void;
  isFocused: boolean;
  routeName: string;
  color: string;
  label: string;
};
const TabBarButton = (props: Props) => {
  const { isFocused, label, routeName, color } = props;

  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused, {
      duration: 350,
    });
  }, [scale, isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1]);

    return {
      transform: [{ scale: scaleValue }],
    };
  });

  return (
    <Pressable {...props} style={styles.container}>
      <Animated.View style={[animatedIconStyle]}>
        {/* // TODO array */}
        {routeName === 'calendar' ? (
          <ImageBox
            source={isFocused ? images.icon_btm_cal_on : images.icon_btm_cal}
            className='h-[28px] w-[28px]'
          />
        ) : routeName === 'home' ? (
          <ImageBox
            source={isFocused ? images.icon_btm_home_on : images.icon_btm_home}
            className='h-[28px] w-[28px]'
          />
        ) : routeName === 'my' ? (
          <ImageBox
            source={isFocused ? images.icon_btm_my_on : images.icon_btm_my}
            className='h-[28px] w-[28px]'
          />
        ) : null}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    width: 40,
    height: 40,
    // borderWidth: 1, // 터치 영역 확인용
  },
});

export default TabBarButton;
