import React from "react";
import Svg, { Path, Rect, G, Line } from "react-native-svg";

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
    
    return `M 18 ${y0} A 45 45 0 0 ${sweepFlag} ${centerX - sixMeterStraightWidth / 2} ${yRadius} L ${centerX + sixMeterStraightWidth / 2} ${yRadius} A 45 45 0 0 ${sweepFlag} ${courtWidth - 18} ${y0}`;
  };
  
  // Path for the 9m Free-throw LINE
  const getNineMeterLinePath = (isTop: boolean) => {
    const y0 = isTop ? 0 : courtHeight;
    const yRadius = isTop ? 72 : courtHeight - 72;
    const sweepFlag = isTop ? 0 : 1; // 0 for top, 1 for bottom to make curves inward

    return `M 4 ${y0} A 70 70 0 0 ${sweepFlag} ${centerX - nineMeterStraightWidth / 2} ${yRadius} L ${centerX + nineMeterStraightWidth / 2} ${yRadius} A 70 70 0 0 ${sweepFlag} ${courtWidth - 4} ${y0}`;
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
      viewBox={`0 0 ${courtWidth} ${courtHeight}`}
    >
      {/* 1. COURT LINES (Rendered first, will be behind the fill) */}
      <G id="court-lines" pointerEvents="none">
        <Rect x="0" y="0" width={courtWidth} height={courtHeight} stroke="white" strokeWidth="1.5" fill="none" />
        <Line x1="0" y1={halfHeight} x2={courtWidth} y2={halfHeight} stroke="white" strokeWidth="1.5" />

        {/* Top Half Lines */}
        <Path d={getSixMeterPath(true)} stroke="white" strokeWidth="1.5" fill="none" />
        <Path d={getNineMeterPath(true)} stroke="white" strokeWidth="1.5" strokeDasharray="5,4" fill="none" />
        <Line x1={centerX - 6} y1="58" x2={centerX + 6} y2="58" stroke="white" strokeWidth="2" />
        <Line x1={centerX - 3} y1="32" x2={centerX + 3} y2="32" stroke="white" strokeWidth="1.5" />
        <Line x1={centerX - goalWidth / 2} y1="0.8" x2={centerX + goalWidth / 2} y2="0.8" stroke="white" strokeWidth="3" />
        
        {/* Bottom Half Lines */}
        <Path d={getSixMeterPath(false)} stroke="white" strokeWidth="1.5" fill="none" />
        <Path d={getNineMeterPath(false)} stroke="white" strokeWidth="1.5" strokeDasharray="5,4" fill="none" />
        <Line x1={centerX - 6} y1={courtHeight - 58} x2={centerX + 6} y2={courtHeight - 58} stroke="white" strokeWidth="2" />
        <Line x1={centerX - 3} y1={courtHeight - 32} x2={centerX + 3} y2={courtHeight - 32} stroke="white" strokeWidth="1.5" />
        <Line x1={centerX - goalWidth / 2} y1={courtHeight - 0.8} x2={centerX + goalWidth / 2} y2={courtHeight - 0.8} stroke="white" strokeWidth="3" />
      </G>

      {/* 2. FILLABLE AREAS (Rendered last, on top of lines) */}
      <G id="fillable-areas">
        <Rect
          id="fill-top-half"
          x="0" y="0" width={courtWidth} height={halfHeight}
          fill={fillColors["fill-top-half"] || "transparent"}
          onPress={() => onPress("fill-top-half")}
        />
        <Rect
          id="fill-bottom-half"
          x="0" y={halfHeight} width={courtWidth} height={halfHeight}
          fill={fillColors["fill-bottom-half"] || "transparent"}
          onPress={() => onPress("fill-bottom-half")}
        />
      </G>
    </Svg>
  );
};

export default HandballCourt;
