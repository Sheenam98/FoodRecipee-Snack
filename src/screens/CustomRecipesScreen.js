import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { toggleFavorite } from "../redux/favoritesSlice";

export default function CustomRecipesScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const { recipe } = route.params || {};

  const favoriteRecipes = useSelector(
    (state) => state.favorites.favoriterecipes
  );

  if (!recipe) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>
          No Recipe Details Available
        </Text>
      </View>
    );
  }

  // Support the same recipe object structure as RecipeDetailScreen
  const recipeTitle =
    recipe.recipeName || recipe.title || "Untitled Recipe";

  const recipeImage =
    recipe.recipeImage || recipe.image;

  const recipeInstructions =
    recipe.recipeInstructions ||
    recipe.description ||
    "No instructions added.";

  const recipeId =
    recipe.idFood ||
    recipe.idCategory ||
    recipe.recipeId ||
    recipe.title;

  const isFavourite = favoriteRecipes?.some(
    (favRecipe) =>
      (favRecipe.idFood ||
        favRecipe.idCategory ||
        favRecipe.recipeId ||
        favRecipe.title) === recipeId
  );

  const metaLine = [
    recipe.recipeCategory || recipe.category,
    recipe.recipeOrigin,
  ]
    .filter(Boolean)
    .join(" | ");

  const statCards = [
    {
      label: recipe.cookingTime || "00 Mins",
      icon: (
        <Ionicons
          name="time-outline"
          size={hp(3.2)}
          color="#5F6368"
        />
      ),
    },
    {
      label: recipe.servings || "00 Servings",
      icon: (
        <Ionicons
          name="people"
          size={hp(3.2)}
          color="#58316F"
        />
      ),
    },
    {
      label: recipe.calories || "00 Cal",
      icon: (
        <MaterialCommunityIcons
          name="fire"
          size={hp(3.4)}
          color="#FF6B35"
        />
      ),
    },
    {
      label: recipe.difficulty || "Medium",
      icon: (
        <MaterialCommunityIcons
          name="medical-bag"
          size={hp(3.1)}
          color="#748694"
        />
      ),
    },
  ];

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(recipe));
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      testID="scrollContent"
    >
      {/* Hero Image */}
      <View
        style={styles.heroContainer}
        testID="imageContainer"
      >
        {recipeImage ? (
          <Image
            source={{ uri: recipeImage }}
            style={styles.recipeImage}
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <MaterialCommunityIcons
              name="food"
              size={hp(6)}
              color="#B8B8B8"
            />
          </View>
        )}

        {/* Back + Favorite Buttons */}
        <View
          style={styles.topButtonsContainer}
          testID="topButtonsContainer"
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            activeOpacity={0.85}
          >
            <Ionicons
              name="arrow-back"
              size={hp(2.3)}
              color="#222222"
            />

            <Text style={styles.backButtonText}>
              Back
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleToggleFavorite}
            style={styles.favoriteButton}
            activeOpacity={0.85}
          >
            <Text style={styles.favoriteIcon}>
              {isFavourite ? "♥" : "♡"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recipe Details */}
      <View style={styles.contentContainer}>
        <View
          style={styles.recipeDetailsContainer}
          testID="recipeDetailsContainer"
        >
          <Text
            style={styles.recipeTitle}
            testID="recipeTitle"
          >
            {recipeTitle}
          </Text>

          {!!metaLine && (
            <Text
              style={styles.recipeCategory}
              testID="recipeCategory"
            >
              {metaLine}
            </Text>
          )}
        </View>

        {/* Stats */}
        <View
          style={styles.statsContainer}
          testID="miscContainer"
        >
          {statCards.map((stat, index) => (
            <View
              key={`${stat.label}-${index}`}
              style={styles.statCard}
            >
              {stat.icon}

              <Text style={styles.statText}>
                {stat.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Ingredients */}
        {!!recipe.ingredients?.length && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>
              Ingredients
            </Text>

            <View style={styles.ingredientsList}>
              {recipe.ingredients.map(
                (ingredient, index) => (
                  <View
                    key={`${
                      ingredient.ingredientName ||
                      "ingredient"
                    }-${index}`}
                    style={styles.ingredientItem}
                  >
                    <View
                      style={styles.ingredientBullet}
                    />

                    <Text
                      style={styles.ingredientText}
                    >
                      {ingredient.measure
                        ? `${ingredient.measure} `
                        : ""}

                      {ingredient.ingredientName ||
                        ingredient.name ||
                        ""}
                    </Text>
                  </View>
                )
              )}
            </View>
          </View>
        )}

        {/* Instructions */}
        <View
          style={styles.sectionContainer}
          testID="sectionContainer"
        >
          <Text style={styles.sectionTitle}>
            Instructions
          </Text>

          <Text style={styles.instructionsText}>
            {recipeInstructions}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  emptyContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp(8),
  },

  emptyTitle: {
    color: "#2F2F2F",
    fontSize: hp(2.3),
    fontWeight: "700",
    textAlign: "center",
  },

  scrollContent: {
    paddingBottom: hp(5),
  },

  heroContainer: {
    alignSelf: "center",
    width: wp(88),
    height: hp(43),
    marginTop: hp(5),
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#F3F4F6",
  },

  recipeImage: {
    width: "100%",
    height: "100%",
  },

  imagePlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  topButtonsContainer: {
    position: "absolute",
    top: hp(3),
    left: wp(4),
    right: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  backButton: {
    minHeight: hp(5.6),
    paddingHorizontal: wp(3.2),
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 3,
  },

  backButtonText: {
    marginLeft: wp(0.8),
    color: "#222222",
    fontSize: hp(2),
    fontWeight: "700",
  },

  favoriteButton: {
    width: hp(5.4),
    height: hp(5.4),
    borderRadius: hp(2.7),
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 3,
  },

  favoriteIcon: {
    color: "#222222",
    fontSize: hp(2.8),
    lineHeight: hp(3),
  },

  contentContainer: {
    paddingHorizontal: wp(6),
    paddingTop: hp(4.2),
  },

  recipeDetailsContainer: {
    alignItems: "center",
    marginBottom: hp(2.8),
  },

  recipeTitle: {
    color: "#2F2F2F",
    fontSize: hp(3.2),
    fontWeight: "800",
    textAlign: "center",
  },

  recipeCategory: {
    marginTop: hp(1.2),
    color: "#7B8794",
    fontSize: hp(1.9),
    fontWeight: "600",
    textAlign: "center",
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp(3.2),
  },

  statCard: {
    width: wp(20.8),
    minHeight: hp(10.4),
    borderRadius: 10,
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: hp(1.3),
  },

  statText: {
    marginTop: hp(0.8),
    color: "#151515",
    fontSize: hp(1.55),
    fontWeight: "800",
    textAlign: "center",
  },

  sectionContainer: {
    marginBottom: hp(3),
  },

  sectionTitle: {
    color: "#222222",
    fontSize: hp(2.6),
    fontWeight: "800",
    marginBottom: hp(1.4),
  },

  ingredientsList: {
    gap: hp(1),
  },

  ingredientItem: {
    minHeight: hp(5.4),
    borderRadius: 10,
    backgroundColor: "#FFF8DD",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp(3.2),
  },

  ingredientBullet: {
    width: hp(1.4),
    height: hp(1.4),
    borderRadius: hp(0.7),
    backgroundColor: "#FFD21F",
    marginRight: wp(2.8),
  },

  ingredientText: {
    flex: 1,
    color: "#333333",
    fontSize: hp(1.75),
    fontWeight: "500",
  },

  instructionsText: {
    color: "#222222",
    fontSize: hp(1.9),
    lineHeight: hp(2.8),
    textAlign: "justify",
  },
});