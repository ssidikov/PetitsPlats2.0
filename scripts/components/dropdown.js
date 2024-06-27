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
    const clearButton = dropdownMenu.querySelector(".form-control__icon-clear");

    dropdownMenu.classList.add("show");
    button.classList.add("open");
    button.setAttribute("aria-expanded", "true");

    if (input) {
      initFilter(input, dropdownMenu, clearButton);
    }
  }

  function initFilter(input, dropdownMenu, clearButton) {
    if (!input.hasAttribute("data-filter-applied")) {
      input.setAttribute("data-filter-applied", "true");
      input.addEventListener("input", () => filterItems(input, dropdownMenu));
      input.addEventListener("input", () => toggleClearButton(input, clearButton));
    }
    input.focus();
    input.value = "";
    filterItems(input, dropdownMenu);
    toggleClearButton(input, clearButton); // Initial check for clear button visibility
  }

  function filterItems(input, dropdownMenu) {
    const filter = input.value.trim().toLowerCase();
    const items = dropdownMenu.querySelectorAll(".dropdown-item");

    items.forEach((item) => {
      const text = item.textContent.trim().toLowerCase();
      item.style.display = text.includes(filter) ? "" : "none";
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

  function toggleClearButton(input, clearButton) {
    if (input && clearButton) {
      clearButton.style.display = input.value.trim() === "" ? "none" : "block";
    }
  }

  // Add event listeners for clear buttons in all dropdowns
  document.querySelectorAll(".form-control__icon-clear").forEach((clearButton) => {
    clearButton.addEventListener("click", function () {
      const input = clearButton.previousElementSibling;
      if (input) {
        input.value = "";
        input.focus();
        clearButton.style.display = "none";
        // Manually trigger the input event to update the filtered items
        const event = new Event("input", {
          bubbles: true,
          cancelable: true,
        });
        input.dispatchEvent(event);
      }
    });
  });
}

// Function to sort items alphabetically
function sortAlphabetically(array) {
  return array.sort((a, b) => a.localeCompare(b));
}

// Function to generate HTML options for dropdowns
export function generateOptions(items, selectedArray = []) {
  const uniqueItems = [...new Set(items)];
  const sortedItems = sortAlphabetically(uniqueItems);

  return sortedItems
    .map((item) => {
      const isSelected = selectedArray.includes(item) ? "selected" : "";
      const icon = isSelected ? '<i class="dropdown-item__remove bi bi-x-circle-fill"></i>' : "";
      return `<li><a class="dropdown-item ${isSelected}" href="#">${item} ${icon}</a></li>`;
    })
    .join("");
}

// Function to append options to a dropdown element
export function appendDropdownOptions(selector, options) {
  const element = document.getElementById(selector);
  if (element) {
    const ulElement = element.querySelector(".dropdown-options");
    ulElement.innerHTML = options;
  }
}

// Function to extract unique options from recipes
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
