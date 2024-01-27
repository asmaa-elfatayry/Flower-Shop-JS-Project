import * as order from './order.js';
let numberOfProfProducts = 4;
window.addEventListener('DOMContentLoaded', function () {
    order.updateBadge();
    order.updateguestBadge();

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
                    <button class="btn btn-outline-secondary cart " id="${product.id}"  type="button">
                    
                                    Add to cart
                    </button>
                </div>
            </div>

        `
        curProduct.addEventListener('click', function (event) {
            if (event.target.classList.contains("cart")) {
                addchart(event.target.id);
            } else {
                localStorage.setItem('productToShow', JSON.stringify(product));
                window.open('../HTML pages/product_details.html', '_self');
            }
        });

    }
    let mnP = document.getElementById('minPrice');
    let mxP = document.getElementById('maxPrice');
    let pagingBTNs = document.getElementsByClassName('paging-BTN');
    function filterProducts() {
        let txt = document.getElementById('searchTXT').value.trim();
        filteredFlowers = flowers.filter(function (cur) {
            return cur.name.toLowerCase().includes(txt.toLowerCase())
                && Number(cur.price) >= Number(mnP.value)
                && Number(cur.price) <= Number(mxP.value);
        });
    }
    function displayProducts(page) {
        newRowDiv.innerHTML = '';
        filterProducts();
        for (let i = (page - 1) * numberOfProfProducts; i < Math.min((page - 1) * numberOfProfProducts + numberOfProfProducts, filteredFlowers.length); i++) {
            addProduct(filteredFlowers[i]);
        }
        displayPaging(page);
    }
    displayProducts(1);
    document.getElementById('searchTXT').addEventListener('keyup', function () {
        displayProducts(1);
    })
    mnP.addEventListener('change', function () {
        if (Number(mnP.value) < 0)
            mnP.value = 0;
        if (Number(mnP.value) > Number(mxP.value))
            mnP.value = mxP.value;
        displayProducts(1);
    })
    mxP.addEventListener('change', function () {
        if (Number(mxP.value) < 0)
            mxP.value = 0;
        if (Number(mxP.value) < Number(mnP.value))
            mxP.value = mnP.value;
        displayProducts(1);
    })
    let categories = document.getElementsByClassName('categories');
    for (let i = 0; i < categories.length; i++) {
        categories[i].addEventListener('click', function (e) {
            for (let i = 0; i < categories.length; i++)
                categories[i].classList.remove("active");
            e.target.classList.add("active");
        })
    }
    function removePaging() {
        for (let i = 0; i < pagingBTNs.length; i++) {
            pagingBTNs[i].classList.add('d-none');
            pagingBTNs[i].classList.remove('active');
        }
        document.getElementsByClassName('dots-1')[0].classList.add('d-none');
        document.getElementsByClassName('dots-2')[0].classList.add('d-none');
        document.getElementById('paging-prev').classList.add('d-none');
        document.getElementById('paging-next').classList.add('d-none');
    }
    function displayPaging(page) {
        removePaging();
        let pages = Math.ceil(filteredFlowers.length / numberOfProfProducts);
        if (page > 1)
            document.getElementById('paging-prev').classList.remove('d-none');
        if (page < pages)
            document.getElementById('paging-next').classList.remove('d-none');
        if (page >= 4 && page <= pages - 3) {
            document.getElementsByClassName('dots-1')[0].classList.remove('d-none');
            document.getElementsByClassName('dots-2')[0].classList.remove('d-none');
            for (let i = 0; i < pagingBTNs.length; i++)
                pagingBTNs[i].classList.remove('d-none');
            pagingBTNs[0].children[0].innerText = 1;
            pagingBTNs[1].children[0].innerText = page - 1;
            pagingBTNs[2].children[0].innerText = page;
            pagingBTNs[2].classList.add("active");
            pagingBTNs[3].children[0].innerText = page + 1;
            pagingBTNs[4].children[0].innerText = pages;
        }
        else if (page < 4) {
            for (let i = 0; i < pagingBTNs.length; i++) {
                if (i < pages) {
                    pagingBTNs[i].children[0].innerText = i + 1;
                    pagingBTNs[i].classList.remove('d-none');
                    if (page == i + 1)
                        pagingBTNs[i].classList.add('active');
                }
                else
                    break;
            }
            if (pages >= 6)
                document.getElementsByClassName('dots-2')[0].classList.remove('d-none');
        }
        else {
            for (let i = pagingBTNs.length - 1, cur = pages; i > 0; i--, cur--) {
                pagingBTNs[i].children[0].innerText = cur;
                pagingBTNs[i].classList.remove('d-none');
                if (page == cur)
                    pagingBTNs[i].classList.add('active');
            }
            if (pages >= 6) {
                document.getElementsByClassName('dots-1')[0].classList.remove('d-none');
                pagingBTNs[0].classList.remove('d-none');
                pagingBTNs[0].children[0].innerText = 1;
            }
        }
    }
    for (let btn = 0; btn < pagingBTNs.length; btn++) {
        pagingBTNs[btn].addEventListener('click', function (e) {
            let page = Number(e.target.innerText);
            displayProducts(page);
        })
    }
    document.getElementById('paging-next').addEventListener('click', function (e) {
        for (let i = 0; i < pagingBTNs.length; i++) {
            if (pagingBTNs[i].classList.contains('active')) {
                displayProducts(Number(pagingBTNs[i].children[0].innerText) + 1);
                break;
            }
        }
    })
    document.getElementById('paging-prev').addEventListener('click', function (e) {
        for (let i = 0; i < pagingBTNs.length; i++) {
            if (pagingBTNs[i].classList.contains('active')) {
                displayProducts(Number(pagingBTNs[i].children[0].innerText) - 1);
                break;
            }
        }
    })



    //=================================================================================
    //===================Add product in cart===========================================

    function addchart(id) {
        let CurrentUserData = JSON.parse(sessionStorage.getItem("loggedInUser")) || [];
        let TotalOrders = JSON.parse(localStorage.getItem("ChartOrder")) || [];


        let p_id = parseInt(id);
        if (!order.order_is_exists(p_id)) {
            let found_prod = flowers.find((flower) => flower.id === p_id);
            let quantity = 1;
            let orderid = TotalOrders.length + 1;
            let price = found_prod.price;
            let sellerid = found_prod.seller.id;
            let date = new Date();
            let state = "pending";
            let prodId = found_prod.id;
            if (CurrentUserData.length == 0) {
                let TotalguestOrders = JSON.parse(sessionStorage.getItem("guestRequestorder")) || [];
                let user = -1;
                if (!order.order_is_exists_guest(p_id))
                {
                let new_order = new order.Order(date, prodId, sellerid, quantity, price, orderid, state, user);
                TotalguestOrders.push(new_order.getOrderData());
                order.updateChartguestData(TotalguestOrders);
                order.updateguestBadge();
                

                }
                else{
                    order.updateproductByIdguest(p_id);
                    order.updateguestBadge();
                }

            }
            else {
                let user = CurrentUserData.id;
                let new_order = new order.Order(date, prodId, sellerid, quantity, price, orderid, state, user);
                TotalOrders.push(new_order.getOrderData());
                order.updateChartData(TotalOrders);
                order.updateBadge();
            }

        } else {
            order.updateproductById(p_id);
            order.updateBadge();
        }




    }


});
