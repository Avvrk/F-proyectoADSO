<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

// Datos de los gastos
let rows = ref([
  {
    nombre: 'Compra de insumos agrícolas',
    fecha: '2024-07-20',
    numeroFactura: 'FAC-12345',
    descripcion: 'Compra de fertilizantes y plaguicidas para el cultivo de maíz',
    total: '$ 150.000',
    insumos_id: '345d4h56',
  },
  {
    nombre: 'Mantenimiento de maquinaria',
    fecha: '2024-08-05',
    numeroFactura: 'FAC-12346',
    descripcion: 'Revisión y reparación de la cosechadora',
    total: '$ 580.000',
    mantenimiento_id: '476b4f90'
  },
]);

let columns = ref([
  { name: 'nombre', align: 'center', label: 'Nombre', field: 'nombre', sortable: true },
  { name: 'fecha', align: 'center', label: 'Fecha', field: 'fecha', sortable: true },
  { name: 'numeroFactura', align: 'center', label: 'Número de Factura', field: 'numeroFactura', sortable: true },
  { name: 'descripcion', align: 'center', label: 'Descripción', field: 'descripcion', sortable: true },
  { name: 'total', align: 'center', label: 'Total', field: 'total', sortable: true },
  { name: 'insumos_id', align: 'center', label: 'ID del Insumo', field: 'insumos_id', sortable: true },
  { name: 'mantenimiento_id', align: 'center', label: 'ID del Mantenimiento', field: 'mantenimiento_id', sortable: true },
  { name: 'opciones', align: 'center', label: 'Editar', field: 'opciones', sortable: true },
]);

// Información del gasto en edición
const editando = ref(false);
const gastoActual = ref({
  nombre: '',
  fecha: '',
  numeroFactura: '',
  descripcion: '',
  total: '',
  insumos_id: '',
  mantenimiento_id: ''
});

// Función para abrir la card de edición
function editarGasto(gasto) {
  gastoActual.value = { ...gasto };
  editando.value = true;
}

// Función para guardar los cambios del gasto
function guardarCambios() {
  const indice = rows.value.findIndex(g => g.numeroFactura === gastoActual.value.numeroFactura);
  if (indice !== -1) {
    rows.value[indice] = { ...gastoActual.value };
    $q.notify({
      type: 'positive',
      message: 'Cambios guardados exitosamente.'
    });
  }
  editando.value = false;
}

// Función para cerrar la card de edición
function cerrarEditar() {
  editando.value = false;
}

onMounted(() => {
  // Código para ejecutar al montar el componente
});
</script>

<template>
  <div class="container">
    <div class="title text-h2 text-center">Gastos</div>
    <hr class="divider">

    <!-- Tabla de gastos -->
    <q-table flat bordered title="Lista de Gastos" :rows="rows" :columns="columns" row-key="numeroFactura" class="table">
      <template v-slot:body-cell-opciones="props">
        <q-td :props="props" class="actions-cell">
          <q-btn @click="editarGasto(props.row)" class="btn-editar">✏️</q-btn>
        </q-td>
      </template>
    </q-table>

    <!-- Card de edición de gasto -->
    <q-dialog v-model="editando">
      <q-card>
        <q-card-section>
          <q-input v-model="gastoActual.nombre" label="Nombre"></q-input>
          <q-input v-model="gastoActual.fecha" label="Fecha" type="date"></q-input>
          <q-input v-model="gastoActual.numeroFactura" label="Número de Factura"></q-input>
          <q-input v-model="gastoActual.descripcion" label="Descripción"></q-input>
          <q-input v-model="gastoActual.total" label="Total"></q-input>
          <q-input v-model="gastoActual.insumos_id" label="ID del Insumo"></q-input>
          <q-input v-model="gastoActual.mantenimiento_id" label="ID del Mantenimiento"></q-input>
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