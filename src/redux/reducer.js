// type
import { SET_IS_LOADING } from "./type";
import { combineReducers } from "redux";
import { AuthReducer, LoginReducer } from "../layouts/login/redux";
import { RegisterReducer } from '../layouts/Register/redux';
import { ForgotPasswordReducer } from '../layouts/ForgotPassword/redux';
import { ResetPasswordReducer } from '../layouts/PasswordReset/redux';
import { DataPesertaReducer } from "../views/DataPeserta/redux";
import { CategoryReducer } from "../views/Admin/Category/redux";
import { PropertyReducer } from "../views/Admin/Property/redux";
import { PackageReducer } from "../views/Admin/Package/redux";

// initial value state is loading overlay
const initialStateLoading = {
    isLoading: true,
    text: "Plase wait..."
}

// reducer is loading overlay
const IsLoadingReducer = (state = initialStateLoading, action) => {
    if (action.type === SET_IS_LOADING) {
        return {
            ...state,
            isLoading: action.isLoading
        }
    }
    return state;
}


const reducer = combineReducers({ IsLoadingReducer, AuthReducer, LoginReducer, RegisterReducer, ForgotPasswordReducer, ResetPasswordReducer, DataPesertaReducer, CategoryReducer, PropertyReducer, PackageReducer });

export default reducer;