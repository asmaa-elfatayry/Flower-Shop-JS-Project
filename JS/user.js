import * as editform from "./Authentication.js";
import * as updateprofile from "./EditUserProfile.js";
import {
  getdeliveredorder,
  getpendingorder,
  getProductImgById,
  getwhishlist,
  updateBadge,
} from "./order.js";

window.addEventListener("DOMContentLoaded", function () {
  updateBadge();
  let user = JSON.parse(sessionStorage.getItem("loggedInUser")) || [];
  let name = document.getElementById("name");
  let email = document.getElementById("email");

  name.innerText = `Name: ${user.name}`;
  email.innerText = `Email: ${user.email}`;
  getfavourites();
  getorders();

  document
    .getElementById("saveChangesBtn")
    .addEventListener("click", function () {
      let name_in = document.getElementsByTagName("input")[0].value;
      let email_in = document.getElementsByTagName("input")[1].value;
      let password_in = document.getElementsByTagName("input")[2].value;
      let password_in_new = document.getElementsByTagName("input")[3].value;
    

      if (!editform.valid_name(name_in.trim())) {
        editform.handleTheErrorMessage(
          0,
          "this is invalid name, can not contain space"
        );
      } else if (updateprofile.isEmailExists(email_in, user.id)) {
        editform.handleTheErrorMessage(
          1,
          "This email is already registered. Please use a different email."
        );
      } else if (email_in.trim() == 0 || !editform.isValidEmail(email_in)) {
        editform.handleTheErrorMessage(
          1,
          "This email is not a valid email,please try another one."
        );
      } else if (!editform.password_valid(password_in)) {
        editform.handleTheErrorMessage(
          2,
          "This is an invalid password. Please make sure it is at least 8 characters long and choose a complex one."
        );
      } else if (!editform.iscomplexPassword(password_in)) {
        editform.handleTheErrorMessage(
          2,
          "This is not a complex password. Please choose a password with at least 8 characters, including letters, digits, and special characters."
        );
      } 
      else if(!updateprofile.correctOldUserpassword(user.id,password_in))
      {
        editform.handleTheErrorMessage(
          2,
          "this not match the old password"
        );

      }
      else if(updateprofile.isnewPassworMatchOld(user.id,password_in_new))
      {
        editform.handleTheErrorMessage(
          3,
          "please choose new password"
        );

      }
      else {
        updateprofile.editprofile(
          user.id,
          name_in.trim(),
          email_in,
          password_in
        );
        $("#editprofile").modal("hide");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Data Updated",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  document
    .getElementById("editProfileUser")
    .addEventListener("click", function () {
      const currentUser = updateprofile.getcurrentuser();
      document.getElementsByTagName("input")[0].value = currentUser.name;
      document.getElementsByTagName("input")[1].value = currentUser.email;
    });
  function getorders() {
    let pendingOrders = getpendingorder();
    let deliveredOrders = getdeliveredorder();

    displayOrders("pendingOrders", pendingOrders);
    displayOrders("deliveredOrders", deliveredOrders);
  }
  function getfavourites() {
    let whishlist = getwhishlist();
    let parentDiv = document.getElementById("whishlist");
    let flowers = JSON.parse(localStorage.getItem("flowersData")) || [];
    if (whishlist.length == 0) {
      let noOrdersMessage = document.createElement("div");
      noOrdersMessage.style.display = "flex";
      noOrdersMessage.style.justifyContent = "center";
      noOrdersMessage.style.alignItems = "center";

      let messageParagraph = document.createElement("p");
      messageParagraph.textContent = "No favourites ^_⁠^";
      messageParagraph.style.fontSize = "1.3rem";
      noOrdersMessage.appendChild(messageParagraph);

      parentDiv.appendChild(noOrdersMessage);
      return;
    } else {
      for (let i = 0; i < whishlist.length; i++) {
        let div = document.createElement("div");
        div.classList.add("order-item");
        div.style.display = "flex";
        div.style.alignItems = "center";
        div.style.marginBottom = "20px";
        div.style.padding = "15px";
        div.style.border = "1px solid #ccc";
        div.style.borderRadius = "20px";

        let textContainer = document.createElement("div");
        textContainer.style.flex = "1";

        let productitem = flowers.filter((item) => {
          return item.id == whishlist[i];
        });

        //console.log(productitem);
        productitem.forEach((item) => {
          let p_name = document.createElement("p");
          p_name.textContent = "Name: " + item.name;
          textContainer.appendChild(p_name);

          let p_meaning = document.createElement("p");
          p_meaning.textContent = "Meaning: " + item.meaning;
          textContainer.appendChild(p_meaning);

          let p_category = document.createElement("p");
          p_category.textContent = "category: " + item.category;
          textContainer.appendChild(p_category);

          div.appendChild(textContainer);

          let p_image = document.createElement("img");
          let source = item.image;
          p_image.src = `../images/flowers/${source}`;
          p_image.classList.add("rounded-circle");
          p_image.width = "70";
          p_image.height = "70";
          div.appendChild(p_image);

          parentDiv.appendChild(div);
        });
      }
    }
  }

  function displayOrders(sectionId, orders) {
    let parentDiv = document.getElementById(sectionId);

    if (orders.length === 0) {
      let noOrdersMessage = document.createElement("div");
      noOrdersMessage.style.display = "flex";
      noOrdersMessage.style.justifyContent = "center";
      noOrdersMessage.style.alignItems = "center";

      let messageParagraph = document.createElement("p");
      messageParagraph.textContent = "No orders found :⁠'⁠(";
      messageParagraph.style.fontSize = "1.3rem";
      noOrdersMessage.appendChild(messageParagraph);

      parentDiv.appendChild(noOrdersMessage);
      return;
    }

    for (let i = 0; i < orders.length; i++) {
      let div = document.createElement("div");
      div.classList.add("order-item");
      div.style.display = "flex";
      div.style.alignItems = "center";
      div.style.marginBottom = "20px";
      div.style.padding = "15px";
      div.style.border = "1px solid #ccc";
      div.style.borderRadius = "20px";

      let textContainer = document.createElement("div");
      textContainer.style.flex = "1";

      let p_order = document.createElement("p");
      let orderDate = new Date(orders[i].date);
      orderDate = orderDate.toLocaleDateString();
      p_order.textContent = "Order Date: " + orderDate;
      textContainer.appendChild(p_order);

      let p_quantity = document.createElement("p");
      p_quantity.textContent = "Quantity: " + orders[i].quantity;
      textContainer.appendChild(p_quantity);

      div.appendChild(textContainer);

      let p_image = document.createElement("img");
      let source = getProductImgById(orders[i].productId);
      p_image.src = `../images/flowers/${source}`;
      p_image.classList.add("rounded-circle");
      p_image.width = "70";
      p_image.height = "70";
      div.appendChild(p_image);

      parentDiv.appendChild(div);
    }
  }
});
