const { SET_FORM_FORGOT_PASSWORD } = require("redux/type")


export const setFormForgotPassword = (inputType, inputValue) => {
    return { type: SET_FORM_FORGOT_PASSWORD, inputType: inputType, inputValue: inputValue}
}

