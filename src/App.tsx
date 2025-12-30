import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MainScreen from "./MainScreen";
import { X } from "lucide-react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useState } from "react";
import { scheduleOnRN } from "react-native-worklets";

import OneItem from "./OneItem";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const menuItems = ["Home", "Services", "References", "Team & Career"];

export default function App() {
  const [loaded] = useFonts({
    "Goldman-Bold": require("../assets/fonts/Goldman-Bold.ttf"),
    "Goldman-Regular": require("../assets/fonts/Goldman-Regular.ttf"),
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<null | string>(null);

  const closeMenuHandler = () => {
    progressValue.value = withTiming(0, { duration: 400 }, (isFinished) => {
      if (isFinished) {
        scheduleOnRN(setIsMenuOpen, false);
      }
    });
  };

  const menuButtonScale = useSharedValue(1);
  const progressValue = useSharedValue(0);
  const menuHeight = useSharedValue(0);
  const menuScaleValue = useSharedValue(1);

  const buttonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: menuButtonScale.value }],
    };
  });

  const bgScreenStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progressValue.value,
        [0, 1],
        ["#00000000", "#00000026"]
      ),
    };
  });

  const menuContainerStyles = useAnimatedStyle(() => {
    return {
      opacity: progressValue.value,
      width: `${interpolate(progressValue.value, [0, 1], [0, 90])}%`,
      transform: [
        { translateY: -progressValue.value * 100 },
        { scale: menuScaleValue.value },
      ],
      height: interpolate(progressValue.value, [0, 1], [0, menuHeight.value]),
    };
  });

  if (!loaded) return null;
  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <MainScreen />
      {isMenuOpen && (
        <AnimatedPressable
          onPress={() => closeMenuHandler()}
          style={[styles.bgScreen, bgScreenStyle]}
        >
          <Animated.View style={[styles.menuWrapper, menuContainerStyles]}>
            <Animated.View
              onLayout={(e) => {
                menuHeight.value = e.nativeEvent.layout.height;
              }}
              style={styles.menuContainer}
            >
              {menuItems.map((item) => (
                <OneItem
                  key={item}
                  item={item}
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                  menuScaleValue={menuScaleValue}
                />
              ))}
            </Animated.View>
          </Animated.View>
        </AnimatedPressable>
      )}

      <AnimatedPressable
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
        onPressIn={() => {
          (menuButtonScale.value = withTiming(0.9)), { duration: 200 };
        }}
        onPressOut={() => {
          menuButtonScale.value = withSpring(1, {
            stiffness: 1000,
            damping: 55,
          });
        }}
        style={[styles.menuButton, buttonStyle]}
      >
        <View style={styles.menuButtonIconContainer}>
          <X color={"white"} />
        </View>
        <Text
          style={{ color: "black", fontFamily: "Goldman-Bold", fontSize: 18 }}
        >
          Menu
        </Text>
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
  menuButton: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#eeeeee9b",
    padding: 4,
    paddingRight: 16,
    borderRadius: 30,
  },
  menuButtonIconContainer: {
    backgroundColor: "#2c2b2bff",
    padding: 10,
    borderRadius: 30,
  },
  bgScreen: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  menuWrapper: {
    width: "80%",
    position: "absolute",
    bottom: 30,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    overflow: "hidden",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuContainer: {
    width: "100%",
    flexShrink: 0,
    position: "absolute",
    paddingVertical: 20,
  },
});
