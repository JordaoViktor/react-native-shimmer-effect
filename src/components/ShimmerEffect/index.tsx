import React, { useLayoutEffect } from 'react';
import { StyleSheet, ViewProps } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

type WithChildren<T = {}> = T & { children?: React.ReactNode };

type IShimmerEffectProps = WithChildren<{
  width?: number;
  height?: number;
  duration?: number;
  opacityDuration?: number;
  reverse?: boolean;
  borderRadius?: number;
  colorsMode?: string;
  style?: ViewProps;
}>;

const baseColors = {
  dark: { primary: 'rgb(32, 31, 31)', secondary: 'rgb(51, 51, 51)' },
  light: {
    primary: 'rgb(250, 250, 250)',
    secondary: 'rgb(209, 209, 209)',
  },
} as const;

const makeColors = (mode: keyof typeof baseColors) => [
  baseColors[mode].primary,
  baseColors[mode].secondary,
  baseColors[mode].secondary,
  baseColors[mode].primary,
  baseColors[mode].secondary,
  baseColors[mode].primary,
];

let defaultDarkColors = makeColors('dark');

let defaultLightColors = makeColors('light');

for (let i = 0; i++; i < 15) {
  defaultDarkColors = [...defaultDarkColors, ...defaultDarkColors];
  defaultLightColors = [...defaultLightColors, ...defaultLightColors];
}

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const ShimmerEffect = ({
  width = 200,
  height = 50,
  duration = 1000,
  reverse = false,
  borderRadius = 10,
  colorsMode = 'light',
  opacityDuration = 700,
  children,
  style,
}: IShimmerEffectProps) => {
  const opacity = useSharedValue(0.8);
  const transformX = useSharedValue(-150);

  const rStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  }, []);

  const translationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: transformX.value,
        },
      ],
    };
  }, []);

  const styles = StyleSheet.create({
    shimmerBackground: {
      backgroundColor:
        colorsMode === 'light' ? 'rgb(250, 250, 250)' : 'rgb(32, 31, 31)',
      opacity: 0.9,
      overflow: 'hidden',
      zIndex: 2,
      borderRadius: borderRadius,
    },
  });

  useLayoutEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, {
        duration: opacityDuration,
      }),
      -1,
      true
    );

    transformX.value = withRepeat(
      withTiming(width, {
        duration: duration,
        easing: Easing.bezier(0.17, 0.67, 0.83, 0.67),
      }),
      -1,
      reverse
    );
  }, [opacity, transformX, reverse, width, duration, opacityDuration]);

  return (
    <Animated.View
      style={[
        {
          width,
          height,
        },
        styles.shimmerBackground,
        rStyle,
        style,
      ]}
    >
      <AnimatedLinearGradient
        colors={colorsMode === 'light' ? defaultLightColors : defaultDarkColors}
        start={{ x: 0.1, y: 1 }}
        end={{ x: 1, y: 1 }}
        style={[StyleSheet.absoluteFillObject, translationStyle]}
      />
      {children}
    </Animated.View>
  );
};

export default ShimmerEffect;
