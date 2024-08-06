<template>
	<q-layout view="hHh lpR fFf">
		<!-- <q-header elevated class="bg-primary text-white" height-hint="98">
			<q-toolbar>
				<q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
				<q-toolbar-title>
					<em>Gym</em>
				</q-toolbar-title>
			</q-toolbar>
		</q-header>

		<q-drawer
			:model-value="leftDrawerOpen"
			show-if-above
			side="left"
			overlay>
			<div class="drawer-links">
				<router-link lass="r" to="/Admin">Administrador</router-link>
				<router-link class="r" to="/AnalisisSuelo"
					>Analisis de suelo</router-link
				>
				<router-link class="r" to="/Climas">Climas</router-link>
				<router-link class="r" to="/Comprador">Comprador</router-link>
				<router-link class="r" to="/ControlPlagas"
					>Control de Plagas</router-link
				>
				<router-link class="r" to="/Cultivos">Cultivos</router-link>
				<router-link class="r" to="/ElaboracionSustrato"
					>Elaboracion de Sustrato</router-link
				>
				<router-link class="r" to="/Empleados">Empleados</router-link>
				<router-link class="r" to="/Factura">Factura</router-link>
				<router-link class="r" to="/Fertilizacion"
					>Fertilizacion</router-link
				>
				<router-link class="r" to="/Fincas">Fincas</router-link>
				<router-link class="r" to="/Gastos">Gastos</router-link>
				<router-link class="r" to="/Insumos">Insumos</router-link>
				<router-link class="r" to="/Inventario">Inventario</router-link>
				<router-link class="r" to="/Mantenimiento"
					>Mantenimiento</router-link
				>
				<router-link class="r" to="/MaquinariaHerramientas"
					>Maquinaria de herramientas</router-link
				>
				<router-link class="r" to="/Nomina">Nomina</router-link>
				<router-link class="r" to="/Parcelas">Parcelas</router-link>
				<router-link class="r" to="/Preparacion de suelos"
					>Preparacion de suelos</router-link
				>
				<router-link class="r" to="/Procesos">Procesos</router-link>
				<router-link class="r" to="/Produccion">Produccion</router-link>
				<router-link class="r" to="/Proveedores"
					>Proveedores</router-link
				>
				<router-link class="r" to="/Riego">Riego</router-link>
				<router-link class="r" to="/Semillas">Semillas</router-link>
				<router-link class="r" to="/Siembra">Siembra</router-link>

				<router-link v-if="hasAccess(['Administrador', 'Recepcionista', 'Instructor'])" class="r" to="/Admin">Administrador</router-link>
        <router-link v-if="hasAccess(['Administrador', 'Recepcionista'])" class="r" to="/Analisis de suelo">Analisis de suelo</router-link>
        <router-link v-if="hasAccess(['Administrador', 'Recepcionista'])" class="r" to="/Climas">Climas</router-link>
        <router-link v-if="hasAccess(['Administrador', 'Recepcionista'])" class="r" to="/Comprador">Comprador</router-link>
        <router-link v-if="hasAccess(['Administrador', 'Recepcionista'])" class="r" to="/Control de Plagas">Control de Plagas</router-link>
        <router-link v-if="hasAccess(['Administrador'])" class="r" to="/Cultivos">Cultivos</router-link>
        <router-link v-if="hasAccess(['Administrador'])" class="r" to="/Elaboracion de Sustrato">Elaboracion de Sustrato</router-link>
        <router-link v-if="hasAccess(['Administrador'])" class="r" to="/Empleados">Empleados</router-link>
        <router-link v-if="hasAccess(['Administrador', 'Recepcionista'])" class="r" to="/Factura">Factura</router-link>
        <router-link v-if="hasAccess(['Administrador', 'Recepcionista'])" class="r" to="/Fertilizacion">Fertilizacion</router-link>
        <router-link v-if="hasAccess(['Administrador', 'Recepcionista'])" class="r" to="/Fincas">Fincas</router-link>
        <router-link v-if="hasAccess(['Administrador', 'Recepcionista'])" class="r" to="/Gastos">Gastos</router-link>
        <router-link v-if="hasAccess(['Administrador', 'Recepcionista'])" class="r" to="/Insumos">Insumos</router-link>
        <router-link v-if="hasAccess(['Administrador', 'Recepcionista'])" class="r" to="/Inventario">Inventario</router-link>
        <router-link v-if="hasAccess(['Administrador', 'Recepcionista'])" class="r" to="/Mantenimiento">Mantenimiento</router-link>
        <router-link v-if="hasAccess(['Administrador', 'Recepcionista'])" class="r" to="/Maquinaria de herramientas">Maquinaria de herramientas</router-link>
        <router-link v-if="hasAccess(['Administrador', 'Recepcionista'])" class="r" to="/Nomina">Nomina</router-link>
        <router-link v-if="hasAccess(['Administrador', 'Recepcionista'])" class="r" to="/Parcelas">Parcelas</router-link>
        <router-link v-if="hasAccess(['Administrador', 'Recepcionista'])" class="r" to="/Preparacion de suelos">Preparacion de suelos</router-link>
        <router-link v-if="hasAccess(['Administrador', 'Recepcionista'])" class="r" to="/Procesos">Procesos</router-link>
        <router-link v-if="hasAccess(['Administrador', 'Recepcionista'])" class="r" to="/Produccion">Produccion</router-link>
        <router-link v-if="hasAccess(['Administrador', 'Recepcionista'])" class="r" to="/Proveedores">Proveedores</router-link>
        <router-link v-if="hasAccess(['Administrador', 'Recepcionista'])" class="r" to="/Riego">Riego</router-link>
        <router-link v-if="hasAccess(['Administrador', 'Recepcionista'])" class="r" to="/Semillas">Semillas</router-link>
        <router-link v-if="hasAccess(['Administrador', 'Recepcionista'])" class="r" to="/Siembra">Siembra</router-link>
			</div>
		</q-drawer>

		<q-page-container>
			<router-view />
		</q-page-container> -->
	</q-layout>
</template>

<script setup>
/* import { ref, computed } from "vue";
// import { useStoreUsuarios } from '../stores/Usuarios.js';

const leftDrawerOpen = ref(false);
// const useUsuario = useStoreUsuarios();

// Función de alternancia para abrir y cerrar el cajón
const toggleLeftDrawer = () => {
	leftDrawerOpen.value = !leftDrawerOpen.value;
};

// Comprobar si el usuario está autenticado
// const isAuthenticated = computed(() => !!useUsuario.token);

// Función para comprobar si el usuario tiene acceso en función de los roles
// const hasAccess = (allowedRoles) => {
//   return allowedRoles.includes(useUsuario.user.rol);
// }; */
</script>

<style scoped>
/* .drawer-links {
	text-align: center !important;
	font-size: 20px !important;
	overflow: hidden;
	margin-top: 20px;
	height: 100%;
	margin: 0;
	padding-top: 20px;
	padding-bottom: 20px;
	overflow-y: auto;
	display: flex;
	flex-direction: column;
}

.r {
	color: rgb(65, 60, 77);
}

.bg-primary {
	background-color: rgb(60, 63, 77) !important;
} */
</style>
