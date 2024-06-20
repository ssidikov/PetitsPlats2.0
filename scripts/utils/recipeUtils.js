// Description: This file contains utility functions for recipes.

// Filtering Recipes Using Functional Programming
export function filterRecipes(
  recipes,
  keyword,
  selectedIngredients,
  selectedAppliances,
  selectedUtensils
) {
  const noFiltersApplied =
    keyword.length < 3 &&
    selectedIngredients.length === 0 &&
    selectedAppliances.length === 0 &&
    selectedUtensils.length === 0;

  if (noFiltersApplied) {
    return recipes;
  }

  const keywordLower = keyword.toLowerCase();

  return recipes.filter(({ name, description, appliance, ustensils, ingredients }) => {
    // Check if the recipe matches the keyword
    const matchesKeyword =
      keyword === "" ||
      name.toLowerCase().includes(keywordLower) ||
      description.toLowerCase().includes(keywordLower) ||
      appliance.toLowerCase().includes(keywordLower) ||
      ustensils.some((ut) => ut.toLowerCase().includes(keywordLower)) ||
      ingredients.some((ing) => ing.ingredient.toLowerCase().includes(keywordLower));

    // Check if the recipe matches the selected ingredients
    const matchesIngredients =
      selectedIngredients.length === 0 ||
      selectedIngredients.every((selected) =>
        ingredients.some((ing) => ing.ingredient.toLowerCase() === selected.toLowerCase())
      );

    // Check if the recipe matches the selected appliance
    const matchesAppliances =
      selectedAppliances.length === 0 || selectedAppliances.includes(appliance.toLowerCase());

    // Check if the recipe matches the selected utensils
    const matchesUtensils =
      selectedUtensils.length === 0 ||
      selectedUtensils.every((selected) =>
        ustensils.some((ut) => ut.toLowerCase() === selected.toLowerCase())
      );

    // Return true if all criteria are matched
    return matchesKeyword && matchesIngredients && matchesAppliances && matchesUtensils;
  });
}
