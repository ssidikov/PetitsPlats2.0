export function initDropdowns() {
  const dropdownButtons = document.querySelectorAll(".dropdown-toggle");

  dropdownButtons.forEach((button) => {
    button.addEventListener("click", () => toggleDropdown(button));
  });

  function toggleDropdown(button) {
    const dropdownMenu = button.nextElementSibling;

    if (dropdownMenu.classList.contains("show")) {
      closeDropdown(button, dropdownMenu);
    } else {
      closeAllDropdowns();
      openDropdown(button, dropdownMenu);
    }
  }

  function openDropdown(button, dropdownMenu) {
    const input = dropdownMenu.querySelector(".form-control");

    dropdownMenu.classList.add("show");
    button.classList.add("open");
    button.setAttribute("aria-expanded", "true");

    if (input && !input.hasAttribute("data-filter-applied")) {
      input.focus();
      input.value = "";
      applyFilter(input, dropdownMenu);
      input.setAttribute("data-filter-applied", "true");
    }
    input.focus();
    input.value = "";
    applyFilter(input, dropdownMenu);
  }

  function applyFilter(input, dropdownMenu) {
    input.addEventListener("input", () => {
      const filter = input.value.trim().toLowerCase();
      const items = dropdownMenu.querySelectorAll(".dropdown-item");

      items.forEach((item) => {
        const text = item.textContent.trim().toLowerCase();
        item.style.display = text.includes(filter) ? "" : "none";
      });
    });
  }

  function closeDropdown(button, dropdownMenu) {
    dropdownMenu.classList.remove("show");
    button.classList.remove("open");
    button.setAttribute("aria-expanded", "false");
    resetFilter(dropdownMenu);
  }

  function resetFilter(dropdownMenu) {
    const items = dropdownMenu.querySelectorAll(".dropdown-item");
    items.forEach((item) => {
      item.style.display = "";
    });
  }

  function closeAllDropdowns() {
    document.querySelectorAll(".dropdown-menu").forEach((menu) => {
      menu.classList.remove("show");
      resetFilter(menu);
    });
    document.querySelectorAll(".dropdown-toggle").forEach((btn) => {
      btn.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });
  }
}

function sortAlphabetically(array) {
  return array.sort((a, b) => a.localeCompare(b));
}

export function generateOptions(items, selectedArray = []) {
  const uniqueItems = [...new Set(items)];
  const sortedItems = sortAlphabetically(uniqueItems);
  return sortedItems
    .map((item) => {
      const isSelected = selectedArray.includes(item) ? "selected" : "";
      return `<li><a class="dropdown-item ${isSelected}" href="#">${item}</a></li>`;
    })
    .join("");
}

export function appendDropdownOptions(selector, options) {
  const element = document.getElementById(selector);
  if (element) {
    const ulElement = element.querySelector(".dropdown-options");
    ulElement.innerHTML = options;
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

  return {
    ingredients: [...ingredients],
    appliances: [...appliances],
    utensils: [...utensils],
  };
}
