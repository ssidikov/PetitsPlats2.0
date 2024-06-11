import { recipes } from "../../data/recipes.js";
import { createRecipeCard } from "../factory/recipeCardFactory.js";

// console.log(recipes);
document.addEventListener("DOMContentLoaded", function () {
  // createRecipeCard(recipes);
  for (let i = 0; i < recipes.length; i++) {
    createRecipeCard(recipes[i]);
  }
});
