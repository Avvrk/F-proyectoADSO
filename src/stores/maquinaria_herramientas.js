import { defineStore } from "pinia";
import axios from "axios";
import { useStoreAdmins } from "./admin.js";

const url = "http://localhost:4505"
// "https://backendgimnasio-ip8j.onrender.com"

export const useStoreMaquinaria_Herramienta = defineStore("Maquinaria_Herramienta", () => {
    const useUsuario = useStoreAdmin();

    const getMaquinaria_Herramienta = async () => {
        try {
            const r = await axios.get(`${url}/Maquinaria_Herramienta`, {
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

    const getMaquinaria_HerramientaId = async (id) => {
        try {
            const r = await axios.get(`${url}/Maquinaria_Herramienta/${id}`, {
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

    const postMaquinaria_Herramienta = async (datos) => {
        try {
            const r = await axios.post(`${url}/Maquinaria_Herramienta/`, datos, {
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

    const putMaquinaria_Herramienta = async (id, datos) => {
        try {
            const r = await axios.put(`${url}/Maquinaria_Herramienta/${id}`, datos, {
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
        getMaquinaria_Herramienta,
        getMaquinaria_HerramientaId,
        postMaquinaria_Herramienta,
        putMaquinaria_Herramienta
    };
},
{
    persist: true,
}
);
