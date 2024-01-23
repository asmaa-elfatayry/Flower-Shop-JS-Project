let productContainer ,rowDiv ,flowers ,card,card_details;
function addProduct( product)
{
    card = document.createElement("div");
    card.classList.add("card", "col-6", "col-md-4", "col-lg-3");
    rowDiv.appendChild(card);
    card.innerHTML =`<div class="card-details">
    <div class="icons" id="icons">
    <a href="cart.html title="Add to cart"><i class="fa-solid fa-cart-plus"></i></a>
    <a href ="favourites.html title="whishlist"><i class="fa-solid fa-heart"></i></a>
    </div>
    <img src="images/flowers/${product.image}" alt="flower">
    <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <button>Add to Cart</button>
    </div> 
    </div>`;
}//end of addProduct
window.addEventListener("load" , function(){
    flowers = JSON.parse(this.window.localStorage.getItem("flowersData"));
    productContainer = document.querySelector(".productContainer");
    rowDiv = document.createElement("div");
    rowDiv.classList.add("row",);
    productContainer.appendChild(rowDiv);

    for(let i=0; i<8;i++)
    {
        addProduct(flowers[i])
    }

});


    












