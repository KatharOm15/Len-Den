document.addEventListener("DOMContentLoaded", function () {
  const dataDiv = document.querySelector(".grid");

  fetch("http://localhost:3000/api/items?limit=5")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        const article = document.createElement("article");

        const img = document.createElement("img");
        img.src = item.filepath;
        img.alt = item.propertyName;

        const textDiv = document.createElement("div");
        textDiv.classList.add("text");

        const heading = document.createElement("h3");
        heading.textContent = item.propertyName;

        const priceParagraph = document.createElement("p");
        priceParagraph.textContent = `Price: ${item.propertyPrice}`;

        const locationParagraph = document.createElement("p");
        locationParagraph.textContent = `Location: ${item.city}, ${item.state}`;

        const typeParagraph = document.createElement("p");
        typeParagraph.textContent = `Type: ${item.propertyType}`;

        const link = document.createElement("a");
        link.href = "dashboard.html";
        link.classList.add("btn", "btn-primary", "btn-block");
        link.textContent = "More details";

        textDiv.appendChild(heading);
        textDiv.appendChild(priceParagraph);
        textDiv.appendChild(locationParagraph);
        textDiv.appendChild(typeParagraph);
        textDiv.appendChild(link);

        article.appendChild(img);
        article.appendChild(textDiv);

        article.addEventListener("click", () => {
          document.getElementById("propertyImg").src = item.filepath;  // Add this line to set image
          document.getElementById("propertyName").value = item.propertyName;
          document.getElementById("propertyArea").value = item.propertyArea;
          document.getElementById("propertyPrice").value = item.propertyPrice;
          document.getElementById("propertyAddress").value = item.address;
          document.getElementById("propertyType").value = item.propertyType;
          document.getElementById("propertyCity").value = item.city;
          document.getElementById("propertyDescription").value = item.propertyDescription;

          document.getElementById("popupForm").style.display = "block";
        });

        dataDiv.appendChild(article);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));

  // Get the modal
  const popupForm = document.getElementById("popupForm");

  // Get the <span> element that closes the modal
  const closeBtn = document.querySelector(".close-btn");

  // When the user clicks on <span> (x), close the modal
  closeBtn.addEventListener("click", () => {
    popupForm.style.display = "none";
  });

  // When the user clicks anywhere outside of the modal, close it
  window.addEventListener("click", (event) => {
    if (event.target == popupForm) {
      popupForm.style.display = "none";
    }
  });

  // Slider
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
