import { defineStore } from "pinia";
import axios from "axios";
import { useStoreAdmins } from "./admin.js";

export const useStoreClimas = defineStore("climas", () => {
	const url = "http://localhost:3000";
	// const url = "https://b-proyectoadso-production.up.railway.app";
	const useAdmin = useStoreAdmins();

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

	const getEmpleados = async () => {
		try {
			const r = await axios.get(`${url}/empleados`, {
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

	const getClimas = async () => {
		try {
			const r = await axios.get(`${url}/climas`, {
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

	const getClimasID = async (id) => {
		try {
			const r = await axios.get(`${url}/climas/${id}`, {
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

	const getClimasPorClimas = async (clima) => {
		try {
			const r = await axios.get(`${url}/climas/tipoclima/${clima}`, {
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

	const getClimasFechas = async (fecha) => {
		try {
			const r = await axios.get(`${url}/climas/fechas/${fecha}`, {
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

	const getClimasTemperatura = async () => {
		try {
			const r = await axios.get(`${url}/climas/temperatura`, {
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

	const getClimasDuracion = async (id) => {
		try {
			const r = await axios.get(`${url}/climas/duracion/${id}`, {
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

	const postClimas = async (datos) => {
		try {
			const r = await axios.post(`${url}/climas`, datos, {
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

	const putClimas = async (id, datos) => {
		try {
			const r = await axios.put(`${url}/climas/${id}`, datos, {
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

	return {
		getFincas,
		getEmpleados,
		getClimas,
		getClimasID,
		getClimasDuracion,
		getClimasFechas,
		getClimasPorClimas,
		getClimasTemperatura,
		postClimas,
		putClimas,
	};
});
