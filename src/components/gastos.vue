<script setup>
import { ref, onMounted, computed } from "vue";
import { useStoreGastos } from "../stores/gastos.js";
import { useQuasar } from "quasar";
import notify from "../utils/notificaciones.js";

const $q = useQuasar();
const useGasto = useStoreGastos();

let rows = ref([]);
let columns = ref([
    {
        name: "nombre",
        align: "center",
        label: "Nombre",
        field: "nombre",
        sortable: true,
    },
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
        name: "codigo",
        align: "center",
        label: "Codigo",
        field: "codigo",
        sortable: true,
    },
    {
        name: "descripcion",
        align: "center",
        label: "Descripción",
        field: "descripcion",
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
        name: "informacion",
        align: "center",
        label: "Informacion",
        field: "informacion",
    },
    {
        name: "opciones",
        align: "center",
        label: "Opciones",
        field: "opciones",
        sortable: true,
    },
]);

const insumo = ref([]);
const semilla = ref([]);
const proveedor = ref([]);
const fincas = ref([]);

// Variables para el formulario
const nombreGasto = ref("");
const fincaGasto = ref("");
const fechaGasto = ref("");
const codigoGasto = ref("");
const descripcionGasto = ref("");
const totalGasto = ref("");
const totalISGasto = ref("");
const proveedorGastos = ref("");
const insumoGasto = ref("");
const semillaGasto = ref("");
const cantidadGasto = ref("");
const unidadGasto = ref("Kl");

const proveedorInfo = ref("");
const insumoInfo = ref("");
const semillaInfo = ref("");
const unidadInfo = ref("");
const totalInfo = ref("");
const cantidadInfo = ref("");
//queso
const tipoSeleccionado = ref("Otro");

// Variable necesaria para la edición
const datos = ref([]);

// Variables que controlan lo que se va a mostrar en la pantalla
const mostrarInfo = ref("");
const mostrarInformacion = ref(false);
const mostrarFormularioGasto = ref(false);
const mostrarBotonEditar = ref(false);
const loading = ref(true);

// Computed para opciones de insumos, semillas y mantenimientos
const opcionesFinca = computed(() => {
    return fincas.value.map((item) => {
        return { label: `${item.nombre} (rut: ${item.rut})`, id: item._id };
    });
});

const opcionesInsumos = computed(() => {
    return insumo.value.map((item) => {
        return { label: item.nombre, id: item._id };
    });
});

const opcionesSemillas = computed(() => {
    return semilla.value.map((item) => {
        return {
            label: `${item.especieVariedad} (Origen: ${item.origen})`,
            id: item._id,
        };
    });
});

const opcionesProveedores = computed(() => {
    return proveedor.value.map((item) => {
        return { label: item.nombre, id: item._id };
    });
});

async function listarInsumos() {
    try {
        loading.value = true;
        const r = await useGasto.getInsumos();
        insumo.value = r.data.insumos;
    } finally {
        loading.value = false;
    }
}

async function listarSemillas() {
    try {
        loading.value = true;
        const r = await useGasto.getSemillas();
        semilla.value = r.data.semillas;
    } finally {
        loading.value = false;
    }
}

async function listarGastos() {
    try {
        loading.value = true;
        const r = await useGasto.getGastos();
        rows.value = r.data.gastos;
    } finally {
        loading.value = false;
    }
}

async function listarfincas() {
    try {
        loading.value = true;
        const r = await useGasto.getFincas();
        fincas.value = r.data.fincas;
    } finally {
        loading.value = false;
    }
}

async function listarProveedores() {
    try {
        loading.value = true;
        const r = await useGasto.getProveedores();
        proveedor.value = r.data.proveedores;
    } finally {
        loading.value = false;
    }
}

