import {
  validateCVV,
  validateExpiryDate,
  validateCardNumber,
  ValidEmail,
  ValidPassword,
} from "./ValidationMoudule.js";
import { getuserorder } from "./order.js";
document.addEventListener("DOMContentLoaded", function () {
  let visaCard = document.querySelector(".visa ");
  let paypalCard = document.querySelector(".paypal");
  let ExistChartOrder = JSON.parse(localStorage.getItem("ChartOrder")) || [];
  visaCard.addEventListener("click", function () {
    document.getElementById("visa").style.display = "block";
    document.getElementById("paypal").style.display = "none";
    visaCard.style.transform = "scale(1.3)";
    paypalCard.style.transform = "scale(.9)";
  });

  paypalCard.addEventListener("click", function () {
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
    let paypalEmail = document.getElementById("paypalEmail");
    let paypalPassword = document.getElementById("paypalPassword");
    resetErrorMessages();
    if (!ValidEmail(paypalEmail.value)) {
      showError("paypalEmailError", "Invalid Email");
      return;
    }

    if (!ValidPassword(paypalPassword.value)) {
      showError("paypalPasswordError", "Invalid Password");
      return;
    }
    updatePaidNoForProducts(ExistChartOrder);
  }
  function validateVisaForm(event) {
    event.preventDefault();

    let visaCardNumber = document.getElementById("visaCardNumber");
    let visaCardHolder = document.getElementById("visaCardHolder");
    let visaExpiresMonth = document.getElementById("visaExpiresMonth");
    let visaExpiresYear = document.getElementById("visaExpiresYear");
    let visaCVV = document.getElementById("visaCVV");

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
    updatePaidNoForProducts(ExistChartOrder);
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
    allInputs.forEach((inp) => {
      inp.value = "";
    });
  }
  let chartOrderData = JSON.parse(localStorage.getItem("ChartOrder")) || [];
  localStorage.setItem("order", JSON.stringify([]));
  let order = [];

  function removeCartOrdersAfterChecked(currentUserOrder) {
    let userId = JSON.parse(sessionStorage.getItem("loggedInUser"));
    userId = userId.id;
    console.log(chartOrderData);
    // console.log(currentUserOrder);
    // console.log(chartOrderData);
    for (let i = 0; i < chartOrderData.length; i++) {
      console(chartOrderData);
      if (Number(chartOrderData[i].user) == userId) {
        console(chartOrderData);
        console.log(i);
        order.push(chartOrderData[i]);
        chartOrderData.splice(i, 1);
        localStorage.setItem("order", JSON.stringify(order));
      }
      // if(currentUserOrder[i].user == )
      // const index = chartOrderData.indexOf(currentUserOrder[i]);
      // if (index !== -1) {
      //   chartOrderData.splice(index, 1);
      // }
    }
  }
  //

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
        //
        // chartOrderData = localStorage.getItem("ChartOrder");
        let currentuserorders = getuserorder();
        removeCartOrdersAfterChecked(currentuserorders);

        if (chartOrderData) {
          let parsedData = chartOrderData;
          parsedData.forEach((orderI) => orderI.id);

          let clonedData = JSON.parse(JSON.stringify(parsedData));

          localStorage.setItem("ChartOrder", JSON.stringify([]));
        }
      } else if (product && soldProduct.state == 0) {
        // alert("Sorry seller must approve first");
        console.log(product);
        console.log(soldProduct.state);
        Swal.fire("Sorry seller must approve first");
        ClearInputs();
      } else {
        Swal.fire("Sorry, The Product Not Avalible Now!");
        ClearInputs();
      }
    });

    //->update data
    localStorage.setItem("flowersData", JSON.stringify(flowers));
  }
});
