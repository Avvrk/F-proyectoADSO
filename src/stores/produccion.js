import { defineStore } from "pinia";
import axios from "axios";
import { useStoreAdmins } from "./admin.js";

const url = "http://localhost:4505"
// "https://backendgimnasio-ip8j.onrender.com"

export const useStoreProduccion= defineStore("Produccion", () => {
    const useUsuario = useStoreAdmin();

    const getProduccion = async () => {
        try {
            const r = await axios.get(`${url}/Produccion`, {
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

    const getProduccionID = async (id) => {
        try {
            const r = await axios.get(`${url}/Produccion/${id}`, {
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

    const postProduccion = async (datos) => {
        try {
            const r = await axios.post(`${url}/Produccion/`, datos, {
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

    const putProduccion = async (id, datos) => {
        try {
            const r = await axios.put(`${url}/Produccion/${id}`, datos, {
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
        getProduccion,
        getProduccionID,
        postProduccion,
        putProduccion
    };
},
{
    persist: true,
}
);
