import { defineStore } from "pinia";
import { ref } from "vue";
import { useStoreAdmins } from "./admin.js";
import axios from "axios";
import { notifyErrorRequest,  } from "../routes/routes.js";

export const useStoreProduccion = defineStore(
	"Produccion",
	() => {
		// const url = "http://localhost:3000";
		const url = "https://b-proyectoadso-production.up.railway.app";
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

		const getProduccion = async () => {
			try {
				loading.value = true;
				const r = await axios.get(`${url}/produccion`, {
					headers: {
						token: useAdmin.token,
					},
				});
				return r;
			} catch (error) {
				console.error("Error al listar producciones:", error.response.data);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const getProduccionActivas = async () => {
			try {
				loading.value = true;
				const r = await axios.get(`${url}/produccion/activos`, {
					headers: {
						token: useAdmin.token,
					},
				});
				return r;
			} catch (error) {
				console.error("Error al listar producciones activas:", error.response.data);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const getProduccionInactivas = async () => {
			try {
				loading.value = true;
				const r = await axios.get(`${url}/produccion/inactivos`, {
					headers: {
						token: useAdmin.token,
					},
				});
				return r;
			} catch (error) {
				console.error("Error al listar producciones inactivas:", error.response.data);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const getProduccionFechas = async (fechaInicio, fechaFin) => {
			try {
				loading.value = true;
				const r = await axios.get(`${url}/produccion/fechas/${fechaInicio}/${fechaFin}`, {
					headers: {
						token: useAdmin.token,
					},
				});
				return r;
			} catch (error) {
				console.error("Error al listar producciones por fechas:", error.response.data);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const getProduccionCultivo = async (cultivo_id) => {
			try {
				loading.value = true;
				const r = await axios.get(`${url}/produccion/cultivo/${cultivo_id}`, {
					headers: {
						token: useAdmin.token,
					},
				});
				return r;
			} catch (error) {
				console.error("Error al buscar producciones por el id del cultivo:", error.response.data);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const getProduccionTotal = async (id) => {
			try {
				loading.value = true;
				const r = await axios.get(`${url}/produccion/total/${id}`, {
					headers: {
						token: useAdmin.token,
					},
				});
				return r;
			} catch (error) {
				console.error("Error al totalizar las producciones:", error.response.data);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const getProduccionID = async (id) => {
			try {
				loading.value = true;
				const r = await axios.get(`${url}/produccion/${id}`, {
					headers: {
						token: useAdmin.token,
					},
				});
				return r;
			} catch (error) {
				console.error("Error al buscar producción:", error.response.data);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const postProduccion = async (datos) => {
			try {
				loading.value = true;
				const r = await axios.post(`${url}/produccion`, datos, {
					headers: {
						token: useAdmin.token,
					},
				});
				return r;
			} catch (error) {
				notifyErrorRequest(error.response.data.errors[0].msg);
				console.error("Error al agregar producción:", error.response.data.errors[0].msg);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const putProduccion = async (id, datos) => {
			try {
				loading.value = true;
				const r = await axios.put(`${url}/produccion/${id}`, datos, {
					headers: {
						token: useAdmin.token,
					},
				});
				return r;
			} catch (error) {
				console.log(error);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const putProduccionActivar = async (id) => {
			try {
				loading.value = true;
				const r = await axios.put(`${url}/produccion/activar/${id}`, null, {
					headers: {
						token: useAdmin.token,
					},
				});
				return r;
			} catch (error) {
				notifyErrorRequest(error);
				console.error("Error al activar produccion:", error);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const putProduccionInactivar = async (id) => {
			try {
				loading.value = true;
				const r = await axios.put(`${url}/produccion/inactivar/${id}`, null, {
					headers: {
						token: useAdmin.token,
					},
				});
				return r;
			} catch (error) {
				notifyErrorRequest(error);
				console.error("Error al inactivar produccion:", error);
				return error;
			} finally {
				loading.value = false;
			}
		};

		return {
			getProduccion,
			getProduccionActivas,
			getProduccionInactivas,
			getProduccionFechas,
			getProduccionCultivo,
			getProduccionTotal,
			getProduccionID,
			postProduccion,
			putProduccion,
			putProduccionActivar,
			putProduccionInactivar,
			getCultivos
		};
	}
);
