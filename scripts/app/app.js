// Description: Main entry point for the application. Initializes the application and sets up event listeners.
import { recipes } from "../../data/recipes.js";
import {
  initDropdowns,
  generateOptions,
  appendDropdownOptions,
  getUniqueOptions,
  createFilterOptions,
} from "../components/dropdown.js";
import {
  addSearchEventHandler,
  addDropdownEventListeners,
  displayRecipes,
  updateRecipeCount,
} from "../events/eventHandlers.js";

document.addEventListener("DOMContentLoaded", () => {
  // Initial display and setup
  displayRecipes(recipes);
  updateRecipeCount(recipes.length);

  // Calling the function of creating filters
  createFilterOptions();

  // Arrays for storing selected elements in dropdown
  const selectedIngredients = [];
  const selectedAppliances = [];
  const selectedUtensils = [];

  // Function to update dropdown options based on filtered recipes
  function updateDropdownOptions(filteredRecipes) {
    const { ingredients, appliances, utensils } = getUniqueOptions(filteredRecipes);

    appendDropdownOptions("ingredients-list", generateOptions(ingredients, selectedIngredients));
    appendDropdownOptions("appliances-list", generateOptions(appliances, selectedAppliances));
    appendDropdownOptions("utensils-list", generateOptions(utensils, selectedUtensils));
  }

  // Event handling for search input
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

  // Event handling for dropdown lists
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

  // Initialize dropdown behavior
  initDropdowns();

  // Initial update of dropdown options
  updateDropdownOptions(recipes);
});
