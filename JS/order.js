let flowers = JSON.parse(localStorage.getItem('flowersData'))||[];
let currentuser=JSON.parse(sessionStorage.getItem("loggedInUser"))||[];

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
    getOrderData ()
    {
      return {
        date:this.#date,
        productId:this.#product_id,
        sellerId:this.#seller_id,
        quantity:this.#quantity,
        price:this.#price,
        orderId:this.#order_id,
        state:this.#state,
        user:this.#user
      }

    }
  
  }

  export function updateproductById(id) {
    let TotalOrders=JSON.parse(localStorage.getItem("ChartOrder")) || [];
    let index = TotalOrders.findIndex((order) => order.productId === parseInt(id) && order.user==currentuser.id);
    console.log(index)
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
  
export  function updateChartData(TotalOrders) {
    localStorage.setItem("ChartOrder", JSON.stringify(TotalOrders));

  }
export function order_is_exists(id) {
    let get_all_order = JSON.parse(localStorage.getItem("ChartOrder")) || [];
    let check_user_order=get_all_order.filter((order)=>{ return order.user===currentuser.id});
    console.log("user ",get_all_order);
    console.log("check user order",check_user_order);
    return check_user_order.some((order) => order.productId === id);
  }

export function getExistingOrder(id) {
    let get_all_order = JSON.parse(localStorage.getItem("ChartOrder")) || [];
    let check_user_order=get_all_order.filter((order)=>{return order.user===currentuser.id});
    return check_user_order.find((order) => order.productId === id);
  }

export function numberOfOrdersInCart() {
    let check_order = JSON.parse(localStorage.getItem("ChartOrder")) || [];
    let result_check=check_order.filter((order)=>{return order.user===currentuser.id});
    return result_check.length;
  }
export function updateBadge() {
    let badge = document.getElementsByClassName("badge")[0];
    if (numberOfOrdersInCart() != 0) {
      badge.style.display = "block";
      badge.innerText = numberOfOrdersInCart();

    }
  }
export function loggeduser()
{
  let user=JSON.parse(sessionStorage.getItem("loggedInUser"));
  return user;

}

//==================================================sessionorders==============
//=============================================================================
export  function updateChartguestData(TotalOrders) {
  sessionStorage.setItem("guestRequestorder", JSON.stringify(TotalOrders));

}
export function updateguestBadge() {
  let badge = document.getElementsByClassName("badge")[0];
  if (numberOfOrdersInCartguest() != 0) {
    badge.style.display = "block";
    badge.innerText = numberOfOrdersInCartguest();

  }
}
export function numberOfOrdersInCartguest() {
  let check_order = JSON.parse(sessionStorage.getItem("guestRequestorder")) || [];
  return check_order.length;
}


export function updateproductByIdguest(id) {
  let TotalOrders=JSON.parse(sessionStorage.getItem("guestRequestorder")) || [];
  let index = TotalOrders.findIndex((order) => order.productId === parseInt(id));
  if (index !== -1) {
    let stockQuantity = getStockQuantityById(parseInt(id)); 
    if (TotalOrders[index].quantity < stockQuantity) {
      TotalOrders[index].quantity += 1;
      updateChartguestData(TotalOrders);
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

export function order_is_exists_guest(id) {
  let get_all_order = JSON.parse(sessionStorage.getItem("guestRequestorder")) || [];
  return get_all_order.some((order) => order.productId === id);
}
