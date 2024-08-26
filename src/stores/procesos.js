import { defineStore } from "pinia";
import { ref } from "vue";
import { useStoreAdmins } from "./admin.js";
import axios from "axios";
import { notifyErrorRequest, notifySuccessRequest } from "../routes/routes.js";

export const useStoreProcesos = defineStore(
	"Procesos",
	() => {
		const url = "http://localhost:3000";
		// const url = "https://b-proyectoadso-production.up.railway.app";
		let loading = ref(false);
		const useUAdmin = useStoreAdmins();

		const getProcesos = async () => {
			try {
				loading.value = true;
				const r = await axios.get(`${url}/procesos`, {
					headers: {
						token: useUAdmin.token,
					},
				});
				notifySuccessRequest("Procesos listadas exitosamente.");
				return r;
			} catch (error) {
				console.error("Error al listar procesos:", error.response.data);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const getProcesosActivos = async () => {
			try {
				loading.value = true;
				const r = await axios.get(`${url}/procesos/activos`, {
					headers: {
						token: useUAdmin.token,
					},
				});
				notifySuccessRequest("Procesos activos listadas exitosamente.");
				return r;
			} catch (error) {
				console.error(
					"Error al listar procesos activos:",
					error.response.data
				);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const getProcesosInactivos = async () => {
			try {
				loading.value = true;
				const r = await axios.get(`${url}/procesos/inactivos`, {
					headers: {
						token: useUAdmin.token,
					},
				});
				notifySuccessRequest(
					"Procesos inactivos listadas exitosamente."
				);
				return r;
			} catch (error) {
				console.error(
					"Error al listar procesos inactivos:",
					error.response.data
				);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const getProcesosFechas = async () => {
			try {
				loading.value = true;
				const r = await axios.get(
					`${url}/procesos/fechas/${fechaInicio}/${fechaFin}`,
					{
						headers: {
							token: useUAdmin.token,
						},
					}
				);
				notifySuccessRequest(
					"Procesos listadas por fechas exitosamente."
				);
				return r;
			} catch (error) {
				console.error(
					"Error al listar procesos por fechas:",
					error.response.data
				);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const getProcesosCultivo = async (cultivo_id) => {
			try {
				loading.value = true;
				const r = await axios.get(
					`${url}/procesos/cultivo/${cultivo_id}`,
					{
						headers: {
							token: useUAdmin.token,
						},
					}
				);
				notifySuccessRequest(
					"Procesos listadas por el id del cultivo exitosamente."
				);
				return r;
			} catch (error) {
				console.error(
					"Error al buscar procesos por el id del cultivo:",
					error.response.data
				);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const getProcesoID = async (id) => {
			try {
				loading.value = true;
				const r = await axios.get(`${url}/procesos/${id}`, {
					headers: {
						token: useUAdmin.token,
					},
				});
				notifySuccessRequest("Proceso encontrado exitosamente.");
				return r;
			} catch (error) {
				console.error("Error al buscar proceso:", error.response.data);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const postProceso = async (datos) => {
			try {
				loading.value = true;
				const r = await axios.post(`${url}/procesos/`, datos, {
					headers: {
						token: useUAdmin.token,
					},
				});
				notifySuccessRequest("Proceso agregado exitosamente.");
				return r;
			} catch (error) {
				notifyErrorRequest(error.response.data.errors[0].msg);
				console.error(
					"Error al agregar proceso:",
					error.response.data.errors[0].msg
				);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const putProceso = async (id, datos) => {
			try {
				loading.value = true;
				const r = await axios.put(`${url}/procesos/${id}`, datos, {
					headers: {
						token: useUAdmin.token,
					},
				});
				notifySuccessRequest("Proceso editado exitosamente.");
				return r;
			} catch (error) {
				notifyErrorRequest(error.response.data.errors[0].msg);
				console.error(
					"Error al editar proceso:",
					error.response.data.errors[0].msg
				);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const putProcesoActivar = async (id) => {
			try {
				loading.value = true;
				const r = await axios.put(
					`${url}/procesos/activar/${id}`,
					null,
					{
						headers: {
							token: useUAdmin.token,
						},
					}
				);
				notifySuccessRequest("Proceso activado exitosamente.");
				return r;
			} catch (error) {
				notifyErrorRequest(error);
				console.error("Error al activar proceso:", error);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const putProcesoInactivar = async (id) => {
			try {
				loading.value = true;
				const r = await axios.put(
					`${url}/procesos/inactivar/${id}`,
					null,
					{
						headers: {
							token: useUAdmin.token,
						},
					}
				);
				notifySuccessRequest("Proceso inactivado exitosamente.");
				return r;
			} catch (error) {
				notifyErrorRequest(error);
				console.error("Error al inactivar proceso:", error);
				return error;
			} finally {
				loading.value = false;
			}
		};

		return {
			getProcesos,
			getProcesosActivos,
			getProcesosInactivos,
			getProcesosFechas,
			getProcesosCultivo,
			getProcesoID,
			postProceso,
			putProceso,
			putProcesoActivar,
			putProcesoInactivar,
		};
	},
	{
		persist: true,
	}
);
