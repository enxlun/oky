import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import Svg, { Ellipse } from "react-native-svg";

const { width, height } = Dimensions.get("window");

const Cloud = ({ size, left, top, delay }: any) => {
  const animatedY = useRef(new Animated.Value(0)).current;
  const animatedX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(animatedY, {
            toValue: -30,
            duration: 15000,
            useNativeDriver: true,
            delay,
          }),
          Animated.timing(animatedX, {
            toValue: 15,
            duration: 15000,
            useNativeDriver: true,
            delay,
          }),
        ]),
        Animated.parallel([
          Animated.timing(animatedY, {
            toValue: 0,
            duration: 15000,
            useNativeDriver: true,
          }),
          Animated.timing(animatedX, {
            toValue: 0,
            duration: 15000,
            useNativeDriver: true,
          }),
        ]),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <Animated.View
      style={{
        position: "absolute",
        left: left,
        top: top,
        opacity: 0.2,
        transform: [{ translateY: animatedY }, { translateX: animatedX }],
      }}
    >
      <Svg width={size} height={size * 0.6} viewBox="0 0 200 120">
        <Ellipse cx="50" cy="70" rx="40" ry="35" fill="#32B8DE" />
        <Ellipse cx="100" cy="60" rx="50" ry="40" fill="#32B8DE" />
        <Ellipse cx="150" cy="70" rx="40" ry="35" fill="#32B8DE" />
        <Ellipse cx="75" cy="85" rx="45" ry="30" fill="#32B8DE" />
        <Ellipse cx="125" cy="85" rx="45" ry="30" fill="#32B8DE" />
      </Svg>
    </Animated.View>
  );
};

export default function AnimatedClouds() {
  const clouds = [
    { size: 120, left: width * 0.1, top: height * 0.2, delay: 0 },
    { size: 90, left: width * 0.3, top: height * 0.4, delay: 5000 },
    { size: 110, left: width * 0.6, top: height * 0.15, delay: 2000 },
    { size: 80, left: width * 0.8, top: height * 0.5, delay: 8000 },
    { size: 100, left: width * 0.45, top: height * 0.3, delay: 4000 },
  ];

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {clouds.map((cloud, index) => (
        <Cloud key={index} {...cloud} />
      ))}
    </View>
  );
}
