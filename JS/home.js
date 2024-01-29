import { addProduct } from "./card.js";
let flowers,
   productContainer,
   rowDiv;
window.addEventListener("load", function () {
  flowers = JSON.parse(window.localStorage.getItem("flowersData"));
  productContainer = document.querySelector("#productContainer");
  rowDiv = document.createElement("div");
  rowDiv.classList.add("row");
  productContainer.appendChild(rowDiv);

  for (let i = 0; i < 8; i++) {
    addProduct(flowers[i], rowDiv);
  }
});
