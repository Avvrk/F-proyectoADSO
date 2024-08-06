import { defineStore } from "pinia";
import axios from "axios";
import { useStoreAdmins } from "./admin.js";

const url = "http://localhost:4505"
// "https://backendgimnasio-ip8j.onrender.com"

export const useStoreParcelas = defineStore("Parcelas", () => {
    const useUsuario = useStoreAdmin();

    const getParcelas = async () => {
        try {
            const r = await axios.get(`${url}/Parcelas`, {
                headers: {
                    token: useUsuario.token
                }
            });
            return r;
        } catch (error) {
            console.log(error);
            return error
        }
    };

    const getParcelaId = async (id) => {
        try {
            const r = await axios.get(`${url}/Parcelas/${id}`, {
                headers: {
                    token: useUsuario.token
                }
            });
            return r;
        } catch (error) {
            console.log(error);
            return error
        }
    };

    const postParcela = async (datos) => {
        try {
            const r = await axios.post(`${url}/Parcelas/`, datos, {
                    headers: {
                        token: useUsuario.token
                    }
                });
                return r;
            } catch (error) {
                console.log(error);
                return error
            }
        };

    const putIngresos = async (id, datos) => {
        try {
            const r = await axios.put(`${url}/Parcelas/${id}`, datos, {
                    headers: {
                        token: useUsuario.token
                    }
                });
                return r;
            } catch (error) {
                console.log(error);
                return error
            }
        };

    return {
        getParcelas,
        getParcelaId,
        postParcela,
        putIngresos
    };
},
{
    persist: true,
}
);
