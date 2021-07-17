import React from "react";
import {
  View,
  Dimensions,
  Text,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { heights } from "./contants";
import { brandColors } from "./colors";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);
export const _rowRenderer = (
  type: string | number,
  data: any,
  index: number,
  extendedState?: object | undefined
) => {
  switch (type) {
    case "top_banner_slide":
      return TopBanner(data);
    case "wallet_info_row":
      return WalletRow(data);
    case "main_category_slider":
      return <MainCategorySlider data={data} />;
    default:
      return (
        <View style={{ width: width, backgroundColor: "cyan" }}>
          <Text style={{ fontSize: 99 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
            repellendus dignissimos quasi eaque exercitationem similique numquam
            doloribus minima mollitia nisi, error sit porro, saepe aut obcaecati
            at atque tempora repellat. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Iusto repellendus dignissimos quasi eaque
            exercitationem similique numquam doloribus minima mollitia nisi,
            error sit porro, saepe aut obcaecati at atque tempora repellat.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
            repellendus dignissimos quasi eaque exercitationem similique numquam
            doloribus minima mollitia nisi, error sit porro, saepe aut obcaecati
            at atque tempora repellat. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Iusto repellendus dignissimos quasi eaque
            exercitationem similique numquam doloribus minima mollitia nisi,
            error sit porro, saepe aut obcaecati at atque tempora repellat.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
            repellendus dignissimos quasi eaque exercitationem similique numquam
            doloribus minima mollitia nisi, error sit porro, saepe aut obcaecati
            at atque tempora repellat. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Iusto repellendus dignissimos quasi eaque
            exercitationem similique numquam doloribus minima mollitia nisi,
            error sit porro, saepe aut obcaecati at atque tempora repellat.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
            repellendus dignissimos quasi eaque exercitationem similique numquam
            doloribus minima mollitia nisi, error sit porro, saepe aut obcaecati
            at atque tempora repellat. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Iusto repellendus dignissimos quasi eaque
            exercitationem similique numquam doloribus minima mollitia nisi,
            error sit porro, saepe aut obcaecati at atque tempora repellat.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
            repellendus dignissimos quasi eaque exercitationem similique numquam
            doloribus minima mollitia nisi, error sit porro, saepe aut obcaecati
            at atque tempora repellat. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Iusto repellendus dignissimos quasi eaque
            exercitationem similique numquam doloribus minima mollitia nisi,
            error sit porro, saepe aut obcaecati at atque tempora repellat.
          </Text>
        </View>
      );
  }
};

const TopBanner = (data) => {
  const renderTopBannerItem = ({ item }) => {
    return (
      <Pressable>
        <Image
          source={{ uri: item }}
          style={{
            width,
            height: heights.TOP_BANNER_HEIGHT + data.EXTRA_PADDING_TOP,
          }}
          width={width}
          height={heights.TOP_BANNER_HEIGHT + data.EXTRA_PADDING_TOP}
        />
      </Pressable>
    );
  };

  return (
    <View
      style={{
        height: heights.TOP_BANNER_HEIGHT + data.EXTRA_PADDING_TOP,
        width,
        backgroundColor: "pink",
      }}
    >
      <FlatList
        renderItem={renderTopBannerItem}
        data={data.data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const WalletRow = (data) => {
  return (
    <View style={{ height: heights.WALLET_HEIGHT }}>
      <View
        style={{
          marginHorizontal: 10,
          flexDirection: "row",
          elevation: 4,
          borderRadius: 4,
          backgroundColor: "white",
          top: heights.WALLET_OFFSET,
          padding: 10,
          alignItems: "center",
        }}
      >
        <Ionicons name="ios-scan-outline" size={30} />
        <View
          style={{
            width: 2,
            height: 30,
            backgroundColor: "#E5E7EB",
            marginHorizontal: 10,
          }}
        />
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="wallet-outline"
              color={brandColors.main}
              size={18}
            />
            <Text style={{ marginLeft: 4, fontWeight: "bold" }}>
              RM{data.data.walletBalance}
            </Text>
          </View>
          <Text numberOfLines={2} style={{ fontSize: 10, color: "#9CA3AF" }}>
            Top up with Standard Chartered Mastercard & get your benefits Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Illum ex libero
            amet, architecto, cum, ratione officiis veritatis corrupti tempore
            maiores sequi tempora nostrum. Ex aperiam sint vitae dolores quasi
            doloremque!
          </Text>
        </View>
        <View
          style={{
            width: 2,
            height: 30,
            backgroundColor: "#E5E7EB",
            marginHorizontal: 10,
          }}
        />
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="logo-bitcoin" color={brandColors.main} size={18} />
            <Text style={{ marginLeft: 4, fontWeight: "bold" }}>
              {data.data.coinBalance} Coins
            </Text>
          </View>
          <Text numberOfLines={2} style={{ fontSize: 10, color: "#9CA3AF" }}>
            FREE coins daily! Check in now!
          </Text>
        </View>
      </View>
    </View>
  );
};

const MainCategorySlider = ({ data }) => {
  const INDICATOR_HEIGHT = heights.MAIN_CATEGORY_INDICATOR_HEIGHT;
  const SINGLE_SIZE = (heights.MAIN_CATEGORY_HEIGHT - INDICATOR_HEIGHT) / 2;
  const ICON_SIZE = SINGLE_SIZE * 0.5;
  const scrollPosX = useSharedValue(0);
  const TOTAL_WIDTH = data.data.length * SINGLE_SIZE;
  const WINDOW_WIDTH = width;
  const INDICATOR_WIDTH = 30;
  const RATIO = WINDOW_WIDTH / TOTAL_WIDTH;
  const TRANSFORMED_CURRENT_WIDTH = INDICATOR_WIDTH * RATIO;
  const renderMainCategoryItem = ({ item }) => {
    const items = item.map((v) => {
      return (
        <Pressable
          style={{
            height: SINGLE_SIZE,
            width: SINGLE_SIZE,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                borderRadius: 14,
                borderWidth: 1,
                borderColor: "gray",
                width: ICON_SIZE,
                height: ICON_SIZE,
              }}
            >
              <Image
                source={{ uri: v.icon }}
                style={{
                  width: ICON_SIZE,
                  height: ICON_SIZE,
                }}
                resizeMode="contain"
                width={ICON_SIZE}
                height={ICON_SIZE}
              />
            </View>
            <Text
              style={{
                fontSize: 12,
                textAlign: "center",
                paddingHorizontal: 4,
                marginTop: 2,
              }}
              numberOfLines={2}
            >
              {v.label}
            </Text>
          </View>
        </Pressable>
      );
    });

    return <View>{items}</View>;
  };

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollPosX.value = event.contentOffset.x;
  });

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: scrollPosX.value / INDICATOR_WIDTH / RATIO }],
      width: TRANSFORMED_CURRENT_WIDTH,
      height: INDICATOR_HEIGHT,
      backgroundColor: "red",
      borderRadius: 10,
    };
  });

  return (
    <View
      style={{
        height: heights.MAIN_CATEGORY_HEIGHT,
        width,
      }}
    >
      <AnimatedFlatlist
        renderItem={renderMainCategoryItem}
        data={data.data}
        horizontal
        onScroll={scrollHandler}
        showsHorizontalScrollIndicator={false}
      />
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            width: INDICATOR_WIDTH,
            height: INDICATOR_HEIGHT,
            backgroundColor: "#D1D5DB",
            borderRadius: 10,
          }}
        >
          <Animated.View style={indicatorStyle} />
        </View>
      </View>
    </View>
  );
};
