<script setup>
import { ref, onMounted, computed } from "vue";
import { useStoreParcelas } from "../stores/parcelas.js";
import notify from "../utils/notificaciones.js";

// Variables usadas en el filtro
const opcionesTabla = ["Todos", "Activos", "Inactivos"];
const opcionTabla = ref("Todos");
const mostrarBotonEditar = ref(false);
// const asistente = ref("");

const useParcelas = useStoreParcelas();

const loading = ref(false);
const mostrarFormularioParcelas = ref(false);
const fincas = ref([]);

const rows = ref([]);
const columns = [
    { name: "numero", label: "Número", align: "center", field: "numero" },
    {
        name: "ubicacionGeografica",
        label: "Ubicación Geográfica",
        align: "center",
        field: "ubicacionGeografica",
    },
    {
        name: "asistenteTecnico",
        label: "Asistente Tecnico ",
        align: "center",
        field: "asistenteTecnico",
    },
    {
        name: "cultivoAnterior",
        label: "Cultivo Anterior",
        align: "center",
        field: "cultivoAnterior",
    },
    {
        name: "cultivoActual",
        label: "Cultivo Actual",
        align: "center",
        field: "cultivoActual",
    },
    {
        name: "descripcion",
        label: "Detalle",
        align: "center",
        field: "descripcion",
    },
    {
        name: "area",
        label: "Área",
        align: "center",
        field: "area",
        format: (val) => `${val} m²`,
    },
    {
        name: "id_fincas",
        label: "Fincas",
        align: "center",
        field: (row) =>
            row.id_fincas
                ? `${row.id_fincas.nombre} (rut: ${row.id_fincas.rut})`
                : "",
    },
    {
        name: "estado",
        label: "Estado",
        align: "center",
        field: "estado",
    },
    { name: "actions", label: "Acciones", align: "center" },
];

const numeroParcelas = ref("");
const ubicacionGeograficaParcelas = ref("");
const cultivoAnteriorParcelas = ref("");
const cultivoActualParcelas = ref("");
const descripcionParcelas = ref("");
const areaParcelas = ref("");
const asistenteTecnicoParcelas = ref("");
const fincaParcelas = ref("");

const datos = ref([]);

const opcionesFinca = computed(() => {
    return fincas.value.map((f) => {
        return { label: `${f.nombre} (rut: ${f.rut})`, id: f._id };
    });
});

async function listarParcelas() {
    try {
        loading.value = true;
        const r = await useParcelas.getParcelas();
        rows.value = r.data.parcelas;
    } finally {
        loading.value = false;
    }
}

async function listarFincas() {
    try {
        loading.value = true;
        const r = await useParcelas.getFincas();
        fincas.value = r.data.fincas;
    } finally {
        loading.value = false;
    }
}

async function listarFincasActivas() {
    try {
        loading.value = true;
        const r = await useParcelas.getParcelasActivos();
        rows.value = r.data.parcelas;
    } finally {
        loading.value = false;
    }
}

async function listarFincasInactivos() {
    try {
        loading.value = true;
        const r = await useParcelas.getParcelasInactivos();
        rows.value = r.data.parcelas;
    } finally {
        loading.value = false;
    }
}

async function editarEstado(elemento) {
    try {
        loading.value = true;
        await useParcelas.putParcelaEstado(elemento._id, elemento.estado);
        listarParcelas();
    } finally {
        loading.value = false;
    }
}

