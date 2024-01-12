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
});
