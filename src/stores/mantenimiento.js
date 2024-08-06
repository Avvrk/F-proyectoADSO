import { defineStore } from "pinia";
import axios from "axios";
import { useStoreAdmins } from "./admin.js";

const url = "http://localhost:4505"
// "https://backendgimnasio-ip8j.onrender.com"

export const useStoreMantenimento = defineStore("Mantenimento", () => {
    const useUsuario = useStoreAdmin();

    const getMantenimientos = async () => {
        try {
            const r = await axios.get(`${url}/api/mantenimiento`, {
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

    const getMantenimientosId = async (id) => {
        try {
            const r = await axios.get(`${url}/api/mantenimiento/${id}`, {
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

    const postMantenimiento = async (datos) => {
        try {
            const r = await axios.post(`${url}/api/mantenimiento/`, datos, {
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

    const putMantenimiento = async (id, datos) => {
        try {
            const r = await axios.put(`${url}/api/mantenimiento/${id}`, datos, {
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
        getMantenimientos,
        getMantenimientosId,
        postMantenimiento,
        putMantenimiento
    };
},
{
    persist: true,
}
);
