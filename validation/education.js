const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEducationInput(data) {
  let errors = {};

  data.university = !isEmpty(data.university) ? data.university : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.specialty = !isEmpty(data.specialty) ? data.specialty : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.university)) {
    errors.university = "University field is required";
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Degree field is required";
  }

  if (Validator.isEmpty(data.specialty)) {
    errors.specialty = "Specialty field is required";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "From date field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
