// Description: Main entry point for the application. Initializes the application and sets up event listeners.
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
  // Initial display and setup
  displayRecipes(recipes);
  updateRecipeCount(recipes.length);

  // Data for filters
  const filters = [
    { id: "ingredients", label: "Ingrédients" },
    { id: "appliances", label: "Appareils" },
    { id: "utensils", label: "Ustensiles" },
  ];

  // Function for creating filters
  function createFilterOptions() {
    const filterBarOptions = document.querySelector(".filter-bar__options");
    filters.forEach((filter) => {
      const filterOption = document.createElement("div");
      filterOption.classList.add("filter-options", "dropdown");

      filterOption.innerHTML = `
        <button class="filter-button dropdown-toggle" type="button" id="${
          filter.id
        }Dropdown" aria-expanded="false"
          aria-haspopup="true">
          ${filter.label}
          <i class="bi bi-chevron-down" aria-hidden="true"></i>
        </button>
        <div class="dropdown-menu" aria-labelledby="${filter.id}Dropdown" id="${filter.id}-list">
          <div class="sticky">
            <label for="${
              filter.id
            }-search" class="visually-hidden">Rechercher ${filter.label.toLowerCase()}</label>
            <input id="${
              filter.id
            }-search" type="text" class="form-control mb-2" placeholder="Rechercher...">
            <button class="form-control__icon-clear" type="reset" aria-label="Options search clear button">
              <i class="bi bi-x" aria-hidden="true"></i></button>
            <button class="form-control__icon-search" type="submit" aria-label="Options search button">
              <i class="bi bi-search" aria-hidden="true"></i></button>
          </div>
          <ul class="dropdown-options" role="listbox">
            <!-- dynamic options will be appended here -->
          </ul>
        </div>
      `;

      filterBarOptions.appendChild(filterOption);
    });
  }

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
