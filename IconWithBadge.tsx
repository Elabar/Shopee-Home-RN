import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { brandColors } from "./colors";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);
const IconWithBadge = ({
  iconName = "cart-outline",
  badgeLabel = "1",
  scrollPosY,
}: {
  iconName: any;
  badgeLabel: string;
  scrollPosY: Animated.SharedValue<number>;
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        scrollPosY.value,
        [0, 1],
        ["rgba(255,255,255,1)", "rgba(0,0,0,1)"]
      ),
    };
  });

  return (
    <View>
      <View
        style={{
          position: "absolute",
          right: -5,
          top: -5,
          backgroundColor: brandColors.main,
          borderRadius: 999,
          width: 16,
          height: 16,
          zIndex: 9999,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            textAlignVertical: "center",
            fontSize: 12,
            color: "white",
          }}
        >
          {badgeLabel}
        </Text>
      </View>
      <AnimatedIcon name={iconName} size={20} style={animatedStyle} />
    </View>
  );
};

export default IconWithBadge;
