import * as sigAutho from "./Authentication.js";
window.addEventListener("DOMContentLoaded", function () {
  let save_sign = document.getElementById("sig");
  let redirect_signin = document.getElementById("signin");

  redirect_signin.addEventListener("click", function () {
    window.location.href = "login.html";
  });

  save_sign.addEventListener("click", function () {
    event.preventDefault();
    let name = document.getElementsByTagName("input")[0].value;
    let email = document.getElementsByTagName("input")[1].value;
    let password = document.getElementsByTagName("input")[2].value;
    let password_new = document.getElementsByTagName("input")[3].value;

    if (!sigAutho.valid_name(name.trim())) {
      sigAutho.handleTheErrorMessage(
        0,
        "this is invalid name ,please try again"
      );
    } else if (sigAutho.isEmailExists(email)) {
      sigAutho.handleTheErrorMessage(
        1,
        "This email is already registered. Please use a different email."
      );
    } else if (email.trim() == 0 || !sigAutho.isValidEmail(email)) {
      sigAutho.handleTheErrorMessage(
        1,
        "This email is not a valid email,please try another one."
      );
    } else if (!sigAutho.password_valid(password)) {
      sigAutho.handleTheErrorMessage(
        2,
        "This is an invalid password. Please make sure it is at least 8 characters long and choose a complex one."
      );
    } else if (!sigAutho.iscomplexPassword(password)) {
      sigAutho.handleTheErrorMessage(
        2,
        "This is not a complex password. Please choose a password with at least 8 characters, including letters, digits, and special characters."
      );
    } 
    else if(!sigAutho.matchpassword(password,password_new))
    {
      sigAutho.handleTheErrorMessage(
        3,
        "your passwords dosent match"
      );
    }
    else {
      const user_n_id = signUp(name.trim(), email, password);
      const loggedInUser = {
        id: user_n_id,
        name: name.trim(),
        email: email,
        role: "user",
        favourites: [],

      };
      sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      window.location.href = "index.html";
    }
  });

  function signUp(name, email, password) {
    const UserData = JSON.parse(localStorage.getItem("userData")) || [];
    const newUser = {
      id: UserData.length + 1,
      name: name,
      email: email,
      password: password,
      role: "user",
      favourites: [],
    };

    UserData.push(newUser);
    localStorage.setItem("userData", JSON.stringify(UserData));
    return newUser.id;
  }
});
