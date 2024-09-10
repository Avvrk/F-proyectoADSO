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
    <q-page>
        <q-card>
            <q-card-section>
                <q-btn @click="dialogAddParcela = true" label="Agregar Parcela" color="positive" />
            </q-card-section>

            <q-table :rows="parcelas" :columns="columns" row-key="id" :loading="loading">
                <template v-slot:top>
                    <q-input v-if="mostrarinputAsistentes" v-model="asistente" type="text" label="Filtrar por asistente" />
                    <q-btn v-if="mostrarInput" @click="listarAsistente()" />
                    <q-select :options="opcionesTabla" v-model="opcionTabla" @update:model-value="estadoTabla" />
                </template>
                <template v-slot:body-cell-actions="props">
                    <q-td :props="props">
                        <q-btn flat color="primary" @click="editParcelaData(props.row)" icon="edit" />
                        <q-btn flat :color="props.row.estado === 1 ? 'negative' : 'positive'" @click="changeParcelaState(props.row._id, props.row.estado)" :icon="props.row.estado === 1 ? 'visibility_off' : 'visibility'" :label="props.row.estado === 1 ? 'Inactivar' : 'Activar'" />
                    </q-td>
                </template>
                <template v-slot:body-cell-estado="props">
                    <q-td :props="props">
                        <q-badge :color="props.row.estado === 1 ? 'green' : 'red'" align="top" label="Estado" />
                    </q-td>
                </template>
            </q-table>

            <!-- Dialogo para Editar Parcela -->
            <q-dialog v-model="dialogEditParcela">
                <q-card>
                    <q-card-section>
                        <q-input v-model="editParcela.numero" label="Número" filled />
                        <q-input v-model="editParcela.ubicacionGeografica" label="Ubicación Geográfica" filled />
                        <q-input v-model="editParcela.cultivoAnterior" label="Cultivo Anterior" filled />
                        <q-input v-model="editParcela.cultivoActual" label="Cultivo Actual" filled />
                        <q-input v-model="editParcela.detalle" label="Detalle" filled />
                        <q-input v-model.number="editParcela.area" label="Área" filled type="number" />
                        <q-select v-model="editParcela.id_finca" :options="opcionesFinca" label="Finca" />
                    </q-card-section>
                    <q-card-actions>
                        <q-btn @click="dialogEditParcela = false" label="Cancelar" />
                        <q-btn @click="updateParcela" color="primary" label="Actualizar" />
                    </q-card-actions>
                </q-card>
            </q-dialog>

            <!-- Dialogo para Agregar Parcela -->
            <q-dialog v-model="dialogAddParcela">
                <q-card>
                    <q-card-section>
                        <q-input v-model="newParcela.numero" label="Número" filled />
                        <q-input v-model="newParcela.ubicacionGeografica" label="Ubicación Geográfica" filled />
                        <q-input v-model="newParcela.cultivoAnterior" label="Cultivo Anterior" filled />
                        <q-input v-model="newParcela.cultivoActual" label="Cultivo Actual" filled />
                        <q-input v-model="newParcela.detalle" label="Detalle" filled />
                        <q-input v-model.number="newParcela.area" label="Área" filled type="number" />
                        <q-select v-model="newParcela.id_finca" :options="opcionesFinca" label="Finca" />
                    </q-card-section>
                    <q-card-actions>
                        <q-btn @click="dialogAddParcela = false" label="Cancelar" />
                        <q-btn @click="addParcela" color="primary" label="Agregar" />
                    </q-card-actions>
                </q-card>
            </q-dialog>
        </q-card>
    </q-page>
</template>

<style scoped>
.q-table {
    min-height: 400px;
}
</style>
