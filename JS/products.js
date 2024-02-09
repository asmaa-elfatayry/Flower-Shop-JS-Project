import * as order from "./order.js";
import { addProduct } from "../JS/card.js";
let numberOfProfProducts = 12;
window.addEventListener("DOMContentLoaded", function () {
  order.updateBadge();

  let flowers = JSON.parse(this.window.localStorage.getItem("flowersData"));
  let filteredFlowers;
  let categories = document.getElementsByClassName("category-btn");
  let newRowDiv = document.createElement("div");
  newRowDiv.className = "row";
  document.getElementById("productContainer").appendChild(newRowDiv);

  let mnP = document.getElementById("minPrice");
  let mxP = document.getElementById("maxPrice");
  let pagingBTNs = document.getElementsByClassName("paging-BTN");
  document.getElementById('products_per_page').addEventListener('change',function(e) {
    numberOfProfProducts = Number(e.target.value);
    displayProducts(1);
  })
  function filterProducts() {
    let txt = document.getElementById("searchTXT").value.trim();
    if (flowers) {
      filteredFlowers = flowers.filter(function (cur) {
        return (
          cur.name.toLowerCase().includes(txt.toLowerCase()) &&
          Number(cur.price) >= Number(mnP.value) &&
          Number(cur.price) <= Number(mxP.value) &&
          cur.stock > 0
        );
      });
    }
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].classList.contains("_active")) {
        if (i == 1) {
          filteredFlowers.sort(function (a, b) {
            return b.price - a.price;
          });
        } else if (i == 2) {
          filteredFlowers = filteredFlowers.reverse();
        }
      }
    }
  }
  function displayProducts(page) {
    newRowDiv.innerHTML = "";
    filterProducts();
    if (filteredFlowers) {
      if (filteredFlowers.length == 0) {
        document.getElementById("no-products").classList.remove("d-none");
        removePaging();
        return;
      }
      document.getElementById("no-products").classList.add("d-none");
      for (
        let i = (page - 1) * numberOfProfProducts;
        i <
        Math.min(
          (page - 1) * numberOfProfProducts + numberOfProfProducts,
          filteredFlowers.length
        );
        i++
      ) {
        addProduct(filteredFlowers[i], newRowDiv);
      }
      displayPaging(page);
    }
  }

  displayProducts(1);
  document.getElementById("searchTXT").addEventListener("keyup", function () {
    displayProducts(1);
  });
  mnP.addEventListener("change", function () {
    if (Number(mnP.value) < 0) mnP.value = 0;
    if (Number(mnP.value) > Number(mxP.value)) mnP.value = mxP.value;
    displayProducts(1);
  });
  mxP.addEventListener("change", function () {
    if (Number(mxP.value) < 0) mxP.value = 0;
    if (Number(mxP.value) < Number(mnP.value)) mxP.value = mnP.value;
    displayProducts(1);
  });
  for (let i = 0; i < categories.length; i++) {
    categories[i].addEventListener("click", function (e) {
      for (let i = 0; i < categories.length; i++)
        categories[i].classList.remove("_active");
      e.target.classList.add("_active");
      displayProducts(1);
    });
  }
  function removePaging() {
    for (let i = 0; i < pagingBTNs.length; i++) {
      pagingBTNs[i].classList.add("d-none");
      pagingBTNs[i].classList.remove("active");
    }
    document.getElementsByClassName("dots-1")[0].classList.add("d-none");
    document.getElementsByClassName("dots-2")[0].classList.add("d-none");
    document.getElementById("paging-prev").classList.add("d-none");
    document.getElementById("paging-next").classList.add("d-none");
  }
  function displayPaging(page) {
    removePaging();
    let pages = Math.ceil(filteredFlowers.length / numberOfProfProducts);
    if (page > 1)
      document.getElementById("paging-prev").classList.remove("d-none");
    if (page < pages)
      document.getElementById("paging-next").classList.remove("d-none");
    if (page >= 4 && page <= pages - 3) {
      document.getElementsByClassName("dots-1")[0].classList.remove("d-none");
      document.getElementsByClassName("dots-2")[0].classList.remove("d-none");
      for (let i = 0; i < pagingBTNs.length; i++)
        pagingBTNs[i].classList.remove("d-none");
      pagingBTNs[0].children[0].innerText = 1;
      pagingBTNs[1].children[0].innerText = page - 1;
      pagingBTNs[2].children[0].innerText = page;
      pagingBTNs[2].classList.add("active");
      pagingBTNs[3].children[0].innerText = page + 1;
      pagingBTNs[4].children[0].innerText = pages;
    } else if (page < 4) {
      for (let i = 0; i < pagingBTNs.length; i++) {
        if (i < pages) {
          if (i == pagingBTNs.length - 1) {
            pagingBTNs[i].children[0].innerText = pages;
            pagingBTNs[i].classList.remove("d-none");
            if (page == i + 1) pagingBTNs[i].classList.add("active");
            break;
          }
          pagingBTNs[i].children[0].innerText = i + 1;
          pagingBTNs[i].classList.remove("d-none");
          if (page == i + 1) pagingBTNs[i].classList.add("active");
        } else break;
      }
      if (pages >= 6)
        document.getElementsByClassName("dots-2")[0].classList.remove("d-none");
    } else {
      for (let i = pagingBTNs.length - 1, cur = pages; i > 0; i--, cur--) {
        pagingBTNs[i].children[0].innerText = cur;
        pagingBTNs[i].classList.remove("d-none");
        if (page == cur) pagingBTNs[i].classList.add("active");
      }
      if (pages >= 6) {
        document.getElementsByClassName("dots-1")[0].classList.remove("d-none");
        pagingBTNs[0].classList.remove("d-none");
        pagingBTNs[0].children[0].innerText = 1;
      }
    }
  }
  for (let btn = 0; btn < pagingBTNs.length; btn++) {
    pagingBTNs[btn].addEventListener("click", function (e) {
      let page = Number(e.target.innerText);
      displayProducts(page);
    });
  }
  document
    .getElementById("paging-next")
    .addEventListener("click", function (e) {
      for (let i = 0; i < pagingBTNs.length; i++) {
        if (pagingBTNs[i].classList.contains("active")) {
          displayProducts(Number(pagingBTNs[i].children[0].innerText) + 1);
          break;
        }
      }
    });
  document
    .getElementById("paging-prev")
    .addEventListener("click", function (e) {
      for (let i = 0; i < pagingBTNs.length; i++) {
        if (pagingBTNs[i].classList.contains("active")) {
          displayProducts(Number(pagingBTNs[i].children[0].innerText) - 1);
          break;
        }
      }
    });
});
