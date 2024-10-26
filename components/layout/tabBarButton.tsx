import { Pressable, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Text } from '../ui/text';

// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import Entypo from '@expo/vector-icons/Entypo';
// import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ImageBox } from '../ui/imageBox';
import images from '~/constants/images';

const TabBarButton = (props) => {
  const { isFocused, label, routeName, color } = props;

  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused, {
      duration: 350,
    });
  }, [scale, isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.1]);

    return {
      // styles
      transform: [{ scale: scaleValue }],
    };
  });

  return (
    <Pressable {...props} style={styles.container}>
      <Animated.View style={[animatedIconStyle]}>
        {/* // TODO array */}
        {/* {icons[routeName]({
          color,
        })} */}
        {routeName === 'calendar' ? (
          // <ImageBox className='w-[28px]' source={images.main_cal} />
          // <Entypo size={28} name='calendar' color={color} />
          <MaterialCommunityIcons name='calendar-blank-outline' size={24} color={color} />
        ) : routeName === 'home' ? (
          // <ImageBox className='w-[28px]' source={images.icon_home} />
          // <FontAwesome size={28} name='home' color={color} />
          <MaterialCommunityIcons name='home-minus' size={28} color={color} />
        ) : routeName === 'my' ? (
          // <ImageBox className='w-[28px]' source={images.icon_my} />
          <MaterialCommunityIcons name='account-outline' size={28} color={color} />
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
  },
});

export default TabBarButton;
