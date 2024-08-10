<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
const $q = useQuasar();
// Variables para el funcionamiento de la tabla
let rows = ref([
  {
    nombre: 'Compra de insumos agrícolas' ,
    fecha: '2024-07-20' ,
    numeroFactura: 'FAC-12345' ,
    descripcion: 'Compra de fertilizantes y plaguicidas para el cultivo de maíz' ,
    total: '$ 150.000' ,
    insumos_id: '345d4h56'
  },

  {
    nombre: 'Mantenimiento de maquinaria' ,
    fecha: '2024-08-05' ,
    numeroFactura: 'FAC-12346' ,
    descripcion: 'Revisión y reparación de la cosechadora' ,
    total: '$ 580.000' ,
    mantenimiento_id: '476b4f90'
  },

]);

let columns = ref([
  { name: 'nombre', align: 'center', label: 'nombre', field: 'nombre', sortable: true },
  { name: 'fecha', align: 'center', label: 'fecha', field: 'fecha', sortable: true },
  { name: 'numeroFactura', align: 'center', label: 'Número de Factura', field: 'numeroFactura', sortable: true },
  { name: 'descripcion', align: 'center', label: 'Descripción', field: 'descripcion', sortable: true },
  { name: 'total', align: 'center', label: 'Total', field: 'total', sortable: true },
  { name: 'insumos_id', align: 'center', label: 'Id del Insumo', field: 'insumos_id', sortable: true },
  { name: 'semillas_id', align: 'center', label: 'Id Semilla', field: 'semillas_id', sortable: true },
  { name: 'mantenimiento_id', align: 'center', label: 'Id del Mantenimiento', field: 'mantenimiento_id', sortable: true },
]);
onMounted(() => {
});
</script>

<template>
<div class="container">

<div class="title text-h2 text-center">
Gastos
</div>
<hr class="divider">
<q-table v-if="!loading" flat bordered title="Lista de Gastos" :rows="rows" :columns="columns" row-key="id" class="table">
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
