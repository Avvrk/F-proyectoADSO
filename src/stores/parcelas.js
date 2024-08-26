import { defineStore } from "pinia";
import axios from "axios";
import { useStoreAdmins } from "./admin.js";

export const useStoreParcelas = defineStore(
	"Parcelas",
	() => {
		const url = "http://localhost:3000";
		// const url = "https://b-proyectoadso-production.up.railway.app";
		const useAdmin = useStoreAdmins();

		const getParcelas = async () => {
			try {
				const r = await axios.get(`${url}/Parcelas`, {
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

		const getParcelaId = async (id) => {
			try {
				const r = await axios.get(`${url}/Parcelas/${id}`, {
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

		const postParcela = async (datos) => {
			try {
				const r = await axios.post(`${url}/Parcelas/`, datos, {
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

		const putIngresos = async (id, datos) => {
			try {
				const r = await axios.put(`${url}/Parcelas/${id}`, datos, {
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
			getParcelas,
			getParcelaId,
			postParcela,
			putIngresos,
		};
	},
	{
		persist: true,
	}
);
