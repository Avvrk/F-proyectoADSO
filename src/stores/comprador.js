import { defineStore } from "pinia";
import axios from "axios";
import { useStoreAdmins } from "./admin.js";
import { useQuasar } from "quasar";

export const useStoreComprador = defineStore("Comprador", () => {
	// const url = "http://localhost:3000";
	const url = "https://b-proyectoadso-production.up.railway.app";
	const useAdmin = useStoreAdmins();
	const $q = useQuasar();

	const getProduccion = async () => {
		try {
			const r = await axios.get(`${url}/produccion`, {
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
	const getComprador = async () => {
		try {
			const r = await axios.get(`${url}/comprador`, {
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

	const getCompradorID = async (id) => {
		try {
			const r = await axios.get(`${url}/comprador/${id}`, {
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

	const getCompradorActivos = async () => {
		try {
			const r = await axios.get(`${url}/comprador/activos`, {
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

	const getCompradorInactivos = async () => {
		try {
			const r = await axios.get(`${url}/comprador/inactivos`, {
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

	const getCompradorFechas = async (fechaInicio, fechaFin) => {
		try {
			const r = await axios.get(
				`${url}/comprador/fecha/${fechaInicio}/${fechaFin}`,
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

	const getCompradorDocumento = async (documento) => {
		try {
			const r = await axios.get(`${url}/comprador/compras/${documento}`, {
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

	const postComprador = async (datos) => {
		try {
			const r = await axios.post(`${url}/comprador/`, datos, {
				headers: {
					token: useAdmin.token,
				},
			});
			if (r.status !== 200) {
				notify("Parece que hubo un error en el registro")
			} else {
				notify("El registro se ha realizado correctamente", "positive")
			}
			console.log(r.data);
			return r;
		} catch (error) {
			console.log(error);
			return error;
		}
	};

	const putComprador = async (id, datos) => {
		try {
			const r = await axios.put(`${url}/comprador/${id}`, datos, {
				headers: {
					token: useAdmin.token,
				},
			});
			console.log(r.data);
			if (r.status !== 200) {
				notify("Parece que hubo un error al editar")
			} else {
				notify("El editar se ha realizado correctamente", "positive")
			}
			return r;
		} catch (error) {
			console.log(error);
			return error;
		}
	};

	const putCompradorActivar = async (id) => {
		try {
			const r = await axios.put(
				`${url}/comprador/activar/${id}`,
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

	const putCompradorInactivar = async (id) => {
		try {
			const r = await axios.put(
				`${url}/comprador/desactivar/${id}`,
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
		getProduccion,
		getComprador,
		getCompradorID,
		getCompradorActivos,
		getCompradorInactivos,
		getCompradorFechas,
		getCompradorDocumento,
		postComprador,
		putComprador,
		putCompradorActivar,
		putCompradorInactivar,
	};
});
