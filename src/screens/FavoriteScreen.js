import React from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function FavoriteScreen() {
  const navigation = useNavigation();
  const favoriteRecipesList = useSelector(
    (state) => state.favorites.favoriterecipes
  ) || [];

  const renderFavoriteRecipe = ({ item }) => {
    const title = item.recipeName || item.title || "Untitled Recipe";
    const image = item.recipeImage || item.image;
    const subtitle = [item.recipeCategory || item.category, item.recipeOrigin]
      .filter(Boolean)
      .join(" | ");

    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => navigation.navigate("RecipeDetail", item)}
        activeOpacity={0.85}
      >
        {image ? (
          <Image source={{ uri: image }} style={styles.recipeImage} />
        ) : (
          <View style={[styles.recipeImage, styles.imagePlaceholder]}>
            <Ionicons name="restaurant-outline" size={hp(3)} color="#9CA3AF" />
          </View>
        )}

        <View style={styles.cardContent}>
          <Text style={styles.recipeTitle} numberOfLines={2}>
            {title}
          </Text>
          {!!subtitle && (
            <Text style={styles.recipeSubtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>

        <Ionicons name="chevron-forward" size={hp(2.4)} color="#9CA3AF" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.85}
        >
          <Ionicons name="arrow-back" size={hp(2.3)} color="#222222" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Favorite Recipes</Text>
      </View>

      <FlatList
        data={favoriteRecipesList}
        contentContainerStyle={[
          styles.listContentContainer,
          favoriteRecipesList.length === 0 && styles.emptyListContent,
        ]}
        keyExtractor={(item, index) =>
          item.idFood ||
          item.idCategory ||
          item.recipeId ||
          item.title ||
          `${index}`
        }
        renderItem={renderFavoriteRecipe}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-outline" size={hp(6)} color="#D1D5DB" />
            <Text style={styles.emptyText}>No favorite recipes yet!</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingHorizontal: wp(5),
    paddingTop: hp(5),
    paddingBottom: hp(1.5),
  },
  backButton: {
    alignSelf: "flex-start",
    minHeight: hp(5),
    paddingHorizontal: wp(3),
    borderRadius: 999,
    backgroundColor: "#F3F4F6",
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonText: {
    marginLeft: wp(0.8),
    color: "#222222",
    fontSize: hp(1.9),
    fontWeight: "700",
  },
  headerTitle: {
    marginTop: hp(2.4),
    color: "#2F2F2F",
    fontSize: hp(3.2),
    fontWeight: "800",
  },
  listContentContainer: {
    paddingHorizontal: wp(5),
    paddingBottom: hp(4),
  },
  emptyListContent: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    marginTop: hp(1),
    fontSize: hp(2.1),
    color: "#6B7280",
    fontWeight: "600",
  },
  cardContainer: {
    backgroundColor: "#FFFFFF",
    marginBottom: hp(1.8),
    padding: wp(3),
    borderRadius: 12,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  recipeImage: {
    width: wp(22),
    height: wp(22),
    borderRadius: 10,
    marginRight: wp(3.5),
    backgroundColor: "#F3F4F6",
  },
  imagePlaceholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  cardContent: {
    flex: 1,
    marginRight: wp(2),
  },
  recipeTitle: {
    fontSize: hp(2),
    fontWeight: "800",
    color: "#333333",
  },
  recipeSubtitle: {
    marginTop: hp(0.7),
    fontSize: hp(1.6),
    fontWeight: "600",
    color: "#7B8794",
  },
});
