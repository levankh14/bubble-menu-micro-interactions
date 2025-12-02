import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { BALL_SIZE } from "./helper";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

type Props = {
  icon: React.ReactNode;
  color: string;
};

const Bubble = ({ icon, color }: Props) => {
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);

  const getRandomValue = () => (Math.random() - 0.5) * 10;
  const getRandomDuration = () => 1000 + Math.random() * 800;

  const floatAnimation = () => {
    const newX = getRandomValue();
    const newY = getRandomValue();

    const durationX = getRandomDuration();
    const durationY = getRandomDuration();

    translateX.value = withTiming(
      newX,
      {
        duration: durationX,
        easing: Easing.inOut(Easing.ease),
      },
      (isFinished) => {
        if (isFinished) {
          scheduleOnRN(floatAnimation);
        }
      }
    );

    translateY.value = withTiming(newY, {
      duration: durationY,
      easing: Easing.inOut(Easing.ease),
    });
  };

  useEffect(() => {
    floatAnimation();
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
        { translateX: translateX.value },
      ],
    };
  });

  const gesture = Gesture.Pan()
    .onChange((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
    })
    .onEnd(() => {
      translateX.value = withSpring(0, { damping: 60, stiffness: 700 });
      translateY.value = withSpring(
        0,
        { damping: 60, stiffness: 700 },
        (isFinished) => {
          if (isFinished) {
            scheduleOnRN(floatAnimation);
          }
        }
      );
    });

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            {
              width: BALL_SIZE,
              height: BALL_SIZE,
              borderRadius: BALL_SIZE / 2,
              borderWidth: 1.5,
              borderColor: color,
              padding: 3,
            },
            animatedStyle,
          ]}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              borderRadius: BALL_SIZE / 2,
              backgroundColor: color,
            }}
          >
            {icon}
          </View>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default Bubble;

const styles = StyleSheet.create({});
