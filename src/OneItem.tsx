import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import {
  MaterialCommunityIcons,
  MaterialIcons,
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
  selectedItem: string | null;
  setSelectedItem: (item: string | null) => void;
  menuScaleValue: SharedValue<number>;
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

const OneItem = ({
  item,
  selectedItem,
  setSelectedItem,
  menuScaleValue,
}: Props) => {
  useEffect(() => {
    if (item === selectedItem) {
      progressValue.value = withTiming(1, { duration: 400 });
    } else {
      progressValue.value = withTiming(0, { duration: 400 });
    }
  }, [selectedItem]);
  useEffect(() => {
    return () => {
      progressValue.value = withTiming(0, { duration: 400 });
      setSelectedItem(null);
    };
  }, []);

  const progressValue = useSharedValue(0);

  const servicesContainerStyle = useAnimatedStyle(() => {
    return {
      height: progressValue.value * 26 * (services.length + 2),
      padding: progressValue.value * 8,
    };
  });

  return (
    <View style={{ width: "100%", marginVertical: 8 }}>
      <Pressable
        onPressIn={() =>
          (menuScaleValue.value = withTiming(0.97, { duration: 200 }))
        }
        onPressOut={() =>
          (menuScaleValue.value = withSpring(1, {
            damping: 55,
            stiffness: 900,
          }))
        }
        onPress={() => {
          if (item === selectedItem) {
            setSelectedItem(null);
          } else {
            setSelectedItem(item);
          }
        }}
      >
        <Text
          numberOfLines={1}
          style={{ fontSize: 18, fontFamily: "Goldman-Regular" }}
        >
          {item}
        </Text>
      </Pressable>
      <Animated.View style={[styles.servicesConatiner, servicesContainerStyle]}>
        {services.map((service, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              height: 26,
              gap: 6,
              overflow: "hidden",
              flexWrap: "nowrap",
            }}
          >
            {service.icon}
            <Text
              numberOfLines={1}
              style={{
                fontFamily: "Goldman-Regular",
                flexWrap: "nowrap",
                fontSize: 14,
                color: "#303030ff",
                overflow: "hidden",
              }}
            >
              {service.name}
            </Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
};

export default OneItem;

const styles = StyleSheet.create({
  servicesConatiner: {
    backgroundColor: "#f0f0f0f0",
    width: "100%",
    borderRadius: 16,
    gap: 8,
    paddingHorizontal: 16,
    overflow: "hidden",
    flexShrink: 0,
    flexWrap: "nowrap",
  },
});
