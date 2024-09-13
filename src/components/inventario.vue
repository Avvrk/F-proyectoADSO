<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useStoreInventario } from "../stores/inventario.js";
import { useQuasar } from "quasar";

const $q = useQuasar();

const useInventario = useStoreInventario();

const opcionesTabla = ["Todos", "Fechas"];

const tipos = ref([]);
const semilla = ref([]);
const insumo = ref([]);
const maquina = ref([]);
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
        name: "tipo",
        label: "Tipo",
        field: "tipo",
        align: "center",
        sortable: true,
    },
    {
        name: "observacion",
        label: "Observación",
        field: "observacion",
        align: "center",
        sortable: true,
    },
    {
        name: "unidad",
        label: "Unidad",
        field: "unidad",
        align: "center",
        sortable: true,
    },
    {
        name: "cantidad",
        label: "Cantidad",
        field: "cantidad",
        align: "center",
        sortable: true,
    },
    {
        name: "semillas_id",
        label: "Semilla",
        field: (row) => (row.semillas_id ? row.semillas_id.especieVariedad : "No Aplica"),
        align: "center",
        sortable: true,
    },
    {
        name: "insumos_id",
        label: "Insumo",
        field: (row) => (row.insumos_id ? row.insumos_id.nombre : "No Aplica"),
        align: "center",
        sortable: true,
    },
    {
        name: "maquinaria_id",
        label: "Maquinaria",
        field: (row) => (row.maquinaria_id ? `${row.maquinaria_id.nombre} (tipo:${row.maquinaria_id.tipo})` : "No Aplica"),
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

const fechaInventario = ref("");
const tipoInventario = ref("");
const observacionInventario = ref("");
const unidadInventario = ref("");
const cantidadInventario = ref(0);
const semillasInventario = ref("");
const insumosInventario = ref("");
const maquinariaInventario = ref("");

const opcionTabla = ref("Todos");

const fechaInicio = ref("");
const fechaFin = ref("");
// const tipo = ref("");

const datos = ref([]);

const mostrarFormularioInventario = ref(false);
const mostrarBotonEditar = ref(false);
const loading = ref(true);

// const opcionesTipos = computed(() => {
// 	return tipos.value.map((tipo) => {
// 		return { label: tipo, value: tipo };
// 	});
// });

const opcionesSemillas = computed(() => {
    return semilla.value.map((s) => {
        return { label: `${s.especieVariedad}`, id: `${s._id}` };
    });
});

const opcionesInsumos = computed(() => {
    return insumo.value.map((i) => {
        return { label: `${i.nombre}`, id: `${i._id}` };
    });
});

const opcionesMaquinaria = computed(() => {
    return maquina.value.map((m) => {
        return { label: `${m.nombre} (tipo: ${m.tipo})`, id: `${m._id}` };
    });
});

async function listarsemilla() {
    try {
        loading.value = true;
        const r = await useInventario.getSemillas();
        semilla.value = r.data.semillas;
    } finally {
        loading.value = false;
    }
}

async function listarinsumos() {
    try {
        loading.value = true;
        const r = await useInventario.getInsumos();
        insumo.value = r.data.insumos;
    } finally {
        loading.value = false;
    }
}

async function listarmaquinariaHerramienta() {
    try {
        loading.value = true;
        const r = await useInventario.getMaquinaria();
        maquina.value = r.data.maquinariaH;
    } finally {
        loading.value = false;
    }
}

async function listarInventario() {
    try {
        loading.value = true;
        const r = await useInventario.getInventario();
        rows.value = r.data.inventario;
    } finally {
        loading.value = false;
    }
}

async function listarInventarioFechas() {
    if (fechaInicio.value && fechaFin.value) {
        try {
            loading.value = true;
            const r = await useInventario.getInventarioFechas(fechaInicio.value, fechaFin.value);
            rows.value = r.data.inventarios;  // Asegúrate de que el valor esté bien.
        } catch (error) {
            console.error("Error filtrando inventario por fechas:", error);
        } finally {
            loading.value = false;
        }
    } else {
        $q.notify({
            type: "negative",
            message: "Llena los campos de fecha de inicio y fin",
            position: "bottom",
        });
    }
}

// async function listarInventarioTipo() {
// 	if (tipo.value) {
// 		try {
// 			loading.value = true;
// 			const r = await useInventario.getInventarioTipo(tipo.value);
// 			rows.value = r.data.inventario;
// 		} finally {
// 			loading.value = false;
// 		}
// 	} else {
// 		$q.notify({
// 			type: "negative",
// 			message: "Selecciona un tipo",
// 			position: "bottom",
// 		});
// 	}
// }

async function registrar() {
    if (validarDatos()) {
        try {
            loading.value = true;
            const info = {
                fecha: fechaInventario.value,
                tipo: tipoInventario.value,
                observacion: observacionInventario.value,
                unidad: unidadInventario.value,
                cantidad: cantidadInventario.value,
                semillas_id: semillasInventario.value ? semillasInventario.value.id : null,
                insumos_id: insumosInventario.value ? insumosInventario.value.id : null,
                maquinaria_id: maquinariaInventario.value ? maquinariaInventario.value.id : null,
            };

            const res = await useInventario.postInventario(info);
            if (res.status === 200) {
                mostrarFormularioInventario.value = false;
                listarInventario();  // Refresca la lista
            }
        } catch (error) {
            console.error("Error agregando inventario:", error);
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
                fecha: fechaInventario.value,
                tipo: tipoInventario.value,
                observacion: observacionInventario.value,
                unidad: unidadInventario.value,
                cantidad: cantidadInventario.value,
                semillas_id: semillasInventario.value ? semillasInventario.value.id : null,
                insumos_id: insumosInventario.value ? insumosInventario.value.id : null,
                maquinaria_id: maquinariaInventario.value ? maquinariaInventario.value.id : null,
            };

            const res = await useInventario.putInventario(datos.value._id, info);
            if (res.status === 200) {
                mostrarFormularioInventario.value = false;
                listarInventario();
            }
        } finally {
            loading.value = false;
        }
    }
}

