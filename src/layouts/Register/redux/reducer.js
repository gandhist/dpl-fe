import { SET_FORM_REGISTER } from "../../../redux/type";


// inital value form register
const initialFormRegister = {
    isLoading : false,
    isSeePassword : false,
    nama_lengkap : null,
    no_hp : null,
    email : null,
    password : null,
    instansi : null,
    jabatan : null,
    keterangan : null
}


// reducer register
const RegisterReducer = (state = initialFormRegister, action) => {
    // logic
    if(action.type === SET_FORM_REGISTER){
        return {
            ...state, 
            [action.inputType] : action.inputValue
        }
    }
    return state;
}

export {RegisterReducer}