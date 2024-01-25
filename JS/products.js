window.addEventListener("load", function () {
  updateBadge();
  ////////////////ahmed
  let flowers = JSON.parse(this.window.localStorage.getItem("flowersData"));
  let newRowDiv = document.createElement("div");
  newRowDiv.className = "row";
  document.getElementById("productContainer").appendChild(newRowDiv);
  function addProduct(product) {
    let curProduct = this.document.createElement("div");
    curProduct.className = "card col-12 col-md-5 col-lg-3";
    curProduct.id = "procuct-card";
    newRowDiv.appendChild(curProduct);
    curProduct.innerHTML = `
            <img src="../images/flowers/${product.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <div class="card-details">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <span>${product.price} EGP<span>
                </div>
                <div class="card-options text-center">
                    <button class="btn btn-outline-secondary" type="button">
                                    product details
                    </button>
                <!--nayira-->
                    <button class="btn btn-outline-secondary cart " id="${product.id}"  type="button">
                                    Add to cart
                    </button>
                </div>
            </div>
        `;
  }
  for (let i = 0; i < flowers.length; i++) {
    addProduct(flowers[i]);
  }
  this.document
    .getElementById("searchBTN")
    .addEventListener("click", function () {
      newRowDiv.innerHTML = "";
      for (let i = 0; i < flowers.length; i++) {
        let curSearch = document.getElementById("searchTXT").value.trim();
        if (flowers[i].name.includes(curSearch)) addProduct(flowers[i]);
      }
    });
  let mnP = document.getElementById("minPrice");
  let mxP = document.getElementById("maxPrice");
  mnP.addEventListener("change", function () {
    if (Number(mnP.value) < 0) mnP.value = 0;
    if (Number(mnP.value) > Number(mxP.value)) mnP.value = mxP.value;
  });
  mxP.addEventListener("change", function () {
    if (Number(mxP.value) < 0) mxP.value = 0;
    if (Number(mxP.value) < Number(mnP.value)) mxP.value = mnP.value;
  });
  this.document
    .getElementById("priceFilterBTN")
    .addEventListener("click", function () {
      newRowDiv.innerHTML = "";
      for (let i = 0; i < flowers.length; i++) {
        if (
          Number(flowers[i].price) >= Number(mnP.value) &&
          Number(flowers[i].price) <= Number(mxP.value)
        )
          addProduct(flowers[i]);
      }
    });

  let categories = document.getElementsByTagName("li");
  for (let i = 0; i < categories.length; i++) {
    categories[i].addEventListener("click", function (e) {
      for (let i = 0; i < categories.length; i++)
        categories[i].classList.remove("active");
      e.target.classList.add("active");
    });
  }

  //=================================================================================
  //===================Add product in cart===========================================

  class Order {
    #date;
    #product_id;
    #seller_id;
    #quantity;
    #price;
    #order_id;
    #state;
    #user;

    constructor(date, productId, sellerId, quantity, price, orderId, state, user) {
      this.#date = date;
      this.#product_id = productId;
      this.#seller_id = sellerId;
      this.#quantity = quantity;
      this.#price = price;
      this.#order_id = orderId;
      this.#state = state;
      this.#user = user;
    }
    getOrderData() {
      return {
        date: this.#date,
        productId: this.#product_id,
        sellerId: this.#seller_id,
        quantity: this.#quantity,
        price: this.#price,
        orderId: this.#order_id,
        state: this.#state,
        user: this.#user
      }

    }

  }
  let ExistChartOrder = JSON.parse(localStorage.getItem("ChartOrder")) || [];
  let CurrentUserData = JSON.parse(sessionStorage.getItem("loggedInUser")) || [];
  let btn_list = document.getElementsByClassName("cart");
  for (let i = 0; i < btn_list.length; i++) {
    btn_list[i].addEventListener('click', addchart);
  }
  function addchart(e) {
    let p_id = parseInt(e.target.id);
    if (!order_is_exists(p_id)) {
      let found_prod = flowers.find((flower) => flower.id === p_id);
      let quantity = 1;
      let orderid = ExistChartOrder.length + 1;
      let price = found_prod.price;
      let sellerid = found_prod.seller.id;
      let date = new Date();
      let state = "pending";
      let prodId = found_prod.id;
      let user = CurrentUserData.length > 0 ? CurrentUserData.id : -1;
      let new_order = new Order(date, prodId, sellerid, quantity, price, orderid, state, user);
      ExistChartOrder.push(new_order.getOrderData());
      updateChartData(ExistChartOrder);
      updateBadge();
    } else {
      updateproductById(p_id);
      updateChartData(ExistChartOrder);
      updateBadge();
    }
  }
  function updateproductById(id) {
    let index = ExistChartOrder.findIndex((order) => order.productId === id);
    if (index !== -1) {
      let stockQuantity = getStockQuantityById(id); 
      if (ExistChartOrder[index].quantity <= stockQuantity) {
        ExistChartOrder[index].quantity += 1;
      } else {
        /*for the product which is out of stock make its button disabled*/
        //btn_list[id].setAttribute("disabled", "true");
        Swal.fire({
          position: "center",
          icon: "error",
          title: "The quantity is not avaliable right now",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  }
  
  function getStockQuantityById(productId) {
    let product = flowers.find((flower) => flower.id === productId);
    if (product) {
      return product.stock; 
    } else {
      return 0;
    }
  }
  
  function updateChartData(ExistChartOrder) {
    localStorage.setItem("ChartOrder", JSON.stringify(ExistChartOrder));
  }
  function order_is_exists(id) {
    let check_order = JSON.parse(localStorage.getItem("ChartOrder")) || [];
    return check_order.some((order) => order.productId === id);
  }
  function getExistingOrder(id) {
    let checkOrder = JSON.parse(localStorage.getItem("ChartOrder")) || [];
    return checkOrder.find((order) => order.productId === id);
  }

  function numberOfOrdersInCart() {
    let check_order = JSON.parse(localStorage.getItem("ChartOrder")) || [];
    return check_order.length;
  }
  function updateBadge() {
    let badge = document.getElementsByClassName("badge")[0];
    if (numberOfOrdersInCart() != 0) {
      badge.style.display = "block";
      badge.innerText = numberOfOrdersInCart();

    }
  }
  


});
