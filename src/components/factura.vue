<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useStoreFacturas } from "../stores/factura.js";
import notify from "../utils/notificaciones.js";

const useFacturas = useStoreFacturas();

const rowsDetalles = ref([]);
const rows = [
    {
        // Datos de la factura
        fecha: "2024-10-01T12:34:56Z",
        numFactura: 101,
        total: 750,
        comprador_id: { nombre: "Juan Pérez" }, // Información del comprador
        detalles: [
            {
                id_produccion: "63dbf2fa36f0d2a2d0bcb54b", // Referencia a la producción
                nombreProducto: "Producto A",
                valor: 100,
                cantidad: 3,
                subtotal: 300, // valor * cantidad
                iva: 30, // IVA del 10%
                opciones: "Acciones aquí",
            },
            {
                id_produccion: "63dbf2fa36f0d2a2d0bcb54c", // Referencia a la producción
                nombreProducto: "Producto B",
                valor: 150,
                cantidad: 3,
                subtotal: 450, // valor * cantidad
                iva: 45, // IVA del 10%
                opciones: "Acciones aquí",
            },
        ],
    },
    {
        fecha: "2024-10-02T15:20:10Z",
        numFactura: 102,
        total: 520,
        comprador_id: { nombre: "María López" }, // Información del comprador
        detalles: [
            {
                id_produccion: "63dbf2fa36f0d2a2d0bcb54d", // Referencia a la producción
                nombreProducto: "Producto C",
                valor: 100,
                cantidad: 2,
                subtotal: 200, // valor * cantidad
                iva: 20, // IVA del 10%
                opciones: "Acciones aquí",
            },
            {
                id_produccion: "63dbf2fa36f0d2a2d0bcb54e", // Referencia a la producción
                nombreProducto: "Producto D",
                valor: 160,
                cantidad: 2,
                subtotal: 320, // valor * cantidad
                iva: 32, // IVA del 10%
                opciones: "Acciones aquí",
            },
        ],
    },
    {
        fecha: "2024-10-03T10:15:00Z",
        numFactura: 103,
        total: 350,
        comprador_id: { nombre: "Carlos García" }, // Información del comprador
        detalles: [
            {
                id_produccion: "63dbf2fa36f0d2a2d0bcb54f", // Referencia a la producción
                nombreProducto: "Producto E",
                valor: 70,
                cantidad: 2,
                subtotal: 140, // valor * cantidad
                iva: 14, // IVA del 10%
                opciones: "Acciones aquí",
            },
            {
                id_produccion: "63dbf2fa36f0d2a2d0bcb550", // Referencia a la producción
                nombreProducto: "Producto F",
                valor: 100,
                cantidad: 2,
                subtotal: 200, // valor * cantidad
                iva: 20, // IVA del 10%
                opciones: "Acciones aquí",
            },
        ],
    },
];

let columns1 = ref([
    {
        name: "fecha",
        align: "center",
        label: "Fecha",
        field: (row) => {
            return row.fecha.split("T")[0];
        },
        sortable: true,
    },
    {
        name: "comprador_id",
        align: "center",
        label: "Comprador",
        field: (row) => `${row.comprador_id.nombre}`,
        sortable: true,
    },
    {
        name: "total",
        align: "center",
        label: "Total",
        field: "total",
        sortable: true,
    },
    {
        name: "opciones",
        align: "center",
        label: "Opciones",
        field: "opciones",
        sortable: true,
    },
]);

let columns2 = ref([
    {
        name: "id_produccion",
        align: "center",
        label: "Produccion",
        field: (row) => `${row.id_produccion}`,
        sortable: true,
    },
    {
        name: "nombreProducto",
        align: "center",
        label: "Nombre de Producto",
        field: "nombreProducto",
        sortable: true,
    },
    {
        name: "valor",
        align: "center",
        label: "Valor Unitario",
        field: "valor",
        sortable: true,
    },
    {
        name: "cantidad",
        align: "center",
        label: "Cantidad",
        field: "cantidad",
        sortable: true,
    },
    {
        name: "subtotal",
        align: "center",
        label: "Subtotal",
        field: "subtotal",
        sortable: true,
    },
    {
        name: "iva",
        align: "center",
        label: "IVA",
        field: "iva",
        sortable: true,
    },
    {
        name: "opciones",
        align: "center",
        label: "Opciones",
        field: "opciones",
        sortable: true,
    },
]);

const compradores = ref([]);
const producciones = ref([]);

//Variables necesarias en el formulario
const fechaFactura = ref("");
const numFactura = ref("");
/* Detalle */
const produccionFactura = ref("");
const cantidadFactura = ref("");
const nombreProductoFactura = ref("");
const subtotalFactura = ref("");
const ivaFactura = ref(""); // Por si se cambia el iva
const totalFactura = ref(0);
const totalDetallesFactura = ref("");
const compradorFactura = ref("");

