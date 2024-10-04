import { defineStore } from "pinia";
import axios from "axios";
import { useStoreAdmins } from "./admin.js";
import { useQuasar } from "quasar";

export const useStoreElaboracion_sustrato = defineStore(
	"Elaboracion_sustrato",
	() => {
		// const url = "http://localhost:3000";
		const url = "https://b-proyectoadso-production.up.railway.app";
		const useAdmin = useStoreAdmins();
		const $q = useQuasar();

		const getProcesos = async () => {
			try {
				const r = await axios.get(`${url}/procesos`, {
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
			console.log(useAdmin.token);
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

		const getSustrato = async () => {
			try {
				const r = await axios.get(`${url}/elaboracionSustratos`, {
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

		const getSustratoID = async (id) => {
			try {
				const r = await axios.get(`${url}/elaboracionSustratos/${id}`, {
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

		const getSustratoFechas = async (fechaInicio, fechaFin) => {
			try {
				const r = await axios.get(`${url}/elaboracionSustratos/fecha/${fechaInicio}/${fechaFin}`, {
					headers: {
						token: useAdmin.token,
					}
				})
				console.log(r.data);
				return r
			} catch (error) {
				console.log(error);
				return error;
			}
		}

		const getSustratoOperario = async (id) => {
			try {
				const r = await axios.get(`${url}/elaboracionSustratos/operario/${id}`, {
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

		const getSustratoResponsable = async (id) => {
			try {
				const r = await axios.get(`${url}/elaboracionSustratos/responsable/${id}`, {
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

		const postSustrato = async (datos) => {
			try {
				const r = await axios.post(
					`${url}/elaboracionSustratos`,
					datos,
					{
						headers: {
							token: useAdmin.token,
						},
					}
				);
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

		const putSustrato = async (id, datos) => {
			try {
				const r = await axios.put(
					`${url}/elaboracionSustratos/${id}`,
					datos,
					{
						headers: {
							token: useAdmin.token,
						},
					}
				);
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

		return {
			getProcesos,
			getEmpleados,
			getSustrato,
			getSustratoID,
			getSustratoFechas,
			getSustratoOperario,
			getSustratoResponsable,
			postSustrato,
			putSustrato,
		};
	}
);
