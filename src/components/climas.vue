<script setup>
import { ref, onMounted, computed } from "vue";
import { useStoreClimas } from "../stores/climas.js";
import { useQuasar } from "quasar";

const $q = useQuasar();

const useClima = useStoreClimas();

const opcionesTabla = ["Todos", "Climas", "Fechas"];
const tiposDeClima = [
    "Soleado",
    "Nublado",
    "Lluvioso",
    "Tormentoso",
    "Ventoso",
    "Nevado",
    "Húmedo",
    "Seco",
    "Frío",
    "Caluroso",
];
const fincas = ref([]);
const empleados = ref([]);
const rows = ref([]);
const columns = ref([
    {
        name: "finca_id",
        label: "Finca",
        field: (row) => `${row.finca_id.nombre} (rut: ${row.finca_id.rut})`,
        align: "center",
        sortable: true,
    },
    {
        name: "empleado_id",
        label: "Empleado",
        field: (row) =>
            `${row.empleado_id.nombre} (dni: ${row.empleado_id.documento})`,
        align: "center",
    },
    {
        name: "fecha",
        label: "Fecha",
        field: (row) => {
            return row.fecha.split("T")[0];
        },
        align: "center",
        sortable: true,
    },
    {
        name: "tipoClima",
        label: "Clima",
        field: "tipoClima",
        align: "center",
    },
    {
        name: "horaInicio",
        label: "Hora Inicial",
        field: "horaInicio",
        align: "center",
        sortable: true,
    },
    {
        name: "horaFinal",
        label: "Hora Final",
        field: "horaFinal",
        align: "center",
        sortable: true,
    },
    {
        name: "temperaturaMaxima",
        label: "Temperatura Maxima",
        field: "temperaturaMaxima",
        align: "center",
        sortable: true,
    },
    {
        name: "temperaturaMinima",
        label: "Temperatura Minima",
        field: "temperaturaMinima",
        align: "center",
        sortable: true,
    },
    {
        name: "opciones",
        label: "Opciones",
        field: "opciones",
        align: "center",
    },
]);

// Variables necesarias en el formulario
const fincaClima = ref("");
const empleadoClima = ref("");
const fechaClima = ref("");
const tipoClima = ref("");
const horaInicioClima = ref("");
const horaFinClima = ref("");
const temperaturaMaximaClima = ref("");
const temperaturaMinimaClima = ref("");

// Varibale que controla lo que se mostrara en la tabla
const opcionTabla = ref("Todos");

const clima = ref("");
const fecha = ref("");

// Variable que contiene los datos de la persona al editar
const datos = ref([]);

// Variables que controlar no que se va a mostrar en la pantalla
const mostraInput = ref(false);
const mostrarSelectClimas = ref(false);
const mostrarInputFecha = ref(false);
const mostrarFormularioClima = ref(false);
const mostrarBotonEditar = ref(false);
const loading = ref(true);

const opcionesFincas = computed(() => {
    return fincas.value.map((f) => {
        return { label: `${f.nombre} (rut: ${f.rut})`, id: `${f._id}` };
    });
});

const opcionesEmpleados = computed(() => {
    return empleados.value.map((emp) => {
        return { label: `${emp.nombre} (dni: ${emp.documento})`, id: emp._id };
    });
});

async function listarFincas() {
    try {
        loading.value = true;
        const r = await useClima.getFincas();
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
        fincas.value = r.data.fincas;
    } finally {
        loading.value = false;
    }
}

async function listarEmpleados() {
    try {
        loading.value = true;
        const r = await useClima.getEmpleados();
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
        empleados.value = r.data.empleados;
    } finally {
        loading.value = false;
    }
}

async function listarClimas() {
    try {
        const r = await useClima.getClimas();
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
        rows.value = r.data.climas;
    } catch (error) {
        console.log(error.message);
    }
}

async function listarClimasPorClima() {
    try {
        loading.value;
        const r = await useClima.getClimasPorClimas(clima.value);
        rows.value = r.data.climas;
    } finally {
        loading.value;
    }
}

