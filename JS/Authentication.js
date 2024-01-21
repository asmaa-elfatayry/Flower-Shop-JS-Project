export function handleTheErrorMessage(index, mess) {
    let message = document.getElementById("validation");
    message.classList.remove("invalid-feedback");
    message.innerText = "";
    document.getElementsByTagName("input")[index].classList.remove("is-invalid");
    message.classList.add("invalid-feedback");
    document.getElementsByTagName("input")[index].classList.add("is-invalid");
    document.getElementsByTagName("input")[index].focus();
    message.style.display = "block";
    message.innerText = mess;

  }

  export function password_valid(password) {
    if (password.trim() == 0 || password.trim().length < 8) {
      return false
    }
    return true
  }

  export function valid_name(name) {
    let reg = new RegExp('^[a-zA-Z][a-zA-Z0-9]{3,9}$');
    if (reg.test(name)) {
      return true;
    }
    return false;
  }


  export function isEmailExists(email) {
    const userData = JSON.parse(localStorage.getItem("userData")) || [];
    return userData.some((user) => user.email === email);
  }


  export function isValidEmail(email) {
    const emailRegex = new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$');
    return emailRegex.test(email);
  }
 export function iscomplexPassword(password) {
    const char = /[a-zA-Z]/.test(password);
    const digit = /\d/.test(password);
    const s_char = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return char && digit && s_char;
  }

  export function check_positive(number_prod) {
    var number = Number(number_prod);
    return number > 0;

  }