//Variables necesarias para la edición
const datos = ref([]);

//Variables que controla lo que se va a mostrar en la pantalla
const mostrarFormularioFactura = ref(false);
const mostrarBotonEditar = ref(false);
const loading = ref(true);

/* const opcionesInventario = computed(() => {
    return inventarios.value.map((i) => {
        return { label: i.nombre, id: i._id }
    })
}) */

const opcionesComprador = computed(() => {
    return compradores.value.map((c) => {
        return { label: c.nombre, id: c._id };
    });
});

async function listarComprador() {
    try {
        loading.value = true;
        const r = await useFacturas.getComprador();
        /* if (r.code == "ERR_BAD_REQUEST") {
            if (
                r.response.data.msg == "No hay token en la peticion" ||
                r.response.data.msg == "Token no válido! ." ||
                r.response.data.msg == "Token no válido!!  " ||
                r.response.data.msg == "Token no valido"
            ) {
                $q.notify({
                    type: "negative",
                    message: "Token no valido",
                });
                return router.push("/");
            }
        } */
        compradores.value = r.data.compradores;
    } finally {
        loading.value = false;
    }
}

async function listarProduccion() {
    try {
        loading.value = true;
        const r = await useFacturas.getProduccion();
        /* if (r.code == "ERR_BAD_REQUEST") {
            if (
                r.response.data.msg == "No hay token en la peticion" ||
                r.response.data.msg == "Token no válido! ." ||
                r.response.data.msg == "Token no válido!!  " ||
                r.response.data.msg == "Token no valido"
            ) {
                $q.notify({
                    type: "negative",
                    message: "Token no valido",
                });
                return router.push("/");
            }
        } */
        producciones.value = r.data.produccion;
    } finally {
        loading.value = false;
    }
}

async function listarFactura() {
    try {
        loading.value = true;
        const r = await useFacturas.getFacturas();
        /* if (r.code == "ERR_BAD_REQUEST") {
            if (
                r.response.data.msg == "No hay token en la peticion" ||
                r.response.data.msg == "Token no válido! ." ||
                r.response.data.msg == "Token no válido!!  " ||
                r.response.data.msg == "Token no valido"
            ) {
                $q.notify({
                    type: "negative",
                    message: "Token no valido",
                });
                return router.push("/");
            }
        } */
        rows.value = r.data.facturas;
    } finally {
        loading.value = false;
    }
}

async function registrar() {
    if (validarDatosFactura()) {
        try {
            loading.value = true;
            const info = {
                fecha: fechaFactura.value,
                numFactura: numFactura.value,
                detalle: [
                    {
                        id_produccion: "",
                        cantidad: "",
                        nombreProducto: "",
                        subtotal: "",
                        iva: "",
                        total: "",
                    },
                ],
                comprador_id: compradorFactura.value.id,
                total: totalFactura.value,
            };

            const r = await useFacturas.postFactura(info);
            if (r.status === 200) {
                mostrarFormularioFactura.value = false;
                listarFactura();
            } else if (r.response && r.response.data.errors) {
                r.response.data.errors.forEach((err) => {
                    notify(err.msg);
                });
            }
        } finally {
            loading.value = false;
        }
    }
}

async function editar() {
    if (validarDatos()) {
        try {
            loading.value = true;
            const info = {
                fecha: fechaFactura.value,
                numFactura: numFactura.value,
                detalle: [
                    {
                        id_produccion: produccionFactura.value,
                        cantidad: cantidadFactura.value,
                        nombreProducto: nombreProductoFactura.value,
                        subtotal: subtotalFactura.value,
                        iva: ivaFactura.value,
                        total: totalDetallesFactura.value,
                    },
                ],
                comprador_id: compradorFactura.value,
                total: totalFactura.value,
            };

            const r = await useFacturas.putFactura(datos.value._id, info);
            if (r.status === 200) {
                mostrarFormularioFactura.value = false;
                listarFactura();
            } else if (r.response && r.response.data.errors) {
                r.response.data.errors.forEach((err) => {
                    notify(err.msg);
                });
            }
        } finally {
            loading.value = false;
        }
    }
}

function validarDatosFactura() {
    let validacion = true;

    if (
        !fechaFactura.value &&
        !numFactura.value.trim() &&
        !compradorFactura.value
    ) {
        notify("Llena todos los campos");
        validacion = false;
    } else {
        if (!fechaFactura.value) {
            notify("El campo fecha está vacío");
            validacion = false;
        }
        if (!numFactura.value) {
            notify("El campo valor está vacío");
            validacion = false;
        }
        if (!compradorFactura.value) {
            notify("El campo comprador está vacío");
            validacion = false;
        }
    }

    return validacion;
}

