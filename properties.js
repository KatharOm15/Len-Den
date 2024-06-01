document.addEventListener("DOMContentLoaded", function () {
  fetch("/auth-status")
    .then((response) => response.json())
    .then((data) => {
      if (data.isAuthenticated) {
        document.getElementById("sign-in").style.display = "none";
        document.getElementById("sign-out").style.display = "inline";
      }
    })
    .catch((error) => console.error("Error fetching auth status:", error));

  //After clicking on sign-out redirecting to index.html
  document.getElementById("sign-out").addEventListener("click", () => {
    fetch("/sign-out", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.redirected) {
          window.location.href = response.url; // Redirect to the specified URL
        } else {
          console.error("Sign-out failed");
        }
      })
      .catch((error) => console.error("Error during sign-out:", error));
  });

  const dataDiv = document.querySelector(".grid");
  const options = document.querySelectorAll(".options .box");

  // Function to fetch and display properties
  function fetchAndDisplayProperties(propertyType, limit = 10) {
    let url = `http://localhost:3000/api/items?limit=${limit}`;
    if (propertyType) {
      url += `&propertyType=${propertyType}`;
    }

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error("Expected an array but did not receive one.");
        }

        // Clear previous items
        dataDiv.innerHTML = "";

        if (data.length === 0) {
          dataDiv.innerHTML = `<h1 class="info">Nothing to show</h1>`;
          return;
        }

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
            document.getElementById("propertyImg").src = item.filepath; // Add this line to set image
            document.getElementById("propertyName").value = item.propertyName;
            document.getElementById("propertyArea").value = item.propertyArea;
            document.getElementById("propertyPrice").value = item.propertyPrice;
            document.getElementById("propertyAddress").value = item.address;
            document.getElementById("propertyType").value = item.propertyType;
            document.getElementById("propertyCity").value = item.city;
            document.getElementById("propertyDescription").value =
              item.propertyDescription;
  
            document.getElementById("popupForm").style.display = "block";
          });



          dataDiv.appendChild(article);
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        dataDiv.innerHTML = `<p class="error">Failed to load data. Please try again later.</p>`;
      });
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
      
  }

  // Add click event listener to each option
  options.forEach((option) => {
    option.addEventListener("click", function () {
      const propertyType = this.dataset.propertyType;
      fetchAndDisplayProperties(propertyType);
    });
  });

  // Fetch and display default properties on page load
  fetchAndDisplayProperties();
});
