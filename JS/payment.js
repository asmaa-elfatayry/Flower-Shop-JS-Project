import {
  validateCVV,
  validateExpiryDate,
  validateCardNumber,
  ValidEmail,
  ValidPassword,
} from "./ValidationMoudule.js";
import { updateBadge } from "./order.js";
let chartOrderData;

document.addEventListener("DOMContentLoaded", function () {
  let visaCard = document.querySelector(".visa ");
  let paypalCard = document.querySelector(".paypal");
  // let ExistChartOrder = JSON.parse(localStorage.getItem("ChartOrder")) || [];
  //  clicked visa ->
  visaCard.addEventListener("click", function () {
    document.getElementById("visa").style.display = "block";
    document.getElementById("paypal").style.display = "none";
    visaCard.style.transform = "scale(1.3)";
    paypalCard.style.transform = "scale(.9)";
  });
  // paypal clicked ->
  paypalCard.addEventListener("click", function () {
    let allInputs = document.querySelectorAll("form input");
    allInputs.forEach((inp) => {
      inp.value = "";
    });
    document.getElementById("paypal").style.display = "block";
    document.getElementById("visa").style.display = "none";
    paypalCard.style.transform = "scale(1.3)";
    visaCard.style.transform = "scale(.9)";
  });

  function showSweetAlert() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire(
      "Success",

      " Thank You,Have A Nice Day With Floura :)"
    );
  }

  function resetErrorMessages() {
    let errorElements = document.querySelectorAll(".error");
    errorElements.forEach((element) => {
      element.textContent = "";
    });
  }

  function showError(errorElementId, message) {
    let errorElement = document.getElementById(errorElementId);
    errorElement.textContent = message;
  }
  function validatePaypalForm(event) {
    event.preventDefault();

    let rows = document.querySelectorAll("#orderlist tr");
    let totalPrice = JSON.parse(localStorage.getItem("totalPrice")) || 0;
    for (let i = 0; i < rows.length; i++) {
      totalPrice += Math.floor(Number(rows[i].children[4].textContent));
    }
    localStorage.setItem("totalPrice", totalPrice);

    let paypalEmail = document.getElementById("paypalEmail");
    let paypalPassword = document.getElementById("paypalPassword");
    chartOrderData = JSON.parse(localStorage.getItem("ChartOrder")) || [];
    resetErrorMessages();
    if (!ValidEmail(paypalEmail.value)) {
      showError("paypalEmailError", "Invalid Email");
      return;
    }

    if (!ValidPassword(paypalPassword.value)) {
      showError("paypalPasswordError", "Invalid Password");
      return;
    }
    updatePaidNoForProducts(chartOrderData);
  }
  function validateVisaForm(event) {
    event.preventDefault();

    let rows = document.querySelectorAll("#orderlist tr");
    let totalPrice = JSON.parse(localStorage.getItem("totalPrice")) || 0;
    for (let i = 0; i < rows.length; i++) {
      totalPrice += Math.floor(Number(rows[i].children[4].textContent));
    }
    localStorage.setItem("totalPrice", totalPrice);

    let visaCardNumber = document.getElementById("visaCardNumber");
    let visaCardHolder = document.getElementById("visaCardHolder");
    let visaExpiresMonth = document.getElementById("visaExpiresMonth");
    let visaExpiresYear = document.getElementById("visaExpiresYear");
    let visaCVV = document.getElementById("visaCVV");
    chartOrderData = JSON.parse(localStorage.getItem("ChartOrder")) || [];

    resetErrorMessages();

    if (!validateCardNumber(visaCardNumber.value)) {
      showError("visaCardNumberError", "Invalid Card Number");
      return;
    }

    if (visaCardHolder.value.trim() === "") {
      showError("visaCardHolderError", "Card Holder Name cannot be empty");
      return;
    }

    if (!validateExpiryDate(visaExpiresMonth.value, visaExpiresYear.value)) {
      showError("visaExpiresMonthError", "Invalid Expiry Date");
      return;
    }

    if (!validateCVV(visaCVV.value)) {
      showError("visaCVVError", "Invalid CVV");
      return;
    }
    updatePaidNoForProducts(chartOrderData);
  }

  document
    .querySelectorAll(".confirm")[0]
    .addEventListener("click", validateVisaForm);
  document
    .querySelectorAll(".confirm")[1]
    .addEventListener("click", validatePaypalForm);

  function ClearInputs() {
    document.querySelector("#paymentModal").style.display = "none";
    document.querySelector(".overlay").style.display = "none";
    const allInputs = document.querySelectorAll("form input");
    // let inputs=document.querySelector(".form-control")
    allInputs.forEach((inp) => {
      inp.value = "";
    });
  }
  let totalorders = JSON.parse(localStorage.getItem("order")) || [];

  let order = [];
  function removeCartOrdersAfterChecked() {
    // debugger;
    let currentUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    let userId;
    if (currentUser) {
      userId = currentUser.id;
      for (let i = 0; i < chartOrderData.length; i++) {
        if (chartOrderData[i].user == userId) {
          order = chartOrderData.splice(i, 1);
          i--;
          order.forEach((ord) => {
            totalorders.push(ord);
          });

          localStorage.setItem("order", JSON.stringify(totalorders)); // will be a history for all
          // localStorage.setItem(
          //   "sellerOrdersControl",
          //   JSON.stringify(totalorders)
          // ); //to handle in seller
          localStorage.setItem("ChartOrder", JSON.stringify(chartOrderData));
        }
      }
    }
  }
  function updateTapleNoOrder() {
    document.querySelector("#orderlist").innerHTML = "";
    let tr = document.createElement("tr");

    let td = document.createElement("td");
    td.innerHTML = `<td text-center><i class="fa fa-ban mr-2" style="color: red; font-size: 1.5rem;"></i>  No orders available.</td>`;
    td.colSpan = 6;
    tr.append(td);
    document.querySelector("#orderlist").append(tr);
  }

  function updatePaidNoForProducts(soldProducts) {
    let flowers = JSON.parse(localStorage.getItem("flowersData")) || [];
    soldProducts.forEach((soldProduct) => {
      let product = flowers.find(
        (flower) => flower.id === soldProduct.productId
      );

      if (product && product.stock > 0) {
        product.paidno = (product.paidno || 0) + soldProduct.quantity;
        product.stock -= soldProduct.quantity;

        ClearInputs();
        showSweetAlert();
        removeCartOrdersAfterChecked();
        updateTapleNoOrder();
        updateBadge();
        document
          .querySelector("button.swal2-confirm.btn.btn-success")
          .addEventListener("click", function () {
            // console.log("done");
            window.location.href = "../HTML Pages/index.html";
          });

        // createTable();
      } else if (product.stock < 1) {
        Swal.fire("Sorry, The Product Not Avalible Now!");
        ClearInputs();
      }
    });

    //->update data
    localStorage.setItem("flowersData", JSON.stringify(flowers));
  }
});
