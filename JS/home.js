import { addProduct } from "./card.js";
let favourites,
  favIcon,
  divflower,
  selflower,
  flower,
  fav,
  x,
  flowers,
  e,
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

  // function addProduct(product, rowdifv) {
  //   card = document.createElement("div");
  //   card.classList.add("card", "col-6", "col-md-4", "col-lg-3");
  //   rowDiv.appendChild(card);

  //   cardDetails = document.createElement("div");
  //   cardDetails.classList.add("card-details");
  //   card.appendChild(cardDetails);

  //   const iconsDiv = document.createElement("div");
  //   iconsDiv.classList.add("icons");
  //   iconsDiv.id = "icons";
  //   cardDetails.appendChild(iconsDiv);

  //   const heartIcon = document.createElement("i");
  //   heartIcon.classList.add("fa-solid", "fa-heart", "for_wish");
  //   heartIcon.id = product.id;
  //   productContainer.addEventListener(
  //     "click",
  //     wish
  //   ); /* heartIcon.addEventListener('click',wish);*/
  //   heartIcon.style.fontSize = "2rem";
  //   iconsDiv.appendChild(heartIcon);

  //   const imgElement = document.createElement("img");
  //   imgElement.src = `images/flowers/${product.image}`; // get image in local folder
  //   imgElement.alt = "flower";
  //   cardDetails.appendChild(imgElement);

  //   const cardBody = document.createElement("div");
  //   cardBody.classList.add("card-body");
  //   cardDetails.appendChild(cardBody);

  //   const cardTitle = document.createElement("h5");
  //   cardTitle.classList.add("card-title");
  //   cardTitle.textContent = product.name;
  //   cardBody.appendChild(cardTitle);

  //   const addToCartButton = document.createElement("button");
  //   addToCartButton.textContent = "Add to Cart";
  //   cardBody.appendChild(addToCartButton);
  // }
  function wish(e) {
    let currentUser;
    // if the target element is heart
    console.log(e.target);
    if (e.target.parentElement.classList.contains("for_wish")) {
      // check if any user login now
      if (sessionStorage.getItem("loggedInUser") !== null) {
        //get data of current user
        currentUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
        // add array favourate to this user
        if (!currentUser.favorite) {
          currentUser.favorite = [];
        }

        // update data after changes
        sessionStorage.setItem("loggedInUser", JSON.stringify(currentUser));
      }

      //    get heart id -> product id clicked
      heartId = parseInt(e.target.parentElement.id); // svg is parentelement ,  target : icon <i></i>  need the id of  <svg id="i"><i ></i></svg>,
      //get product with the same id of heart
      selflower = flowers.find((flower) => flower.id == heartId);
      console.log(selflower);
      // to check the selected flower added before to  the favourites local storage or not , added  only one time
      if (!currentUser.favorite.some((flower) => flower.id === heartId)) {
        // Add the flower to the favorites array
        currentUser.favorite.push(selflower);

        // Save the updated favorites to sessionStorage
        sessionStorage.setItem("loggedInUser", JSON.stringify(currentUser));

        // Print the updated state for debugging
        // console.log(currentUser);
      }

      //   window.localStorage.setItem("favourites", JSON.stringify(fav));
      favIcon = document.getElementById(e.target.parentElement.id);

      favIcon.style.color = "#E72463";
      favIcon.parentElement.style.opacity = "1";
    }
    // }
  }
});
