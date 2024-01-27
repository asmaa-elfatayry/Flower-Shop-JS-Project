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