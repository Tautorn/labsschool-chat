const Yup = require("yup");

const storeValidation = Yup.object().shape({
    sessionId: Yup.string()
        .trim()
        .required(),
    content: Yup.string()
        .trim()
        .required()
});

module.exports = storeValidation;
