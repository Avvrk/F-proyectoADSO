import { defineStore } from "pinia";
import axios from "axios";
import { useStoreAdmins } from "./admin.js";

const url = "http://localhost:4505"
// "https://backendgimnasio-ip8j.onrender.com"

export const useStoreSiembra = defineStore("Siembra", () => {
    const useUsuario = useStoreAdmin();

    const getSiembra = async () => {
        try {
            const r = await axios.get(`${url}/Siembra`, {
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

    const getSiembraID = async (id) => {
        try {
            const r = await axios.get(`${url}/Siembra/${id}`, {
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

    const postSiembra = async (datos) => {
        try {
            const r = await axios.post(`${url}/Siembra/`, datos, {
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

    const putSiembra = async (id, datos) => {
        try {
            const r = await axios.put(`${url}/Siembra/${id}`, datos, {
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
        getSiembra,
        getSiembraID,
        postSiembra,
        putSiembra
    };
},
{
    persist: true,
}
);
