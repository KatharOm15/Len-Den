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

        dataDiv.appendChild(article);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});
