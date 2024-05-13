function selectType() {
  var selectedType = document.getElementById("Property-type").value;
  document.getElementById("propertyType").value = selectedType;
  console.log("Selected option:", selectedType);
}
function selectState() {
  var selectedState = document.getElementById("states").value;
  document.getElementById("state").value = selectState;
  console.log("Selected state:", selectedState);
}

document.addEventListener("DOMContentLoaded", function () {
  var states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  var select = document.getElementById("states");

  states.forEach(function (state) {
    var option = document.createElement("option");
    option.text = state;
    option.value = state;
    select.appendChild(option);
  });
});

function validateInput(inputField) {
  var inputValue = inputField.value;
  var errorMessage = document.getElementById("errorMessage");

  // Regular expression to match only numbers
  var numbersOnly = /^[0-9]+$/;

  if (!inputValue.match(numbersOnly)) {
    errorMessage.style.display = "block";
    inputField.value = inputValue.replace(/[^0-9]/g, "");
  } else {
    errorMessage.style.display = "none";
  }
}

function displayFilePath() {
  var input = document.getElementById("property-img");
  var filePath = input.value.split("\\").pop();

  // Display the file path in a paragraph element
  var filePathDisplay = document.getElementById("file-path");
  filePathDisplay.textContent = filePath;
}

// document
//   .getElementById("propertyForm")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();

//     var propertyType = document.getElementById("Property-type").value;
//     var state = document.getElementById("states").value;
//     var propertyImage = document.getElementById("property-img").files[0];

//     var formData = new FormData();
//     formData.append("property_type", propertyType);
//     formData.append("state", state);
//     formData.append("propertyImage", propertyImage);

//     console.log(formData);

//     fetch("/addProperty", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to insert property.");
//         }
//         return response.text();
//       })
//       .then((message) => {
//         alert(message);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   });
