// JavaScript function to update the hidden input field with selected role
function selectRole(role) {
  document.getElementById("role").value = role;
  var boxes = document.querySelectorAll(".box");
  boxes.forEach(function (box) {
    box.style.border = "1px solid #00000063";
  });
  let temp = role + "-box";
  document.getElementById(temp).style.border = "2px solid Black";
  console.log(role);
}

//checking user is authenticated or not and hiding sign-in and sign-up options
window.onload = function () {
  fetch("/auth-status")
    .then((response) => response.json())
    .then((data) => {
      if (data.isAuthenticated) {
        // Hide the sign-in button after signing in
        document.getElementById("sign-in").style.display = "none";
        document.getElementById("get-started").style.display = "none";
        // Display the sign-out button
        document.getElementById("sign-out").style.display = "inline-block";
      } else {
        // Show the sign-in button after signing out
        document.getElementById("sign-in").style.display = "inline-block";
        document.getElementById("get-started").style.display = "inline-block";
        // Hide the sign-out button
        document.getElementById("sign-out").style.display = "none";
      }
    })
    .catch((error) => {
      console.error("Error fetching authentication status:", error);
    });
};

let signOutButton = document.getElementById("sign-out");
signOutButton.addEventListener("click", () => {
  fetch("/sign-out", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(() => {
    window.location.reload();
  });
});

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

// show pass
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
