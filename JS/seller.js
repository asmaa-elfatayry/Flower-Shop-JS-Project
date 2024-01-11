window.addEventListener("load", function () {
  const sellerId = 4;
  let FlowersDate = JSON.parse(localStorage.getItem("flowersData")) || [];
  let sellerData = JSON.parse(localStorage.getItem("sellerData")) || [];
  let seller = sellerData.find((seller) => seller.id === sellerId);

  function sellerInfo(sellerData) {
    document.querySelector(".sellerName").innerText = sellerData.name;
    document.querySelector(".location").innerText = sellerData.location;
  }

  const sellerProducts = FlowersDate.filter(
    (product) => product.seller.id === sellerId
  );

  if (seller) {
    sellerInfo(seller);
  } else {
    console.error(`Seller with ID ${sellerId} not found`);
  }

  displayProducts(sellerProducts);

  // Dcreate table of products
  function displayProducts(products) {
    const productListContainer = document.getElementById("productList");
    // Clear  content
    productListContainer.innerHTML = "";
    products.forEach((product) => {
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
      updateButton.className = "btn btn-info mr-2 ";
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
      deleteButton.addEventListener("click", (e) =>
        deleteProduct(product.id, e)
      );
      actionsCell.appendChild(deleteButton);

      row.appendChild(actionsCell);

      productListContainer.appendChild(row);
    });
  } //end display product

  //   ###################### delete product
  function deleteProduct(productId, e) {
    const confirmed = confirm(
      `Are you sure you want to delete product with ID ${productId}?`
    );
    if (confirmed) {
      // index of the product in the FlowersDate array
      const productIndex = FlowersDate.findIndex(
        (product) => product.id === productId
      );

      if (productIndex !== -1) {
        // Remove the product from the FlowersDate array
        FlowersDate.splice(productIndex, 1);

        // get products for -> current seller
        const sellerProducts = FlowersDate.filter(
          (product) => product.seller.id === sellerId
        );
        // Save updated
        localStorage.setItem("flowersData", JSON.stringify(FlowersDate));

        displayProducts(sellerProducts);
      } else {
        console.error(`Product with ID ${productId} not found`);
      }
    }
  }

  // ###################  add product
  const addProductForm = document.getElementById("addProductForm");
  addProductForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const maxId = Math.max(...FlowersDate.map((product) => product.id), 0);

    const newProduct = {
      id: maxId + 1,
      name: document.getElementById("productName").value,
      meaning: document.getElementById("nameMeaning").value,
      price: parseFloat(document.getElementById("productPrice").value),
      image: document.getElementById("productImage").value,
      category: document.getElementById("productCategory").value,
      description: document.getElementById("description").value || "",
      stock: parseInt(document.getElementById("productStock").value),
      seller: {
        id: sellerId,
      },
    };
    // console.log(newProduct);

    FlowersDate.push(newProduct);
    // Save updated
    localStorage.setItem("flowersData", JSON.stringify(FlowersDate));

    // get products for -> current seller
    const sellerProducts = FlowersDate.filter(
      (product) => product.seller.id === sellerId
    );

    displayProducts(sellerProducts);

    $("#addProductModal").modal("hide");
  });
  //end add product

  //########################## update product

  function updateProduct(productId) {
    const updateForm = document.getElementById("updateProductForm");

    // get specific product
    const productToUpdate = FlowersDate.find(
      (product) => product.id === productId
    );

    if (productToUpdate) {
      //retrive data from table to inputs :)
      document.getElementById("updateProductName").value = productToUpdate.name;
      document.getElementById("updateProductPrice").value =
        productToUpdate.price;
      document.getElementById("updateProductImage").value =
        productToUpdate.image;
      document.getElementById("updateProductCategory").value =
        productToUpdate.category;
      document.getElementById("updateProductStock").value =
        productToUpdate.stock;

      updateForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Update the product => new values
        productToUpdate.name =
          document.getElementById("updateProductName").value;
        productToUpdate.price = parseFloat(
          document.getElementById("updateProductPrice").value
        );
        productToUpdate.image =
          document.getElementById("updateProductImage").value;
        productToUpdate.category = document.getElementById(
          "updateProductCategory"
        ).value;
        productToUpdate.stock = parseInt(
          document.getElementById("updateProductStock").value
        );

        // get products for -> the current seller
        const sellerProducts = FlowersDate.filter(
          (product) => product.seller.id === sellerId
        );

        localStorage.setItem("flowersData", JSON.stringify(FlowersDate));

        displayProducts(sellerProducts);

        $("#updateProductModal").modal("hide");
      });

      $("#updateProductModal").modal("show");
    } else {
      console.error(`Product with ID ${productId} not found`);
    }
  }
});