async function listarClimasFechas() {
    try {
        loading.value;
        const r = await useClima.getClimasFechas(fecha.value);
        rows.value = r.data.climas;
    } finally {
        loading.value;
    }
}

async function registrar() {
    if (validarDatos()) {
        try {
            loading.value = true;
            const info = {
                finca_id: fincaClima.value.id,
                empleado_id: empleadoClima.value.id,
                fecha: fechaClima.value,
                tipoClima: tipoClima.value,
                horaInicio: horaInicioClima.value,
                horaFinal: horaFinClima.value,
                temperaturaMaxima: temperaturaMaximaClima.value,
                temperaturaMinima: temperaturaMinimaClima.value,
            };

            const r = await useClima.postClimas(info);
            if (r.status == 200) {
                mostrarFormularioClima.value = false;
                listarClimas();
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
                finca_id: fincaClima.value.id,
                empleado_id: empleadoClima.value.id,
                fecha: fechaClima.value,
                tipoClima: tipoClima.value,
                horaInicio: horaInicioClima.value,
                horaFinal: horaFinClima.value,
                temperaturaMaxima: temperaturaMaximaClima.value,
                temperaturaMinima: temperaturaMinimaClima.value,
            };
            console.log(info);

            const r = await useClima.putClimas(datos.value._id, info);
            if (r.status == 200) {
                mostrarFormularioClima.value = false;
                listarClimas();
            }
        } finally {
            loading.value = false;
        }
    }
}

function validarDatos() {
    let validacion = true;

    if (
        !fincaClima.value &&
        !empleadoClima.value &&
        !fechaClima.value &&
        !tipoClima.value &&
        !horaInicioClima.value &&
        !horaFinClima.value &&
        !temperaturaMaximaClima.value.trim() &&
        !temperaturaMinimaClima.value.trim()
    ) {
        $q.notify({
            type: "negative",
            message: "Llena todos los campos",
            position: "bottom",
        });

        validacion = false;
    } else {
        if (!fincaClima.value) {
            $q.notify({
                type: "negative",
                message: "La finca esta vacia",
                position: "bottom",
            });

            validacion = false;
        }
        if (!empleadoClima.value) {
            $q.notify({
                type: "negative",
                message: "El empleado esta vacio",
                position: "bottom",
            });

            validacion = false;
        }
        if (!fechaClima.value) {
            $q.notify({
                type: "negative",
                message: "La fecha esta vacia",
                position: "bottom",
            });

            validacion = false;
        }
        if (!tipoClima.value) {
            $q.notify({
                type: "negative",
                message: "El tipo del clima esta vacio",
                position: "bottom",
            });

            validacion = false;
        }
        if (!horaInicioClima.value) {
            $q.notify({
                type: "negative",
                message: "La hora inicio esta vacia",
                position: "bottom",
            });

            validacion = false;
        }
        if (!horaFinClima.value) {
            $q.notify({
                type: "negative",
                message: "La hora fin esta vacia",
                position: "bottom",
            });

            validacion = false;
        }
        if (!temperaturaMaximaClima.value) {
            $q.notify({
                type: "negative",
                message: "La temperatura maxima esta vacia",
                position: "bottom",
            });

            validacion = false;
        }
        if (!temperaturaMinimaClima.value) {
            $q.notify({
                type: "negative",
                message: "La temperatura minima esta vacia",
                position: "bottom",
            });

            validacion = false;
        }
    }

    return validacion;
}

