import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { X } from "lucide-react-native";
import { useState } from "react";
import MainContent from "./MainContent";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import MenuItem from "./MenuItem";
import { scheduleOnRN } from "react-native-worklets";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const menuItems = ["Home", "Services", "References", "Team & Career"];

export default function App() {
  const [loaded] = useFonts({
    "Goldman-Bold": require("../assets/fonts/Goldman-Bold.ttf"),
    "Goldman-Regular": require("../assets/fonts/Goldman-Regular.ttf"),
  });

  // State for visibility and selection
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | null>(null);

  // Animation values: progress (0-1), layout measurement, and press effects
  const progressValue = useSharedValue(0);
  const menuButtonScale = useSharedValue(1);
  const contentHeight = useSharedValue(0); // Dynamically measured via onLayout
  const menuContainerScaleValue = useSharedValue(1);

  const opacityBgStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progressValue.value,
        [0, 1],
        ["#00000000", "#00000026"]
      ),
    };
  });

  const menuButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: menuButtonScale.value }],
    };
  });

  // Handles the closing animation and state cleanup
  const closeMenuHandler = () => {
    progressValue.value = withTiming(0, { duration: 400 }, (isFinished) => {
      if (isFinished) {
        // Toggle React state back to false on the JS thread after animation ends
        scheduleOnRN(setIsMenuOpen, false);
      }
    });
  };

  // Main menu "bubble" animation styles
  const menuContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: progressValue.value,
      transform: [
        { translateY: -progressValue.value * 70 }, // Fly up effect
        { scale: menuContainerScaleValue.value }, // Shrink effect on item press
      ],
      // Morph from tiny point to 90% width
      width: `${interpolate(progressValue.value, [0, 1], [0, 90])}%`,
      // Dynamic height based on measured content
      height: interpolate(
        progressValue.value,
        [0, 1],
        [0, contentHeight.value]
      ),
    };
  });

  if (!loaded) return null;

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <MainContent />
      {isMenuOpen && (
        <AnimatedPressable
          onPress={(e) => {
            closeMenuHandler();
          }}
          style={[styles.opacityBg, opacityBgStyles]}
        >
          <Animated.View style={[styles.menuWrapper, menuContainerStyle]}>
            <Animated.View
              style={styles.menuContainer}
              onLayout={(e) => {
                // Capture the actual height of the menu items for the animation
                contentHeight.value = e.nativeEvent.layout.height;
              }}
            >
              {menuItems.map((item, index) => (
                <MenuItem
                  key={index}
                  item={item}
                  selectedMenuItem={selectedMenuItem}
                  setSelectedMenuItem={setSelectedMenuItem}
                  menuContainerScaleValue={menuContainerScaleValue}
                />
              ))}
            </Animated.View>
          </Animated.View>
        </AnimatedPressable>
      )}
      <AnimatedPressable
        onPressIn={() =>
          (menuButtonScale.value = withTiming(0.9, { duration: 200 }))
        }
        onPressOut={() =>
          (menuButtonScale.value = withSpring(1, {
            stiffness: 900,
            damping: 50,
          }))
        }
        onPress={() => {
          if (!isMenuOpen) {
            setIsMenuOpen(true);
          }

          if (progressValue.value === 0) {
            progressValue.value = withTiming(1, { duration: 400 });
          } else {
            closeMenuHandler();
          }
        }}
        style={[styles.menuButtonCont, menuButtonStyle]}
      >
        <View
          style={{
            padding: 10,
            backgroundColor: "#2c2b2bff",
            borderRadius: 30,
          }}
        >
          <X color={"white"} />
        </View>

        <Text style={{ fontSize: 18, fontFamily: "Goldman-Bold" }}>Menu</Text>
      </AnimatedPressable>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  menuButtonCont: {
    position: "absolute",
    bottom: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingRight: 14,
    padding: 4,
    backgroundColor: "#eeeeee9b",
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: "#eeeeee",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  opacityBg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#00000026",
    height: "100%",
    width: "100%",
  },
  menuWrapper: {
    width: "80%",
    position: "absolute",
    bottom: 30,
    backgroundColor: "white",
    alignSelf: "center",
    borderRadius: 16,
    gap: 14,
    overflow: "hidden",
    justifyContent: "center",
  },

  menuContainer: {
    position: "absolute",
    opacity: 1,
    width: "100%",
    gap: 0,
    padding: 20,
  },
});
