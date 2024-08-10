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

import { createRouter, createWebHashHistory } from "vue-router";

/* const auth = (to, from, next) => {
    if (checkAuth()) {
        const useUsuario = useStoreUsuarios();
        const rol = useUsuario.user.rol;
        if (!to.meta.rol.includes(rol)) {
            return next({ name: "login" });
        }
        next();
    } else {
        console.log("Rol:", rol);
        return next({ name: "login" });
    }
};

const checkAuth = async () => {
    const useUsuario = useStoreUsuarios();
    const token = useUsuario.token;
    if (!token) return false;
    return true;
}; */

const routes = [
    { path: "/", component: Login, name: "login" },
    {
        path: "/mio",
        component: barraLateral,
        children: [
            { path: "Admin", component: Admin, /* beforeEnter: auth, meta: { rol: ["Administrador", "Recepcionista"] } */ },
            { path: "AnalisisSuelo", component: Analisis_de_suelo, /* beforeEnter: auth, meta: { rol: ["Administrador", "Recepcionista"] } */ },
            { path: "Climas", component: Climas, /* beforeEnter: auth, meta: { rol: ["Administrador", "Recepcionista"] } */ },
            { path: "Comprador", component: Comprador, /* beforeEnter: auth, meta: { rol: ["Administrador", "Recepcionista"] } */ },
            { path: "ControlPlagas", component: Control_de_Plagas, /* beforeEnter: auth, meta: { rol: ["Administrador", "Recepcionista"] } */ },
            { path: "Cultivos", component: Cultivos, /* beforeEnter: auth, meta: { rol: ["Administrador"] } */ },
            { path: "Elaboracion de Sustrato", component: Elaboracion_de_Sustrato, /* beforeEnter: auth, meta: { rol: ["Administrador"] } */ },
            { path: "Empleados", component: Empleados, /* beforeEnter: auth, meta: { rol: ["Administrador"] } */ },
            { path: "Factura", component: Factura, /* beforeEnter: auth, meta: { rol: ["Administrador", "Recepcionista"] } */ },
            { path: "Fertilizacion", component: Fertilizacion, /* beforeEnter: auth, meta: { rol: ["Administrador", "Recepcionista"] } */ },
            { path: "Fincas", component: Fincas, /* beforeEnter: auth, meta: { rol: ["Administrador", "Recepcionista"] } */ },
            { path: "Gastos", component: Gastos, /* beforeEnter: auth, meta: { rol: ["Administrador", "Recepcionista"] } */ },
            { path: "Insumos", component: Insumos, /* beforeEnter: auth, meta: { rol: ["Administrador", "Recepcionista"] } */ },
            { path: "Inventario", component: Inventario, /* beforeEnter: auth, meta: { rol: ["Administrador", "Recepcionista"] } */ },
            { path: "Mantenimiento", component: Mantenimiento, /* beforeEnter: auth, meta: { rol: ["Administrador", "Recepcionista"] } */ },
            { path: "MaquinariaHerramientas", component: Maquinaria_de_herramientas, /* beforeEnter: auth, meta: { rol: ["Administrador", "Recepcionista"] } */ },
            { path: "Nomina", component: Nomina, /* beforeEnter: auth, meta: { rol: ["Administrador", "Recepcionista"] } */ },
            { path: "Parcelas", component: Parcelas, /* beforeEnter: auth, meta: { rol: ["Administrador", "Recepcionista"] } */ },
            { path: "PreparacionSuelos", component: Preparacion_de_suelos, /* beforeEnter: auth, meta: { rol: ["Administrador", "Recepcionista"] } */ },
            { path: "Procesos", component: Procesos, /* beforeEnter: auth, meta: { rol: ["Administrador", "Recepcionista"] } */ },
            { path: "Produccion", component: Produccion, /* beforeEnter: auth, meta: { rol: ["Administrador", "Recepcionista"] } */ },
            { path: "Proveedores", component: Proveedores, /* beforeEnter: auth, meta: { rol: ["Administrador", "Recepcionista"] } */ },
            { path: "Riego", component: Riego, /* beforeEnter: auth, meta: { rol: ["Administrador", "Recepcionista"] } */ },
            { path: "Semillas", component: Semillas, /* beforeEnter: auth, meta: { rol: ["Administrador", "Recepcionista"] } */ },
            { path: "Siembra", component: Siembra, /* beforeEnter: auth, meta: { rol: ["Administrador", "Recepcionista"] } */ },
        ],
    },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});