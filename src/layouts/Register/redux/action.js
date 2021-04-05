import { SET_FORM_REGISTER } from '../../../redux/type';

// set form login
const setFormRegister = (inputType, inputValue) => {
    return { type: SET_FORM_REGISTER, inputType: inputType, inputValue: inputValue };
}

export {setFormRegister}