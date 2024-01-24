let numberOfProfProducts = 4;
window.addEventListener('DOMContentLoaded', function () {
    let flowers = JSON.parse(this.window.localStorage.getItem('flowersData'));
    let filteredFlowers;
    let newRowDiv = document.createElement('div');
    newRowDiv.className = 'row justify-content-around';
    document.getElementById('productContainer').appendChild(newRowDiv);
    function addProduct(product) {
        let curProduct = document.createElement('div');
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
        curProduct.addEventListener('click', function () {
            localStorage.setItem('productToShow', JSON.stringify(product));
            window.open('../HTML pages/product_details.html', '_self');
        })
    }
    let mnP = document.getElementById('minPrice');
    let mxP = document.getElementById('maxPrice');
    let pagingBTNs = document.getElementsByClassName('paging-BTN');
    function displayProducts() {
        newRowDiv.innerHTML = '';
        let txt = document.getElementById('searchTXT').value.trim();
        filteredFlowers = flowers.filter(function (cur) {
            return cur.name.toLowerCase().includes(txt.toLowerCase())
                && Number(cur.price) >= Number(mnP.value)
                && Number(cur.price) <= Number(mxP.value);
        });
        for (let i = 0; i < Math.min(numberOfProfProducts, filteredFlowers.length); i++) {
            addProduct(filteredFlowers[i]);
        }
        displayPaging();
    }
    displayProducts();
    document.getElementById('searchTXT').addEventListener('keyup', function () {
        displayProducts();
    })
    mnP.addEventListener('change', function () {
        if (Number(mnP.value) < 0)
            mnP.value = 0;
        if (Number(mnP.value) > Number(mxP.value))
            mnP.value = mxP.value;
        displayProducts();
    })
    mxP.addEventListener('change', function () {
        if (Number(mxP.value) < 0)
            mxP.value = 0;
        if (Number(mxP.value) < Number(mnP.value))
            mxP.value = mnP.value;
        displayProducts();
    })
    let categories = document.getElementsByClassName('categories');
    for (let i = 0; i < categories.length; i++) {
        categories[i].addEventListener('click', function (e) {
            for (let i = 0; i < categories.length; i++)
                categories[i].classList.remove("active");
            e.target.classList.add("active");
        })
    }
    function displayPaging() {
        let pages = Math.ceil(filteredFlowers.length / numberOfProfProducts);
        document.getElementsByClassName('dots-1')[0].classList.add('d-none');
        document.getElementById('paging-next').classList.remove('d-none');
        document.getElementById('paging-prev').classList.add('d-none');
        if (pages < 6) {
            for (let i = 0; i < pagingBTNs.length; i++) {
                if (i >= pages) {
                    pagingBTNs[i].classList.add('d-none');
                }
                else {
                    pagingBTNs[i].children[0].innerText = i + 1;
                }
            }
            document.getElementsByClassName('dots-2')[0].classList.add('d-none');
        }
        else {
            for (let i = 0; i < pagingBTNs.length - 1; i++) {
                pagingBTNs[i].children[0].innerText = i + 1;
            }
            document.getElementsByClassName('dots-2')[0].classList.remove('d-none');
            pagingBTNs[pagingBTNs.length - 1].children[0].innerText = pages;
        }
    }
    for (let btn = 0; btn < pagingBTNs.length; btn++) {
        pagingBTNs[btn].addEventListener('click', function (e) {
            let page = Number(e.target.innerText);
            let pages = Math.ceil(filteredFlowers.length / numberOfProfProducts);
            newRowDiv.innerHTML = '';
            for (let i = (page - 1) * numberOfProfProducts; i < Math.min((page - 1) * numberOfProfProducts + numberOfProfProducts, filteredFlowers.length); i++) {
                addProduct(filteredFlowers[i]);
            }
            for (let i = 0; i < pagingBTNs.length; i++)
                pagingBTNs[i].classList.remove("active");
            if (page >= 4 && page <= pages - 3) {
                document.getElementById('paging-prev').classList.remove('d-none');
                document.getElementById('paging-next').classList.remove('d-none');
                document.getElementsByClassName('dots-1')[0].classList.remove('d-none');
                document.getElementsByClassName('dots-2')[0].classList.remove('d-none');
                pagingBTNs[1].children[0].innerText = page - 1;
                pagingBTNs[2].children[0].innerText = page;
                pagingBTNs[2].classList.add("active");
                pagingBTNs[3].children[0].innerText = page + 1;
            }
            else if (page < 4) {
                displayPaging();
                pagingBTNs[0].classList.remove('active');
                pagingBTNs[page - 1].classList.add('active');
                if (page > 1)
                    document.getElementById('paging-prev').classList.remove('d-none');
            }
            else {
                for (let i = pagingBTNs.length - 1, cur = pages; i > 0; i--, cur--) {
                    pagingBTNs[i].children[0].innerText = cur;
                }
                document.getElementsByClassName('dots-1')[0].classList.remove('d-none');
                document.getElementsByClassName('dots-2')[0].classList.add('d-none');
                let idx = pagingBTNs.length - 1 - (pages - page);
                pagingBTNs[idx].classList.add("active");
                document.getElementById('paging-prev').classList.remove('d-none');
                if (page == pages)
                    document.getElementById('paging-next').classList.add('d-none');
                else
                    document.getElementById('paging-next').classList.remove('d-none');
            }
        })
    }
    document.getElementById('paging-next').addEventListener('click', function (e) {
        for (let i = 0; i < pagingBTNs.length; i++) {
            if (pagingBTNs[i].classList.contains('active')) {
                if (i == pagingBTNs.length - 1) {
                    let page = Number(pagingBTNs[i].children[0].innerText) + 1;
                    if ((page - 1) * numberOfProfProducts >= filteredFlowers.length)
                        break;
                    pagingBTNs[i].children[0].innerText = page;
                    pagingBTNs[i - 1].children[0].innerText = page - 1;
                    pagingBTNs[i - 2].children[0].innerText = page - 2;
                    newRowDiv.innerHTML = '';
                    for (let i = (page - 1) * numberOfProfProducts; i < Math.min((page - 1) * numberOfProfProducts + numberOfProfProducts, filteredFlowers.length); i++) {
                        addProduct(flowers[i]);
                    }
                }
                else {
                    pagingBTNs[i].classList.remove('active');
                    pagingBTNs[i + 1].classList.add('active');
                    let page = Number(pagingBTNs[i + 1].children[0].innerText);
                    newRowDiv.innerHTML = '';
                    for (let i = (page - 1) * numberOfProfProducts; i < Math.min((page - 1) * numberOfProfProducts + numberOfProfProducts, filteredFlowers.length); i++) {
                        addProduct(flowers[i]);
                    }
                    break;
                }
            }
        }
    })
    document.getElementById('paging-prev').addEventListener('click', function (e) {
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
                    for (let i = (page - 1) * numberOfProfProducts; i < Math.min((page - 1) * numberOfProfProducts + numberOfProfProducts, filteredFlowers.length); i++) {
                        addProduct(flowers[i]);
                    }
                }
                else {
                    pagingBTNs[i].classList.remove('active');
                    pagingBTNs[i - 1].classList.add('active');
                    let page = Number(pagingBTNs[i - 1].children[0].innerText);
                    newRowDiv.innerHTML = '';
                    for (let i = (page - 1) * numberOfProfProducts; i < Math.min((page - 1) * numberOfProfProducts + numberOfProfProducts, filteredFlowers.length); i++) {
                        addProduct(flowers[i]);
                    }
                }
            }
        }
    })
})