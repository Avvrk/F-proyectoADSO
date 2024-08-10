<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
const $q = useQuasar();
// Variables para el funcionamiento de la tabla
let rows = ref([
  {
    proveedores_id: 'a849bc2154' ,
    nombre: 'Tractor John Deere' ,
    tipo: 'Tractor' ,
    fecha: '2024-07-12' ,
    fechaCompra: '2024-07-12',
    observaciones: 'Tractor de 100 HP, ideal para terrenos grandes',
    cantidad: 1 ,
    total: '$ 5.380.000'
  },

  {
    proveedores_id: 'ed6d40c8' ,
    nombre: 'Segadora de Cosecha' ,
    tipo: 'Segadora' ,
    fecha: '2024-08-03' ,
    fechaCompra: '2024-08-03',
    observaciones: 'Segadora eficiente para cultivos de maíz y trigo',
    cantidad: 1 ,
    total: '$ 5.380.000'
  },


]);
let columns = ref([
  { name: 'proveedores_id', align: 'center', label: 'Id de Proveedor', field: 'proveedores_id', sortable: true },
  { name: 'nombre', align: 'center', label: 'Nombre', field: 'nombre', sortable: true },
  { name: 'tipo', align: 'center', label: 'tipo', field: 'tipo', sortable: true },
  { name: 'fecha', align: 'center', label: 'fecha', field: 'fecha', sortable: true },
  { name: 'fechaCompra', align: 'center', label: 'Fecha de Compra', field: 'fechaCompra', sortable: true },
  { name: 'observaciones', align: 'center', label: 'Observaciones', field: 'observaciones', sortable: true },
  { name: 'cantidad', align: 'center', label: 'Cantidad', field: 'cantidad', sortable: true },
  { name: 'total', align: 'center', label: 'Total', field: 'total', sortable: true },
  { name: 'estado', align: 'center', label: 'Estado', field: 'estado', sortable:true },
  { name: 'opciones', align: 'center', label: 'Opciones', field: 'opciones', sortable:true }
]);
onMounted(() => {
});
</script>

<template>
<div class="container">

<div class="title text-h2 text-center">
Máquinaria y Herramientas
</div>
<hr class="divider">
<q-table v-if="!loading" flat bordered title="Lista de Máquinas y Herramientas" :rows="rows" :columns="columns" row-key="id" class="table">
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
