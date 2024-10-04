import { defineStore } from "pinia";
import { ref } from "vue";
import { useStoreAdmins } from "./admin.js";
import axios from "axios";

export const useStoreGastos = defineStore(
	"Gastos",
	() => {
		// const url = "http://localhost:4000";
		const url = "https://b-proyectoadso-production.up.railway.app";
		const useAdmin = useStoreAdmins();

		const getInsumos = async () => {
			try {
				const r = await axios.get(`${url}/Insumos`, {
					headers: {
						token: useAdmin.token,
					},
				});
				return r;
				console.log(r.data);
			} catch (error) {
				console.log(error);
				return error;
			}
		};

		const getSemillas = async () => {
			try {
				const r = await axios.get(`${url}/Semillas`, {
					headers: {
						token: useAdmin.token,
					},
				});
				return r;
				console.log(r.data);
			} catch (error) {
				console.log(error);
				return error;
			}
		};

		const getMantenimientos = async () => {
			try {
				const r = await axios.get(`${url}/Mantenimiento`, {
					headers: {
						token: useAdmin.token,
					},
				});
				return r;
				console.log(r.data);
			} catch (error) {
				console.log(error);
				return error;
			}
		};


		const getGastos = async () => {
			try {
				const r = await axios.get(`${url}/gastos`, {
					headers: {
						token: useAdmin.token,
					},
				});
				console.log(r.data);
				return r;
			} catch (error) {
				console.log(error.response);
				return error;
			}
		};

		const getGastosID = async (id) => {
			try {
				const r = await axios.get(`${url}/gastos/${id}`, {
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

		const postGastos = async (datos) => {
			try {
				const r = await axios.post(`${url}/gastos/`, datos, {
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

		const putGastos = async (id, datos) => {
			try {
				const r = await axios.put(`${url}/gastos/${id}`, datos, {
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
			getInsumos,
			getSemillas,
			getMantenimientos,
			getGastos,
			getGastosID,
			postGastos,
			putGastos,
		};
	},
	{
		persist: true,
	}
);
