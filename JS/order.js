let flowers = JSON.parse(localStorage.getItem('flowersData')) || [];
let currentuser = JSON.parse(sessionStorage.getItem("loggedInUser")) || [];

export class Order {
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

export function getuserorder() {
  let TotalOrders = getTotalorders();
  if (currentuser.length == 0) {
    return TotalOrders;

  }
  else {
    let ExistChartOrder = TotalOrders.filter((order) => { return order.user === currentuser.id });
    return ExistChartOrder;
  }

}
export function getTotalorders() {
  let TotalOrders;
  if (currentuser.length == 0) {
    TotalOrders = JSON.parse(localStorage.getItem("guestRequestorder")) || [];
  }
  else {
    TotalOrders = JSON.parse(localStorage.getItem("ChartOrder")) || [];
  }
  return TotalOrders;

}
export function updateproductById(id) {
  let TotalOrders = getTotalorders();
  let index;
  if (currentuser.length == 0) {
    index = TotalOrders.findIndex((order) => order.productId === parseInt(id));

  }
  else {
    index = TotalOrders.findIndex((order) => order.productId === parseInt(id) && order.user == currentuser.id);

  }
  if (index !== -1) {
    let stockQuantity = getStockQuantityById(parseInt(id));
    if (TotalOrders[index].quantity < stockQuantity) {
      TotalOrders[index].quantity += 1;
      updateChartData(TotalOrders);
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "The quantity is not available right now",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}
export function getStockQuantityById(productId) {
  let product = flowers.find((flower) => flower.id === productId);
  if (product) {
    return product.stock;
  } else {
    return 0;
  }
}
export function updateChartData(TotalOrders) {
  if (currentuser.length == 0) {
    localStorage.setItem("guestRequestorder", JSON.stringify(TotalOrders));

  }
  else {
    localStorage.setItem("ChartOrder", JSON.stringify(TotalOrders));

  }

}
export function order_is_exists(id) {
  let get_all_order = getTotalorders();
  let check_user_order;
  if (currentuser.length == 0) {
    return get_all_order.some((order) => order.productId === id);

  }
  else {

    check_user_order = get_all_order.filter((order) => { return order.user === currentuser.id });
    return check_user_order.some((order) => order.productId === id);
  }

}
export function numberOfOrdersInCart() {
  let check_order = getTotalorders();
  let result_check;
  if (currentuser.length == 0) {
    return check_order.length;
  }
  else {
    result_check = check_order.filter((order) => { return order.user === currentuser.id });
    return result_check.length;
  }

}
export function updateBadge() {
  let badge = document.getElementsByClassName("badge")[0];
  if (numberOfOrdersInCart() != 0) {
    badge.style.display = "block";
    badge.innerText = numberOfOrdersInCart();

  }
}
export function loggeduser() {
  let user = JSON.parse(sessionStorage.getItem("loggedInUser"));
  return user;

}
export function getProductImgById(id) {
  let TotalOrders = getTotalorders();
  let searchedProduct = flowers;
  let resultOrdeId;
  let resultproduct;
  if (currentuser.length == 0) {
    resultOrdeId = TotalOrders.find((order) => order.productId === parseInt(id));

  }
  else {
    resultOrdeId = TotalOrders.find((order) => order.productId === parseInt(id) && order.user == currentuser.id);
   
  }
  resultproduct = searchedProduct.find((flower) => flower.id === resultOrdeId.productId);
  return resultproduct.image;
}

export function getpendingorder() {
  let userorders =JSON.parse(localStorage.getItem("order"))||[];
  let userpendingorders=userorders.filter((userorder) => {return userorder.state==="Pending" && userorder.user==currentuser.id});
  return userpendingorders;
}


export function getdeliveredorder() {
  let userorders =JSON.parse(localStorage.getItem("order"))||[];
  let userpendingorders = userorders.filter((userorder) => { return userorder.state === "Delivered" && userorder.user==currentuser.id});
  return userpendingorders;
}

export function getProductImgByIdUser(id) {
  let TotalOrders = JSON.parse(localStorage.getItem("order"))||[];
  let searchedProduct = flowers;
  let resultOrdeId;
  let resultproduct;
  if (currentuser.length == 0) {
    resultOrdeId = TotalOrders.find((order) => order.productId === parseInt(id));

  }
  else {
    resultOrdeId = TotalOrders.find((order) => order.productId === parseInt(id) && order.user == currentuser.id);
   
  }
  resultproduct = searchedProduct.find((flower) => flower.id === resultOrdeId.productId);
  return resultproduct.image;
}


export function updateproduct(id, quanity) {
  let TotalOrders = getTotalorders();
  let index;
  if (currentuser.length == 0) {
    index = TotalOrders.findIndex((order) => order.productId === parseInt(id));

  }
  else {
    index = TotalOrders.findIndex((order) => order.productId === parseInt(id) && order.user == currentuser.id);

  }
  if (index !== -1) {
    TotalOrders[index].quantity = quanity;
    updateChartData(TotalOrders);
  }
}

export function getwhishlist()
{
  let currentUser=JSON.parse(sessionStorage.getItem("loggedInUser")) || [];
  return currentUser.favourites;

}
