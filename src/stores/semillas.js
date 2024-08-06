import { defineStore } from "pinia";
import axios from "axios";
import { useStoreAdmins } from "./admin.js";

const url = "http://localhost:4505"
// "https://backendgimnasio-ip8j.onrender.com"

export const useStoreSemillas = defineStore("Semillas", () => {
    const useUsuario = useStoreAdmin();

    const getSemillas = async () => {
        try {
            const r = await axios.get(`${url}/Semillas`, {
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

    const getSemillasID = async (id) => {
        try {
            const r = await axios.get(`${url}/Semillas/${id}`, {
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

    const postSemillas = async (datos) => {
        try {
            const r = await axios.post(`${url}/Semillas/`, datos, {
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

    const putSemillas = async (id, datos) => {
        try {
            const r = await axios.put(`${url}/Semillas/${id}`, datos, {
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
        getSemillas,
        getSemillasID,
        postSemillas,
        putSemillas
    };
},
{
    persist: true,
}
);
