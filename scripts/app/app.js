// Description: Main entry point for the application. This file is responsible for initializing the application and setting up event listeners.
import { recipes } from "../../data/recipes.js";
import {
  initDropdowns,
  generateOptions,
  appendDropdownOptions,
  getUniqueOptions,
} from "../components/dropdown.js";
import {
  addSearchEventHandler,
  addDropdownEventListeners,
  displayRecipes,
  updateRecipeCount,
} from "../events/eventHandlers.js";

document.addEventListener("DOMContentLoaded", () => {
  displayRecipes(recipes);
  updateRecipeCount(recipes.length);

  const selectedIngredients = [];
  const selectedAppliances = [];
  const selectedUtensils = [];

  function updateDropdownOptions(filteredRecipes) {
    const { ingredients, appliances, utensils } = getUniqueOptions(filteredRecipes);

    appendDropdownOptions("ingredients-list", generateOptions(ingredients, selectedIngredients));
    appendDropdownOptions("appliances-list", generateOptions(appliances, selectedAppliances));
    appendDropdownOptions("utensils-list", generateOptions(utensils, selectedUtensils));
  }

  const searchInput = document.querySelector(".hero-form__input");
  addSearchEventHandler(
    searchInput,
    recipes,
    selectedIngredients,
    selectedAppliances,
    selectedUtensils,
    displayRecipes,
    updateRecipeCount,
    updateDropdownOptions
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
    updateRecipeCount,
    updateDropdownOptions
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
    updateRecipeCount,
    updateDropdownOptions
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
    updateRecipeCount,
    updateDropdownOptions
  );

  initDropdowns();
  updateDropdownOptions(recipes);
});
