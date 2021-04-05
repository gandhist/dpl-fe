import { SET_FORM_FORGOT_PASSWORD } from "../../../redux/type";


const initalForgotPassword = {
    isLoading: false,
    email: null
}

export const ForgotPasswordReducer = (state = initalForgotPassword, action) => {
    // logic 
    if(action.type === SET_FORM_FORGOT_PASSWORD){
        return {
            [action.inputType] : action.inputValue
        }
    }
    return state;
}