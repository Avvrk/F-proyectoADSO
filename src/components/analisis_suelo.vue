<script setup>
import { ref, onMounted, computed } from "vue";
import { useStoreAnalisisSuelos } from "../stores/analisis_suelo.js";
import { useQuasar } from "quasar";

const $q = useQuasar();

const useAnalisisSuelo = useStoreAnalisisSuelos();

const opcionesTabla = [
    "Todos",
    "Activos",
    "Inactivos",
    "Fechas",
    "Responsable",
];
const parcelas = ref([]);
const empleados = ref([]);
const rows = ref([]);
const columns = ref([
    {
        name: "fecha",
        label: "Fecha",
        field: (row) => {
            const fechaa = `${row.fecha}`;
            return fechaa.split("T")[0];
        },
        align: "center",
        sortable: true,
    },
    {
        name: "id_parcela",
        label: "Parcela",
        field: (row) =>
            `${row.id_parcela.numero} (${row.id_parcela.id_fincas.nombre})`,
        align: "center",
    },
    {
        name: "empleado_id",
        label: "Empleado",
        field: (row) =>
            `${row.empleado_id.nombre} (DNI: ${row.empleado_id.documento})`,
        align: "center",
        sortable: true,
    },
    {
        name: "muestra",
        label: "Muestra",
        field: "muestra",
        align: "center",
    },
    {
        name: "laboratorio",
        label: "Laboratorio",
        field: "laboratorio",
        align: "center",
        sortable: true,
    },
    {
        name: "resultados",
        label: "Resultados",
        field: "resultados",
        align: "center",
        sortable: true,
    },
    {
        name: "recomendaciones",
        label: "Recomendaciones",
        field: "recomendaciones",
        align: "center",
        sortable: true,
    },
    {
        name: "estado",
        label: "Estado",
        field: "estado",
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

const fechaAnalisisSuelo = ref("");
const parcelaAnalisisSuelo = ref("");
const empleadoAnalisisSuelo = ref("");
const muestraAnalisisSuelo = ref("");
const cultivoAnalisisSuelo = ref("");
const laboratorioAnalisisSuelo = ref("");
const resultadosAnalisisSuelo = ref("");
/* let resultadosAnalisisSuelo = []; */
const recomendacionesAnalisisSuelo = ref("");
/* const nuevoResultado = ref(""); */

const opcionTabla = ref("Todos");

const fechaInicio = ref("");
const fechaFin = ref("");
const responsable = ref("");

const datos = ref([]);

const mostrarFormularioAnalisisSuelo = ref(false);
const mostrarBotonEditar = ref(false);
const mostrarInputFecha = ref(false);
const mostrarSelectResponsable = ref(false);
const mostraInput = ref(false);
const loading = ref(true);

const opcionesResponsables = computed(() => {
    return empleados.value.filter(({estado}) => estado === 1).filter(({rol}) => rol === "Empleado").map((e) => {
        return { label: `${e.nombre} (correo: ${e.correo})`, id: e._id };
    });

});

const opcionesParcelas = computed(() => {
    return parcelas.value.map((par) => {
        return {
            label: `${par.numero} (${par.id_fincas.nombre})`,
            id: par._id,
        };
    });
});

/* function agregarResultado() {
    if (nuevoResultado.value.trim()) {
        resultadosAnalisisSuelo.push(nuevoResultado.value.trim());
        nuevoResultado.value = ""; // Limpiar el input
    } else {
        $q.notify({
            type: "negative",
            message: "El resultado no puede estar vacío",
            position: "bottom",
        });
    }
} */

async function listarEmpleado() {
    try {
        loading.value = true;
        const r = await useAnalisisSuelo.getEmpleado();
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
        empleados.value = r.data.admins;
    } finally {
        loading.value = false;
    }
}

async function listarParcela() {
    try {
        loading.value = true;
        const r = await useAnalisisSuelo.getParcela();
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
        parcelas.value = r.data.parcelas;
    } finally {
        loading.value = false;
    }
}

async function listarAnalisisSuelo() {
    try {
        loading.value = true;
        const r = await useAnalisisSuelo.getAnalisisSuelo();
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
        rows.value = r.data.suelos;
    } finally {
        loading.value = false;
    }
}

async function listarAnalisisSueloActivo() {
    try {
        loading.value = true;
        const r = await useAnalisisSuelo.getAnalisisSueloActivos();
        rows.value = r.data.suelos;
    } finally {
        loading.value = false;
    }
}

async function listarAnilisasSueloInactivo() {
    try {
        loading.value = true;
        const r = await useAnalisisSuelo.getAnalisisSueloInactivos();
        rows.value = r.data.suelos;
    } finally {
        loading.value = false;
    }
}

async function listarAnalisisSueloFechas() {
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
            const r = await useAnalisisSuelo.getAnalisisSueloFechas(
                fechaInicio.value,
                fechaFin.value
            );
            rows.value = r.data.suelos;
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

async function listarAnalisisSueloResponsable() {
    if (responsable.value) {
        try {
            loading.value = true;
            const r = await useAnalisisSuelo.getAnalisisSueloResponsable(
                responsable.value.id
            );
            rows.value = r.data.suelos;
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

async function editarEstado(elemento) {
    try {
        loading.value = true;
        if (elemento.estado === 1) {
            const res = await useAnalisisSuelo.putAnalisisSueloInactivar(
                elemento._id
            );
        } else if (elemento.estado === 0) {
            const res = await useAnalisisSuelo.putAnalisisSueloActivar(
                elemento._id
            );
        }
        listarAnalisisSuelo();
    } finally {
        loading.value = false;
    }
}

async function registrar() {
    if (validarDatos()) {
        try {
            loading.value = true;
            const info = {
                fecha: fechaAnalisisSuelo.value,
                id_parcela: parcelaAnalisisSuelo.value.id,
                empleado_id: empleadoAnalisisSuelo.value.id,
                muestra: muestraAnalisisSuelo.value,
                cultivo: cultivoAnalisisSuelo.value,
                laboratorio: laboratorioAnalisisSuelo.value,
                resultados: resultadosAnalisisSuelo.value.split(',').map(r => r.trim()),
                recomendaciones: recomendacionesAnalisisSuelo.value,
            };

            const res = await useAnalisisSuelo.postAnalisisSuelo(info);
            if (res.status === 200) {
                mostrarFormularioAnalisisSuelo.value = false;
                listarAnalisisSuelo();
            }
        } finally {
            loading.value = false;
        }
    }
}

async function editar() {
console.log(resultadosAnalisisSuelo.value.split(','))
    if (validarDatos()) {
        try {
            loading.value = true;
            const info = {
                fecha: fechaAnalisisSuelo.value,
                id_parcela: parcelaAnalisisSuelo.value.id,
                empleado_id: empleadoAnalisisSuelo.value.id,
                muestra: muestraAnalisisSuelo.value,
                cultivo: cultivoAnalisisSuelo.value,
                laboratorio: laboratorioAnalisisSuelo.value,
                resultados: resultadosAnalisisSuelo.value.split(',').map(r => r.trim()),
                recomendaciones: recomendacionesAnalisisSuelo.value,
            };

            const res = await useAnalisisSuelo.putAnalisisSuelo(
                datos.value._id,
                info
            );
            if (res.status === 200) {
                mostrarFormularioAnalisisSuelo.value = false;
                listarAnalisisSuelo();
            }
        } finally {
            loading.value = false;
        }
    }
}

function validarDatos() {
    alert(resultadosAnalisisSuelo.value);
    
    let validacion = true;
    if (
        !fechaAnalisisSuelo.value &&
        !parcelaAnalisisSuelo.value &&
        !empleadoAnalisisSuelo.value &&
        !muestraAnalisisSuelo.value.trim() &&
        !cultivoAnalisisSuelo.value.trim() &&
        !laboratorioAnalisisSuelo.value.trim() &&
        !resultadosAnalisisSuelo.value.trim() &&
        !recomendacionesAnalisisSuelo.value.trim()
    ) {
        $q.notify({
            type: "negative",
            message: "Llena todos los campos",
            position: "bottom",
        });
        validacion = false;
    } else {
        if (!fechaAnalisisSuelo.value) {
            $q.notify({
                type: "negative",
                message: "La fecha esta vacia",
                position: "bottom",
            });
            validacion = false;
        }
        if (!parcelaAnalisisSuelo.value) {
            $q.notify({
                type: "negative",
                message: "La parcela esta vacia",
                position: "bottom",
            });
            validacion = false;
        }
        if (!empleadoAnalisisSuelo.value) {
            $q.notify({
                type: "negative",
                message: "El empleado esta vacio",
                position: "bottom",
            });
            validacion = false;
        }
        if (!muestraAnalisisSuelo.value.trim()) {
            $q.notify({
                type: "negative",
                message: "La muestra esta vacia",
                position: "bottom",
            });
            validacion = false;
        }
        if (!cultivoAnalisisSuelo.value.trim()) {
            $q.notify({
                type: "negative",
                message: "El cultivo esta vacio",
                position: "bottom",
            });
            validacion = false;
        }
        if (!laboratorioAnalisisSuelo.value.trim()) {
            $q.notify({
                type: "negative",
                message: "El laboratorio esta vacio",
                position: "bottom",
            });
            validacion = false;
        }
        if (!resultadosAnalisisSuelo.value.trim()) {
            $q.notify({
                type: "negative",
                message: "El resultado esta vacio",
                position: "bottom",
            });
            validacion = false;
        }
        if (!recomendacionesAnalisisSuelo.value.trim()) {
            $q.notify({
                type: "negative",
                message: "La recomendacion esta vacia",
                position: "bottom",
            });
            validacion = false;
        }
    }
    return validacion;
}

function controlFormulario(obj, boolean) {
    datos.value = obj;
    mostrarBotonEditar.value = false;
    if (obj != null && boolean == true) {
        const par = opcionesParcelas.value;
        const em = opcionesResponsables.value;
        // const r = datos.value.resultados;

        fechaAnalisisSuelo.value = datos.value.fecha.split("T")[0];
        parcelaAnalisisSuelo.value = par.find(
            (as) => as.id == datos.value.id_parcela._id
        );
        empleadoAnalisisSuelo.value = em.find(
            (as) => as.id == datos.value.empleado_id._id
        );
        muestraAnalisisSuelo.value = datos.value.muestra;
        cultivoAnalisisSuelo.value = datos.value.cultivo;
        laboratorioAnalisisSuelo.value = datos.value.laboratorio;
        resultadosAnalisisSuelo.value = [...datos.value.resultados];
        recomendacionesAnalisisSuelo.value = datos.value.recomendaciones;

        mostrarBotonEditar.value = true;
    }
    mostrarFormularioAnalisisSuelo.value = boolean;
}

function estadoTabla() {
    if (opcionTabla.value == "Activos") {
        mostrarInputFecha.value = false;
        mostrarSelectResponsable.value = false;
        mostraInput.value = false;
        listarAnalisisSueloActivo();
    } else if (opcionTabla.value == "Inactivos") {
        mostrarInputFecha.value = false;
        mostrarSelectResponsable.value = false;
        mostraInput.value = false;
        listarAnilisasSueloInactivo();
    } else if (opcionTabla.value == "Fechas") {
        mostrarSelectResponsable.value = false;
        mostrarInputFecha.value = true;
        mostraInput.value = true;
    } else if (opcionTabla.value == "Responsable") {
        mostrarInputFecha.value = false;
        mostrarSelectResponsable.value = true;
        mostraInput.value = true;
    } else {
        mostrarInputFecha.value = false;
        mostrarSelectResponsable.value = false;
        mostraInput.value = false;
        listarAnalisisSuelo();
    }
}

onMounted(() => {
    listarEmpleado();
    listarParcela();
    listarAnalisisSuelo();
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
                                Analisi del Suelo
                            </h1>
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
                                    v-if="mostrarSelectResponsable"
                                    label="Responsable"
                                    :options="opcionesResponsables"
                                    v-model="responsable" />
                                <q-input
                                    standout
                                    v-if="mostrarInputFecha"
                                    label="Fecha Inicio"
                                    type="date"
                                    v-model="fechaInicio" />
                                <q-input
                                    standout
                                    v-if="mostrarInputFecha"
                                    label="Fecha Fin"
                                    type="date"
                                    v-model="fechaFin" />
                                <q-btn
                                    v-if="mostraInput"
                                    @click="
                                        mostrarInputFecha
                                            ? listarAnalisisSueloFechas()
                                            : mostrarSelectResponsable
                                            ? listarAnalisisSueloResponsable()
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
                <template v-slot:body-cell-estado="props">
                    <q-td :props="props">
                        <q-badge
                            :color="props.row.estado === 1 ? 'green' : 'red'"
                            align="top"
                            label="Estado" />
                    </q-td>
                </template>
                <template v-slot:body-cell-opciones="props">
                    <q-td :props="props">
                        <q-btn @click="controlFormulario(props.row, true)">
                            ✏️
                        </q-btn>
                        <q-btn
                            v-if="props.row.estado == 1"
                            @click="editarEstado(props.row)">
                            ❌
                        </q-btn>
                        <q-btn v-else @click="editarEstado(props.row)">
                            ✅
                        </q-btn>
                    </q-td>
                </template>
            </q-table>
        </div>
        <q-dialog v-model="mostrarFormularioAnalisisSuelo">
            <q-card>
                <q-form
                    @submit="mostrarBotonEditar ? editar() : registrar()"
                    class="q-gutter-md">
                    <p class="text-h5 text-center q-pb-md text-green">
                        {{ datos ? "Editar" : "Agregar" }} Analisis del Suelo
                    </p>
                    <q-input
                        standout="bg-green text-while"
                        type="date"
                        label="Fecha"
                        v-model="fechaAnalisisSuelo" />
                    <q-select
                        standout="bg-green text-while"
                        :options="opcionesParcelas"
                        label="Parcela"
                        v-model="parcelaAnalisisSuelo" />
                    <q-select
                        standout="bg-green text-while"
                        :options="opcionesResponsables"
                        label="Empledo"
                        v-model="empleadoAnalisisSuelo" />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Muestra"
                        v-model="muestraAnalisisSuelo" />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Cultivo"
                        v-model="cultivoAnalisisSuelo" />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Laboratorio"
                        v-model="laboratorioAnalisisSuelo" />
                    <q-input
                        autogrow
                        standout="bg-green text-while"
                        type="text"
                        label="Resultados (separa con comas)"
                        v-model="resultadosAnalisisSuelo" />
                    <q-input
                        autogrow
                        standout="bg-green text-while"
                        type="text"
                        label="Recomendaciones"
                        v-model="recomendacionesAnalisisSuelo" />
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

.q-form {
    display: flex;
    flex-direction: column;
    height: auto;
}
</style>
