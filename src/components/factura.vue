<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
const $q = useQuasar();
// Variables para el funcionamiento de la tabla
let rows = ref([
  {
    fecha: '2024-08-10' ,
    valor: '$ 4.000' ,
    detalles: 'Compra de insumos para la siembra de maíz' ,
    inventario_id: '6476b4f70' ,
    cantidad: 100 ,
    nombreProducto: 'Fertilizante NPK 10-10-10' ,
    subtotal: '$ 400.000' ,
    iva: '$ 6.000' ,
    total: '$ 406.000',
    comprador_id: '6937f8w32'
  },

  {
    fecha: '2024-08-15' ,
    valor: '$ 3.500.000' ,
    detalles: 'Compra de maquinaria para la cosecha' ,
    inventario_id: '3672a5j61' ,
    cantidad: 1 ,
    nombreProducto: 'Cosechadora Modelo X' ,
    subtotal: '$ 3.500.000' ,
    iva: '$ 665.000' ,
    total: '$ 4.165.000',
    comprador_id: '6282r1c73'
  },


]);
let columns = ref([
  { name: 'fecha', align: 'center', label: 'Fecha', field: 'fecha', sortable: true },
  { name: 'valor', align: 'center', label: 'Valor Unitario', field: 'valor', sortable: true },
  { name: 'detalles', align: 'center', label: 'Detalles', field: 'detalles', sortable: true },
  { name: 'inventario_id', align: 'center', label: 'Id de Inventario', field: 'inventario_id', sortable: true },
  { name: 'cantidad', align: 'center', label: 'Cantidad', field: 'cantidad', sortable: true },
  { name: 'nombreProducto', align: 'center', label: 'Nombre de Producto', field: 'nombreProducto', sortable: true },
  { name: 'subtotal', align: 'center', label: 'Subtotal', field: 'subtotal', sortable: true },
  { name: 'iva', align: 'center', label: 'IVA', field: 'iva', sortable: true },
  { name: 'total', align: 'center', label: 'Total', field: 'total', sortable: true },
  { name: 'comprador_id', align: 'center', label: 'Id del Comprador', field: 'comprador_id', sortable: true },
]);
onMounted(() => {
});
</script>

<template>
<div class="container">

<div class="title text-h2 text-center">
Facturas
</div>
<hr class="divider">
<q-table v-if="!loading" flat bordered title="Lista de Facturas" :rows="rows" :columns="columns" row-key="id" class="table">
<template v-slot:body-cell-opciones="props">
  <q-td :props="props" class="actions-cell">
    <q-btn @click="editarVistaFondo(true, props.row, false)" class="btn-editar">
      ✏️
    </q-btn>
    <q-btn v-if="props.row.estado == 1" @click="editarEstado(props.row)" class="btn-inactivar">
      ❌
    </q-btn>
    <q-btn v-else @click="editarEstado(props.row)" class="btn-activar">
      ✅
    </q-btn>
  </q-td>
</template>
<template v-slot:body-cell-estado="props">
  <q-td :props="props" class="status-cell">
    <p v-if="props.row.estado == 1" class="status-activo">
      Activo
    </p>
    <p v-else class="status-inactivo">Inactivo</p>
  </q-td>
</template>
</q-table>
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
.btn-editar, .btn-inactivar, .btn-activar {
font-size: 1pc;
margin: 5px 5px;
}
.btn-editar {
color: #007bff;
}
.btn-inactivar {
color: #e74c3c;
}
.btn-activar {
color: #2ecc71;
}
.status-cell p {
margin: 0;
font-weight: bold;
}
.status-activo {
color: #2ecc71;
}
.status-inactivo {
color: #e74c3c;
}
</style>
