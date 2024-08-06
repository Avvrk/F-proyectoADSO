import { defineStore } from "pinia";
import axios from "axios";
import { useStoreAdmins } from "./admin.js";

const url = "http://localhost:4505"
// "https://backendgimnasio-ip8j.onrender.com"

export const useStoreFertilizacion = defineStore("Fertilizacion", () => {
    const useUsuario = useStoreAdmin();

    const getFertilizacion = async () => {
        try {
            const r = await axios.get(`${url}/Fertilizacion`, {
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

    const getFertilizacionID = async (id) => {
        try {
            const r = await axios.get(`${url}/Fertilizacion/${id}`, {
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

    const postFertilizacion = async (datos) => {
        try {
            const r = await axios.post(`${url}/Fertilizacion/`, datos, {
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

    const putFertilizacion = async (id, datos) => {
        try {
            const r = await axios.put(`${url}/Fertilizacion/${id}`, datos, {
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
        getFertilizacion,
        getFertilizacionID,
        postFertilizacion,
        putFertilizacion
    };
},
{
    persist: true,
}
);
