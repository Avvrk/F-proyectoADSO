import { defineStore } from "pinia";
import axios from "axios";
import { useStoreAdmins } from "./admin.js";

export const useStoreNomina = defineStore(
	"Nomina",
	() => {
		const url = "http://localhost:3000";
		// const url = "https://b-proyectoadso-production.up.railway.app";
		const useAdmin = useStoreAdmins();

		const getNomina = async () => {
			try {
				const r = await axios.get(`${url}/Nomina`, {
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

		const getNominaId = async (id) => {
			try {
				const r = await axios.get(`${url}/Nomina/${id}`, {
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
				const r = await axios.post(`${url}/Nomina/`, datos, {
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

		const putNomina = async (id, datos) => {
			try {
				const r = await axios.put(`${url}/Nomina/${id}`, datos, {
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
			getNomina,
			getNominaId,
			postNomina,
			putNomina,
		};
	},
	{
		persist: true,
	}
);
