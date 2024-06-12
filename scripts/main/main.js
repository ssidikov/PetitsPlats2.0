import { recipes } from "../../data/recipes.js";
import { createRecipeCard } from "../factory/recipeCardFactory.js";

document.addEventListener("DOMContentLoaded", function () {
  for (let i = 0; i < recipes.length; i++) {
    createRecipeCard(recipes[i]);
  }
});
