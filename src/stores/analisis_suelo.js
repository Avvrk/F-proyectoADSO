import { defineStore } from "pinia";
import axios from "axios";
import { useStoreAdmins } from "./admin.js";

const url = "http://localhost:4505"
// "https://backendgimnasio-ip8j.onrender.com"

export const useStoreAnalisisSuelos = defineStore("AnalisisSuelo", () => {
    const useUsuario = useStoreAdmin();

    const getAnalisisSuelo = async () => {
        try {
            const r = await axios.get(`${url}/api/analisisSuelo`, {
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

    const getAnalisisSueloID = async (id) => {
        try {
            const r = await axios.get(`${url}/api/analisisSuelo/${id}`, {
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

    const postAnalisisSuelo = async (datos) => {
        try {
            const r = await axios.post(`${url}/api/analisisSuelo/`, datos, {
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

    const putAnalisisSuelo = async (id, datos) => {
        try {
            const r = await axios.put(`${url}/api/analisisSuelo/${id}`, datos, {
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
        getAnalisisSuelo,
        getAnalisisSueloID,
        postAnalisisSuelo,
        putAnalisisSuelo
    };
},
{
    persist: true,
}
);
