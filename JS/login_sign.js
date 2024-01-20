window.addEventListener("load", function () {
  const signUpButton = document.getElementById("signUp");
  const signInButton = document.getElementById("signIn");
  const container = document.getElementById("container");

  signUpButton.addEventListener("click", () =>
    container.classList.add("right-panel-active")
  );

  signInButton.addEventListener("click", () =>
    container.classList.remove("right-panel-active")
  );

  let check_login = document.getElementById("log");
  let save_sign = document.getElementById("sig");

  save_sign.addEventListener("click", function () {
    let name = document.getElementsByTagName("input")[0].value;
    let email = document.getElementsByTagName("input")[1].value;
    let password = document.getElementsByTagName("input")[2].value;
    if (isEmailExists(email)) {
      let message = document.getElementById("validationemailExist");
      message.classList.add("invalid-feedback");
      document.getElementsByTagName("input")[1].classList.add("is-invalid");
      document.getElementsByTagName("input")[1].focus();
      message.innerText =
        "This email is already registered. Please use a different email.";
    } else {
      signUp(name, email, password);
    }
  });

  function isEmailExists(email) {
    const userData = JSON.parse(localStorage.getItem("userData")) || [];
    return userData.some((user) => user.email === email);
  }
  check_login.addEventListener("click", function () {
    let email = document.getElementsByTagName("input")[3].value;
    let password = document.getElementsByTagName("input")[4].value;
    login(email, password);
  });

  //login
  function login(email, password) {
    const userData = JSON.parse(localStorage.getItem("userData")) || [];
    const sellersData = JSON.parse(localStorage.getItem("sellerData")) || [];
    const user = userData.find(
      (u) => u.email === email && u.password === password
    );
    const seller = sellersData.find(
      (sel) => sel.contact === email && sel.password === password
    );

    let message = document.getElementById("validationuserExist");

    if (user && user.role === "user") {
      console.log("User logged in successfully:", user);
      message.classList.remove("invalid-feedback");
      message.innerText = "";
    } else if (seller) {
      console.log("Seller logged in successfully:", seller);

      message.classList.remove("invalid-feedback");
      message.innerText = "";
    } else if (user && user.role === "admin") {
      console.log("Admin logged in successfully:", user);
      message.classList.remove("invalid-feedback");
      message.innerText = "";
    } else {
      message.classList.add("invalid-feedback");
      message.innerText =
        "Invalid email or password. Please check your credentials.";
      document.getElementsByTagName("input")[3].classList.add("is-invalid");
      document.getElementsByTagName("input")[3].focus();
      document.getElementsByTagName("input")[4].classList.add("is-invalid");
    }
  }

  // signup
  function signUp(name, email, password) {
    const UserData = JSON.parse(localStorage.getItem("userData")) || [];
    const newUser = {
      id: UserData.length + 1,
      name: name,
      email: email,
      password: password,
      role: "user",
    };

    UserData.push(newUser);
    localStorage.setItem("userData", JSON.stringify(UserData));

    console.log("User signed up successfully:", newUser);
  }

  // Function to check the validity of an email address
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});
