import {
  validateNumberInput,
  validateTextInput,
  validateFileInput,
} from "./ValidationMoudule.js";
let myspan = document.querySelector(".typeOf");
let flag;
let sellerId;
const loggedInUserData = sessionStorage.getItem("loggedInUser");

if (loggedInUserData) {
  const loggedInUser = JSON.parse(loggedInUserData);

  sellerId = loggedInUser.id;
}
// const sellerId = parseInt(localStorage.getItem("sellerId")) || 1;
console.log(sellerId);
let FlowersDate = JSON.parse(localStorage.getItem("flowersData")) || [];
let sellerData = JSON.parse(localStorage.getItem("sellerData")) || [];

function getSellerById(sellerId) {
  return sellerData.find((seller) => seller.id === sellerId);
}

function displaySellerInfo(sellerData) {
  document.querySelector(
    ".sellerName"
  ).innerHTML = `<i class="fa fa-user pr-2"></i> ${sellerData.name}`;
  document.querySelector(
    ".location"
  ).innerHTML = `<i class="fa fa-map-marker pr-2"></i> ${sellerData.location}`;
}

// Initialize the page
const seller = getSellerById(sellerId);

if (seller) {
  displaySellerInfo(seller);
} else {
  console.error(`Seller with ID ${sellerId} not found`);
}

export let sellerProducts = FlowersDate.filter(
  (product) => product.seller.id === sellerId
);

