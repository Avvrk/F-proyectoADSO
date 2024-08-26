import { defineStore } from "pinia";
import axios from "axios";
import { useStoreAdmins } from "./admin.js";

export const useStoreMaquinaria = defineStore("Maquinaria", () => {
	// const url = "http://localhost:3000";
	const url = "https://b-proyectoadso-production.up.railway.app";
	const useAdmin = useStoreAdmins();

	const getProveedores = async () => {
		try {
			const r = await axios.get(`${url}/proveedores`, {
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

	const getMaquinaria = async () => {
		try {
			const r = await axios.get(`${url}/maquinariaHerramienta`, {
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

	const getMaquinariaId = async (id) => {
		try {
			const r = await axios.get(`${url}/maquinariaHerramienta/${id}`, {
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

	const getMaquinariaActivos = async () => {
		try {
			const r = await axios.get(`${url}/maquinariaHerramienta/activos`, {
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

	const getMaquinariaInactivos = async () => {
		try {
			const r = await axios.get(
				`${url}/maquinariaHerramienta/inactivos`,
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

	const getMaquinariaFechas = async (fechaInicio, fechaFin) => {
		try {
			const r = await axios.get(
				`${url}/maquinariaHerramienta/fechas/${fechaInicio}/${fechaFin}`,
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

	const getMaquinariaTipo = async (tipo) => {
		try {
			const r = await axios.get(
				`${url}/maquinariaHerramienta/cantidad/${tipo}`,
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

	const postMaquinaria = async (datos) => {
		try {
			const r = await axios.post(`${url}/maquinariaHerramienta`, datos, {
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

	const putMaquinaria = async (id, datos) => {
		try {
			const r = await axios.put(
				`${url}/maquinariaHerramienta/${id}`,
				datos,
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

	const putMaquinariaActivar = async (id) => {
		try {
			const r = await axios.put(
				`${url}/maquinariaHerramienta/activar/${id}`,
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

	const putMaquinariaInactivar = async (id) => {
		try {
			const r = await axios.put(
				`${url}/maquinariaHerramienta/inactivar/${id}`,
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
		getProveedores,
		getMaquinaria,
		getMaquinariaId,
		getMaquinariaActivos,
		getMaquinariaInactivos,
		getMaquinariaFechas,
		getMaquinariaTipo,
		postMaquinaria,
		putMaquinaria,
		putMaquinariaActivar,
		putMaquinariaInactivar,
	};
});
