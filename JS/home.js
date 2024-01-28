
let favourites , favIcon,divflower ,selflower,flower , fav ,x ,flowers ,e , productContainer ,rowDiv;
window.addEventListener("load", function () {
    flowers = JSON.parse(window.localStorage.getItem("flowersData"));
    productContainer = document.querySelector(".productContainer");
    rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    productContainer.appendChild(rowDiv);

    for (let i = 0; i < 8; i++) {
        addProduct(flowers[i],rowDiv);

    }

    function addProduct(product ,rowdifv) {
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
    
        const heartIcon = document.createElement("i");
        heartIcon.classList.add("fa-solid", "fa-heart" ,"for_wish");
        heartIcon.id = product.id;
        productContainer.addEventListener('click',wish);       /* heartIcon.addEventListener('click',wish);*/
        heartIcon.style.fontSize ="2rem";
        iconsDiv.appendChild(heartIcon);
        
    
        const imgElement = document.createElement("img");
        imgElement.src = `images/flowers/${product.image}`;// get image in local folder
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
    function wish(e) {  
  
   
        fav = JSON.parse(window.localStorage.getItem("favourites"));
        if(e.target.parentElement.classList.contains("for_wish")){
            x = parseInt(e.target.parentElement.id);// svg is parentelement ,  target : icon <i></i>  need the id of  <svg id="i"><i ></i></svg>, 
            selflower = flowers.find(flower => flower.id == x);
            // to check the selected flower added before to  the favourites local storage or not , added  only one time 
            if (!fav.some(flower => flower.id === x)) {// some returns boolean
                fav.push(selflower);
                window.localStorage.setItem("favourites", JSON.stringify(fav));
                favIcon = document.getElementById(e.target.parentElement.id);
                favIcon.style.color = "#E72463";
                favIcon.parentElement.style.opacity ="1";
    
            }
        }
    
     
    } 
});



