import { defineStore } from "pinia";
import axios from "axios";
import { useStoreAdmins } from "./admin.js";

export const useStoreParcelas = defineStore(
    "Parcelas",
    () => {
        const url = "http://localhost:4000";
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

        const getParcelas = async () => {
            try {
                const r = await axios.get(`${url}/Parcelas`, {
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

        const getParcelaId = async (id) => {
            try {
                const r = await axios.get(`${url}/Parcelas/${id}`, {
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

		const getParcelasActivos = async () => {
			try {
				const r = await axios.get(`${url}/Parcelas/activos`, {
					headers: {
						token: useAdmin.token,
					}
				})
				console.log(r.data);
				return r
			} catch (error) {
				console.log(error);
				return error
			}
		}

		const getParcelasInactivos = async () => {
			try {
				const r = await axios.get(`${url}/Parcelas/inactivos`, {
					headers: {
						token: useAdmin.token,
					}
				})
				console.log(r.data);
				return r
			} catch (error) {
				console.log(error);
				return error
			}
		}

        const postParcela = async (datos) => {
            try {
                const r = await axios.post(`${url}/Parcelas`, datos, {
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

        const putParcela = async (id, datos) => {
            try {
                const r = await axios.put(`${url}/Parcelas/${id}`, datos, {
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

		const putParcelaEstado = async (id, estado) => {
			try {
				const r = await axios.put(`${url}/Parcelas/${estado == 0 ? 'activar' : 'inactivar'}/${id}`, {}, {
					headers: {
						token: useAdmin.token
					}
				})
				console.log(r.data);
				return r
			} catch (error) {
				console.log(error);
                return error;
			}
		}

        return {
			getFincas,
            getParcelas,
            getParcelaId,
			getParcelasActivos,
			getParcelasInactivos,
            postParcela,
            putParcela,
			putParcelaEstado
        };
    }
);