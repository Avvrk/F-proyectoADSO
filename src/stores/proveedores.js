import { defineStore } from "pinia";
import axios from "axios";
import { useStoreAdmins } from "./admin.js";

const url = "http://localhost:4505"
// "https://backendgimnasio-ip8j.onrender.com"

export const useStoreProveedores = defineStore("Proveedores", () => {
    const useUsuario = useStoreAdmin();

    const getProveedores = async () => {
        try {
            const r = await axios.get(`${url}/Proveedores`, {
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

    const getProveedoresID = async (id) => {
        try {
            const r = await axios.get(`${url}/Proveedores/${id}`, {
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

    const postProveedores = async (datos) => {
        try {
            const r = await axios.post(`${url}/Proveedores/`, datos, {
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

    const putProveedores = async (id, datos) => {
        try {
            const r = await axios.put(`${url}/Proveedores/${id}`, datos, {
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
        getProveedores,
        getProveedoresID,
        postProveedores,
        putProveedores
    };
},
{
    persist: true,
}
);
