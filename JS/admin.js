window.addEventListener("load", function () {

  // retrive data to cards in main page
  let Revenue = document.getElementById("Revenue");
  let Users = document.getElementById("Users");
  let Visitors = document.getElementById("Visitors");
  let Orders = document.getElementById("Orders");
  Revenue.textContent = ("$ " + (localStorage.getItem("totalPrice") ? Math.floor(Number(JSON.parse(localStorage.getItem("totalPrice")))) : 0));
  Users.textContent = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")).length : 0; 
  Orders.textContent = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")).length : 0;
  Visitors.textContent = localStorage.getItem("visitors") ? JSON.parse(localStorage.getItem("visitors")) : 0;

  // if not admin deny access to the page
  let curUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
  if(!curUser || curUser.role != 'admin') {
    let error = document.createElement("div");
    let head404 = document.createElement("h1");
    let miniHead404 = document.createElement("h3");
    let paragraph404 = document.createElement("p");
    paragraph404.textContent = "The resource requested could not be found on this server";
    head404.textContent = "404";
    miniHead404.innerText = "Not Found";
    error.classList.add("page-not-found");
    error.appendChild(head404);
    error.appendChild(miniHead404);
    error.appendChild(paragraph404);
    document.body.innerHTML = "";
    document.body.style.backgroundColor = "#FFF";
    document.body.appendChild(error);
    error.appendChild();
    sessionStorage.removeItem("loggedInUser");
    return;
  }

  // if admin logged in then he leaved the page, deny access
  window.addEventListener('beforeunload', function(event) {
    if (window.location.href === "http://127.0.0.1:5501/Flower-Shop-JS-Project/HTML%20pages/admin.html") 
      sessionStorage.removeItem('loggedInUser');
  });
  
  let page  = "";
  var lastsorted = ""
  var content = document.getElementById("content");
  var main_page = document.querySelector(".data .content .main-data");
  var links = document.querySelectorAll(".data .side .main-list > a");
  let flowersData = JSON.parse(localStorage.getItem("flowersData")) || [];
  let sellersData = JSON.parse(localStorage.getItem("sellerData")) || [];
  let usersData = JSON.parse(localStorage.getItem("userData")) || [];
  let ordersData = JSON.parse(localStorage.getItem("order")) || [];
  let messagesData = JSON.parse(localStorage.getItem("messages")) || [];
  let requestseller = JSON.parse(localStorage.getItem("requestseller")) || [];
  
  // navigation from side bar
  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", (e) => {
      page = e.target.classList[0].toLowerCase().trim();
      links.forEach((link)=>link.classList.remove("active"));
      e.target.closest("a").classList.add("active");
      var items;
      switch (page) {
        case "products":
        items = flowersData;
        break;

        case "sellers":
        items = sellersData;
        break;
        
        case "users":
        items = usersData;
        break;
        
        case "orders":
        items = ordersData;
        break;
        
        case "messages":
        items = messagesData;
        break;
        
        case "requestedsellers":
        items = requestseller;
        break;
        
        default: 
        items = [];
        break;
      }
       
      //if i clicked any page other than Main page
      if(page != "main"){
        if(page == "exit"){
          sessionStorage.removeItem("loggedInUser");
          return;
        } 
        main_page.classList.add("d-none");
        content.classList.add("scrollable");
        if (document.querySelector(".content .table-responsive")) {
          document.querySelector(".content .table-responsive").outerHTML = "";
          document.querySelector(".content .search-container").outerHTML = "";
        }
        if(items.length == 0){
          Swal.fire({
            title: `There is no ${
              document.querySelector(".main-list span." + page).textContent
            }`,
            icon: "warning",
            confirmButtonText: "OK",
          });
        }
        else{
          displaySearchInput(items, page);
          createTableStructure();
          displayHead(items, page);
          displayTable(items, page);
          arrangeData(items);
          document.getElementById("search").addEventListener("keyup", function (e) {
            let searchValue = e.target.value.toUpperCase();
            let newItems = filterItems(items,searchValue);
            displayTable(newItems,page);
          });
        }
      }
      
      // if i clicked main page
      else {
        main_page.classList.remove("d-none");
        content.classList.remove("scrollable");
        if (document.querySelector(".content .table-responsive")) {
          document
            .querySelector(".content .table-responsive")
            .classList.add("d-none");
          document
            .querySelector(".content .search-container")
            .classList.add("d-none");
        }
        let Revenue = document.getElementById("Revenue");
        let Users = document.getElementById("Users");
        let Visitors = document.getElementById("Visitors");
        let Orders = document.getElementById("Orders");
        Revenue.textContent = ("$ " + (localStorage.getItem("totalPrice") ? Math.floor(Number(JSON.parse(localStorage.getItem("totalPrice")))) : 0));
        Users.textContent = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")).length : 0; 
        Orders.textContent = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")).length : 0;
        Visitors.textContent = localStorage.getItem("visitors") ? JSON.parse(localStorage.getItem("visitors")) : 0;
        
      }
    });
  }

  function displaySearchInput(items, page){
    let content = document.getElementById("content");
    let search_container = document.createElement("div");
    let input_container = document.createElement("div");
    let count_container = document.createElement("div");
    let items_count = document.createElement("div");
    let items_name = document.createElement("span");
    let search_input = document.createElement("input");
    let serach_label = document.createElement("label");
    search_container.className =
      "search-container d-flex justify-content-between";
    serach_label.textContent = "Search: ";
    serach_label.setAttribute("for", "search");
    search_input.setAttribute("type", "text");
    search_input.setAttribute("id", "search");
    search_input.setAttribute("placeholder", "search");
    search_input.setAttribute("size", "15");
    input_container.appendChild(serach_label);
    input_container.appendChild(search_input);
    count_container.className = "count";
    items_name.textContent = `${page} : `;
    items_count.appendChild(items_name);
    items_count.appendChild(document.createTextNode(`${items.length}`));
    count_container.appendChild(items_count);
    search_container.appendChild(count_container);
    search_container.appendChild(input_container);
    content.appendChild(search_container);
  }

  function createTableStructure() {
    let content = document.getElementById("content");
    let table_container = document.createElement("div");
    table_container.classList.add("table-responsive");
    let my_table = document.createElement("table");
    my_table.className = "table text-center table-hover";
    my_table.setAttribute("id","itemTable");
    let my_head = document.createElement("thead");
    let my_head_Row = document.createElement("tr");
    my_head.classList.add("table-light");
    my_head.appendChild(my_head_Row);
    let my_body = document.createElement("tbody");
    my_body.setAttribute("id","tableList");
    my_table.appendChild(my_head);
    my_table.appendChild(my_body);
    table_container.appendChild(my_table);
    content.appendChild(table_container);
  }

  function createCharts(){
    let ctx1= document.querySelector(".ctx1");
    let ctx2=document.querySelector(".ctx2");

    let FlowersDate = JSON.parse(localStorage.getItem("flowersData")) || [];
    const filteredFlowersBasedOnStock = FlowersDate.filter(
      (product) =>  product.stock > 0
    );
    
    const groupedData = filteredFlowersBasedOnStock.reduce((acc, flower) => {
      if (!acc[flower.category]) {
        acc[flower.category] = 0;
      }
      acc[flower.category] += flower.stock;
      return acc;
    }, {});

    const categories = Object.keys(groupedData);

    const barChartConfig = {
      type: "bar",
      data: {
        labels: categories,
        datasets: [
          {
            label: "Total Products",
            data: groupedData,
            backgroundColor: "#EE5D90cc",
            borderColor: "lavender",
            borderWidth: 1,
            barThickness: 30,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };
    new Chart(ctx1, barChartConfig);

    //chart 2
    let sellersData = JSON.parse(localStorage.getItem("sellerData")) || [];
    const totalPaidNoBySeller = {};
    const filteredFlowersBasedOnPaidNo = FlowersDate.filter(
      (product) =>  product.paidno > 0
    );

    for (const seller of sellersData) {
      let sellerTotalPaidNo = 0;
      for (const productId of seller.products) {
        const product = filteredFlowersBasedOnPaidNo.find((flower) => flower.id === productId);
        if (product) {
          sellerTotalPaidNo += product.paidno;
        }
      }
      totalPaidNoBySeller[seller.name] = sellerTotalPaidNo;
    }

    const secondBarChartConfig = {
      type: "bar",
      data: {
        labels: Object.keys(totalPaidNoBySeller),
        datasets: [
          {
            label: "Total sold products",
            data: totalPaidNoBySeller,
            backgroundColor: "#3b7dddcc",
            borderColor: "lavender",
            borderWidth: 1,
            barThickness: 30,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };
    new Chart(ctx2, secondBarChartConfig);
  }
  
  function displayHead(items,page) {
    let tableHead = document.querySelector("#content #itemTable thead tr");
    let heads = Object.keys(items[0]);
    tableHead.innerHTML = "";
    for (let i = 0; i < heads.length; i++) {
      if (
        heads[i] != "role" &&
        heads[i] != "reviews" &&
        heads[i] != "products" &&
        heads[i] != "description" &&
        heads[i] != "meaning" &&
        heads[i] != "favourites" &&
        heads[i] != "Id" &&
        heads[i] != "password" &&
        heads[i] != "isRemoved" &&
        heads[i] != "image"
      ) {
        let head = document.createElement("th");
        head.setAttribute("scope", "col");
        head.textContent = heads[i];
        head.textContent = heads[i];
        if ((items[0][heads[i]]).constructor.name == "Object") {
          head.textContent = `${heads[i]} ${
            Object.keys(items[0][heads[i]])[0]
          }`;
        }
        tableHead.appendChild(head);
      }
    }
    if (page != "orders" && page != "requestedsellers") {
      if(page == "messages"){
        let actionHead = document.createElement("th");
        actionHead.setAttribute("scope", "col");
        actionHead.textContent = "Actions";
        tableHead.appendChild(actionHead);
      }
      else{
        let delHead = document.createElement("th");
        delHead.setAttribute("scope", "col");
        delHead.textContent = "delete";
        tableHead.appendChild(delHead);
      }
    } else if (page == "requestedsellers") {
      let approveHead = document.createElement("th");
      approveHead.setAttribute("scope", "col");
      approveHead.textContent = "approve";
      tableHead.appendChild(approveHead);
    }
  }

  function displayRow(items,item, page) {
    let tableHead = document.querySelector("#content #itemTable thead tr");
    const row = document.createElement("tr");
    for (let i = 0; i < tableHead.children.length; i++) {
      const Cell = document.createElement("td");
      if (tableHead.children[i].textContent.includes(" ")) {
        let words = tableHead.children[i].textContent.split(" ");
        Cell.textContent = item[words[0]][words[1]];
      } else {
        Cell.textContent = item[tableHead.children[i].textContent];
      }
      row.appendChild(Cell);
      if(tableHead.children[i].textContent == "Message" || tableHead.children[i].textContent == "Subject"){
        Cell.classList.add("elipses");
      }
    }

    if (page != "orders" && page != "requestedsellers") {
      const deleteButton = document.createElement("button");
      if(page == "products"){
        deleteButton.setAttribute("data-id", item.id);
        deleteButton.setAttribute("data-sellerId", item.seller.id);
      }
      else if(page == "sellers"){
        deleteButton.setAttribute("data-id",item.id);
      }
      else if(page == "messages"){
        const detailsButton = document.createElement("button");
        detailsButton.className = "btn btn-primary text-center detailsBtn m-1";
        detailsButton.setAttribute("data-toggle", "modal");
        detailsButton.setAttribute("data-target", "#showDetailsModal");
        detailsButton.style.width = "90px";
        detailsButton.classList.add("mx-2");
        detailsButton.textContent = "Details";
        detailsButton.addEventListener("click", (e) => showDetails(e));
        row.children[row.children.length - 1].appendChild(detailsButton);
      }

      deleteButton.className = "btn btn-danger";
      deleteButton.style.width = "90px";
      deleteButton.textContent = "Delete";
      if(page == "messages")
        deleteButton.addEventListener("click", (e) => deleteItem(items,item.Id, e));
      else
        deleteButton.addEventListener("click", (e) => deleteItem(items,item.id, e));
      row.children[row.children.length - 1].appendChild(deleteButton);
    } else if (page == "requestedsellers") {
      const dapproveButton = document.createElement("button");
      dapproveButton.className = "btn btn-primary";
      dapproveButton.style.width = "90px";
      dapproveButton.textContent = "Approve";
      dapproveButton.addEventListener("click", (e) => addSeller(items,item.Id,e));
      row.children[row.children.length - 1].appendChild(dapproveButton);
    }
    return row;
  }

  function displayTable(items,page) {
    const tableListContainer = document.getElementById("tableList");
    tableListContainer.innerHTML = "";
    items.forEach((item) => {
      const row = displayRow(items,item,page);
      tableListContainer.appendChild(row);
    });
  }

  function addSeller(items,itemId,e) {
    let requestedSellers =
    JSON.parse(localStorage.getItem("requestseller")) || [];
    const itemIndex = requestedSellers.findIndex(
      (item) => item.Id == itemId
    );
    let myRow = e.target.closest("tr");
    let sellers = JSON.parse(localStorage.getItem("sellerData")) || [];
    if (itemIndex !== -1) {
      localStorage.setItem("requestseller", JSON.stringify(requestedSellers));
      let newseller = {
        id: sellers.length > 0 ? sellers[sellers.length - 1].id + 1 : 1,
        name: requestedSellers[itemIndex]['name'],
        role: "seller",
        location: requestedSellers[itemIndex]['location'],
        contact: requestedSellers[itemIndex]['contact'],
        products: [],
        password: requestedSellers[itemIndex]['password'],
      };
      
      sellers.push(newseller);
      localStorage.setItem("sellerData", JSON.stringify(sellers));
      myRow.outerHTML = "";
      requestedSellers.splice(itemIndex, 1);
      items.splice(itemIndex, 1);
      localStorage.setItem("requestseller", JSON.stringify(requestedSellers));
    }
  }
  
  function deleteItem(items,itemId,e) {
    // let users = localStorage.getItem("userData");
    if(e.target.closest("tr").children[2].textContent == "admin@example.com"){
      Swal.fire({
        title: `You can't delete the admin (yourself)`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
    
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mx-2",
        cancelButton: "btn btn-danger mx-2",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "delete ",
        cancelButtonText: "cancel",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
            );
            const itemIndex = items.findIndex(
              (item) => {
                if(page != "messages")
                  return item.id == itemId;
                else
                  return item.Id == itemId;
              }
            );
              
          if (itemIndex !== -1) {
            if(page.toLowerCase() == "products"){
              flowersData.splice(itemIndex, 1);
              let productId = e.target.getAttribute("data-id");
              let sellerId = e.target.getAttribute("data-sellerId");
              const seller = sellersData.find((seller) => seller.id == sellerId);
              const productIndex = seller.products.indexOf(Number(productId));
              if (productIndex !== -1)
                seller.products.splice(productIndex, 1);

              localStorage.setItem("flowersData", JSON.stringify(flowersData));
              localStorage.setItem("sellerData", JSON.stringify(sellersData));
              displayTable(flowersData, "products");
            } else if (page.toLowerCase() == "users") {
              usersData.splice(itemIndex, 1);
              localStorage.setItem("userData", JSON.stringify(usersData));
              displayTable(usersData, "users");
            } else if (page.toLowerCase() == "sellers") {
              sellersData.splice(itemIndex, 1);
              let sellerId = e.target.getAttribute("data-id");
              const seller = sellersData.find((seller) => seller.id == sellerId);
              const deletedProducts = flowersData.filter((product) => product.seller.id == Number(sellerId));
              for (let i = 0; i < flowersData.length; i++) {
                for (let j = 0; j < deletedProducts.length; j++) {
                  if(flowersData[i].id == deletedProducts[j].id)
                  flowersData.splice(i, 1);
                }
              }
              localStorage.setItem("sellerData", JSON.stringify(sellersData));
              localStorage.setItem("flowersData", JSON.stringify(flowersData));
              displayTable(sellersData,"sellers");
            }
            else if(page.toLowerCase() == "orders"){
              ordersData.splice(itemIndex, 1);
              localStorage.setItem("sellersData", JSON.stringify(ordersData));
              displayTable(ordersData, "orders");
            }
            else if(page.toLowerCase() == "messages"){
              messagesData.splice(itemIndex, 1);
              localStorage.setItem("messages", JSON.stringify(messagesData));
              displayTable(messagesData, "messages");
            }
          } else {
            console.error(`Product with ID ${itemId} not found`);
          }
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  }

  function arrangeData(items) {
    let tableHead = document.querySelector("#content #itemTable thead tr");
    tableHead.addEventListener("click", function (e) {
      let heads = document.querySelectorAll("#content #itemTable thead tr th");
      if (!e.target.classList.contains("asc")) {
        for (let i = 0; i < heads.length; i++) {
          heads[i].classList.remove("desc");
          heads[i].classList.remove("asc");
        }
        e.target.classList.add("asc");
      } else if (!e.target.classList.contains("desc")) {
        for (let i = 0; i < heads.length; i++) {
          heads[i].classList.remove("desc");
          heads[i].classList.remove("asc");
        }
        e.target.classList.add("desc");
      }

      if (lastsorted == e.target.textContent) {
        displayTable(items.reverse(), page);
        return;
      } else if (e.target.textContent == "delete") {
        return;
      }

      items.sort(function (a, b) {
        let firstKey = a[e.target.textContent];
        let secondKey = b[e.target.textContent];
        if (e.target.textContent.includes(" ")) {
          firstKey =
            a[e.target.textContent.split(" ")[0]][
              e.target.textContent.split(" ")[1]
            ];
          secondKey =
            b[e.target.textContent.split(" ")[0]][
              e.target.textContent.split(" ")[1]
            ];
        }

        if (isNaN(firstKey)) return firstKey.localeCompare(secondKey);
        else return firstKey - secondKey;
      });
      lastsorted = e.target.textContent;
      displayTable(items, page);
    });
  }

  function filterItems(items, searchValue) {
    let propNames = getSearchProps(items);
    return items.filter(item => {
      return propNames.some(prop => {
        let propValue = prop.includes(' ') ? item[prop.split(' ')[0]][prop.split(' ')[1]] : item[prop];
        return propValue.toString().toUpperCase().includes(searchValue);
      })
    }) 
  }

  function getSearchProps(items) {
    let heads = document.querySelectorAll("#content #itemTable thead tr th");
    let propNames = [];
    for(let i=0; i<heads.length - 1; i++){     
      if( typeof items[0][heads[i].textContent] == "object"){
        let innerHeads = Object.keys(items[0][heads[i].textContent]);
        for (let j = 0; j < innerHeads.length; j++) {
          propNames.push(`${heads[i].textContent} ${Object.keys(items[0][heads[i].textContent])[j]}`)
        }
      }
      else{
        propNames.push(`${heads[i].textContent}`);
      }
    }
    return propNames;
  }

  function showDetails(e) {
    let heads = e.target.closest("table").children[0].children[0];
    let currentRow = e.target.closest("tr");
    let displayareas = document.querySelectorAll("#showDetailsModal .details-item > div:nth-child(2)");
    for (let i = 0; i < currentRow.children.length - 1; i++) {
      displayareas[i].innerHTML = currentRow.children[i].innerHTML;
    }
  }
  createCharts();
  
});
