const { SET_FORM_PACKAGE } = require("redux/type");

// initial stat
const initialPacageState = {
    isLoading: false,
    name: null,
    price: null,
    id_category: null,
    images: null,
    desc: null,
    properties: []
}

// reducer
const PackageReducer = (state = initialPacageState, action) => {
    if (action.type === SET_FORM_PACKAGE) {
        return {
            ...state,
            [action.inputType]: action.inputValue
        }
    }
    return state;
}

export { PackageReducer }