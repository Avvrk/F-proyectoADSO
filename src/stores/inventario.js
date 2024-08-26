import { defineStore } from "pinia";
import axios from "axios";
import { useStoreAdmins } from "./admin.js";

export const useStoreInventario = defineStore("Inventario", () => {
	const url = "http://localhost:3000";
	// const url = "https://b-proyectoadso-production.up.railway.app";
	const useAdmin = useStoreAdmins();

	const getSemillas = async () => {
		try {
			const r = await axios.get(`${url}/semillas`, {
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
			const r = await axios.get(`${url}/insumos`, {
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

	const getMaquinaria = async () => {
		try {
			const r = await axios.get(`${url}/maquinariaHerramienta`, {
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

	const getInventarioID = async (id) => {
		try {
			const r = await axios.get(`${url}/inventario/${id}`, {
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

	const getInventarioFechas = async (fechaInicio, fechaFin) => {
		try {
			const response = await axios.get(
				`${url}/inventario/fechas/${fechaInicio}/${fechaFin}`,
				{
					headers: {
						token: useAdmin.token,
					},
				}
			);
			console.log(response.data);
			return response;
		} catch (error) {
			console.error(error);
			return error;
		}
	};

	const postInventario = async (datos) => {
		try {
			const r = await axios.post(`${url}/inventario`, datos, {
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

	const putInventario = async (id, datos) => {
		try {
			const r = await axios.put(`${url}/inventario/${id}`, datos, {
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

	return {
		getSemillas,
		getInsumos,
		getMaquinaria,
		getInventario,
		getInventarioID,
		getInventarioFechas,
		postInventario,
		putInventario,
	};
});
