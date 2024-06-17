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
