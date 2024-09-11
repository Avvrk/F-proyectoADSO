import { Notify } from "quasar";

import Home from "../components/home.vue";
import Login from "../components/Login.vue";
import barraLateral from "../components/barraLateral.vue";
import Admin from "../components/admin.vue";
import Analisis_de_suelo from "../components/analisis_suelo.vue";
import Climas from "../components/climas.vue";
import Comprador from "../components/comprador.vue";
import Control_de_Plagas from "../components/control_plagas.vue";
import Cultivos from "../components/cultivos.vue";
import Elaboracion_de_Sustrato from "../components/elaboracion_sustrato.vue";
import Empleados from "../components/empleados.vue";
import Factura from "../components/factura.vue";
import Fertilizacion from "../components/fertilizacion.vue";
import Fincas from "../components/fincas.vue";
import Gastos from "../components/gastos.vue";
import Insumos from "../components/insumos.vue";
import Inventario from "../components/inventario.vue";
import Mantenimiento from "../components/mantenimiento.vue";
import Maquinaria_de_herramientas from "../components/maquinaria_herramientas.vue";
import Nomina from "../components/nomina.vue";
import Parcelas from "../components/parcelas.vue";
import Preparacion_de_suelos from "../components/preparacion_suelo.vue";
import Procesos from "../components/procesos.vue";
import Produccion from "../components/produccion.vue";
import Proveedores from "../components/proveedores.vue";
import Riego from "../components/riego.vue";
import Semillas from "../components/semillas.vue";
import Siembra from "../components/siembra.vue";

import { useStoreAdmins } from "../stores/admin";

import { createRouter, createWebHashHistory } from "vue-router";

export const notifyErrorRequest = (msg, position = "bottom") => {
	Notify.create({
		color: "negative",
		message: msg,
		icon: "error",
		position: position,
		timeout: 4500,
	});
};

export const notifySuccessRequest = (msg, position = "bottom") => {
	Notify.create({
		color: "positive",
		message: msg,
		icon: "check",
		position: position,
		timeout: 3500,
	});
};

const auth = (to, from, next) => {
    if (checkAuth()) {
        next();
    } else {
        return next({ name: "login" });
    }
};

const checkAuth = async () => {
    const useAdmin = useStoreAdmins();
    const token = useAdmin.token;
    if (!token) return false;
    return true;
};

const routes = [
    { path: "/", component: Login, name: "login" },
    {
        path: "/",
        component: barraLateral,
        children: [
            { path: "Admin", component: Admin, beforeEnter: auth },
            { path: "AnalisisSuelo", component: Analisis_de_suelo, beforeEnter: auth},
            { path: "Climas", component: Climas, beforeEnter: auth },
            { path: "Comprador", component: Comprador, beforeEnter: auth },
            { path: "ControlPlagas", component: Control_de_Plagas,beforeEnter: auth },
            { path: "Cultivos", component: Cultivos, beforeEnter: auth },
            { path: "ElaboracionSustrato", component: Elaboracion_de_Sustrato },
            { path: "Empleados", component: Empleados, beforeEnter: auth },
            { path: "Factura", component: Factura, beforeEnter: auth },
            { path: "Fertilizacion", component: Fertilizacion, beforeEnter: auth },
            { path: "Fincas", component: Fincas, beforeEnter: auth },
            { path: "Gastos", component: Gastos, beforeEnter: auth },
            { path: "Insumos", component: Insumos, beforeEnter: auth },
            { path: "Inventario", component: Inventario, beforeEnter: auth },
            { path: "Mantenimiento", component: Mantenimiento, beforeEnter: auth },
            { path: "MaquinariaHerramientas", component: Maquinaria_de_herramientas, beforeEnter: auth },
            { path: "Nomina", component: Nomina, beforeEnter: auth },
            { path: "Parcelas", component: Parcelas, beforeEnter: auth },
            { path: "PreparacionSuelos", component: Preparacion_de_suelos, beforeEnter: auth },
            { path: "Procesos", component: Procesos, beforeEnter: auth },
            { path: "Produccion", component: Produccion, beforeEnter: auth },
            { path: "Proveedores", component: Proveedores, beforeEnter: auth },
            { path: "Riego", component: Riego, beforeEnter: auth },
            { path: "Semillas", component: Semillas, beforeEnter: auth },
            { path: "Siembra", component: Siembra, beforeEnter: auth },
        ],
    },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});