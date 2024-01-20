






window.addEventListener("load", function () {
  //   const sellerId = 3; // just for test it will come from login
  let FlowersDate;
  let SellerData;
  let UserData;
  fetch("../Data.json")
    .then((response) => response.json())
    .then((data) => {
      FlowersDate = data.flowers;
      SellerData = data.sellers;
      UserData = data.users;
      localStorage.setItem("flowersData", JSON.stringify(FlowersDate));
      localStorage.setItem("sellerData", JSON.stringify(SellerData));
      localStorage.setItem("userData", JSON.stringify(UserData));
      //   localStorage.setItem("sellerId", sellerId);

      //   console.log("Data saved to local storage:", FlowersDate);
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

<<<<<<< HEAD



    });

});
=======
>>>>>>> d0a5b05cff0661bb7df33aa6cc269972316a46e9
