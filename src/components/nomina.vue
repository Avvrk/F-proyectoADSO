<script setup>
import { LoadingBar } from "quasar";
import { ref, onMounted, computed } from "vue";
import { useStoreNomina } from "../stores/nomina.js";
import notify from "../utils/notificaciones.js";

// Variables usadas en el filtro
const opcionesTabla = ["Todos", "Fechas", "Empleados"];
const opcion = ref("Todos");
const empleado = ref("");
const fechaInicio = ref("");
const fechaFin = ref("");

const useNomina = useStoreNomina();

const empleados = ref([]);

const rows = ref([]);
const columns = [
    {
        name: "fecha",
        label: "Fecha",
        align: "center",
        field: (row) => row.fecha.split("T")[0],
    },
    {
        name: "id_empleado",
        label: "Empleado",
        align: "center",
        field: (row) =>
            `${row.id_empleado.nombre} (DNI: ${row.id_empleado.documento})`,
    },
    { name: "tipo", label: "Tipo", align: "center", field: "tipo" },
    {
        name: "valor",
        label: "Valor",
        align: "center",
        field: "valor",
        format: (val) => `$${val.toFixed(2)}`,
    },
    { name: "actions", label: "Acciones", align: "center" },
];

const fechaNomina = ref("");
const empleadoNomina = ref("");
const tipoNomina = ref("");
const valorNomina = ref("");

const datos = ref({});

const mostrarSelectEmpleados = ref(false);
const mostrarInputFechas = ref(false);
const mostrarInput = ref(false);
const mostrarFormularioNomina = ref(false);
const mostrarBotonEditar = ref(false);
const loading = ref(false);

const opcionesEmpleado = computed(() => {
    return empleados.value.map((e) => ({
        label: `${e.nombre} (dni: ${e.documento})`,
        id: e._id,
    }));
});

async function listarNomina() {
    try {
        loading.value = true;
        const r = await useNomina.getNomina();
        rows.value = r.data.nomina;
    } finally {
        loading.value = false;
    }
}

async function listarEmpleados() {
    try {
        loading.value = true;
        const r = await useNomina.getEmpleados();
        empleados.value = r.data.empleados;
    } finally {
        loading.value = false;
    }
}

async function registrar() {
    if (validarDatos()) {
        const info = {
            fecha: fechaNomina.value,
            id_empleado: empleadoNomina.value,
            tipo: tipoNomina.value,
            valor: valorNomina.value,
        };

        const r = await useNomina.postNomina(info);
        if (r.status == 200) {
            mostrarFormularioNomina.value = false;
            listarNomina();
        } else if (r.response && r.response.data.errors) {
            r.response.data.errors.forEach((err) => {
                notify(err.msg);
            });
        }
    }
}

async function editar() {
    if (validarDatos()) {
        const info = {
            fecha: fechaNomina.value,
            id_empleado: empleadoNomina.value,
            tipo: tipoNomina.value,
            valor: valorNomina.value,
        };

        const r = await useNomina.putNomina(datos.value._id, info);
        if (r.status == 200) {
            mostrarFormularioNomina.value = false;
            listarNomina();
        } else if (r.response && r.response.data.errors) {
            r.response.data.errors.forEach((err) => {
                notify(err.msg);
            });
        }
    }
}

async function listarNominaFechas() {
    if (fechaInicio.value && fechaFin.value) {
        const inicio = new Date(fechaInicio.value);
        const fin = new Date(fechaFin.value);

        if (inicio > fin) {
            notify("La fecha de inicio no puede ser mayor que la fecha de fin.")
            return;
        }
        try {
            loading.value = true;
            const r = await useNomina.getNominaFechas(
                fechaInicio.value,
                fechaFin.value
            );
            rows.value = r.data.nomina;
        } finally {
            loading.value = false;
        }
    } else {
        Notify.create({
            type: "negative",
            message: "Llena los campos",
            position: "bottom",
        });
    }
}

async function listarNominaEmpleados() {
    try {
        if (empleado.value) {
            loading.value = true;
            const r = await useNomina.getNominaEmpleados(empleado.value.id);
            rows.value = r.data.nomina;
        } else {
            Notify.create({
                type: "negative",
                message: "Complete el campo",
                position: "bottom",
            });
        }
    } finally {
        loading.value = false;
    }
}

function estadoTabla() {
    if (opcion.value == "Fechas") {
        mostrarSelectEmpleados.value = false;
        mostrarInputFechas.value = true;
        mostrarInput.value = true;
    } else if (opcion.value == "Empleados") {
        mostrarInputFechas.value = false;
        mostrarSelectEmpleados.value = true;
        mostrarInput.value = true;
    } else {
        mostrarInputFechas.value = false;
        mostrarSelectEmpleados.value = false;
        mostrarInput.value = false;
        loadNominas();
    }
}

