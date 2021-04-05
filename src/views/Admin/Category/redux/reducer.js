import { SET_FORM_CATEGORY } from "../../../../redux/type";


// initial value create
const initialCreateCategory = {
    isLoading: false,
    name: null,
    tagline: null,
    price: null,
    min_price: null,
    max_priice: null,
}

// reducer category
const CategoryReducer = (state = initialCreateCategory, action) => {
    // logic handle
    if (action.type === SET_FORM_CATEGORY) {
        return {
            ...state,
            [action.inputType]: action.inputValue
        }

    }
    // return state
    return state;

}

export { CategoryReducer }