import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { useQuasar } from "quasar";

export const useStoreAdmins = defineStore(
	"Admin",
	() => {
		// const url = "http://localhost:3000";
		const url = "https://b-proyectoadso-production.up.railway.app";
		const token = ref("");
		const $q = useQuasar();

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
						token: token.value,
					},
				});
				console.log(r.data);
				return r;
			} catch (error) {
				console.log(error);
				return error;
			}
		};

		const getAdminID = async (id) => {
			try {
				const r = await axios.get(`${url}/admin/id/${id}`, {
					headers: {
						token: token.value,
					},
				});
				console.log(r.data);
				return r;
			} catch (error) {
				console.log(error);
				return error;
			}
		};

		const getAdminActivos = async () => {
			try {
				const r = await axios.get(`${url}/admin/activos`, {
					headers: {
						token: token.value,
					},
				});
				console.log(r.data);
				return r;
			} catch (error) {
				console.log(error);
				return error;
			}
		};

		const getAdminInactivos = async () => {
			try {
				const r = await axios.get(`${url}/admin/desactivados`, {
					headers: {
						token: token.value,
					},
				});
				console.log(r.data);
				return r;
			} catch (error) {
				console.log(error);
				return error;
			}
		};

		const postLogin = async (correo, password) => {
			try {
				const r = await axios.post(`${url}/admin/ingresar`, {
					correo,
					password,
				});

				token.value = r.data.token;
				console.log(r.data.token);
				return r;
			} catch (error) {
				console.log(error);
				return error;
			}
		};

		const postAdmin = async (datos) => {
			try {
				const r = await axios.post(`${url}/admin/`, datos, {
					headers: {
						token: token.value,
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

		const putAdmin = async (id, datos) => {
			try {
				const r = await axios.put(`${url}/admin/${id}`, datos, {
					headers: {
						token: token.value,
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

		const putAdminActivar = async (id) => {
			try {
				const r = await axios.put(
					`${url}/admin/activar/${id}`,
					{},
					{
						headers: {
							token: token.value,
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

		const putAdminInactivar = async (id) => {
			try {
				const r = await axios.put(
					`${url}/admin/desactivar/${id}`,
					{},
					{
						headers: {
							token: token.value,
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

		const cerrarSecion = () => {
			token.value = "";
		}

		return {
			getMunicipios,
			getAdmin,
			getAdminID,
			getAdminActivos,
			getAdminInactivos,
			postLogin,
			postAdmin,
			putAdmin,
			putAdminActivar,
			putAdminInactivar,
			token,
			cerrarSecion,
		};
	},
	{
		persist: {
			paths: ["token"],
		},
	}
);
