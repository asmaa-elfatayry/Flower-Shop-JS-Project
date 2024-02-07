import { loggeduser } from "../JS/order.js";
import { addchart } from "../JS/card.js";

window.addEventListener("DOMContentLoaded", function () {
  let product = JSON.parse(window.localStorage.getItem("productToShow"));
  let img_container = this.document.getElementById("product-image");
  let data_container = this.document.getElementById("product-data");
  let stars = document.getElementsByClassName('review-star');

  this.document.getElementById(
    "product-image"
  ).children[0].src = `../images/flowers/${product.image}`;

  this.document.getElementById("product-name").innerHTML = product.name;
  let currentUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
  let heartIcon = document.getElementsByClassName("for_wish")[0];
  heartIcon.id = product.id;
  if (currentUser) {
    let favourites = currentUser.favourites;
    for (let i = 0; i < favourites.length; i++) {
      if (product.id == favourites[i]) {
        heartIcon.classList.add("text-danger");
        break;
      }
    }
  }
  heartIcon.addEventListener("click", function () {
    let currentUser = [];
    if (sessionStorage.getItem("loggedInUser") !== null) {
      currentUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
      let userId = currentUser.id;
      let users = JSON.parse(localStorage.getItem("userData"));
      for (let i = 0; i < users.length; i++) {
        if (userId == users[i].id) {
          let heartId = product.id;
          if (heartIcon.classList.contains("text-danger")) {
            //remove
            for (let j = 0; j < users[i].favourites.length; j++) {
              if (users[i].favourites[j] == heartId) {
                users[i].favourites.splice(j, 1);
                break;
              }
            }
            heartIcon.classList.remove("text-danger");
          } else {
            //add
            users[i].favourites.push(heartId);
            heartIcon.classList.add("text-danger");
          }
          currentUser.favourites = users[i].favourites;
          sessionStorage.setItem("loggedInUser", JSON.stringify(currentUser));
          localStorage.setItem("userData", JSON.stringify(users));
          return;
        }
      }
    } else {
      Swal.fire("Sorry you must login first!");
    }
  });

  this.document.getElementById("product-description").innerText =
    product.description;
  this.document.getElementById("product-meaning").innerText = product.meaning;
  this.document.getElementById("product-price").innerText =
    product.price + " EGP";
  this.document.getElementById("product-category").innerText = product.category;
  this.document.getElementById("product-stock").innerText = product.stock;
  this.document.getElementById("items-price").innerText =
    product.price + " EGP";
  function validateAmount(val) {
    document.getElementById("minus-btn").removeAttribute("disabled");
    document.getElementById("plus-btn").removeAttribute("disabled");
    let curStock = Number(document.getElementById("product-stock").innerText);
    if (Number(val) >= curStock) {
      document.getElementById("plus-btn").setAttribute("disabled", "true");
      return curStock;
    }
    if (val <= 1) {
      document.getElementById("minus-btn").setAttribute("disabled", "true");
      return 1;
    }
    return val;
  }
  this.document
    .getElementById("minus-btn")
    .addEventListener("click", function () {
      let newVal = validateAmount(
        Number(document.getElementById("items-count").value) - 1
      );
      document.getElementById("items-count").value = newVal;
      document.getElementById("items-price").innerText = `${Number(
        newVal * product.price
      ).toFixed(2)} EGP`;
    });

  this.document
    .getElementById("plus-btn")
    .addEventListener("click", function () {
      let newVal = validateAmount(
        Number(document.getElementById("items-count").value) + 1
      );
      document.getElementById("items-count").value = newVal;
      document.getElementById("items-price").innerText = `${Number(
        newVal * product.price
      ).toFixed(2)} EGP`;
    });

  this.document
    .getElementById("items-count")
    .addEventListener("change", function (e) {
      e.target.value = validateAmount(e.target.value);
      document.getElementById("items-price").innerText = `${Number(
        Number(e.target.value) * product.price
      ).toFixed(2)} EGP`;
    });

  function addReview(curDiv, review_data) {
    let comment_div = document.createElement("div");
    curDiv.appendChild(comment_div);
    comment_div.classList.add("col-10", "mb-3", "comment");
    let review = document.createElement("q");
    review.classList.add("text-break", "mx-3", "text-success");
    comment_div.appendChild(review);
    let name = document.createElement("i");
    comment_div.appendChild(name);
    name.classList.add("text-muted");
    review.innerText = review_data.review;
    name.innerText = review_data.name;
    let rate = Number(review_data.rating);
    for (let i = 0; i < 5; i++) {
      let star = document.createElement('i');
      if (i >= rate) {
        star.classList.add('fa-regular', 'fa-star');
      }
      else {
        star.classList.add('fa-solid', 'fa-star');
      }
      comment_div.appendChild(star);
    }
  }
  function loadReviews() {
    let reviews = product.reviews;
    for (let i = 0; i < reviews.length; i++) {
      let curDiv = document.getElementById("comments");
      addReview(curDiv, reviews[i]);
    }
  }
  loadReviews();

  this.document
    .getElementById("commentBTN")
    .addEventListener("click", function () {
      let text = document.getElementById("commentTextarea").value.trim();
      let username = JSON.parse(sessionStorage.getItem("loggedInUser"));
      let rate = 0;
      for (let i = 0; i < stars.length; i++) {
        console.log(stars[i]);
        if (stars[i].classList.contains('selected'))
          rate++;
        else
          break;
      }
      if (!username) {
        Swal.fire("please login first");
        return;
      }
      if (!text) {
        Swal.fire("please write something first");
        return;
      }
      if (!rate) {
        console.log(rate);
        Swal.fire("please enter a rate first");
        return;
      }
      let curDiv = document.getElementById("comments");
      //adding new review
      const rev = {
        name: username.name,
        review: text,
        rating: rate,
      };
      addReview(curDiv, rev);
      //adding the review to the local storage
      let flowers = JSON.parse(window.localStorage.getItem("flowersData"));
      for (let i = 0; i < flowers.length; i++) {
        if (flowers[i].id == product.id) {
          flowers[i].reviews.push(rev);
          localStorage.setItem('productToShow', JSON.stringify(flowers[i]));
          break;
        }
      }
      localStorage.setItem("flowersData", JSON.stringify(flowers));
      document.getElementById("commentTextarea").value='';
    });
  for (let i = 0; i < stars.length; i++) {
    stars[i].addEventListener('click', function () {
      for (let j = 0; j < stars.length; j++) {
        if (j <= i) {
          stars[j].classList.add('selected');
          stars[j].children[0].classList.remove('fa-regular');
          stars[j].children[0].classList.add('fa-solid');
        }
        else {
          stars[j].classList.remove('selected');
          stars[j].children[0].classList.remove('fa-solid');
          stars[j].children[0].classList.add('fa-regular');
        }
      }
    })
  }
  document.getElementById("addCartBTN").addEventListener("click", function () {
    let product_num = document.getElementById("items-count").value;
    for (let i = 0; i < Number(product_num); i++)
      addchart(product.id);
  });
});
