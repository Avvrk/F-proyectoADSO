import { defineStore } from "pinia";
import { ref } from "vue";
import { useStoreAdmins } from "./admin";
import axios from "axios";

export const useStoreFacturas = defineStore("Facturas", () => {
    // const url = "http://localhost:3000";
    const url = "https://b-proyectoadso-production.up.railway.app";
    const useAdmin = useStoreAdmins();

    const getComprador = async () => {
        try {
            const r = await axios.get(`${url}/comprador`, {
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

    const getInventario = async () => {
        try {
            const r = await axios.get(`${url}/inventario`, {
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

    const getFacturas = async () => {
        console.log(useAdmin.token);
        try {
            const r = await axios.get(`${url}/facturas`, {
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

    const getFacturasID = async (id) => {
        try {
            const r = await axios.get(`${url}/facturas/id/${id}`, {
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

    const postFactura = async (datos) => {
        try {
            const r = await axios.post(`${url}/facturas`, datos, {
                headers: {
                    token: useAdmin.token,
                },
            });
            console.log(r.data);
            return r;
        } catch (error) {
            console.log(error);
            if (r.status !== 200) {
                $q.notify({
                    type: "negative",
                    message: "Parece que hubo un error en el registro",
                    position: "bottom-right",
                });
            } else {
                $q.notify({
                    type: "positive",
                    message: "El registro se ha realizado correctamente",
                    position: "bottom-right",
                });
            }
            return error;
        }
    };

    const putFactura = async (id, datos) => {
        try {
            const r = await axios.put(`${url}/facturas/${id}`, datos, {
                headers: {
                    token: useAdmin.token,
                },
            });
            console.log(r.data);
            if (r.status !== 200) {
                $q.notify({
                    type: "negative",
                    message: "Parece que hubo un error al editar",
                    position: "bottom-right",
                });
            } else {
                $q.notify({
                    type: "positive",
                    message: "El editar se ha realizado correctamente",
                    position: "bottom-right",
                });
            }
            return r;
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    return {
        getInventario,
        getComprador,
        getFacturas,
        getFacturasID,
        postFactura,
        putFactura,
    };
});
