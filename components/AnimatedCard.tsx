import React, { useEffect } from "react";
import { ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withSequence,
  withRepeat,
} from "react-native-reanimated";

interface AnimatedCardProps {
  children: React.ReactNode;
  delay?: number;
  style?: ViewStyle;
  bounce?: boolean;
}

export function AnimatedCard({
  children,
  delay = 0,
  style,
  bounce = false,
}: AnimatedCardProps) {
  const translateY = useSharedValue(50);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withSpring(0, {
        damping: 15,
        stiffness: 100,
      })
    );
    opacity.value = withDelay(delay, withSpring(1));

    if (bounce) {
      scale.value = withDelay(
        delay + 300,
        withSequence(withSpring(1.05, { damping: 8 }), withSpring(1, { damping: 8 }))
      );
    }
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
    opacity: opacity.value,
  }));

  return <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>;
}

export function FloatingEmoji({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withRepeat(
        withSequence(withSpring(-10, { damping: 10 }), withSpring(0, { damping: 10 })),
        -1,
        false
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}

export function PulseView({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(withSpring(1.03, { damping: 10 }), withSpring(1, { damping: 10 })),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>;
}
