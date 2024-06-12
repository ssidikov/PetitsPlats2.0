export function createRecipeCard(data) {
  const { id, image, name, ingredients, appliance, ustensils, time, description } = data;

  const imageSrc = `./assets/images/${image}`;

  const recipeCards = document.querySelector(".recipes-cards");

  const card = document.createElement("article");
  card.id = id;
  card.classList.add("recipes-card", "col-md-4");

  // Appliances options
  const appliancesOptions = (appliance) => {
    let result = "";

    for (let i = 0; i < appliance.length; i++) {
      result += `<option value="${appliance}">${appliance}</option>`;
    }
    return result;
  };

  const appliancesListOptions = document.getElementById("appliances-list");
  appliancesListOptions.innerHTML += appliancesOptions(appliance);

  // Ustenlice options
  const ustensilsOptions = (ustensils) => {
    let result = "";

    for (let i = 0; i < ustensils.length; i++) {
      result += `<option value="${ustensils[i]}">${ustensils[i]}</option>`;
    }
    return result;
  };

  const ustensilsListOptions = document.getElementById("utensils-list");
  ustensilsListOptions.innerHTML += ustensilsOptions(ustensils);
  // Ingredients options
  const ingredientsOptions = (ingredients) => {
    let result = "";

    for (let i = 0; i < ingredients.length; i++) {
      result += `<option value="${ingredients[i].ingredient}">${ingredients[i].ingredient}</option>`;
    }
    return result;
  };

  const ingredientsListOptions = document.getElementById("ingredients-list");
  ingredientsListOptions.innerHTML += ingredientsOptions(ingredients);

  // Ingredients list for each recipe
  const ingredientsList = (ingredients) => {
    let result = "";

    for (let i = 0; i < ingredients.length; i++) {
      result += `<li class="card-description__item">
        <p class="card-description__item-ingredients">${ingredients[i].ingredient}</p>
        <p class="card-description__item-quantity">${ingredients[i].quantity || ""} ${
        ingredients[i].unit || ""
      }</p>
      </li>`;
    }
    return result;
  };

  card.innerHTML = `<div class="recipe-card card">
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
                      ${ingredientsList(ingredients)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>`;

  recipeCards.appendChild(card);

  return card;
}
