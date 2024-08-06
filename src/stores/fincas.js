import { defineStore } from "pinia";
import axios from "axios";
import { useStoreAdmins } from "./admin.js";

const url = "http://localhost:4505"
// "https://backendgimnasio-ip8j.onrender.com"

export const useStoreFincas = defineStore("Fincas", () => {
    const useUsuario = useStoreAdmin();

    const getFincas = async () => {
        try {
            const r = await axios.get(`${url}/Fincas`, {
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

    const getFincasID = async (id) => {
        try {
            const r = await axios.get(`${url}/Fincas/${id}`, {
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

    const postFincas = async (datos) => {
        try {
            const r = await axios.post(`${url}/Fincas/`, datos, {
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

    const putFincas = async (id, datos) => {
        try {
            const r = await axios.put(`${url}/Fincas/${id}`, datos, {
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
        getFincas,
        getFincasID,
        postFincas,
        putFincas
    };
},
{
    persist: true,
}
);