function controlFormulario(obj, boolean) {
    fincaClima.value = "";
    empleadoClima.value = "";
    fechaClima.value = "";
    tipoClima.value = "";
    horaInicioClima.value = "";
    horaFinClima.value = "";
    temperaturaMaximaClima.value = "";
    temperaturaMinimaClima.value = "";

    datos.value = obj;
    mostrarBotonEditar.value = false;
    if (obj != null && boolean == true) {
        fincaClima.value = opcionesFincas.value.find(
            (f) => f.id == datos.value.finca_id._id
        );
        empleadoClima.value = opcionesEmpleados.value.find(
            (e) => e.id == datos.value.empleado_id._id
        );
        fechaClima.value = datos.value.fecha.split("T")[0];
        tipoClima.value = datos.value.tipoClima;
        horaInicioClima.value = datos.value.horaInicio;
        horaFinClima.value = datos.value.horaFinal;
        temperaturaMaximaClima.value = datos.value.temperaturaMaxima;
        temperaturaMinimaClima.value = datos.value.temperaturaMinima;

        mostrarBotonEditar.value = true;
    }
    mostrarFormularioClima.value = boolean;
}

function estadoTabla() {
    if (opcionTabla.value == "Climas") {
        mostrarInputFecha.value = false;
        mostrarSelectClimas.value = true;
        mostraInput.value = true;
    } else if (opcionTabla.value == "Fechas") {
        mostrarSelectClimas.value = false;
        mostrarInputFecha.value = true;
        mostraInput.value = true;
    } else {
        mostrarSelectClimas.value = false;
        mostrarInputFecha.value = false;
        mostraInput.value = false;
        listarClimas();
    }
}

onMounted(() => {
    listarFincas();
    listarEmpleados();
    listarClimas();
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
                            <h1 class="text-h4 q-pl-xl text-green-7">Climas</h1>
                            <q-space />
                            <q-btn
                                size="md"
                                @click="controlFormulario(null, true)"
                                label="Agregar" />
                        </div>
                        <div class="row items-center q-pb-md">
                            <q-space />
                            <div class="row q-pr-xl q-gutter-lg">
                                <q-select
                                    standout
                                    style="width: 300px"
                                    v-if="mostrarSelectClimas"
                                    label="Responsable"
                                    :options="tiposDeClima"
                                    v-model="clima" />
                                <q-input
                                    standout
                                    v-if="mostrarInputFecha"
                                    label="Fecha"
                                    type="date"
                                    v-model="fecha" />
                                <q-btn
                                    v-if="mostraInput"
                                    @click="
                                        mostrarInputFecha
                                            ? listarClimasFechas()
                                            : mostrarSelectClimas
                                            ? listarClimasPorClima()
                                            : ''
                                    "
                                    label="Buscar" />
                            </div>
                            <q-select
                                style="width: 200px"
                                standout="bg-green text-while"
                                :options="opcionesTabla"
                                v-model="opcionTabla"
                                label="Filtro por"
                                @update:model-value="estadoTabla" />
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
            </q-table>
        </div>
        <q-dialog v-model="mostrarFormularioClima">
            <q-card>
                <q-form
                    @submit="mostrarBotonEditar ? editar() : registrar()"
                    class="q-gutter-sm">
                    <p class="text-h5 text-center q-pb-md text-green">
                        {{ datos ? "Editar" : "Agregar" }} Climas
                    </p>
                    <q-select
                        standout="bg-green text-while"
                        :options="opcionesFincas"
                        option-label="label"
                        option-value="id"
                        label="Finca"
                        v-model="fincaClima" />
                    <q-select
                        standout="bg-green text-while"
                        :options="opcionesEmpleados"
                        option-label="label"
                        option-value="id"
                        label="Empleado"
                        v-model="empleadoClima" />
                    <q-input
                        standout="bg-green text-while"
                        type="date"
                        label="Fecha"
                        v-model="fechaClima" />
                    <q-select
                        standout="bg-green text-while"
                        :options="tiposDeClima"
                        label="Tipo de Clima"
                        v-model="tipoClima" />
                    <q-input
                        standout="bg-green text-while"
                        type="time"
                        label="Hora de Inicio"
                        v-model="horaInicioClima" />
                    <q-input
                        standout="bg-green text-while"
                        type="time"
                        label="Hora de Fin"
                        v-model="horaFinClima" />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Temperatura Maxima"
                        v-model="temperaturaMaximaClima" />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Temperatura Minima"
                        v-model="temperaturaMinimaClima" />
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
.q-form .q-select {
    margin-bottom: 15px;
}
</style>
