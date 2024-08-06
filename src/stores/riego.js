import { defineStore } from "pinia";
import axios from "axios";
import { useStoreAdmins } from "./admin.js";

const url = "http://localhost:4505"
// "https://backendgimnasio-ip8j.onrender.com"

export const useStoreRiego = defineStore("Riego", () => {
    const useUsuario = useStoreAdmin();

    const getRiego = async () => {
        try {
            const r = await axios.get(`${url}/Riego`, {
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

    const getRiegoID = async (id) => {
        try {
            const r = await axios.get(`${url}/Riego/${id}`, {
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

    const postRiego = async (datos) => {
        try {
            const r = await axios.post(`${url}/Riego/`, datos, {
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

    const putRiego = async (id, datos) => {
        try {
            const r = await axios.put(`${url}/Riego/${id}`, datos, {
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
        getRiego,
        getRiegoID,
        postRiego,
        putRiego
    };
},
{
    persist: true,
}
);
