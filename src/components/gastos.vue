<script setup>
import { ref, onMounted, computed } from "vue";
import { useStoreGastos } from "../stores/gastos.js";
import { useQuasar } from "quasar";
import { router } from "../routes/routes.js";

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
        // Verifica si row.fecha está definido
        if (row.fecha) {
            return row.fecha.split("T")[0]; // Devuelve la fecha formateada
        }
        return ""; // Devuelve un string vacío si row.fecha es undefined
    },
    sortable: true,
},
  {
    name: "numeroFactura",
    align: "center",
    label: "Número de Factura",
    field: "numeroFactura",
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
    name: "insumos_id",
    align: "center",
    label: "Insumo",
    field: (row) =>
      row.insumos_id ? `${row.insumos_id.nombre}` : "Sin información",
    sortable: true,
  },
  {
    name: "semillas_id",
    align: "center",
    label: "Semilla",
    field: (row) =>
      row.semillas_id
        ? `${row.semillas_id.especieVariedad} (Origen: ${row.semillas_id.origen})`
        : "Sin información",
    sortable: true,
  },
  {
    name: "opciones",
    align: "center",
    label: "Editar",
    field: "opciones",
    sortable: true,
  },
]);

const insumo = ref([]);
const semilla = ref([]);
const mantenimiento = ref([]);
const proveedor = ref([]);

// Variables para el formulario
const nombreGasto = ref("");
const fechaGasto = ref("");
const numeroFacturaGasto = ref("");
const descripcionGasto = ref("");
const totalGasto = ref("");
const insumoGasto = ref("");
const semillaGasto = ref("");
const mantenimientoGasto = ref("");

// Variable necesaria para la edición
const datos = ref([]);

// Variables que controlan lo que se va a mostrar en la pantalla
const mostrarFormularioGasto = ref(false);
const mostrarBotonEditar = ref(false);
const loading = ref(true);

// Computed para opciones de insumos, semillas y mantenimientos
const opcionesInsumos = computed(() => {
  return insumo.value.map((item) => {
    return { label: item.nombre, value: item.id };
  });
});

const opcionesSemillas = computed(() => {
  return semilla.value.map((item) => {
    return {
      label: `${item.especieVariedad} (Origen: ${item.origen})`,
      value: item.id,
    };
  });
});

const opcionesMantenimientos = computed(() => {
  return mantenimiento.value.map((item) => {
    return { label: `${item.nombre} (Tipo: ${item.tipo})`, value: item.id };
  });
});

// Funciones para listar insumos, semillas, proveedores y gastos
async function listarInsumos() {
  try {
    loading.value = true;
    const r = await useGasto.getInsumos();
    if (r.code == "ERR_BAD_REQUEST") {
      handleError(r, "Error al listar los insumos");
    }
    insumo.value = r.data.insumos;
  } finally {
    loading.value = false;
  }
}

async function listarSemillas() {
  try {
    loading.value = true;
    const r = await useGasto.getSemillas();
    if (r.code == "ERR_BAD_REQUEST") {
      handleError(r, "Error al listar las semillas");
    }
    semilla.value = r.data.semillas;
  } finally {
    loading.value = false;
  }
}

async function listarGastos() {
  try {
    loading.value = true;
    const r = await useGasto.getGastos();
    if (r.code == "ERR_BAD_REQUEST") {
      handleError(r, "Error al listar los gastos");
    }
    rows.value = r.data.gastos;
  } finally {
    loading.value = false;
  }
}

async function listarProveedores() {  // Cambia el nombre de la función
  try {
    loading.value = true;
    const r = await useGasto.getProveedores(); // Asegúrate de que esta función esté definida en la store
    if (r.code === "ERR_BAD_REQUEST") {
      handleError(r, "Error al listar los proveedores");
    }
    rows.value = r.data.proveedores; // Cambia 'r.data.Proveedor' a 'r.data.proveedores'
  } finally {
    loading.value = false;
  }
}

