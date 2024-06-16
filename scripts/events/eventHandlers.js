// Description: This file contains the event handlers for the search form and the dropdowns.
import { filterRecipesByOptions, getUniqueOptions } from "../utils/recipeUtils.js";
import { createRecipeCard } from "../factory/recipeCardFactory.js";

// Search form event handler
export function addSearchEventHandler(
  searchInput,
  recipes,
  selectedIngredients,
  selectedAppliances,
  selectedUtensils,
  displayRecipes,
  updateRecipeCount,
  updateDropdownOptions
) {
  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.trim().toLowerCase();
    let filteredRecipes = recipes;
    if (keyword.length < 3) {
      // If the length of the keyword is less than 3, display all recipes without filtering
      displayRecipes(recipes);
      updateRecipeCount(recipes.length);
    } else {
      // filtering and sorting of recipes by keyword
      const filteredRecipes = filterRecipesByOptions(
        recipes,
        keyword,
        selectedIngredients,
        selectedAppliances,
        selectedUtensils
      );
      displayRecipes(filteredRecipes);
      updateRecipeCount(filteredRecipes.length);
      updateDropdownOptions(filteredRecipes);
    }
  });
}

// Dropdown event handler
export function addDropdownEventListeners(
  dropdownId,
  selectedArray,
  selectedContainerId,
  recipes,
  searchInput,
  selectedIngredients,
  selectedAppliances,
  selectedUtensils,
  displayRecipes,
  updateRecipeCount,
  updateDropdownOptions
) {
  const dropdown = document.getElementById(dropdownId);
  dropdown.addEventListener("click", (event) => {
    const option = event.target.textContent.trim();
    if (!selectedArray.includes(option)) {
      selectedArray.push(option);
      updateSelectedOptions(
        selectedContainerId,
        selectedArray,
        recipes,
        searchInput,
        selectedIngredients,
        selectedAppliances,
        selectedUtensils,
        displayRecipes,
        updateRecipeCount,
        updateDropdownOptions
      );
    }
  });
}

// Update selected options
function updateSelectedOptions(
  containerId,
  selectedArray,
  recipes,
  searchInput,
  selectedIngredients,
  selectedAppliances,
  selectedUtensils,
  displayRecipes,
  updateRecipeCount,
  updateDropdownOptions
) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  for (let i = 0; i < selectedArray.length; i++) {
    const option = selectedArray[i];
    container.innerHTML += `<div class="selected-option">${option} <i class="bi bi-x-circle"></i></div>`;
  }

  const removeButtons = container.querySelectorAll(".selected-option i");
  for (let i = 0; i < removeButtons.length; i++) {
    const button = removeButtons[i];
    button.addEventListener("click", function () {
      selectedArray.splice(i, 1);
      updateSelectedOptions(
        containerId,
        selectedArray,
        recipes,
        searchInput,
        selectedIngredients,
        selectedAppliances,
        selectedUtensils,
        displayRecipes,
        updateRecipeCount,
        updateDropdownOptions
      );
    });
  }

  const keyword = searchInput.value.trim().toLowerCase();
  const filteredRecipes = filterRecipesByOptions(
    recipes,
    keyword,
    selectedIngredients,
    selectedAppliances,
    selectedUtensils
  );
  displayRecipes(filteredRecipes);
  updateRecipeCount(filteredRecipes.length);
  updateDropdownOptions(filteredRecipes);
}

// Display recipes cards
export function displayRecipes(recipes) {
  const recipeCards = document.querySelector(".recipes-cards");
  recipeCards.innerHTML = "";
  for (const recipe of recipes) {
    recipeCards.innerHTML += createRecipeCard(recipe).outerHTML;
  }
}

export function updateRecipeCount(count) {
  const filterNumberElement = document.querySelector(".filter-number");
  if (count === 0) {
    filterNumberElement.textContent = "Aucune recette trouvée pour votre recherche";
  } else {
    filterNumberElement.textContent = `${count} recettes`;
  }
}
