let mywishlist, tbody, createdTr, createdTD1, createdTD2, createdTD3, createdTD4, createdTD5 ,row_div,productContainer;
window.addEventListener('load', function () {
    mywishlist = JSON.parse(window.localStorage.getItem("favourites"));
    productContainer = document.querySelector(".productContainer");
    rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    productContainer.appendChild(rowDiv);
    function addProduct(product ,rowDiv) {
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
    
        // const heartIcon = document.createElement("i");
        // heartIcon.classList.add("fa-solid", "fa-heart" ,"for_wish");
        // heartIcon.id = product.id;
    
        // heartIcon.style.fontSize ="2rem";
        // iconsDiv.appendChild(heartIcon);
        
    
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
    
        const addToCartButton = document.createElement("button");
        addToCartButton.textContent = "Add to Cart";
        cardBody.appendChild(addToCartButton);
    }
    
   for(let i= 0; i<mywishlist.length; i++)
   { 
      addProduct(mywishlist[i],rowDiv);

   }
       
        
    });
    
   /* tbody = document.querySelector("tbody");
console.log(mywishlist);
    mywishlist.forEach(flower => {
        createdTr = document.createElement('tr');
        for (let key in flower) {
            if (flower.hasOwnProperty(key)) {
                if (key === 'image') {
                    createdTD1 = document.createElement('td');
                    creatImg = document.createElement('img');
                    creatImg.setAttribute("src",`../images/flowers/${flower[key]}`) // get image from local storage 
                    console.log(creatImg );
                    console.log( flower[key]);
                    creatImg.alt = "whishlist";
                    creatImg.setAttribute("class", "whishlistImg");
                    createdTD1.appendChild(creatImg);
                } else if (key === 'name') {
                    createdTD2 = document.createElement('td');
                    createdTD2.textContent = flower[key];
                } else if (key === 'price') {
                    createdTD3 = document.createElement('td');
                    createdTD3.textContent = flower[key];
                }
                else if (key === 'id'){
                    createdTD4 = document.createElement('td');
                    createdTD4.innerHTML = `<button id="${flower[key]}">Add To Cart</button>`;;

                }
            }
        }
        // Create the delete icon
        createdTD5 = document.createElement('td');
        createdTD5.innerHTML = '<i class="fa fa-facebook">delete</i>';

        // Append all the created td elements in the desired order
        createdTr.appendChild(createdTD1);
        createdTr.appendChild(createdTD2);
        createdTr.appendChild(createdTD3);
        createdTr.appendChild(createdTD4);
        createdTr.appendChild(createdTD5);

        tbody.appendChild(createdTr);
    });
});*/

// window.localStorage.setItem("favourites",JSON.stringify([]));: to clear the content of favourites after adding data in it 
 