function handleError(r, defaultMessage) {
  if (
    r.response.data.msg == "No hay token en la peticion" ||
    r.response.data.msg == "Token no válido! ." ||
    r.response.data.msg == "Token no válido!!  " ||
    r.response.data.msg == "Token no valido"
  ) {
    $q.notify({ type: "negative", message: "Token no válido" });
    setTimeout(() => {
      router.push("/");
    }, 2000);
  } else {
    $q.notify({ type: "negative", message: r.response.data.msg || defaultMessage });
  }
}

async function registrar() {
  if (validarDatos()) {
    try {
      loading.value = true;
      const info = {
        nombre: nombreGasto.value,
        fecha: fechaGasto.value,
        numeroFactura: numeroFacturaGasto.value,
        descripcion: descripcionGasto.value,
        total: totalGasto.value,
        insumos_id: insumoGasto.value,
        semillas_id: semillaGasto.value,
        mantenimiento_id: mantenimientoGasto.value,
      };
      console.log(info);

      await useGasto.postGastos(info);
      mostrarFormularioGasto.value = false;
      listarGastos();
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
        fecha: fechaGasto.value,
        numeroFactura: numeroFacturaGasto.value,
        descripcion: descripcionGasto.value,
        total: totalGasto.value,
        insumos_id: insumoGasto.value,
        semillas_id: semillaGasto.value,
        mantenimiento_id: mantenimientoGasto.value,
      };
      console.log(info);

      await useGasto.putGastos(datos.value.id, info);
      mostrarFormularioGasto.value = false;
      listarGastos();
    } finally {
      loading.value = false;
    }
  }
}

