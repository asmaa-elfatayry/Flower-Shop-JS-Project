let productContainer ,rowDiv ,flowers ,card,card_details;
function addProduct( product)
{
    card = document.createElement("div");
    card.classList.add("card", "col-6", "col-md-4", "col-lg-3");
    rowDiv.appendChild(card);
    card.innerHTML =`<div class="card-details"> 
    <img src="images/flowers/${product.image}" alt="flower">
    <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <div class="card-rating">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star-o"></i>
            <i class="fa fa-star-o"></i>
        </div>
        <p class="card-text">Add to Cart</p>
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


    












