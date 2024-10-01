<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useStoreFacturas } from "../stores/factura.js";
import { useQuasar } from "quasar";

const $q = useQuasar();

const useFacturas = useStoreFacturas();

let rows = ref([]);
let columns = ref([
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
        label: "Id del Comprador",
        field: (row) => `${row.comprador_id.nombre}`,
        sortable: true,
    },
    {
        name: "inventario_id",
        align: "center",
        label: "Id de Inventario",
        field: (row) => `${row.inventario_id.tipo}`,
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
        name: "detalles",
        align: "center",
        label: "Detalles",
        field: "detalles",
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
        name: "total",
        align: "center",
        label: "Total",
        field: "total",
        sortable: true,
    },
    {
        name: "opciones",
        align: "center",
        label: "Editar",
        field: "opciones",
        sortable: true,
    },
]);
const comprador = ref([]);
const inventario = ref([]);

//Variables necesarias en el formulario
const fechaFactura = ref("");
const valorFactura = ref("");
/* Detalle */
const inventarioFactura = ref("");
const cantidadFactura = ref("");
const nombreProductoFactura = ref("");
const subtotalFactura = ref("");
const ivaFactura = ref(""); // Por si se cambia el iva
const totalFactura = ref("");
const compradorFactura = ref("");
const numLoteComerciaFactura = ref("");

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

