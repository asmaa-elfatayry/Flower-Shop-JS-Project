import * as selAutho from "./Authentication.js";

window.addEventListener("DOMContentLoaded", function () {
  let save_sign = document.getElementById("sig_sel");
  save_sign.addEventListener("click", function (event) {
    let shop_name = document.getElementsByTagName("input")[0].value;
    let email = document.getElementsByTagName("input")[2].value;
    let password = document.getElementsByTagName("input")[3].value;
    let number_prod = document.getElementsByTagName("input")[4].value;
    let location_shop = document.getElementsByTagName("input")[1].value;

    event.preventDefault();
    if (!selAutho.valid_name(shop_name.trim())) {
      selAutho.handleTheErrorMessage(
        0,
        "this is invalid name ,please try again"
      );
    } else if (!selAutho.valid_name(location_shop.trim())) {
      selAutho.handleTheErrorMessage(
        1,
        "this is invalid name ,please try again"
      );
    } else if (selAutho.isEmailExistsSeller(email)) {
      selAutho.handleTheErrorMessage(
        2,
        "This email is already registered. Please use a different email."
      );
    } else if (email.trim() == 0 || !selAutho.isValidEmail(email)) {
      selAutho.handleTheErrorMessage(
        2,
        "This email is not a valid email,please try another one."
      );
    } else if (!selAutho.password_valid(password)) {
      selAutho.handleTheErrorMessage(
        3,
        "This is an invalid password. Please make sure it is at least 8 characters long and choose a complex one."
      );
    } else if (!selAutho.iscomplexPassword(password)) {
      selAutho.handleTheErrorMessage(
        3,
        "This is not a complex password. Please choose a password with at least 8 characters, including letters, digits, and special characters."
      );
    } else if (
      number_prod.trim() == 0 ||
      !selAutho.check_positive(number_prod)
    ) {
      selAutho.handleTheErrorMessage(
        4,
        "please enter a valid number of your products"
      );
    } else {
      document.getElementsByTagName("input")[0].classList.remove("is-invalid");
      document.getElementsByTagName("input")[1].classList.remove("is-invalid");
      document.getElementsByTagName("input")[2].classList.remove("is-invalid");
      document.getElementsByTagName("input")[3].classList.remove("is-invalid");
      document.getElementsByTagName("input")[4].classList.remove("is-invalid");

      document.getElementsByTagName("input")[0].value="";
      document.getElementsByTagName("input")[1].value="";
      document.getElementsByTagName("input")[2].value="";
      document.getElementsByTagName("input")[3].value="";
      document.getElementsByTagName("input")[4].value="";
      let message = document.getElementById("validation");
      message.style.display="none";


      seller_req(
        shop_name.trim(),
        email,
        password,
        number_prod,
        location_shop.trim()
      );
      document.getElementsByClassName("message")[0].innerHTML =
        '<div class="alert alert-success" role="alert">the request has been send successfuly.</div>';
    }
  });

  function seller_req(shop_name, email, password, number_prod, location_shop) {
    const requestdata = JSON.parse(localStorage.getItem("requestseller")) || [];
    const newrequest = {
      name: shop_name,
      contact: email,
      password: password,
      no_products: number_prod,
      location: location_shop,
    };

    requestdata.push(newrequest);
    localStorage.setItem("requestseller", JSON.stringify(requestdata));
  }
});
