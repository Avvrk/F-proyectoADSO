import { defineStore } from "pinia";
import { ref } from "vue";
import { useStoreAdmins } from "./admin.js";
import axios from "axios";
import { notifyErrorRequest, notifySuccessRequest } from "../routes/routes.js";

export const useStoreRiego = defineStore(
	"Riego",
	() => {
		// const url = "http://localhost:3000";
		const url = "https://b-proyectoadso-production.up.railway.app";
		let loading = ref(false);
		const useAdmin = useStoreAdmins();

		const getRiego = async () => {
			try {
				loading.value = true;
				const r = await axios.get(`${url}/riego`, {
					headers: {
						token: useAdmin.token,
					},
				});
				notifySuccessRequest("Riegos listadas exitosamente.");
				return r;
			} catch (error) {
				console.error("Error al listar riegos:", error.response.data);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const getRiegoID = async (id) => {
			try {
				loading.value = true;
				const r = await axios.get(`${url}/riego/id/${id}`, {
					headers: {
						token: useAdmin.token,
					},
				});
				notifySuccessRequest("Riegos encontrada exitosamente.");
				return r;
			} catch (error) {
				console.error("Error al buscar riego:", error.response.data);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const getRiegoFechas = async () => {
			try {
				loading.value = true;
				const r = await axios.get(`${url}/riego/fechas`, {
					headers: {
						token: useAdmin.token,
					},
				});
				notifySuccessRequest(
					"Riegos listados por fechas exitosamente."
				);
				return r;
			} catch (error) {
				console.error(
					"Error al listar riegos por fechas:",
					error.response.data
				);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const getRiegoEmpleadoID = async (id) => {
			try {
				loading.value = true;
				const r = await axios.get(`${url}/riego/empleado/${id}`, {
					headers: {
						token: useAdmin.token,
					},
				});
				notifySuccessRequest(
					"Riegos listadas por el id del empleado exitosamente."
				);
				return r;
			} catch (error) {
				console.error(
					"Error al buscar riegos por el id del empleado:",
					error.response.data
				);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const getRiegoCultivo = async (id) => {
			try {
				loading.value = true;
				const r = await axios.get(`${url}/riego/cultivo/${id}`, {
					headers: {
						token: useAdmin.token,
					},
				});
				notifySuccessRequest(
					"Riegos listadas por el id del cultivo exitosamente."
				);
				return r;
			} catch (error) {
				console.error(
					"Error al buscar riegos por el id del cultivo:",
					error.response.data
				);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const getRiegoCantidadAguaCultivo = async (id) => {
			try {
				loading.value = true;
				const r = await axios.get(`${url}/riego/cantidadAgua/${id}`, {
					headers: {
						token: useAdmin.token,
					},
				});
				notifySuccessRequest(
					"Riegos listadas por la cantidad de agua del cultivo exitosamente."
				);
				return r;
			} catch (error) {
				console.error(
					"Error al buscar riegos por la cantidad de agua del cultivo:",
					error.response.data
				);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const getRiegoActivos = async () => {
			try {
				loading.value = true;
				const r = await axios.get(`${url}/riego/activos`, {
					headers: {
						token: useAdmin.token,
					},
				});
				notifySuccessRequest("Riegos activas listadas exitosamente.");
				return r;
			} catch (error) {
				console.error(
					"Error al listar riegos activas:",
					error.response.data
				);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const getRiegoInactivos = async () => {
			try {
				loading.value = true;
				const r = await axios.get(`${url}/riego/inactivos`, {
					headers: {
						token: useAdmin.token,
					},
				});
				notifySuccessRequest("Riegos inactivas listadas exitosamente.");
				return r;
			} catch (error) {
				console.error(
					"Error al listar riegos inactivas:",
					error.response.data
				);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const postRiego = async (datos) => {
			try {
				loading.value = true;
				const r = await axios.post(`${url}/riego`, datos, {
					headers: {
						token: useAdmin.token,
					},
				});
				notifySuccessRequest("Riego agregado exitosamente.");
				return r;
			} catch (error) {
				notifyErrorRequest(error.response.data.errors[0].msg);
				console.error(
					"Error al agregar riego:",
					error.response.data.errors[0].msg
				);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const putRiego = async (id, datos) => {
			try {
				loading.value = true;
				const r = await axios.put(`${url}/riego/${id}`, datos, {
					headers: {
						token: useAdmin.token,
					},
				});
				notifySuccessRequest("Riego editada exitosamente.");
				return r;
			} catch (error) {
				notifyErrorRequest(error.response.data.errors[0].msg);
				console.error(
					"Error al editar riego:",
					error.response.data.errors[0].msg
				);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const putRiegoActivar = async (id) => {
			try {
				loading.value = true;
				const r = await axios.put(`${url}/riego/activar/${id}`, null, {
					headers: {
						token: useAdmin.token,
					},
				});
				notifySuccessRequest("Riego activado exitosamente.");
				return r;
			} catch (error) {
				notifyErrorRequest(error);
				console.error("Error al activar riego:", error);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const putRiegoInactivar = async (id) => {
			try {
				loading.value = true;
				const r = await axios.put(
					`${url}/riego/inactivar/${id}`,
					null,
					{
						headers: {
							token: useAdmin.token,
						},
					}
				);
				notifySuccessRequest("Riego inactivado exitosamente.");
				return r;
			} catch (error) {
				notifyErrorRequest(error);
				console.error("Error al inactivar riego:", error);
				return error;
			} finally {
				loading.value = false;
			}
		};

		return {
			getRiego,
			getRiegoID,
			getRiegoFechas,
			getRiegoEmpleadoID,
			getRiegoCultivo,
			getRiegoCantidadAguaCultivo,
			getRiegoActivos,
			getRiegoInactivos,
			postRiego,
			putRiego,
			putRiegoActivar,
			putRiegoInactivar,
		};
	},
	{
		persist: true,
	}
);
