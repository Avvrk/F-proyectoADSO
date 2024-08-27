import { defineStore } from "pinia";
import axios from "axios";
import { useStoreAdmins } from "./admin.js";

export const useStoreControl_plagas = defineStore(
	"Control_plagas",
	() => {
		const url = "http://localhost:3000";
		// const url = "https://b-proyectoadso-production.up.railway.app";
		const useAdmin = useStoreAdmins();

		const getControlPlagas = async () => {
			try {
				const r = await axios.get(`${url}/controlPlagas`, {
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

		const getControlPlagasID = async (id) => {
			try {
				const r = await axios.get(`${url}/controlPlagas/${id}`, {
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

		const getControlPlagasFechas = async (fechaInicio, fechaFin) => {
			try {
				const r = await axios.get(`${url}/controlPlagas/fechas/${fechaInicio}/${fechaFin}`, {
					headers: {
						token: useAdmin.token,
					}
				})
				return r;
			} catch (error) {
				console.log(error);
				return error
			}
		}

		const getControlPlagasOperario = async (operario) => {
			try {
				const r = await axios.get(`${url}/controlPlagas/operario/${operario}`, {
					headers: {
						token: useAdmin.token,
					}
				})
				return r;
			} catch (error) {
				console.log(error);
				return error
			}
		}

		const getControlPlagasTipo = async (tipo) => {
			try {
				const r = await axios.get(`${url}/controlPlagas/tipo/${tipo}`, {
					headers: {
						token: useAdmin.token,
					}
				})
				return r;
			} catch (error) {
				console.log(error);
				return error
			}
		}

		const postControlPlagas = async (datos) => {
			try {
				const r = await axios.post(`${url}/controlPlagas/`, datos, {
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

		const putControlPlagas = async (id, datos) => {
			try {
				const r = await axios.put(
					`${url}/controlPlagas/${id}`,
					datos,
					{
						headers: {
							token: useAdmin.token,
						},
					}
				);
				return r;
			} catch (error) {
				console.log(error);
				return error;
			}
		};

		return {
			getControlPlagas,
			getControlPlagasID,
			getControlPlagasFechas,
			getControlPlagasOperario,
			getControlPlagasTipo,
			postControlPlagas,
			putControlPlagas,
		};
	}
);
