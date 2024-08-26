import { defineStore } from "pinia";
import axios from "axios";
import { useStoreAdmins } from "./admin.js";

export const useStoreControl_plagas = defineStore(
	"Control_plagas",
	() => {
		// const url = "http://localhost:3000";
		const url = "https://b-proyectoadso-production.up.railway.app";
		const useUsuario = useStoreAdmins();

		const getControl_plagas = async () => {
			try {
				const r = await axios.get(`${url}/Control_plagas`, {
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

		const getControl_plagasID = async (id) => {
			try {
				const r = await axios.get(`${url}/Control_plagas/${id}`, {
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

		const postControl_plagas = async (datos) => {
			try {
				const r = await axios.post(`${url}/Control_plagas/`, datos, {
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

		const putControl_plagas = async (id, datos) => {
			try {
				const r = await axios.put(
					`${url}/Control_plagas/${id}`,
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
			getControl_plagas,
			getControl_plagasID,
			postControl_plagas,
			putControl_plagas,
		};
	},
	{
		persist: true,
	}
);
