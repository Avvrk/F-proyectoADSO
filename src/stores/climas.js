import { defineStore } from "pinia";
import axios from "axios";
import { useStoreAdmins } from "./admin.js";

const url = "http://localhost:4505"
// "https://backendgimnasio-ip8j.onrender.com"

export const useStoreClimas = defineStore("climas", () => {
    const useUsuario = useStoreAdmins();

    const getClimas = async () => {
        try {
            const r = await axios.get(`${url}/climas`, {
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

    const getClimasID = async (id) => {
        try {
            const r = await axios.get(`${url}/climas/${id}`, {
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

    const postClimas = async (datos) => {
        try {
            const r = await axios.post(`${url}/climas/`, datos, {
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

    const putClimas = async (id, datos) => {
        try {
            const r = await axios.put(`${url}/climas/${id}`, datos, {
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
        getClimas,
        getClimasID,
        postClimas,
        putClimas
    };
},
{
    persist: true,
}
);
