import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { ReactNode, useEffect } from "react";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  FontAwesome5,
} from "@expo/vector-icons";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type Props = {
  item: string;
  selectedMenuItem: string | null;
  setSelectedMenuItem: (item: string | null) => void;
  menuContainerScaleValue: SharedValue<number>;
};
const services = [
  {
    name: "Google Street View 360°",
    icon: <FontAwesome5 name="road" size={16} color="gray" />,
  },
  {
    name: "Google My Business",
    icon: <MaterialIcons name="storefront" size={18} color="#5771bd" />,
  },
  {
    name: "Website, Hosting & Apps",
    icon: (
      <MaterialCommunityIcons
        name="application-brackets-outline"
        size={18}
        color="#78cd7a"
      />
    ),
  },
  {
    name: "Google Ads",
    icon: (
      <MaterialCommunityIcons
        name="advertisements"
        size={19}
        color="#ffaa01ff"
      />
    ),
  },
];

const MenuItem = ({
  item,
  selectedMenuItem,
  setSelectedMenuItem,
  menuContainerScaleValue,
}: Props) => {
  // Local progress for sub-menu expansion (0 = closed, 1 = open)
  const progressValue = useSharedValue(0);

  // Expand/collapse the sub-menu items based on selection
  const servicesContainerStyle = useAnimatedStyle(() => {
    return {
      // Calculate height based on number of items + some vertical padding
      height: progressValue.value * 26 * (services.length + 2),
      padding: progressValue.value * 12,
    };
  });

  // Update the animation whenever the selection changes
  useEffect(() => {
    if (selectedMenuItem === item) {
      progressValue.value = withTiming(1, { duration: 400 });
    } else {
      progressValue.value = withTiming(0, { duration: 400 });
    }
  }, [selectedMenuItem]);

  useEffect(() => {
    return () => {
      setSelectedMenuItem(null);
      progressValue.value = withTiming(0, { duration: 400 });
    };
  }, []);

  return (
    <Pressable
      onPress={(e) => e.stopPropagation()}
      style={{ width: "100%", zIndex: 20, marginVertical: 4 }}
    >
      <Pressable
        onPressIn={() =>
          (menuContainerScaleValue.value = withTiming(0.97, { duration: 200 }))
        }
        onPressOut={() =>
          (menuContainerScaleValue.value = withSpring(1, {
            stiffness: 900,
            damping: 55,
          }))
        }
        onPress={(e) => {
          e.stopPropagation(); // Don't close the main menu when clicking an item
          if (selectedMenuItem === item) {
            setSelectedMenuItem(null); // Deselect if already active
          } else {
            setSelectedMenuItem(item); // Select this item
          }
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            fontSize: 18,
            fontFamily: "Goldman-Regular",
            paddingVertical: 4,
            flexWrap: "nowrap",
          }}
        >
          {item}
        </Text>
      </Pressable>
      <Animated.View style={[styles.servicesContainer, servicesContainerStyle]}>
        {services.map((item, index) => {
          return (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                flexWrap: "nowrap",
                height: 26,
              }}
              key={index}
            >
              {item.icon}
              <Text style={styles.itemName}>{item.name}</Text>
            </View>
          );
        })}
      </Animated.View>
    </Pressable>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  servicesContainer: {
    backgroundColor: "#f0f0f0f0",
    width: "100%",
    borderRadius: 12,
    gap: 8,
    flexShrink: 0,
    flexWrap: "nowrap",
    overflow: "hidden",
    paddingHorizontal: 16,
  },
  itemName: {
    flexWrap: "nowrap",
    fontFamily: "Goldman-Regular",
    color: "#303030ff",
    fontSize: 12,
  },
});
