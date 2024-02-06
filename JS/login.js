window.addEventListener("DOMContentLoaded", function () {

  let visitors = Number(JSON.parse(localStorage.getItem("visitors"))) || 0;
  visitors++;
  localStorage.setItem("visitors", visitors);

  function loadData() {
    let FlowersDate;
    let SellerData;
    let UserData;
    let RequestSeller;
    let ChartOrder;
    // let favourites;
    sessionStorage.setItem("guestRequestorder", JSON.stringify([]));

    fetch("../Data.json")
      .then((response) => response.json())
      .then((data) => {
      
        FlowersDate = data.flowers;
        for (let i = 0; i<FlowersDate.length; i++) {
          FlowersDate[i]['reviews'] = new Array;
        }
        SellerData = data.sellers;
        UserData = data.users;
        // favourites = data.favourites;
        RequestSeller = data.request_seller;
        ChartOrder = data.CartOrders;

        localStorage.setItem("flowersData", JSON.stringify(FlowersDate));
        localStorage.setItem("sellerData", JSON.stringify(SellerData));
        localStorage.setItem("userData", JSON.stringify(UserData));
        localStorage.setItem("requestseller", JSON.stringify(RequestSeller));

        // localStorage.setItem("favourites", JSON.stringify(favourites));

        localStorage.setItem("ChartOrder", JSON.stringify(ChartOrder));

        let search_icon = this.document.querySelector(".search");
        console.log(search_icon);
        search_icon.addEventListener("click", function (e) {
          let search_input = document.querySelector(".search_input");
          search_input.classList.remove("none");
          search_input.classList.add("applaySearchStyle");
        });
      })
      .catch((error) => console.error("Error fetching products:", error));
  }
  if (localStorage.length <= 1) {
    loadData();
  }

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

      window.location.href = "seller.html";
    } else if (user && user.role === "admin") {
      logged_user(user, "admin");
      window.location.href = "admin.html";
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
      favourites: user.favourites,
    };
    sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
  }
});
