import { defineStore } from "pinia";
import axios from "axios";
import { useStoreAdmins } from "./admin.js";

const url = "http://localhost:4505"
// "https://backendgimnasio-ip8j.onrender.com"

export const useStoreComprador = defineStore("Comprador", () => {
    const useUsuario = useStoreAdmin();

    const getComprador = async () => {
        try {
            const r = await axios.get(`${url}/comprador`, {
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

    const getCompradorID = async (id) => {
        try {
            const r = await axios.get(`${url}/comprador/${id}`, {
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

    const postComprador = async (datos) => {
        try {
            const r = await axios.post(`${url}/comprador/`, datos, {
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

    const putComprador = async (id, datos) => {
        try {
            const r = await axios.put(`${url}/comprador/${id}`, datos, {
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
        getComprador,
        getCompradorID,
        postComprador,
        putComprador
    };
},
{
    persist: true,
}
);
