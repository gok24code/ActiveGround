import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { Colors } from "@/constants/Theme";
import DrawingCanvas from "@/components/DrawingCanvas";
import { Ionicons } from "@expo/vector-icons";
import BasketballCourt from "./vector-courts/BasketballCourt";
import VolleyballCourt from "./vector-courts/VolleyballCourt";
import HandballCourt from "./vector-courts/HandballCourt";

type CourtPreviewProps = {
  sport: string | null;
  style?: any;
  isDrawingMode: boolean;
  isFillMode: boolean;
  selectedColor: string;
  fillColors: { [sport: string]: { [area: string]: string } };
  handleFill: (areaId: string) => void;
  drawingCanvasRef: React.RefObject<any>;
};

const CourtPreview = ({
  sport,
  style,
  isDrawingMode,
  isFillMode,
  selectedColor,
  fillColors,
  handleFill,
  drawingCanvasRef,
}: CourtPreviewProps) => {
  const colorScheme = useColorScheme();

  const courtComponents: { [key: string]: React.ElementType } = {
    Basketball: BasketballCourt,
    Volleyball: VolleyballCourt,
    Handball: HandballCourt,
  };

  const renderContent = () => {
    if (!sport) {
      return <Text style={styles.placeholderText}>Select a sport</Text>;
    }

    const CourtComponent = courtComponents[sport];

    if (CourtComponent) {
      return (
        <CourtComponent
          onPress={handleFill}
          fillColors={fillColors[sport] || {}}
          width="100%"
          height="100%"
        />
      );
    }

    return <Text style={styles.placeholderText}>Preview for {sport}</Text>;
  };

  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
    },
    placeholderText: {
      color: colorScheme === "dark" ? Colors.dark.text : Colors.light.text,
      fontSize: 18,
    },
    colorPalette: {
      position: "absolute",
      bottom: 10,
      left: 0,
      right: 0,
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10,
      backgroundColor: colorScheme === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)',
      borderRadius: 20,
    },
    colorOption: {
      width: 30,
      height: 30,
      borderRadius: 15,
    },
    selectedColor: {
      borderWidth: 2,
      borderColor:
        colorScheme === "dark" ? Colors.dark.text : Colors.light.text,
    },
  });

  return (
    <View style={[style, styles.container]}>
      {renderContent()}
      {isDrawingMode && (
        <DrawingCanvas
          ref={drawingCanvasRef}
          style={StyleSheet.absoluteFill}
          color={selectedColor}
        />
      )}
    </View>
  );
};

export default CourtPreview;
