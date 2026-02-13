"use strict"

export function accordion() {
  let divAccArray = document.querySelectorAll(".accordion-container");

  divAccArray.forEach(function (item) {
    item.addEventListener("click", function () {
      this.classList.toggle("active");
    });
  });
}