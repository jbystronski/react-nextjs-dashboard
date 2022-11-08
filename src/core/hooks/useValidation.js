import { useState } from "react";

const rules = {
  isRequired: { test: (val) => !!val, msg: "Value required" },
  isNumber: {
    test: (val) => /^\d+$/.test(val),
    msg: "Incorrect number value",
  },
  isPositiveNumber: {
    test: (val) => parseInt(val) > 0,
    msg: "Value must be bigger than zero",
  },
  isEmail: {
    test: (val) =>
      val.match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
    msg: "Incorrect email",
  },
};

export default function useValidation(validationSchema, customRules = {}) {
  const [errors, setErrors] = useState({});
  const [validatorError, setValidatorError] = useState(null);

  const validate = (data) => {
    try {
      const errorBag = {};
      const mergedRules = { ...rules, ...customRules };
      Object.keys(data).forEach((key) => {
        if (key in validationSchema) {
          for (const rule in validationSchema[key]) {
            if (rule in mergedRules) {
              if (!mergedRules[rule].test(data[key])) {
                const msg = mergedRules[rule]["msg"];

                if (!errorBag.hasOwnProperty(key)) {
                  errorBag[key] = [];
                }

                errorBag[key].push(msg);
              }
            }
          }
        }
      });

      setErrors(errorBag);

      return JSON.stringify(errorBag) === "{}";
    } catch (e) {
      setValidatorError(e);
    }
  };

  return {
    validate,
    isValid: function (value) {
      return errors.hasOwnProperty(value);
    },

    getError: function (value) {
      if (errors.hasOwnProperty(value)) {
        return errors[value][0];
      }
    },
    validatorError,
  };
}
