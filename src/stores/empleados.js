import { defineStore } from "pinia";
import axios from "axios";
import { useStoreAdmins } from "./admin.js";

const url = "http://localhost:4505"
// "https://backendgimnasio-ip8j.onrender.com"

export const useStoreEmpleados = defineStore("Empleados", () => {
    const useUsuario = useStoreAdmin();

    const getEmpleados = async () => {
        try {
            const r = await axios.get(`${url}/Empleados`, {
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

    const getEmpleadosID = async (id) => {
        try {
            const r = await axios.get(`${url}/Empleados/${id}`, {
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

    const postEmpleados = async (datos) => {
        try {
            const r = await axios.post(`${url}/Empleados/`, datos, {
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

    const putEmpleados = async (id, datos) => {
        try {
            const r = await axios.put(`${url}/Empleados/${id}`, datos, {
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
        getEmpleados,
        getEmpleadosID,
        postEmpleados,
        putEmpleados
    };
},
{
    persist: true,
}
);
