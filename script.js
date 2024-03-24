// JavaScript function to update the hidden input field with selected role
function selectRole(role) {
  document.getElementById("role").value = role;
  console.log(role);
}

//checking user is authenticated or not and hiding sign-in and sign-up options
window.onload = function () {
  fetch("/auth-status")
    .then((response) => response.json())
    .then((data) => {
      if (data.isAuthenticated) {
        document.querySelector(".buttons").style.display = "none";
        document.querySelector(".out").style.display = "inline-block";
      }
    })
    .catch((error) => {
      console.error("Error fetching authentication status:", error);
    });
};

//cards slider with click
document.addEventListener("DOMContentLoaded", function () {
  //Slider
  const restaurantContainer = document.querySelector(".card-slider");
  const leftRButton = document.querySelector(".restaurant-arrow-left");
  const rightRButton = document.querySelector(".restaurant-arrow-right");

  function updateButtonState() {
    console.log("Clicked");
    leftRButton.disabled = restaurantContainer.scrollLeft <= 0;
    rightRButton.disabled =
      restaurantContainer.scrollLeft + restaurantContainer.offsetWidth >=
      restaurantContainer.scrollWidth;
  }

  console.log("Clicked1");
  updateButtonState();

  leftRButton.onclick = function () {
    restaurantContainer.scrollBy({
      left: -restaurantContainer.offsetWidth / 2,
      behavior: "smooth",
    });
  };

  rightRButton.onclick = function () {
    restaurantContainer.scrollBy({
      left: restaurantContainer.offsetWidth / 2,
      behavior: "smooth",
    });
  };
  restaurantContainer.addEventListener("scroll", updateButtonState);

  const slides = document.querySelector(".slides");
  const slideWidth = slides.firstElementChild.clientWidth;
  let currentPosition = 0;
  let currentSlideIndex = 0;
  const numSlides = slides.children.length;

  function slide() {
    currentPosition -= slideWidth;
    currentSlideIndex++;

    if (currentSlideIndex >= numSlides) {
      currentPosition = 0;
      currentSlideIndex = 0;
    }

    slides.style.transition = "transform 0.5s ease-in-out";
    slides.style.transform = `translateX(${currentPosition}px)`;
  }

  setInterval(slide, 3000);
});

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
