import { SET_FORM_PROPERTY } from "../../../../redux/type";


const initalCreateProperty = {
    isLoading: false,
    name: null,
    price: null,
    images: null,
    video_ref: null,
    uom: null,
    desc: null,
}

const PropertyReducer = (state = initalCreateProperty, action) => {
    if (action.type === SET_FORM_PROPERTY) {
        return {
            ...state,
            [action.inputType]: action.inputValue
        }
    }
    return state;
}

export { PropertyReducer }