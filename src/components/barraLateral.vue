<template>
    <q-layout view="hHh lpR fFf">
        <q-header class="bg-positive text-white" height-hint="98">
            <q-toolbar>
                <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
                <q-toolbar-title>
                    <em>campo</em>
                </q-toolbar-title>
            </q-toolbar>
        </q-header>

        <q-drawer
            :model-value="leftDrawerOpen"
            show-if-above
            side="left"
            overlay
            id="lateral">
            <q-list>
                <q-item clickable tag="router-link" to="/mio/Admin">
                    <q-item-section>
                        <q-item-label>Administrador</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="person" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/mio/AnalisisSuelo">
                    <q-item-section>
                        <q-item-label>Analisis de suelo</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="analytics" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/mio/Climas">
                    <q-item-section>
                        <q-item-label>Climas</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="ac_unit" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/mio/Comprador">
                    <q-item-section>
                        <q-item-label>Comprador</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="shopping_cart" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/mio/ControlPlagas">
                    <q-item-section>
                        <q-item-label>Control de Plagas</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="shopping_cart" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/mio/Cultivos">
                    <q-item-section>
                        <q-item-label>Cultivos</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="local_florist" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/mio/ElaboracionSustrato">
                    <q-item-section>
                        <q-item-label>Elaboracion de Sustrato</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="compost" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/mio/Empleados">
                    <q-item-section>
                        <q-item-label>Empleados</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="group" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/mio/Factura">
                    <q-item-section>
                        <q-item-label>Factura</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="receipt_long" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/mio/Fertilizacion">
                    <q-item-section>
                        <q-item-label>Fertilizacion</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="nest_eco_leaf" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/mio/Fincas">
                    <q-item-section>
                        <q-item-label>Fincas</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="gite" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/mio/Gastos">
                    <q-item-section>
                        <q-item-label>Gastos</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="payments" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/mio/Insumos">
                    <q-item-section>
                        <q-item-label>Insumos</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="window" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/mio/Inventario">
                    <q-item-section>
                        <q-item-label>Inventario</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="inventory_2" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/mio/Mantenimiento">
                    <q-item-section>
                        <q-item-label>Mantenimiento</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="build" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/mio/MaquinariaHerramientas">
                    <q-item-section>
                        <q-item-label>Maquinaria de herramientas</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="handyman" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/mio/Nomina">
                    <q-item-section>
                        <q-item-label>Nóminas</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="volunteer_activism" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/mio/Parcelas">
                    <q-item-section>
                        <q-item-label>Parcelas</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="holiday_village" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/mio/PreparacionSuelos">
                    <q-item-section>
                        <q-item-label>Preparacion de suelos</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="spa" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/mio/Procesos">
                    <q-item-section>
                        <q-item-label>Procesos</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="autorenew" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/mio/Produccion">
                    <q-item-section>
                        <q-item-label>Produccion</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="waves" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/mio/Proveedores">
                    <q-item-section>
                        <q-item-label>Proveedores</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="forklift" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/mio/Riego">
                    <q-item-section>
                        <q-item-label>Riego</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="water_drop" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/mio/Semillas">
                    <q-item-section>
                        <q-item-label>Semillas</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon name="yard" />
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/mio/Siembra">
                    <q-item-section>
                        <q-item-label>Siembra</q-item-label>
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

const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
	leftDrawerOpen.value = !leftDrawerOpen.value;
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
