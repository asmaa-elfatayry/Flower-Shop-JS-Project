import { loggeduser } from "../JS/order.js";
import { addchart } from "../JS/card.js";

window.addEventListener('load', function () {
    let product = JSON.parse(window.localStorage.getItem('productToShow'));
    let img_container = this.document.getElementById('product-image');
    let data_container = this.document.getElementById('product-data');

    this.document.getElementById('product-image').children[0].src = `../images/flowers/${product.image}`

    this.document.getElementById('product-name').innerHTML = `${product.name} <i class="ms-3 heartBtn fa-solid fa-heart"></i>`;
    this.document.getElementById('product-description').innerText = product.description;
    this.document.getElementById('product-meaning').innerText = product.meaning;
    this.document.getElementById('product-price').innerText = product.price + ' EGP';
    this.document.getElementById('product-category').innerText = product.category;
    this.document.getElementById('product-stock').innerText = product.stock;
    this.document.getElementById('items-price').innerText = product.price + ' EGP';
    function validateAmount(val) {
        document.getElementById('minus-btn').removeAttribute('disabled');
        document.getElementById('plus-btn').removeAttribute('disabled');
        let curStock = Number(document.getElementById('product-stock').innerText);
        if (Number(val) >= curStock) {
            document.getElementById('plus-btn').setAttribute('disabled', 'true');
            return curStock;
        }
        if (val <= 1) {
            document.getElementById('minus-btn').setAttribute('disabled', 'true');
            return 1;
        }
        return val;
    }
    this.document.getElementById('minus-btn').addEventListener('click', function () {
        let newVal = validateAmount(Number(document.getElementById('items-count').value) - 1);
        document.getElementById('items-count').value = newVal;
        document.getElementById('items-price').innerText = `${Number(newVal * product.price).toFixed(2)} EGP`;
    })

    this.document.getElementById('plus-btn').addEventListener('click', function () {
        let newVal = validateAmount(Number(document.getElementById('items-count').value) + 1);
        document.getElementById('items-count').value = newVal;
        document.getElementById('items-price').innerText = `${Number(newVal * product.price).toFixed(2)} EGP`;
    })

    this.document.getElementById('items-count').addEventListener('change', function (e) {
        e.target.value = validateAmount(e.target.value);
        document.getElementById('items-price').innerText = `${Number(Number(e.target.value) * product.price).toFixed(2)} EGP` ;
    })

    function addReview(curDiv, review_data) {
        let comment_div = document.createElement('div');
        curDiv.appendChild(comment_div);
        comment_div.classList.add('col-10', 'mb-3', 'comment');
        let review = document.createElement('q');
        review.classList.add("text-break","mx-3","text-success");
        comment_div.appendChild(review);
        let name = document.createElement('i');
        comment_div.appendChild(name);
        name.classList.add("text-muted");
        // console.log();
        review.innerText = review_data.review;
        name.innerText = review_data.name;
    }
    function loadReviews() {
        let reviews = product.reviews;
        for (let i = 0; i < reviews.length; i++) {
            let curDiv = document.getElementById('comments');
            addReview(curDiv, reviews[i]);
        }
    }
    loadReviews();

    this.document.getElementById('commentBTN').addEventListener('click', function () {
        let text = document.getElementById('commentTextarea').value.trim();
        let username = JSON.parse(sessionStorage.getItem("loggedInUser"));
        if (!username) {
            Swal.fire('please login first');
            return;
        }
        if (!text) {
            Swal.fire('please write something first');
            return;
        }
        let curDiv = document.getElementById('comments');
        //adding new review
        const rev = {
            name: username.name,
            review: text
        }
        addReview(curDiv, rev);
        //adding the review to the local storage
        let flowers = JSON.parse(window.localStorage.getItem('flowersData'));
        for (let i = 0; i < flowers.length; i++) {
            if (flowers[i].id == product.id) {
                flowers[i].reviews.push(rev);
                console.log(flowers[i]);
                break;
            }
        }
        localStorage.setItem("flowersData", JSON.stringify(flowers));
    })

    document.getElementById('addCartBTN').addEventListener('click',function() {
        addchart(product.id);
    })
})