<script setup>
import { ref, onMounted, computed } from "vue";
import { useStoreElaboracion_sustrato } from "../stores/elaboracion_sustrato.js";

const useSustrato = useStoreElaboracion_sustrato();

const procesos = ref([]);
const empleados = ref([]);
const rows = ref([]);
const columns = ref([
    {
        name: "id_proceso",
        label: "Proceso",
        field: (row) => row.id_proceso.tipo,
        align: "center",
        sortable: true,
    },
    {
        name: "fecha",
        label: "Fecha",
        field: (row) => {
            return row.fecha.split("T")[0];
        },
        align: "center",
    },
    {
        name: "productoComercial",
        label: "Producto Comercial",
        field: "productoComercial",
        align: "center",
        sortable: true,
    },
    {
        name: "ingredienteActivo",
        label: "Ingrediente Activo",
        field: "ingredienteActivo",
        align: "center",
    },
    {
        name: "dosisUtilizada",
        label: "Dosis Utilizada",
        field: "dosisUtilizada",
        align: "center",
    },
    {
        name: "metodoAplicacion",
        label: "Metodo de Aplicacion",
        field: "metodoAplicacion",
        align: "center",
    },
    {
        name: "empleado_idOperario",
        label: "Operario",
        field: (row) =>
            `${row.empleado_idOperario.nombre} (dni: ${row.empleado_idOperario.documento})`,
        align: "center",
    },
    {
        name: "empleado_idResponsable",
        label: "Responsable",
        field: (row) =>
            `${row.empleado_idResponsable.nombre} (dni: ${row.empleado_idResponsable.documento})`,
        align: "center",
    },
    {
        name: "observaciones",
        label: "Observaciones",
        field: "observaciones",
        align: "center",
    },
    {
        name: "opciones",
        label: "Opciones",
        field: "opciones",
        align: "center",
    },
]);

const procesoElaboracionSustrato = ref("");
const fechaElaboracionSustrato = ref("");
const productoComercialElaboracionSustrato = ref("");
const ingredienteActivoElaboracionSustrato = ref("");
const dosisUtilizadaElaboracionSustrato = ref("");
const metodoAplicacionElaboracionSustrato = ref("");
const empleadoOperarioElaboracionSustrato = ref("");
const empleadoResponsableElaboracionSustrato = ref("");
const observacionesElaboracionSustrato = ref("");

const opcionesTabla = ["Todos", "Fechas", "Operario", "Responsable"];
const opcionTabla = ref("Todos");
const fechaInicio = ref("");
const fechaFin = ref("");
const operario = ref("");
const responsable = ref("");

const datos = ref([]);

const mostrarInputFecha = ref(false);
const mostrarSelectOperario = ref(false);
const mostrarSelectResponsable = ref(false);
const mostrarFormularioSustrato = ref(false);
const mostrarBotonEditar = ref(false);
const mostrarInput = ref(false);
const loading = ref(false);

const opcionesProceso = computed(() => {
    return procesos.value.map((p) => {
        return { label: `${p.tipo} (${p.descripcion})`, id: p._id };
    });
});

const opcionesEmpleado = computed(() => {
    return empleados.value.map((e) => {
        return { label: `${e.nombre} (dni: ${e.documento})`, id: e._id };
    });
});

async function listarProcesos() {
    try {
        loading.value = true;
        const r = await useSustrato.getProcesos();
        procesos.value = r.data.procesos;
    } finally {
        loading.value = false;
    }
}

async function listarEmpleados() {
    try {
        loading.value = true;
        const r = await useSustrato.getEmpleados();
        empleados.value = r.data.empleados;
    } finally {
        loading.value = false;
    }
}

async function listarSustratos() {
    try {
        loading.value = true;
        const r = await useSustrato.getSustrato();
        rows.value = r.data.sustratos;
    } finally {
        loading.value = false;
    }
}

