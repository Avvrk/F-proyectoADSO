import { defineStore } from "pinia";
import { ref } from "vue";
import { useStoreAdmins } from "./admin.js";
import axios from "axios";
import { notifyErrorRequest } from "../routes/routes.js";

export const useStoreSemillas = defineStore(
	"Semillas",
	() => {
		// const url = "http://localhost:3000";
		const url = "https://b-proyectoadso-production.up.railway.app";
		let loading = ref(false);
		const useAdmin = useStoreAdmins();

		const getSemillas = async () => {
			try {
				loading.value = true;
				const r = await axios.get(`${url}/semillas`, {
					headers: {
						token: useAdmin.token,
					},
				});
				return r;
			} catch (error) {
				console.error("Error al listar semillas:", error.response.data);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const getSemillasID = async (id) => {
			try {
				loading.value = true;
				const r = await axios.get(`${url}/semillas/${id}`, {
					headers: {
						token: useAdmin.token,
					},
				});
				return r;
			} catch (error) {
				console.error("Error al buscar semilla:", error.response.data);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const getSemillasActivas = async () => {
			try {
				loading.value = true;
				const r = await axios.get(`${url}/semillas/activos`, {
					headers: {
						token: useAdmin.token,
					},
				});
				return r;
			} catch (error) {
				console.error("Error al listar semillas activas:", error.response.data);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const getSemillasInactivas = async () => {
			try {
				loading.value = true;
				const r = await axios.get(`${url}/semillas/inactivos`, {
					headers: {
						token: useAdmin.token,
					},
				});
				return r;
			} catch (error) {
				console.error("Error al listar semillas inactivas:", error.response.data);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const postSemillas = async (datos) => {
			try {
				loading.value = true;
				const r = await axios.post(`${url}/semillas/`, datos, {
					headers: {
						token: useAdmin.token,
					},
				});
				return r;
			} catch (error) {
				notifyErrorRequest(error.response.data.errors[0].msg);
				console.error("Error al agregar semilla:", error.response.data.errors[0].msg);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const putSemillas = async (id, datos) => {
			try {
				loading.value = true;
				const r = await axios.put(`${url}/semillas/${id}`, datos, {
					headers: {
						token: useAdmin.token,
					},
				});
				return r;
			} catch (error) {
				notifyErrorRequest(error.response.data.errors[0].msg);
				console.error("Error al editar semilla:", error.response.data.errors[0].msg);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const putSemillasActivar = async (id) => {
			try {
				loading.value = true;
				const r = await axios.put(`${url}/semillas/activar/${id}`, null, {
					headers: {
						token: useAdmin.token,
					},
				});
				return r;
			} catch (error) {
				notifyErrorRequest(error);
				console.error("Error al activar semilla:", error);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const putSemillasInactivar = async (id) => {
			try {
				loading.value = true;
				const r = await axios.put(`${url}/semillas/inactivar/${id}`, null, {
					headers: {
						token: useAdmin.token,
					},
				});
				return r;
			} catch (error) {
				notifyErrorRequest(error);
				console.error("Error al inactivar semilla:", error);
				return error;
			} finally {
				loading.value = false;
			}
		};

		return {
			getSemillas,
			getSemillasID,
			getSemillasActivas,
			getSemillasInactivas,
			postSemillas,
			putSemillas,
			putSemillasActivar,
			putSemillasInactivar,
		};
	}
);
