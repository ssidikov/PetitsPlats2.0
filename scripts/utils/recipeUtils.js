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