async function listarSustratosFechas() {
    if (fechaInicio.value && fechaFin.value) {
        const inicio = new Date(fechaInicio.value);
        const fin = new Date(fechaFin.value);

        if (inicio > fin) {
            $q.notify({
                type: "negative",
                message:
                    "La fecha de inicio no puede ser mayor que la fecha de fin.",
                position: "bottom",
            });
            return;
        }
        try {
            loading.value = true;
            const r = await useSustrato.getSustratoFechas(
                fechaInicio.value,
                fechaFin.value
            );
            rows.value = r.data.sustratos;
        } finally {
            loading.value = false;
        }
    } else {
        $q.notify({
            type: "negative",
            message: "Llena los campos",
            position: "bottom",
        });
    }
}

async function listarSustratosOperario() {
    if (operario.value) {
        try {
            loading.value = true;
            const r = await useSustrato.getSustratoOperario(operario.value.id);
            rows.value = r.data.sustratos;
        } finally {
            loading.value = false;
        }
    } else {
        $q.notify({
            type: "negative",
            message: "Llena el campo",
            position: "bottom",
        });
    }
}

async function listarSustratosResponsable() {
    if (responsable.value) {
        try {
            loading.value = true;
            const r = await useSustrato.getSustratoResponsable(
                responsable.value.id
            );
            rows.value = r.data.sustratos;
        } finally {
            loading.value = false;
        }
    } else {
        $q.notify({
            type: "negative",
            message: "Llena el campo",
            position: "bottom",
        });
    }
}

async function registrar() {
    if (validarDatos()) {
        try {
            loading.value = true;
            const info = {
                id_proceso: procesoElaboracionSustrato.value.id,
                fecha: fechaElaboracionSustrato.value,
                productoComercial: productoComercialElaboracionSustrato.value,
                ingredienteActivo: ingredienteActivoElaboracionSustrato.value,
                dosisUtilizada: dosisUtilizadaElaboracionSustrato.value,
                metodoAplicacion: metodoAplicacionElaboracionSustrato.value,
                empleado_idOperario:
                    empleadoOperarioElaboracionSustrato.value.id,
                empleado_idResponsable:
                    empleadoResponsableElaboracionSustrato.value.id,
                observaciones: observacionesElaboracionSustrato.value,
            };

            const res = await useSustrato.postSustrato(info);
            if (res.status === 200) {
                mostrarFormularioSustrato.value = false;
                listarSustratos();
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
                id_proceso: procesoElaboracionSustrato.value.id,
                fecha: fechaElaboracionSustrato.value,
                productoComercial: productoComercialElaboracionSustrato.value,
                ingredienteActivo: ingredienteActivoElaboracionSustrato.value,
                dosisUtilizada: dosisUtilizadaElaboracionSustrato.value,
                metodoAplicacion: metodoAplicacionElaboracionSustrato.value,
                empleado_idOperario:
                    empleadoOperarioElaboracionSustrato.value.id,
                empleado_idResponsable:
                    empleadoResponsableElaboracionSustrato.value.id,
                observaciones: observacionesElaboracionSustrato.value,
            };

            const res = await useSustrato.putSustrato(datos.value._id, info);
            if (res.status === 200) {
                mostrarFormularioSustrato.value = false;
                listarSustratos();
            }
        } finally {
            loading.value = false;
        }
    }
}

