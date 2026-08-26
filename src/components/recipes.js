import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export default function Recipe({ foods }) {
  const navigation = useNavigation();

  const renderItem = ({ item, index }) => (
    <ArticleCard item={item} index={index} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <View testID="recipesDisplay">
        <FlatList
          data={foods}
          keyExtractor={(item) => item.idFood}
          renderItem={renderItem}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={styles.row}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No recipes found in this category.</Text>
          }
        />
      </View>
    </View>
  );
}

const ArticleCard = ({ item, index, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("RecipeDetail", item)}
      style={[
        styles.cardContainer,
        index % 2 === 0 ? styles.leftCard : styles.rightCard,
      ]}
      testID="articleDisplay"
    >
      <Image source={{ uri: item.recipeImage }} style={styles.articleImage} />
      <Text style={styles.articleText} numberOfLines={2}>
        {item.recipeName}
      </Text>
      <Text style={styles.articleDescription} numberOfLines={2}>
        {item.cookingDescription || item.recipeCategory}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(4), // mx-4 equivalent
    marginTop: hp(2),
  },
  title: {
    fontSize: hp(3),
    fontWeight: "600", // font-semibold
    color: "#52525B", // text-neutral-600
    marginBottom: hp(1.5),
  },
  loading: {
    marginTop: hp(20),
  },
  cardContainer: {
    justifyContent: "center",
    marginBottom: hp(1.5),
    flex: 1, // Allows cards to grow and fill space evenly
  },
  leftCard: {
    paddingRight: wp(2),
  },
  rightCard: {
    paddingLeft: wp(2),
  },
  articleImage: {
    width: "100%",
    height: hp(20),
    borderRadius: 35,
    backgroundColor: "rgba(0, 0, 0, 0.05)", // bg-black/5
  },
  articleText: {
    fontSize: hp(1.5),
    fontWeight: "600", // font-semibold
    color: "#52525B", // text-neutral-600
    marginLeft: wp(2),
    marginTop: hp(0.5),
  },
  articleDescription: {
    fontSize: hp(1.2),
    color: "#6B7280", // gray-500
    marginLeft: wp(2),
    marginTop: hp(0.5),
  },
  row: {
    justifyContent: "space-between", // Align columns evenly
  },
  emptyText: {
    color: "#6B7280",
    fontSize: hp(1.8),
    paddingVertical: hp(3),
    textAlign: "center",
  },
});
