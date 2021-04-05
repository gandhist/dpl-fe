import { LOGIN, SET_FORM_LOGIN } from "../../../redux/type";
const local = localStorage.getItem('p3sAuth')
// console.log('ini dari local storage',local)
// initial state
const initialAuth = {
    check : local != null ? JSON.parse(local).access_token : false,
    data : {
        access_token: null,
        token_type: null,
        user: {
            created_at: null,
            email: null,
            email_verified_at: null,
            hint: null,
            id: null,
            is_active: null,
            is_login: null,
            last_login: null,
            last_reset_at: null,
            last_reset_by: null,
            last_session: null,
            name: null,
            role_id: null,
            updated_at: null,
            username: null,
        },
    }
}

// reducer login 
const AuthReducer = (state = initialAuth, action) => {
    // logic
    if(action.type === LOGIN){
        return {
            check: action.check,
            data: {
                ...state.data, ...action.data
            }
        }
    }

    // return state
    return state;
}

const initialFormLogin = {
    isLoading: false,
    isSeePassword: false,
    username : '',
    password : '',
}

// reducer login 
const LoginReducer = (state = initialFormLogin, action) => {
    // logic
    if(action.type === SET_FORM_LOGIN){
        return {
            ...state,
            [action.inputType]: action.inputValue
        }
    }
    // return state
    return state;
}

export {AuthReducer, LoginReducer}