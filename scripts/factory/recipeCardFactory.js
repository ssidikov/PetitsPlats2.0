export function createRecipeCard(data) {
  const { id, image, name, ingredients, time, description } = data;

  const imageSrc = `./assets/images/${image}`;

  const recipeCards = document.querySelector(".recipes-cards");

  const card = document.createElement("article");
  card.id = id;
  card.classList.add("recipes-card", "col-md-4");

  const ingredientsList = ingredients
    .map(
      (ingredient) => `
    <li class="card-description__item">
      <p class="card-description__item-ingredients">${ingredient.ingredient}</p>
      <p class="card-description__item-quantity">${ingredient.quantity || ""} ${
        ingredient.unit || ""
      }</p>
    </li>`
    )
    .join("");

  card.innerHTML = `<div class="card recipe-card">
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
                      ${ingredientsList}
                    </ul>
                  </div>
                </div>
              </div>
            </div>`;

  recipeCards.appendChild(card);

  return card;
}
