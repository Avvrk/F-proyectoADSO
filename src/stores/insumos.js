import { defineStore } from "pinia";
import axios from "axios";
import { useStoreAdmins } from "./admin.js";

export const useStoreInsumos = defineStore(
	"Insumos",
	() => {
		// const url = "http://localhost:3000";
		const url = "https://b-proyectoadso-production.up.railway.app";
		const useUsuario = useStoreAdmins();

		const getInsumos = async () => {
			try {
				const r = await axios.get(`${url}/Insumos`, {
					headers: {
						token: useUsuario.token,
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
						token: useUsuario.token,
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
						token: useUsuario.token,
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
						token: useUsuario.token,
					},
				});
				return r;
			} catch (error) {
				console.log(error);
				return error;
			}
		};

		return {
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
