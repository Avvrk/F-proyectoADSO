<template>
	<q-layout view="hHh lpR fFf">
		<q-header class="bg-positive text-white" height-hint="98">
			<q-toolbar>
				<q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
				<q-toolbar-title>
					<em>CampoSoft</em>
				</q-toolbar-title>
				<button
					style="
						color: white;
						font-weight: 600;
						font-size: large;
						background-color: transparent;
						border: 0px;
						display: flex;
						flex-direction: row-reverse;
						cursor: pointer;
					"
					@click="cerrar()">
					Cerrar Sesión
					<q-item-section avatar>
						<q-icon name="login" />
					</q-item-section>
				</button>
			</q-toolbar>
		</q-header>

		<q-drawer
			:model-value="leftDrawerOpen"
			show-if-above
			side="left"
			overlay
			id="lateral">
			<q-list>
				<q-item clickable tag="router-link" to="/Admin">
					<q-item-section>
						<q-item-label>Administradores</q-item-label>
					</q-item-section>
					<q-item-section avatar>
						<q-icon name="person" />
					</q-item-section>
				</q-item>
				<!-- Información Finca Group -->
				<q-expansion-item label="Información Finca" icon="home_work">
					<q-item
						clickable
						tag="router-link"
						to="/Climas"
						style="background-color: #f0f0f0
">
						<q-item-section>
							<q-item-label>Climas</q-item-label>
						</q-item-section>
						<q-item-section avatar>
							<q-icon name="ac_unit" />
						</q-item-section>
					</q-item>
					<q-item
						clickable
						tag="router-link"
						to="/Cultivos"
						style="background-color: #f0f0f0
">
						<q-item-section>
							<q-item-label>Cultivos</q-item-label>
						</q-item-section>
						<q-item-section avatar>
							<q-icon name="local_florist" />
						</q-item-section>
					</q-item>
					<q-item
						clickable
						tag="router-link"
						to="/Empleados"
						style="background-color: #f0f0f0
">
						<q-item-section>
							<q-item-label>Empleados</q-item-label>
						</q-item-section>
						<q-item-section avatar>
							<q-icon name="group" />
						</q-item-section>
					</q-item>
					<q-item
						clickable
						tag="router-link"
						to="/Fincas"
						style="background-color: #f0f0f0
">
						<q-item-section>
							<q-item-label>Fincas</q-item-label>
						</q-item-section>
						<q-item-section avatar>
							<q-icon name="gite" />
						</q-item-section>
					</q-item>
					<q-item
						clickable
						tag="router-link"
						to="/Parcelas"
						style="background-color: #f0f0f0
">
						<q-item-section>
							<q-item-label>Parcelas</q-item-label>
						</q-item-section>
						<q-item-section avatar>
							<q-icon name="holiday_village" />
						</q-item-section>
					</q-item>
					<q-item
						clickable
						tag="router-link"
						to="/Riego"
						style="background-color: #f0f0f0
">
						<q-item-section>
							<q-item-label>Riegos</q-item-label>
						</q-item-section>
						<q-item-section avatar>
							<q-icon name="water_drop" />
						</q-item-section>
					</q-item>
					<q-item
						clickable
						tag="router-link"
						to="/Semillas"
						style="background-color: #f0f0f0
">
						<q-item-section>
							<q-item-label>Semillas</q-item-label>
						</q-item-section>
						<q-item-section avatar>
							<q-icon name="yard" />
						</q-item-section>
					</q-item>
				</q-expansion-item>

				<!-- Insumos y Proveedores Group -->
				<q-expansion-item
					label="Insumos y Proveedores"
					icon="inventory">
					<q-item
						clickable
						tag="router-link"
						to="/Insumos"
						style="background-color: #f0f0f0
">
						<q-item-section>
							<q-item-label>Insumos</q-item-label>
						</q-item-section>
						<q-item-section avatar>
							<q-icon name="window" />
						</q-item-section>
					</q-item>
					<q-item
						clickable
						tag="router-link"
						to="/Proveedores"
						style="background-color: #f0f0f0
">
						<q-item-section>
							<q-item-label>Proveedores</q-item-label>
						</q-item-section>
						<q-item-section avatar>
							<q-icon name="forklift" />
						</q-item-section>
					</q-item>
				</q-expansion-item>

				<!-- Producción Group -->
				<q-expansion-item label="Producción" icon="factory">
					<q-item
						clickable
						tag="router-link"
						to="/AnalisisSuelo"
						style="background-color: #f0f0f0
">
						<q-item-section>
							<q-item-label>Análisis de Suelos</q-item-label>
						</q-item-section>
						<q-item-section avatar>
							<q-icon name="analytics" />
						</q-item-section>
					</q-item>
					<q-item
						clickable
						tag="router-link"
						to="/ControlPlagas"
						style="background-color: #f0f0f0
