import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import {
  BellIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import Category from "../components/Category";
import axios from "axios";
import Recipes from "../components/Recipes";
import Loading from "../components/Loading";

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://themealdb.com/api/json/v1/1/categories.php"
      );
      if (response && response.data && response.data.categories) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRecipes = async (category = "Beef") => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      if (response && response.data && response.data.meals) {
        setRecipes(response.data.meals);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" backgroundColor="white" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="pt-14 space-y-6"
      >
        {/* nav */}
        <View className="mx-4 flex-row items-center justify-between mb-2  ">
          <Image
            style={{ height: hp(5), width: hp(5) }}
            className="rounded-full "
            src="https://png.pngtree.com/element_our/20190529/ourmid/pngtree-black-round-pattern-user-cartoon-avatar-image_1200114.jpg"
          />
          <BellIcon size={hp(4)} color="gray" />
        </View>

        {/* greetings */}
        <View className="mx-4 space-y-2 mb-2 ">
          <Text style={{ fontSize: hp(2) }} className="text-neutral-600">
            Hello Bitch,
          </Text>
          <Text
            style={{ fontSize: hp(4) }}
            className="text-neutral-600 font-semibold"
          >
            Make Your Own Food,
          </Text>
          <Text
            style={{ fontSize: hp(4) }}
            className="text-neutral-600 font-semibold"
          >
            Stay At <Text className="text-amber-400">Home</Text>.
          </Text>
        </View>

        {/* search bar */}
        <View className="mx-4 mb-2 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="Search Any Recipe ..."
            placeholderTextColor={"gray"}
            style={{ fontSize: hp(2) }}
            className="flex-1 mb-1 text-base pl-3 tracking-wider"
          />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon size={hp(3)} color={"gray"} strokeWidth={3} />
          </View>
        </View>

        {/* categories */}
        <View className="mb-2">
          {categories.length > 0 && (
            <Category
              categoryData={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              getRecipes={getRecipes}
            />
          )}
        </View>

        {/* recipes */}
        <View>
          {categories.length == 0 || recipes.length == 0 ? (
            <Loading size={"large"} className="mb-10" />
          ) : (
            <Recipes recipes={recipes} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
