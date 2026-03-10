import React from "react";
import { Pressable, ViewStyle } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";

interface PressableScaleProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  scaleValue?: number;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function PressableScale({
  children,
  onPress,
  style,
  scaleValue = 0.95,
}: PressableScaleProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      onPressIn={() => {
        scale.value = withSpring(scaleValue, { damping: 10 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 10 });
      }}
      onPress={onPress}
      style={[style, animatedStyle]}
    >
      {children}
    </AnimatedPressable>
  );
}
