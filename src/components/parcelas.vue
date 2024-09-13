<script setup>
import { ref, onMounted, computed } from "vue";
import { useStoreParcelas } from "../stores/parcelas.js";
import { format, Notify } from "quasar";

// Variables usadas en el filtro
const opcionesTabla = ["Todos", "activos", "inactivos", "asistente"];
const opcionTabla = ref("Todos");
const mostrarinputAsistentes = ref(false);
const mostrarInput = ref(false);
const asistente = ref("");

const storeParcelas = useStoreParcelas();

const loading = ref(false);
const dialogEditParcela = ref(false);
const dialogAddParcela = ref(false);
const editParcela = ref({});
const newParcela = ref({
    numero: "",
    ubicacionGeografica: "",
    cultivoAnterior: "",
    cultivoActual: "",
    detalle: "",
    estado: 1,
    area: 0,
    id_finca: "", // Asegúrate de que esto sea un valor válido
});
const parcelas = ref([]);
const fincas = ref([]);

const columns = [
    { name: "numero", label: "Número", align: "center", field: "numero" },
    {
        name: "ubicacionGeografica",
        label: "Ubicación Geográfica",
        align: "left",
        field: "ubicacionGeografica",
    },
    {
        name: "asistenteTecnico",
        label: "Asistente Tecnico ",
        align: "left",
        field: "asistenteTecnico",
    },
    {
        name: "cultivoAnterior",
        label: "Cultivo Anterior",
        align: "left",
        field: "cultivoAnterior",
    },
    {
        name: "cultivoActual",
        label: "Cultivo Actual",
        align: "left",
        field: "cultivoActual",
    },
    { name: "detalle", label: "Detalle", align: "left", field: "detalle" },
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
        field: (row) => `${row.id_fincas.nombre}`,
    },
    {
        name: "estado",
        label: "Estado",
        align: "center",
        field: "estado",
    },
    { name: "actions", label: "Acciones", align: "center" },
];

const opcionesFinca = computed(() => {
    return fincas.value.map((f) => ({
        label: f.nombre,
        id: f._id,
    }));
});

const loadParcelas = async () => {
    loading.value = true;
    try {
        const response = await storeParcelas.getParcelas();
        parcelas.value = response.data.parcelas;
    } catch (error) {
        Notify.create({
            type: "negative",
            message: "Error al cargar las parcelas.",
        });
    } finally {
        loading.value = false;
    }
};

const loadFincas = async () => {
    try {
        const response = await storeParcelas.getFincas();
        fincas.value = response.data.fincas;
    } catch (error) {
        Notify.create({
            type: "negative",
            message: "Error al cargar las fincas.",
        });
    }
};

const addParcela = async () => {
    try {
        if (!newParcela.value.numero || !newParcela.value.ubicacionGeografica || !newParcela.value.cultivoActual || !newParcela.value.area || !newParcela.value.id_finca) {
            Notify.create({
                type: "negative",
                message: "Por favor, completa todos los campos.",
            });
            return;
        }

        const parcelaData = {
            numero: newParcela.value.numero,
            ubicacionGeografica: newParcela.value.ubicacionGeografica,
            cultivoAnterior: newParcela.value.cultivoAnterior,
            cultivoActual: newParcela.value.cultivoActual,
            detalle: newParcela.value.detalle,
            area: newParcela.value.area,
            id_fincas: newParcela.value.id_finca.id, // Asegúrate de que esto sea un ObjectId válido
            estado: newParcela.value.estado,
        };

        await storeParcelas.postParcela(parcelaData);
        await loadParcelas();
        dialogAddParcela.value = false;
        Notify.create({
            type: "positive",
            message: "Parcela agregada con éxito.",
        });
    } catch (error) {
        console.error(error);
        Notify.create({
            type: "negative",
            message: "Error al agregar la parcela.",
        });
    }
};

const editParcelaData = async (parcela) => {
    try {
        editParcela.value = { ...parcela };
        dialogEditParcela.value = true;
    } catch (error) {
        Notify.create({
            type: "negative",
            message: "Error al cargar la parcela para edición.",
        });
    }
};

const updateParcela = async () => {
    try {
        await storeParcelas.putParcela(editParcela.value._id, {
            ...editParcela.value,
            id_fincas: newParcela.value.id_finca.id,
        });
        await loadParcelas();
        dialogEditParcela.value = false;
        Notify.create({
            type: "positive",
            message: "Parcela actualizada con éxito.",
        });
    } catch (error) {
        console.error(error);
        Notify.create({
            type: "negative",
            message: "Error al actualizar la parcela.",
        });
    }
};

const changeParcelaState = async (id, estado) => {
    try {
        const newState = estado === 1 ? 0 : 1;
        await storeParcelas.putParcelaEstado(id, newState);
        await loadParcelas();
        Notify.create({
            type: "positive",
            message: `Parcela ${newState === 1 ? "activada" : "inactivada"} con éxito.`,
        });
    } catch (error) {
        Notify.create({
            type: "negative",
            message: "Error al cambiar el estado de la parcela.",
        });
    }
};

