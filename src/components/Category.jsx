import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
// import { categoryData } from "../constants/index";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

const Category = ({ categoryData, activeCategory, setActiveCategory }) => {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        className="space-x-4"
      >
        {categoryData.map((category, index) => {
          let isActive = activeCategory === category?.strCategory;

          return (
            <TouchableOpacity
              key={index}
              className="flex items-center space-y-1"
              onPress={() => {
                setActiveCategory(category?.strCategory);
              }}
            >
              <View
                className={
                  "rounded-full p-[6px] " +
                  `${isActive ? "bg-amber-400" : "bg-black/10"}`
                }
              >
                <Image
                  source={{
                    uri: category.strCategoryThumb,
                  }}
                  style={{ width: hp(6), height: hp(6) }}
                  className="rounded-full"
                />
              </View>
              <Text className="text-neutral-600" style={{ fontSize: hp(1.8) }}>
                {category?.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

export default Category;
