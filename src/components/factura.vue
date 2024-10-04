<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useStoreFacturas } from "../stores/factura.js";
import { useQuasar } from "quasar";

const $q = useQuasar();

const IVA_TASA = 0.19;

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
const fechaFact = ref("");
const compradorFact = ref("");
const inventarioFact = ref("");
const nombreProductoFact = ref("");
const valorFact = ref("");
const cantidadFact = ref("");
const detallesFact = ref("");
const subtotalFact = ref("");
const ivaFact = ref("");
const totalFact = ref("");

//Variables necesarias para la edición
const datos = ref([]);

//Variables que controla lo que se va a mostrar en la pantalla
const mostrarFormularioFactura = ref(false);
const mostrarBotonEditar = ref(false);
const loading = ref(true);

function calcularSubtotal(valor, cantidad) {
    return (parseFloat(valor) || 0) * (parseFloat(cantidad) || 0);
}

function calcularIVA(subtotal) {
    return subtotal * IVA_TASA;
}

function calcularTotal(subtotal, iva) {
    return subtotal + iva;
}

watch(
    [valorFact, cantidadFact],
    () => {
        const subtotal = calcularSubtotal(valorFact.value, cantidadFact.value);
        subtotalFact.value = subtotal.toFixed(2);
        const iva = calcularIVA(subtotal);
        ivaFact.value = iva.toFixed(2);
        const total = calcularTotal(subtotal, iva);
        totalFact.value = total.toFixed(2);
    },
    { immediate: true }
);

const opcionesComprador = computed(() => {
    return comprador.value.map((c) => {
        return { label: `${c.nombre} ( DNI: ${c.documento})`, id: `${c._id}` };
    });
});

const opcionesInventario = computed(() => {
    return inventario.value.map((i) => {
        if (i.semillas_id) {
            return {
                label: `${i.tipo} / ${i.semillas_id.especieVariedad}`,
                id: `${i._id}`,
            };
        } else if (i.insumos_id) {
            return {
                label: `${i.tipo} / ${i.insumos_id.nombre}`,
                id: `${i._id}`,
            };
        } else if (i.maquinaria_id) {
            return {
                label: `${i.tipo} / ${i.maquinaria_id.nombre} - ${i.maquinaria_id.tipo}`,
                id: `${i._id}`,
            };
        } else {
            return {
                label: "Datos faltantes",
                id: `${i._id}`,
            };
        }
    });
});

async function listarComprador() {
    try {
        loading.value = true;
        const r = await useFacturas.getComprador();
        if (r.code == "ERR_BAD_REQUEST") {
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
        }
        comprador.value = r.data.compradores;
    } finally {
        loading.value = false;
    }
}

async function listarInventario() {
    try {
        loading.value = true;
        const r = await useFacturas.getInventario();
        if (r.code == "ERR_BAD_REQUEST") {
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
        }
        inventario.value = r.data.inventario;
    } finally {
        loading.value = false;
    }
}

async function listarFactura() {
    try {
        loading.value = true;
        const r = await useFacturas.getFacturas();
        if (r.code == "ERR_BAD_REQUEST") {
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
        }
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
                fecha: fechaFact.value,
                comprador_id: compradorFact.value.id,
                inventario_id: inventarioFact.value.id,
                nombreProducto: nombreProductoFact.value,
                valor: valorFact.value,
                cantidad: cantidadFact.value,
                detalles: detallesFact.value,
                subtotal: subtotalFact.value,
                iva: ivaFact.value,
                total: totalFact.value,
            };

            const r = await useFacturas.postFactura(info);
            mostrarFormularioFactura.value = false;
            listarFactura();
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
                fecha: fechaFact.value,
                comprador_id: compradorFact.value.id,
                inventario_id: inventarioFact.value.id,
                nombreProducto: nombreProductoFact.value,
                valor: valorFact.value,
                cantidad: cantidadFact.value,
                detalles: detallesFact.value,
                subtotal: subtotalFact.value,
                iva: ivaFact.value,
                total: totalFact.value,
            };

            const r = await useFacturas.putFactura(datos.value._id, info);
            mostrarFormularioFactura.value = false;
            listarFactura();
        } finally {
            loading.value = false;
        }
    }
}

