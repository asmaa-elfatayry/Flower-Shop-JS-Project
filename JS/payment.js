document.addEventListener("DOMContentLoaded", function () {
  // create user data containers
  function createUserDataPayment() {
    let container = document.createElement("div");
    container.className = "card-info alert alert-warning";
    container.innerHTML = `<p><label>UserName:</label> <span>test</span></p>
          <p><label>Total Price:</label> <span>33$</span></p>`;
    let visaContainer = container.cloneNode(true);
    let paypalContainer = container.cloneNode(true);

    document.querySelector(".visa .form-card").prepend(visaContainer);
    document.querySelector(".paypal .form-card").prepend(paypalContainer);
  }

  createUserDataPayment();

  let visaCard = document.querySelector(".visa .top-card");
  let paypalCard = document.querySelector(".paypal .top-card");

  visaCard.addEventListener("click", function () {
    visaCard.style.transform = "translateX(-50%) scale(1.3)";
    visaCard.nextElementSibling.style.display = "block";

    paypalCard.style.transform = "translateX(-50%) scale(0.7)";
    paypalCard.nextElementSibling.style.display = "none";

    document.body.style.backgroundColor = "#F0F0F0";
  });

  paypalCard.addEventListener("click", function () {
    paypalCard.style.transform = "translateX(-50%) scale(1.3)";
    paypalCard.nextElementSibling.style.display = "block";

    visaCard.style.transform = "translateX(-50%) scale(0.7)";
    visaCard.nextElementSibling.style.display = "none";

    document.body.style.backgroundColor = "lavender";
  });

  function showSweetAlert() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        imageUrl: "../images/payment.gif",
        imageWidth: 200,
        imageHeight: 200,
        // icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancel ",
        confirmButtonText: "Confirm Process",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Success",

            " Thank You,Have A Nice Day With Floura :)"
          );
        }
      });
  }

  function ValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function ValidPassword(password) {
    return password.length >= 6;
  }
  function validateCardNumber(cardNumber) {
    return /^\d{16}$/.test(cardNumber);
  }

  function validateExpiryDate(month, year) {
    const currentYear = new Date().getFullYear().toString().slice(2);
    const currentMonth = new Date().getMonth() + 1;
    return (
      /^\d{2}$/.test(month) &&
      /^\d{2}$/.test(year) &&
      (year > currentYear || (year == currentYear && month >= currentMonth))
    );
  }

  function validateCVV(cvv) {
    return /^\d{3,4}$/.test(cvv);
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
    showSweetAlert();
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
    showSweetAlert();
  }
  //let confirmButtons = document.querySelectorAll(".confirm");
  document
    .querySelectorAll(".confirm")[0]
    .addEventListener("click", validateVisaForm);
  document
    .querySelectorAll(".confirm")[1]
    .addEventListener("click", validatePaypalForm);
});
