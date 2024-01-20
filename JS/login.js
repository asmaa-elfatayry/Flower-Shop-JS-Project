window.addEventListener("load", function () {
    let check_login = document.getElementById("log");
    let redirect_signUP=document.getElementById("signUp");
    

    check_login.addEventListener('click', function () {
      event.preventDefault();
      let email = document.getElementsByTagName("input")[0].value;
      let password = document.getElementsByTagName("input")[1].value;
      login(email, password);
    });
  
    redirect_signUP.addEventListener('click',function()
    {
        window.location.href="signup.html";
    });

    //login 
    function login(email, password) {
      const userData = JSON.parse(localStorage.getItem("userData")) || [];
      const sellersData = JSON.parse(localStorage.getItem("sellerData")) || [];
  
      const user = userData.find((u) => u.email === email && u.password === password);
      const seller = sellersData.find((sel) => sel.contact === email && sel.password === password);
  
      let message = document.getElementById('validationuserExist');
  
      if (user && user.role === 'user') {
          logged_user(user);
          document.getElementsByTagName("input")[0].classList.remove("is-invalid");
          document.getElementsByTagName("input")[0].classList.remove("is-invalid");
          message.innerText = "";
      } else if (seller) {
          logged_user(seller);
          document.getElementsByTagName("input")[0].classList.remove("is-invalid");
          document.getElementsByTagName("input")[0].classList.remove("is-invalid");
          message.classList.remove("invalid-feedback");
          message.innerText = "";
      } else if (user && user.role === 'admin') {
          logged_user(user);
          document.getElementsByTagName("input")[0].classList.remove("is-invalid");
          document.getElementsByTagName("input")[0].classList.remove("is-invalid");
          message.classList.remove("invalid-feedback");
          message.innerText = "";
      } else {
          
          document.getElementsByTagName("input")[0].classList.add("is-invalid"); 
          document.getElementsByTagName("input")[0].focus(); 
          document.getElementsByTagName("input")[1].classList.add("is-invalid");
          message.classList.add("invalid-feedback");
          message.style.display = "block";
          message.style.alignItemscenter="center";
          message.style.justifyContent="center";
          message.innerText = "Invalid email or password. Please check your credentials.";
      }
  }
  
  

    function logged_user(user) {
      const logged_user = JSON.parse(localStorage.getItem("userloggeddata")) || [];
      logged_user.pop();
      const newloggeduser = {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role
      };
      logged_user.push(newloggeduser);
      localStorage.setItem("userloggeddata", JSON.stringify(logged_user));
    }
  });
  









  
  