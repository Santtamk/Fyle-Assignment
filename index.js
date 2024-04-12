// validation for number input using bootstrap

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("my-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const inputs = document.querySelectorAll(".form-control");
    let isValid = true
    inputs.forEach((input) => {
        if (this.value.trim() === "") {
          // If the input value is empty, hide the error icon and tooltip
          hideError(input)
          isValid = false;
        } else if (!isNumber(this.value)) {
          showError(input)
          isValid = false
        } else {
            hideError(input)
        }
    });


    if(isValid){
        form.submit()
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
    const errorIcon = this.parentElement.querySelector(".error-icon");
    const errorTooltip = this.parentElement.querySelector(".error-tooltip");
    errorIcon.classList.add("d-none");
    errorTooltip.style.display = "none";
    this.classList.remove("is-invalid");
  }
});


const grossAnnualIncomeInput = document.querySelector("#grossAnnualIncomeInput");
const extraIncomeInput = document.querySelector("#extraIncomeInput");
const applicableDeductionInput = document.querySelector("#applicableDeductionInput");
const selectedAgeGroup = document.querySelector("#inputState");
const submit = document.querySelector("#submit");

submit.addEventListener("click", function (event) {
  event.preventDefault();

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
});
