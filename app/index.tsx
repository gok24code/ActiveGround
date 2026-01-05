import CourtPreview from "@/components/CourtPreview";
import DrawingCanvas from "@/components/DrawingCanvas";
import { Colors, SportColors } from "@/constants/Theme";
import { useSport } from "@/context/SportContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function Index() {
  const { selectedSport, setSelectedSport } = useSport();
  const [isCustomMode, setCustomMode] = useState(false);

  // States for Drawing and Fill modes
  const [isDrawingMode, setDrawingMode] = useState(false);
  const [isFillMode, setFillMode] = useState(false);
  const [selectedColor, setSelectedColor] = useState("red");
  const [fillColors, setFillColors] = useState<{
    [sport: string]: { [area: string]: string };
  }>({});

  const colorScheme = useColorScheme();
  const drawingCanvasRef = useRef<any>(null);
  const clearButtonAnim = useRef(new Animated.Value(0)).current;
  const paletteAnim = useRef(new Animated.Value(0)).current;

  const colors = ["red", "blue", "green", "yellow", "white"]; // Drawing colors
  const fillColorsPalette = [
    "#FF000055",
    "#0000FF55",
    "#00FF0055",
    "#FFFF0055",
    "#ffffff75",
  ]; // Fill colors

  useEffect(() => {
    Animated.timing(clearButtonAnim, {
      toValue: isFillMode ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isFillMode]);

  useEffect(() => {
    Animated.timing(paletteAnim, {
      toValue: isDrawingMode || isFillMode ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isDrawingMode, isFillMode]);

  const handleSportSelection = (sport: string) => {
    setSelectedSport(sport);
    setCustomMode(false);
    setDrawingMode(false);
    setFillMode(false);
  };

  const handleCustomMode = () => {
    setSelectedSport(null);
    setCustomMode(true);
    setDrawingMode(true);
    setFillMode(false);
  };

  const handleClearCanvas = () => {
    if (drawingCanvasRef.current) {
      drawingCanvasRef.current.clearCanvas();
    }
  };

  const handleClearFill = () => {
    if (selectedSport) {
      setFillColors((prev) => ({
        ...prev,
        [selectedSport]: {},
      }));
    }
  };

  const handleToggleDrawingMode = () => {
    if (isDrawingMode) {
      if (drawingCanvasRef.current) {
        drawingCanvasRef.current.clearCanvas();
      }
    }
    setDrawingMode(!isDrawingMode);
    if (isFillMode) setFillMode(false);
  };

  const handleToggleFillMode = () => {
    setFillMode(!isFillMode);
    if (isDrawingMode) setDrawingMode(false);
  };

  const handleFill = (areaId: string) => {
    if (isFillMode && selectedSport) {
      setFillColors((prev) => ({
        ...prev,
        [selectedSport]: {
          ...(prev[selectedSport] || {}),
          [areaId]: selectedColor,
        },
      }));
    }
  };

  const getButtonStyle = (sport: string) => {
    if (selectedSport === sport) {
      return {
        ...styles.button,
        backgroundColor: SportColors[sport as keyof typeof SportColors].primary,
        borderColor: SportColors[sport as keyof typeof SportColors].secondary,
      };
    }
    return styles.button;
  };

  const getButtonTextStyle = (sport: string) => {
    if (selectedSport === sport) {
      return {
        ...styles.buttonText,
        color:
          colorScheme === "dark"
            ? Colors.dark.background
            : Colors.light.background,
      };
    }
    return styles.buttonText;
  };

  const activeColor =
    selectedSport && !isCustomMode
      ? SportColors[selectedSport as keyof typeof SportColors].primary
      : colorScheme === "dark"
      ? Colors.dark.icon
      : Colors.light.icon;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        colorScheme === "dark"
          ? Colors.dark.background
          : Colors.light.background,
    },
    sportButtonContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
      paddingHorizontal: 20,
      marginVertical: 20,
    },
    button: {
      backgroundColor: colorScheme === "dark" ? "#333" : "#ddd",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      flex: 1,
      marginHorizontal: 5,
      borderColor: "transparent",
      borderWidth: 2,
    },
    buttonText: {
      color: colorScheme === "dark" ? Colors.dark.text : Colors.light.text,
      fontSize: 14,
      fontWeight: "bold",
    },
    customButton: {
      backgroundColor: colorScheme === "dark" ? "#111" : "#eee",
      padding: 20,
      alignItems: "center",
      width: "100%",
    },
    customButtonText: {
      color: colorScheme === "dark" ? Colors.dark.text : Colors.light.text,
      fontSize: 18,
      fontWeight: "bold",
    },
    canvasContainer: {
      flex: 1,
      borderWidth: 2,
      borderRadius: 10,
      margin: 20,
      borderColor: activeColor,
      backgroundColor:
        colorScheme === "dark"
          ? Colors.dark.background
          : Colors.light.background,
      alignSelf: "center",
      aspectRatio: 150 / 280,
    },
    bottomControlsContainer: {
      paddingHorizontal: 20,
      paddingBottom: 10,
    },
    modeButtonsContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 15,
    },
    modeButton: {
      padding: 10,
      borderRadius: 50,
      backgroundColor:
        colorScheme === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
      marginHorizontal: 10,
    },
    colorPalette: {
      position: "absolute",
      bottom: 150, // Position above the bottom buttons
      left: 20,
      right: 20,
      flexDirection: "row",
      justifyContent: "space-evenly",
      padding: 10,
      backgroundColor:
        colorScheme === "dark" ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.7)",
      borderRadius: 20,
    },
    colorOption: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    selectedColor: {
      borderWidth: 2,
      borderColor:
        colorScheme === "dark" ? Colors.dark.text : Colors.light.text,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sportButtonContainer}>
        <TouchableOpacity
          style={getButtonStyle("Basketball")}
          onPress={() => handleSportSelection("Basketball")}
        >
          <Text style={getButtonTextStyle("Basketball")}>Basketball</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={getButtonStyle("Volleyball")}
          onPress={() => handleSportSelection("Volleyball")}
        >
          <Text style={getButtonTextStyle("Volleyball")}>Volleyball</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={getButtonStyle("Handball")}
          onPress={() => handleSportSelection("Handball")}
        >
          <Text style={getButtonTextStyle("Handball")}>Handball</Text>
        </TouchableOpacity>
      </View>

      {isCustomMode ? (
        <DrawingCanvas
          ref={drawingCanvasRef}
          style={styles.canvasContainer}
          color={selectedColor}
        />
      ) : (
        <CourtPreview
          sport={selectedSport}
          style={styles.canvasContainer}
          isDrawingMode={isDrawingMode}
          isFillMode={isFillMode}
          selectedColor={selectedColor}
          fillColors={fillColors}
          handleFill={handleFill}
          setSelectedColor={setSelectedColor}
          colors={colors}
          fillColorsPalette={fillColorsPalette}
          drawingCanvasRef={drawingCanvasRef}
        />
      )}

      {/* --- RENDER BOTTOM CONTROLS --- */}

      {/* Sport Mode Controls */}
      {!isCustomMode && selectedSport && (
        <View style={styles.bottomControlsContainer}>
          <View style={styles.modeButtonsContainer}>
            <TouchableOpacity
              style={[
                styles.modeButton,
                isDrawingMode ? { backgroundColor: "blue" } : {},
              ]}
              onPress={handleToggleDrawingMode}
            >
              <Ionicons
                name={isDrawingMode ? "trash" : "pencil"}
                size={24}
                color={
                  colorScheme === "dark" ? Colors.dark.text : Colors.light.text
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.modeButton,
                isFillMode ? { backgroundColor: "blue" } : {},
              ]}
              onPress={handleToggleFillMode}
            >
              <Ionicons
                name={"color-palette"}
                size={24}
                color={
                  colorScheme === "dark" ? Colors.dark.text : Colors.light.text
                }
              />
            </TouchableOpacity>
            <Animated.View
              style={{
                transform: [
                  {
                    scale: clearButtonAnim,
                  },
                ],
                opacity: clearButtonAnim,
              }}
            >
              <TouchableOpacity
                style={styles.modeButton}
                onPress={handleClearFill}
              >
                <Ionicons
                  name={"trash-bin-outline"}
                  size={24}
                  color={
                    colorScheme === "dark"
                      ? Colors.dark.text
                      : Colors.light.text
                  }
                />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      )}

      {/* Custom Mode Controls */}
      {isCustomMode && (
        <View style={styles.bottomControlsContainer}>
          <TouchableOpacity
            style={styles.customButton}
            onPress={handleClearCanvas}
          >
            <Text style={styles.customButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>
      )}

      <Animated.View
        style={[
          styles.colorPalette,
          {
            opacity: paletteAnim,
            transform: [
              {
                translateY: paletteAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [100, 0],
                }),
              },
            ],
          },
        ]}
      >
        {(isDrawingMode || isCustomMode) &&
          colors.map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorOption,
                { backgroundColor: color },
                selectedColor === color && styles.selectedColor,
              ]}
              onPress={() => setSelectedColor(color)}
            />
          ))}
        {isFillMode &&
          !isCustomMode &&
          fillColorsPalette.map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorOption,
                { backgroundColor: color },
                selectedColor === color && styles.selectedColor,
              ]}
              onPress={() => setSelectedColor(color)}
            />
          ))}
      </Animated.View>

      {!isCustomMode && (
        <TouchableOpacity
          style={styles.customButton}
          onPress={handleCustomMode}
        >
          <Text style={styles.customButtonText}>Custom Mode</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
