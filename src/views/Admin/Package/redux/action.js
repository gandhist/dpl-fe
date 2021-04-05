const { SET_FORM_PACKAGE } = require("redux/type");

const setFormPackage = (inputType, inputValue) => {
    return ({ type: SET_FORM_PACKAGE, inputType: inputType, inputValue: inputValue })
}

export { setFormPackage }