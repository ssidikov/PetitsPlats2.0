import { recipes } from "../../data/recipes.js";
import { createRecipeCard } from "../factory/recipeCardFactory.js";

// console.log(recipes);
document.addEventListener("DOMContentLoaded", function () {
  // createRecipeCard(recipes);
  recipes.forEach((recipe) => createRecipeCard(recipe));
});
