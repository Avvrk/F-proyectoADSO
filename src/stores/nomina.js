import { defineStore } from "pinia";
import axios from "axios";
import { useStoreAdmins } from "./admin.js";

export const useStoreNomina = defineStore("Nomina", () => {
    const url = "http://localhost:3000";
    // const url = "https://b-proyectoadso-production.up.railway.app";
    const useAdmin = useStoreAdmins();

    const getEmpleados = async () => {
        try {
            const r = await axios.get(`${url}/empleados`, {
                headers: {
                    token: useAdmin.token,
                },
            });
            return r;
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    const getNomina = async () => {
        try {
            const r = await axios.get(`${url}/nomina`, {
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

    const getNominaId = async (id) => {
        if (!id) {
            throw new Error("ID no definido");
        }
        try {
            const r = await axios.get(`${url}/nomina/${id}`, {
                headers: {
                    token: useAdmin.token,
                },
            });
            return r;
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    const getNominaActivos = async () => {
        try {
            const r = await axios.get(`${url}/nomina/activos`, {
                headers: {
                    token: useAdmin.token,
                },
            });
            return r;
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    const getNominaInactivos = async () => {
        try {
            const r = await axios.get(`${url}/nomina/inactivos`, {
                headers: {
                    token: useAdmin.token,
                },
            });
            return r;
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    const getNominaFechas = async (fechaInicio, fechaFin) => {
        try {
            const r = await axios.get(`${url}/nomina/fechas/${fechaInicio}/${fechaFin}`, {
                headers: {
                    token: useAdmin.token,
                },
            });
            return r;
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    const getNominaEmpleados = async (id) => {
        if (!id) {
            throw new Error("ID no definido");
        }
        try {
            const r = await axios.get(`${url}/nomina/empleados/${id}`, {
                headers: {
                    token: useAdmin.token,
                },
            });
            return r;
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    const getNominaTotal = async () => {
        try {
            const r = await axios.get(`${url}/nomina/total`, {
                headers: {
                    token: useAdmin.token,
                },
            });
            return r;
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    const postNomina = async (datos) => {
        try {
            const response = await axios.post(`${url}/nomina`, datos, {
                headers: {
                    token: useAdmin.token,
                },
            });
            return response;
        } catch (error) {
            console.log(error.response.data);
            return error;
        }
    };

    const putNomina = async (id, datos) => {
        if (!id) {
            throw new Error("ID no definido");
        }
        try {
            const r = await axios.put(`${url}/nomina/${id}`, datos, {
                headers: {
                    token: useAdmin.token,
                },
            });
            return r;
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    const putNominaActivar = async (id) => {
        if (!id) {
            throw new Error("ID no definido");
        }
        try {
            const r = await axios.put(
                `${url}/nomina/activar/${id}`,
                {},
                {
                    headers: {
                        token: useAdmin.token,
                    },
                }
            );
            return r;
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    const putNominaInactivar = async (id) => {
        if (!id) {
            throw new Error("ID no definido");
        }
        try {
            const r = await axios.put(
                `${url}/nomina/desactivar/${id}`,
                {},
                {
                    headers: {
                        token: useAdmin.token,
                    },
                }
            );
            return r;
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    return {
        getEmpleados,
        getNomina,
        getNominaId,
        getNominaActivos,
        getNominaInactivos,
        getNominaFechas,
        getNominaEmpleados,
        getNominaTotal,
        postNomina,
        putNomina,
        putNominaActivar,
        putNominaInactivar,
    };
});
