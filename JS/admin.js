window.addEventListener("load", function () {
  let page  = "";
  var lastsorted = ""
  var content = document.getElementById("content");
  var main_page = document.querySelector(".data .content .main-data");
  var links = document.querySelectorAll(".data .side .main-list > a");
  let flowersData = JSON.parse(localStorage.getItem("flowersData")) || [];
  let sellersData = JSON.parse(localStorage.getItem("sellerData")) || [];
  let usersData = JSON.parse(localStorage.getItem("userData")) || [];
  let ordersData = JSON.parse(localStorage.getItem("ordersData")) || [];
  
  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', (e)=>{
      page = e.target.classList[0].toLowerCase().trim();
      var items;
      switch (page){
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

        default: 
          items = [];
          break;
      }

      if(page != "main"){
        main_page.classList.add("d-none");
        content.classList.add("scrollable");
        if(document.querySelector(".content .table-responsive")){
          document.querySelector(".content .table-responsive").outerHTML = "";
          document.querySelector(".content .search-container").outerHTML = "";
        }
        displaySearchInput(items, page);
        createTableStructure();
        displayHead(items);
        displayTable(items,page);
        arrangeData(items);
        document.getElementById("search").addEventListener("keyup", function (e) {
          let newItems = items.filter(function (a) {
            switch (page){
              case "products":
                items = flowersData;
                return (a['id'].toString().toUpperCase().includes(document.getElementById("search").value.toUpperCase()) || 
                  a['name'].toString().toUpperCase().includes(document.getElementById("search").value.toUpperCase()) ||
                  a['category'].toString().toUpperCase().includes(document.getElementById("search").value.toUpperCase()) ||
                  a['price'].toString().toUpperCase().includes(document.getElementById("search").value.toUpperCase()) ||
                  a['seller']['id'].toString().toUpperCase().includes(document.getElementById("search").value.toUpperCase()) ||
                  a['stock'].toString().toUpperCase().includes(document.getElementById("search").value.toUpperCase())
                );
      
              case "sellers":
                return (a['id'].toString().toUpperCase().includes(document.getElementById("search").value.toUpperCase()) || 
                  a['username'].toString().toUpperCase().includes(document.getElementById("search").value.toUpperCase()) ||
                  a['email'].toString().toUpperCase().includes(document.getElementById("search").value.toUpperCase()) ||
                  a['password'].toString().toUpperCase().includes(document.getElementById("search").value.toUpperCase())
                );
                
              case "sellers":
                return (a['id'].toString().toUpperCase().includes(document.getElementById("search").value.toUpperCase()) || 
                  a['name'].toString().toUpperCase().includes(document.getElementById("search").value.toUpperCase()) ||
                  a['location'].toString().toUpperCase().includes(document.getElementById("search").value.toUpperCase()) ||
                  a['contact'].toString().toUpperCase().includes(document.getElementById("search").value.toUpperCase()) ||
                  a['password'].toString().toUpperCase().includes(document.getElementById("search").value.toUpperCase())
                );
                
              case "orders":
                return (a['id'].toString().toUpperCase().includes(document.getElementById("search").value.toUpperCase()) || 
                  a['name'].toString().toUpperCase().includes(document.getElementById("search").value.toUpperCase()) ||
                  a['location'].toString().toUpperCase().includes(document.getElementById("search").value.toUpperCase()) ||
                  a['contact'].toString().toUpperCase().includes(document.getElementById("search").value.toUpperCase()) ||
                  a['password'].toString().toUpperCase().includes(document.getElementById("search").value.toUpperCase()) ||
                  a['date'].toLocaleDateString("EN-EG").includes(document.getElementById("search").value.toUpperCase())
                );
      
              default: 
                return;
            }
          });
          displayTable(newItems,page);
      });
      }
      else {
        main_page.classList.remove("d-none");
        content.classList.remove("scrollable");
        if(document.querySelector(".content .table-responsive")){
          document.querySelector(".content .table-responsive").classList.add("d-none");
          document.querySelector(".content .search-container").classList.add("d-none");
        }
      }
    }) 
  }

  function createCharts(){
    let ctx1= document.querySelector(".ctx1");
    let ctx2=document.querySelector(".ctx2");
    ctx1.width = 400;
    ctx1.height = 200;
    ctx2.width = 400;
    ctx2.height = 200;
    let FlowersDate = JSON.parse(localStorage.getItem("flowersData")) || [];
  // let sellerData = JSON.parse(localStorage.getItem("sellerData")) || [];
    const filteredFlowers = FlowersDate.filter(
      (product) =>  product.stock > 0
    );
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const barChartConfig = {
      type: "bar",
      data: {
        labels: months,
        datasets: [
          {
            label: "Monthly Revenue",
            data: filteredFlowers.map((data) => data.stock),
            backgroundColor: "#ee5d90cc",
            borderColor: "lavender",
            borderWidth: 1,
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

    const secondBarChartConfig = {
      type: "bar",
      data: {
        labels: months,
        datasets: [
          {
            label: "Monthly Visitors",
            data: filteredFlowers.map((data) => data.price),
            backgroundColor: "#c7dbef",
            borderColor: "lavender",
            borderWidth: 1,
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
  
  function displaySearchInput(items, page){
    let content = document.getElementById("content");
    let search_container = document.createElement("div");
    let input_container = document.createElement("div");
    let count_container = document.createElement("div");
    let items_count = document.createElement("div");
    let items_name = document.createElement("span");
    let search_input = document.createElement("input");
    let serach_label = document.createElement("label");
    search_container.className = "search-container d-flex justify-content-between";
    serach_label.textContent = "Search: ";
    serach_label.setAttribute("for", "search");
    search_input.setAttribute("type","text");
    search_input.setAttribute("id","search");
    search_input.setAttribute("placeholder","search");
    search_input.setAttribute("size","15");
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
  
  function displayHead(items) {
    let tableHead = document.querySelector("#content #itemTable thead tr");
    let heads = Object.keys(items[0]);
    tableHead.innerHTML = "";
    for(let i=0; i<heads.length; i++){
      if(heads[i] != "role" && heads[i] != "products" && heads[i] != "description" && heads[i] != "meaning" && heads[i] != "image"){
        let head = document.createElement("th");
        // let headInner = document.createElement("span");
        // head.appendChild(headInner);
        head.setAttribute("scope", "col");
        // headInner.textContent = heads[i];
        head.textContent = heads[i];
        head.textContent = heads[i];
        if( typeof items[0][heads[i]] == "object"){
          // headInner.textContent = `${heads[i]} ${Object.keys(items[0][heads[i]])[0]}`;
          head.textContent = `${heads[i]} ${Object.keys(items[0][heads[i]])[0]}`;
        }
        tableHead.appendChild(head);
      }
    }
    let delHead = document.createElement("th");
    delHead.setAttribute("scope", "col");
    delHead.textContent = "delete";
    tableHead.appendChild(delHead);
  }
  
  function displayRow(item) {
    let tableHead = document.querySelector("#content #itemTable thead tr");
    const row = document.createElement("tr");
    for (let i = 0; i < tableHead.children.length; i++) {
      const Cell = document.createElement("td");
      if(tableHead.children[i].textContent.includes(' ')){
        let words = tableHead.children[i].textContent.split(' ');
        Cell.textContent = item[words[0]][words[1]];
      }
      else{
        Cell.textContent = item[tableHead.children[i].textContent];
      }
      row.appendChild(Cell);
    }
    
    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger";
    deleteButton.style.width = "90px";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", (e) => deleteItem(item.id, e));
    row.children[row.children.length - 1].appendChild(deleteButton);
    return row;
  }
  
  function displayTable(items) {
    const tableListContainer = document.getElementById("tableList");
    tableListContainer.innerHTML = "";
    items.forEach((item) => {
      const row = displayRow(item);
      tableListContainer.appendChild(row);
    });
  }
  
  function deleteItem(itemId) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
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
            const itemIndex = flowersData.findIndex(
              (item) => item.id === itemId
              );
              
              if (itemIndex !== -1) {
                if(page.toLowerCase() == "products"){
                  flowersData.splice(itemIndex, 1);
              localStorage.setItem("flowersData", JSON.stringify(flowersData));
              displayTable(flowersData, "products");
            }
            else if(page.toLowerCase() == "users"){
              usersData.splice(itemIndex, 1);
              localStorage.setItem("userData", JSON.stringify(data['users']));
              displayTable(usersData, "users");
            }
            else if(page.toLowerCase() == "sellers"){
              sellersData.splice(itemIndex, 1);
              localStorage.setItem("sellerData", JSON.stringify(sellersData));
              displayTable(sellersData,"sellers");
            }
            else if(page.toLowerCase() == "orders"){
              ordersData.splice(itemIndex, 1);
              ordersData.setItem("sellersData", JSON.stringify(ordersData));
              displayTable(ordersData, "orders");
            }
            // const sellerProducts = items.filter(
              //   (item) => item.id === itemId
              // );
              // displayTable(sellerProducts);
          } else {
            console.error(`Product with ID ${itemId} not found`);
          }
        } else if (
          /* Read more about handling dismissals below */
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
  
  function arrangeData(items){
    let tableHead = document.querySelector("#content #itemTable thead tr");
    tableHead.addEventListener("click", function(e){
      let heads = document.querySelectorAll("#content #itemTable thead tr th");
      if(!e.target.classList.contains("asc")){
        for (let i = 0; i < heads.length; i++) {
          heads[i].classList.remove("desc");
          heads[i].classList.remove("asc");
        }
        e.target.classList.add("asc");
      }
      else if(!e.target.classList.contains("desc")){
        for (let i = 0; i < heads.length; i++) {
          heads[i].classList.remove("desc");
          heads[i].classList.remove("asc");
        }
        e.target.classList.add("desc");
      }

      if (lastsorted == e.target.textContent) {
        displayTable(items.reverse());
        return;
      }
      else if (e.target.textContent == "delete"){
        return;
      }
      
      items.sort(function(a, b){
        let firstKey = a[e.target.textContent];
        let secondKey = b[e.target.textContent];
        if(e.target.textContent.includes(' ')){
          firstKey = a[e.target.textContent.split(' ')[0]][e.target.textContent.split(' ')[1]];
          secondKey = b[e.target.textContent.split(' ')[0]][e.target.textContent.split(' ')[1]];
        }
        
        if(isNaN(firstKey))
        return firstKey.localeCompare(secondKey);
      else
          return firstKey - secondKey;
      })
      lastsorted = e.target.textContent;
      displayTable(items);
    });
  }
  createCharts();
});