import { defineStore } from "pinia";
import axios from "axios";
import { useStoreAdmins } from "./admin.js";

const url = "http://localhost:4505"
// "https://backendgimnasio-ip8j.onrender.com"

export const useStoreInventario = defineStore("Inventario", () => {
    const useUsuario = useStoreAdmin();

    const getInventario = async () => {
        try {
            const r = await axios.get(`${url}/Inventario`, {
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

    const getInventarioId = async (id) => {
        try {
            const r = await axios.get(`${url}/Inventario/${id}`, {
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

    const postInventario = async (datos) => {
        try {
            const r = await axios.post(`${url}/Inventario/`, datos, {
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

    const putInventario = async (id, datos) => {
        try {
            const r = await axios.put(`${url}/Inventario/${id}`, datos, {
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
        getInventario,
        getInventarioId,
        postInventario,
        putInventario
    };
},
{
    persist: true,
}
);
