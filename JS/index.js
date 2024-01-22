
window.addEventListener("load", function () {
  //   const sellerId = 3; // just for test it will come from login
  let FlowersDate;
  let SellerData;
  let UserData;
  let UserLoggedData;
  let RequestSeller;
  fetch("../Data.json")
    .then((response) => response.json())
    .then((data) => {
      FlowersDate = data.flowers;
      SellerData = data.sellers;
      UserData = data.users;
     UserLoggedData=data.logged_user;
    RequestSeller=data.request_seller;
      localStorage.setItem("flowersData", JSON.stringify(FlowersDate));
      localStorage.setItem("sellerData", JSON.stringify(SellerData));
      localStorage.setItem("userData", JSON.stringify(UserData));
      localStorage.setItem("userloggeddata", JSON.stringify(UserLoggedData));
      localStorage.setItem("requestseller",JSON.stringify(RequestSeller));
    
    })
    .catch((error) => console.error("Error fetching products:", error));
  
  //amira section
      let search_icon = this.document.querySelector(".search");
    console.log(search_icon);
      search_icon.addEventListener('click' , function(e){
        let search_input = document.querySelector(".search_input");
        search_input.classList.remove("none") ;
        search_input.classList.add("applaySearchStyle") ;
      })
});

