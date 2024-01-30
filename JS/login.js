window.addEventListener("load", function () {
  let check_login = document.getElementById("log");
  let redirect_signUP = document.getElementById("signUp");

  check_login.addEventListener("click", function (event) {
    event.preventDefault();
    let email = document.getElementsByTagName("input")[0].value;
    let password = document.getElementsByTagName("input")[1].value;
    login(email, password);
  });

  redirect_signUP.addEventListener("click", function () {
    window.location.href = "signup.html";
  });

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
      logged_user(user, "user");
      window.location.href = "index.html";
    } else if (seller) {
      logged_user(seller, "seller");

      window.location.href = "../HTML Pages/seller.html";
    } else if (user && user.role === "admin") {
      logged_user(user, "admin");
      window.location.href = "../HTML Pages/admin.html";
    } else {
      document.getElementsByTagName("input")[0].classList.add("is-invalid");
      document.getElementsByTagName("input")[0].focus();
      document.getElementsByTagName("input")[1].classList.add("is-invalid");
      message.classList.add("invalid-feedback");
      message.style.display = "block";
      message.innerText =
        "Invalid email or password. Please check your credentials.";
    }
  }

  function logged_user(user, role) {
    const loggedInUser = {
      id: user.id,
      name: user.name,
      email: role === "seller" ? user.contact : user.email,
      role: role,
      favorite: [],
    };
    sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
  }
});
