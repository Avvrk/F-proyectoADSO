import { defineStore } from "pinia";
import axios from "axios";
import { useStoreAdmins } from "./admin.js";
import { useQuasar } from "quasar";

export const useStoreInsumos = defineStore(
	"Insumos",
	() => {
		const url = "http://localhost:4000";
		// const url = "https://b-proyectoadso-production.up.railway.app";
		const useAdmin = useStoreAdmins();
		const $q = useQuasar();

		const getProveedores = async () => {
			try {
				const r = await axios.get(`${url}/Proveedores`, {
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
		}

		const getInsumos = async () => {
			try {
				const r = await axios.get(`${url}/Insumos`, {
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
				return r;
			} catch (error) {
				console.log(error);
				return error;
			}
		};

		return {
			getProveedores,
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
