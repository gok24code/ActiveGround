import React from "react";
import Svg, { Path, Rect } from "react-native-svg";

interface HandballCourtProps {
  onPress: (areaId: string) => void;
  fillColors?: Record<string, string>;
  width?: string;
  height?: string;
}

const HandballCourt: React.FC<HandballCourtProps> = ({
  onPress,
  fillColors = {},
  width = "100%",
  height = "100%",
}) => {
  const courtWidth = 150;
  const courtHeight = 280;
  const goalAreaOffset = 40;
  const goalHeight = 20;
  const freeThrowLineOffset = 60;
  const penaltyLineOffset = 85;
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
      <Path // Top Goal Area Line
        d={`M 0 ${goalAreaOffset} H ${courtWidth}`}
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      <Path // Top Free-throw Line
        d={`M 0 ${freeThrowLineOffset} H ${courtWidth}`}
        stroke="white"
        strokeWidth="2"
        strokeDasharray="3,3"
        fill="none"
      />
      <Path // Top Penalty Mark
        d={`M ${courtWidth / 2 - 10} ${penaltyLineOffset} H ${
          courtWidth / 2 + 10
        }`}
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      <Rect // Top Goal
        x={(courtWidth - goalHeight) / 2}
        y="0"
        width={goalHeight}
        height="2"
        fill="white"
      />
      <Path // Bottom Goal Area Line
        d={`M 0 ${courtHeight - goalAreaOffset} H ${courtWidth}`}
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      <Path // Bottom Free-throw Line
        d={`M 0 ${courtHeight - freeThrowLineOffset} H ${courtWidth}`}
        stroke="white"
        strokeWidth="2"
        strokeDasharray="3,3"
        fill="none"
      />
      <Path // Bottom Penalty Mark
        d={`M ${courtWidth / 2 - 10} ${courtHeight - penaltyLineOffset} H ${
          courtWidth / 2 + 10
        }`}
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      <Rect // Bottom Goal
        x={(courtWidth - goalHeight) / 2}
        y={courtHeight - 2}
        width={goalHeight}
        height="2"
        fill="white"
      />

      {/* Fillable Areas */}
      <Rect // Top Goal Area
        id="top-goal-area"
        x="0"
        y="0"
        width={courtWidth}
        height={goalAreaOffset}
        fill={fillColors["fill-top-goal-area"] || "transparent"}
        onPress={() => onPress("fill-top-goal-area")}
      />
      <Rect // Top Play Area
        id="top-play-area"
        x="0"
        y={goalAreaOffset}
        width={courtWidth}
        height={halfCourt - goalAreaOffset}
        fill={fillColors["fill-top-play-area"] || "transparent"}
        onPress={() => onPress("fill-top-play-area")}
      />
      <Rect // Bottom Goal Area
        id="bottom-goal-area"
        x="0"
        y={halfCourt + halfCourt - goalAreaOffset}
        width={courtWidth}
        height={goalAreaOffset}
        fill={fillColors["fill-bottom-goal-area"] || "transparent"}
        onPress={() => onPress("fill-bottom-goal-area")}
      />
      <Rect // Bottom Play Area
        id="bottom-play-area"
        x="0"
        y={halfCourt}
        width={courtWidth}
        height={halfCourt - goalAreaOffset}
        fill={fillColors["fill-bottom-play-area"] || "transparent"}
        onPress={() => onPress("fill-bottom-play-area")}
      />
    </Svg>
  );
};

export default HandballCourt;
