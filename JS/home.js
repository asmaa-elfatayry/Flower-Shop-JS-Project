import { addProduct } from "./card.js";
let productContainer, rowDiv;
window.addEventListener("DOMContentLoaded", function () {
  const flowers = JSON.parse(window.localStorage.getItem("flowersData"));

  if (flowers) {
    productContainer = document.querySelector("#productContainer");
    rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    productContainer.appendChild(rowDiv);

    for (let i = 0; i < 8; i++) {
      addProduct(flowers[i], rowDiv);
    }
  } else {
    console.log("loading");
  }
  let categories = document.getElementsByClassName('cat');
  for (let i = 0; i < categories.length; i++) {
    categories[i].addEventListener('click', function () {
      const cat = this.children[0].children[1].innerText;
      const url = `../HTML pages/products.html?category=${cat}`;
      window.location.href = url;
    })
  }
});
