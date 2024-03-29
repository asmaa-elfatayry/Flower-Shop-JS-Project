import * as order from "./order.js";
window.addEventListener("DOMContentLoaded", function () {
  let currentuser = JSON.parse(sessionStorage.getItem("loggedInUser")) || [];
  let table = document.getElementById("orderTable");
  let tbody = document.getElementById("orderlist");
  let price = document.getElementById("price");
  let quantity = document.getElementById("quantity");
  let total = document.getElementById("total");

  createTable();
  generateBill();
  function generateBill() {
    price.innerText = `Price: ${getPrice()}`;
    quantity.innerText = `Total Quantity: ${getQuantity()}`;
    total.innerText = `Total: ${getTotal()}`;
  }
  function getTotal() {
    let ExistChartOrder = order.getuserorder();
    let total = 0;
    for (let i = 0; i < ExistChartOrder.length; i++) {
      total += ExistChartOrder[i].quantity * ExistChartOrder[i].price;
    }
    return total.toFixed();
  }
  function getQuantity() {
    let ExistChartOrder = order.getuserorder();
    let quantity = 0;
    for (let i = 0; i < ExistChartOrder.length; i++) {
      quantity += ExistChartOrder[i].quantity;
    }
    return quantity;
  }
  function getPrice() {
    let ExistChartOrder = order.getuserorder();
    let price = 0;
    for (let i = 0; i < ExistChartOrder.length; i++) {
      price += ExistChartOrder[i].price;
    }
    return price.toFixed(2);
  }
  function getPriceForProduct(i) {
    let ExistChartOrder = order.getuserorder();
    let price = 0;
    price = ExistChartOrder[i].price * ExistChartOrder[i].quantity;
    return price.toFixed(2);
  }
  function createTable() {
    let ExistChartOrder = order.getuserorder();
    if (ExistChartOrder.length === 0) {
      let messageRow = document.createElement("tr");
      let messageCell = document.createElement("td");
      messageCell.colSpan = 6;

      let icon = document.createElement("i");
      icon.classList.add("fa", "fa-ban", "mr-2");
      icon.style.color = "red";
      icon.style.fontSize = "1.5rem";
      messageCell.appendChild(icon);

      messageCell.appendChild(
        document.createTextNode("  No orders available.")
      );
      messageRow.appendChild(messageCell);
      tbody.appendChild(messageRow);
    } else {
      for (let i = 0; i < ExistChartOrder.length; i++) {
        let row = document.createElement("tr");
        row.id = ExistChartOrder[i].productId;
        let numberCell = document.createElement("td");
        numberCell.appendChild(
          document.createTextNode(ExistChartOrder[i].orderId)
        );
        row.appendChild(numberCell);

        let imgCell = document.createElement("td");
        imgCell.className = "order-img";
        let imge = document.createElement("img");
        imge.classList.add("rounded-circle");
        imge.src =
          "../images/flowers/" +
          order.getProductImgById(ExistChartOrder[i].productId);
        imge.width = "50";
        imge.height = "50";
        imgCell.appendChild(imge);
        row.appendChild(imgCell);

        let priceCell = document.createElement("td");
        priceCell.appendChild(
          document.createTextNode(ExistChartOrder[i].price)
        );
        row.appendChild(priceCell);

        let quantityCell = document.createElement("td");
        let input = document.createElement("input");
        input.value = ExistChartOrder[i].quantity;
        input.type = "number";
        input.min = "1";
        input.addEventListener("input", function (event) {
          validQuantity(
            event.target,
            ExistChartOrder[i].productId,
            ExistChartOrder[i].price,
            ExistChartOrder[i].quantity
          );
        });
        input.addEventListener("change", function (event) {
          validQuantity(
            event.target,
            ExistChartOrder[i].productId,
            ExistChartOrder[i].price,
            ExistChartOrder[i].quantity
          );
        });

        input.max = `${order.getStockQuantityById(
          ExistChartOrder[i].productId
        )}`;
        quantityCell.appendChild(input);
        row.appendChild(quantityCell);

        let Totalprice = document.createElement("td");
        Totalprice.appendChild(document.createTextNode(getPriceForProduct(i)));
        row.appendChild(Totalprice);

        let removeCell = document.createElement("td");
        removeCell.innerHTML = `<i class="fa fa-trash" id="${ExistChartOrder[i].orderId}" style="color:red ;font-size:1.5rem"></i>`;
        removeCell.addEventListener("click", removeorder);
        row.appendChild(removeCell);

        tbody.appendChild(row);
      }

      table.appendChild(tbody);
    }
  }

  function validQuantity(inputElement, productId, price, quantity) {
    let enteredQuantity = parseInt(inputElement.value);
    let availableStock = order.getStockQuantityById(productId);
    var totalPriceCell = inputElement.parentElement.nextElementSibling;

    if (!Number.isInteger(enteredQuantity) || enteredQuantity <= 0) {
      inputElement.value = quantity;
      Swal.fire({
        position: "center",
        icon: "error",
        title: "It's not a valid quantity",
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (enteredQuantity > availableStock) {
      inputElement.value = quantity;
      Swal.fire({
        position: "center",
        icon: "error",
        title: "The entered quantity exceeds available stock",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      order.updateproduct(productId, enteredQuantity);
      generateBill();
      inputElement.value = enteredQuantity;
      totalPriceCell.innerText = (price * enteredQuantity).toFixed(2);
    }
  }

  function removeTable() {
    tbody.innerHTML = ``;
  }
  function removeorder(event) {
    let TotalOrders = order.getTotalorders();
    let index;
    if (currentuser.length == 0) {
      index = TotalOrders.findIndex(
        (order) => order.orderId == event.target.id
      );
    } else {
      index = TotalOrders.findIndex(
        (order) =>
          order.orderId == event.target.id && order.user == currentuser.id
      );
    }
    TotalOrders.splice(index, 1);
    order.updateChartData(TotalOrders);
    order.updateBadge();
    removeTable();
    createTable();
    generateBill();
  }
  //open payment
  let ExistChartOrder = order.getuserorder();
  this.document
    .querySelector(".checkout")
    .addEventListener("click", function () {
      if (sessionStorage.getItem("loggedInUser") == null) {
        Swal.fire("please login first!");
        document
          .querySelector("button.swal2-confirm.swal2-styled")
          .addEventListener("click", function () {
            window.location.href = "login.html";
          });
      } else {
        if (ExistChartOrder.length > 0) {
          document.querySelector("#paymentModal").style.display = "block";
          document.querySelector(".overlay").style.display = "block";
        } else {
          Swal.fire("No orders available!");
        }
      }
    });

  this.document
    .querySelector(".btn-close")
    .addEventListener("click", function () {
      document.querySelector("#paymentModal").style.display = "none";
      document.querySelector(".overlay").style.display = "none";
    });
});