function validarDatos() {
  let validacion = true;
  if (
    !nombreGasto.value ||
    !fechaGasto.value ||
    !numeroFacturaGasto.value ||
    !descripcionGasto.value ||
    !totalGasto.value ||
    !insumoGasto.value ||
    !semillaGasto.value ||
    !mantenimientoGasto.value
  ) {
    $q.notify({
      color: "negative",
      message: "Todos los campos son obligatorios",
      position: "top",
    });
    validacion = false;
  } else {
    if (!nombreGasto.value) {
      $q.notify({
        color: "negative",
        message: "El nombre es obligatorio",
        position: "top",
      });
      validacion = false;
    }
    if (!fechaGasto.value) {
      $q.notify({
        color: "negative",
        message: "La fecha es obligatoria",
        position: "top",
      });
      validacion = false;
    }
    if (!numeroFacturaGasto.value) {
      $q.notify({
        color: "negative",
        message: "El número de factura es obligatorio",
        position: "top",
      });
      validacion = false;
    }
    if (!descripcionGasto.value) {
      $q.notify({
        color: "negative",
        message: "La descripción es obligatoria",
        position: "top",
      });
      validacion = false;
    }
    if (!totalGasto.value) {
      $q.notify({
        color: "negative",
        message: "El total es obligatorio",
        position: "top",
      });
      validacion = false;
    }
    if (!insumoGasto.value) {
      $q.notify({
        color: "negative",
        message: "El insumo es obligatorio",
        position: "top",
      });
      validacion = false;
    }
    if (!semillaGasto.value) {
      $q.notify({
        color: "negative",
        message: "La semilla es obligatoria",
        position: "top",
      });
      validacion = false;
    }
    if (!mantenimientoGasto.value) {
      $q.notify({
        color: "negative",
        message: "El mantenimiento es obligatorio",
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
  numeroFacturaGasto.value = "";
  descripcionGasto.value = "";
  totalGasto.value = "";
  insumoGasto.value = "";
  semillaGasto.value = "";
  mantenimientoGasto.value = "";
  console.log(obj);

  datos.value = obj;
  mostrarBotonEditar.value = false;
  if (obj != null && boolean == true) {
    nombreGasto.value = datos.value.nombre;
    fechaGasto.value = datos.value.fecha;
    numeroFacturaGasto.value = datos.value.numeroFactura;
    descripcionGasto.value = datos.value.descripcion;
    totalGasto.value = datos.value.total;
    insumoGasto.value = datos.value.insumos_id ? datos.value.insumos_id.id : "";
    semillaGasto.value = datos.value.semillas_id
      ? datos.value.semillas_id.id
      : "";
    mantenimientoGasto.value = datos.value.mantenimiento_id
      ? datos.value.mantenimiento_id.id
      : "";
    mostrarBotonEditar.value = true;
  }
  mostrarFormularioGasto.value = true;
}

// Llamadas iniciales
onMounted(async () => {
  await listarGastos();
  await listarInsumos();
  await listarSemillas();
  await listarProveedores();
});
</script>

<template>
  <div>
    <div class="q-pa-lg">
      <q-table :rows="rows" :columns="columns" row-key="id" :loading="loading">
        <template v-slot:top>
          <section class="column full-width q-pr-md">
            <div class="row items-center">
              <h1 class="text-h4 q-pl-xl text-green-7">Gastos</h1>
              <q-space />
              <q-btn
                size="md"
                @click="controlFormulario(null, true)"
                label="Agregar"
              />
            </div>
          </section>
        </template>

        <template v-slot:body-cell-opciones="props">
          <q-td :props="props" class="row justify-center" style="gap: 20px">
            <q-btn @click="controlFormulario(props.row, true)"> ✏️ </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
    <q-dialog v-model="mostrarFormularioGasto">
      <q-card>
        <q-form
          @submit="mostrarBotonEditar ? editar() : registrar()"
          class="q-gutter-md"
        >
          <p class="text-h5 text-center q-pb-md text-green">
            {{ datos ? "Editar" : "Agregar" }} Gasto
          </p>
          <q-input
            standout="bg-green text-white"
            type="text"
            label="Nombre"
            v-model="nombreGasto"
          />
          <q-input
            standout="bg-green text-white"
            type="date"
            label="Fecha"
            v-model="fechaGasto"
          />
          <q-input
            standout="bg-green text-white"
            type="text"
            label="Número de Factura"
            v-model="numeroFacturaGasto"
          />
          <q-input
            standout="bg-green text-white"
            type="text"
            label="Descripción"
            v-model="descripcionGasto"
          />
          <q-input
            standout="bg-green text-white"
            type="text"
            label="Total"
            v-model="totalGasto"
          />

          <!-- Selección de Insumo o Semilla -->
          <q-select
            standout="bg-green text-white"
            :options="[
              { label: 'Insumo', value: 'insumo' },
              { label: 'Semilla', value: 'semilla' },
            ]"
            label="Seleccionar Tipo"
            v-model="tipoSeleccionado"
            @change="mostrarFormularioPorTipo"
          />

          <q-select
            v-if="tipoSeleccionado === 'insumo'"
            standout="bg-green text-white"
            :options="opcionesInsumos"
            label="Insumo"
            v-model="insumoGasto"
          />

          <q-select
            v-if="tipoSeleccionado === 'semilla'"
            standout="bg-green text-white"
            :options="opcionesSemillas"
            label="Semilla"
            v-model="semillaGasto"
          />

          <!-- Formulario adicional para agregar datos de insumos/semillas -->
          <q-input
            standout="bg-green text-white"
            type="text"
            label="ID Proveedor"
            v-model="proveedorId"
            v-if="tipoSeleccionado"
          />
          <q-input
            standout="bg-green text-white"
            type="number"
            label="Unidad"
            v-model="unidad"
            v-if="tipoSeleccionado"
          />
          <q-input
            standout="bg-green text-white"
            type="number"
            label="Cantidad"
            v-model="cantidad"
            v-if="tipoSeleccionado"
          />

          <div class="row justify-end" style="gap: 10px">
            <q-btn
              unelevated
              v-if="mostrarBotonEditar"
              label="Editar"
              type="submit"
              color="positive"
            />
            <q-btn
              unelevated
              v-else
              label="Registrar"
              type="submit"
              color="positive"
            />
            <q-btn
              @click="controlFormulario(null, false)"
              flat
              class="bg-red text-white"
              label="Cerrar"
              type="button"
            />
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
