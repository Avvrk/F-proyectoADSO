import { defineStore } from "pinia";
import { ref } from "vue";
import { useStoreAdmins } from "./admin";
import axios from "axios";

export const useStoreEmpleados = defineStore(
	"Empleados",
	() => {
		// const url = "http://localhost:3000";
		const url = "https://b-proyectoadso-production.up.railway.app";
		const useAdmin = useStoreAdmins();

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

		const getEmpleadosID = async (id) => {
			try {
				const r = await axios.get(`${url}/empleados/id/${id}`, {
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

		const getEmpleadosDescripcion = async () => {
			try {
				const r = await axios.get(
					`${url}/empleados/descripcion/${id}`,
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

		const getEmpleadosActivos = async () => {
			try {
				const r = await axios.get(`${url}/empleados/activos`, {
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

		const getEmpleadosInactivos = async () => {
			try {
				const r = await axios.get(`${url}/empleados/inactivos`, {
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

		const postEmpleados = async (datos) => {
			try {
				const r = await axios.post(`${url}/empleados/`, datos, {
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

		const putEmpleados = async (id, datos) => {
			try {
				const r = await axios.put(`${url}/empleados/${id}`, datos, {
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

		const putEmpleadosActivar = async (id) => {
			try {
				const r = await axios.put(
					`${url}/empleados/activar/${id}`,
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
		const putEmpleadosInactivar = async (id) => {
			try {
				const r = await axios.put(
					`${url}/empleados/inactivar/${id}`,
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
			getEmpleados,
			getEmpleadosID,
			getEmpleadosDescripcion,
			getEmpleadosActivos,
			getEmpleadosInactivos,
			postEmpleados,
			putEmpleados,
			putEmpleadosActivar,
			putEmpleadosInactivar,
		};
	},
	{
		persist: {
			paths: ["token"],
		},
	}
);
