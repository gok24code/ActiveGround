import React from "react";
import Svg, { G, Line, Path, Rect, Circle } from "react-native-svg";

interface HandballCourtProps {
  onPress: (areaId: string) => void;
  fillColors?: Record<string, string>;
  width?: string | number;
  height?: string | number;
}

const HandballCourt: React.FC<HandballCourtProps> = ({
  onPress,
  fillColors = {},
  width = "100%",
  height = "100%",
}) => {
  const courtWidth = 150;
  const courtHeight = 280;
  const centerX = courtWidth / 2;
  const halfHeight = courtHeight / 2;

  // Dimensions
  const goalWidth = 30;
  const sixMeterStraightWidth = 36;
  const nineMeterStraightWidth = 44;

  // Path for the 6m Goal Area LINE
  const getSixMeterLinePath = (isTop: boolean) => {
    const y0 = isTop ? 0 : courtHeight;
    const yRadius = isTop ? 48 : courtHeight - 48;
    const sweepFlag = isTop ? 0 : 1; // 0 for top, 1 for bottom to make curves inward

    return `M 18 ${y0} A 45 45 0 0 ${sweepFlag} ${
      centerX - sixMeterStraightWidth / 2
    } ${yRadius} L ${
      centerX + sixMeterStraightWidth / 2
    } ${yRadius} A 45 45 0 0 ${sweepFlag} ${courtWidth - 18} ${y0}`;
  };

  // Path for the 9m Free-throw LINE
  const getNineMeterLinePath = (isTop: boolean) => {
    const y0 = isTop ? 0 : courtHeight;
    const yRadius = isTop ? 72 : courtHeight - 72;
    const sweepFlag = isTop ? 0 : 1; // 0 for top, 1 for bottom to make curves inward

    return `M 0 ${y0} A 70 70 0 0 ${sweepFlag} ${
      centerX - nineMeterStraightWidth / 2
    } ${yRadius} L ${
      centerX + nineMeterStraightWidth / 2
    } ${yRadius} A 70 70 0 0 ${sweepFlag} ${courtWidth} ${y0}`;
  };

  // Path for the 6m Goal FILL AREA (a closed shape)
  const getSixMeterFillPath = (isTop: boolean) => {
    const linePath = getSixMeterLinePath(isTop);
    const y0 = isTop ? 0 : courtHeight;
    return `${linePath} L ${courtWidth - 18} ${y0} L 18 ${y0} Z`;
  };

  // Path for the 9m Free-throw Area Path (closed)
  const getNineMeterFillPath = (isTop: boolean) => {
    const linePath = getNineMeterLinePath(isTop);
    const y0 = isTop ? 0 : courtHeight;
    // Close the D-shape by connecting back to the y0 line
    return `${linePath} L ${courtWidth - 4} ${y0} L 4 ${y0} Z`;
  };

  return (
    <Svg
      width={width}
      height={height}
      viewBox={`-10 -2 ${courtWidth + 20} ${courtHeight + 4}`}
    >
      {/* 1. COURT LINES (Rendered first, will be behind the fill) */}
      <G id="court-lines" pointerEvents="none">
        <Rect
          x="0"
          y="0"
          width={courtWidth}
          height={courtHeight}
          stroke="white"
          strokeWidth="1.5"
          fill="none"
        />
        <Line
          x1="0"
          y1={halfHeight}
          x2={centerX - 20}
          y2={halfHeight}
          stroke="white"
          strokeWidth="1.5"
        />
        <Line
          x1={centerX + 20}
          y1={halfHeight}
          x2={courtWidth}
          y2={halfHeight}
          stroke="white"
          strokeWidth="1.5"
        />



        {/* Player Entry Lines - Left */}
        <Line x1="-10" y1={halfHeight - 30} x2="0" y2={halfHeight - 30} stroke="white" strokeWidth="1.5" />
        <Line x1="-10" y1={halfHeight + 30} x2="0" y2={halfHeight + 30} stroke="white" strokeWidth="1.5" />

        {/* Top Half Lines */}
        <Path
          d={getSixMeterLinePath(true)}
          stroke="white"
          strokeWidth="1.5"
          fill="none"
        />
        <Path
          d={getNineMeterLinePath(true)}
          stroke="white"
          strokeWidth="1.5"
          strokeDasharray="5,4"
          fill="none"
        />
        <Line
          x1={centerX - 6}
          y1="58"
          x2={centerX + 6}
          y2="58"
          stroke="white"
          strokeWidth="2"
        />
        <Line
          x1={centerX - 3}
          y1="32"
          x2={centerX + 3}
          y2="32"
          stroke="white"
          strokeWidth="1.5"
        />
        <Line
          x1={centerX - goalWidth / 2 - 4}
          y1="-2"
          x2={centerX + goalWidth / 2 + 4}
          y2="-2"
          stroke="white"
          strokeWidth="5"
        />

        {/* Bottom Half Lines */}
        <Path
          d={getSixMeterLinePath(false)}
          stroke="white"
          strokeWidth="1.5"
          fill="none"
        />
        <Path
          d={getNineMeterLinePath(false)}
          stroke="white"
          strokeWidth="1.5"
          strokeDasharray="5,4"
          fill="none"
        />
        <Line
          x1={centerX - 6}
          y1={courtHeight - 58}
          x2={centerX + 6}
          y2={courtHeight - 58}
          stroke="white"
          strokeWidth="2"
        />
        <Line
          x1={centerX - 3}
          y1={courtHeight - 32}
          x2={centerX + 3}
          y2={courtHeight - 32}
          stroke="white"
          strokeWidth="1.5"
        />
        <Line
          x1={centerX - goalWidth / 2 - 4}
          y1={courtHeight + 2}
          x2={centerX + goalWidth / 2 + 4}
          y2={courtHeight + 2}
          stroke="white"
          strokeWidth="5"
        />
      </G>

      {/* 2. FILLABLE AREAS (Rendered last, on top of lines) */}
      <G id="fillable-areas">
        {/* Fillable 6m Goal Area - Top */}
        <Path
          id="fill-six-meter-top"
          d={getSixMeterFillPath(true)}
          fill={fillColors["fill-six-meter-top"] || "transparent"}
          onPress={() => onPress("fill-six-meter-top")}
        />
        {/* Fillable 9m Free-throw Area - Top */}
        <Path
          id="fill-nine-meter-top"
          d={getNineMeterFillPath(true)}
          fill={fillColors["fill-nine-meter-top"] || "transparent"}
          onPress={() => onPress("fill-nine-meter-top")}
        />

        {/* Fillable 6m Goal Area - Bottom */}
        <Path
          id="fill-six-meter-bottom"
          d={getSixMeterFillPath(false)}
          fill={fillColors["fill-six-meter-bottom"] || "transparent"}
          onPress={() => onPress("fill-six-meter-bottom")}
        />
        {/* Fillable 9m Free-throw Area - Bottom */}
        <Path
          id="fill-nine-meter-bottom"
          d={getNineMeterFillPath(false)}
          fill={fillColors["fill-nine-meter-bottom"] || "transparent"}
          onPress={() => onPress("fill-nine-meter-bottom")}
        />
        <Rect
          id="fill-top-half"
          x="0"
          y="0"
          width={courtWidth}
          height={halfHeight}
          fill={fillColors["fill-top-half"] || "transparent"}
          onPress={() => onPress("fill-top-half")}
        />
        <Rect
          id="fill-bottom-half"
          x="0"
          y={halfHeight}
          width={courtWidth}
          height={halfHeight}
          fill={fillColors["fill-bottom-half"] || "transparent"}
          onPress={() => onPress("fill-bottom-half")}
        />
        {/* Fillable Center Circle */}
        <Circle
          id="fill-center-circle"
          cx={centerX}
          cy={halfHeight}
          r="20"
          stroke="white"
          strokeWidth="1.5"
          fill={fillColors["fill-center-circle"] || "transparent"}
          onPress={() => onPress("fill-center-circle")}
        />
      </G>
    </Svg>
  );
};

export default HandballCourt;
