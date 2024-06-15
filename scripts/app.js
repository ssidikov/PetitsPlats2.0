// scripts/main.js

import { recipes } from "../../data/recipes.js";
import { createRecipeCard, generateIngredientsList } from "./factory/recipeCardFactory.js";
import {
  filterRecipesByOptions,
  generateOptions,
  appendDropdownOptions,
} from "./utils/recipeUtils.js";
import { initDropdowns } from "./components/dropdown.js";
import { addSearchEventHandler, addDropdownEventListeners } from "./events/eventHandlers.js";

document.addEventListener("DOMContentLoaded", function () {
  recipes.forEach((recipe) => createRecipeCard(recipe));
  updateRecipeCount(recipes.length);

  const selectedIngredients = [];
  const selectedAppliances = [];
  const selectedUtensils = [];

  recipes.forEach((recipe) => {
    appendDropdownOptions("appliances-list", generateOptions([recipe.appliance]));
    appendDropdownOptions("utensils-list", generateOptions(recipe.ustensils));
    appendDropdownOptions(
      "ingredients-list",
      generateOptions(recipe.ingredients.map((ing) => ing.ingredient))
    );
  });

  const searchInput = document.querySelector(".hero-form-input");

  addSearchEventHandler(
    searchInput,
    recipes,
    selectedIngredients,
    selectedAppliances,
    selectedUtensils,
    displayRecipes,
    updateRecipeCount
  );

  addDropdownEventListeners(
    "ingredients-list",
    selectedIngredients,
    "selected-ingredients",
    recipes,
    searchInput,
    selectedIngredients,
    selectedAppliances,
    selectedUtensils,
    displayRecipes,
    updateRecipeCount
  );
  addDropdownEventListeners(
    "appliances-list",
    selectedAppliances,
    "selected-appliances",
    recipes,
    searchInput,
    selectedIngredients,
    selectedAppliances,
    selectedUtensils,
    displayRecipes,
    updateRecipeCount
  );
  addDropdownEventListeners(
    "utensils-list",
    selectedUtensils,
    "selected-utensils",
    recipes,
    searchInput,
    selectedIngredients,
    selectedAppliances,
    selectedUtensils,
    displayRecipes,
    updateRecipeCount
  );

  initDropdowns();
});

function displayRecipes(recipes) {
  const recipeCards = document.querySelector(".recipes-cards");
  recipeCards.innerHTML = recipes
    .map(
      (recipe) => `
        <article id="recipe-${recipe.id}" class="recipes-card col-md-4">
          <div class="recipe-card card">
            <img class="card-img-top" src="./assets/images/${recipe.image}" alt="${
        recipe.name
      }" loading="lazy">
            <span class="recipe-card__time">${recipe.time} min</span>
            <div class="card-body">
              <h2 class="card-title">${recipe.name}</h2>
              <div class="card-description">
                <div class="card-description__recipe">
                  <h3 class="card-description__name">RECETTE</h3>
                  <p class="card-description__text">${recipe.description}</p>
                </div>
                <div class="card-description__ingredients">
                  <h3 class="card-description__name">INGRÉDIENTS</h3>
                  <ul class="card-description__list row">
                    ${generateIngredientsList(recipe.ingredients)}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>`
    )
    .join("");
}

function updateRecipeCount(count) {
  const filterNumberElement = document.querySelector(".filter-number");
  if (count === 0) {
    filterNumberElement.textContent = "Aucune recette trouvée pour votre recherche";
  } else {
    filterNumberElement.textContent = `${count} recettes`;
  }
}
