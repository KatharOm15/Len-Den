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
