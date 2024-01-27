window.addEventListener('load', function () {
    let product = JSON.parse(window.localStorage.getItem('productToShow'));
    let img_container = this.document.getElementById('product-image');
    let data_container = this.document.getElementById('product-data');

    this.document.getElementById('product-image').children[0].src = `../images/flowers/${product.image}`

    this.document.getElementById('product-name').innerText = product.name;
    this.document.getElementById('product-description').innerText = product.description;
    this.document.getElementById('product-meaning').innerText = product.meaning;
    this.document.getElementById('product-price').innerText = product.price;
    this.document.getElementById('product-stock').innerText = product.stock;
    
    function validateAmount(val) {
        let curStock = Number(document.getElementById('product-stock').innerText);
        if (Number(val) >= curStock) {
            return curStock;
        }
        if (val <= 1)
            return 1;
        return val;
    }
    this.document.getElementById('minus-btn').addEventListener('click', function () {
        let oldVal = Number(document.getElementById('items-count').value);
        oldVal--;
        document.getElementById('items-count').value = validateAmount(oldVal);
    })

    this.document.getElementById('plus-btn').addEventListener('click', function () {
        let oldVal = Number(document.getElementById('items-count').value);
        oldVal++;
        document.getElementById('items-count').value = validateAmount(oldVal);
    })

    this.document.getElementById('items-count').addEventListener('change', function (e) {
        e.target.value = validateAmount(e.target.value);
    })
})