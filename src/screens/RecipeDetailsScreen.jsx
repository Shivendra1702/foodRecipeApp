import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { CachedImage } from "../helpers/image";
import { StatusBar } from "expo-status-bar";
import {
  ChevronLeftIcon,
  ArrowRightCircleIcon,
} from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Loading from "../components/Loading";
import YoutubeIframe from "react-native-youtube-iframe";

const RecipeDetailsScreen = ({ route }) => {
  const { item } = route.params;
  const [isFavourite, setIsFavourite] = useState(false);
  const navigation = useNavigation();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  const getDetails = async (strMeal) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${strMeal}`
      );
      if (response && response.data) {
        setRecipe(response.data.meals[0]);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetails(item.strMeal);
  }, []);

  const IngredientsIndexes = (meal) => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 0; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        indexes.push(i);
      }
    }
    return indexes;
  };

  const getYoutubeVideoId = (url) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };
  return (
    <ScrollView>
      <StatusBar style="light" />

      {/* recipe Image */}
      <View className="flex-row justify-center">
        <CachedImage
          uri={item.strMealThumb}
          style={{
            width: wp(98),
            height: hp(50),
            borderRadius: 40,
            borderBottomLeftRadius: 35,
            borderBottomRightRadius: 35,
            marginTop: 4,
          }}
        />
      </View>

      {/* back and fav button */}
      <View className="w-full absolute flex-row justify-between items-center pt-14 px-4">
        <TouchableOpacity
          className="bg-white rounded-full p-2"
          onPress={() => {
            navigation.goBack();
          }}
        >
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-white rounded-full p-2"
          onPress={() => {
            setIsFavourite(!isFavourite);
          }}
        >
          <HeartIcon
            size={hp(3.5)}
            strokeWidth={4.5}
            color={isFavourite ? "red" : "gray"}
          />
        </TouchableOpacity>
      </View>

      {/* recipe details */}
      {loading ? (
        <Loading size="large" className="mt-16" />
      ) : (
        <View className="px-4 pt-8 flex justify-between space-y-4">
          {/* name and area */}
          <View className="space-y-2">
            <Text
              className="text-neutral-700 font-bold"
              style={{ fontSize: hp(3) }}
            >
              {recipe?.strMeal}
            </Text>
            <Text
              className="text-neutral-500 font-bold"
              style={{ fontSize: hp(2) }}
            >
              {recipe?.strArea}
            </Text>
          </View>

          {/* ingredients */}
          <View className="space-y-4">
            <Text
              style={{ fontSize: hp(2.5) }}
              className="text-neutral-700 font-bold"
            >
              Ingredients
            </Text>
            <View className="space-y-2 ml-3">
              {IngredientsIndexes(recipe).map((i) => {
                return (
                  <View key={i} className="flex-row space-x-4 items-center">
                    <View
                      style={{ width: hp(1.5), height: hp(1.5) }}
                      className="bg-amber-300 rounded-full "
                    />
                    <Text
                      style={{ fontSize: hp(1.8) }}
                      className="text-neutral-700 font-extrabold"
                    >
                      {recipe[`strIngredient${i}`]}
                    </Text>
                    <Text
                      style={{ fontSize: hp(1.6) }}
                      className="text-neutral-600 font-medium"
                    >
                      {recipe[`strMeasure${i}`]}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* instructions */}
          <View className="space-y-4">
            <Text
              style={{ fontSize: hp(2.5) }}
              className="text-neutral-700 font-bold"
            >
              Instructions
            </Text>
            <Text className="text-neutral-700" style={{ fontSize: hp(1.7) }}>
              {recipe?.strInstructions}
            </Text>
          </View>

          {/* recipe video */}
          {recipe?.strYoutube && (
            <View className="space-y-4 mb-4">
              <Text
                style={{ fontSize: hp(2.5) }}
                className="text-neutral-700 font-bold"
              >
                Recipe Video
              </Text>
              <View>
                <YoutubeIframe
                  height={hp(30)}
                  videoId={getYoutubeVideoId(recipe?.strYoutube)}
                />
              </View>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default RecipeDetailsScreen;
