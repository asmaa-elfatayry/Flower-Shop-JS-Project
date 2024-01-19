window.addEventListener("load", function () {
  const sellerId = 2;
  let FlowersDate = JSON.parse(localStorage.getItem("flowersData")) || [];
  let sellerData = JSON.parse(localStorage.getItem("sellerData")) || [];
  let flag = 1;

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

  function displayProductRow(product) {
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
    actionsCell.className = "d-flex justify-content-center actionsBtn";
    const updateButton = document.createElement("button");
    updateButton.className = "btn btn-info mr-2";
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

  function displayProducts(products) {
    const productListContainer = document.getElementById("productList");
    productListContainer.innerHTML = "";

    products.forEach((product) => {
      const row = displayProductRow(product);
      productListContainer.appendChild(row);
    });
  }

  function deleteProduct(productId, e) {
    // const confirmed = confirm(
    //   `Are you sure you want to delete product with ID ${productId}?`
    // );
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
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
    // if (confirmed) {
    //   const productIndex = FlowersDate.findIndex(
    //     (product) => product.id === productId
    //   );

    //   if (productIndex !== -1) {
    //     FlowersDate.splice(productIndex, 1);
    //     localStorage.setItem("flowersData", JSON.stringify(FlowersDate));

    //     const sellerProducts = FlowersDate.filter(
    //       (product) => product.seller.id === sellerId
    //     );
    //     displayProducts(sellerProducts);
    //   } else {
    //     console.error(`Product with ID ${productId} not found`);
    //   }
    // }
  }

  function validateTextInput(inputElement, errorElementId, errorMessage) {
    const inputValue = inputElement.value.trim();
    const errorElement = document.getElementById(errorElementId);

    if (
      inputValue !== "" &&
      inputValue.match(/\b(?![0-9])\w{4,}\b/) &&
      isNaN(inputValue)
    ) {
      inputElement.classList.remove("is-invalid");
      errorElement.innerHTML = "";
      return true; // Valid input
    } else {
      errorElement.innerHTML = errorMessage;
      inputElement.classList.add("is-invalid");
      return false; // Invalid input
    }
  }

  function validateNumberInput(
    inputElement,
    errorElementId,
    errorMessage,
    min,
    max
  ) {
    const inputValue = parseFloat(inputElement.value);
    const errorElement = document.getElementById(errorElementId);

    if (!isNaN(inputValue) && inputValue >= min && inputValue <= max) {
      inputElement.classList.remove("is-invalid");
      errorElement.innerHTML = "";
      return true; // Valid input
    } else {
      errorElement.innerHTML = errorMessage;
      inputElement.classList.add("is-invalid");
      return false; // Invalid input
    }
  }
  function validateFileInput(inputElement, errorElementId, errorMessage) {
    const file = inputElement.files[0];
    const errorElement = document.getElementById(errorElementId);

    if (file && file.type.startsWith("image/")) {
      inputElement.classList.remove("is-invalid");
      errorElement.innerHTML = "";
      return true; // Valid input
    } else {
      errorElement.innerHTML = errorMessage;
      inputElement.classList.add("is-invalid");
      return false; // Invalid input
    }
  }

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
        console.log(imageValue.files[0].name);
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

  // Initialize the page
  const seller = getSellerById(sellerId);

  if (seller) {
    displaySellerInfo(seller);
  } else {
    console.error(`Seller with ID ${sellerId} not found`);
  }

  const sellerProducts = FlowersDate.filter(
    (product) => product.seller.id === sellerId
  );
  displayProducts(sellerProducts);

  //start handling toggle
  function toggleTheme() {
    const body = document.body;
    body.classList.toggle("dark-theme");
  }

  document.querySelector(".toggleInfo").addEventListener("click", function () {
    document.getElementById("sellerInfoContainer").classList.toggle("showInfo");
  });

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
          location.assign("login_sign.html");
        }
      });
  });
});