async function registrar() {
    if (validarDatos()) {
        try {
            const info = {
                numero: numeroParcelas.value,
                ubicacionGeografica: ubicacionGeograficaParcelas.value,
                cultivoAnterior: cultivoAnteriorParcelas.value,
                cultivoActual: cultivoActualParcelas.value,
                descripcion: descripcionParcelas.value,
                area: areaParcelas.value,
                asistenteTecnico: asistenteTecnicoParcelas.value,
                id_fincas: fincaParcelas.value.id,
            };

            const res = await useParcelas.postParcela(info);
            if (res.status === 200) {
                mostrarFormularioParcelas.value = false;
                listarParcelas();
            } else if (r.response && r.response.data.errors) {
                res.response.data.errors.forEach((err) => {
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
            const info = {
                numero: numeroParcelas.value,
                ubicacionGeografica: ubicacionGeograficaParcelas.value,
                cultivoAnterior: cultivoAnteriorParcelas.value,
                cultivoActual: cultivoActualParcelas.value,
                descripcion: descripcionParcelas.value,
                area: areaParcelas.value,
                asistenteTecnico: asistenteTecnicoParcelas.value,
                id_fincas: fincaParcelas.value.id,
            };

            const res = await useParcelas.putParcela(datos.value._id, info);
            if (res.status === 200) {
                mostrarFormularioParcelas.value = false;
                listarParcelas();
            } else if (res.response && res.response.data.errors) {
				res.response.data.errors.forEach((err) => {
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
        !numeroParcelas.value.trim() &&
        !ubicacionGeograficaParcelas.value.trim() &&
        !cultivoAnteriorParcelas.value.trim() &&
        !cultivoActualParcelas.value.trim() &&
        !descripcionParcelas.value.trim() &&
        !areaParcelas.value.trim() &&
        !asistenteTecnicoParcelas.value.trim() &&
        !fincaParcelas.value
    ) {
        notify("Llena todos los campos");
        validacion = false;
    } else {
        if (!numeroParcelas.value.trim()) {
            notify("El número está vacío");
            validacion = false;
        }
        if (!ubicacionGeograficaParcelas.value.trim()) {
            notify("La ubicación geográfica está vacía");
            validacion = false;
        }
        if (!cultivoAnteriorParcelas.value.trim()) {
            notify("El cultivo anterior está vacío");
            validacion = false;
        }
        if (!cultivoActualParcelas.value.trim()) {
            notify("El cultivo actual está vacío");
            validacion = false;
        }
        if (!descripcionParcelas.value.trim()) {
            notify("La descripcion está vacía");
            validacion = false;
        }
        if (!areaParcelas.value.trim()) {
            notify("El área está vacía");
            validacion = false;
        }
        if (!asistenteTecnicoParcelas.value.trim()) {
            notify("El asistente tecnico está vacía");
            validacion = false;
        }
        if (!fincaParcelas.value) {
            notify("Debes seleccionar una finca");
            validacion = false;
        }
    }

    return validacion; // Retorna el estado de validación
}

function controlFormulario(obj, boolean) {
    numeroParcelas.value = "";
    ubicacionGeograficaParcelas.value = "";
    cultivoAnteriorParcelas.value = "";
    cultivoActualParcelas.value = "";
    descripcionParcelas.value = "";
    areaParcelas.value = "";
    asistenteTecnicoParcelas.value = "";
    fincaParcelas.value = "";

    datos.value = obj;
    mostrarBotonEditar.value = false;
    if (obj != null && boolean == true) {
        numeroParcelas.value = String(datos.value.numero);
        ubicacionGeograficaParcelas.value = datos.value.ubicacionGeografica;
        cultivoAnteriorParcelas.value = datos.value.cultivoAnterior;
        cultivoActualParcelas.value = datos.value.cultivoActual;
        descripcionParcelas.value = datos.value.descripcion;
        areaParcelas.value = String(datos.value.area);
        asistenteTecnicoParcelas.value = datos.value.asistenteTecnico;
        fincaParcelas.value = opcionesFinca.value.find(
            ({ id }) => id == datos.value.id_fincas._id
        );

        mostrarBotonEditar.value = true;
    }
    mostrarFormularioParcelas.value = boolean;
}

const estadoTabla = () => {
    if (opcionTabla.value === "Activos") {
        listarFincasActivas();
    } else if (opcionTabla.value === "Inactivos") {
        listarFincasInactivos();
    } else {
        listarParcelas();
    }
};

onMounted(() => {
    listarFincas();
    listarParcelas();
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
                                Parcelas
                            </h1>
                            <q-space />
                            <q-btn
                                size="md"
                                @click="controlFormulario(null, true)"
                                label="Agregar" />
                        </div>
                        <div class="row items-center q-pb-md">
                            <q-space />
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
                            :label="
                                props.row.estado === 1 ? 'Activo' : 'Inactivo'
                            " />
                    </q-td>
                </template>
                <template v-slot:body-cell-actions="props">
                    <q-td
                        :props="props"
                        class="row justify-center"
                        style="gap: 20px">
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
        <q-dialog v-model="mostrarFormularioParcelas">
            <q-card>
                <q-form
                    @submit="mostrarBotonEditar ? editar() : registrar()"
                    class="q-gutter-sm">
                    <p class="text-h5 text-center q-pb-md text-green">
                        {{ datos ? "Editar" : "Agregar" }} Parcela
                    </p>
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Numero"
                        v-model="numeroParcelas" />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Ubicacion Geografica"
                        v-model="ubicacionGeograficaParcelas" />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Cultivo Anterior"
                        v-model="cultivoAnteriorParcelas" />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Cultivo Actual"
                        v-model="cultivoActualParcelas" />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Descripcion"
                        v-model="descripcionParcelas" />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Area"
                        v-model="areaParcelas" />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Asistente Tegnico"
                        v-model="asistenteTecnicoParcelas" />
                    <q-select
                        standout="bg-green text-while"
                        :options="opcionesFinca"
                        label="Fincas"
                        v-model="fincaParcelas" />
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
