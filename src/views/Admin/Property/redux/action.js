import { SET_FORM_PROPERTY } from "../../../../redux/type";


// action set form create category
const setFormProperty = (inputType, inputValue) => {
    return { type: SET_FORM_PROPERTY, inputType: inputType, inputValue: inputValue }
}

export { setFormProperty }