import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { View, PanResponder, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type PathData = {
  path: string;
  color: string;
};

type DrawingCanvasProps = {
  style?: any;
  color: string;
};

const DrawingCanvas = forwardRef((props: DrawingCanvasProps, ref) => {
  const [paths, setPaths] = useState<PathData[]>([]);
  const [currentPath, setCurrentPath] = useState<PathData | null>(null);
  const viewRef = useRef<View>(null);

  useImperativeHandle(ref, () => ({
    clearCanvas: () => {
      setPaths([]);
      setCurrentPath(null);
    },
  }));

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt, gestureState) => {
      viewRef.current?.measure((x, y, width, height, pageX, pageY) => {
        setCurrentPath({
          path: `M${gestureState.x0 - pageX},${gestureState.y0 - pageY}`,
          color: props.color,
        });
      });
    },
    onPanResponderMove: (evt, gestureState) => {
      viewRef.current?.measure((x, y, width, height, pageX, pageY) => {
        if (currentPath) {
          setCurrentPath({
            ...currentPath,
            path: `${currentPath.path} L${gestureState.moveX - pageX},${
              gestureState.moveY - pageY
            }`,
          });
        }
      });
    },
    onPanResponderRelease: () => {
      if (currentPath) {
        setPaths((prevPaths) => [...prevPaths, currentPath]);
      }
      setCurrentPath(null);
    },
  });

  return (
    <View
      ref={viewRef}
      style={[styles.container, props.style]}
      {...panResponder.panHandlers}
    >
      <Svg height="100%" width="100%">
        {paths.map((p, i) => (
          <Path
            key={i}
            d={p.path}
            stroke={p.color}
            strokeWidth={3}
            fill="none"
          />
        ))}
        {currentPath && (
          <Path
            d={currentPath.path}
            stroke={currentPath.color}
            strokeWidth={3}
            fill="none"
          />
        )}
      </Svg>
    </View>
  );
});

DrawingCanvas.displayName = 'DrawingCanvas';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default DrawingCanvas;
