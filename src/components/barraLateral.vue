<template>
    <q-layout view="hHh lpR fFf">
        <q-header class="bg-positive text-white" height-hint="98">
            <q-toolbar>
                <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
                <q-toolbar-title>
                    <em>campo</em>
                </q-toolbar-title>
                <button style="color: red; font-weight: 900; font-size: large; background-color: transparent; border: 0px; display: flex; flex-direction: row-reverse; cursor: pointer;" @click="cerrar()">
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
                        <q-item-label>Usuarios</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="person" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/AnalisisSuelo">
                    <q-item-section>
                        <q-item-label>Analisis de suelos</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="analytics" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/Climas">
                    <q-item-section>
                        <q-item-label>Climas</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="ac_unit" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/Comprador">
                    <q-item-section>
                        <q-item-label>Compradores</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="shopping_cart" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/ControlPlagas">
                    <q-item-section>
                        <q-item-label>Control de Plagas</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="shopping_cart" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/Cultivos">
                    <q-item-section>
                        <q-item-label>Cultivos</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="local_florist" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/ElaboracionSustrato">
                    <q-item-section>
                        <q-item-label>Elaboracion de Sustratos</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="compost" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/Empleados">
                    <q-item-section>
                        <q-item-label>Empleados</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="group" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/Factura">
                    <q-item-section>
                        <q-item-label>Facturas</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="receipt_long" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/Fertilizacion">
                    <q-item-section>
                        <q-item-label>Fertilizaciones</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="nest_eco_leaf" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/Fincas">
                    <q-item-section>
                        <q-item-label>Fincas</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="gite" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/Gastos">
                    <q-item-section>
                        <q-item-label>Gastos</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="payments" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/Insumos">
                    <q-item-section>
                        <q-item-label>Insumos</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="window" />
                    </q-item-section>
                </q-item>
<!--                 <q-item clickable tag="router-link" to="/Inventario">
                    <q-item-section>
                        <q-item-label>Inventarios</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="inventory_2" />
                    </q-item-section>
                </q-item> -->
<!--                 <q-item clickable tag="router-link" to="/Mantenimiento">
                    <q-item-section>
                        <q-item-label>Mantenimiento</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="build" />
                    </q-item-section>
                </q-item> -->
                <q-item clickable tag="router-link" to="/MaquinariaHerramientas">
                    <q-item-section>
                        <q-item-label>Maquinaria de herramientas</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="handyman" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/Nomina">
                    <q-item-section>
                        <q-item-label>Nóminas</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="volunteer_activism" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/Parcelas">
                    <q-item-section>
                        <q-item-label>Parcelas</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="holiday_village" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/PreparacionSuelos">
                    <q-item-section>
                        <q-item-label>Preparacion de suelos</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="spa" />
                    </q-item-section>
                </q-item>
<!--                 <q-item clickable tag="router-link" to="/Procesos">
                    <q-item-section>
                        <q-item-label>Procesos</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="autorenew" />
                    </q-item-section>
                </q-item> -->
                <q-item clickable tag="router-link" to="/Produccion">
                    <q-item-section>
                        <q-item-label>Producciones</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="waves" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/Proveedores">
                    <q-item-section>
                        <q-item-label>Proveedores</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="forklift" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/Riego">
                    <q-item-section>
                        <q-item-label>Riegos</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="water_drop" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/Semillas">
                    <q-item-section>
                        <q-item-label>Semillas</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="yard" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/Siembra">
                    <q-item-section>
                        <q-item-label>Siembras</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="grass" />
                    </q-item-section>
                </q-item>
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
    router.push("/")
}
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