async function listarInventario() {
    try {
        loading.value = true;
        const r = await useFacturas.getInventario();
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
        inventarios.value = r.data.inventario;
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
    if (validarDatos()) {
        try {
            loading.value = true;
            const info = {
                fecha: fechaFactura.value,
                valor: valorFactura.value,
                detalle: [
                    {
                        id_produccion: inventarioFactura.value,
                        cantidad: cantidadFactura.value,
                        nombreProducto: nombreProductoFactura.value,
                        subtotal: subtotalFactura.value,
                        iva: "NO SE QUE PONER",
                        total: totalFactura.value,
                    },
                ],
                comprador_id: compradorFactura.value,
                numeroLoteComercial: numeroLoteComercial.value,
            };

            const r = await useFacturas.postFactura(info);
            if (res.status === 200) {
                mostrarFormularioFactura.value = false;
                listarFactura();
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
                valor: valorFactura.value,
                detalle: [
                    {
                        id_produccion: inventarioFactura.value,
                        cantidad: cantidadFactura.value,
                        nombreProducto: nombreProductoFactura.value,
                        subtotal: subtotalFactura.value,
                        iva: "NO SE QUE PONER",
                        total: totalFactura.value,
                    },
                ],
                comprador_id: compradorFactura.value,
                numeroLoteComercial: numeroLoteComercial.value,
            };

            const r = await useFacturas.putFactura(datos.value._id, info);
            if (res.status === 200) {
                mostrarFormularioFactura.value = false;
                listarFactura();
            }
        } finally {
            loading.value = false;
        }
    }
}

function validarDatos() {
    let validacion = true;
    if (
        !fechaFactura.value &&
        !valorFactura.value.trim() &&
        !inventarioFactura.value &&
        !cantidadFactura.value.trim() &&
        !nombreProductoFactura.value.trim() &&
        !subtotalFactura.value.trim() &&
        !ivaFactura.value.trim() &&
        !totalFactura.value.trim() &&
        !compradorFactura.value &&
        !numeroLoteComercial.value.trim()
    ) {
        $q.notify({
            color: "negative",
            message: "Llena todos los campos",
            position: "bottom",
        });
        validacion = false;
    } else {
        if (!fechaFactura.value) {
            $q.notify({
                color: "negative",
                message: "El campo fecha está vacío",
                position: "bottom",
            });
            validacion = false;
        }
        if (!valorFactura.value) {
            $q.notify({
                color: "negative",
                message: "El campo valor está vacío",
                position: "bottom",
            });
            validacion = false;
        }
        if (!inventarioFactura.value) {
            $q.notify({
                color: "negative",
                message: "El campo inventario está vacío",
                position: "bottom",
            });
            validacion = false;
        }
        if (!cantidadFactura.value.trim()) {
            $q.notify({
                color: "negative",
                message: "El campo cantidad está vacío",
                position: "bottom",
            });
            validacion = false;
        }
        if (!nombreProductoFactura.value.trim()) {
            $q.notify({
                color: "negative",
                message: "El campo nombre del producto está vacío",
                position: "bottom",
            });
            validacion = false;
        }
        if (!subtotalFactura.value.trim()) {
            $q.notify({
                color: "negative",
                message: "El campo subtotal está vacío",
                position: "bottom",
            });
            validacion = false;
        }
        if (!ivaFactura.value.trim()) {
            $q.notify({
                color: "negative",
                message: "El campo iva está vacío",
                position: "bottom",
            });
            validacion = false;
        }
        if (!totalFactura.value.trim()) {
            $q.notify({
                color: "negative",
                message: "El campo total está vacío",
                position: "bottom",
            });
            validacion = false;
        }
        if (!compradorFactura.value.trim()) {
            $q.notify({
                color: "negative",
                message: "El campo comprador está vacío",
                position: "bottom",
            });
            validacion = false;
        }
        if (!numeroLoteComercial.value.trim()) {
            $q.notify({
                color: "negative",
                message: "El campo numero de lote comercial está vacío",
                position: "bottom",
            });
            validacion = false;
        }
    }
    return validacion;
}

function controlFormulario(obj, boolean) {
    fechaFactura.value = "";
    valorFactura.value = "";
    inventarioFactura.value = "";
    cantidadFactura.value = "";
    nombreProductoFactura.value = "";
    subtotalFactura.value = "";
    ivaFactura.value = "";
    totalFactura.value = "";
    compradorFactura.value = "";
    numLoteComerciaFactura.value = "";

    datos.value = obj;
    mostrarBotonEditar.value = false;
    if (obj != null && boolean == true) {
        fechaFactura.value = datos.value.fecha.split("T")[0];
        valorFactura.value = datos.value.valor;
        /* inventarioFactura.value =  inventarios.value.find() .value.inventario_id */ cantidadFactura.value =
            datos.value.cantidad;
        nombreProductoFactura.value = datos.value.nombreProducto;
        subtotalFactura.value = datos.value.subtotal;
        ivaFactura.value = datos.value.iva;
        totalFactura.value = datos.value.total;
        compradorFactura.value = opcionesComprador.value.find(
            (c) => c.id == datos.value.comprador_id
        );
        numLoteComerciaFactura.value = datos.value.numeroLoteComercial;

        mostrarBotonEditar.value = true;
    }
    mostrarFormularioFactura.value = boolean;
}

onMounted(() => {
    listarComprador();
    listarInventario();
    listarFactura();
});
</script>

<template>
    <div>
        <div class="q-pa-lg">
            <q-table
                :rows="rows"
                :columns="columns"
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
                <template v-slot:body-cell-estado="props">
                    <q-td :props="props">
                        <q-badge
                            :color="props.row.estado === 1 ? 'green' : 'red'"
                            align="top"
                            :label="
                                props.row.estado === 1 ? 'Activo' : 'Inactivo'
                            " />
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
                        type="date"
                        label="Fecha"
                        v-model="fechaFact" />
                    <q-select
                        standout="bg-green text-while"
                        :options="opcionesComprador"
                        label="Comprador"
                        v-model="compradorFact" />
                    <q-select
                        standout="bg-green text-while"
                        :options="opcionesInventario"
                        label="Inventario"
                        v-model="inventarioFact" />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Nombre Producto"
                        v-model="nombreProductoFact" />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Valor Unitario"
                        v-model="valorFact" />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Cantidad"
                        v-model="cantidadFact" />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Detalles"
                        v-model="detallesFact" />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Subtotal"
                        v-model="subtotalFact" />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="IVA"
                        v-model="ivaFact" />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Total"
                        v-model="totalFact" />
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
