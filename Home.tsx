import React from "react";
import { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from "recyclerlistview";
import equal from "fast-deep-equal";
import { _rowRenderer } from "./RowRenderer";
import NavigationHeader from "./NavigationHeader";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { heights } from "./contants";
const dataProvider = new DataProvider((r1, r2) => {
  return equal(r1, r2);
});

const defaultLayoutProvider = new LayoutProvider(
  (index) => 0,
  (type, dim) => {
    dim.height = 0;
    dim.width = 0;
  }
);

const { width } = Dimensions.get("window");
const AnimatedRecylerListView =
  Animated.createAnimatedComponent(RecyclerListView);
const Home = () => {
  const insets = useSafeAreaInsets();
  const currentScrollYPos = useSharedValue(0);
  const [_dataProvider, setDataProvider] = useState(
    dataProvider.cloneWithRows([])
  );
  const [_layoutProvider, setLayoutProvider] = useState(defaultLayoutProvider);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      currentScrollYPos.value = e.contentOffset.y / heights.TOP_BANNER_HEIGHT;
    },
  });

  useEffect(() => {
    setDataProvider(
      _dataProvider.cloneWithRows([
        {
          type: "top_banner_slide",
          data: [
            "https://i.pinimg.com/originals/af/8d/63/af8d63a477078732b79ff9d9fc60873f.jpg",
            "https://analyticsindiamag.com/wp-content/uploads/2020/10/7d744a684fe03ebc7e8de545f97739dd.jpg",
          ],
          EXTRA_PADDING_TOP: heights.NAVIGATION_HEADER_HEIGHT + insets.top,
        },
        {
          type: "wallet_info_row",
          data: {
            walletBalance: 95.36,
            coinBalance: 50,
          },
        },
        {
          type: "main_category_slider",
          data: [
            [
              {
                icon: "https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png",
                label: "Shopee Mart",
              },
              {
                icon: "https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png",
                label: "RM15 Free Shipping",
              },
            ],
            [
              {
                icon: "https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png",
                label: "Deals Near Me",
              },
              {
                icon: "https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png",
                label: "Shopee Prizes",
              },
            ],
            [
              {
                icon: "https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png",
                label: "Shop Malaysia",
              },
              {
                icon: "https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png",
                label: "Shopee Live",
              },
            ],
            [
              {
                icon: "https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png",
                label: "10% Cashback",
              },
              {
                icon: "https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png",
                label: "RM1 Deals",
              },
            ],
            [
              {
                icon: "https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png",
                label: "Stay Home Stay Safe",
              },
              {
                icon: "https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png",
                label: "Cash On Delivery",
              },
            ],
            [
              {
                icon: "https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png",
                label: "Tickets, Top-ups & Bills",
              },
              {
                icon: "https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png",
                label: "Men's Sale",
              },
            ],
            [
              {
                icon: "https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png",
                label: "Indo Choice",
              },
              {
                icon: "https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png",
                label: "Shopee",
              },
            ],
          ],
        },
      ])
    );
  }, [insets]);

  useEffect(() => {
    if (_dataProvider.getSize() > 0) {
      setLayoutProvider(
        new LayoutProvider(
          (index) => _dataProvider.getDataForIndex(index).type,
          (type, dim) => {
            dim.width = width;
            switch (type) {
              case "top_banner_slide":
                dim.height =
                  heights.TOP_BANNER_HEIGHT +
                  heights.NAVIGATION_HEADER_HEIGHT +
                  insets.top;
                break;
              case "wallet_info_row":
                dim.height = heights.WALLET_HEIGHT + heights.WALLET_OFFSET;
                break;
              case "main_category_slider":
                dim.height = heights.MAIN_CATEGORY_HEIGHT;
                break;
              default:
                break;
            }
          }
        )
      );
    }
  }, [insets, _dataProvider]);

  _layoutProvider.shouldRefreshWithAnchoring = false;

  return (
    <View style={{ flex: 1, backgroundColor: "white", width: width }}>
      <NavigationHeader scrollPosY={currentScrollYPos} />
      <AnimatedRecylerListView
        dataProvider={_dataProvider}
        layoutProvider={_layoutProvider}
        rowRenderer={_rowRenderer}
        onScroll={scrollHandler}
        scrollViewProps={{
          style: {
            // paddingTop: 75,
          },
          showsVerticalScrollIndicator: false,
        }}
      />
    </View>
  );
};

export default Home;
