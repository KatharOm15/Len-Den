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
  let count = 0;

  fetch('http://localhost:3000/api/items')
  .then(response => response.json())
  .then(data => {
      const dataDiv = document.getElementById('data-container');
      console.log(data);

      data.forEach(item => {
          const itemDiv = document.createElement('div');
          itemDiv.classList.add('inner-card');
          
          itemDiv.innerHTML = `
              <div class="image-container">
                  <img src="${item.image_url || './images/house1.jpg'}" alt="${item.propertyName}">
              </div>
              <h3 class="Property-details">${item.propertyName} & ${item.price}</h3>
              <div class="info-container">
                  <div class="info-row">
                      <p>${item.state}</p>
                      <a href="./map.html" class="citymap"><div class="city">${item.city}</div></a>
                  </div>
                  <p>${item.propertyDescription}</p>
                  <button class="details" onclick="openForm('${item._id}')">View Details</button>
              </div>
          `;


              dataDiv.appendChild(itemDiv);
              count++;
          });
          console.log(`Total properties: ${count}`);
      })
      .catch(error => console.error('Error fetching data:', error));

function openForm(propertyId) {
  fetchPropertyDetails(propertyId);
}

async function fetchPropertyDetails(propertyId) {
  try {
      const response = await fetch(`http://localhost:3000/property/${propertyId}`);
      const property = await response.json();
      document.getElementById('broker_name').value = property.broker_name;
      document.getElementById('property_name').value = property.property_name;
      document.getElementById('property_description').value = property.property_description;
      document.getElementById('location').value = property.location;
      document.getElementById('price').value = property.price;
      document.getElementById('state').value = property.state;
      document.getElementById('city').value = property.city;
      document.getElementById('property_type').value = property.property_type;
      document.getElementById('property_image').src = property.image_url || './images/house1.jpg';
      document.getElementById('myForm').style.display = 'block';
  } catch (err) {
      console.error('Error fetching property details:', err);
  }
}

function closeForm() {
  document.getElementById('myForm').style.display = 'none';
}

  
  
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

