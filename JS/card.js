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
  if (currentUser) {
    let favourites = currentUser.favourites
    for (let i = 0; i < favourites.length; i++) {
      if (product.id == favourites[i]) heartIcon.classList.add("active");
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

  const addToCartButton = document.createElement("button");
  addToCartButton.classList.add("cart");
  addToCartButton.setAttribute("id", `${product.id}`);
  addToCartButton.textContent = "Add to Cart";
  cardBody.appendChild(addToCartButton);
  card.addEventListener("click", function (event) {
    // debugger;
    if (event.target.classList.contains("cart")) {
      addchart(event.target.id);
    }
    else if (event.target.parentElement.classList.contains("for_wish") || event.target.classList.contains("for_wish")) {
      console.log('hh');
      wish(product.id);
    }

    else if (event.target.classList.contains("for_wish") == false) {

      localStorage.setItem("productToShow", JSON.stringify(product));
      window.open("../HTML pages/product_details.html", "_self");
    }
  });
}

function wish(ID) {
  let currentUser = [];
  if (sessionStorage.getItem("loggedInUser") !== null) {
    currentUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    let userId = currentUser.id;
    let users = JSON.parse(localStorage.getItem('userData'));
    let favIcon = document.getElementById(ID);
    for (let i = 0; i < users.length; i++) {
      if (userId == users[i].id) {
        let heartId = parseInt(ID);
        if (favIcon.classList.contains('active')) {
          //remove
          for (let j = 0; j < users[i].favourites.length; j++) {
            if (users[i].favourites[j] == heartId) {
              users[i].favourites.splice(j, 1);
              break;
            }
          }
          favIcon.classList.remove("active");
        }
        else {
          //add
          users[i].favourites.push(heartId);
          favIcon.classList.add("active");
        }
        localStorage.setItem("userData", JSON.stringify(users));
        return;
      }
    }
  } else {
    Swal.fire("Sorry you must login first!");
  }
}

export function addchart(id) {
  //debugger;
  let CurrentUserData =JSON.parse(sessionStorage.getItem("loggedInUser")) || [];
  let TotalOrders = JSON.parse(localStorage.getItem("ChartOrder")) || [];
  let TotalOrdersg =
    JSON.parse(sessionStorage.getItem("guestRequestorder")) || [];
  let flowers = JSON.parse(localStorage.getItem("flowersData"));
  if (CurrentUserData.length!=0) {
    let p_id = parseInt(id);
    if (!order.order_is_exists(p_id)) {
      let found_prod = flowers.find((flower) => flower.id === p_id);
      let quantity = 1;
      let orderid;
      let price = found_prod.price;
      let sellerid = found_prod.seller.id;
      let date = new Date();
      let state = 0;
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
  } else {
    Swal.fire("please login first!");
    window.location.href = "login.html";
  }
}
