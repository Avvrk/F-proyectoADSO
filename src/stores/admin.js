import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

// "https://backendgimnasio-ip8j.onrender.com"

export const useStoreAdmins = defineStore("Admin", () => {
	const url = "http://localhost:3000";
	const token = ref("");
	const user = ref("");

	const getAdmin = async () => {
		try {
			const r = await axios.get(`${url}/admin`, {
				headers: {
					token
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
					token
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
            const r = await axios.post(`${url}/admin/ingresar`, {correo, password})
            console.log(r.data);
            token.value = r.data.token;
            user.value= r.data.admin;
            return r
        } catch (error) {
            console.log(error);
            return error;
        }
    };

	const postAdmin = async (datos) => {
		try {
			const r = await axios.post(`${url}/admin/`, datos);
            console.log(r.data);
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
					token: token,
				},
			});
            console.log(r.data);
			return r;
		} catch (error) {
			console.log(error);
			return error;
		}
	};

	return {
		getAdmin,
		getAdminID,
		postLogin,
		postAdmin,
		putAdmin,
	};
});
