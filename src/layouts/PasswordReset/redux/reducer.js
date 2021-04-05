import { SET_FORM_RESET_PASSWORD } from "redux/type"


const initialFormReset = {
    isLoading: false,
    isSeePassword: false,
    isSeePasswordConfirmation: false,
    token: null,
    email: null,
    password: null,
    password_confirmation: null,
}

export const ResetPasswordReducer = (state = initialFormReset, action) => {
    if(action.type === SET_FORM_RESET_PASSWORD){
        return {
            ...state, 
            [action.inputType] : action.inputValue
        }
    }
    return state;
} 