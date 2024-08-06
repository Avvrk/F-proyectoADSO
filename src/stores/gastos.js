import { defineStore } from "pinia";
import axios from "axios";
import { useStoreAdmins } from "./admin.js";

const url = "http://localhost:4505"
// "https://backendgimnasio-ip8j.onrender.com"

export const useStoreGastos = defineStore("Gastos", () => {
    const useUsuario = useStoreAdmin();

    const getGastos = async () => {
        try {
            const r = await axios.get(`${url}/Gastos`, {
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

    const getGastosID = async (id) => {
        try {
            const r = await axios.get(`${url}/Gastos/${id}`, {
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

    const postGastos = async (datos) => {
        try {
            const r = await axios.post(`${url}/Gastos/`, datos, {
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

    const putGastos = async (id, datos) => {
        try {
            const r = await axios.put(`${url}/Gastos/${id}`, datos, {
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
        getGastos,
        getGastosID,
        postGastos,
        putGastos
    };
},
{
    persist: true,
}
);
