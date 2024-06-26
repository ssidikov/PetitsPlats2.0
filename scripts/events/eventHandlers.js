// Description: This file contains the event handlers for the search form and the dropdowns.
import { filterRecipes } from "../utils/recipeUtils.js";
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

    // Filter recipes based on the search keyword and selected options
    const filteredRecipes = filterRecipes(
      recipes,
      keyword,
      selectedIngredients,
      selectedAppliances,
      selectedUtensils
    );
    displayRecipes(filteredRecipes, keyword);
    updateRecipeCount(filteredRecipes.length);
    updateDropdownOptions(filteredRecipes);
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
  dropdown.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("dropdown-item")) {
      const option = event.target.textContent.trim();
      const isSelected = selectedArray.includes(option);

      if (!isSelected) {
        selectedArray.push(option);
        event.target.classList.add("selected");
        if (!event.target.querySelector("i")) {
          event.target.innerHTML += ` <i class="bi bi-x-lg"></i>`;
        }
      } else {
        selectedArray.splice(selectedArray.indexOf(option), 1);
        event.target.classList.remove("selected");
        const icon = event.target.querySelector("i");
        if (icon) icon.remove();
      }

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
  container.innerHTML = selectedArray
    .map((option) => `<div class="selected-option">${option} <i class="bi bi-x-lg"></i></div>`)
    .join("");

  container.querySelectorAll(".selected-option i").forEach((button, i) => {
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
  });

  const keyword = searchInput.value.trim().toLowerCase();
  const filteredRecipes = filterRecipes(
    recipes,
    keyword,
    selectedIngredients,
    selectedAppliances,
    selectedUtensils
  );
  displayRecipes(filteredRecipes, keyword);
  updateRecipeCount(filteredRecipes.length);
  updateDropdownOptions(filteredRecipes);
}

// Display recipes cards
export function displayRecipes(recipes, keyword) {
  const recipeCards = document.querySelector(".recipes-cards");
  const errorMessage = document.querySelector(".recipes-cards__error-message");

  recipeCards.innerHTML = "";
  if (recipes.length === 0) {
    if (errorMessage) {
      errorMessage.textContent = `Aucune recette ne contient ‘${keyword}’ vous pouvez chercher «tarte aux pommes», «poisson», etc.`;
      errorMessage.style.display = "block";
    }
  } else {
    if (errorMessage) {
      errorMessage.style.display = "none";
    }
    recipeCards.innerHTML = recipes.map((recipe) => createRecipeCard(recipe).outerHTML).join("");
  }
}

export function updateRecipeCount(count) {
  const filterNumberElement = document.querySelector(".filter-number");
  if (count === 0) {
    filterNumberElement.textContent = "Aucune recette trouvée pour votre recherche";
  } else {
    // Formatting of the number with leading zeros up to two digits
    const formattedCount = String(count).padStart(2, "0");
    filterNumberElement.textContent = `${formattedCount} recettes`;
  }
}
