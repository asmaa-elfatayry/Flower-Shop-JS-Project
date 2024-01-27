import * as order from './order.js';
window.addEventListener('load', function () {
    let currentuser=JSON.parse(sessionStorage.getItem("loggedInUser"))||[];
   

    let table = document.getElementById("orderTable");
    let tbody = document.getElementById("orderlist");
    let price = document.getElementById("price");
    let quantity = document.getElementById("quantity");
    let total = document.getElementById("total");


    createTable();
    generateBill();

    function getTotalorders()
    {
        let TotalOrders;
        if(currentuser.length==0)
        {
            TotalOrders=JSON.parse(sessionStorage.getItem("guestRequestorder")) || [];
        }
        else
        {
            TotalOrders=JSON.parse(localStorage.getItem("ChartOrder")) || [];
        }
        
        return TotalOrders;

    }
    function getuserorder()
    {
        let TotalOrders;
        if(currentuser.length==0)
        {
            TotalOrders=JSON.parse(sessionStorage.getItem("guestRequestorder")) || [];
            return TotalOrders;

        }
        else
        {
            let TotalOrders=JSON.parse(localStorage.getItem("ChartOrder")) || [];
            let ExistChartOrder = TotalOrders.filter((order)=>{ return order.user===currentuser.id});
            return ExistChartOrder;
    
        }
        
    }
    function generateBill() {
        price.innerText = `Price: ${getPrice()}`;
        quantity.innerText = `Total Quantity: ${getQuantity()}`;
        total.innerText = `Total: ${getTotal()}`;
    }

    function getTotal() {
        let ExistChartOrder=getuserorder();
        let total = 0;
        for (let i = 0; i < ExistChartOrder.length; i++) {
            total += ExistChartOrder[i].quantity * ExistChartOrder[i].price;
        }
        return total.toFixed();

    }

    function getQuantity() {
        let ExistChartOrder=getuserorder();
        let quantity = 0;
        for (let i = 0; i < ExistChartOrder.length; i++) {
            quantity += ExistChartOrder[i].quantity;
        }
        return quantity;

    }
    function getPrice() {
        let ExistChartOrder=getuserorder();
        let price = 0;
        for (let i = 0; i < ExistChartOrder.length; i++) {
            price += ExistChartOrder[i].price;
        }
        return price.toFixed(2);
    }

    function getPriceForProduct(i) {
        let ExistChartOrder=getuserorder();
        let price = 0;
        price= ExistChartOrder[i].price * ExistChartOrder[i].quantity;
        return price.toFixed(2);
    }

    function createTable() {
        let ExistChartOrder=getuserorder();
        console.log(ExistChartOrder);
        if (ExistChartOrder.length === 0) {
            var messageRow = document.createElement("tr");
            var messageCell = document.createElement("td");
            messageCell.colSpan = 5;

            var icon = document.createElement("i");
            icon.classList.add("fa", "fa-ban", "mr-2");
            icon.style.color = "red";
            icon.style.fontSize = "1.5rem";
            messageCell.appendChild(icon);

            messageCell.appendChild(document.createTextNode("  No orders available."));
            messageRow.appendChild(messageCell);
            tbody.appendChild(messageRow);
        }
        else {
            for (let i = 0; i < ExistChartOrder.length; i++) {
                var row = document.createElement("tr");
                row.id = ExistChartOrder[i].productId;
                var numberCell = document.createElement("td");
                numberCell.appendChild(document.createTextNode(ExistChartOrder[i].orderId));
                row.appendChild(numberCell);

                var imgCell = document.createElement("td");
                imgCell.className = "order-img";
                var imge = document.createElement("img");
                imge.classList.add("rounded-circle");
                if(currentuser.length==0)
                {
                    imge.src = "../images/flowers/" + getProductImgByIdguest(ExistChartOrder[i].productId);

                }
                else
                {
                    imge.src = "../images/flowers/" + getProductImgById(ExistChartOrder[i].productId);

                }
                imge.width = "50";
                imge.height = "50";

                imgCell.appendChild(imge);
                row.appendChild(imgCell);

                var priceCell = document.createElement("td");
                priceCell.appendChild(document.createTextNode(ExistChartOrder[i].price));
                row.appendChild(priceCell);

                var quantityCell = document.createElement("td");
                var input = document.createElement("input");
                input.value = ExistChartOrder[i].quantity;
                input.type = "number";
                input.min = "1";
                input.addEventListener('keyup', inTheStock);
                input.addEventListener('input', inTheStock);
                input.addEventListener('change', inTheStock);
                input.max = `${order.getStockQuantityById(ExistChartOrder[i].productId)}`;
                quantityCell.appendChild(input);
                row.appendChild(quantityCell);
                
                var Totalprice=document.createElement("td");
                Totalprice.appendChild(document.createTextNode(getPriceForProduct(i)));
                row.appendChild(Totalprice);

                var removeCell = document.createElement("td");
                removeCell.innerHTML = `<i class="fa fa-trash" id="${ExistChartOrder[i].orderId}" style="color:red ;font-size:1.5rem"></i>`;
                removeCell.addEventListener('click', removeorder);
                row.appendChild(removeCell);

                tbody.appendChild(row);
            }

            table.appendChild(tbody);
        }
    }
    function inTheStock(event) {
        var productId = parseInt(event.target.parentNode.parentNode.id);
        var inputElement = event.target;
        handleQuantityChange(productId, inputElement);

    }

    function handleQuantityChange(productId, inputElement) {

        var enteredQuantity = parseInt(inputElement.value);

        if (!Number.isInteger(enteredQuantity) || enteredQuantity <= 0) {
            removeTable();
            createTable();
        } else if (enteredQuantity > order.getStockQuantityById(productId)) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "The quantity is not available right now",
                showConfirmButton: false,
                timer: 1500,
            });
            removeTable();
            createTable();
        } else {
            let TotalOrders=JSON.parse(localStorage.getItem("ChartOrder")) || [];
            let index = TotalOrders.findIndex((order) => order.productId === parseInt(id) && order.user==currentuser.id);
            TotalOrders[index].quantity = enteredQuantity;
            order.updateChartData(TotalOrders);
            removeTable();
            createTable();
            generateBill();
        }
    }

    function getProductImgById(id) {
        let TotalOrders=getTotalorders();
        let resultOrdeId = TotalOrders.find((order) => order.productId === parseInt(id) && order.user==currentuser.id);
        let searchedProduct = JSON.parse(localStorage.getItem("flowersData")) || [];
        let resultproduct = searchedProduct.find((flower) => flower.id === resultOrdeId.productId);
        return resultproduct.image;
    }
    function getProductImgByIdguest(id) {
        let TotalOrders=getTotalorders();
        let resultOrdeId = TotalOrders.find((order) => order.productId === parseInt(id));
        let searchedProduct = JSON.parse(localStorage.getItem("flowersData")) || [];
        let resultproduct = searchedProduct.find((flower) => flower.id === resultOrdeId.productId);
        return resultproduct.image;
    }
    function removeTable() {
        tbody.innerHTML = ``;
    }
    function removeorder(event) {
        let TotalOrders=getTotalorders();
        let index;
        if(currentuser.length==0)
        {
             index = TotalOrders.findIndex((order) => order.orderId == event.target.id);

            
        }
        else
        {
             index = TotalOrders.findIndex((order) => order.orderId == event.target.id && order.user==currentuser.id);


        }
        TotalOrders.splice(index, 1);
        order.updateChartData(TotalOrders);
        removeTable();
        createTable();
        generateBill();
    }
});
