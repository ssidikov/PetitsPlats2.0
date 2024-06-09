function createRecipeCard() {
  // export function createRecipeCard(data)
  // const { id, image, name, ingredients, ingredient, quantity, unit, time, description } = data;

  // const imageSrc = `./assets/images/${image}`;

  const recipeCards = document.querySelector(".recipes-cards");

  const card = document.createElement("article");
  // card.id = id;
  card.classList.add("recipes-card,col-md-4");

  card.innerHTML = `<div class="card recipe-card">
              <img class="card-img-top" src="/assets/images/Recette01.jpg" alt="Recipe Image">
              <span class="recipe-card__time">10 min</span>
              <div class="card-body">
                <h2 class="card-title">Limonade de Coco</h2>
                <div class="card-description">
                  <div class="card-description__recipe">
                    <h3 class="card-description__name">RECETTE</h3>
                    <p class="card-description__text">Mettre les glaçons à votre goût dans le blender, Ajouter le lait
                      la
                      crème de coco,
                      le jus de 2 citrons et le sucre ensemble. Mixer jusqu'à obtenir la consistance désirée.
                    </p>
                  </div>
                  <div class="card-description__ingredients">
                    <h3 class="card-description__name">INGRÉDIENTS</h3>
                    <ul class="card-description__list row">
                      <li class="card-description__item col-6">
                        <p class="card-description__item-ingredients">Jus de citron</p>
                        <p class="card-description__item-quantity">2</p>
                      </li>
                      <li class="card-description__item col-6">
                        <p class="card-description__item-ingredients">Créme de coco</p>
                        <p class="card-description__item-quantity">4 cuillères</p>
                      </li>
                      <li class="card-description__item col-6">
                        <p class="card-description__item-ingredients">Lait de coco</p>
                        <p class="card-description__item-quantity">400ml</p>
                      </li>
                      <li class="card-description__item col-6">
                        <p class="card-description__item-ingredients">Sucre</p>
                        <p class="card-description__item-quantity">20g</p>
                      </li>
                      <li class="card-description__item col-6">
                        <p class="card-description__item-ingredients">Glaçons</p>
                        <p class="card-description__item-quantity">2</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>`;

  recipeCards.appendChild(card);

  return card;
}

document.addEventListener("DOMContentLoaded", function () {
  createRecipeCard();
});
