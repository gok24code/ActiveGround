import React from 'react';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

const BasketballCourt = ({
  onPress,
  fillColors = {},
  width = '100%',
  height = '100%',
}) => {
  // --- Dimensions based on 15m x 28m court ---
  const courtWidth = 150;
  const courtHeight = 280;
  const keyWidth = 49;
  const keyHeight = 58;
  const hoopRadius = 7.5;
  const hoopCenterY = 15.75; // 1.575m from baseline
  const backboardWidth = 18;
  const backboardOffsetY = hoopCenterY - 2;
  const threePointRadius = 67.5; // 6.75m radius
  const threePointLineX = 8.5; // 0.9m from sideline with buffer
  const centerCircleRadius = 18;
  const restrictedRadius = 12.5;

  // --- Path Calculations ---
  const top3PtArcY = hoopCenterY + Math.sqrt(Math.max(0, threePointRadius**2 - (courtWidth/2 - threePointLineX)**2));
  const bottom3PtArcY = (courtHeight - hoopCenterY) - Math.sqrt(Math.max(0, threePointRadius**2 - (courtWidth/2 - threePointLineX)**2));

  // Path for the area inside the top 3-point line
  const top3ptAreaPath = `
    M ${threePointLineX},0 
    L ${threePointLineX},${top3PtArcY} 
    A ${threePointRadius},${threePointRadius} 0 0 0 ${courtWidth - threePointLineX},${top3PtArcY}
    L ${courtWidth - threePointLineX},0 
    Z
  `;

  // Path for the area inside the bottom 3-point line
  const bottom3ptAreaPath = `
    M ${threePointLineX},${courtHeight}
    L ${threePointLineX},${bottom3PtArcY}
    A ${threePointRadius},${threePointRadius} 0 0 1 ${courtWidth - threePointLineX},${bottom3PtArcY}
    L ${courtWidth - threePointLineX},${courtHeight}
    Z
  `;

  return (
    <Svg width={width} height={height} viewBox={`0 0 ${courtWidth} ${courtHeight}`}>
      {/* --- Court Lines (drawn first for visual reference) --- */}
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
        d={`M 0 ${courtHeight / 2} H ${courtWidth}`}
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      <Circle // Center Circle Outline
        cx={courtWidth / 2}
        cy={courtHeight / 2}
        r={centerCircleRadius}
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      <Rect // Top Key Outline
        x={(courtWidth - keyWidth) / 2}
        y="0"
        width={keyWidth}
        height={keyHeight}
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      <Path // Top 3-Point Line
        d={`
          M ${threePointLineX},0 
          L ${threePointLineX},${top3PtArcY}
          A ${threePointRadius},${threePointRadius} 0 0 0 ${courtWidth - threePointLineX},${top3PtArcY}
          L ${courtWidth - threePointLineX},0
        `}
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      <Path // Top Restricted Area Arc
        d={`M ${courtWidth/2 - restrictedRadius},${hoopCenterY} A ${restrictedRadius},${restrictedRadius} 0 0 1 ${courtWidth/2 + restrictedRadius},${hoopCenterY}`}
        stroke="white"
        strokeWidth="2"
        fill="none"
      />

      <Rect // Bottom Key Outline
        x={(courtWidth - keyWidth) / 2}
        y={courtHeight - keyHeight}
        width={keyWidth}
        height={keyHeight}
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
       <Path // Bottom 3-Point Line
        d={`
          M ${threePointLineX},${courtHeight}
          L ${threePointLineX},${bottom3PtArcY}
          A ${threePointRadius},${threePointRadius} 0 0 1 ${courtWidth - threePointLineX},${bottom3PtArcY}
          L ${courtWidth - threePointLineX},${courtHeight}
        `}
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      <Path // Bottom Restricted Area Arc
        d={`M ${courtWidth/2 - restrictedRadius},${courtHeight - hoopCenterY} A ${restrictedRadius},${restrictedRadius} 0 0 0 ${courtWidth/2 + restrictedRadius},${courtHeight - hoopCenterY}`}
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      
      {/* --- Fillable Areas (Layered from largest to smallest) --- */}
      <Rect // Top Outer Area
        id="top-outer"
        x="0"
        y="0"
        width={courtWidth}
        height={courtHeight / 2}
        fill={fillColors['fill-top-outer'] || 'transparent'}
        onPress={() => onPress('fill-top-outer')}
      />
       <Rect // Bottom Outer Area
        id="bottom-outer"
        x="0"
        y={courtHeight / 2}
        width={courtWidth}
        height={courtHeight / 2}
        fill={fillColors['fill-bottom-outer'] || 'transparent'}
        onPress={() => onPress('fill-bottom-outer')}
      />
      <Path // Top 3-Point Area
        d={top3ptAreaPath}
        fill={fillColors['fill-top-3pt-area'] || 'transparent'}
        onPress={() => onPress('fill-top-3pt-area')}
      />
      <Path // Bottom 3-Point Area
        d={bottom3ptAreaPath}
        fill={fillColors['fill-bottom-3pt-area'] || 'transparent'}
        onPress={() => onPress('fill-bottom-3pt-area')}
      />
      <Rect // Top Key
        id="top-key"
        x={(courtWidth - keyWidth) / 2}
        y="0"
        width={keyWidth}
        height={keyHeight}
        fill={fillColors['fill-top-key'] || 'transparent'}
        onPress={() => onPress('fill-top-key')}
      />
       <Rect // Bottom Key
        id="bottom-key"
        x={(courtWidth - keyWidth) / 2}
        y={courtHeight - keyHeight}
        width={keyWidth}
        height={keyHeight}
        fill={fillColors['fill-bottom-key'] || 'transparent'}
        onPress={() => onPress('fill-bottom-key')}
      />
      <Circle // Center Circle
        id="center-circle"
        cx={courtWidth / 2}
        cy={courtHeight / 2}
        r={centerCircleRadius}
        fill={fillColors['fill-center-circle'] || 'transparent'}
        onPress={() => onPress('fill-center-circle')}
      />
    </Svg>
  );
};

export default BasketballCourt;