onMounted(() => {
    loadNominas();
    loadEmpleados();
});
</script>

<template>
    <div>
        <div class="q-pa-lg">
            <q-table
                :rows="rows"
                :columns="columns"
                row-key="_id"
                :loading="loading">
                <template v-slot:top>
                    <section class="column full-width q-pr-md">
                        <div class="row items-center">
                            <h1 class="text-h4 q-pl-xl text-green-7">
                                Gestión De Nómina
                            </h1>
                            <q-space />
                            <q-btn
                                size="md"
                                @click="dialogAddNomina = true"
                                label="Agregar"
                                class="add-btn" />
                        </div>
                        <div class="row items-center q-pb-md">
                            <q-space />
                            <q-select
                                style="width: 200px"
                                standout="bg-green text-white"
                                v-model="opcion"
                                :options="opcionesTabla"
                                label="Filtrar por"
                                @update:model-value="estadoTabla"
                                class="filter-select" />
                            <q-input
                                v-if="mostrarInputFechas"
                                type="date"
                                label="Fecha Inicio"
                                v-model="fechaInicio"
                                class="q-mr-sm" />
                            <q-input
                                v-if="mostrarInputFechas"
                                type="date"
                                label="Fecha Fin"
                                v-model="fechaFin"
                                class="q-mr-sm" />
                            <q-btn
                                v-if="mostrarInput"
                                label="Buscar"
                                @click="
                                    mostrarInputFechas
                                        ? listarNominaFechas()
                                        : mostrarSelectEmpleados
                                        ? listarNominaEmpleados()
                                        : ''
                                "
                                class="search-btn" />
                        </div>
                    </section>
                </template>
                <template v-slot:body-cell-actions="props">
                    <q-td
                        :props="props"
                        class="row justify-center"
                        style="gap: 20px">
                        <q-btn
                            @click="editNominaData(props.row, true)"
                            color="white"
                            class="q-mr-sm">
                            ✏️
                        </q-btn>
                    </q-td>
                </template>
            </q-table>
        </div>

        <!-- Dialog para agregar nómina -->
        <!-- Dialog para agregar nómina -->
        <q-dialog v-model="dialogAddNomina" persistent>
            <q-card>
                <q-form @submit="addNomina" class="q-gutter-sm">
                    <p class="text-h5 text-center q-pb-md text-green">
                        Agregar Nómina
                    </p>
                    <q-input
                        filled
                        type="date"
                        label="Fecha"
                        v-model="newNomina.fecha" />
                    <q-select
                        filled
                        :options="opcionesEmpleado"
                        v-model="newNomina.id_empleado"
                        option-value="id"
                        option-label="label"
                        label="Empleado" />
                    <q-select
                        filled
                        :options="['Salario', 'Bonificación', 'Otros']"
                        v-model="newNomina.tipo"
                        label="Tipo" />
                    <q-input
                        filled
                        type="number"
                        label="Valor"
                        v-model="newNomina.valor" />
                    <div class="row justify-end" style="gap: 10px">
                        <q-btn
                            unelevated
                            label="Agregar"
                            type="submit"
                            color="positive" />
                        <q-btn
                            @click="dialogAddNomina = false"
                            flat
                            class="bg-red text-white"
                            label="Cerrar"
                            type="button" />
                    </div>
                </q-form>
            </q-card>
        </q-dialog>

        <!-- Dialog para editar nómina -->
        <q-dialog v-model="dialogEditNomina" persistent>
            <q-card>
                <q-form @submit="updateNomina" class="q-gutter-sm">
                    <p class="text-h5 text-center q-pb-md text-green">
                        Editar Nómina
                    </p>
                    <q-input
                        filled
                        type="date"
                        label="Fecha"
                        v-model="editNomina.fecha" />
                    <q-select
                        filled
                        :options="opcionesEmpleado"
                        v-model="editNomina.id_empleado"
                        option-value="id"
                        option-label="label"
                        label="Empleado" />
                    <q-select
                        filled
                        :options="['Salario', 'Bonificación', 'Otros']"
                        v-model="editNomina.tipo"
                        label="Tipo" />
                    <q-input
                        filled
                        type="number"
                        label="Valor"
                        v-model="editNomina.valor" />
                    <div class="row justify-end" style="gap: 10px">
                        <q-btn
                            unelevated
                            label="Actualizar"
                            type="submit"
                            color="positive" />
                        <q-btn
                            @click="dialogEditNomina = false"
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
    padding: 40px 30px;
    border-radius: 8px;
    width: 30rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border: 0;
}

.q-form .q-input,
.q-form .q-select {
    margin-bottom: 15px;
}

.q-btn[unelevated] {
    background-color: #43a047;
    color: white;
}

.q-btn.flat.bg-red.text-white {
    background-color: #e53935;
    color: white;
}
</style>
