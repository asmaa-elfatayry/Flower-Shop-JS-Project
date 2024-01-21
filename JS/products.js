let numberOfProfProducts = 6;
window.addEventListener('load', function () {
    let flowers = JSON.parse(this.window.localStorage.getItem('flowersData'));
    let newRowDiv = document.createElement('div');
    newRowDiv.className = 'row justify-content-around';
    this.document.getElementById('productContainer').appendChild(newRowDiv);
    function addProduct(product) {
        let curProduct = this.document.createElement('div');
        curProduct.className = 'card col-12 col-md-5';
        curProduct.id = 'procuct-card'
        newRowDiv.appendChild(curProduct);
        curProduct.innerHTML = `
            <img src="../images/flowers/${product.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <div class="card-details">
                    <h5 class="card-title">${product.name}</h5>
                  
                    <span>${product.price} EGP<span>
                </div>
                <div class="card-options text-center">
                    <button class="btn btn-outline-secondary" type="button">
                                    Add to cart
                    </button>
                </div>
            </div>
        `
    }
    function displayProducts(txt) {
        let filteredFlowers = flowers.filter(function(cur) {
            return cur.name.toLowerCase().includes(txt.toLowerCase());
        });
        for (let i = 0; i < Math.min(numberOfProfProducts, filteredFlowers.length); i++) {
            addProduct(filteredFlowers[i]);
        }
    }
    displayProducts("");
    this.document.getElementById('searchBTN').addEventListener('click', function () {
        newRowDiv.innerHTML = '';
        let curSearch = document.getElementById('searchTXT').value.trim();
        displayProducts(curSearch);
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
    let categories = document.getElementsByClassName('categories');
    for (let i = 0; i < categories.length; i++) {
        categories[i].addEventListener('click', function (e) {
            for (let i = 0; i < categories.length; i++)
                categories[i].classList.remove("active");
            e.target.classList.add("active");
        })
    }
    let pagingBTNs = this.document.getElementsByClassName('paging-BTN');
    for (let btn = 0; btn < pagingBTNs.length; btn++) {
        pagingBTNs[btn].addEventListener('click', function (e) {
            let page = e.target.innerText;
            newRowDiv.innerHTML = '';
            for (let i = (page - 1) * numberOfProfProducts; i < Math.min((page - 1) * numberOfProfProducts + numberOfProfProducts, flowers.length); i++) {
                addProduct(flowers[i]);
            }
            for (let i = 0; i < pagingBTNs.length; i++)
                pagingBTNs[i].classList.remove("active");
            this.classList.add("active");
        })
    }
    this.document.getElementById('paging-next').addEventListener('click', function (e) {
        for (let i = 0; i < pagingBTNs.length; i++) {
            if (pagingBTNs[i].classList.contains('active')) {
                if (i == pagingBTNs.length - 1) {
                    let page = Number(pagingBTNs[i].children[0].innerText) + 1;
                    if ((page - 1) * numberOfProfProducts >= flowers.length)
                        break;
                    pagingBTNs[i].children[0].innerText = page;
                    pagingBTNs[i - 1].children[0].innerText = page - 1;
                    pagingBTNs[i - 2].children[0].innerText = page - 2;
                    newRowDiv.innerHTML = '';
                    for (let i = (page - 1) * numberOfProfProducts; i < Math.min((page - 1) * numberOfProfProducts + numberOfProfProducts, flowers.length); i++) {
                        addProduct(flowers[i]);
                    }
                }
                else {
                    pagingBTNs[i].classList.remove('active');
                    pagingBTNs[i + 1].classList.add('active');
                    let page = Number(pagingBTNs[i + 1].children[0].innerText);
                    newRowDiv.innerHTML = '';
                    for (let i = (page - 1) * numberOfProfProducts; i < Math.min((page - 1) * numberOfProfProducts + numberOfProfProducts, flowers.length); i++) {
                        addProduct(flowers[i]);
                    }
                    break;
                }
            }
        }
    })
    this.document.getElementById('paging-prev').addEventListener('click', function (e) {
        for (let i = 0; i < pagingBTNs.length; i++) {
            if (pagingBTNs[i].classList.contains('active')) {
                if (i == 0) {
                    let page = Number(pagingBTNs[i].children[0].innerText) - 1;
                    if (page < 1)
                        break;
                    pagingBTNs[i].children[0].innerText = page;
                    pagingBTNs[i + 1].children[0].innerText = page + 1;
                    pagingBTNs[i + 2].children[0].innerText = page + 2;
                    newRowDiv.innerHTML = '';
                    for (let i = (page - 1) * numberOfProfProducts; i < Math.min((page - 1) * numberOfProfProducts + numberOfProfProducts, flowers.length); i++) {
                        addProduct(flowers[i]);
                    }
                }
                else {
                    pagingBTNs[i].classList.remove('active');
                    pagingBTNs[i - 1].classList.add('active');
                    let page = Number(pagingBTNs[i - 1].children[0].innerText);
                    newRowDiv.innerHTML = '';
                    for (let i = (page - 1) * numberOfProfProducts; i < Math.min((page - 1) * numberOfProfProducts + numberOfProfProducts, flowers.length); i++) {
                        addProduct(flowers[i]);
                    }
                }
            }
        }
    })
})