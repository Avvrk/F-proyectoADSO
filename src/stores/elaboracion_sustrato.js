import { defineStore } from "pinia";
import axios from "axios";
import { useStoreAdmins } from "./admin.js";

export const useStoreElaboracion_sustrato = defineStore(
	"Elaboracion_sustrato",
	() => {
		const url = "http://localhost:3000";
		// const url = "https://b-proyectoadso-production.up.railway.app";
		const useUsuario = useStoreAdmins();

		const getElaboracion_sustrato = async () => {
			try {
				const r = await axios.get(`${url}/Elaboracion_sustrato`, {
					headers: {
						token: useUsuario.token,
					},
				});
				return r;
			} catch (error) {
				console.log(error);
				return error;
			}
		};

		const getElaboracion_sustratoID = async (id) => {
			try {
				const r = await axios.get(`${url}/Elaboracion_sustrato/${id}`, {
					headers: {
						token: useUsuario.token,
					},
				});
				return r;
			} catch (error) {
				console.log(error);
				return error;
			}
		};

		const postElaboracion_sustrato = async (datos) => {
			try {
				const r = await axios.post(
					`${url}/Elaboracion_sustrato/`,
					datos,
					{
						headers: {
							token: useUsuario.token,
						},
					}
				);
				return r;
			} catch (error) {
				console.log(error);
				return error;
			}
		};

		const putElaboracion_sustrato = async (id, datos) => {
			try {
				const r = await axios.put(
					`${url}/Elaboracion_sustrato/${id}`,
					datos,
					{
						headers: {
							token: useUsuario.token,
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
			getElaboracion_sustrato,
			getElaboracion_sustratoID,
			postElaboracion_sustrato,
			putElaboracion_sustrato,
		};
	},
	{
		persist: true,
	}
);
