// validation for number input using bootstrap

document.addEventListener("DOMContentLoaded", function () {
  
  const form = document.getElementById("my-form");

  const inputs = document.querySelectorAll(".form-control");
  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      if (input.value.trim() === "") {
        hideError(input);
      } else if (!isNumber(input.value)) {
        showError(input);
      } else {
        hideError(input);
      }
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;

    inputs.forEach((input) => {
      if (input.value.trim() === "" || !isNumber(input.value)) {
        showError(input);
        isValid = false;
      } else {
        hideError(input);
      }
    });

    if (isValid) {
      handleSubmission();
    }
  });

  function isNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }

  function showError(input) {
    const errorIcon = input.parentElement.querySelector(".error-icon");
    const errorTooltip = input.parentElement.querySelector(".error-tooltip");
    errorIcon.classList.remove("d-none");
    errorTooltip.style.display = "block";
    input.classList.add("is-invalid");
  }

  function hideError(input) {
    const errorIcon = input.parentElement.querySelector(".error-icon");
    const errorTooltip = input.parentElement.querySelector(".error-tooltip");
    errorIcon.classList.add("d-none");
    errorTooltip.style.display = "none";
    input.classList.remove("is-invalid");
  }

  function handleSubmission() {
    const grossAnnualIncomeInput = document.querySelector(
      "#grossAnnualIncomeInput"
    );
    const extraIncomeInput = document.querySelector("#extraIncomeInput");
    const applicableDeductionInput = document.querySelector(
      "#applicableDeductionInput"
    );
    const selectedAgeGroup = document.querySelector("#inputState");

    const grossAnnualIncome = parseFloat(grossAnnualIncomeInput.value);
    const extraIncome = parseFloat(extraIncomeInput.value);
    const applicableDeduction = parseFloat(applicableDeductionInput.value);
    const ageGroup = selectedAgeGroup.value;

    let taxPercentage;
    if (ageGroup === "<40") {
      taxPercentage = 0.3;
    } else if (ageGroup === "≥40 & <60") {
      taxPercentage = 0.4;
    } else if (ageGroup === "≥60") {
      taxPercentage = 0.1;
    }

    const overallIncome = grossAnnualIncome + extraIncome - applicableDeduction;
    console.log("overallIncome:", overallIncome);
    console.log("deduction:", applicableDeduction);
    let taxedIncome = overallIncome;
    if (overallIncome > 800000) {
      taxedIncome = overallIncome - taxPercentage * (overallIncome - 800000);
    }

    console.log(
      "Overall Income after tax and deductions:",
      taxedIncome.toFixed(2)
    );

    const overlay = document.getElementById('overlay')
    overlay.classList.remove("d-none");
    const reportText = document.getElementById('reportText')
    reportText.innerText = 'Your overall income will be ₹' + taxedIncome.toFixed(2) + ' after tax deduction';
    function openNav() {
      document.querySelector(".finalOutputDisplay").style.width = "100%";
    }
    openNav()
  }
})
function closeNav() {
  document.querySelector(".finalOutputDisplay").style.width = "0%";
}