async function registrar() {
    if (validarDatos()) {
        try {
            loading.value = true;
            const info = {
                nombre: nombreGasto.value,
                fincas_id: fincaGasto.value.id,
                fecha: fechaGasto.value,
                codigo: codigoGasto.value,
                descripcion: descripcionGasto.value,
                total: totalGasto.value,
                insumos: {
                    id_proveedor:
                        tipoSeleccionado.value == "Insumos"
                            ? proveedorGastos.value.id
                            : null,
                    id_insumos:
                        tipoSeleccionado.value == "Insumos"
                            ? insumoGasto.value.id
                            : null,
                    unidad:
                        tipoSeleccionado.value == "Insumos"
                            ? unidadGasto.value
                            : null,
                    total:
                        tipoSeleccionado.value == "Insumos"
                            ? totalISGasto.value
                            : null,
                    cantidad:
                        tipoSeleccionado.value == "Insumos"
                            ? cantidadGasto.value
                            : null,
                },
                semillas: {
                    id_proveedor:
                        tipoSeleccionado.value == "Semillas"
                            ? proveedorGastos.value.id
                            : null,
                    id_semilla:
                        tipoSeleccionado.value == "Semillas"
                            ? semillaGasto.value.id
                            : null,
                    unidad:
                        tipoSeleccionado.value == "Semillas"
                            ? unidadGasto.value
                            : null,
                    total:
                        tipoSeleccionado.value == "Semillas"
                            ? totalISGasto.value
                            : null,
                    cantidad:
                        tipoSeleccionado.value == "Semillas"
                            ? cantidadGasto.value
                            : null,
                },
            };

            const r = await useGasto.postGastos(info);
            if (r.status === 200) {
                mostrarFormularioGasto.value = false;
                listarGastos();
            } else if (r.response && r.response.data.errors) {
                r.response.data.errors.forEach((err) => {
                    notify(err.msg);
                });
            } else if (r.response && r.response.data.error) {
                notify(r.response.data.error);
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
                nombre: nombreGasto.value,
                fincas_id: fincaGasto.value.id,
                fecha: fechaGasto.value,
                codigo: codigoGasto.value,
                descripcion: descripcionGasto.value,
                total: totalGasto.value,
                insumos: {
                    id_proveedor:
                        tipoSeleccionado.value == "Insumos"
                            ? proveedorGastos.value.id
                            : null,
                    id_insumos:
                        tipoSeleccionado.value == "Insumos"
                            ? insumoGasto.value.id
                            : null,
                    unidad:
                        tipoSeleccionado.value == "Insumos"
                            ? unidadGasto.value
                            : null,
                    total:
                        tipoSeleccionado.value == "Insumos"
                            ? totalISGasto.value
                            : null,
                    cantidad:
                        tipoSeleccionado.value == "Insumos"
                            ? cantidadGasto.value
                            : null,
                },
                semillas: {
                    id_proveedor:
                        tipoSeleccionado.value == "Semillas"
                            ? proveedorGastos.value.id
                            : null,
                    id_semilla:
                        tipoSeleccionado.value == "Semillas"
                            ? semillaGasto.value.id
                            : null,
                    unidad:
                        tipoSeleccionado.value == "Semillas"
                            ? unidadGasto.value
                            : null,
                    total:
                        tipoSeleccionado.value == "Semillas"
                            ? totalISGasto.value
                            : null,
                    cantidad:
                        tipoSeleccionado.value == "Semillas"
                            ? cantidadGasto.value
                            : null,
                },
            };
            console.log(tipoSeleccionado.value, proveedorGastos.value.id);

            const r = await useGasto.putGastos(datos.value._id, info);
            if (r.status === 200) {
                mostrarFormularioGasto.value = false;
                listarGastos();
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

function validarDatos() {
    let validacion = true;

    if (
        !nombreGasto.value.trim() &&
        !fincaGasto.value &&
        !fechaGasto.value &&
        !codigoGasto.value.trim() &&
        !descripcionGasto.value.trim()
    ) {
        $q.notify({
            color: "negative",
            message: "Todos los campos son obligatorios",
            position: "top",
        });
        validacion = false;
    } else {
        if (!nombreGasto.value.trim()) {
            $q.notify({
                color: "negative",
                message: "El nombre esta vacio",
                position: "top",
            });
            validacion = false;
        }
        if (!fincaGasto.value) {
            $q.notify({
                color: "negative",
                message: "La finca esta vacia",
                position: "top",
            });
            validacion = false;
        }
        if (!fechaGasto.value) {
            $q.notify({
                color: "negative",
                message: "La fecha esta vacia",
                position: "top",
            });
            validacion = false;
        }
        if (!codigoGasto.value) {
            $q.notify({
                color: "negative",
                message: "El codigo esta vacio",
                position: "top",
            });
            validacion = false;
        }
        if (!descripcionGasto.value) {
            $q.notify({
                color: "negative",
                message: "La descripción esta vacia",
                position: "top",
            });
            validacion = false;
        }
    }

    return validacion;
}

function controlFormulario(obj, boolean) {
    nombreGasto.value = "";
    fechaGasto.value = "";
    codigoGasto.value = "";
    descripcionGasto.value = "";
    fincaGasto.value = "";
    proveedorGastos.value = "";
    insumoGasto.value = "";
    semillaGasto.value = "";
    totalGasto.value = "";
    cantidadGasto.value = "";
    totalISGasto.value = "";
    console.log(obj);

    if (obj && obj.insumos.id_proveedor != null)
        tipoSeleccionado.value = "Insumos";
    if (obj && obj.semillas.id_proveedor != null)
        tipoSeleccionado.value = "Semillas";
    console.log(tipoSeleccionado.value);

    datos.value = obj;
    mostrarBotonEditar.value = false;
    if (obj != null && boolean == true) {
        nombreGasto.value = datos.value.nombre;
        fincaGasto.value = opcionesFinca.value.find(
            ({ id }) => id == datos.value.fincas_id._id
        );
        fechaGasto.value = datos.value.fecha.split("T")[0];
        codigoGasto.value = datos.value.codigo;
        descripcionGasto.value = datos.value.descripcion;
        totalGasto.value = datos.value.total;

        if (tipoSeleccionado.value == "Insumos") {
            proveedorGastos.value = opcionesProveedores.value.find(
                ({ id }) => id == datos.value.insumos.id_proveedor._id
            );
            insumoGasto.value = opcionesInsumos.value.find(
                ({ id }) => id == datos.value.insumos.id_insumos._id
            );
            totalISGasto.value = datos.value.insumos.total;
            unidadGasto.value = datos.value.insumos.unidad;
            cantidadGasto.value = datos.value.insumos.cantidad;
        }

        if (tipoSeleccionado.value == "Semillas") {
            proveedorGastos.value = opcionesProveedores.value.find(
                ({ id }) => id == datos.value.semillas.id_proveedor._id
            );
            semillaGasto.value = opcionesSemillas.value.find(
                ({ id }) => id == datos.value.semillas.id_semilla._id
            );
            totalISGasto.value = datos.value.semillas.total;
            unidadGasto.value = datos.value.semillas.unidad;
            cantidadGasto.value = datos.value.semillas.cantidad;
        }

        mostrarBotonEditar.value = true;
    }
    mostrarFormularioGasto.value = boolean;
}
function controlInfo(obj, boolean) {
    if (obj && obj.insumos.id_proveedor != null)
        mostrarInfo.value = "Insumo";
        proveedorGastos.value = obj.insumos.id_proveedor.nombre;
        insumoInfo.value = obj.insumos.id_insumos
    if (obj && obj.semillas.id_proveedor != null)
        mostrarInfo.value = "Semilla";


}

onMounted(() => {
    listarInsumos();
    listarSemillas();
    listarProveedores();
    listarfincas();
    listarGastos();
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
                            <h1 class="text-h4 q-pl-xl text-green-7">Gastos</h1>
                            <q-space />
                            <q-btn
                                size="md"
                                @click="controlFormulario(null, true)"
                                label="Agregar" />
                        </div>
                    </section>
                </template>
                <template v-slot:body-cell-opciones="props">
                    <q-td :props="props">
                        <q-btn @click="controlFormulario(props.row, true)">
                            ✏️
                        </q-btn>
                    </q-td>
                </template>
                <template v-slot:body-cell-informacion="props">
                    <q-td :props="props">
                        <q-btn
                            v-if="
                                props.row.insumos.id_proveedor != null ||
                                props.row.semillas.id_proveedor != null
                            ">
                            👁️
                        </q-btn>
                        <p v-else class="no-margin">N/A</p>
                    </q-td>
                </template>
            </q-table>
        </div>
        <q-dialog v-model="mostrarInformacion">
            <q-card>
                <p>proveedor<span>{{ proveedorInfo }}</span></p>
                <p v-if="mostrarInfo == 'Insumo'">insumo<span>{{ insumoInfo }}</span></p>
                <p v-if="mostrarInfo == 'Semilla'">semilla<span>{{ semillaInfo }}</span></p>
                <p>unidad<span>{{ unidadInfo }}</span></p>
                <p>total<span>{{ totalInfo }}</span></p>
                <p>cantidad<span>{{ cantidadInfo }}</span></p>
            </q-card>
        </q-dialog>
        <q-dialog v-model="mostrarFormularioGasto">
            <q-card>
                <q-form
                    @submit="mostrarBotonEditar ? editar() : registrar()"
                    class="q-gutter-md">
                    <p class="text-h5 text-center q-pb-md text-green">
                        {{ datos ? "Editar" : "Agregar" }} Gasto
                    </p>
                    <q-input
                        standout="bg-green text-white"
                        type="text"
                        label="Codigo"
                        v-model="codigoGasto" />
                    <q-select
                        standout="bg-green text-white"
                        :options="opcionesFinca"
                        label="Finca"
                        v-model="fincaGasto" />
                    <q-input
                        standout="bg-green text-white"
                        type="text"
                        label="Nombre"
                        v-model="nombreGasto" />
                    <q-input
                        standout="bg-green text-white"
                        type="date"
                        label="Fecha"
                        v-model="fechaGasto" />
                    <q-input
                        standout="bg-green text-white"
                        type="text"
                        label="Descripción"
                        v-model="descripcionGasto" />
                    <q-input
                        v-if="
                            tipoSeleccionado != 'Insumos' &&
                            tipoSeleccionado != 'Semillas'
                        "
                        standout="bg-green text-white"
                        type="text"
                        label="Total"
                        v-model="totalGasto" />
                    <!-- Selección de Insumo o Semilla -->
                    <q-select
                        standout="bg-green text-white"
                        :options="['Otro', 'Insumos', 'Semillas']"
                        label="Seleccionar Tipo"
                        v-model="tipoSeleccionado" />
                    <!-- Formulario adicional para agregar datos de insumos/semillas -->
                    <q-select
                        v-if="tipoSeleccionado != 'Otro'"
                        standout="bg-green text-white"
                        label="Proveedor"
                        v-model="proveedorGastos"
                        :options="opcionesProveedores" />
                    <q-select
                        v-if="tipoSeleccionado == 'Insumos'"
                        standout="bg-green text-white"
                        label="Insumo"
                        :options="opcionesInsumos"
                        v-model="insumoGasto" />
                    <q-select
                        v-if="tipoSeleccionado == 'Semillas'"
                        standout="bg-green text-white"
                        label="Semilla"
                        :options="opcionesSemillas"
                        v-model="semillaGasto" />
                    <q-input
                        v-if="tipoSeleccionado != 'Otro'"
                        standout="bg-green text-white"
                        type="text"
                        label="Unidad de medida"
                        v-model="unidadGasto" />
                    <q-input
                        v-if="tipoSeleccionado != 'Otro'"
                        standout="bg-green text-white"
                        type="number"
                        label="Cantidad"
                        v-model="cantidadGasto" />
                    <q-input
                        v-if="tipoSeleccionado != 'Otro'"
                        standout="bg-green text-white"
                        type="number"
                        label="Total"
                        v-model="totalISGasto" />
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
