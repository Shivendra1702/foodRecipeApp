import { Text, View, Pressable, Image } from "react-native";
import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";
// import { mealData } from "../constants";
import Animated, { FadeInDown } from "react-native-reanimated";
import Loading from "./Loading";
import { CachedImage } from "../helpers/image";
import { useNavigation } from "@react-navigation/native";

export default function Recipes({ recipes }) {
  const navigation = useNavigation();
  return (
    <View className="mx-4 space-y-3">
      <Text
        style={{ fontSize: hp(3) }}
        className="text-neutral-600 font-semibold"
      >
        Recipes
      </Text>
      <View>
        <MasonryList
          data={recipes}
          keyExtractor={(item) => item.idMeal}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, i }) => (
            <CardItem item={item} index={i} navigation={navigation} />
          )}
          onEndReachedThreshold={0.1}
        />
      </View>
    </View>
  );
}

const CardItem = ({ item, index, navigation }) => {
  let isEven = index % 2 == 0;
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(15)}
    >
      <Pressable
        style={{
          width: "100%",
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
        className="flex justify-center mb-4 space-y-1"
        onPress={() => {
          navigation.navigate("RecipeDetail", { item });
        }}
      >
        <CachedImage
          uri={item?.strMealThumb}
          style={{ width: "100%", height: index % 3 == 0 ? hp(25) : hp(35) }}
          className="bg-black/5 rounded-xl"
        />
        <Text
          style={{ fontSize: hp(1.8) }}
          className="text-neutral-600 font-semibold ml-2"
        >
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + "..."
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
