import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { BOTTOM_HALF_HEIGHT, BUBBLES_DATA } from "./helper";
import Bubble from "./Bubble";

type Props = {};

const MainScreen = (props: Props) => {
  return (
    <View style={styles.bgContainer}>
      <Image source={require("../assets/bg.png")} style={styles.bgImage} />
      <BlurView intensity={30} style={styles.blurViewContainer}>
        <Text style={styles.mainContentTitle}>Title</Text>
        <Text style={styles.mainContentText}>
          This is the{" "}
          <Text style={{ fontSize: 30, color: "#f56c0aff" }}>main</Text> content
          of the{" "}
          <Text style={{ fontSize: 30, color: "#0a75f0ff" }}>screen</Text>. The
          animated{" "}
          <Text style={{ fontSize: 30, color: "#e339f6ff" }}>bubbles</Text> are
          part of the menu{" "}
          <Text style={{ fontSize: 30, color: "#6d10efff" }}>background</Text>
        </Text>
      </BlurView>
      <View
        style={{
          height: BOTTOM_HALF_HEIGHT,
          flexDirection: "row",
          width: "100%",
        }}
      >
        {/* Bubbles will be rendered here */}
        {BUBBLES_DATA.map((bubble, index) => (
          <View key={index} style={[{ position: "absolute" }, bubble.position]}>
            <Bubble color={bubble.color} icon={bubble.icon} />
          </View>
        ))}
      </View>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  bgContainer: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
  },
  bgImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
    width: "100%",
    objectFit: "cover",
  },
  blurViewContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    top: 0,
    left: 0,
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "rgba(34, 32, 32, 0.2)",
    paddingHorizontal: 50,
    paddingBottom: 120,
  },
  mainContentTitle: {
    fontSize: 34,
    fontFamily: "Goldman-Bold",
    color: "#0936e9ff",
  },
  mainContentText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Goldman-Bold",
    color: "#080808ff",
    shadowColor: "#f8f8f8ff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
  },
});