">
						<q-item-section>
							<q-item-label>Control de Plagas</q-item-label>
						</q-item-section>
						<q-item-section avatar>
							<q-icon name="pest_control" />
						</q-item-section>
					</q-item>
					<q-item
						clickable
						tag="router-link"
						to="/ElaboracionSustrato"
						style="background-color: #f0f0f0
">
						<q-item-section>
							<q-item-label
								>Elaboración de Sustratos</q-item-label
							>
						</q-item-section>
						<q-item-section avatar>
							<q-icon name="compost" />
						</q-item-section>
					</q-item>
					<q-item
						clickable
						tag="router-link"
						to="/Fertilizacion"
						style="background-color: #f0f0f0
">
						<q-item-section>
							<q-item-label>Fertilizaciones</q-item-label>
						</q-item-section>
						<q-item-section avatar>
							<q-icon name="nest_eco_leaf" />
						</q-item-section>
					</q-item>
					<q-item
						clickable
						tag="router-link"
						to="/MaquinariaHerramientas"
						style="background-color: #f0f0f0
">
						<q-item-section>
							<q-item-label
								>Maquinaria y Herramientas</q-item-label
							>
						</q-item-section>
						<q-item-section avatar>
							<q-icon name="handyman" />
						</q-item-section>
					</q-item>
					<q-item
						clickable
						tag="router-link"
						to="/PreparacionSuelos"
						style="background-color: #f0f0f0
">
						<q-item-section>
							<q-item-label>Preparación de Suelos</q-item-label>
						</q-item-section>
						<q-item-section avatar>
							<q-icon name="spa" />
						</q-item-section>
					</q-item>
					<q-item
						clickable
						tag="router-link"
						to="/Produccion"
						style="background-color: #f0f0f0
">
						<q-item-section>
							<q-item-label>Producción</q-item-label>
						</q-item-section>
						<q-item-section avatar>
							<q-icon name="waves" />
						</q-item-section>
					</q-item>
					<q-item
						clickable
						tag="router-link"
						to="/Procesos"
						style="background-color: #f0f0f0
">
						<q-item-section>
							<q-item-label>Procesos</q-item-label>
						</q-item-section>
						<q-item-section avatar>
							<q-icon name="autorenew" />
						</q-item-section>
					</q-item>
					<q-item
						clickable
						tag="router-link"
						to="/Siembra"
						style="background-color: #f0f0f0
">
						<q-item-section>
							<q-item-label>Siembras</q-item-label>
						</q-item-section>
						<q-item-section avatar>
							<q-icon name="grass" />
						</q-item-section>
					</q-item>
				</q-expansion-item>

				<!-- Recursos Humanos Group -->
				<q-expansion-item label="Recursos Humanos" icon="people">
					<q-item
						clickable
						tag="router-link"
						to="/Nomina"
						style="background-color: #f0f0f0
">
						<q-item-section>
							<q-item-label>Nómina</q-item-label>
						</q-item-section>
						<q-item-section avatar>
							<q-icon name="volunteer_activism" />
						</q-item-section>
					</q-item>
				</q-expansion-item>

				<!-- Ventas y Distribución Group -->
				<q-expansion-item
					label="Ventas y Distribución"
					icon="local_shipping">
					<q-item
						clickable
						tag="router-link"
						to="/Comprador"
						style="background-color: #f0f0f0
">
						<q-item-section>
							<q-item-label>Compradores</q-item-label>
						</q-item-section>
						<q-item-section avatar>
							<q-icon name="shopping_cart" />
						</q-item-section>
					</q-item>
					<q-item
						clickable
						tag="router-link"
						to="/Factura"
						style="background-color: #f0f0f0
">
						<q-item-section>
							<q-item-label>Facturas</q-item-label>
						</q-item-section>
						<q-item-section avatar>
							<q-icon name="receipt_long" />
						</q-item-section>
					</q-item>
					<q-item
						clickable
						tag="router-link"
						to="/Gastos"
						style="background-color: #f0f0f0
">
						<q-item-section>
							<q-item-label>Gastos</q-item-label>
						</q-item-section>
						<q-item-section avatar>
							<q-icon name="payments" />
						</q-item-section>
					</q-item>
				</q-expansion-item>
			</q-list>
		</q-drawer>

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useStoreAdmins } from "../stores/admin";
import { useRouter } from "vue-router";

const router = useRouter();
const useAdmin = useStoreAdmins();
const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
	leftDrawerOpen.value = !leftDrawerOpen.value;
};

const cerrar = () => {
	useAdmin.cerrarSecion();
	router.push("/");
};
</script>

<style scoped>
#lateral div {
	display: flex;
	flex-direction: column;
}

.q-item {
	display: flex;
	flex-direction: row-reverse;
	gap: 30px;
	margin-left: -20px;
}
</style>