function validarDatos() {
    let validacion = true;
    if (
        !procesoElaboracionSustrato.value &&
        !fechaElaboracionSustrato.value &&
        !productoComercialElaboracionSustrato.value.trim() &&
        !ingredienteActivoElaboracionSustrato.value.trim() &&
        !dosisUtilizadaElaboracionSustrato.value.trim() &&
        !metodoAplicacionElaboracionSustrato.value.trim() &&
        !empleadoOperarioElaboracionSustrato.value &&
        !empleadoResponsableElaboracionSustrato.value &&
        !observacionesElaboracionSustrato.value.trim()
    ) {
        $q.notify({
            type: "negative",
            message: "Llena todos los campos",
            position: "bottom",
        });
        validacion = false;
    } else {
        if (!procesoElaboracionSustrato.value) {
            $q.notify({
                type: "negative",
                message: "Le proceso está vacío",
                position: "bottom",
            });
        }
        if (!fechaElaboracionSustrato.value) {
            $q.notify({
                type: "negative",
                message: "La fecha está vacía",
                position: "bottom",
            });
        }
        if (!productoComercialElaboracionSustrato.value.trim()) {
            $q.notify({
                type: "negative",
                message: "El producto comercial está vacío",
                position: "bottom",
            });
            validacion = false;
        }
        if (!ingredienteActivoElaboracionSustrato.value.trim()) {
            $q.notify({
                type: "negative",
                message: "El ingrediente activo está vacío",
                position: "bottom",
            });
            validacion = false;
        }
        if (!dosisUtilizadaElaboracionSustrato.value.trim()) {
            $q.notify({
                type: "negative",
                message: "La dosis está vacía",
                position: "bottom",
            });
            validacion = false;
        }
        if (!metodoAplicacionElaboracionSustrato.value.trim()) {
            $q.notify({
                type: "negative",
                message: "El método de aplicación está vacío",
                position: "bottom",
            });
            validacion = false;
        }
        if (!empleadoOperarioElaboracionSustrato.value) {
            $q.notify({
                type: "negative",
                message: "El empleado operario está vacío",
                position: "bottom",
            });
        }
        if (!empleadoResponsableElaboracionSustrato.value) {
            $q.notify({
                type: "negative",
                message: "El empleado responsable está vacío",
                position: "bottom",
            });
        }
        if (!observacionesElaboracionSustrato.value.trim()) {
            $q.notify({
                type: "negative",
                message: "Las observaciones están vacías",
                position: "bottom",
            });
            validacion = false;
        }
    }
    return validacion;
}

function controlFormulario(obj, boolean) {
    procesoElaboracionSustrato.value = "";
    fechaElaboracionSustrato.value = "";
    productoComercialElaboracionSustrato.value = "";
    ingredienteActivoElaboracionSustrato.value = "";
    dosisUtilizadaElaboracionSustrato.value = "";
    metodoAplicacionElaboracionSustrato.value = "";
    empleadoOperarioElaboracionSustrato.value = "";
    empleadoResponsableElaboracionSustrato.value = "";
    observacionesElaboracionSustrato.value = "";

    datos.value = obj;
    mostrarBotonEditar.value = false;
    if (obj != null && boolean == true) {
        procesoElaboracionSustrato.value = opcionesProceso.value.find(
            (p) => p.id == datos.value.id_proceso._id
        );
        fechaElaboracionSustrato.value = datos.value.fecha.split("T")[0];
        productoComercialElaboracionSustrato.value =
            datos.value.productoComercial;
        ingredienteActivoElaboracionSustrato.value =
            datos.value.ingredienteActivo;
        dosisUtilizadaElaboracionSustrato.value = String(
            datos.value.dosisUtilizada
        );
        metodoAplicacionElaboracionSustrato.value =
            datos.value.metodoAplicacion;
        empleadoOperarioElaboracionSustrato.value = opcionesEmpleado.value.find(
            (e) => e.id == datos.value.empleado_idOperario._id
        );
        empleadoResponsableElaboracionSustrato.value =
            opcionesEmpleado.value.find(
                (e) => e.id == datos.value.empleado_idResponsable._id
            );
        observacionesElaboracionSustrato.value = datos.value.observaciones;

        mostrarBotonEditar.value = true;
    }
    mostrarFormularioSustrato.value = boolean;
}

