import {
  validateNumberInput,
  validateTextInput,
  validateFileInput,
} from "./ValidationMoudule.js";
let myspan = document.querySelector(".typeOf");
let flag;
let sellerId;
const loggedInUserData = sessionStorage.getItem("loggedInUser");
const chartParent = document.querySelector(".chart-parent");
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
  document.querySelector(".sellerID").innerHTML = `Seller ID: ${sellerData.id}`;
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
// orders
let sellerOrders = (JSON.parse(localStorage.getItem("order")) || []).filter(
  (order) => order.sellerId === sellerId
);
//create data for no orders and no of products
function SellerDataVisual() {
  let dataContainer = document.createElement("div");
  dataContainer.classList.add("data-seller");
  let ProductNo = document.createElement("div");
  let OrdertNo = document.createElement("div");
  ProductNo.innerHTML = `<h4>Products No</h4> <h3> ${sellerProducts.length}</h3> <h4>Since launched</h4>`;
  OrdertNo.innerHTML = `<h4>Orders No</h4> <h3> ${sellerOrders.length} </h3> <h4>Since launched</h4>`;
  dataContainer.appendChild(ProductNo);
  dataContainer.appendChild(OrdertNo);
  chartParent.prepend(dataContainer);
}
//
export function ShowCharts() {
  //   document.querySelector(".controls").innerHTML = "";
  let chartsContainer = document.querySelector(".chartsCon");
  chartsContainer.innerHTML = "";
  document.querySelector(".chart-parent").style.display = "block";
  document.querySelector(".dynamic-section").style.display = "none";
  myspan.textContent = "Charts Page";
  SellerDataVisual();

  const productOrdersMap = {};
  sellerOrders.forEach((order) => {
    const productId = order.productId;
    if (productOrdersMap[productId]) {
      productOrdersMap[productId] += order.quantity;
    } else {
      productOrdersMap[productId] = order.quantity;
    }
  });

  const orderLabels = [];
  const orderData = [];
  console.log(productOrdersMap);
  Object.keys(productOrdersMap).forEach((productId) => {
    const product = FlowersDate.find((item) => item.id === parseInt(productId));
    if (product) {
      orderLabels.push(product.name);
      orderData.push(productOrdersMap[productId]);
    }
  });

  const ctx1 = document.createElement("canvas");
  ctx1.width = 400;
  ctx1.height = 300;
  ctx1.classList.add("myChart");
  chartsContainer.appendChild(ctx1);

  new Chart(ctx1, {
    type: "bar",
    data: {
      labels: orderLabels,
      datasets: [
        {
          label: "Order Quantities",
          data: orderData,
          backgroundColor: "#ca9cbc",
          borderColor: "lavender",
          borderWidth: 1,
          barThickness: 80,
        },
      ],
    },
    options: {
      scales: {
        y: { beginAtZero: true },
      },
    },
  });
  //second char
  const filteredPaidFlowers = FlowersDate.filter(
    (product) => product["seller"].id === sellerId && product.stock > 0
  );
  let ctx2 = document.createElement("canvas");
  ctx2.width = 400;
  ctx2.height = 300;
  ctx2.classList.add("myChart");
  chartsContainer.appendChild(ctx2);

  // console.log(filteredPaidFlowers);

  const barChartConfig2 = {
    type: "bar",
    data: {
      labels: filteredPaidFlowers.map((data) => data.name),
      datasets: [
        {
          label: "Product Stock Numbers",
          data: filteredPaidFlowers.map((data) => data.stock),
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
//  charts end

// display products
export function displayProductRow(product) {
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
  updateButton.className = "btn btn-info mx-2 my-1";
  updateButton.setAttribute("data-toggle", "modal");
  updateButton.style.width = "90px";
  updateButton.setAttribute("data-target", "#updateProductModal");
  updateButton.textContent = "Update";
  updateButton.addEventListener("click", () => updateProduct(product.id));
  // console.log(product.id);
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
function deleteProduct(productId) {
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
document.querySelector(".addBtn").addEventListener("click", () => {
  addProductForm.reset();
});

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
    "Please choose an image. Be care image must be in flowers folder!"
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
      paidno: 0,
      meaning: nameMeaningInput.value,
      price: parseFloat(productPriceInput.value),
      reviews: [],
      image: productImageInput.files[0].name,
      category: productCategoryInput.value,
      description:
        document.getElementById("description").value ||
        "perfect for expressing imagination and creativity.",
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
  const nameValue = document.getElementById("updateProductName");
  const priceValue = document.getElementById("updateProductPrice");
  const imageValue = document.getElementById("updateProductImage");
  const stockValue = document.getElementById("updateProductStock");
  const categoryValue = document.getElementById("updateProductCategory");

  // Get specific product -> clicked
  const productToUpdate = FlowersDate.find(
    (product) => product.id === productId
  );

  if (productToUpdate) {
    // Retrieve my data :)
    nameValue.value = productToUpdate.name;
    priceValue.value = productToUpdate.price;
    categoryValue.value = productToUpdate.category;
    stockValue.value = productToUpdate.stock;

    function handleUpdate(event) {
      event.preventDefault();

      const validName = validateTextInput(
        nameValue,
        "nameErr",
        "Please enter a valid name"
      );
      const validPrice = validateNumberInput(
        priceValue,
        "priceErr",
        "Please enter a valid price in the range 5 to 1000",
        5,
        1000
      );
      const validImage = validateFileInput(
        imageValue,
        "aimgErr",
        "Please choose an image from the flowers folder."
      );
      const validCategory = validateTextInput(
        categoryValue,
        "categoryErr",
        "Please enter a valid category flower name."
      );
      const validStock = validateNumberInput(
        stockValue,
        "stockErr",
        "Please enter a stock number in the range 0 to 100",
        0,
        100
      );

      if (
        validName &&
        validPrice &&
        validImage &&
        validCategory &&
        validStock
      ) {
        // Update ->
        productToUpdate.name = nameValue.value;
        productToUpdate.price = parseFloat(priceValue.value);

        if (imageValue.files.length > 0) {
          productToUpdate.image = imageValue.files[0].name;
        }
        productToUpdate.category = categoryValue.value;
        productToUpdate.stock = parseInt(stockValue.value);

        localStorage.setItem("flowersData", JSON.stringify(FlowersDate));

        const sellerProducts = FlowersDate.filter(
          (product) => product.seller.id === sellerId
        );
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
    }

    updateForm.addEventListener("submit", handleUpdate);

    $("#updateProductModal").on("hidden.bs.modal", function () {
      updateForm.removeEventListener("submit", handleUpdate);
    });

    $("#updateProductModal").modal("show");
  } else {
    console.error(`Product with ID ${productId} not found`);
  }
}

// start handle orders section
export function ShowOrders() {
  myspan.textContent = ": Orders Details";
  document.querySelector(".chart-parent").style.display = "none";
  document.querySelector(".dynamic-section").style.display = "block";
  document.querySelector(".addBtn").style.display = "none";
  document.getElementById("productTable").style.display = "none";

  function getOrdersForSeller(sellerID) {
    const allOrders = JSON.parse(localStorage.getItem("order")) || [];
    return allOrders.filter((order) => order.sellerId === sellerID);
  }

  function updateOrderState(orderID, newState, userID) {
    const allOrders = JSON.parse(localStorage.getItem("order")) || [];
    const updatedOrders = allOrders.map((order) => {
      if (order.orderId === orderID && order.user === userID) {
        order.state = newState;
      }
      return order;
    });
    localStorage.setItem("order", JSON.stringify(updatedOrders));
    return updatedOrders.find((order) => order.orderId === orderID); // Return the updated order
  }
  function updateOrderRemoved(orderID, newState) {
    const allOrders = JSON.parse(localStorage.getItem("order")) || [];
    const updatedOrders = allOrders.map((order) => {
      if (order.orderId === orderID) {
        order.isRemoved = newState;
      }
      return order;
    });
    localStorage.setItem("order", JSON.stringify(updatedOrders));
    return updatedOrders.find((order) => order.orderId === orderID); // Return the updated order
  }

  function createOrderRow(order) {
    const row = document.createElement("tr");

    const idOrderCell = document.createElement("td");
    idOrderCell.textContent = order.orderId;
    row.appendChild(idOrderCell);

    const idProductCell = document.createElement("td");
    idProductCell.textContent = order.productId;
    row.appendChild(idProductCell);

    const idUserCell = document.createElement("td");
    idUserCell.textContent = order.user;
    row.appendChild(idUserCell);

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
    state.textContent = order.state;
    state.classList.add(order.state.toLowerCase());
    stateCell.appendChild(state);
    row.appendChild(stateCell);

    state.addEventListener("click", function (e) {
      if (order.state === "Pending") {
        state.textContent = "Delivered";
        state.classList.remove("pending");
        state.classList.add("delivered");
        order.state = "Delivered";
        updateOrderState(order.orderId, "Delivered", order.user);
        state.disabled = true;
      } else if (order.state === "Delivered") {
        console.log(e.target);
        Swal.fire({
          title: "Are You Want Delete this row!",
          icon: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancel ",
          confirmButtonText: "Delete",
          reverseButtons: true,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              "Deleted!",
              "Your file has been deleted.",
              "success",
              3000
            );
            order.isRemoved = true;
            // localStorage.setItem("order", JSON.stringify(order));
            updateOrderRemoved(order.orderId, true);
            row.remove();
            if (document.querySelector("#OrderList").childNodes.length === 0) {
              document.getElementById("OrdersTable").style.display = "none";
              Swal.fire("Empty Orders!");
            }
          } else {
          }
        });
      }

      return row;
    });

    return row; // Return the created row
  }

  const OrdersListContainer = document.getElementById("OrderList");
  OrdersListContainer.innerHTML = "";

  const sellerOrders = getOrdersForSeller(sellerId);

  if (sellerOrders.length < 1) {
    Swal.fire("No orders yet!");
  } else {
    sellerOrders.forEach((order) => {
      if (!order.isRemoved) {
        const row = createOrderRow(order);
        OrdersListContainer.appendChild(row); // Append the row to the container
      }
    });

    document.getElementById("OrdersTable").style.display = "block";
  }
}