function validarDatos() {
    let validacion = true;
    if (!fechaInventario.value || !tipoInventario.value || !unidadInventario.value || !cantidadInventario.value) {
        $q.notify({
            type: "negative",
            message: "Llena todos los campos obligatorios",
            position: "bottom",
        });
        validacion = false;
    }
    return validacion;
}

function controlFormulario(obj, boolean) {
    fechaInventario.value = "";
    tipoInventario.value = "";
    observacionInventario.value = "";
    unidadInventario.value = "";
    cantidadInventario.value = 0;
    semillasInventario.value = "";
    insumosInventario.value = "";
    maquinariaInventario.value = "";

    datos.value = obj;
    mostrarBotonEditar.value = false;
    if (obj != null && boolean == true) {
        fechaInventario.value = datos.value.fecha.split("T")[0];
        tipoInventario.value = datos.value.tipo;
        observacionInventario.value = datos.value.observacion;
        unidadInventario.value = datos.value.unidad;
        cantidadInventario.value = datos.value.cantidad;
        semillasInventario.value = datos.value.semillas_id ? opcionesSemillas.value.find((s) => s.id == datos.value.semillas_id) : "";
        insumosInventario.value = datos.value.insumos_id ? opcionesInsumos.value.find((i) => i.id == datos.value.insumos_id._id) : "";
        maquinariaInventario.value = datos.value.maquinaria_id ? opcionesMaquinaria.value.find((m) => m.id == datos.value.maquinaria_id) : "";

        mostrarBotonEditar.value = true;
    }
    mostrarFormularioInventario.value = boolean;
}

watch(opcionTabla, (newValue) => {
    if (newValue === "Todos") {
        listarInventario();
    }
});

function estadoTabla() {
    if (opcionTabla.value == "Fechas") {
        listarInventarioFechas();
    } else {
        listarInventario();
    }
}

