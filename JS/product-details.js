window.addEventListener('load', function () {
    let product = JSON.parse(window.localStorage.getItem('productToShow'));
    let img_container = this.document.getElementById('product-image');
    let data_container = this.document.getElementById('product-data');
    img_container.innerHTML = `
        <img src="../images/flowers/${product.image}" class="img-fluid">
    `
    img_container.classList.add('border');
    img_container.classList.add('border-dark');
    img_container.classList.add('rounded');
    data_container.innerHTML = `
        <h1 class="text-center mb-5">${product.name}</h1>
        <p class="text-left mb-3 ml-5"><b>Description :</b> ${product.description}</p>
        <p class="text-left mb-3 ml-5"><b>Meaning :</b> ${product.meaning}</p>
        <div class="text-left mb-3 ml-5"><span><b>Price :</b> ${product.price} EGP</span></div>
        
        <div class="row text-center ml-4 mt-5">
            <div class="col-auto container">
                <div class="row">
                    <div class="col-auto mx-auto">
                        <div class="input-group">
                            <span class="input-group-prepend">
                                <button type="button" class="btn btn-danger btn-number" disabled="disabled" data-type="minus" data-field="quant[1]">
                                    <span class="fa fa-minus"></span>
                                </button>
                            </span>
                            <input type="text" style="width:100px;" name="quant[1]" class="text-secondary text-center form-control input-number" value="1" min="1" max="1000">
                            <span class="input-group-append">
                                <button type="button" class="btn btn-primary btn-number" data-type="plus" data-field="quant[1]">
                                    <span class="fa fa-plus"></span>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <button class="col-auto mx-3 btn btn-outline-secondary" type="button">
                    Add to cart
            </button>
            <button class="col-auto btn btn-outline-secondary" type="button">
                    Add to Wishlist
            </button>
        </div>
        <div class="m-5" style = "font-size:40px;">
            <span>Socials : </span>
            <i class="display-4 fa-brands fa-facebook-f text-primary mr-3"></i>
            <i class="display-4 fab fa-twitter text-primary mr-3"></i>
            <i class="display-4 fa-brands fa-pinterest text-danger mr-3"></i>
        </div>
    `
    $('.btn-number').click(function (e) {
        e.preventDefault();

        fieldName = $(this).attr('data-field');
        type = $(this).attr('data-type');
        var input = $("input[name='" + fieldName + "']");
        var currentVal = parseInt(input.val());
        if (!isNaN(currentVal)) {
            if (type == 'minus') {

                if (currentVal > input.attr('min')) {
                    input.val(currentVal - 1).change();
                }
                if (parseInt(input.val()) == input.attr('min')) {
                    $(this).attr('disabled', true);
                }

            } else if (type == 'plus') {

                if (currentVal < input.attr('max')) {
                    input.val(currentVal + 1).change();
                }
                if (parseInt(input.val()) == input.attr('max')) {
                    $(this).attr('disabled', true);
                }

            }
        } else {
            input.val(0);
        }
    });
    $('.input-number').focusin(function () {
        $(this).data('oldValue', $(this).val());
    });
    $('.input-number').change(function () {

        minValue = parseInt($(this).attr('min'));
        maxValue = parseInt($(this).attr('max'));
        valueCurrent = parseInt($(this).val());

        name = $(this).attr('name');
        if (valueCurrent >= minValue) {
            $(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr('disabled')
        } else {
            alert('Sorry, the minimum value was reached');
            $(this).val($(this).data('oldValue'));
        }
        if (valueCurrent <= maxValue) {
            $(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr('disabled')
        } else {
            alert('Sorry, the maximum value was reached');
            $(this).val($(this).data('oldValue'));
        }
    });

    $(".input-number").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
            // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
})