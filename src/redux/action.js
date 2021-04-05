// type
import { SET_IS_LOADING } from "./type";
import { setAuth, setFormLogin } from "../layouts/login/redux";
import { setFormRegister } from '../layouts/Register/redux';
import { setFormForgotPassword } from '../layouts/ForgotPassword/redux';
import { setFormResetPassword } from '../layouts/PasswordReset/redux';
import { setFormDataPeserta } from "../views/DataPeserta/redux";
import { setFormCategory } from "../views/Admin/Category/redux";
import { setFormProperty } from "../views/Admin/Property/redux";
import { setFormPackage } from "../views/Admin/Package/redux";

// set isLoadingOverlay
const setisLoading = (isLoading) => {
    return ({ type: SET_IS_LOADING, isLoading })
}


export { setFormLogin, setAuth, setFormRegister, setFormForgotPassword, setFormResetPassword, setFormDataPeserta, setFormCategory, setisLoading, setFormProperty, setFormPackage }