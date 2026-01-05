import React from "react";
import Svg, { Path, Rect } from "react-native-svg";

const VolleyballCourt = ({
  onPress,
  fillColors = {},
  width = "100%",
  height = "100%",
}) => {
  const courtWidth = 150;
  const courtHeight = 280;
  const attackLineOffset = 93; // 3 meters from center, half court is 9m, so 1/3 of the way. 140 / 3 = 46.
  const halfCourt = courtHeight / 2;

  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${courtWidth} ${courtHeight}`}
    >
      {/* Court Lines */}
      <Rect
        x="0"
        y="0"
        width={courtWidth}
        height={courtHeight}
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      <Path
        d={`M 0 ${courtHeight / 2} H ${courtWidth}`}
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      <Path
        d={`M 0 ${attackLineOffset} H ${courtWidth}`}
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      <Path
        d={`M 0 ${courtHeight - attackLineOffset} H ${courtWidth}`}
        stroke="white"
        strokeWidth="2"
        fill="none"
      />

      {/* Fillable Areas */}
      <Rect // Top attack zone
        id="top-attack"
        x="0"
        y={attackLineOffset}
        width={courtWidth}
        height={halfCourt - attackLineOffset}
        fill={fillColors['fill-top-attack'] || 'transparent'}
        onPress={() => onPress('fill-top-attack')}
      />
      <Rect // Top back zone
        id="top-back"
        x="0"
        y="0"
        width={courtWidth}
        height={attackLineOffset}
        fill={fillColors['fill-top-back'] || 'transparent'}
        onPress={() => onPress('fill-top-back')}
      />
      <Rect // Bottom attack zone
        id="bottom-attack"
        x="0"
        y={halfCourt}
        width={courtWidth}
        height={halfCourt - attackLineOffset}
        fill={fillColors['fill-bottom-attack'] || 'transparent'}
        onPress={() => onPress('fill-bottom-attack')}
      />
      <Rect // Bottom back zone
        id="bottom-back"
        x="0"
        y={halfCourt + halfCourt - attackLineOffset}
        width={courtWidth}
        height={attackLineOffset}
        fill={fillColors['fill-bottom-back'] || 'transparent'}
        onPress={() => onPress('fill-bottom-back')}
      />
    </Svg>
  );
};

export default VolleyballCourt;
