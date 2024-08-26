import { defineStore } from "pinia";
import axios from "axios";
import { useStoreAdmins } from "./admin.js";

export const useStoreMantenimiento = defineStore("Mantenimiento", () => {
	const url = "http://localhost:3000";
	// const url = "https://b-proyectoadso-production.up.railway.app";
	const useAdmin = useStoreAdmins();

	const getGastos = async () => {
		try {
			const response = await axios.get(`${url}/gastos`, {
				headers: {
					token: useAdmin.token,
				},
			});
			console.log(response.data);
			return response;
		} catch (error) {
			console.error(error);
			return error;
		}
	};

	const getHerramientas = async () => {
		try {
			const response = await axios.get(`${url}/maquinariaHerramienta`, {
				headers: {
					token: useAdmin.token,
				},
			});
			console.log(response.data);
			return response;
		} catch (error) {
			console.error(error);
			return error;
		}
	};

	const getMantenimientos = async () => {
		try {
			const response = await axios.get(`${url}/mantenimiento`, {
				headers: {
					token: useAdmin.token,
				},
			});
			console.log(response.data);
			return response;
		} catch (error) {
			console.error(error);
			return error;
		}
	};

	const getMantenimientoById = async (id) => {
		try {
			const response = await axios.get(`${url}/mantenimiento/${id}`, {
				headers: {
					token: useAdmin.token,
				},
			});
			console.log(response.data);
			return response;
		} catch (error) {
			console.error(error);
			return error;
		}
	};

	const getMantenimientosFechas = async (fechaInicio, fechaFin) => {
		try {
			const response = await axios.get(
				`${url}/mantenimiento/fechas/${fechaInicio}/${fechaFin}`,
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

	const getMantenimientosHerramientas = async (id) => {
		try {
			const response = await axios.get(
				`${url}/mantenimiento/herramienta/${id}`,
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

	const getMantenimientosResponsable = async (persona) => {
		try {
			const response = await axios.get(
				`${url}/mantenimiento/responsable/${persona}`,
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

	const postMantenimiento = async (datos) => {
		try {
			const response = await axios.post(`${url}/mantenimiento`, datos, {
				headers: {
					token: useAdmin.token,
				},
			});
			console.log(response.data);
			return response;
		} catch (error) {
			console.error(error);
			return error;
		}
	};

	const putMantenimiento = async (id, datos) => {
		try {
			const response = await axios.put(
				`${url}/mantenimiento/${id}`,
				datos,
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

	return {
		getGastos,
		getHerramientas,
		getMantenimientos,
		getMantenimientoById,
		getMantenimientosFechas,
		getMantenimientosHerramientas,
		getMantenimientosResponsable,
		postMantenimiento,
		putMantenimiento,
	};
});
