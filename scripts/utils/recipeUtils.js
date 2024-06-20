// Description: This file contains utility functions for recipes.
// Function using native loops (for, while) for keyword search

export function filterRecipes(
  recipes,
  keyword,
  selectedIngredients,
  selectedAppliances,
  selectedUtensils
) {
  // If the length of the keyword is less than 3 and no filters are selected, return all recipes
  if (
    keyword.length < 3 &&
    selectedIngredients.length === 0 &&
    selectedAppliances.length === 0 &&
    selectedUtensils.length === 0
  ) {
    return recipes;
  }

  const filteredRecipes = [];

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const { name, description, appliance, ustensils, ingredients } = recipe;

    // Check if the recipe matches the keyword
    let matchesKeyword =
      keyword === "" ||
      name.toLowerCase().includes(keyword.toLowerCase()) ||
      description.toLowerCase().includes(keyword.toLowerCase()) ||
      appliance.toLowerCase().includes(keyword.toLowerCase());

    if (!matchesKeyword) {
      for (let j = 0; j < ustensils.length; j++) {
        if (ustensils[j].toLowerCase().includes(keyword.toLowerCase())) {
          matchesKeyword = true;
          break;
        }
      }
    }

    if (!matchesKeyword) {
      for (let j = 0; j < ingredients.length; j++) {
        if (ingredients[j].ingredient.toLowerCase().includes(keyword.toLowerCase())) {
          matchesKeyword = true;
          break;
        }
      }
    }

    // Check if the recipe matches the selected ingredients
    let matchesIngredients = selectedIngredients.length === 0;
    if (!matchesIngredients) {
      matchesIngredients = selectedIngredients.every((selected) =>
        ingredients.some((ing) => ing.ingredient.toLowerCase() === selected.toLowerCase())
      );
    }

    // Check if the recipe matches the selected appliance
    const matchesAppliances =
      selectedAppliances.length === 0 || selectedAppliances.includes(appliance.toLowerCase());

    // Check if the recipe matches the selected utensils
    let matchesUtensils = selectedUtensils.length === 0;
    if (!matchesUtensils) {
      matchesUtensils = selectedUtensils.every((selected) =>
        ustensils.some((ut) => ut.toLowerCase() === selected.toLowerCase())
      );
    }

    // If the recipe matches all the criteria, add it to the filtered recipes
    if (matchesKeyword && matchesIngredients && matchesAppliances && matchesUtensils) {
      filteredRecipes.push(recipe);
    }
  }

  return filteredRecipes;
}

export function generateOptions(items) {
  const uniqueItems = Array.from(new Set(items)); // Remove duplicates using a Set
  let options = "";
  for (let i = 0; i < uniqueItems.length; i++) {
    const item = uniqueItems[i];
    options += `<li><a class="dropdown-item" href="#">${item}</a></li>`;
  }
  return options;
}

export function appendDropdownOptions(selector, options) {
  const element = document.getElementById(selector);
  if (element) {
    const inputElement = element.querySelector("input");

    // Clean all elements after search input
    while (inputElement.nextSibling) {
      element.removeChild(inputElement.nextSibling);
    }

    // Add new options after the search input
    inputElement.insertAdjacentHTML("afterend", options);
  }
}

export function getUniqueOptions(recipes) {
  const ingredients = new Set();
  const appliances = new Set();
  const utensils = new Set();

  for (const recipe of recipes) {
    for (const ing of recipe.ingredients) {
      ingredients.add(ing.ingredient.toLowerCase());
    }
    appliances.add(recipe.appliance.toLowerCase());
    for (const ut of recipe.ustensils) {
      utensils.add(ut.toLowerCase());
    }
  }

  return {
    ingredients: Array.from(ingredients),
    appliances: Array.from(appliances),
    utensils: Array.from(utensils),
  };
}
