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

  const searchInput = document.querySelector(".hero-form-input");
  const clearButton = document.querySelector(".clear-button");

  function updateDropdownOptions(filteredRecipes) {
    const { ingredients, appliances, utensils } = getUniqueOptions(filteredRecipes);

    appendDropdownOptions("ingredients-list", generateOptions(ingredients));
    appendDropdownOptions("appliances-list", generateOptions(appliances));
    appendDropdownOptions("utensils-list", generateOptions(utensils));
  }

  clearButton.addEventListener("click", () => {
    searchInput.value = "";
    displayRecipes(recipes);
    updateRecipeCount(recipes.length);
    updateDropdownOptions(recipes);
  });

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
