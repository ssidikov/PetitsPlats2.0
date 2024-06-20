// scripts/components/dropdown.js

export function initDropdowns() {
  const dropdownButtons = document.querySelectorAll(".dropdown-toggle");

  dropdownButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const dropdownMenu = button.nextElementSibling;

      if (dropdownMenu.classList.contains("show")) {
        dropdownMenu.classList.remove("show");
        button.setAttribute("aria-expanded", "false");
      } else {
        // Close all other dropdown menus
        document.querySelectorAll(".dropdown-menu").forEach((menu) => {
          menu.classList.remove("show");
        });
        document.querySelectorAll(".dropdown-toggle").forEach((btn) => {
          btn.setAttribute("aria-expanded", "false");
        });

        // Open the clicked dropdown menu
        dropdownMenu.classList.add("show");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Close dropdown if clicked outside
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".dropdown")) {
      document.querySelectorAll(".dropdown-menu").forEach((menu) => {
        menu.classList.remove("show");
      });
      document.querySelectorAll(".dropdown-toggle").forEach((btn) => {
        btn.setAttribute("aria-expanded", "false");
      });
    }
  });
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
