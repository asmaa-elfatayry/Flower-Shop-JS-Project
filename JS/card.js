import * as order from "./order.js";
export function addProduct(product, rowDiv) {
  //debugger;
  let card = document.createElement("div");
  card.classList.add("card", "col-12", "col-md-4", "col-lg-3");
  rowDiv.appendChild(card);

  let cardDetails = document.createElement("div");
  cardDetails.classList.add("card-details");
  card.appendChild(cardDetails);

  const iconsDiv = document.createElement("div");
  iconsDiv.classList.add("icons");
  iconsDiv.id = "icons";
  cardDetails.appendChild(iconsDiv);

  const heartIcon = document.createElement("i");
  heartIcon.classList.add("fa-solid", "fa-heart", "for_wish");

  let currentUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
  heartIcon.id = product.id;
  // ده علشان لما اليوزر اللي مسجل من قبل يجي يعمل لوجن تاني تتحمل الاراي اللي كان فيها العناصر المنضافة للمفضلة وهيضيف 
  // class active : اللي بتلون الايقونة بلون معين
  if (currentUser) {
    let favourites = currentUser.favourites;// currentUser.favourites: contains the id s of favourite products
    for (let i = 0; i < favourites.length; i++) {
      if (product.id == favourites[i]) {// favourites[i]: is id of product
        heartIcon.classList.add("active");//  active: is a class in index_style.css
      }
    }
  }
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
// add review 
  const stars = document.createElement("div");
  cardBody.appendChild(stars);
  let rate = 0;// the same product
  for (let i = 0; i < product.reviews.length; i++)// number of reviews objects for the same user
    rate += Number(product.reviews[i].rating);// total rate for the same product
  if (rate) rate = Math.ceil(rate / product.reviews.length);// average rate = total rating/#of objects(reviews)
  //rateبيجيب متوسط ال ratings الي اليوزرز كلهم ادوه
// rate: is the average of total rating of product for one user or more,الrating بيجيب متوسط ال ratings الي اليوزرز كلهم ادوه
  //Math.ceil() function is then used to round up the average rating to the nearest integer.
  for (let i = 0; i < 5; i++) {
    const reviewStarElement = document.createElement("span");
    reviewStarElement.classList.add("review-star");// for span
    const starIconElement = document.createElement("i");
    if (rate > i) starIconElement.classList.add("fa-solid", "fa-star");//The number of filled stars corresponds to the average rating, while the rest remain empty.
    else starIconElement.classList.add("fa-regular", "fa-star");
    reviewStarElement.appendChild(starIconElement);
    stars.appendChild(reviewStarElement);//     <span class="review-star"><i class="fa-regular fa-star"></i></span>
  }

  const addToCartButton = document.createElement("button");
  addToCartButton.classList.add("cart");
  addToCartButton.setAttribute("id", `${product.id}`);
  addToCartButton.textContent = "Add to Cart";
  cardBody.appendChild(addToCartButton);
  card.addEventListener("click", function (event) {
    // debugger;
    if (event.target.classList.contains("cart")) {
      addchart(event.target.id);
    } else if (
      event.target.parentElement.classList.contains("for_wish") ||
      event.target.classList.contains("for_wish")
    ) {
      wish(product.id);
    } else if (event.target.classList.contains("for_wish") == false) {
      localStorage.setItem("productToShow", JSON.stringify(product));
      window.open("../HTML pages/product_details.html", "_self");
    }
  });
}

export function wish(ID) {// product id == heartIcon id
  let currentUser = [];
  if (sessionStorage.getItem("loggedInUser") !== null) {
    currentUser = JSON.parse(sessionStorage.getItem("loggedInUser"));// returns object
    let userId = currentUser.id;
    let users = JSON.parse(localStorage.getItem("userData"));
    // userData: local storage contains the all users of website; user or admin roles
    let favIcon = document.getElementById(ID);
    for (let i = 0; i < users.length; i++) {
      if (userId == users[i].id) {// check if current user in localstorage called userdata,
        let heartId = parseInt(ID);// id of product
        if (favIcon.classList.contains("active")) {
          //remove
          for (let j = 0; j < users[i].favourites.length; j++) {//users[i].favourites.length: id of 
            if (users[i].favourites[j] == heartId) {
              users[i].favourites.splice(j, 1);
              break;
            }
          }
          favIcon.classList.remove("active");
        } else {
          //add
          users[i].favourites.push(heartId);
          favIcon.classList.add("active");
        }
        currentUser.favourites = users[i].favourites;
        sessionStorage.setItem("loggedInUser", JSON.stringify(currentUser));
        localStorage.setItem("userData", JSON.stringify(users));
        return;
      }
    }
  } else {// if no user in session storage ,
    Swal.fire("Sorry you must login first!");//1
    document// 2 go to login.html
      .querySelector("button.swal2-confirm.swal2-styled")
      .addEventListener("click", function () {
        window.location.href = "login.html";
      });
  }
}

export function addchart(id) {
  //debugger;
  let CurrentUserData =
    JSON.parse(sessionStorage.getItem("loggedInUser")) || [];
  let TotalOrders = JSON.parse(localStorage.getItem("ChartOrder")) || [];
  let TotalOrdersg =
    JSON.parse(localStorage.getItem("guestRequestorder")) || [];
  let flowers = JSON.parse(localStorage.getItem("flowersData"));

  let p_id = parseInt(id);
  if (!order.order_is_exists(p_id)) {
    let found_prod = flowers.find((flower) => flower.id === p_id);
    let quantity = 1;
    let orderid;
    let price = found_prod.price;
    let sellerid = found_prod.seller.id;
    let date = new Date();
    let state = "Pending";
    let isRemoved = false;
    let prodId = found_prod.id;
    let user;
    if (CurrentUserData.length == 0) {
      user = -1;
      orderid = TotalOrdersg.length + 1;
    } else {
      user = CurrentUserData.id;
      orderid = TotalOrders.length + 1;
    }
    let new_order = new order.Order(
      date,
      prodId,
      sellerid,
      quantity,
      price,
      orderid,
      state,
      isRemoved,
      user
    );
    if (CurrentUserData.length == 0) {
      TotalOrdersg.push(new_order.getOrderData());
      order.updateChartData(TotalOrdersg);
    } else {
      TotalOrders.push(new_order.getOrderData());
      order.updateChartData(TotalOrders);
    }
    order.updateBadge();
  } else {
    order.updateproductById(p_id);
    order.updateBadge();
  }
}
