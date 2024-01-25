import {
  displayProducts,
  ShowCharts,
  toggleTheme,
  ShowOrders,
  sellerProducts,
} from "./SellerDashboard.js";
window.addEventListener("load", function () {
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
  document.querySelector(".darkMood").addEventListener("click", toggleTheme);

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
