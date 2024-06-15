// scripts/eventHandlers/eventHandlers.js

import { filterRecipesByOptions } from "../utils/recipeUtils.js";
import { generateIngredientsList } from "../factory/recipeCardFactory.js";

export function addSearchEventHandler(
  searchInput,
  recipes,
  selectedIngredients,
  selectedAppliances,
  selectedUtensils,
  displayRecipes,
  updateRecipeCount
) {
  searchInput.addEventListener("input", function () {
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
  });
}

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
  updateRecipeCount
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
        updateRecipeCount
      );
    }
  });
}

function updateSelectedOptions(
  containerId,
  selectedArray,
  recipes,
  searchInput,
  selectedIngredients,
  selectedAppliances,
  selectedUtensils,
  displayRecipes,
  updateRecipeCount
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
        updateRecipeCount
      );
    });
  }

  const filteredRecipes = filterRecipesByOptions(
    recipes,
    searchInput.value.trim().toLowerCase(),
    selectedIngredients,
    selectedAppliances,
    selectedUtensils
  );
  displayRecipes(filteredRecipes);
  updateRecipeCount(filteredRecipes.length);
}

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
