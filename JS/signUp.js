window.addEventListener("load", function () {

  let save_sign = document.getElementById("sig");
  let redirect_signin = document.getElementById("signin");


  redirect_signin.addEventListener('click', function () {
    window.location.href = "login.html";
  });

  save_sign.addEventListener('click', function () {

    event.preventDefault();
    let name = document.getElementsByTagName("input")[0].value;
    let email = document.getElementsByTagName("input")[1].value;
    let password = document.getElementsByTagName("input")[2].value;
    let message = document.getElementById("validation");
    message.classList.remove("invalid-feedback");
    message.innerText = "";



    if (!valid_name(name)) {
      document.getElementsByTagName("input")[0].classList.remove("is-invalid");
      message.classList.add("invalid-feedback");
      document.getElementsByTagName("input")[0].classList.add("is-invalid");
      document.getElementsByTagName("input")[0].focus();
      message.style.display = "block";
      message.innerText = "this is invalid name ,please try again";


    }
    else if (isEmailExists(email)) {
      document.getElementsByTagName("input")[1].classList.remove("is-invalid");
      message.classList.add("invalid-feedback");
      document.getElementsByTagName("input")[1].classList.add("is-invalid");
      document.getElementsByTagName("input")[1].focus();
      message.style.display = "block";
      message.innerText = "This email is already registered. Please use a different email.";
    }

    else if (email.trim() == 0 || !isValidEmail(email)) {
      document.getElementsByTagName("input")[1].classList.remove("is-invalid");
      message.classList.add("invalid-feedback");
      document.getElementsByTagName("input")[1].classList.add("is-invalid");
      document.getElementsByTagName("input")[1].focus();
      message.style.display = "block";
      message.innerText = "This email is not a valid email,please try another one.";

    }
    else if (!password_valid(password)) {
      document.getElementsByTagName("input")[2].classList.remove("is-invalid");
      message.classList.add("invalid-feedback");
      document.getElementsByTagName("input")[2].classList.add("is-invalid");
      document.getElementsByTagName("input")[2].focus();
      message.style.display = "block";
      message.innerText = "This is an invalid password. Please make sure it is at least 8 characters long and choose a complex one.";
    } else if (!iscomplexPassword(password)) {
      document.getElementsByTagName("input")[2].classList.remove("is-invalid");
      message.classList.add("invalid-feedback");
      document.getElementsByTagName("input")[2].classList.add("is-invalid");
      document.getElementsByTagName("input")[2].focus();
      message.style.display = "block";
      message.innerText = "This is not a complex password. Please choose a password with at least 8 characters, including letters, digits, and special characters.";
    }

    else {
      document.getElementsByTagName("input")[0].classList.remove("is-invalid");
      document.getElementsByTagName("input")[1].classList.remove("is-invalid");
      document.getElementsByTagName("input")[2].classList.remove("is-invalid");
      signUp(name, email, password);
      
    }

  });
  function password_valid(password) {
    if (password.trim() == 0 || password.trim().length < 8) {
      return false
    }
    return true
  }

  function valid_name(name) {
    let reg = new RegExp('^[a-zA-Z][a-zA-Z0-9]{3,9}$');
    if (reg.test(name)) {
      return true;
    }
    return false;
  }


  function isEmailExists(email) {
    const userData = JSON.parse(localStorage.getItem("userData")) || [];
    return userData.some((user) => user.email === email);
  }

  // signup
  function signUp(name, email, password) {
    const UserData = JSON.parse(localStorage.getItem("userData")) || [];
    const newUser = {
      id: UserData.length + 1,
      name: name,
      email: email,
      password: password,
      role: 'user'
    };

    UserData.push(newUser);
    localStorage.setItem("userData", JSON.stringify(UserData));

    console.log("User signed up successfully:", newUser);
  }

  // Function to check the validity of an email address
  function isValidEmail(email) {
    const emailRegex = new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$');
    return emailRegex.test(email);
  }



  function iscomplexPassword(password) {
    const char = /[a-zA-Z]/.test(password);
    const digit = /\d/.test(password);
    const s_char = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return char && digit && s_char;
  }

});
