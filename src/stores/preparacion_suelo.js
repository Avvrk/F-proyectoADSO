import { defineStore } from "pinia";
import axios from "axios";
import { useStoreAdmins } from "./admin.js";

const url = "http://localhost:4505"
// "https://backendgimnasio-ip8j.onrender.com"

export const useStorePreparacion_suelo = defineStore("Preparacion_suelo", () => {
    const useUsuario = useStoreAdmin();

    const getPreparacion_suelo = async () => {
        try {
            const r = await axios.get(`${url}/Preparacion_suelo`, {
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

    const getPreparacion_sueloId = async (id) => {
        try {
            const r = await axios.get(`${url}/Preparacion_suelo/${id}`, {
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

    const postPreparacion_suelo = async (datos) => {
        try {
            const r = await axios.post(`${url}/Preparacion_suelo/`, datos, {
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

    const putPreparacion_suelo = async (id, datos) => {
        try {
            const r = await axios.put(`${url}/Preparacion_suelo/${id}`, datos, {
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
        getPreparacion_suelo,
        getPreparacion_sueloId,
        postPreparacion_suelo,
        putPreparacion_suelo
    };
},
{
    persist: true,
}
);
