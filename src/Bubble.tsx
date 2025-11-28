import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BALL_SIZE } from "./helper";
import { useSharedValue } from "react-native-reanimated";

type Props = {
  icon: React.ReactNode;
  color: string;
};

const Bubble = ({ icon, color }: Props) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  


  return (
    <View
      style={{
        height: BALL_SIZE,
        width: BALL_SIZE,
        borderRadius: BALL_SIZE / 2,
        borderWidth: 1.5,
        borderColor: color,
        padding: 3,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          backgroundColor: color,
          borderRadius: BALL_SIZE / 2,
        }}
      >
        {icon}
      </View>
    </View>
  );
};

export default Bubble;

const styles = StyleSheet.create({});
