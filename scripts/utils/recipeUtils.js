// Description: This file contains filterRecipes function that filters recipes based on the search keyword and selected options.

// Filtering Recipes Using Functional Programming
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

  return recipes.filter((recipe) => {
    const { name, description, appliance, ustensils, ingredients } = recipe;

    // Check if the recipe matches the keyword
    const matchesKeyword =
      keyword === "" ||
      name.toLowerCase().includes(keyword.toLowerCase()) ||
      description.toLowerCase().includes(keyword.toLowerCase()) ||
      appliance.toLowerCase().includes(keyword.toLowerCase()) ||
      ustensils.some((ut) => ut.toLowerCase().includes(keyword.toLowerCase())) ||
      ingredients.some((ing) => ing.ingredient.toLowerCase().includes(keyword.toLowerCase()));

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