function validarDatos() {
    let validacion = true;
    if (
        !fechaFact.value.trim() &&
        !compradorFact.value &&
        !inventarioFact.value &&
        !nombreProductoFact.value.trim() &&
        !valorFact.value.trim() &&
        !cantidadFact.value.trim() &&
        !detallesFact.value.trim() &&
        !subtotalFact.value.trim() &&
        !ivaFact.value.trim() &&
        !totalFact.value.trim()
    ) {
        $q.notify({
            color: "negative",
            message: "Llena todos los campos",
            position: "top",
        });
        validacion = false;
    } else {
        if (!fechaFact.value.trim()) {
            $q.notify({
                color: "negative",
                message: "El campo fecha está vacío",
                position: "top",
            });
            validacion = false;
        }
        if (!compradorFact.value) {
            $q.notify({
                color: "negative",
                message: "El campo comprador está vacío",
                position: "top",
            });
            validacion = false;
        }
        if (!inventarioFact.value) {
            $q.notify({
                color: "negative",
                message: "El campo inventario está vacío",
                position: "top",
            });
            validacion = false;
        }
        if (!nombreProductoFact.value.trim()) {
            $q.notify({
                color: "negative",
                message: "El campo nombre producto está vacío",
                position: "top",
            });
            validacion = false;
        }
        if (!valorFact.value.trim()) {
            $q.notify({
                color: "negative",
                message: "El campo valor está vacío",
                position: "top",
            });
            validacion = false;
        }
        if (!cantidadFact.value.trim()) {
            $q.notify({
                color: "negative",
                message: "El campo cantidad está vacío",
                position: "top",
            });
            validacion = false;
        }
        if (!detallesFact.value.trim()) {
            $q.notify({
                color: "negative",
                message: "El campo detalles está vacío",
                position: "top",
            });
            validacion = false;
        }
        if (!subtotalFact.value.trim()) {
            $q.notify({
                color: "negative",
                message: "El campo subtotal está vacío",
                position: "top",
            });
            validacion = false;
        }
        if (!ivaFact.value.trim()) {
            $q.notify({
                color: "negative",
                message: "El campo iva está vacío",
                position: "top",
            });
            validacion = false;
        }
        if (!totalFact.value.trim()) {
            $q.notify({
                color: "negative",
                message: "El campo total está vacío",
                position: "top",
            });
            validacion = false;
        }
    }
    return validacion;
}

function controlFormulario(obj, boolean) {
    fechaFact.value = "";
    compradorFact.value = "";
    inventarioFact.value = "";
    nombreProductoFact.value = "";
    valorFact.value = "";
    cantidadFact.value = "";
    detallesFact.value = "";
    subtotalFact.value = "";
    ivaFact.value = "";
    totalFact.value = "";

    datos.value = obj;
    mostrarBotonEditar.value = false;
    if (obj != null && boolean == true) {
        fechaFact.value = datos.value.fecha.split("T")[0];
        // compradorFact.value = datos.value.comprador_id;
        compradorFact.value = opcionesComprador.value.find(
            (c) => c.id == datos.value.comprador_id._id
        );
        inventarioFact.value = opcionesInventario.value.find(
            (i) => i.id == datos.value.inventario_id._id
        );
        nombreProductoFact.value = datos.value.nombreProducto;
        valorFact.value = String(datos.value.valor);
        cantidadFact.value = String(datos.value.cantidad);
        detallesFact.value = datos.value.detalles;
        subtotalFact.value = String(datos.value.subtotal);
        ivaFact.value = String(datos.value.iva);
        totalFact.value = String(datos.value.total);
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
                :loading="loading"
            >
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
                                label="Agregar"
                            />
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
                            "
                        />
                    </q-td>
                </template>
                <template v-slot:body-cell-opciones="props">
                    <q-td
                        :props="props"
                        class="row justify-center"
                        style="gap: 20px"
                    >
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
                    class="q-gutter-md"
                >
                    <p class="text-h5 text-center q-pb-md text-green">
                        {{ datos ? "Editar" : "Agregar" }} Factura
                    </p>
                    <q-input
                        standout="bg-green text-while"
                        type="date"
                        label="Fecha"
                        v-model="fechaFact"
                    />
                    <q-select
                        standout="bg-green text-while"
                        :options="opcionesComprador"
                        label="Comprador"
                        v-model="compradorFact"
                    />
                    <q-select
                        standout="bg-green text-while"
                        :options="opcionesInventario"
                        label="Inventario"
                        v-model="inventarioFact"
                    />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Nombre Producto"
                        v-model="nombreProductoFact"
                    />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Valor Unitario"
                        v-model="valorFact"
                    />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Cantidad"
                        v-model="cantidadFact"
                    />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Detalles"
                        v-model="detallesFact"
                    />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Subtotal"
                        v-model="subtotalFact"
                    />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="IVA"
                        v-model="ivaFact"
                    />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Total"
                        v-model="totalFact"
                    />
                    <div class="row justify-end" style="gap: 10px">
                        <q-btn
                            unelevated
                            v-if="mostrarBotonEditar"
                            label="Editar"
                            type="submit"
                            color="positive"
                        />
                        <q-btn
                            unelevated
                            v-else
                            label="Registrar"
                            type="submit"
                            color="positive"
                        />
                        <q-btn
                            @click="controlFormulario(null, false)"
                            flat
                            class="bg-red text-white"
                            label="Cerrar"
                            type="button"
                        />
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
