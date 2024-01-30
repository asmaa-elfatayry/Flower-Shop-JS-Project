import * as order from "./order.js";
window.addEventListener("load", function () {
  // // Get the current date
  // const currentDate = new Date();
  // // Calculate the previous month and year
  // const lastMonth = currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1;
  // const lastYear = lastMonth === 11 ? currentDate.getFullYear() - 1 : currentDate.getFullYear();
  // // Create a key for the previous month and year
  // const lastMonthYear = `${lastMonth + 1}-${lastYear}`;
  // // Retrieve the stored visitor data from localStorage
  // let visitorData = JSON.parse(localStorage.getItem("visitorData")) || {};
  // // Check if the last month's data exists
  // if (!visitorData[lastMonthYear]) {
  //   // If not, initialize the count for the last month
  //   visitorData[lastMonthYear] = 0;
  // }
  // // Increment the visitor count for the last month
  // visitorData[lastMonthYear]++;
  // // Save the updated visitor data back to localStorage
  // localStorage.setItem("visitorData", JSON.stringify(visitorData));
  // // Access the last month's visitor count
  // const lastMonthVisitorCount = visitorData[lastMonthYear];
  // // Log or display the visitor count for the last month
  // console.log(`Visitors for ${lastMonthYear}: ${lastMonthVisitorCount}`);
  let visitors = Number(JSON.parse(localStorage.getItem("visitors")));
  visitors++;
  localStorage.setItem("visitors", visitors)

  function loadData() {
    let FlowersDate;
    let SellerData;
    let UserData;
    let RequestSeller;
    let ChartOrder;
    let favourites;
    sessionStorage.setItem("guestRequestorder", JSON.stringify([]));

    fetch("../Data.json")
      .then((response) => response.json())
      .then((data) => {
        FlowersDate = data.flowers;
        for (let i = 0; i < FlowersDate.length; i++) {
          FlowersDate[i]["reviews"] = new Array();
        }
        SellerData = data.sellers;
        UserData = data.users;
        favourites = data.favourites;
        RequestSeller = data.request_seller;
        ChartOrder = data.CartOrders;

        localStorage.setItem("flowersData", JSON.stringify(FlowersDate));
        localStorage.setItem("sellerData", JSON.stringify(SellerData));
        localStorage.setItem("userData", JSON.stringify(UserData));
        localStorage.setItem("requestseller", JSON.stringify(RequestSeller));

        localStorage.setItem("favourites", JSON.stringify(favourites));

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
  
  if (localStorage.length === 0) {
    loadData();
  }

  let loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser")) || [];
  let navContainer = this.document.querySelector(".nav-item.dropdown");

  if (navContainer) {
    if (localStorage.length == 0) {
      loadData();
    }

    let CheckLogedUser =
      JSON.parse(sessionStorage.getItem("loggedInUser")) || [];

    if (CheckLogedUser.length != 0 && CheckLogedUser.role == "user") {
      this.document.querySelector(".nav-item.dropdown").style.display = "none";
      this.document.querySelector(".ifUserLogged").style.display = "flex";
      let logoutLink = document.querySelector(".logout");
      if (logoutLink) {
        logoutLink.addEventListener("click", function () {
          sessionStorage.removeItem("loggedInUser");
          window.location.href = "../index.html";
        });
      }
    } else {
      this.document.querySelector(".nav-item.dropdown").style.display = "flex";
      this.document.querySelector(".ifUserLogged").style.display = "none";
    }
  }
  order.updateBadge();
});
