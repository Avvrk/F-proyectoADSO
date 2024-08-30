<script setup>
import { ref, onMounted, computed } from "vue";
import { useStoreCultivos } from "../stores/cultivos.js";
import { useQuasar } from "quasar";

const $q = useQuasar();

const useCultivo = useStoreCultivos();

const parcelas = ref([]);
const rows = ref([]);
const columns = ref([
    {
        name: "nombre",
        label: "Nombre",
        field: "nombre",
        align: "center",
        sortable: true,
    },
    {
        name: "tipo",
        label: "Tipo",
        field: "tipo",
        align: "center",
    },
    {
        name: "id_parcela",
        label: "Parcela",
        field: (row) => `${row.id_parcela.numero} (finca: ${row.id_parcela.id_fincas.nombre} - ${row.id_parcela.id_fincas.rut})`,
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

const nombreCultivo = ref("");
const tipoCultivo = ref("");
const parcelaCultivo = ref("");

const opcionesTabla = ["Todos", "Parcela", "Tipo"];
const opcionTabla = ref("Todos");
const tipo = ref("");
const parcela = ref("");

const datos = ref([]);

const mostrarSelectParcelas = ref(false);
const mostrarInputTipo = ref(false);
const mostrarFormularioCultivos = ref(false);
const mostrarBotonEditar = ref(false);
const mostrarInput = ref(false);
const loading = ref(true);

const opcionesParcelas = computed(() => {
    return parcelas.value.map((par) => {
        return {
            label: `${par.numero} (${par.id_fincas.nombre})`,
            id: par._id,
        };
    });
});

async function listarParcelas() {
    try {
        loading.value = true;
        const r = await useCultivo.getParcelas();
        parcelas.value = r.data.parcelas;
    } finally {
        loading.value = false;
    }
}

async function listarCultivos() {
    try {
        loading.value = true;
        const r = await useCultivo.getCultivos();
        rows.value = r.data.cultivos;
    } finally {
        loading.value = false;
    }
}

async function listarCultivosPacerla() {
    if (parcela.value) {
        try {
            loading.value = true;
            const r = await useCultivo.getCultivosParcelas(parcela.value.id);
            rows.value = r.data.cultivos;
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

async function listarCultivosTipo() {
    if (tipo.value.trim()) {
        try {
            loading.value = true;
            const r = await useCultivo.getCultivosTipo(tipo.value);
            rows.value = r.data.cultivos;
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
                nombre: nombreCultivo.value,
                tipo: tipoCultivo.value,
                id_parcela: parcelaCultivo.value.id,
            };

            const res = await useCultivo.postCultivos(info);
            if (res.status === 200) {
                mostrarFormularioCultivos.value = false;
                listarCultivos();
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
                nombre: nombreCultivo.value,
                tipo: tipoCultivo.value,
                id_parcela: parcelaCultivo.value.id,
            };

            const res = await useCultivo.putCultivos(datos.value._id, info);
            if (res.status === 200) {
                mostrarFormularioCultivos.value = false;
                listarCultivos();
            }
        } finally {
            loading.value = false;
        }
    }
}

function validarDatos() {
    let validacion = true;
    if (
        !nombreCultivo.value.trim() &&
        !tipoCultivo.value.trim() &&
        !parcelaCultivo.value
    ) {
        $q.notify({
            type: "negative",
            message: "Llena todos los campos",
            position: "bottom",
        });
        validacion = false;
    } else {
        if (!nombreCultivo.value.trim()) {
            $q.notify({
                type: "negative",
                message: "El nombre esta vacio",
                position: "bottom",
            });
            validacion = false;
        }
        if (!tipoCultivo.value.trim()) {
            $q.notify({
                type: "negative",
                message: "El tipo esta vacio",
                position: "bottom",
            });
            validacion = false;
        }
        if (!parcelaCultivo.value) {
            $q.notify({
                type: "negative",
                message: "La parcela esta vacia",
                position: "bottom",
            });
            validacion = false;
        }
    }
    return validacion;
}

function controlFormulario(obj, boolean) {
    nombreCultivo.value = "";
    tipoCultivo.value = "";
    parcelaCultivo.value = "";

    datos.value = obj;
    mostrarBotonEditar.value = false;
    if (obj != null && boolean == true) {
        nombreCultivo.value = datos.value.nombre;
        tipoCultivo.value = datos.value.tipo;
        parcelaCultivo.value = opcionesParcelas.value.find(
            (p) => p.id == datos.value.id_parcela._id
        );
        mostrarBotonEditar.value = true;
    }
    mostrarFormularioCultivos.value = boolean;
}

function estadoTabla() {
    if (opcionTabla.value == "Tipo") {
        mostrarSelectParcelas.value = false;
        mostrarInputTipo.value = true;
        mostrarInput.value = true;
    } else if (opcionTabla.value == "Parcela") {
        mostrarInputTipo.value = false;
        mostrarSelectParcelas.value = true;
        mostrarInput.value = true;
    } else {
        mostrarInputTipo.value = false;
        mostrarSelectParcelas.value = false;
        mostrarInput.value = false;
        listarCultivos();
    }
}

onMounted(() => {
    listarParcelas();
    listarCultivos();
});
</script>

<template>
    <div>
        <div>
            <q-btn @click="controlFormulario(null, true)" label="Agregar" />
        </div>
        <q-table
            flat
            bordered
            title="Climas"
            :rows="rows"
            :columns="columns"
            row-key="id">
            <template v-slot:top>
                <q-select
                    v-if="mostrarSelectParcelas"
                    label="Responsable"
                    :options="opcionesParcelas"
                    v-model="parcela" />
                <q-input
                    v-if="mostrarInputTipo"
                    label="Tipo"
                    type="text"
                    v-model="tipo" />
				<q-btn
                    v-if="mostrarInput"
                    @click="
					mostrarInputTipo
                            ? listarCultivosTipo()
                            : mostrarSelectParcelas
                            ? listarCultivosPacerla()
                            : ''
                    "
                    label="Buscar" />
                <q-select
                    :options="opcionesTabla"
                    v-model="opcionTabla"
                    label="Filtro por"
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
        <q-dialog v-model="mostrarFormularioCultivos">
            <q-card>
                <q-form
                    @submit="mostrarBotonEditar ? editar() : registrar()"
                    class="q-gutter-md">
                    <q-input
                        standout="bg-green text-white"
                        type="text"
                        v-model="nombreCultivo"
                        label="Nombre" />
                    <q-input
                        standout="bg-green text-white"
                        type="text"
                        v-model="tipoCultivo"
                        label="Tipo" />
                    <q-select
                        standout="bg-green text-white"
                        :options="opcionesParcelas"
                        v-model="parcelaCultivo"
                        label="Parcela" />
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

<style scoped></style>
