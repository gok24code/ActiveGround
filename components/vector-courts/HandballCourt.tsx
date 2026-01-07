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
  const halfCourt = courtHeight / 2;

  // Dimensions for the curved lines based on the reference image
  const goalAreaRadius = 55; // Radius for the solid goal area arc
  const freeThrowRadius = 70; // Radius for the dashed free-throw arc
  const arcCenterX = courtWidth / 2;
  const topArcCenterY = 0;
  const bottomArcCenterY = courtHeight;
  const penaltyMarkY = 80; // Distance from the goal line to the penalty mark
  const penaltyMarkLength = 10;
  const goalLineWidth = 40; // Width of the goal line

  // --- Path Calculations ---
  const goalAreaArc = (centerY: number, direction: "top" | "bottom") => {
    const startX = arcCenterX - goalAreaRadius;
    const endX = arcCenterX + goalAreaRadius;
    const arcY = centerY === 0 ? goalAreaRadius : courtHeight - goalAreaRadius;
    const sweepFlag = direction === "top" ? 1 : 0;
    return `M ${startX} ${arcY} A ${goalAreaRadius} ${goalAreaRadius} 0 0 ${sweepFlag} ${endX} ${arcY}`;
  };

  const freeThrowArc = (centerY: number, direction: "top" | "bottom") => {
    const startX = arcCenterX - freeThrowRadius;
    const endX = arcCenterX + freeThrowRadius;
    const arcY =
      centerY === 0 ? freeThrowRadius : courtHeight - freeThrowRadius;
    const sweepFlag = direction === "top" ? 1 : 0;
    return `M ${startX} ${arcY} A ${freeThrowRadius} ${freeThrowRadius} 0 0 ${sweepFlag} ${endX} ${arcY}`;
  };

  // Path for the fillable goal areas
  const topGoalAreaPath = `M 0 0 H ${courtWidth} V ${goalAreaRadius} ${goalAreaArc(
    topArcCenterY,
    "top"
  )} V 0 Z`;
  const bottomGoalAreaPath = `M 0 ${courtHeight} H ${courtWidth} V ${
    courtHeight - goalAreaRadius
  } ${goalAreaArc(bottomArcCenterY, "bottom")} V ${courtHeight} Z`;

  // Path for the fillable play areas
  const topPlayAreaPath = `M 0 ${goalAreaRadius} H ${courtWidth} V ${halfCourt} H 0 V ${goalAreaRadius} ${goalAreaArc(
    topArcCenterY,
    "top"
  )} Z`;
  const bottomPlayAreaPath = `M 0 ${halfCourt} H ${courtWidth} V ${
    courtHeight - goalAreaRadius
  } ${goalAreaArc(bottomArcCenterY, "bottom")} V ${halfCourt} H 0 Z`;

  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${courtWidth} ${courtHeight}`}
    >
      {/* Court Lines */}
      <Rect // Court Outline
        x="0"
        y="0"
        width={courtWidth}
        height={courtHeight}
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      <Path // Center Line
        d={`M 0 ${halfCourt} H ${courtWidth}`}
        stroke="white"
        strokeWidth="2"
        fill="none"
      />

      {/* Top Half Lines */}
      <Path // Top Goal Area Line (Solid Arc)
        d={goalAreaArc(topArcCenterY, "top")}
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      <Path // Top Free-throw Line (Dashed Arc)
        d={freeThrowArc(topArcCenterY, "top")}
        stroke="white"
        strokeWidth="2"
        strokeDasharray="3,3"
        fill="none"
      />
      <Path // Top Penalty Mark (Tick)
        d={`M ${arcCenterX - penaltyMarkLength / 2} ${penaltyMarkY} H ${
          arcCenterX + penaltyMarkLength / 2
        }`}
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      <Path // Top Goal Line
        d={`M ${arcCenterX - goalLineWidth / 2} 1 H ${
          arcCenterX + goalLineWidth / 2
        }`}
        stroke="white"
        strokeWidth="2"
        fill="none"
      />

      {/* Bottom Half Lines */}
      <Path // Bottom Goal Area Line (Solid Arc)
        d={goalAreaArc(bottomArcCenterY, "bottom")}
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      <Path // Bottom Free-throw Line (Dashed Arc)
        d={freeThrowArc(bottomArcCenterY, "bottom")}
        stroke="white"
        strokeWidth="2"
        strokeDasharray="3,3"
        fill="none"
      />
      <Path // Bottom Penalty Mark (Tick)
        d={`M ${arcCenterX - penaltyMarkLength / 2} ${
          courtHeight - penaltyMarkY
        } H ${arcCenterX + penaltyMarkLength / 2}`}
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      <Path // Bottom Goal Line
        d={`M ${arcCenterX - goalLineWidth / 2} ${courtHeight - 1} H ${
          arcCenterX + goalLineWidth / 2
        }`}
        stroke="white"
        strokeWidth="2"
        fill="none"
      />

      {/* Fillable Areas */}
      <Path // Top Goal Area
        id="top-goal-area"
        d={topGoalAreaPath}
        fill={fillColors["fill-top-goal-area"] || "transparent"}
        onPress={() => onPress("fill-top-goal-area")}
      />
      <Path // Top Play Area
        id="top-play-area"
        d={topPlayAreaPath}
        fill={fillColors["fill-top-play-area"] || "transparent"}
        onPress={() => onPress("fill-top-play-area")}
      />
      <Path // Bottom Goal Area
        id="bottom-goal-area"
        d={bottomGoalAreaPath}
        fill={fillColors["fill-bottom-goal-area"] || "transparent"}
        onPress={() => onPress("fill-bottom-goal-area")}
      />
      <Path // Bottom Play Area
        id="bottom-play-area"
        d={bottomPlayAreaPath}
        fill={fillColors["fill-bottom-play-area"] || "transparent"}
        onPress={() => onPress("fill-bottom-play-area")}
      />
    </Svg>
  );
};

export default HandballCourt;
