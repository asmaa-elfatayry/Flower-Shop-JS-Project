import * as order from './order.js';
export function addProduct(product, rowDiv) {
    let card = document.createElement("div");
    card.classList.add("card", "col-12", "col-md-5", "col-lg-3");
    rowDiv.appendChild(card);

    let cardDetails = document.createElement("div");
    cardDetails.classList.add("card-details");
    card.appendChild(cardDetails);

    const iconsDiv = document.createElement("div");
    iconsDiv.classList.add("icons");
    iconsDiv.id = "icons";
    cardDetails.appendChild(iconsDiv);

    const heartIconLink = document.createElement("a");
    heartIconLink.href = "favourites.html";
    heartIconLink.title = "Wishlist";

    const heartIcon = document.createElement("i");
    heartIcon.classList.add("fa-solid", "fa-heart");
    heartIconLink.appendChild(heartIcon);

    iconsDiv.appendChild(heartIconLink);

    const imgElement = document.createElement("img");
    imgElement.src = `../images/flowers/${product.image}`;
    imgElement.alt = "flower";
    cardDetails.appendChild(imgElement);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    cardDetails.appendChild(cardBody);

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = product.name;
    cardBody.appendChild(cardTitle);

    const price = document.createElement("p");
    cardTitle.textContent = `${product.price} EGP`;
    cardBody.appendChild(cardTitle);

    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "Add to Cart";
    addToCartButton.id = `${product.id}`;
    addToCartButton.classList.add("cart");
    cardBody.appendChild(addToCartButton);
    card.addEventListener('click', function (event) {
        if (event.target.classList.contains("cart")) {
            addchart(event.target.id);
        } else {
            localStorage.setItem('productToShow', JSON.stringify(product));
            window.open('../HTML pages/product_details.html', '_self');
        }
    })
}

function addchart(id) {
    //debugger;
    let CurrentUserData = JSON.parse(sessionStorage.getItem("loggedInUser")) || [];
    let TotalOrders = JSON.parse(localStorage.getItem("ChartOrder")) || [];
    let TotalOrdersg =JSON.parse(sessionStorage.getItem("guestRequestorder")) || [];
    let flowers = JSON.parse(localStorage.getItem('flowersData'));
    let p_id = parseInt(id);
    if (!order.order_is_exists(p_id)) {
        let found_prod = flowers.find((flower) => flower.id === p_id);
        let quantity = 1;
        let orderid;
        let price = found_prod.price;
        let sellerid = found_prod.seller.id;
        let date = new Date();
        let state = 0;
        let prodId = found_prod.id;
        let user;
        if (CurrentUserData.length == 0) {
            user = -1;
            orderid=TotalOrdersg.length+1;

        }
        else {
            user = CurrentUserData.id;
            orderid= TotalOrders.length + 1;
        }
        let new_order = new order.Order(date, prodId, sellerid, quantity, price, orderid, state, user);
        if(CurrentUserData.length==0)
        {
            TotalOrdersg.push(new_order.getOrderData());
            order.updateChartData(TotalOrdersg);

        }
        else{
            TotalOrders.push(new_order.getOrderData());
            order.updateChartData(TotalOrders);

        }
        order.updateBadge();

    } else {
        order.updateproductById(p_id);
        order.updateBadge();
    }
}