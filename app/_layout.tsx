import { Stack } from "expo-router";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import { Colors, SportColors } from "@/constants/Theme";
import { SportProvider, useSport } from "@/context/SportContext";

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { selectedSport } = useSport();

  const activeColor = selectedSport
    ? SportColors[selectedSport as keyof typeof SportColors].primary
    : colorScheme === "dark"
    ? Colors.dark.background
    : Colors.light.background;

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "ActiveGround",
            headerStyle: {
              backgroundColor: activeColor,
            },
            headerTitleStyle: {
              color:
                colorScheme === "dark" ? Colors.dark.text : Colors.light.text,
            },
            headerTintColor:
              colorScheme === "dark" ? Colors.dark.text : Colors.light.text,
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}

export default function RootLayout() {
  return (
    <SportProvider>
      <RootLayoutNav />
    </SportProvider>
  );
}
