import { defineStore } from "pinia";
import axios from "axios";
import { useStoreAdmins } from "./admin.js";
import { useQuasar } from "quasar";

export const useStoreAnalisisSuelos = defineStore("AnalisisSuelo", () => {
	// const url = "http://localhost:3000";
	const url = "https://b-proyectoadso-production.up.railway.app";
	const useAdmin = useStoreAdmins();
	const $q = useQuasar();

	const getParcela = async () => {
		try {
			const r = await axios.get(`${url}/parcelas`, {
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

	const getEmpleado = async () => {
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

	const getAnalisisSuelo = async () => {
		try {
			const r = await axios.get(`${url}/analisis`, {
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

	const getAnalisisSueloID = async (id) => {
		try {
			const r = await axios.get(`${url}/analisis/${id}`, {
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

	const getAnalisisSueloActivos = async () => {
		try {
			const r = await axios.get(`${url}/analisis/activos`, {
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

	const getAnalisisSueloInactivos = async () => {
		try {
			const r = await axios.get(`${url}/analisis/desactivados`, {
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

	const getAnalisisSueloFechas = async (fechaInicio, fechaFin) => {
		try {
			const r = await axios.get(
				`${url}/analisis/fecha/${fechaInicio}/${fechaFin}`,
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

	const getAnalisisSueloResponsable = async (empleado_id) => {
		try {
			const r = await axios.get(
				`${url}/analisis/responsable/${empleado_id}`,
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

	const postAnalisisSuelo = async (datos) => {
		try {
			const r = await axios.post(`${url}/analisis/`, datos, {
				headers: {
					token: useAdmin.token,
				},
			});
			console.log(r.data);
			if (r.status !== 200) {
				$q.notify({
					type: "negative",
					message: "Parece que hubo un error en el registro",
					position: "bottom-right",
				});
			} else {
				$q.notify({
					type: "positive",
					message: "El registro se ha realizado correctamente",
					position: "bottom-right",
				});
			}
			return r;
		} catch (error) {
			console.log(error);
			return error;
		}
	};

	const putAnalisisSuelo = async (id, datos) => {
		try {
			const r = await axios.put(`${url}/analisis/${id}`, datos, {
				headers: {
					token: useAdmin.token,
				},
			});
			console.log(r.data);
			if (r.status !== 200) {
				$q.notify({
					type: "negative",
					message: "Parece que hubo un error al editar",
					position: "bottom-right",
				});
			} else {
				$q.notify({
					type: "positive",
					message: "El editar se ha realizado correctamente",
					position: "bottom-right",
				});
			}
			return r;
		} catch (error) {
			console.log(error);
			return error;
		}
	};

	const putAnalisisSueloActivar = async (id) => {
		try {
			const r = await axios.put(
				`${url}/analisis/activar/${id}`,
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

	const putAnalisisSueloInactivar = async (id) => {
		try {
			const r = await axios.put(
				`${url}/analisis/desactivar/${id}`,
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
		getParcela,
		getEmpleado,
		getAnalisisSuelo,
		getAnalisisSueloID,
		getAnalisisSueloActivos,
		getAnalisisSueloInactivos,
		getAnalisisSueloFechas,
		getAnalisisSueloResponsable,
		postAnalisisSuelo,
		putAnalisisSuelo,
		putAnalisisSueloActivar,
		putAnalisisSueloInactivar,
	};
});
