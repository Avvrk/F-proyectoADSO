import { defineStore } from "pinia";
import { useStoreAdmins } from "./admin.js";
import axios from "axios";
import notify from "../utils/notificaciones.js"

export const useStoreControl_plagas = defineStore(
	"Control_plagas",
	() => {
		// const url = "http://localhost:3000";
		const url = "https://b-proyectoadso-production.up.railway.app";
		const useAdmin = useStoreAdmins();

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

		const getCultivos = async () => {
			try {
				const r = await axios.get(`${url}/Cultivos`, {
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

		const getControlPlagas = async () => {
			try {
				const r = await axios.get(`${url}/controlPlagas`, {
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

		const getControlPlagasID = async (id) => {
			try {
				const r = await axios.get(`${url}/controlPlagas/${id}`, {
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

		const getControlPlagasFechas = async (fechaInicio, fechaFin) => {
			try {
				const r = await axios.get(`${url}/controlPlagas/fechas/${fechaInicio}/${fechaFin}`, {
					headers: {
						token: useAdmin.token,
					}
				})
				console.log(r.data);
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
				console.log(r.data);
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
				console.log(r.data);
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
				console.log(r.data);
				if (r.status !== 200) {
					notify("Parece que hubo un error en el registro")
				} else {
					notify("El registro se ha realizado correctamente", "positive")
				}
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

		return {
			getEmpleados,
			getCultivos,
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
