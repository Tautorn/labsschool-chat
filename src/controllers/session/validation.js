const Yup = require("yup");

const storeValidation = Yup.object().shape({
    name: Yup.string()
        .trim()
        .required()
});

module.exports = storeValidation;
