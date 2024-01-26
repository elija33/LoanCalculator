// Listen for submit
document
  .getElementById("load-form")
  .addEventListener("submit", calculateResults);

// Calculate Results
function calculateResults(e) {
  // UI Vars
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlypayment = document.getElementById("monthly-payment");
  const totalpayment = document.getElementById("total-payment");
  const totalinterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const month = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * month * calculatedInterest) / (month - 1);

  if (isFinite(monthly)) {
    monthlypayment.value = monthly.toFixed(2);
    totalpayment.value = (monthly * calculatedPayments).toFixed(2);
    totalinterest.value = (monthly * calculatedPayments - principal).toFixed(2);
  } else {
    showError("Please check your number again");
  }
  e.preventDefault();
}

// show Error
function showError(error) {
  // create a div
  const errorDiv = document.createElement("div");

  // Get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Add error class
  errorDiv.className = "alert alert-danger";

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // clear error after 3
  setTimeout(clearError, 3000);
}

// clear error
function clearError() {
  document.querySelector(".alert").remove();
}
