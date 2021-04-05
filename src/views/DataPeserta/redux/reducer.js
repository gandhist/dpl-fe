

// inital state

const { SET_FORM_DATA_PESERTA } = require("redux/type")

const data_sertifikat = {
    no: null,
    id_tim_marketing: null,
    id_customer: null,
    jenis_mohon: null,
    klas_bid_sub: null,
    sertifikat: null,
    hari_sesi: null,
    pj_srtf: null,
    pdf_srtf_lama: null
}

const pendidikan = {
    no: null,
    id_jenjang_pendidikan: null,
    nama_sekolah: null,
    prodi: null,
    tahun_tamat: null,
    no_ijazah: null,
    tanggal_ijazah: null,
    default: null,
    pdf_ijazah: null
}

const pengalaman = {
    no: null,
    instansi_proyek: null,
    lokasi: null,
    jabatan: null,
    tgl_mulai: null,
    tgl_selesai: null,
    nilai_proyek: null,
    pdf_pengalaman: null,
    pdf_sop: null
}

const pelatihan = {
    no: null,
    penyelenggara: null,
    nama_pelatihan: null,
    tgl_mulai: null,
    tgl_selesai: null,
    pdf_pelatihan: null
}

const studi_kasus = {
    no: null,
    judul: null,
    tgl_mulai: null,
    tgl_selesai: null,
    keterangan: null,
    pdf_studi_kasus: null
}

const initialStateDataPeserta = {
    nik: null,
    nama: null,
    jenis_kelamin: null,
    tmp_lahir: null,
    tanggal_lahir: null,
    no_hp: null,
    prov: null,
    kota: null,
    email: null,
    alamat_ktp: null,
    f_ktp: null,
    keterangan: null,
    foto: null,
    f_cv: null,
    npwp: null,
    f_npwp: null,
    sertifikat: {
    },
    pendidikan: {
    },
    pengalaman: {
    },
    pelatihan: {
    },
    studi_kasus: {
    }
}

// reducer
const DataPesertaReducer = (state = initialStateDataPeserta, action) => {
    // logic
    if (action.type === SET_FORM_DATA_PESERTA) {
        return {
            ...state,
            [action.inputType]: action.inputValue,
            sertifikat: { ...state.sertifikat, ...action.sertifikat },
            pendidikan: { ...state.pendidikan, ...action.pendidikan },
            pengalaman: { ...state.pengalaman, ...action.pengalaman },
            pelataihan: { ...state.pelataihan, ...action.pelataihan },
            studi_kasus: { ...state.studi_kasus, ...action.studi_kasus },
        }
    }
    return state;
}

export { DataPesertaReducer }