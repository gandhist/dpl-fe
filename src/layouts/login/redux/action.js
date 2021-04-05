import { LOGIN, SET_FORM_LOGIN } from '../../../redux/type';

// set form login
const setFormLogin = (inputType, inputValue) => {
    return { type: SET_FORM_LOGIN, inputType: inputType, inputValue: inputValue };
}

// action login
const setAuth = (check, data) => {
    return {
        type: LOGIN,
        check: check,
        data: data
    };
}

export {setFormLogin, setAuth}