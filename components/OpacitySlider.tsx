import React, { useRef, useState, useEffect, useMemo } from "react";
import { View, StyleSheet, PanResponder, useColorScheme } from "react-native";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import * as Haptics from "expo-haptics";

type OpacitySliderProps = {
  onOpacityChange: (opacity: number) => void;
  style?: any;
  hue: number;
  opacity: number;
};

const OpacitySlider = ({
  onOpacityChange,
  style,
  hue,
  opacity,
}: OpacitySliderProps) => {
  const sliderWidth = useRef(0);
  const colorScheme = useColorScheme();
  const [indicatorX, setIndicatorX] = useState(0);

  // Update indicator position when opacity changes externally or sliderWidth becomes known
  useEffect(() => {
    if (sliderWidth.current > 0) {
      const newX = opacity * sliderWidth.current;
      setIndicatorX(newX);
    }
  }, [opacity, sliderWidth.current]);

  const handleMove = (xPosition: number) => {
    const x = Math.max(0, Math.min(xPosition, sliderWidth.current));
    if (sliderWidth.current > 0) {
      const newOpacity = x / sliderWidth.current;
      onOpacityChange(newOpacity);
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

  const indicatorColor = `hsla(${hue}, 100%, 50%, ${opacity})`;


  const styles = StyleSheet.create({
    slider: {
      width: "100%",
      height: 30,
      borderRadius: 15,
      borderWidth: 1.5,
      borderColor: colorScheme === "dark" ? "#555" : "#ccc",
      overflow: "hidden",
      justifyContent: "center",
      marginBottom: 20, // Add margin to separate from ColorSlider
    },
    indicator: {
      position: "absolute",
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: colorScheme === "dark" ? "#FFF" : "#000",
      backgroundColor: indicatorColor,
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
            const newX = opacity * sliderWidth.current;
            setIndicatorX(newX);
        }
      }}
    >
      <Svg width="100%" height="100%">
        <Defs>
          <LinearGradient id="opacityGrad" x1="0%" y1="0" x2="100%" y2="0">
            <Stop offset="0" stopColor="black" />
            <Stop offset="1" stopColor="white" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#opacityGrad)" />
      </Svg>
      <View style={[styles.indicator, { left: indicatorX }]} />
    </View>
  );
};

export default OpacitySlider;