function estadoTabla() {
    if (opcionTabla.value == "Fechas") {
        mostrarInputFecha.value = true;
        mostrarSelectResponsable.value = false;
        mostrarSelectOperario.value = false;
        mostrarInput.value = true;
    } else if (opcionTabla.value == "Operario") {
        mostrarInputFecha.value = false;
        mostrarSelectResponsable.value = false;
        mostrarSelectOperario.value = true;
        mostrarInput.value = true;
    } else if (opcionTabla.value == "Responsable") {
        mostrarInputFecha.value = false;
        mostrarSelectResponsable.value = true;
        mostrarSelectOperario.value = false;
        mostrarInput.value = true;
    } else {
        mostrarInputFecha.value = false;
        mostrarSelectResponsable.value = false;
        mostrarSelectOperario.value = false;
        mostrarInput.value = false;
        listarSustratos();
    }
}

onMounted(() => {
    listarProcesos();
    listarEmpleados();
    listarSustratos();
});
</script>

<template>
    <div>
        <div>
            <q-btn @click="controlFormulario(null, true)" label="Agregar" />
        </div>
        <div class="q-pa-xl">
            <q-table
                flat
                bordered
                title="Climas"
                :rows="rows"
                :columns="columns"
                row-key="id">
                <template v-slot:top>
                    <div class="row items-center q-gutter-md">
                        <q-select
                            v-if="mostrarSelectResponsable"
                            label="Responsable"
                            :options="opcionesEmpleado"
                            v-model="responsable" />
                        <q-select
                            v-if="mostrarSelectOperario"
                            label="Responsable"
                            :options="opcionesEmpleado"
                            v-model="operario" />
                        <q-input
                            v-if="mostrarInputFecha"
                            label="Fecha Inicio"
                            type="date"
                            v-model="fechaInicio" />
                        <q-input
                            v-if="mostrarInputFecha"
                            label="Fecha Fin"
                            type="date"
                            v-model="fechaFin" />
                        <q-btn
                            v-if="mostrarInput"
                            @click="
                                mostrarInputFecha
                                    ? listarSustratosFechas()
                                    : mostrarSelectResponsable
                                    ? listarSustratosResponsable()
                                    : mostrarSelectOperario
                                    ? listarSustratosOperario()
                                    : mostrarInputProceso
                                    ? listarSustratosProceso()
                                    : ''
                            "
                            label="Buscar" />
                    </div>
                    <q-space />
                    <q-select
                        standout="bg-green text-while"
                        :options="opcionesTabla"
                        v-model="opcionTabla"
                        @update:model-value="estadoTabla" />
                </template>
                <template v-slot:body-cell-opciones="props">
                    <q-td :props="props">
                        <q-btn @click="controlFormulario(props.row, true)">
                            ✏️
                        </q-btn>
                    </q-td>
                </template>
            </q-table>
        </div>
        <q-dialog v-model="mostrarFormularioSustrato">
            <q-card>
                <q-form
                    @submit="mostrarBotonEditar ? editar() : registrar()"
                    class="q-gutter-md">
                    <q-select
                        standout="bg-green text-while"
                        :options="opcionesProceso"
                        v-model="procesoElaboracionSustrato"
                        label="Proceso" />
                    <q-input
                        standout="bg-green text-while"
                        type="date"
                        v-model="fechaElaboracionSustrato"
                        label="Fecha" />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        v-model="productoComercialElaboracionSustrato"
                        label="Producto Comercial" />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        v-model="ingredienteActivoElaboracionSustrato"
                        label="Ingrediente Activo" />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        v-model="dosisUtilizadaElaboracionSustrato"
                        label="Dosis Utilizada" />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        v-model="metodoAplicacionElaboracionSustrato"
                        label="Metodo de Aplicacion" />
                    <q-select
                        standout="bg-green text-while"
                        :options="opcionesEmpleado"
                        v-model="empleadoOperarioElaboracionSustrato"
                        label="Operario" />
                    <q-select
                        standout="bg-green text-while"
                        :options="opcionesEmpleado"
                        v-model="empleadoResponsableElaboracionSustrato"
                        label="Responsable" />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        v-model="observacionesElaboracionSustrato"
                        label="Observaciones" />
                    <div>
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
.q-form .q-select {
    margin-bottom: 15px;
}
</style>
