import { defineStore } from "pinia";
import { ref } from "vue";
import { useStoreAdmins } from "./admin.js";
import axios from "axios";
import { notifyErrorRequest } from "../routes/routes.js";

export const useStoreProcesos = defineStore(
	"Procesos",
	() => {
		const url = "http://localhost:3000";
		// const url = "https://b-proyectoadso-production.up.railway.app";
		let loading = ref(false);
		const useAdmin = useStoreAdmins();

		const getCultivos = async () => {
			try {
				const r = await axios.get(`${url}/Cultivos`, {
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

		const getEmpleados = async () => {
			console.log(useAdmin.token);
			try {
				const r = await axios.get(`${url}/admin`, {
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

		const getProcesos = async () => {
			try {
				loading.value = true;
				const r = await axios.get(`${url}/procesos`, {
					headers: {
						token: useAdmin.token,
					},
				});
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
						token: useAdmin.token,
					},
				});
				return r;
			} catch (error) {
				console.error("Error al listar procesos activos:", error.response.data);
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
						token: useAdmin.token,
					},
				});
				return r;
			} catch (error) {
				console.error("Error al listar procesos inactivos:", error.response.data);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const getProcesosFechas = async (fecha1, fecha2) => {
			try {
				loading.value = true;
				const r = await axios.get(`${url}/procesos/fechas/${fecha1}/${fecha2}`, {
					headers: {
						token: useAdmin.token,
					},
				});
				return r;
			} catch (error) {
				console.error("Error al listar procesos por fechas:", error.response.data);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const getProcesosTipo = async (tipo_id) => {
			try {
				loading.value = true;
				const r = await axios.get(`${url}/procesos/tipo/${tipo_id}`, {
					headers: {
						token: useAdmin.token,
					},
				});
				return r;
			} catch (error) {
				console.error("Error al buscar procesos por su tipo:", error.response.data);
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
						token: useAdmin.token,
					},
				});
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
						token: useAdmin.token,
					},
				});
				return r;
			} catch (error) {
				notifyErrorRequest(error.response.data.errors[0].msg);
				console.error("Error al agregar proceso:", error.response.data.errors[0].msg);
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
						token: useAdmin.token,
					},
				});
				return r;
			} catch (error) {
				notifyErrorRequest(error.response.data.errors[0].msg);
				console.error("Error al editar proceso:", error.response.data.errors[0].msg);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const putProcesoActivar = async (id) => {
			try {
				loading.value = true;
				const r = await axios.put(`${url}/procesos/activar/${id}`, null, {
					headers: {
						token: useAdmin.token,
					},
				});
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
				const r = await axios.put(`${url}/procesos/inactivar/${id}`, null, {
					headers: {
						token: useAdmin.token,
					},
				});
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
			getProcesosTipo,
			getProcesoID,
			postProceso,
			putProceso,
			putProcesoActivar,
			putProcesoInactivar,
			getCultivos,
			getEmpleados
		};
	}
);
