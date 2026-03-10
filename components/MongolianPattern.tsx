import React from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Defs, Path, Pattern, Rect } from "react-native-svg";

export default function MongolianPattern() {
  return (
    <View style={styles.container} pointerEvents="none">
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
      >
        <Defs>
          <Pattern
            id="mongolPattern"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <Path
              d="M 50 10 Q 60 20 50 30 Q 40 40 50 50 Q 60 60 50 70 Q 40 80 50 90"
              stroke="#FFE700"
              strokeWidth="2"
              fill="none"
            />
            <Path
              d="M 30 30 L 40 40 L 30 50 L 20 40 Z"
              fill="#FF9800"
              opacity="0.6"
            />
            <Path
              d="M 70 30 L 80 40 L 70 50 L 60 40 Z"
              fill="#A4D233"
              opacity="0.6"
            />
          </Pattern>
        </Defs>
        <Rect width="1000" height="100" fill="url(#mongolPattern)" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 64,
    opacity: 0.3,
    zIndex: 10,
  },
});
