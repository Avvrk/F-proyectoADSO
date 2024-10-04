<template>
	<div id="contenedor">
		<div id="subContenedor">
			<section id="imgSeccion">
				<!-- 				Foto de
				<a
					style="width: 300px; height: 300px"
					href="https://unsplash.com/es/@anniespratt?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
					>Annie Spratt</a
				>
				en
				<a
                style="width: 300px; height: 300px"
					href="https://unsplash.com/es/fotos/flor-de-petalos-purpuras-eNR3y34XUbo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
					>Unsplash</a
				> -->
				<img src="../img/loginIMG.jpg" alt="" srcset="" />
				<p>Cosecha tus sueños.</p>
			</section>
			<section id="formSeccion">
				<div id="form">
					<h2>¡Bienvenido!</h2>
					<h3>Accede a tu cuenta</h3>
					<input
						class="input"
						type="email"
						placeholder="Correo"
						v-model="email"
						autocomplete="username" />
					<div class="input-field">
						<input
							:type="passwordFieldType"
							class="input"
							placeholder="Contraseña"
							v-model="contrasenia" />
						<button type="button" @click="togglePasswordVisibility">
							<q-icon
								:name="
									passwordFieldType === 'password'
										? 'visibility_off'
										: 'visibility'
								" />
						</button>
					</div>
					<button type="submit" @click="login">Iniciar sesión</button>
					<a>¿Olvidaste tu contraseña?</a>
				</div>
			</section>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStoreAdmins } from "../stores/admin.js";
import { useQuasar } from "quasar";

const $q = useQuasar();

const useAdmin = useStoreAdmins();
const router = useRouter();
const loading = ref(false);
const email = ref("");
const contrasenia = ref("");

const passwordFieldType = ref("password");

function togglePasswordVisibility() {
	passwordFieldType.value =
		passwordFieldType.value === "password" ? "text" : "password";
}

async function login() {
	/* router.push("/mio/Admin"); */
	if (await validarDatos()) {
		loading.value = true;
		const r = await useAdmin.postLogin(email.value, contrasenia.value);
		if (r.code === "ERR_BAD_REQUEST") {
			if (
				r.response.data.msg === "Usuario / Password no son correctos."
			) {
				$q.notify({
					type: "negative",
					message: "El usuario no existe",
					position: "bottom-right",
				});
			} else if (
				r.response.data.msg === "Usuario / Password no son correctos"
			) {
				$q.notify({
					type: "negative",
					message: "Correo o contraseña no son correctos",
					position: "bottom-right",sadasdassssss
				});
			} else {
				$q.notify({
					type: "negative",
					message: "Error inesperado",
					position: "bottom-right",
				});
			}
		} else {
			if (r.data.status != 200) {
				router.push("/Admin");
			}
		}
	}
}

async function validarDatos() {
	let validacion = true;
	if (!email.value.trim() && !contrasenia.value.trim()) {
		$q.notify({
			type: "negative",
			message: "Llena todos los campos",
			position: "bottom",
		});
		validacion = false;
	} else {
		if (!email.value.trim()) {
			$q.notify({
				type: "negative",
				message: "El correo esta vacio",
				position: "bottom",
			});
			validacion = false;
		}
		if (!contrasenia.value.trim()) {
			$q.notify({
				type: "negative",
				message: "La contraseña esta vacia",
				position: "bottom",
			});
			validacion = false;
		}
	}
	return validacion;
}

onMounted(() => {
	const token = localStorage.getItem('Admin');

	if(token) {
		const newT = JSON.parse(token);
		
		if (newT.token != "") {
			router.push("/Admin")
		}
	}

})
</script>
<!-- background: linear-gradient(210deg, #abec8b, #004d00); -->
<style scoped>
#contenedor {
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
}

#subContenedor {
	display: flex;
	flex-direction: row-reverse;
	background-color: #292929;
	width: 100%;
	height: 100%;
}

#imgSeccion {
	flex: 0 0 60%;
	padding: 0;
	margin: 0;
	overflow: hidden;
	position: relative;
}

#imgSeccion img {
	width: 63rem;
	position: relative;
	left: -60px;
	object-fit: contain;
}

#imgSeccion p {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	font-family: "Crimson Text", serif;
	font-weight: 700;
	font-style: italic;
	font-size: 70px;
	color: white;
	text-align: center;
	text-shadow: -1px -1px 1px #aaa, 0px 4px 1px rgba(0, 0, 0, 0.5);
}

#formSeccion {
	flex: 0 0 40%;
	display: flex;
	justify-content: center;
	align-items: center;
}

#form {
	background-color: #fff;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 70%;
	height: 80%;
	border-radius: 10px;
	gap: 10px;
}

#form h2,
#form h3 {
	font-size: 27px;
	font-family: "Jockey One", sans-serif;
	padding: 0;
	margin: 0;
}

#form h2 {
	margin-top: -18px;
	margin-bottom: -30px;
}

#form h3 {
	margin-bottom: 20px;
}

input {
	border: 0;
	border-radius: 5px;
	background-color: #e8e8e8;
	width: 65%;
	height: 8%;
	min-height: 40px;
	padding: 10px 20px 10px 20px;
	font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	font-size: 15px;
}

input:focus {
	background-color: #f5f5f5;
	outline: 1px auto #aaaaaa;
}

button {
	border: 0;
	border-radius: 5px;
	background: linear-gradient(30deg, #92f85f, #004d00ab);
	width: 65%;
	height: 8%;
	min-height: 40px;
	padding: 10px 20px 10px 20px;
	margin-top: 10px;
	margin-bottom: 10px;
	cursor: pointer;
	transition: 0.1s;
	font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	font-size: 17px;
	font-weight: 600;
}

@media (min-width: 1440px) {
	#imgSeccion img {
		width: 99rem;
		left: -130px;
	}

	#form h2,
	#form h3 {
		font-size: 44px;
	}

	#form h3 {
		margin-top: 20px;
		margin-bottom: 50px;
	}

	button {
		margin-top: 30px;
		margin-bottom: 30px;
	}

	.input-field {
		margin-bottom: 30px;
	}
}

button:active {
	transform: scale(0.96);
}

a {
	font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	font-size: 14.3px;
	font-weight: 600;
	color: rgb(3, 177, 69);
}

.input-field {
	background-color: #e8e8e8;
	border-radius: 5px;
	display: flex;
	align-items: center;
	width: 65%;
	height: 8%;
	min-height: 40px;
}

.input-field input {
	border: 0;
	border-radius: 5px;
	background-color: #e8e8e8;
	width: 100%;
	height: 100%;
	padding: 10px 20px 10px 20px;
	font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	font-size: 15px;
}

.input-field input:focus {
	background-color: #f5f5f5;
	outline: 1px auto #aaaaaa;
}

.input-field button {
	width: auto;
	background: none;
	border: none;
	color: #666;
	cursor: pointer;
	height: 100%;
}

.input-field button:active {
	transform: none;
}
</style>
