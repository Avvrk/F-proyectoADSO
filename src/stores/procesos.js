import { defineStore } from "pinia";
import axios from "axios";
import { useStoreAdmins } from "./admin.js";

const url = "http://localhost:4505"
// "https://backendgimnasio-ip8j.onrender.com"

export const useStoreProcesos = defineStore("Procesos", () => {
    const useUsuario = useStoreAdmin();

    const getProcesos = async () => {
        try {
            const r = await axios.get(`${url}/Procesos`, {
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

    const getProcesosID = async (id) => {
        try {
            const r = await axios.get(`${url}/Procesos/${id}`, {
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

    const postProcesos = async (datos) => {
        try {
            const r = await axios.post(`${url}/Procesos/`, datos, {
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

    const putProcesos = async (id, datos) => {
        try {
            const r = await axios.put(`${url}/Procesos/${id}`, datos, {
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
        getProcesos,
        getProcesosID,
        postProcesos,
        putProcesos
    };
},
{
    persist: true,
}
);
