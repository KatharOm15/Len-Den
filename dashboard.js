document.addEventListener("DOMContentLoaded", function () {
    const restaurantContainer = document.querySelector(".card-slider");
    const leftRButton = document.querySelector(".restaurant-arrow-left");
    const rightRButton = document.querySelector(".restaurant-arrow-right");
  
    function updateButtonState() {
      leftRButton.disabled = restaurantContainer.scrollLeft <= 0;
      rightRButton.disabled =
        restaurantContainer.scrollLeft + restaurantContainer.offsetWidth >=
        restaurantContainer.scrollWidth;
    }
  
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
    updateButtonState();
  });