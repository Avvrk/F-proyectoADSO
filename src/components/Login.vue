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
				<img
					loading="lazy"
					src="../img/jpeg-optimizer_annie-spratt-eNR3y34XUbo-unsplash.jpg"
					alt=""
					srcset="" />
				<p>Cosecha tus sueños.</p>
			</section>
			<section id="formSeccion">
				<form>
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
				</form>
			</section>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
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
	if (validarDatos()) {
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
					position: "bottom-right",
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
				router.push("/mio/Admin");
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
</script>

<style scoped>
#contenedor {
	background: linear-gradient(210deg, #acec8b, #004d00);
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
}

#subContenedor {
	display: flex;
	flex-direction: row-reverse;
	background-color: #262626;
	width: 85%;
	height: 80%;
	border-radius: 10px;
}

#imgSeccion {
	flex: 0 0 60%;
	padding: 0;
	margin: 0;
	overflow: hidden;
	border-radius: 0 10px 10px 0;
	position: relative;
}

#imgSeccion img {
	height: 51rem;
	object-fit: cover;
	filter: blur(1.5px);
}

#imgSeccion p {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	font-family: "Crimson Text", serif;
	font-weight: 700;
	font-style: italic;
	font-size: 60px;
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

form {
	background-color: white;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 70%;
	height: 80%;
	border-radius: 10px;
	gap: 10px;
}

form h2,
form h3 {
	font-size: 27px;
	font-family: "Jockey One", sans-serif;
	padding: 0;
	margin: 0;
}

form h2 {
	margin-top: -18px;
	margin-bottom: -30px;
}

form h3 {
	margin-bottom: 20px;
}

input {
	border: 0;
	border-radius: 5px;
	background-color: #e8e8e8;
	width: 230px;
	height: 45px;
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
	background: linear-gradient(30deg, #92f85f, #004d00);
	width: 230px;
	height: 45px;
	padding: 10px 20px 10px 20px;
	margin-top: 10px;
	margin-bottom: 10px;
	cursor: pointer;
	transition: 0.1s;
	font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	font-size: 17px;
	font-weight: 600;
}

button:active {
	transform: scale(0.96);
}

a {
	font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	font-size: 14.3px;
	font-weight: 600;
	color: rgb(70, 70, 255);
}

.input-field {
	margin-top: -8px;
	display: flex;
	align-items: center;
	width: 230px;
}

.input-field input {
	border: 0;
	border-radius: 5px;
	background-color: #e8e8e8;
	width: 100%;
	height: 45px;
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
}

.input-field button:active {
	transform: none;
}
</style>
