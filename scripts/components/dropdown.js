export function initDropdowns() {
  const dropdownButtons = document.querySelectorAll(".dropdown-toggle");

  dropdownButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const dropdownMenu = button.nextElementSibling;

      if (dropdownMenu.classList.contains("show")) {
        dropdownMenu.classList.remove("show");
        button.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
      } else {
        // Close all other dropdown menus and remove 'open' class from buttons
        document.querySelectorAll(".dropdown-menu").forEach((menu) => {
          menu.classList.remove("show");
        });
        document.querySelectorAll(".dropdown-toggle").forEach((btn) => {
          btn.classList.remove("open");
          btn.setAttribute("aria-expanded", "false");
        });

        // Open the clicked dropdown menu
        dropdownMenu.classList.add("show");
        button.classList.add("open");
        button.setAttribute("aria-expanded", "true");

        // Add event listener to the input for searching options
        const input = dropdownMenu.querySelector(".form-control");
        if (input) {
          input.addEventListener("input", function () {
            const filter = input.value.toLowerCase();
            const items = dropdownMenu.querySelectorAll(".dropdown-item");
            items.forEach((item) => {
              if (item.textContent.toLowerCase().includes(filter)) {
                item.style.display = "";
              } else {
                item.style.display = "none";
              }
            });
          });
        }
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
        btn.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      });
    }
  });
}

function sortAlphabetically(array) {
  return array.sort((a, b) => a.localeCompare(b));
}

export function generateOptions(items) {
  const uniqueItems = [...new Set(items)];
  const sortedItems = sortAlphabetically(uniqueItems);
  return sortedItems
    .map((item) => `<li><a class="dropdown-item" href="#">${item}</a></li>`)
    .join("");
}

export function appendDropdownOptions(selector, options) {
  const element = document.getElementById(selector);
  if (element) {
    const inputElement = element.querySelector("input");

    // Remove all elements after search input
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

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ing) => ingredients.add(ing.ingredient.toLowerCase()));
    appliances.add(recipe.appliance.toLowerCase());
    recipe.ustensils.forEach((ut) => utensils.add(ut.toLowerCase()));
  });

  // Return unique options as arrays
  return {
    ingredients: [...ingredients],
    appliances: [...appliances],
    utensils: [...utensils],
  };
}