function validarDatosDetalle() {
    let validacion = true;

    if (
        !produccionFactura.value &&
        !cantidadFactura.value.trim() &&
        !nombreProductoFactura.value.trim() &&
        !subtotalFactura.value.trim() &&
        !ivaFactura.value.trim()
    ) {
        notify("Llena todos los campos");
        validacion = false;
    } else {
        if (!produccionFactura.value) {
            notify("El campo produccion está vacío");
            validacion = false;
        }
        if (!cantidadFactura.value.trim()) {
            notify("El campo cantidad está vacío");
            validacion = false;
        }
        if (!nombreProductoFactura.value.trim()) {
            notify("El campo nombre del producto está vacío");
            validacion = false;
        }
        if (!subtotalFactura.value.trim()) {
            notify("El campo subtotal está vacío");
            validacion = false;
        }
        if (!ivaFactura.value.trim()) {
            notify("El campo iva está vacío");
            validacion = false;
        }
    }

    return validacion;
}

function validarDatos() {
    let validacion = true;

    if (
        !fechaFactura.value &&
        !numFactura.value.trim() &&
        !produccionFactura.value &&
        !cantidadFactura.value.trim() &&
        !nombreProductoFactura.value.trim() &&
        !subtotalFactura.value.trim() &&
        !ivaFactura.value.trim() &&
        !totalFactura.value.trim() &&
        !compradorFactura.value
    ) {
        notify("Llena todos los campos");
        validacion = false;
    } else {
        if (!fechaFactura.value) {
            notify("El campo fecha está vacío");
            validacion = false;
        }
        if (!numFactura.value) {
            notify("El campo numero de la factura está vacío");
            validacion = false;
        }
        if (!produccionFactura.value) {
            notify("El campo produccion está vacío");
            validacion = false;
        }
        if (!cantidadFactura.value.trim()) {
            notify("El campo cantidad está vacío");
            validacion = false;
        }
        if (!nombreProductoFactura.value.trim()) {
            notify("El campo nombre del producto está vacío");
            validacion = false;
        }
        if (!subtotalFactura.value.trim()) {
            notify("El campo subtotal está vacío");
            validacion = false;
        }
        if (!ivaFactura.value.trim()) {
            notify("El campo iva está vacío");
            validacion = false;
        }
        if (!totalFactura.value.trim()) {
            notify("El campo total está vacío");
            validacion = false;
        }
        if (!compradorFactura.value.trim()) {
            notify("El campo comprador está vacío");
            validacion = false;
        }
    }

    return validacion;
}

function controlFormulario(obj, boolean) {
    fechaFactura.value = "";
    numFactura.value = "";
    totalFactura.value = 0;
    compradorFactura.value = "";

    datos.value = obj;
    mostrarBotonEditar.value = false;
    if (obj != null && boolean == true) {
        fechaFactura.value = datos.value.fecha.split("T")[0];
        numFactura.value = datos.value.numFactura;
        totalFactura.value = datos.value.total;
        compradorFactura.value = opcionesComprador.value.find(
            (c) => c.id == datos.value.comprador_id
        );

        mostrarBotonEditar.value = true;
    }
    mostrarFormularioFactura.value = boolean;
}

function controlFormularioDetalles(obj, boolean) {
    rowsDetalles.value = obj.detalles;
}

onMounted(() => {
    listarComprador();
    listarProduccion();
    listarFactura();
});
</script>

