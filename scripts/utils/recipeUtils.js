// Description: This file contains utility functions for recipes.

export function filterRecipes(
  recipes,
  keyword,
  selectedIngredients,
  selectedAppliances,
  selectedUtensils
) {
  // Filter recipes by keyword, ingredients, appliances, and utensils
  // If the length of the keyword is less than 3, display all recipes without filtering
  if (
    keyword.length < 3 &&
    selectedIngredients.length === 0 &&
    selectedAppliances.length === 0 &&
    selectedUtensils.length === 0
  ) {
    return recipes;
  }

  let filteredRecipes = [];
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];

    const matchesKeyword =
      keyword === "" ||
      recipe.name.toLowerCase().includes(keyword.toLowerCase()) ||
      recipe.description.toLowerCase().includes(keyword.toLowerCase()) ||
      recipe.appliance.toLowerCase().includes(keyword.toLowerCase()) ||
      recipe.ustensils.some((ut) => ut.toLowerCase().includes(keyword.toLowerCase())) ||
      recipe.ingredients.some((ing) =>
        ing.ingredient.toLowerCase().includes(keyword.toLowerCase())
      );

    const matchesIngredients =
      selectedIngredients.length === 0 ||
      selectedIngredients.every((selected) =>
        recipe.ingredients.some((ing) => ing.ingredient.toLowerCase() === selected.toLowerCase())
      );

    const matchesAppliances =
      selectedAppliances.length === 0 ||
      selectedAppliances.includes(recipe.appliance.toLowerCase());

    const matchesUtensils =
      selectedUtensils.length === 0 ||
      selectedUtensils.every((selected) =>
        recipe.ustensils.some((ut) => ut.toLowerCase() === selected.toLowerCase())
      );

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

  // for (const recipe of recipes) {
  //   for (const ing of recipe.ingredients) {
  //     ingredients.add(ing.ingredient);
  //   }
  //   appliances.add(recipe.appliance);
  //   for (const ut of recipe.ustensils) {
  //     utensils.add(ut);
  //   }
  // }

  return {
    ingredients: Array.from(ingredients),
    appliances: Array.from(appliances),
    utensils: Array.from(utensils),
  };
}
