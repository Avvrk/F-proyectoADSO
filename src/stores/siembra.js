import { defineStore } from "pinia";
import { ref } from "vue";
import { useStoreAdmins } from "./admin.js";
import axios from "axios";
import { notifyErrorRequest } from "../routes/routes.js";

export const useStoreSiembra = defineStore(
	"Siembra",
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

		const getSiembra = async () => {
			try {
				loading.value = true;
				const r = await axios.get(`${url}/siembra`, {
					headers: {
						token: useAdmin.token,
					},
				});
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
				return r;
			} catch (error) {
				console.error("Error al buscar siembra:", error.response.data);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const getSiembraFechas = async (fechaInicio, fechaFin) => {
			try {
				loading.value = true;
				const r = await axios.get(`${url}/siembra/fechas/${fechaInicio}/${fechaFin}`, {
					headers: {
						token: useAdmin.token,
					},
				});
				return r;
			} catch (error) {
				console.error("Error al listar siembras por fechas:", error.response.data);
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
				return r;
			} catch (error) {
				console.error("Error al buscar siembras por el id del empleado:", error.response.data);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const getSiembraCultivoAnteriorID = async (id) => {
			try {
				loading.value = true;
				const r = await axios.get(`${url}/siembra/cultivoAnterior/${id}`, {
					headers: {
						token: useAdmin.token,
					},
				});
				return r;
			} catch (error) {
				console.error("Error al buscar siembras por el id del cultivo anterior:", error.response.data);
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
				return r;
			} catch (error) {
				console.error("Error al listar siembras activas:", error.response.data);
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
				return r;
			} catch (error) {
				console.error("Error al listar siembras inactivas:", error.response.data);
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
				return r;
			} catch (error) {
				notifyErrorRequest(error.response.data.errors[0].msg);
				console.error("Error al agregar siembra:", error.response.data.errors[0].msg);
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
				return r;
			} catch (error) {
				notifyErrorRequest(error.response.data.errors[0].msg);
				console.error("Error al editar siembra:", error.response.data.errors[0].msg);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const putSiembraActivar = async (id) => {
			try {
				loading.value = true;
				const r = await axios.put(`${url}/siembra/activar/${id}`, null, {
					headers: {
						token: useAdmin.token,
					},
				});
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
				const r = await axios.put(`${url}/siembra/inactivar/${id}`, null, {
					headers: {
						token: useAdmin.token,
					},
				});
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
			getCultivos,
			getEmpleados
		};
	}
);