<template>
    <div>
        <div class="q-pa-lg">
            <q-table
                :rows="rows"
                :columns="columns1"
                row-key="id"
                :loading="loading">
                <template v-slot:top>
                    <section class="column full-width q-pr-md">
                        <div class="row items-center">
                            <h1 class="text-h4 q-pl-xl text-green-7">
                                Facturas
                            </h1>
                            <q-space />
                            <q-btn
                                size="md"
                                @click="controlFormulario(null, true)"
                                label="Agregar" />
                        </div>
                    </section>
                </template>
                <template v-slot:body-cell-opciones="props">
                    <q-td
                        :props="props"
                        class="row justify-center"
                        style="gap: 20px">
                        <q-btn @click="controlFormularioDetalles(props.row, true)">
                            ✏️
                        </q-btn>
                    </q-td>
                </template>
            </q-table>
        </div>
        <div class="q-pa-lg">
            <q-table
                :rows="rowsDetalles"
                :columns="columns2"
                row-key="id"
                :loading="loading">
                <template v-slot:top>
                    <h2 class="text-h4 q-pl-xl text-green-7">
                        Detalles de Factura
                    </h2>
                    <section class="column full-width q-pr-md">
                        <div class="row justify-evenly items-center">
                            <q-input
                                standout="bg-green text-while"
                                type="text"
                                label="Numero de Factura"
                                v-model="numFactura" />
                            <q-input
                                standout="bg-green text-while"
                                type="date"
                                label="Fecha"
                                v-model="fechaFactura" />
                            <q-input
                                standout="bg-green text-while"
                                type="text"
                                label="Comprador"
                                v-model="compradorFactura" />
                            <q-input
                                standout="bg-green text-while"
                                type="text"
                                label="Total"
                                v-model="totalFactura" />
                        </div>
                        <div class="row items-center">
                            <h1 class="text-h4 q-pl-xl text-green-7">
                                Productos
                            </h1>
                            <q-space />
                            <q-btn
                                size="md"
                                @click="controlFormulario(null, true)"
                                label="Agregar" />
                        </div>
                    </section>
                </template>
                <template v-slot:body-cell-cantidad="props">
                    <q-td :props="props">
                        {{ props.row.cantidad }}
                        <q-popup-edit
                            v-model="props.row.cantidad"
                            auto-save
                            v-slot="scope">
                            <q-input
                                type="text"
                                v-model="scope.value"
                                dense
                                autofocus
                                @keyup.enter="scope.set"
                                @blur="updateCantidad(props.row)" />
                        </q-popup-edit>
                    </q-td>
                </template>
                <template v-slot:body-cell-opciones="props">
                    <q-td
                        :props="props"
                        class="row justify-center"
                        style="gap: 20px">
                        <q-btn @click="controlFormulario(props.row, true)">
                            ✏️
                        </q-btn>
                    </q-td>
                </template>
            </q-table>
            <!-- <q-dialog v-model="mostrarFormularioFacturaDetalle">
                <q-card>
                    <q-form
                        @submit="mostrarBotonEditar ? editar() : registrar()"
                        class="q-gutter-md">
                        <p class="text-h5 text-center q-pb-md text-green">
                            {{ datos ? "Editar" : "Agregar" }} Detalle
                        </p>
                        <q-input
                            standout="bg-green text-while"
                            type="date"
                            label="Produccion"
                            v-model="produccionFactura" />
                        <q-input
                            standout="bg-green text-while"
                            type="text"
                            label="Cantidad"
                            v-model="cantidadFactura" />
                        <q-input
                            standout="bg-green text-while"
                            type="text"
                            label="Nombre Producto"
                            v-model="nombreProductoFactura" />
                        <q-input
                            standout="bg-green text-while"
                            type="text"
                            label="Subtotal"
                            v-model="subtotalFactura" />
                        <q-input
                            standout="bg-green text-while"
                            type="text"
                            label="Iva"
                            v-model="ivaFactura" />
                        <div class="row justify-end" style="gap: 10px">
                            <q-btn
                                unelevated
                                v-if="mostrarBotonEditar"
                                label="Editar"
                                type="submit"
                                color="positive" />
                            <q-btn
                                unelevated
                                v-else
                                label="Registrar"
                                type="submit"
                                color="positive" />
                            <q-btn
                                @click="controlFormulario(null, false)"
                                flat
                                class="bg-red text-white"
                                label="Cerrar"
                                type="button" />
                        </div>
                    </q-form>
                </q-card>
            </q-dialog> -->
        </div>
        <q-dialog v-model="mostrarFormularioFactura">
            <q-card>
                <q-form
                    @submit="mostrarBotonEditar ? editar() : registrar()"
                    class="q-gutter-md">
                    <p class="text-h5 text-center q-pb-md text-green">
                        {{ datos ? "Editar" : "Agregar" }} Factura
                    </p>
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Numero de Factura"
                        v-model="numFactura" />
                    <q-input
                        standout="bg-green text-while"
                        type="date"
                        label="Fecha"
                        v-model="fechaFactura" />
                    <q-select
                        standout="bg-green text-while"
                        :options="opcionesComprador"
                        label="Comprador"
                        v-model="compradorFactura" />
                    <q-input
                        :disable="true"
                        standout="bg-green text-while"
                        type="text"
                        label="Total"
                        v-model="totalFactura" />
                    <div class="row justify-end" style="gap: 10px">
                        <q-btn
                            unelevated
                            v-if="mostrarBotonEditar"
                            label="Editar"
                            type="submit"
                            color="positive" />
                        <q-btn
                            unelevated
                            v-else
                            label="Registrar"
                            type="submit"
                            color="positive" />
                        <q-btn
                            @click="controlFormulario(null, false)"
                            flat
                            class="bg-red text-white"
                            label="Cerrar"
                            type="button" />
                    </div>
                </q-form>
            </q-card>
        </q-dialog>
    </div>
</template>

<style scoped>
.q-card {
    background-color: rgb(255, 255, 255);
    padding: 40px 30px 40px 30px;
    border-radius: 1pc;
    width: 30rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border: 0;
}

.q-form .q-input,
.q-form {
    margin-bottom: 15px;
}
</style>
