import { defineStore } from "pinia";
import axios from "axios";
import { useStoreAdmins } from "./admin.js";

const url = "http://localhost:4505"
// "https://backendgimnasio-ip8j.onrender.com"

export const useStoreFactura = defineStore("Factura", () => {
    const useUsuario = useStoreAdmin();

    const getFactura = async () => {
        try {
            const r = await axios.get(`${url}/Factura`, {
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

    const getFacturaID = async (id) => {
        try {
            const r = await axios.get(`${url}/Factura/${id}`, {
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

    const postFactura = async (datos) => {
        try {
            const r = await axios.post(`${url}/Factura/`, datos, {
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

    const putFactura = async (id, datos) => {
        try {
            const r = await axios.put(`${url}/Factura/${id}`, datos, {
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
        getFactura,
        getFacturaID,
        postFactura,
        putFactura
    };
},
{
    persist: true,
}
);
