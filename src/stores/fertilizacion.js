import { defineStore } from "pinia";
import { ref } from "vue";
import { useStoreAdmins } from "./admin";
import axios from "axios";

export const useStoreFertilizacion = defineStore(
	"Fertilizacion",
	() => {
		const url = "http://localhost:3000";
		// const url = "https://b-proyectoadso-production.up.railway.app";
		const useAdmin = useStoreAdmins();

		const getCultivos = async () => {
			try {
				const r = await axios.get(`${url}/cultivos`, {
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

		const getEmpleados = async () => {
			try {
				const r = await axios.get(`${url}/empleados`, {
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

		const getFertilizacion = async () => {
			try {
				const r = await axios.get(`${url}/fertilizaciones`, {
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

		const getFertilizacionID = async (id) => {
			try {
				const r = await axios.get(`${url}/fertilizacion/${id}`, {
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

		const postFertilizacion = async (datos) => {
			try {
				const r = await axios.post(`${url}/fertilizaciones`, datos, {
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

		const putFertilizacion = async (id, datos) => {
			try {
				const r = await axios.put(
					`${url}/fertilizaciones/${id}`,
					datos,
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
			getCultivos,
			getEmpleados,
			getInventario,
			getFertilizacion,
			getFertilizacionID,
			postFertilizacion,
			putFertilizacion,
		};
	},
	{
		persist: true,
	}
);
