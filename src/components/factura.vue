<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

// Datos de las Facturas
let filas = ref([
  {
    fecha: '2024-08-10',
    valor: '$ 4.000',
    detalles: 'Compra de insumos para la siembra de maíz',
    inventario_id: '6476b4f70',
    cantidad: 100,
    nombreProducto: 'Fertilizante NPK 10-10-10',
    subtotal: '$ 400.000',
    iva: '$ 6.000',
    total: '$ 406.000',
    comprador_id: '6937f8w32'
  },
  {
    fecha: '2024-08-15',
    valor: '$ 3.500.000',
    detalles: 'Compra de maquinaria para la cosecha',
    inventario_id: '3672a5j61',
    cantidad: 1,
    nombreProducto: 'Cosechadora Modelo X',
    subtotal: '$ 3.500.000',
    iva: '$ 665.000',
    total: '$ 4.165.000',
    comprador_id: '6282r1c73'
  }
]);

let columnas = ref([
  { name: 'fecha', align: 'center', label: 'Fecha', field: 'fecha', sortable: true },
  { name: 'comprador_id', align: 'center', label: 'Id del Comprador', field: 'comprador_id', sortable: true },
  { name: 'inventario_id', align: 'center', label: 'Id de Inventario', field: 'inventario_id', sortable: true },
  { name: 'nombreProducto', align: 'center', label: 'Nombre de Producto', field: 'nombreProducto', sortable: true },
  { name: 'valor', align: 'center', label: 'Valor Unitario', field: 'valor', sortable: true },
  { name: 'cantidad', align: 'center', label: 'Cantidad', field: 'cantidad', sortable: true },
  { name: 'detalles', align: 'center', label: 'Detalles', field: 'detalles', sortable: true },
  { name: 'subtotal', align: 'center', label: 'Subtotal', field: 'subtotal', sortable: true },
  { name: 'iva', align: 'center', label: 'IVA', field: 'iva', sortable: true },
  { name: 'total', align: 'center', label: 'Total', field: 'total', sortable: true },
  { name: 'opciones', align: 'center', label: 'Editar', field: 'opciones', sortable: true },
]);

// Información que lleva la factura
const editando = ref(false);
const facturaActual = ref({
  fecha: '',
  comprador_id: '',
  inventario_id: '',
  valor: '',
  cantidad: '',
  detalles: '',
  // nombreProducto: '',
  // subtotal: '',
  // iva: '',
  // total: '',
});

// Función para abrir la card de edición
function editarFactura(factura) {
  facturaActual.value = { ...factura };
  editando.value = true;
}

// Función para guardar los cambios de la factura
function guardarCambios() {
  const indice = filas.value.findIndex(fact => fact.inventario_id === facturaActual.value.inventario_id);
  if (indice !== -1) {
    filas.value[indice] = { ...facturaActual.value };
    $q.notify({
      type: 'positive',
      message: 'Cambios guardados exitosamente.'
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
    <div class="title text-h2 text-center">Facturas</div>
    <hr class="divider">

    <!-- Tabla de facturas -->
    <q-table flat bordered title="Lista de Facturas" :rows="filas" :columns="columnas" row-key="inventario_id" class="table">
      <template v-slot:body-cell-opciones="props">
        <q-td :props="props" class="actions-cell">
          <q-btn @click="editarFactura(props.row)" class="btn-editar">✏️</q-btn>
        </q-td>
      </template>
    </q-table>

    <!-- Tabla de edición de la Factura -->
    <q-dialog v-model="editando">
      <q-card>
        <q-card-section>
          <q-input v-model="facturaActual.fecha" label="Fecha" type="date"></q-input>
          <q-input v-model="facturaActual.comprador_id" label="Comprador"></q-input>
          <q-input v-model="facturaActual.inventario_id" label="Id Inventario"></q-input>
          <!-- <q-input v-model="facturaActual.nombreProducto" label="Nombre del Producto"></q-input> -->
          <!-- <q-input v-model="facturaActual.valor" label="Valor"></q-input> -->
          <q-input v-model="facturaActual.cantidad" label="Cantidad" type="number"></q-input>
          <q-input v-model="facturaActual.detalles" label="Detalles"></q-input>
          <!-- <q-input v-model="facturaActual.subtotal" label="Subtotal"></q-input>
          <q-input v-model="facturaActual.iva" label="IVA"></q-input>
          <q-input v-model="facturaActual.total" label="Total"></q-input> -->
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