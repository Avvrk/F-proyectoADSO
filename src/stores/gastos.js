import { defineStore } from "pinia";
// import { ref } from "vue";
import { useStoreAdmins } from "./admin.js";
import axios from "axios";

export const useStoreGastos = defineStore(
    "Gastos",
    () => {
        const url = "http://localhost:4000";
        // const url = "https://b-proyectoadso-production.up.railway.app";
        const useAdmin = useStoreAdmins();

        const getInsumos = async () => {
            try {
                if (!useAdmin.token) {
                    console.error("Token no encontrado");
                    return;
                }
                const r = await axios.get(`${url}/Insumos`, {
                    headers: {
                        token: useAdmin.token,
                    },
                });
                console.log(r.data); // Colocado antes del return
                return r;
            } catch (error) {
                console.error(
                    "Error en la petición de Insumos",
                    error.response || error
                );
                return error;
            }
        };

        const getSemillas = async () => {
            try {
                if (!useAdmin.token) {
                    console.error("Token no encontrado");
                    return;
                }
                const r = await axios.get(`${url}/Semillas`, {
                    headers: {
                        token: useAdmin.token,
                    },
                });
                console.log(r.data);
                return r;
            } catch (error) {
                console.error(
                    "Error en la petición de Semillas",
                    error.response || error
                );
                return error;
            }
        };

        const getProveedores = async () => {
            // Función renombrada a getProveedor
            try {
                if (!useAdmin.token) {
                    console.error("Token no encontrado");
                    return;
                }
                const r = await axios.get(`${url}/proveedores`, {
                    headers: {
                        token: useAdmin.token,
                    },
                });
                console.log(r.data);
                return r;
            } catch (error) {
                console.error(
                    "Error en la petición de Proveedores",
                    error.response || error
                );
                return error;
            }
        };

        const getGastos = async () => {
            try {
                if (!useAdmin.token) {
                    console.error("Token no encontrado");
                    return;
                }
                const r = await axios.get(`${url}/gastos`, {
                    headers: {
                        token: useAdmin.token,
                    },
                });
                console.log(r.data);
                return r;
            } catch (error) {
                console.error(
                    "Error en la petición de Gastos",
                    error.response || error
                );
                return error;
            }
        };

        const getFincas = async () => {
            try {
                const r = await axios.get(`${url}/fincas`, {
                    headers: {
                        token: useAdmin.token,
                    },
                });
                console.log(r.data);
                return r;
            } catch (error) {
                console.log(error);
                return error;
            }
        };

        const postGastos = async (datos) => {
            try {
                if (!useAdmin.token) {
                    console.error("Token no encontrado");
                    return;
                }
                const r = await axios.post(`${url}/gastos/`, datos, {
                    headers: {
                        token: useAdmin.token,
                    },
                });
                console.log(r.data);
                return r;
            } catch (error) {
                console.error(
                    "Error al crear el Gasto",
                    error.response || error
                );
                return error;
            }
        };

        const putGastos = async (id, datos) => {
            try {
                if (!useAdmin.token) {
                    console.error("Token no encontrado");
                    return;
                }
                const r = await axios.put(`${url}/gastos/${id}`, datos, {
                    headers: {
                        token: useAdmin.token,
                    },
                });
                console.log(r.data);
                return r;
            } catch (error) {
                console.error(
                    "Error al actualizar el Gasto",
                    error.response || error
                );
                return error;
            }
        };

        return {
            getProveedores,
            getFincas, // Asegúrate de que esta línea esté aquí
            getInsumos,
            getSemillas,
            getGastos,
            postGastos,
            putGastos,
        };
    },
    {
        persist: true,
    }
);
