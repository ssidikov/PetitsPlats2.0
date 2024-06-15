// utils/recipeUtils.js

export function filterRecipesByOptions(
  recipes,
  keyword,
  selectedIngredients,
  selectedAppliances,
  selectedUtensils
) {
  return recipes
    .filter((recipe) => {
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

      return matchesKeyword && matchesIngredients && matchesAppliances && matchesUtensils;
    })
    .sort((a, b) => {
      const aContainsKeyword =
        a.name.toLowerCase().includes(keyword.toLowerCase()) ||
        a.description.toLowerCase().includes(keyword.toLowerCase()) ||
        a.appliance.toLowerCase().includes(keyword.toLowerCase()) ||
        a.ustensils.some((ut) => ut.toLowerCase().includes(keyword.toLowerCase())) ||
        a.ingredients.some((ing) => ing.ingredient.toLowerCase().includes(keyword.toLowerCase()));

      const bContainsKeyword =
        b.name.toLowerCase().includes(keyword.toLowerCase()) ||
        b.description.toLowerCase().includes(keyword.toLowerCase()) ||
        b.appliance.toLowerCase().includes(keyword.toLowerCase()) ||
        b.ustensils.some((ut) => ut.toLowerCase().includes(keyword.toLowerCase())) ||
        b.ingredients.some((ing) => ing.ingredient.toLowerCase().includes(keyword.toLowerCase()));

      if (aContainsKeyword && !bContainsKeyword) {
        return -1;
      } else if (!aContainsKeyword && bContainsKeyword) {
        return 1;
      } else {
        return 0;
      }
    });
}

export function generateOptions(items) {
  const uniqueItems = Array.from(new Set(items));
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
    element.innerHTML += options;
  }
}
