//Login page
const inputField = document.getElementById("username");

const placeholderText = inputField.placeholder;

inputField.addEventListener("focus", () => {
  inputField.placeholder = "";
});

inputField.addEventListener("blur", () => {
  if (inputField.value === "") {
    inputField.placeholder = placeholderText;
  }
});
function showPass() {
  const passwordField = document.getElementById("password");

  if (passwordField.type === "password") {
    passwordField.type = "text";
    togglePassword.classList.remove("fa-eye");
    togglePassword.classList.add("fa-eye-slash");
  } else {
    passwordField.type = "password";
    togglePassword.classList.remove("fa-eye-slash");
    togglePassword.classList.add("fa-eye");
  }
}
