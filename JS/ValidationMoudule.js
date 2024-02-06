function ValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function ValidPassword(password) {
  return (
    /[0-9].*[a-zA-Z]|[a-zA-Z].*[0-9]/.test(password) && password.length >= 6
  );
}

function validateCardNumber(cardNumber) {
  return /^\d{16}$/.test(cardNumber);
}

function validateExpiryDate(month, year) {
  const currentYear = new Date().getFullYear().toString().slice(2);
  const currentMonth = new Date().getMonth() + 1;
  const maxMonth = 12;

  return (
    /^\d{2}$/.test(month) &&
    /^\d{2}$/.test(year) &&
    month > 0 &&
    month <= maxMonth &&
    (year > currentYear || (year == currentYear && month >= currentMonth)) &&
    month <= maxMonth
  );
}

function validateCVV(cvv) {
  return /^\d{3}$/.test(cvv);
}

function validateTextInput(inputElement, errorElementId, errorMessage) {
  const inputValue = inputElement.value.trim();
  const errorElement = document.getElementById(errorElementId);

  if (
    inputValue !== "" &&
    inputValue.match(/\b(?![0-9])\w{4,}\b/) &&
    isNaN(inputValue)
  ) {
    inputElement.classList.remove("is-invalid");
    errorElement.innerHTML = "";
    return true; // Valid input
  } else {
    errorElement.innerHTML = errorMessage;
    inputElement.classList.add("is-invalid");
    return false; // Invalid input
  }
}
//seller page
function validateNumberInput(
  inputElement,
  errorElementId,
  errorMessage,
  min,
  max
) {
  const inputValue = parseFloat(inputElement.value);
  const errorElement = document.getElementById(errorElementId);

  if (!isNaN(inputValue) && inputValue >= min && inputValue <= max) {
    inputElement.classList.remove("is-invalid");
    errorElement.innerHTML = "";
    return true; // Valid
  } else {
    errorElement.innerHTML = errorMessage;
    inputElement.classList.add("is-invalid");
    return false; // Invalid
  }
}
function validateFileInput(inputElement, errorElementId, errorMessage) {
  const file = inputElement.files[0];
  console.log(inputElement.files.length);
  const errorElement = document.getElementById(errorElementId);

  if (!file) {
    errorElement.innerHTML = "";
    inputElement.classList.remove("is-invalid");
    return true; // Valid
  }

  if (file.type.startsWith("image/")) {
    errorElement.innerHTML = "";
    inputElement.classList.remove("is-invalid");
    return true; // Valid
  } else {
    errorElement.innerHTML = errorMessage;
    inputElement.classList.add("is-invalid");
    return false;
  }
}

export {
  ValidEmail,
  ValidPassword,
  validateCVV,
  validateCardNumber,
  validateExpiryDate,
  validateNumberInput,
  validateFileInput,
  validateTextInput,
};
