<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

// Datos de las Fertilizaciones
let rows = ref([
  {
    id_cultivo: '749bc227',
    empleado_id: '422a763ab',
    fecha: '2024-08-01',
    estadoFenologico: 'inicial',
    tipo: 'Antes de Siembra',
    nombreFertilizante: 'Fertilizante NPK 10-10-10',
    cantidad: 100,
    inventario_id: '476b4f71'
  },
  {
    id_cultivo: '66b4a789',
    empleado_id: 'aec0122',
    fecha: '2024-08-10',
    estadoFenologico: 'floración',
    tipo: 'Después de siembra',
    nombreFertilizante: 'Fertilizante Orgánico BioGrow',
    cantidad: 150,
    inventario_id: '6b4c73164'
  },
]);

let columns = ref([
  { name: 'id_cultivo', align: 'center', label: 'Id del Cultivo', field: 'id_cultivo', sortable: true },
  { name: 'fecha', align: 'center', label: 'Fecha', field: 'fecha', sortable: true },
  { name: 'empleado_id', align: 'center', label: 'Id del Empleado', field: 'empleado_id', sortable: true },
  { name: 'tipo', align: 'center', label: 'Tipo', field: 'tipo', sortable: true },
  { name: 'estadoFenologico', align: 'center', label: 'Estado Fenológico', field: 'estadoFenologico', sortable: true },
  { name: 'inventario_id', align: 'center', label: 'Id del Inventario', field: 'inventario_id', sortable: true },
  { name: 'nombreFertilizante', align: 'center', label: 'Nombre del Fertilizante', field: 'nombreFertilizante', sortable: true },
  { name: 'cantidad', align: 'center', label: 'Cantidad Aplicada', field: 'cantidad', sortable: true },
  { name: 'opciones', align: 'center', label: 'Editar', field: 'opciones', sortable: true },
]);

// Información que lleva la fertilización
const editando = ref(false);
const fertilizacionActual = ref({
  id_cultivo: '',
  fecha: '',
  empleado_id: '',
  tipo: '',
  estadoFenologico: '',
  inventario_id: '',
  nombreFertilizante: '',
  cantidad: '',
});

// Función para abrir la card de edición
function editarFertilizacion(fertilizacion) {
  fertilizacionActual.value = { ...fertilizacion };
  editando.value = true;
}

// Función para guardar los cambios de la Fertilización
function guardarCambios() {
  const indice = rows.value.findIndex(fert => fert.id_cultivo === fertilizacionActual.value.id_cultivo);
  if (indice !== -1) {
    rows.value[indice] = { ...fertilizacionActual.value };
    $q.notify({
      type: 'positive',
      message: 'Cambios guardados exitosamente.'
    });
  } else {
    $q.notify({
      type: 'negative',
      message: 'No se encontró la fertilización para actualizar.'
    });
  }
  editando.value = false;
}

// Función para cerrar la card de editar
function cerrarEditar() {
  editando.value = false;
}

onMounted(() => {

});
</script>

<template>
  <div class="container">
    <div class="title text-h2 text-center">Fertilizaciones</div>
    <hr class="divider">

    <!-- Tabla de fertilizaciones -->
    <q-table flat bordered title="Lista de Fertilizaciones" :rows="rows" :columns="columns" row-key="id_cultivo" class="table">
      <template v-slot:body-cell-opciones="props">
        <q-td :props="props" class="actions-cell">
          <q-btn @click="editarFertilizacion(props.row)" class="btn-editar">✏️</q-btn>
        </q-td>
      </template>
    </q-table>

    <!-- Tabla para la edición de la Fertilización -->
    <q-dialog v-model="editando">
      <q-card>
        <q-card-section>
          <q-input v-model="fertilizacionActual.id_cultivo" label="Id Cultivo"></q-input>
          <q-input v-model="fertilizacionActual.fecha" label="Fecha" type="date"></q-input>
          <q-input v-model="fertilizacionActual.empleado_id" label="Id Empleado"></q-input>
          <q-input v-model="fertilizacionActual.tipo" label="Tipo"></q-input>
          <q-input v-model="fertilizacionActual.estadoFenologico" label="Estado Fenológico"></q-input>
          <q-input v-model="fertilizacionActual.inventario_id" label="Id Inventario"></q-input>
          <q-input v-model="fertilizacionActual.nombreFertilizante" label="Nombre del Fertilizante"></q-input>
          <q-input v-model="fertilizacionActual.cantidad" label="Cantidad Aplicada" type="number"></q-input>
        </q-card-section>
        <q-card-actions>
          <q-btn @click="guardarCambios" color="primary">Guardar</q-btn>
          <q-btn @click="cerrarEditar" color="secondary">Cancelar</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
}
.title {
  margin-top: 20px;
  margin-bottom: 20px;
  color: #333;
}
.divider {
  height: 5px;
  background-color: #007bff;
  border: none;
  margin: 20px 0;
}
.table {
  margin-top: 40px;
  border-radius: 10px;
  overflow: hidden;
}
.actions-cell {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.btn-editar {
  font-size: 1pc;
  margin: 5px 5px;
  color: #007bff;
}
</style>