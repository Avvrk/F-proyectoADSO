import { defineStore } from "pinia";
import { ref } from "vue";
import { useStoreAdmins } from "./admin.js";
import axios from "axios";
import { notifyErrorRequest, notifySuccessRequest } from "../routes/routes.js";

export const useStoreSiembra = defineStore(
	"Siembra",
	() => {
		// const url = "http://localhost:3000";
		const url = "https://b-proyectoadso-production.up.railway.app";
		let loading = ref(false);
		const useAdmin = useStoreAdmins();

		const getSiembra = async () => {
			try {
				loading.value = true;
				const r = await axios.get(`${url}/siembra`, {
					headers: {
						token: useAdmin.token,
					},
				});
				notifySuccessRequest("Siembras listadas exitosamente.");
				return r;
			} catch (error) {
				console.error("Error al listar siembras:", error.response.data);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const getSiembraID = async (id) => {
			try {
				loading.value = true;
				const r = await axios.get(`${url}/siembra/id/${id}`, {
					headers: {
						token: useAdmin.token,
					},
				});
				notifySuccessRequest("Siembra encontrada exitosamente.");
				return r;
			} catch (error) {
				console.error("Error al buscar siembra:", error.response.data);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const getSiembraFechas = async () => {
			try {
				loading.value = true;
				const r = await axios.get(`${url}/siembra/fechas`, {
					headers: {
						token: useAdmin.token,
					},
				});
				notifySuccessRequest(
					"Siembras listados por fechas exitosamente."
				);
				return r;
			} catch (error) {
				console.error(
					"Error al listar siembras por fechas:",
					error.response.data
				);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const getSiembraEmpleadoID = async (id) => {
			try {
				loading.value = true;
				const r = await axios.get(`${url}/siembra/empleado/${id}`, {
					headers: {
						token: useAdmin.token,
					},
				});
				notifySuccessRequest(
					"Siembras listadas por el id del empleado exitosamente."
				);
				return r;
			} catch (error) {
				console.error(
					"Error al buscar siembras por el id del empleado:",
					error.response.data
				);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const getSiembraCultivoAnteriorID = async (id) => {
			try {
				loading.value = true;
				const r = await axios.get(
					`${url}/siembra/cultivoAnterior/${id}`,
					{
						headers: {
							token: useAdmin.token,
						},
					}
				);
				notifySuccessRequest(
					"Siembras listadas por el id del cultivo anterior exitosamente."
				);
				return r;
			} catch (error) {
				console.error(
					"Error al buscar siembras por el id del cultivo anterior:",
					error.response.data
				);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const getSiembraActivas = async () => {
			try {
				loading.value = true;
				const r = await axios.get(`${url}/siembra/activos`, {
					headers: {
						token: useAdmin.token,
					},
				});
				notifySuccessRequest("Siembras activas listadas exitosamente.");
				return r;
			} catch (error) {
				console.error(
					"Error al listar siembras activas:",
					error.response.data
				);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const getSiembraInactivas = async () => {
			try {
				loading.value = true;
				const r = await axios.get(`${url}/siembra/inactivos`, {
					headers: {
						token: useAdmin.token,
					},
				});
				notifySuccessRequest(
					"Siembras inactivas listadas exitosamente."
				);
				return r;
			} catch (error) {
				console.error(
					"Error al listar siembras inactivas:",
					error.response.data
				);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const postSiembra = async (datos) => {
			try {
				loading.value = true;
				const r = await axios.post(`${url}/siembra/`, datos, {
					headers: {
						token: useAdmin.token,
					},
				});
				notifySuccessRequest("Siembra agregado exitosamente.");
				return r;
			} catch (error) {
				notifyErrorRequest(error.response.data.errors[0].msg);
				console.error(
					"Error al agregar siembra:",
					error.response.data.errors[0].msg
				);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const putSiembra = async (id, datos) => {
			try {
				loading.value = true;
				const r = await axios.put(`${url}/siembra/${id}`, datos, {
					headers: {
						token: useAdmin.token,
					},
				});
				notifySuccessRequest("Siembra editada exitosamente.");
				return r;
			} catch (error) {
				notifyErrorRequest(error.response.data.errors[0].msg);
				console.error(
					"Error al editar siembra:",
					error.response.data.errors[0].msg
				);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const putSiembraActivar = async (id) => {
			try {
				loading.value = true;
				const r = await axios.put(
					`${url}/siembra/activar/${id}`,
					null,
					{
						headers: {
							token: useAdmin.token,
						},
					}
				);
				notifySuccessRequest("Siembra activado exitosamente.");
				return r;
			} catch (error) {
				notifyErrorRequest(error);
				console.error("Error al activar siembra:", error);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const putSiembraInactivar = async (id) => {
			try {
				loading.value = true;
				const r = await axios.put(
					`${url}/siembra/inactivar/${id}`,
					null,
					{
						headers: {
							token: useAdmin.token,
						},
					}
				);
				notifySuccessRequest("Siembra inactivado exitosamente.");
				return r;
			} catch (error) {
				notifyErrorRequest(error);
				console.error("Error al inactivar siembra:", error);
				return error;
			} finally {
				loading.value = false;
			}
		};

		return {
			getSiembra,
			getSiembraID,
			getSiembraFechas,
			getSiembraEmpleadoID,
			getSiembraCultivoAnteriorID,
			getSiembraActivas,
			getSiembraInactivas,
			postSiembra,
			putSiembra,
			putSiembraActivar,
			putSiembraInactivar,
		};
	},
	{
		persist: true,
	}
);
