import { defineStore } from "pinia";
import axios from "axios";
import { useStoreAdmins } from "../stores/admin.js";

export const useStoreCultivos = defineStore(
	"cultivos",
	() => {
		const url = "http://localhost:3000";
		// const url = "https://b-proyectoadso-production.up.railway.app";
		const useAdmin = useStoreAdmins();

		const getParcelas = async () => {
			try {
				const r = await axios.get(`${url}/parcelas`, {
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

		const getCultivos = async () => {
			try {
				const r = await axios.get(`${url}/cultivos`, {
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

		const getCultivosParcelas = async (parcela) => {
			try {
				const r = await axios.get(`${url}/cultivos/parcelas/${parcela}`, {
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

		const getCultivosTipo = async (tipo) => {
			try {
				const r = await axios.get(`${url}/cultivos/tipo/${tipo}`, {
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

		const getCultivosID = async (id) => {
			try {
				const r = await axios.get(`${url}/cultivos/${id}`, {
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

		const postCultivos = async (datos) => {
			try {
				const r = await axios.post(`${url}/cultivos`, datos, {
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

		const putCultivos = async (id, datos) => {
			try {
				const r = await axios.put(`${url}/cultivos/${id}`, datos, {
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

		return {
			getParcelas,
			getCultivos,
			getCultivosID,
			getCultivosParcelas,
			getCultivosTipo,
			postCultivos,
			putCultivos,
		};
	}
);
