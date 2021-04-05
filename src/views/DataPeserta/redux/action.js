const { SET_FORM_DATA_PESERTA } = require("redux/type")

const setFormDataPeserta = (inputType, inputValue) => {
    return {type: SET_FORM_DATA_PESERTA, inputType:inputType, inputValue:inputValue}
}

export {setFormDataPeserta}