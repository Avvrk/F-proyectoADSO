import { defineStore } from "pinia";
import axios from "axios";
import { useStoreAdmins } from "../stores/admin.js";

const url = "http://localhost:4505"
// "https://backendgimnasio-ip8j.onrender.com"

export const useStoreCultivos = defineStore("cultivos", () => {
    const useUsuario = useStoreAdmin();

    const getCultivos = async () => {
        try {
            const r = await axios.get(`${url}/Cultivos`, {
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

    const getCultivosID = async (id) => {
        try {
            const r = await axios.get(`${url}/Cultivos/${id}`, {
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

    const postCultivos = async (datos) => {
        try {
            const r = await axios.post(`${url}/Cultivos/`, datos, {
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

    const putCultivos = async (id, datos) => {
        try {
            const r = await axios.put(`${url}/Cultivos/${id}`, datos, {
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
        getCultivos,
        getCultivosID,
        postCultivos,
        putCultivos
    };
},
{
    persist: true,
}
);
