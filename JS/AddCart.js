window.addEventListener("load", function () {
  let ExistChartOrder = JSON.parse(localStorage.getItem("ChartOrder")) || [];
  var table = document.getElementById("orderTable");
  var tbody = document.getElementById("orderlist");
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
    let total = 0;
    for (let i = 0; i < ExistChartOrder.length; i++) {
      total += ExistChartOrder[i].quantity * ExistChartOrder[i].price;
    }
    return total.toFixed();
  }

  function getQuantity() {
    let quantity = 0;
    for (let i = 0; i < ExistChartOrder.length; i++) {
      quantity += ExistChartOrder[i].quantity;
    }
    return quantity;
  }
  function getPrice() {
    let price = 0;
    for (let i = 0; i < ExistChartOrder.length; i++) {
      price += ExistChartOrder[i].price;
    }
    return price.toFixed(2);
  }
  function createTable() {
    if (ExistChartOrder.length === 0) {
      var messageRow = document.createElement("tr");
      var messageCell = document.createElement("td");
      messageCell.colSpan = 5;

      var icon = document.createElement("i");
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
        var row = document.createElement("tr");
        row.id = ExistChartOrder[i].productId;
        var numberCell = document.createElement("td");
        numberCell.appendChild(
          document.createTextNode(ExistChartOrder[i].orderId)
        );
        row.appendChild(numberCell);

        var imgCell = document.createElement("td");
        imgCell.className = "order-img";
        var imge = document.createElement("img");
        imge.classList.add("rounded-circle");
        imge.src =
          "../images/flowers/" +
          getProductImgById(ExistChartOrder[i].productId);
        imge.width = "50";
        imge.height = "50";

        imgCell.appendChild(imge);
        row.appendChild(imgCell);

        var priceCell = document.createElement("td");
        priceCell.appendChild(
          document.createTextNode(ExistChartOrder[i].price)
        );
        row.appendChild(priceCell);

        var quantityCell = document.createElement("td");
        var input = document.createElement("input");
        input.value = ExistChartOrder[i].quantity;
        input.type = "number";
        input.min = "1";
        input.addEventListener("keyup", inTheStock);
        input.addEventListener("input", inTheStock);
        input.addEventListener("change", inTheStock);

        input.max = `${getStockQuantityById(ExistChartOrder[i].productId)}`;

        quantityCell.appendChild(input);
        row.appendChild(quantityCell);

        var removeCell = document.createElement("td");
        removeCell.innerHTML = `<i class="fa fa-trash" id="${ExistChartOrder[i].orderId}" style="color:red ;font-size:1.5rem"></i>`;
        removeCell.addEventListener("click", removeorder);
        row.appendChild(removeCell);

        tbody.appendChild(row);
      }

      table.appendChild(tbody);
    }
  }
  function inTheStock(event) {
    var productId = parseInt(event.target.parentNode.parentNode.id);
    var inputElement = event.target;
    handleQuantityChange(productId, inputElement);
  }

  function handleQuantityChange(productId, inputElement) {
    var enteredQuantity = parseInt(inputElement.value);

    if (!Number.isInteger(enteredQuantity) || enteredQuantity <= 0) {
      removeTable();
      createTable();
    } else if (enteredQuantity > getStockQuantityById(productId)) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "The quantity is not available right now",
        showConfirmButton: false,
        timer: 1500,
      });
      removeTable();
      createTable();
    } else {
      let index = ExistChartOrder.findIndex(
        (order) => order.productId == productId
      );
      ExistChartOrder[index].quantity = enteredQuantity;
      updateChartData(ExistChartOrder);
      removeTable();
      createTable();
      generateBill();
    }
  }

  function updateChartData(ExistChartOrder) {
    localStorage.setItem("ChartOrder", JSON.stringify(ExistChartOrder));
  }

  function getStockQuantityById(productId) {
    let flowers = JSON.parse(localStorage.getItem("flowersData")) || [];
    let product = flowers.find((flower) => flower.id === productId);
    if (product) {
      return product.stock;
    } else {
      return 0;
    }
  }

  function getProductImgById(id) {
    let resultOrdeId = ExistChartOrder.find((order) => order.productId === id);
    let searchedProduct = JSON.parse(localStorage.getItem("flowersData")) || [];
    let resultproduct = searchedProduct.find(
      (flower) => flower.id === resultOrdeId.productId
    );
    return resultproduct.image;
  }
  function removeTable() {
    tbody.innerHTML = ``;
  }
  function removeorder(event) {
    let index = ExistChartOrder.findIndex(
      (order) => order.orderId == event.target.id
    );
    ExistChartOrder.splice(index, 1);
    updateChartData(ExistChartOrder);
    removeTable();
    createTable();
    generateBill();
  }
});
