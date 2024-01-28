export function addProduct(product, rowDiv) {
  let card = document.createElement("div");
  card.classList.add("card", "col-12", "col-md-5", "col-lg-3");
  rowDiv.appendChild(card);

  let cardDetails = document.createElement("div");
  cardDetails.classList.add("card-details");
  card.appendChild(cardDetails);

  const iconsDiv = document.createElement("div");
  iconsDiv.classList.add("icons");
  iconsDiv.id = "icons";
  cardDetails.appendChild(iconsDiv);

  // const heartIconLink = document.createElement("a");
  // heartIconLink.href = "favourites.html";
  // heartIconLink.title = "Wishlist";

  const heartIcon = document.createElement("i");
  heartIcon.classList.add("fa-solid", "fa-heart", "for_wish");

  console.log(heartIcon);

  heartIcon.id = product.id;
  // productContainer = document.querySelector("#productContainer");
  iconsDiv.addEventListener("click", function (e) {
    let currentUser = [];
    // if the target element is heart
    // if (e.target.parentElement.classList.contains("for_wish")) {
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
    } else {
      Swal.fire("Sorry you must login first!");
    }
    let flowers = JSON.parse(window.localStorage.getItem("flowersData"));
    //    get heart id -> product id clicked
    let heartId = parseInt(e.target.parentElement.id); // svg is parentelement ,  target : icon <i></i>  need the id of  <svg id="i"><i ></i></svg>,
    //get product with the same id of heart
    let selflower = flowers.find((flower) => flower.id == heartId);
    // console.log(selflower);
    let favIcon = document.getElementById(e.target.parentElement.id);
    // console.log(favIcon);
    // to check the selected flower added before to  the favourites local storage or not.
    if (!currentUser.favorite.some((flower) => flower.id === heartId)) {
      // Add the flower to the favorites array
      currentUser.favorite.push(selflower);
      console.log(currentUser.favorite);
      favIcon.classList.add("active");

      // Save the updated favorites to sessionStorage

      // Print the updated state for debugging
      // console.log(currentUser);
    } else {
      currentUser.favorite.pop(selflower);
      console.log(currentUser.favorite);
      favIcon.classList.remove("active");
    }
    sessionStorage.setItem("loggedInUser", JSON.stringify(currentUser));

    //   window.localStorage.setItem("favourites", JSON.stringify(fav));
    // }
  });
  // console.log(JSON.parse(sessionStorage.getItem("loggedInUser"))['favorite']);
  if (sessionStorage.getItem("loggedInUser")) {
    let favourites =
      JSON.parse(sessionStorage.getItem("loggedInUser"))["favorite"] || [];
    for (let i = 0; i < favourites.length; i++) {
      if (product.id == favourites[i]["id"]) heartIcon.classList.add("active");
    }
  }
  // heartIcon.classList.add("active");
  heartIcon.style.fontSize = "2rem";
  iconsDiv.appendChild(heartIcon);

  const imgElement = document.createElement("img");
  imgElement.src = `../images/flowers/${product.image}`;
  imgElement.alt = "flower";
  cardDetails.appendChild(imgElement);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  cardDetails.appendChild(cardBody);

  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = product.name;
  cardBody.appendChild(cardTitle);

  const price = document.createElement("p");
  price.textContent = `${product.price} EGP`;
  cardBody.appendChild(price);

  const addToCartButton = document.createElement("button");
  addToCartButton.classList.add("cart");
  addToCartButton.setAttribute("id", `${product.id}`);
  addToCartButton.textContent = "Add to Cart";
  cardBody.appendChild(addToCartButton);
  // card.addEventListener("click", function () {
  //   localStorage.setItem("productToShow", JSON.stringify(product));
  //   window.open("../HTML pages/product_details.html", "_self");
  // });
}
export function wish(e) {
  // console.log("ss");
  let currentUser;
  // console.log(e.target);
  // if the target element is heart
  if (e.target.classList.contains("for_wish")) {
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
