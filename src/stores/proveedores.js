import { defineStore } from "pinia";
import { ref } from "vue";
import { useStoreAdmins } from "./admin.js";
import axios from "axios";
import { notifyErrorRequest } from "../routes/routes.js";

export const useStoreProveedores = defineStore(
	"Proveedores",
	() => {
		const url = "http://localhost:3000";
		// const url = "https://b-proyectoadso-production.up.railway.app";
		let loading = ref(false);
		const useAdmin = useStoreAdmins();

		const getFincas = async () => {
			try {
				const r = await axios.get(`${url}/fincas`, {
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

		const getProveedores = async () => {
			try {
				loading.value = true;
				const r = await axios.get(`${url}/proveedores`, {
					headers: {
						token: useAdmin.token,
					},
				});
				return r;
			} catch (error) {
				console.error("Error al listar proveedores:", error.response.data);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const getProveedoresActivos = async () => {
			try {
				loading.value = true;
				const r = await axios.get(`${url}/proveedores/activos`, {
					headers: {
						token: useAdmin.token,
					},
				});
				return r;
			} catch (error) {
				console.error("Error al listar proveedores activas:", error.response.data);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const getProveedoresInactivos = async () => {
			try {
				loading.value = true;
				const r = await axios.get(`${url}/proveedores/inactivos`, {
					headers: {
						token: useAdmin.token,
					},
				});
				return r;
			} catch (error) {
				console.error("Error al listar proveedores inactivos:", error.response.data);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const getProveedoresID = async (id) => {
			try {
				loading.value = true;
				const r = await axios.get(`${url}/proveedores/id/${id}`, {
					headers: {
						token: useAdmin.token,
					},
				});
				return r;
			} catch (error) {
				console.error("Error al buscar proveedor:", error.response.data);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const postProveedores = async (datos) => {
			try {
				loading.value = true;
				const r = await axios.post(`${url}/proveedores`, datos, {
					headers: {
						token: useAdmin.token,
					},
				});
				return r;
			} catch (error) {
				notifyErrorRequest(error.response.data.errors[0].msg);
				console.error("Error al agregar proveedor:", error.response.data.errors[0].msg);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const putProveedores = async (id, datos) => {
			try {
				loading.value = true;
				const r = await axios.put(`${url}/proveedores/${id}`, datos, {
					headers: {
						token: useAdmin.token,
					},
				});
				return r;
			} catch (error) {
				notifyErrorRequest(error.response.data.errors[0].msg);
				console.error("Error al editar proveedor:", error.response.data.errors[0].msg);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const putProveedoresActivar = async (id) => {
			try {
				loading.value = true;
				const r = await axios.put(`${url}/proveedores/activar/${id}`, null, {
					headers: {
						token: useAdmin.token,
					},
				});
				return r;
			} catch (error) {
				notifyErrorRequest(error);
				console.error("Error al activar proveedor:", error);
				return error;
			} finally {
				loading.value = false;
			}
		};

		const putProveedoresInactivar = async (id) => {
			try {
				loading.value = true;
				const r = await axios.put(`${url}/proveedores/inactivar/${id}`, null, {
					headers: {
						token: useAdmin.token,
					},
				});
				return r;
			} catch (error) {
				notifyErrorRequest(error);
				console.error("Error al inactivar proveedor:", error);
				return error;
			} finally {
				loading.value = false;
			}
		};

		return {
			getProveedores,
			getProveedoresActivos,
			getProveedoresInactivos,
			getProveedoresID,
			postProveedores,
			putProveedores,
			putProveedoresActivar,
			putProveedoresInactivar,
			getFincas
		};
	}
);
