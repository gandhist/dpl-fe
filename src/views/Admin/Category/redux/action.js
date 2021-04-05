import { SET_FORM_CATEGORY } from "../../../../redux/type";


// action set form create category
const setFormCategory = (inputType, inputValue) => {
    return { type: SET_FORM_CATEGORY, inputType: inputType, inputValue: inputValue }
}

export { setFormCategory }