async function listarParcelas() {
    loading.value = true;
    try {
        await loadParcelas();
    } catch (error) {
        Notify.create({
            type: "negative",
            message: "Error al listar las parcelas.",
        });
    } finally {
        loading.value = false;
    }
}

async function listarAsistente() {
    if (asistente.value.trim()) {
        loading.value = true;
        try {
            const response = await storeParcelas.getParcelasAsistente(asistente.value);
            parcelas.value = response.data.parcelas;
        } catch (error) {
            Notify.create({
                type: "negative",
                message: "Error al listar por asistente.",
            });
        } finally {
            loading.value = false;
        }
    } else {
        Notify.create({
            type: "negative",
            message: "Por favor, ingresa un nombre de asistente.",
        });
    }
}

async function listarActivos() {
    loading.value = true;
    try {
        const response = await storeParcelas.getParcelasActivos();
        parcelas.value = response.data.parcelas;
    } catch (error) {
        Notify.create({
            type: "negative",
            message: "Error al listar los activos.",
        });
    } finally {
        loading.value = false;
    }
}

async function listarInactivos() {
    loading.value = true;
    try {
        const response = await storeParcelas.getParcelasInactivos();
        parcelas.value = response.data.parcelas;
    } catch (error) {
        Notify.create({
            type: "negative",
            message: "Error al listar los inactivos.",
        });
    } finally {
        loading.value = false;
    }
}

const estadoTabla = () => {
    if (opcionTabla.value === "activos") {
        listarActivos();
        mostrarinputAsistentes.value = false;
        mostrarInput.value = false;
    } else if (opcionTabla.value === "inactivos") {
        mostrarinputAsistentes.value = false;
        mostrarInput.value = false;
        listarInactivos();
    } else if (opcionTabla.value === "asistente") {
        mostrarinputAsistentes.value = true;
        mostrarInput.value = true;
    } else {
        listarAsistente();
    }
};

onMounted(async () => {
    await loadFincas();
    await loadParcelas();
});
</script>

<template>
    <div>
        <div class="q-pa-lg">
            <q-table :rows="parcelas" :columns="columns" row-key="id" :loading="loading">
                <template v-slot:top>
                    <section class="column full-width q-pr-md">
                        <div class="row items-center">
                            <h1 class="text-h4 q-pl-xl text-green-7">parcelas</h1>
                            <q-space />
                            <q-btn size="md" @click="controlFormulario(null, true)" label="Agregar" />
                        </div>
                        <div class="row items-center q-pb-md">
                            <q-space />
                            <q-select style="width: 200px" standout="bg-green text-while" :options="opcionesTabla" v-model="opcionTabla" label="Filtro por" @update:model-value="estadoTabla" />
                        </div>
                    </section>
                </template>
                <template v-slot:body-cell-estado="props">
                    <q-td :props="props">
                        <q-badge :color="props.row.estado === 1 ? 'green' : 'red'" align="top" :label="props.row.estado === 1 ? 'Activo' : 'Inactivo'" />
                    </q-td>
                </template>
                <template v-slot:body-cell-actions="props">
                    <q-td :props="props" class="row justify-center" style="gap: 20px">
                        <q-btn @click="editParcelaData(props.row, true)"> ✏️ </q-btn>
                        <q-btn v-if="props.row.estado == 1" @click="changeParcelaState(props.row)"> ❌ </q-btn>
                        <q-btn v-else @click="changeParcelaState(props.row)"> ✅ </q-btn>
                    </q-td>
                </template>
            </q-table>
        </div>

        <!-- Dialogo para Editar Parcela -->
        <q-dialog v-model="dialogEditParcela">
            <q-card>
                <q-form @submit="mostrarBotonEditar ? editar() : registrar()" class="q-gutter-sm">
                    <p class="text-h5 text-center q-pb-md text-green">{{ datos ? "Editar" : "Agregar" }} parcela</p>
                    <q-input standout="bg-green text-while" type="text" label="Numero" v-model="nombreparcela" />
                    <q-input standout="bg-green text-while" type="text" label="ubicacion Geografica" v-model="ubicacionGeografica" />
                    <q-input standout="bg-green text-while" type="text" label="asistente tegnico    " v-model="asistenteTecnico" />
                    <q-input standout="bg-green text-while" type="text" label="cultivo anterior" v-model="cultivoAnterior" />
                    <q-input standout="bg-green text-while" type="text" label="cultivo actual   " v-model="cultivoActual" />
                    <q-input standout="bg-green text-while" type="text" label="detalles  " v-model="detalle" />
                    <q-input standout="bg-green text-while" type="text" label="area   " v-model="area" />
                    <q-input standout="bg-green text-while" type="text" label="fincas   " v-model="fincas" />
                    <div class="row justify-end" style="gap: 10px">
                        <q-btn unelevated v-if="mostrarBotonEditar" label="Editar" type="submit" color="positive" />
                        <q-btn unelevated v-else label="Registrar" type="submit" color="positive" />
                        <q-btn @click="controlFormulario(null, false)" flat class="bg-red text-white" label="Cerrar" type="button" />
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
