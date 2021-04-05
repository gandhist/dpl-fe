import { SET_FORM_RESET_PASSWORD } from "redux/type"


export const setFormResetPassword = (inputType, inputValue) => {
    return {type: SET_FORM_RESET_PASSWORD, inputType: inputType, inputValue: inputValue}
}