//
export function ShowCharts() {
  //   document.querySelector(".controls").innerHTML = "";
  const chartParent = document.querySelector(".chart-parent");
  chartParent.innerHTML = "";
  document.querySelector(".chart-parent").style.display = "flex";
  document.querySelector(".dynamic-section").style.display = "none";
  myspan.textContent = "Charts Page";
  let ctx1 = document.createElement("canvas");
  ctx1.width = 400;
  ctx1.height = 200;
  ctx1.classList.add("myChart");
  document.querySelector(".chart-parent").appendChild(ctx1);

  // console.log(FlowersDate[0]["seller"]);
  const filteredFlowers = FlowersDate.filter(
    (product) => product["seller"].id === sellerId && product.stock > 0
  );
  console.log(filteredFlowers);

  const barChartConfig = {
    type: "bar",
    data: {
      labels: filteredFlowers.map((data) => data.name),
      datasets: [
        {
          label: "Stock Numbers",
          data: filteredFlowers.map((data) => data.stock),
          backgroundColor: "#ca9cbc",
          borderColor: "lavender",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  new Chart(ctx1, barChartConfig);
  //second char
  let ctx2 = document.createElement("canvas");
  ctx2.width = 400;
  ctx2.height = 200;
  ctx2.classList.add("myChart");
  document.querySelector(".chart-parent").appendChild(ctx2);

  const filteredPaidFlowers = FlowersDate.filter(
    (product) => product["seller"].id === sellerId
  );
  console.log(filteredPaidFlowers);

  const barChartConfig2 = {
    type: "bar",
    data: {
      labels: filteredPaidFlowers.map((data) => data.name),
      datasets: [
        {
          label: "Product Paid Numbers",
          data: filteredPaidFlowers.map((data) => data.paidNo),
          backgroundColor: "#c7dbef",
          borderColor: "lavender",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          stepSize: 1,
        },
      },
    },
  };

  new Chart(ctx2, barChartConfig2);
}
// end charts page

// display products
export function displayProductRow(product, type) {
  const row = document.createElement("tr");

  const idCell = document.createElement("td");
  idCell.textContent = product.id;
  row.appendChild(idCell);

  const nameCell = document.createElement("td");
  nameCell.textContent = product.name;
  row.appendChild(nameCell);

  const priceCell = document.createElement("td");
  priceCell.textContent = product.price;
  row.appendChild(priceCell);

  const imageCell = document.createElement("td");
  imageCell.className = "productS-img";
  const image = document.createElement("img");
  image.classList.add("rounded-circle");
  image.src = `../images/flowers/${product.image}`;
  image.alt = product.name;
  image.width = 50;
  image.height = 50;
  imageCell.appendChild(image);
  row.appendChild(imageCell);

  const categoryCell = document.createElement("td");
  categoryCell.textContent = product.category;
  row.appendChild(categoryCell);

  const stockCell = document.createElement("td");
  stockCell.textContent = product.stock;
  row.appendChild(stockCell);

  const actionsCell = document.createElement("td");
  actionsCell.className = " justify-content-center actionsBtn ";
  const updateButton = document.createElement("button");
  updateButton.className = "btn btn-info mx-2";
  updateButton.setAttribute("data-toggle", "modal");
  updateButton.style.width = "90px";
  updateButton.setAttribute("data-target", "#updateProductModal");
  updateButton.setAttribute("data-id", product.id);
  updateButton.textContent = "Update";
  updateButton.addEventListener("click", () => updateProduct(product.id));
  actionsCell.appendChild(updateButton);

  const deleteButton = document.createElement("button");
  deleteButton.className = "btn btn-danger";
  deleteButton.style.width = "90px";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", (e) => deleteProduct(product.id, e));
  actionsCell.appendChild(deleteButton);

  row.appendChild(actionsCell);

  return row;
}

export function displayProducts(products) {
  const productListContainer = document.getElementById("productList");
  productListContainer.innerHTML = "";
  myspan.textContent = ": Products Details";
  document.querySelector(".chart-parent").style.display = "none";
  document.querySelector(".dynamic-section").style.display = "block";
  document.getElementById("productTable").style.display = "block";
  document.getElementById("OrdersTable").style.display = "none";
  document.querySelector(".addBtn").style.display = "block";
  //   document.querySelector(".dynamic-section").style.display = "block";
  //   document.querySelector(".chart-parent").style.display = "none";
  products.forEach((product) => {
    const row = displayProductRow(product);
    productListContainer.appendChild(row);
  });
}
//search section
var inpSearch = document.querySelector(".search");
inpSearch.addEventListener("keyup", function () {
  var searchValue = inpSearch.value.toLowerCase();

  var rows = document.querySelectorAll("tbody tr");

  rows.forEach(function (row) {
    var id = row.querySelector("td:first-child").innerText.toLowerCase();
    var nameText = row.querySelector("td:nth-child(2)").innerText.toLowerCase();
    var priceText = row.querySelector("td:nth-child(3)").innerText;
    var categoryText = row
      .querySelector("td:nth-child(5)")
      .innerText.toLowerCase();
    if (
      id.includes(searchValue) ||
      nameText.includes(searchValue) ||
      priceText.includes(searchValue) ||
      categoryText.includes(searchValue)
    ) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
});
//delete
function deleteProduct(productId, e) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancel ",
      confirmButtonText: "Delete",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          "Deleted!",
          "Your file has been deleted.",
          "success"
        );
        const productIndex = FlowersDate.findIndex(
          (product) => product.id === productId
        );

        if (productIndex !== -1) {
          FlowersDate.splice(productIndex, 1);
          localStorage.setItem("flowersData", JSON.stringify(FlowersDate));

          const sellerProducts = FlowersDate.filter(
            (product) => product.seller.id === sellerId
          );
          displayProducts(sellerProducts);
        } else {
          console.error(`Product with ID ${productId} not found`);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          "Cancelled",
          "Your imaginary file is safe :)",
          "error"
        );
      }
    });
}
//add product

const addProductForm = document.getElementById("addProductForm");
addProductForm.addEventListener("submit", function (event) {
  event.preventDefault();
  document.querySelector(".error-msg").innerHTML = "";
  flag = 1;

  const productNameInput = document.getElementById("productName");
  const validName = validateTextInput(
    productNameInput,
    "anameErr",
    "Plz Enter Valid Name"
  );

  const productPriceInput = document.getElementById("productPrice");
  const validPrice = validateNumberInput(
    productPriceInput,
    "apriceErr",
    "Plz Enter Valid Price in range 0:1000",
    0,
    1000
  );

  const nameMeaningInput = document.getElementById("nameMeaning");
  const validMeaning = validateTextInput(
    nameMeaningInput,
    "ameaningErr",
    "Plz Enter Valid Meaning"
  );

  const productImageInput = document.getElementById("productImage");
  const validImage = validateFileInput(
    productImageInput,
    "aimgErr",
    "Please choose an image."
  );

  const productCategoryInput = document.getElementById("productCategory");
  const validCategory = validateTextInput(
    productCategoryInput,
    "acategoryErr",
    "Plz Enter a Valid category flower name!"
  );

  const productStockInput = document.getElementById("productStock");
  const validStock = validateNumberInput(
    productStockInput,
    "astockErr",
    "Plz Enter a Stock No!",
    0,
    100
  );

  if (
    flag &&
    validName &&
    validPrice &&
    validMeaning &&
    validImage &&
    validCategory &&
    validStock
  ) {
    const maxId = Math.max(...FlowersDate.map((product) => product.id), 0);

    const newProduct = {
      id: maxId + 1,
      name: productNameInput.value,
      meaning: nameMeaningInput.value,
      price: parseFloat(productPriceInput.value),
      image: productImageInput.files[0].name,
      category: productCategoryInput.value,
      description: document.getElementById("description").value || "",
      stock: parseInt(productStockInput.value),
      seller: {
        id: sellerId,
      },
    };
    FlowersDate.push(newProduct);
    localStorage.setItem("flowersData", JSON.stringify(FlowersDate));

    const sellerProducts = FlowersDate.filter(
      (product) => product.seller.id === sellerId
    );
    displayProducts(sellerProducts);

    $("#addProductModal").modal("hide");
    Swal.fire({
      position: "center",
      icon: "success",
      title: "New Product Flower Added",
      showConfirmButton: false,
      timer: 1500,
    });
  }
});
//update
function updateProduct(productId) {
  const updateForm = document.getElementById("updateProductForm");
  let nameValue = document.getElementById("updateProductName");
  let priceValue = document.getElementById("updateProductPrice");
  let imageValue = document.getElementById("updateProductImage");
  let stockValue = document.getElementById("updateProductStock");
  let categoryValue = document.getElementById("updateProductCategory");

  // get specific product
  const productToUpdate = FlowersDate.find(
    (product) => product.id === productId
  );

  if (productToUpdate) {
    // retrieve data from table to inputs :)
    nameValue.value = productToUpdate.name;
    priceValue.value = productToUpdate.price;
    //imageValue.files[0].name = productToUpdate.image;
    categoryValue.value = productToUpdate.category;
    stockValue.value = productToUpdate.stock;

    updateForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Update the product => new values
      const validName = validateTextInput(
        nameValue,
        "nameErr",
        "Plz Enter Valid Name"
      );

      const validPrice = validateNumberInput(
        priceValue,
        "priceErr",
        "Plz Enter Valid Price in range 0:1000",
        0,
        1000
      );

      const validImage = validateFileInput(
        imageValue,
        "aimgErr",
        "Please choose an image."
      );

      const validCategory = validateTextInput(
        categoryValue,
        "categoryErr",
        "Plz Enter a Valid category flower name!"
      );

      const validStock = validateNumberInput(
        stockValue,
        "stockErr",
        "Plz Enter a Stock No!",
        0,
        100
      );

      // get products for -> the current seller
      const sellerProducts = FlowersDate.filter(
        (product) => product.seller.id === sellerId
      );

      if (
        validName &&
        validPrice &&
        validImage &&
        validCategory &&
        validStock
      ) {
        // Update the product properties
        productToUpdate.name = nameValue.value;
        productToUpdate.price = parseFloat(priceValue.value);
        productToUpdate.image = imageValue.files[0].name;
        productToUpdate.category = categoryValue.value;
        productToUpdate.stock = parseInt(stockValue.value);
        console.log(imageValue.files[0].name);
        localStorage.setItem("flowersData", JSON.stringify(FlowersDate));

        displayProducts(sellerProducts);
        $("#updateProductModal").modal("hide");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Data Updated",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });

    $("#updateProductModal").modal("show");
  } else {
    console.error(`Product with ID ${productId} not found`);
  }
}
// end update
// toggle theme
export function toggleTheme() {
  const body = document.body;
  body.classList.toggle("dark-theme");
}

// start handle orders section
export function ShowOrders() {
  myspan.textContent = ": Orders Details";
  document.querySelector(".chart-parent").style.display = "none";
  document.querySelector(".dynamic-section").style.display = "block";
  document.getElementById("productTable").style.display = "none";
  document.getElementById("OrdersTable").style.display = "block";
  document.querySelector(".addBtn").style.display = "none";

  function getOrdersForSeller(sellerID) {
    const allOrders = JSON.parse(localStorage.getItem("ChartOrder")) || [];
    return allOrders.filter((order) => order.sellerId === sellerID);
  }

  function updateOrderState(orderID, newState) {
    const allOrders = JSON.parse(localStorage.getItem("ChartOrder")) || [];
    const updatedOrders = allOrders.map((order) => {
      if (order.orderID === orderID) {
        order.state = newState;
      }
      return order;
    });
    localStorage.setItem("ChartOrder", JSON.stringify(updatedOrders));
  }

  const OrdersListContainer = document.getElementById("OrderList");
  OrdersListContainer.innerHTML = "";

  const sellerOrders = getOrdersForSeller(sellerId);

  sellerOrders.forEach((order) => {
    const row = document.createElement("tr");

    const idUserCell = document.createElement("td");
    idUserCell.textContent = order.orderId;
    row.appendChild(idUserCell);

    const idProductCell = document.createElement("td");
    idProductCell.textContent = order.productId;
    row.appendChild(idProductCell);

    const idSellerCell = document.createElement("td");
    idSellerCell.textContent = order.sellerId;
    row.appendChild(idSellerCell);

    const dateCell = document.createElement("td");
    dateCell.textContent = new Date(order.date).toISOString().split("T")[0];
    row.appendChild(dateCell);

    const priceCell = document.createElement("td");
    priceCell.textContent = order.price;
    row.appendChild(priceCell);

    const quantityCell = document.createElement("td");
    quantityCell.textContent = order.quantity;
    row.appendChild(quantityCell);

    const stateCell = document.createElement("td");
    stateCell.classList.add("state");
    const state = document.createElement("span");

    if (order.state === 0) {
      state.textContent = "Pending";
    } else {
      state.textContent = "Approved";
      state.classList.add("approved");
    }

    stateCell.appendChild(state);
    row.appendChild(stateCell);
    OrdersListContainer.appendChild(row);

    state.addEventListener("click", function () {
      state.classList.toggle("approved");
      if (order.state === 0) {
        state.textContent = "Approved";
        order.state = 1;
        updateOrderState(order.orderID, 1);
      } else {
        state.textContent = "Pending";
        order.state = 0;
        updateOrderState(order.orderID, 0);
      }
    });
  });
}
