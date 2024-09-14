import { defineStore } from "pinia";
import axios from "axios";
import { useStoreAdmins } from "./admin.js";

export const useStorePreparacionSuelos = defineStore(
	"preparacion_suelo",
	() => {
		const url = "https://b-proyectoadso-production.up.railway.app";
		const useAdmin = useStoreAdmins();

		const getPreparacionSuelos = async () => {
			try {
				const r = await axios.get(`${url}/preparacionSuelos`, {
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

		const getParcelas = async () => {
			try {
				const r = await axios.get(`${url}/Parcelas`, {
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
			console.log(useAdmin.token);
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

		const getPreparacionSueloById = async (id) => {
			try {
				const r = await axios.get(`${url}/preparacionSuelos/${id}`, {
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

		const getPreparacionSuelosActivos = async () => {
			try {
				const r = await axios.get(`${url}/preparacionSuelos/activos`, {
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

		const getPreparacionSuelosInactivos = async () => {
			try {
				const r = await axios.get(
					`${url}/preparacionSuelos/inactivos`,
					{
						headers: {
							token: useAdmin.token,
						},
					}
				);
				console.log(r.data);
				return r;
			} catch (error) {
				console.log(error);
				return error;
			}
		};

		const postPreparacionSuelo = async (datos) => {
			try {
				const r = await axios.post(`${url}/preparacionSuelos`, datos, {
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

		const putPreparacionSuelo = async (id, datos) => {
			try {
				const r = await axios.put(
					`${url}/preparacionSuelos/${id}`,
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

		const putPreparacionSueloEstado = async (id, estado) => {
			try {
				const r = await axios.put(
					`${url}/preparacionSuelos/${
						estado === 0 ? "inactivar" : "activar"
					}/${id}`,
					{},
					{
						headers: {
							token: useAdmin.token,
						},
					}
				);
				console.log(r.data);
				return r;
			} catch (error) {
				console.log(error);
				return error;
			}
		};

		return {
			getPreparacionSuelos,
            getEmpleados,
			getParcelas,
			getPreparacionSueloById,
			getPreparacionSuelosActivos,
			getPreparacionSuelosInactivos,
			postPreparacionSuelo,
			putPreparacionSuelo,
			putPreparacionSueloEstado,
		};
	}
);