onMounted(() => {
    listarInventario();
    listarinsumos();
    listarsemilla();
    listarmaquinariaHerramienta();
});
</script>

<template>
    <div>
      <!-- Filtros y tabla -->
      <div class="q-pa-lg">
        <q-table :rows="rows" :columns="columns" row-key="id" :loading="loading">
          <template v-slot:top>
            <section class="column full-width q-pr-md">
              <div class="row items-center">
                <h1 class="text-h4 q-pl-xl text-green-7">Gestión De Inventario</h1>
                <q-space />
                <q-btn size="md" @click="controlFormulario(null, true)" label="Agregar" />
              </div>
              <div class="row items-center q-pb-md">
                <q-space />
                <q-select
                  style="width: 200px"
                  standout="bg-green text-white"
                  v-model="opcionTabla"
                  :options="opcionesTabla"
                  label="Filtrar por"
                  @update:model-value="estadoTabla"
                />
                <!-- Inputs para fecha de inicio y fin cuando se selecciona "Fechas" -->
                <q-input
                  v-if="opcionTabla === 'Fechas'"
                  filled
                  type="date"
                  label="Fecha Inicio"
                  v-model="fechaInicio"
                  class="q-mr-sm"
                  style="max-width: 200px;"
                />
                <q-input
                  v-if="opcionTabla === 'Fechas'"
                  filled
                  type="date"
                  label="Fecha Fin"
                  v-model="fechaFin"
                  class="q-mr-sm"
                  style="max-width: 200px;"
                />
                <q-btn
                  v-if="opcionTabla === 'Fechas'"
                  @click="listarInventarioFechas"
                  label="Filtrar Fechas"
                  color="primary"
                  class="q-ml-sm"
                />
              </div>
            </section>
          </template>
          <!-- Opciones de la tabla -->
          <template v-slot:body-cell-opciones="props">
            <q-td :props="props" class="row justify-center" style="gap: 20px">
              <q-btn @click="controlFormulario(props.row, true)" color="white" class="q-mr-sm"> ✏️ </q-btn>
            </q-td>
          </template>
        </q-table>
      </div>
  
      <!-- Diálogo para formulario de inventario -->
      <q-dialog v-model="mostrarFormularioInventario" persistent>
        <q-card>
          <q-form @submit="mostrarBotonEditar ? editar() : registrar()" class="q-gutter-sm">
            <p class="text-h5 text-center q-pb-md text-green">
              {{ mostrarBotonEditar ? "Editar Inventario" : "Agregar Inventario" }}
            </p>
            <q-input filled type="date" label="Fecha" v-model="fechaInventario" />
            <q-input filled type="text" label="Tipo" v-model="tipoInventario" />
            <q-input filled type="text" label="Observación" v-model="observacionInventario" />
            <q-input filled type="text" label="Unidad" v-model="unidadInventario" />
            <q-input filled type="number" label="Cantidad" v-model="cantidadInventario" />
            <q-select filled :options="opcionesSemillas" label="Semilla" v-model="semillasInventario" />
            <q-select filled :options="opcionesInsumos" label="Insumo" v-model="insumosInventario" />
            <q-select filled :options="opcionesMaquinaria" label="Maquinaria" v-model="maquinariaInventario" />
            <div class="row justify-end" style="gap: 10px">
              <q-btn unelevated v-if="mostrarBotonEditar" label="Editar" type="submit" color="positive" />
              <q-btn unelevated v-else label="Agregar" type="submit" color="positive" />
              <q-btn @click="mostrarFormularioInventario = false" flat class="bg-red text-white" label="Cerrar" type="button" />
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
  
  .q-btn[icon="add"] {
    background-color: white;
    border: 1px solid #1976d2;
    color: #1976d2;
  }
  
  .q-btn[color="white"] {
    background-color: white;
    border: 1px solid #1976d2;
    color: #1976d2;
  }
  
  .q-btn[color="positive"] {
    background-color: #43a047;
    color: white;
  }
  
  .q-btn.flat.bg-red.text-white {
    background-color: #e53935;
    color: white;
  }
  </style>
  