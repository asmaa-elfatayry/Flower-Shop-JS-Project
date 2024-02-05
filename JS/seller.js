import {
  displayProducts,
  ShowCharts,
  toggleTheme,
  ShowOrders,
  sellerProducts,
} from "./SellerDashboard.js";
window.addEventListener("DOMContentLoaded", function () {
  let curUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
  if (!curUser || curUser.role != "seller") {
    let error = document.createElement("div");
    let head404 = document.createElement("h1");
    let miniHead404 = document.createElement("h3");
    let paragraph404 = document.createElement("p");
    paragraph404.textContent =
      "The resource requested could not be found on this server";
    head404.textContent = "404";
    miniHead404.innerText = "Not Found";
    error.classList.add("page-not-found");
    error.appendChild(head404);
    error.appendChild(miniHead404);
    error.appendChild(paragraph404);
    document.body.innerHTML = "";
    document.body.style.backgroundColor = "#FFF";
    document.body.appendChild(error);
    error.appendChild();
    return;
  }
  // displayProducts(sellerProducts);
  ShowCharts();
  //start handling toggle left controls

  document
    .querySelector(".productControl")
    .addEventListener("click", function () {
      displayProducts(sellerProducts);
    });
  document.querySelector(".toggleInfo").addEventListener("click", function () {
    document.getElementById("sellerInfoContainer").classList.toggle("showInfo");
  });

  document.querySelector(".orders").addEventListener("click", ShowOrders);
  document.querySelector(".charts").addEventListener("click", ShowCharts);
  // document.querySelector(".darkMood").addEventListener("click", toggleTheme);

  document.querySelector(".logout").addEventListener("click", function () {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Do You Want Logout?",
        showCancelButton: true,
        icon: "warning",
        cancelButtonText: "No",
        confirmButtonText: "Yes ",
      })
      .then((result) => {
        if (result.isConfirmed) {
          location.assign("login.html");
        }
      });
  });
});
