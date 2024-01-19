window.addEventListener("load", function () {

    let save_sign = document.getElementById("sig_sel");
    save_sign.addEventListener('click', function () {
  
      event.preventDefault();
      let shop_name = document.getElementsByTagName("input")[0].value;
      let email = document.getElementsByTagName("input")[2].value;
      let password = document.getElementsByTagName("input")[3].value;
      let number_prod=document.getElementsByTagName("input")[4].value;
      let location_shop=document.getElementsByTagName("input")[1].value;
      let message = document.getElementById("validation");
      message.classList.remove("invalid-feedback");
      message.innerText = "";
  
  
  
      if (!valid_name(shop_name)) {
        document.getElementsByTagName("input")[0].classList.remove("is-invalid");
        message.classList.add("invalid-feedback");
        document.getElementsByTagName("input")[0].classList.add("is-invalid");
        document.getElementsByTagName("input")[0].focus();
        message.style.display = "block";
        message.innerText = "this is invalid name ,please try again";
  
  
      }
      else if (!valid_name(location_shop)) {
        document.getElementsByTagName("input")[1].classList.remove("is-invalid");
        message.classList.add("invalid-feedback");
        document.getElementsByTagName("input")[1].classList.add("is-invalid");
        document.getElementsByTagName("input")[1].focus();
        message.style.display = "block";
        message.innerText = "this is invalid name ,please try again";
  
  
      }
      else if (isEmailExists(email)) {
        document.getElementsByTagName("input")[2].classList.remove("is-invalid");
        message.classList.add("invalid-feedback");
        document.getElementsByTagName("input")[2].classList.add("is-invalid");
        document.getElementsByTagName("input")[2].focus();
        message.style.display = "block";
        message.innerText = "This email is already registered. Please use a different email.";
      }
  
      else if (email.trim() == 0 || !isValidEmail(email)) {
        document.getElementsByTagName("input")[2].classList.remove("is-invalid");
        message.classList.add("invalid-feedback");
        document.getElementsByTagName("input")[2].classList.add("is-invalid");
        document.getElementsByTagName("input")[2].focus();
        message.style.display = "block";
        message.innerText = "This email is not a valid email,please try another one.";
  
      }
      else if (!password_valid(password)) {
        document.getElementsByTagName("input")[3].classList.remove("is-invalid");
        message.classList.add("invalid-feedback");
        document.getElementsByTagName("input")[3].classList.add("is-invalid");
        document.getElementsByTagName("input")[3].focus();
        message.style.display = "block";
        message.innerText = "This is an invalid password. Please make sure it is at least 8 characters long and choose a complex one.";
      } 
      else if (!iscomplexPassword(password)) {
        document.getElementsByTagName("input")[3].classList.remove("is-invalid");
        message.classList.add("invalid-feedback");
        document.getElementsByTagName("input")[3].classList.add("is-invalid");
        document.getElementsByTagName("input")[3].focus();
        message.style.display = "block";
        message.innerText = "This is not a complex password. Please choose a password with at least 8 characters, including letters, digits, and special characters.";
      }
      else if(number_prod.trim()==0 || !check_positive(number_prod) )
      {
        document.getElementsByTagName("input")[4].classList.remove("is-invalid");
        message.classList.add("invalid-feedback");
        document.getElementsByTagName("input")[4].classList.add("is-invalid");
        document.getElementsByTagName("input")[4].focus();
        message.style.display = "block";
        message.innerText = "please enter a valid number of your products";

      }
     
  
      else {
        document.getElementsByTagName("input")[0].classList.remove("is-invalid");
        document.getElementsByTagName("input")[1].classList.remove("is-invalid");
        document.getElementsByTagName("input")[2].classList.remove("is-invalid");
        document.getElementsByTagName("input")[3].classList.remove("is-invalid");
        document.getElementsByTagName("input")[4].classList.remove("is-invalid");
        seller_req(shop_name, email, password,number_prod,location_shop);
      }
  
    });
 
    function seller_req(shop_name, email, password,number_prod,location_shop) {
      const requestdata = JSON.parse(localStorage.getItem("requestseller")) || [];
      const newrequest = {
        name: shop_name,
        contact: email,
        password: password,
        no_products:number_prod,
        location:location_shop
      };
  
      requestdata.push(newrequest);
      localStorage.setItem("requestseller", JSON.stringify(requestdata));
  
      console.log("order is send succesfuly");
    }
  
    function isValidEmail(email) {
      const emailRegex = new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$');
      return emailRegex.test(email);
    }
    function iscomplexPassword(password) {
      const char = /[a-zA-Z]/.test(password);
      const digit = /\d/.test(password);
      const s_char = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      return char && digit && s_char;
    }
    function valid_name(name) {
        let reg = new RegExp('^[a-zA-Z][a-zA-Z0-9]{3,9}$');
        if (reg.test(name)) {
          return true;
        }
        return false;
      }
    function isEmailExists(email) {
      const sellerdata = JSON.parse(localStorage.getItem("sellerData")) || [];
      return sellerdata.some((seller) => seller.contact === email);
    }
  
    function password_valid(password) {
        if (password.trim() == 0 || password.trim().length < 8) {
          return false
        }
        return true
      }

function check_positive(number_prod)
{
    var number=Number(number_prod);
    return number>0;
    
}
  
  
  });
  