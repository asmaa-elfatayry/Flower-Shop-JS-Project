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
    cardBody.appendChild(addToCartButton);
    card.addEventListener('click', function () {
        localStorage.setItem('productToShow', JSON.stringify(product));
        window.open('../HTML pages/product_details.html', '_self');
    })
}