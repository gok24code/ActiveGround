import React, { useRef, useState, useEffect, useMemo } from "react";
import { View, StyleSheet, PanResponder, useColorScheme } from "react-native";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import * as Haptics from "expo-haptics";

type ColorSliderProps = {
  onColorChange: (color: string) => void;
  style?: any;
  opacity?: number;
  selectedColor: string; // Add selectedColor prop
};

// Utility to parse hue from HSLA string
const getHueFromHsla = (hslaColor: string): number => {
  const match = hslaColor.match(/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%,\s*([\d.]+)\)/);
  if (match && match[1]) {
    return parseInt(match[1], 10);
  }
  return 0; // Default to red hue if parsing fails
};

const ColorSlider = ({
  onColorChange,
  style,
  opacity = 1.0,
  selectedColor,
}: ColorSliderProps) => {
  const sliderWidth = useRef(0);
  const colorScheme = useColorScheme();
  const [indicatorX, setIndicatorX] = useState(0);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const currentHue = useMemo(() => getHueFromHsla(selectedColor), [selectedColor]);

  // Update indicator position when selectedColor changes externally or sliderWidth becomes known
  useEffect(() => {
    if (sliderWidth.current > 0 && isMounted.current) {
      const newX = (currentHue / 360) * sliderWidth.current;
      setIndicatorX(newX);
    }
  }, [currentHue, sliderWidth.current]); // Depend on currentHue and sliderWidth.current

  const handleMove = (xPosition: number) => {
    const x = Math.max(0, Math.min(xPosition, sliderWidth.current));
    if (sliderWidth.current > 0) {
      const hue = (x / sliderWidth.current) * 360;
      const saturation = 100;
      const lightness = 50;
      const color = `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`;
      onColorChange(color);
      setIndicatorX(x); // Update indicator position immediately on move
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        handleMove(evt.nativeEvent.locationX);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      },
      onPanResponderMove: (evt) => handleMove(evt.nativeEvent.locationX),
      onPanResponderRelease: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      },
    })
  ).current;

  const styles = StyleSheet.create({
    slider: {
      width: "100%",
      height: 30,
      borderRadius: 15,
      borderWidth: 1.5,
      borderColor: colorScheme === "dark" ? "#555" : "#ccc",
      overflow: "hidden",
      justifyContent: "center",
    },
    indicator: {
      position: "absolute",
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: colorScheme === "dark" ? "#FFF" : "#000",
      backgroundColor: selectedColor, // Match selected color
      transform: [{ translateX: -10 }], // Center the indicator
    },
  });

  return (
    <View
      style={[styles.slider, style]}
      {...panResponder.panHandlers}
      onLayout={(event) => {
        if (event.nativeEvent.layout.width !== sliderWidth.current) {
            sliderWidth.current = event.nativeEvent.layout.width;
            // Recalculate indicator position if width changes
            const newX = (currentHue / 360) * sliderWidth.current;
            setIndicatorX(newX);
        }
      }}
    >
      <Svg width="100%" height="100%">
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0" x2="100%" y2="0">
            <Stop offset="0" stopColor="#ff0000" />
            <Stop offset="0.17" stopColor="#ffff00" />
            <Stop offset="0.34" stopColor="#00ff00" />
            <Stop offset="0.51" stopColor="#00ffff" />
            <Stop offset="0.68" stopColor="#0000ff" />
            <Stop offset="0.85" stopColor="#ff00ff" />
            <Stop offset="1" stopColor="#ff0000" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
      </Svg>
      <View style={[styles.indicator, { left: indicatorX }]} />
    </View>
  );
};

export default ColorSlider;
