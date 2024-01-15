window.addEventListener('load', function () {
    let flowers = JSON.parse(this.window.localStorage.getItem('flowersData'));
    let newRowDiv = document.createElement('div');
    newRowDiv.className = 'row';
    this.document.getElementById('productContainer').appendChild(newRowDiv);
    function addProduct(product) {
        let curProduct = this.document.createElement('div');
        curProduct.className = 'card col-12 col-md-5 col-lg-3';
        curProduct.id = 'procuct-card'
        newRowDiv.appendChild(curProduct);
        curProduct.innerHTML = `
            <img src="../images/flowers/${product.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <div class="card-details">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <span>${product.price} EGP<span>
                </div>
                <div class="card-options text-center">
                    <button class="btn btn-outline-secondary" type="button">
                                    product details
                    </button>
                    <button class="btn btn-outline-secondary" type="button">
                                    Add to cart
                    </button>
                </div>
            </div>
        `
    }
    for (let i = 0; i < flowers.length; i++) {
        addProduct(flowers[i]);
    }
    this.document.getElementById('searchBTN').addEventListener('click', function () {
        newRowDiv.innerHTML = '';
        for (let i = 0; i < flowers.length; i++) {
            let curSearch = document.getElementById('searchTXT').value.trim();
            if (flowers[i].name.includes(curSearch))
                addProduct(flowers[i]);
        }
    })
    let mnP = document.getElementById('minPrice');
    let mxP = document.getElementById('maxPrice');
    mnP.addEventListener('change', function () {
        if (Number(mnP.value) < 0)
            mnP.value = 0;
        if (Number(mnP.value) > Number(mxP.value))
            mnP.value = mxP.value;
    })
    mxP.addEventListener('change', function () {
        if (Number(mxP.value) < 0)
            mxP.value = 0;
        if (Number(mxP.value) < Number(mnP.value))
            mxP.value = mnP.value;
    })
    this.document.getElementById('priceFilterBTN').addEventListener('click', function () {
        newRowDiv.innerHTML = '';
        for (let i = 0; i < flowers.length; i++) {
            if (Number(flowers[i].price) >= Number(mnP.value) && Number(flowers[i].price) <= Number(mxP.value))
                addProduct(flowers[i]);
        }
    })
    let categories = document.getElementsByTagName('li');
    for (let i = 0; i < categories.length; i++) {
        categories[i].addEventListener('click', function (e) {
            for (let i = 0; i < categories.length; i++)
                categories[i].classList.remove("active");
            e.target.classList.add("active");
        })
    }
})