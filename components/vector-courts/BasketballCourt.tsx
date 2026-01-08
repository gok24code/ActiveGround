import React from "react";
import Svg, { Circle, Defs, G, Path, Pattern, Rect } from "react-native-svg";

interface BasketballCourtProps {
  onPress: (areaId: string) => void;
  fillColors?: Record<string, string>;
  width?: string;
  height?: string;
}

const BasketballCourt: React.FC<BasketballCourtProps> = ({
  onPress,
  fillColors = {},
  width = "100%",
  height = "100%",
}) => {
  // --- Dimensions based on standard proportions (Vertical Layout) ---
  const courtWidth = 150;
  const courtHeight = 280;

  // Key (Boyalı Alan) Boyutları
  const keyWidth = 49;
  const keyHeight = 58; // Baseline'dan serbest atış çizgisine kadar

  // Çember ve Pota
  const hoopCenterY = 15.75;
  const restrictedRadius = 12.5;

  // 3 Sayı Çizgisi
  const threePointRadius = 67.5;
  const threePointLineX = 9.0; // Kenardan mesafe (corner 3)

  // Orta Saha
  const centerCircleRadius = 18;

  // Serbest Atış Dairesi Yarıçapı
  const freeThrowRadius = 18; // keyWidth yaklaşık 49 ise bu makul

  // --- Helper Calculations ---
  const keyLeftX = (courtWidth - keyWidth) / 2;
  const keyRightX = (courtWidth + keyWidth) / 2;

  // 3 Sayı yayının düz çizgi bitiş noktası (Y ekseninde)
  const top3PtArcY =
    hoopCenterY +
    Math.sqrt(
      Math.max(
        0,
        threePointRadius ** 2 - (courtWidth / 2 - threePointLineX) ** 2
      )
    );

  const bottom3PtArcY =
    courtHeight -
    hoopCenterY -
    Math.sqrt(
      Math.max(
        0,
        threePointRadius ** 2 - (courtWidth / 2 - threePointLineX) ** 2
      )
    );

  // --- Lane Hash Marks (Koridor Çentikleri) ---
  // Görselde boyalı alanın kenarında 4 adet çentik var.
  // Bunların potadan uzaklıklarını (tahmini oranla) ayarlıyoruz.
  const laneTicks = [20, 30, 40, 50]; // Baseline'dan Y mesafeleri

  // Parke Renkleri
  const woodBaseColor = "#e1c699";
  const woodLineColor = "#cfae7d";

  // --- Paths for Fillable Areas ---

  // Üst 3 Sayı Alanı Yolu
  const top3ptAreaPath = `
    M ${threePointLineX},0 
    L ${threePointLineX},${top3PtArcY} 
    A ${threePointRadius},${threePointRadius} 0 0 0 ${
    courtWidth - threePointLineX
  },${top3PtArcY}
    L ${courtWidth - threePointLineX},0 
    Z
  `;

  // Alt 3 Sayı Alanı Yolu
  const bottom3ptAreaPath = `
    M ${threePointLineX},${courtHeight}
    L ${threePointLineX},${bottom3PtArcY}
    A ${threePointRadius},${threePointRadius} 0 0 1 ${
    courtWidth - threePointLineX
  },${bottom3PtArcY}
    L ${courtWidth - threePointLineX},${courtHeight}
    Z
  `;

  // Serbest atış dairesinin üst yarısı (solid - key dışı)
  // M (start) A (radius-x radius-y rotation large-arc sweep end)
  const topFreeThrowSolidArc = `
    M ${keyLeftX},${keyHeight} 
    A ${keyWidth / 2},${keyWidth / 2} 0 0 1 ${keyRightX},${keyHeight}
  `;

  // Serbest atış dairesinin alt yarısı (dashed - key içi)
  const topFreeThrowDashedArc = `
    M ${keyLeftX},${keyHeight} 
    A ${keyWidth / 2},${keyWidth / 2} 0 0 0 ${keyRightX},${keyHeight}
  `;

  // Alt pota için aynısı (koordinatlar tersine çevrildi)
  const bottomKeyTopY = courtHeight - keyHeight;
  const bottomFreeThrowSolidArc = `
    M ${keyLeftX},${bottomKeyTopY} 
    A ${keyWidth / 2},${keyWidth / 2} 0 0 0 ${keyRightX},${bottomKeyTopY}
  `;
  const bottomFreeThrowDashedArc = `
    M ${keyLeftX},${bottomKeyTopY} 
    A ${keyWidth / 2},${keyWidth / 2} 0 0 1 ${keyRightX},${bottomKeyTopY}
  `;

  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${courtWidth} ${courtHeight}`}
    >
      {/* --- 1. ZEMİN VE PARKE (DİKEY OUTLINE) --- */}
      <Defs>
        <Pattern
          id="parquet-pattern-bball"
          x="0"
          y="0"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
          viewBox="0 0 20 20"
        >
          <Rect x="0" y="0" width="20" height="20" fill="transparent" />
          {/* Vertical lines for all planks */}
          <Path d="M0 0 V20" stroke="white" strokeWidth="0.5" opacity="0.3" />
          <Path d="M10 0 V20" stroke="white" strokeWidth="0.5" opacity="0.3" />
          <Path d="M20 0 V20" stroke="white" strokeWidth="0.5" opacity="0.3" />
          {/* Horizontal lines creating the stagger */}
          <Path d="M0 10 H10" stroke="white" strokeWidth="0.5" opacity="0.3" />
          <Path d="M10 0 H20" stroke="white" strokeWidth="0.5" opacity="0.3" />
          <Path d="M10 20 H20" stroke="white" strokeWidth="0.5" opacity="0.3" />
        </Pattern>
      </Defs>
      <Rect
        x="0"
        y="0"
        width={courtWidth}
        height={courtHeight}
        fill="url(#parquet-pattern-bball)"
      />

      {/* --- 2. SAHA ÇİZGİLERİ (GÜNCELLENDİ) --- */}
      <G pointerEvents="none">
        {/* Dış Çerçeve */}
        <Rect
          x="0"
          y="0"
          width={courtWidth}
          height={courtHeight}
          stroke="white"
          strokeWidth="2"
          fill="none"
        />
        {/* Orta Saha Çizgisi */}
        <Path
          d={`M 0 ${courtHeight / 2} H ${courtWidth}`}
          stroke="white"
          strokeWidth="2"
          fill="none"
        />
        {/* Orta Yuvarlak */}
        <Circle
          cx={courtWidth / 2}
          cy={courtHeight / 2}
          r={centerCircleRadius}
          stroke="white"
          strokeWidth="2"
          fill="none"
        />
        {/* --- ÜST YARI SAHA --- */}
        {/* Key (Dikdörtgen) */}
        <Rect
          x={keyLeftX}
          y="0"
          width={keyWidth}
          height={keyHeight}
          stroke="white"
          strokeWidth="2"
          fill="none"
        />
        {/* Serbest Atış Yayı (Üst - Solid) */}
        <Path
          d={topFreeThrowSolidArc}
          stroke="white"
          strokeWidth="2"
          fill="none"
        />
        {/* Serbest Atış Yayı (Alt - Dashed) */}
        <Path
          d={topFreeThrowDashedArc}
          stroke="white"
          strokeWidth="2"
          strokeDasharray="4,4"
          fill="none"
        />
        {/* 3 Sayı Çizgisi */}
        <Path
          d={`
            M ${threePointLineX},0 
            L ${threePointLineX},${top3PtArcY}
            A ${threePointRadius},${threePointRadius} 0 0 0 ${
            courtWidth - threePointLineX
          },${top3PtArcY}
            L ${courtWidth - threePointLineX},0
          `}
          stroke="white"
          strokeWidth="2"
          fill="none"
        />
        {/* Restricted Area (Pota Altı Yarım Daire) */}
        <Path
          d={`M ${
            courtWidth / 2 - restrictedRadius
          },${hoopCenterY} A ${restrictedRadius},${restrictedRadius} 0 0 1 ${
            courtWidth / 2 + restrictedRadius
          },${hoopCenterY}`}
          stroke="white"
          strokeWidth="2"
          fill="none"
        />
        {/* Pota Çemberi ve Pano (KALDIRILDI) */}
        {/* Lane Hash Marks (Koridor Çentikleri - Üst) */}
        {laneTicks.map((y, i) => (
          <React.Fragment key={`top-ticks-${i}`}>
            {/* Sol Taraf */}
            <Path
              d={`M ${keyLeftX - 3} ${y} H ${keyLeftX}`}
              stroke="white"
              strokeWidth="2"
            />
            {/* Sağ Taraf */}
            <Path
              d={`M ${keyRightX} ${y} H ${keyRightX + 3}`}
              stroke="white"
              strokeWidth="2"
            />
          </React.Fragment>
        ))}
        {/* --- ALT YARI SAHA --- */}
        {/* Key (Dikdörtgen) */}
        <Rect
          x={keyLeftX}
          y={courtHeight - keyHeight}
          width={keyWidth}
          height={keyHeight}
          stroke="white"
          strokeWidth="2"
          fill="none"
        />
        {/* Serbest Atış Yayı (Üst - Dashed - Pota Tarafı) */}
        <Path
          d={bottomFreeThrowDashedArc}
          stroke="white"
          strokeWidth="2"
          strokeDasharray="4,4"
          fill="none"
        />
        {/* Serbest Atış Yayı (Alt - Solid - Dış Taraf) */}
        <Path
          d={bottomFreeThrowSolidArc}
          stroke="white"
          strokeWidth="2"
          fill="none"
        />
        {/* 3 Sayı Çizgisi */}
        <Path
          d={`
            M ${threePointLineX},${courtHeight}
            L ${threePointLineX},${bottom3PtArcY}
            A ${threePointRadius},${threePointRadius} 0 0 1 ${
            courtWidth - threePointLineX
          },${bottom3PtArcY}
            L ${courtWidth - threePointLineX},${courtHeight}
          `}
          stroke="white"
          strokeWidth="2"
          fill="none"
        />
        {/* Restricted Area (Pota Altı Yarım Daire) */}
        <Path
          d={`M ${courtWidth / 2 - restrictedRadius},${
            courtHeight - hoopCenterY
          } A ${restrictedRadius},${restrictedRadius} 0 0 0 ${
            courtWidth / 2 + restrictedRadius
          },${courtHeight - hoopCenterY}`}
          stroke="white"
          strokeWidth="2"
          fill="none"
        />
        {/* Pota Çemberi ve Pano (KALDIRILDI) */}
        {/* Lane Hash Marks (Koridor Çentikleri - Alt) */}
        {laneTicks.map((y, i) => (
          <React.Fragment key={`bottom-ticks-${i}`}>
            {/* Sol Taraf */}
            <Path
              d={`M ${keyLeftX - 3} ${courtHeight - y} H ${keyLeftX}`}
              stroke="white"
              strokeWidth="2"
            />
            {/* Sağ Taraf */}
            <Path
              d={`M ${keyRightX} ${courtHeight - y} H ${keyRightX + 3}`}
              stroke="white"
              strokeWidth="2"
            />
          </React.Fragment>
        ))}
        {/* Side Line Markers (Kenar Çizgisi İşaretleri - Görseldeki gibi) */}
        {/* Üst Köşe Yakını */}
        <Path d={`M 0 ${28} H 5`} stroke="white" strokeWidth="2" />
        <Path
          d={`M ${courtWidth - 5} ${28} H ${courtWidth}`}
          stroke="white"
          strokeWidth="2"
        />
        {/* Alt Köşe Yakını */}
        <Path
          d={`M 0 ${courtHeight - 28} H 5`}
          stroke="white"
          strokeWidth="2"
        />
        <Path
          d={`M ${courtWidth - 5} ${courtHeight - 28} H ${courtWidth}`}
          stroke="white"
          strokeWidth="2"
        />
      </G>

      {/* --- 3. TIKLANABİLİR DOLGU ALANLARI (Yeniden Sıralandı) --- */}
      {/* Not: En büyük alanlar önce çizilir, böylece küçük alanlar üstte kalır ve doğru tıklamayı alır. */}

      {/* Outer Areas (Rendered First) */}
      <Rect // Top Outer Area
        id="top-outer"
        x="0"
        y="0"
        width={courtWidth}
        height={courtHeight / 2}
        fill={fillColors["fill-top-outer"] || "transparent"}
        onPress={() => onPress("fill-top-outer")}
      />
      <Rect // Bottom Outer Area
        id="bottom-outer"
        x="0"
        y={courtHeight / 2}
        width={courtWidth}
        height={courtHeight / 2}
        fill={fillColors["fill-bottom-outer"] || "transparent"}
        onPress={() => onPress("fill-bottom-outer")}
      />

      {/* 3-Point Areas (On Top of Outer) */}
      <Path // Top 3-Point Area
        d={top3ptAreaPath}
        fill={fillColors["fill-top-3pt-area"] || "transparent"}
        onPress={() => onPress("fill-top-3pt-area")}
      />
      <Path // Bottom 3-Point Area
        d={bottom3ptAreaPath}
        fill={fillColors["fill-bottom-3pt-area"] || "transparent"}
        onPress={() => onPress("fill-bottom-3pt-area")}
      />

      {/* Key Areas (On Top of 3-Point) */}
      <Rect // Top Key
        id="top-key"
        x={keyLeftX}
        y="0"
        width={keyWidth}
        height={keyHeight}
        fill={fillColors["fill-top-key"] || "transparent"}
        onPress={() => onPress("fill-top-key")}
      />
      <Rect // Bottom Key
        id="bottom-key"
        x={keyLeftX}
        y={courtHeight - keyHeight}
        width={keyWidth}
        height={keyHeight}
        fill={fillColors["fill-bottom-key"] || "transparent"}
        onPress={() => onPress("fill-bottom-key")}
      />

      {/* Restricted Areas (On Top of Key) */}
      <Path
        id="fill-top-restricted-area"
        d={`M ${
          courtWidth / 2 - restrictedRadius
        },${hoopCenterY} A ${restrictedRadius},${restrictedRadius} 0 0 1 ${
          courtWidth / 2 + restrictedRadius
        },${hoopCenterY}`}
        fill={fillColors["fill-top-restricted-area"] || "transparent"}
        onPress={() => onPress("fill-top-restricted-area")}
      />
      <Path
        id="fill-bottom-restricted-area"
        d={`M ${courtWidth / 2 - restrictedRadius},${
          courtHeight - hoopCenterY
        } A ${restrictedRadius},${restrictedRadius} 0 0 0 ${
          courtWidth / 2 + restrictedRadius
        },${courtHeight - hoopCenterY}`}
        fill={fillColors["fill-bottom-restricted-area"] || "transparent"}
        onPress={() => onPress("fill-bottom-restricted-area")}
      />

      {/* Center Circle (Rendered Last to be on Top) */}
      <Circle
        id="center-circle"
        cx={courtWidth / 2}
        cy={courtHeight / 2}
        r={centerCircleRadius}
        fill={fillColors["fill-center-circle"] || "transparent"}
        onPress={() => onPress("fill-center-circle")}
      />
    </Svg>
  );
};

export default BasketballCourt;
