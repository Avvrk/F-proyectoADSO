import { defineStore } from "pinia";
import axios from "axios";
import { useStoreAdmins } from "./admin.js";
import notify from "../utils/notificaciones.js"

export const useStoreInsumos = defineStore(
	"Insumos",
	() => {
		// const url = "http://localhost:4000";
		const url = "https://b-proyectoadso-production.up.railway.app";
		const useAdmin = useStoreAdmins();

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

		const getInsumos = async () => {
			try {
				const r = await axios.get(`${url}/Insumos`, {
					headers: {
						token: useAdmin.token,
					},
				});
				console.log(r.data)
				return r;
			} catch (error) {
				console.log(error);
				return error;
			}
		};

		const getInsumosID = async (id) => {
			try {
				const r = await axios.get(`${url}/Insumos/${id}`, {
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

		const postInsumos = async (datos) => {
			try {
				const r = await axios.post(`${url}/Insumos/`, datos, {
					headers: {
						token: useAdmin.token,
					},
				});
				if (r.status !== 200) {
					notify("Parece que hubo un error en el registro")
				} else {
					notify("El registro se ha realizado correctamente", "positive")
				}
				return r;
			} catch (error) {
				console.log(error);
				return error;
			}
		};

		const putInsumos = async (id, datos) => {
			try {
				const r = await axios.put(`${url}/Insumos/${id}`, datos, {
					headers: {
						token: useAdmin.token,
					},
				});
				if (r.status !== 200) {
					notify("Parece que hubo un error al editar")
				} else {
					notify("El editar se ha realizado correctamente", "positive")
				}
				return r;
			} catch (error) {
				console.log(error);
				return error;
			}
		};

		return {
			getFincas,
			getInsumos,
			getInsumosID,
			postInsumos,
			putInsumos,
		};
	},
	{
		persist: true,
	}
);
