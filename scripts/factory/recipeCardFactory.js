// factory/recipeCardFactory.js

export function createRecipeCard(data) {
  const { id, image, name, ingredients, appliance, ustensils, time, description } = data;

  const imageSrc = `./assets/images/${image}`;
  const recipeCards = document.querySelector(".recipes-cards");

  const card = document.createElement("article");
  card.id = `recipe-${id}`;
  card.classList.add("recipes-card", "col-md-4");

  card.innerHTML = `
    <div class="recipe-card card">
      <img class="card-img-top" src="${imageSrc}" alt="${name}" loading="lazy">
      <span class="recipe-card__time">${time} min</span>
      <div class="card-body">
        <h2 class="card-title">${name}</h2>
        <div class="card-description">
          <div class="card-description__recipe">
            <h3 class="card-description__name">RECETTE</h3>
            <p class="card-description__text">${description}</p>
          </div>
          <div class="card-description__ingredients">
            <h3 class="card-description__name">INGRÉDIENTS</h3>
            <ul class="card-description__list row">
              ${generateIngredientsList(ingredients)}
            </ul>
          </div>
        </div>
      </div>
    </div>`;

  recipeCards.appendChild(card);
  return card;
}

export function generateIngredientsList(ingredients) {
  let result = "";
  for (let i = 0; i < ingredients.length; i++) {
    const ing = ingredients[i];
    result += `
      <li class="card-description__item">
        <p class="card-description__item-ingredients">${ing.ingredient}</p>
        <p class="card-description__item-quantity">${ing.quantity || ""} ${ing.unit || ""}</p>
      </li>`;
  }
  return result;
}
