import { defineStore } from "pinia";
import axios from "axios";
import { useStoreAdmins } from "./admin.js";

export const useStoreFincas = defineStore(
	"Fincas",
	() => {
		const url = "http://localhost:4000";
		// const url = "https://b-proyectoadso-production.up.railway.app";
		const useAdmin = useStoreAdmins();

		const getMunicipios = async () => {
			try {
				const r = await axios.get(
					`https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.min.json`
				);
				console.log(r.data);
				return r;
			} catch (error) {
				console.log(error);
				return error;
			}
		};

		const getAdmin = async () => {
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

		const getFincas = async () => {
			try {
				const r = await axios.get(`${url}/fincas`, {
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

		const getFincasID = async (id) => {
			try {
				const r = await axios.get(`${url}/fincas/${id}`, {
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

		const getFincasActivos = async () => {
			try {
				const r = await axios.get(`${url}/fincas/activos`, {
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

		const getFincasInactivos = async () => {
			try {
				const r = await axios.get(`${url}/fincas/inactivos`, {
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

		const postFincas = async (datos) => {
			try {
				const r = await axios.post(`${url}/fincas`, datos, {
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

		const putFincas = async (id, datos) => {
			try {
				const r = await axios.put(`${url}/fincas/${id}`, datos, {
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

		const putFincaActivar = async (id) => {
			try {
				const r = await axios.put(
					`${url}/fincas/activar/${id}`,
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
		const putFincaInactivar = async (id) => {
			try {
				const r = await axios.put(
					`${url}/fincas/inactivar/${id}`,
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
			getMunicipios,
			getAdmin,
			getFincas,
			getFincasID,
			getFincasActivos,
			getFincasInactivos,
			postFincas,
			putFincas,
			putFincaActivar,
			putFincaInactivar,
		};
	},
	{
		persist: true,
	}
);
