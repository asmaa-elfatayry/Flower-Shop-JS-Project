/*let productContainer ,rowDiv ,flowers ,card,card_details;
function addProduct( product)
{
    card = document.createElement("div");
    card.classList.add("card", "col-6", "col-md-4", "col-lg-3");
    rowDiv.appendChild(card);
    card.innerHTML =`<div class="card-details">
    <div class="icons" id="icons">
    <a href ="favourites.html title="whishlist"><i class="fa-solid fa-heart"></i></a>
    </div>
    <img src="images/flowers/${product.image}" alt="flower">
    <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <div id="wish">
        <i class="fa fa-star"></i> 
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star-o">
        <i class="fa fa-star-o">
        </div>
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

});*/
function addProduct(product) {
    card = document.createElement("div");
    card.classList.add("card", "col-6", "col-md-4", "col-lg-3");
    rowDiv.appendChild(card);

    cardDetails = document.createElement("div");
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
    imgElement.src = `images/flowers/${product.image}`;
    imgElement.alt = "flower";
    cardDetails.appendChild(imgElement);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    cardDetails.appendChild(cardBody);

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = product.name;
    cardBody.appendChild(cardTitle);

    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "Add to Cart";
    cardBody.appendChild(addToCartButton);
}

window.addEventListener("load", function () {
    flowers = JSON.parse(window.localStorage.getItem("flowersData"));
    productContainer = document.querySelector(".productContainer");
    rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    productContainer.appendChild(rowDiv);

    for (let i = 0; i < 8; i++) {
        addProduct(flowers[i]);
    }
});