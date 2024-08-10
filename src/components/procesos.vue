<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
const $q = useQuasar();
// Variables para el funcionamiento de la tabla
let rows = ref([
  {
    cultivo_id: '471806c1c' ,
    empleado_id: 'cf24a00a' ,
    tipo: 'Riego' ,
    descripcion: 'Riego inicial para el cultivo de tomates' ,
    fecha_inicio: '2024-08-01' ,
    fecha_final: '2024-08-01' ,
  },

  {
    cultivo_id: '1caa749bc' ,
    empleado_id: 'e8bf94' ,
    tipo: 'Fertilización' ,
    descripcion: 'Aplicación de fertilizante nitrogenado' ,
    fecha_inicio: '2024-08-05T10' ,
    fecha_final: '2024-08-05' ,
  },

]);
let columns = ref([
  { name: 'cultivo_id', align: 'center', label: 'ID del Cultivo', field: 'cultivo_id', sortable: true },
  { name: 'empleado_id', align: 'center', label: 'ID del Empleado', field: 'empleado_id', sortable: true },
  { name: 'tipo', align: 'center', label: 'tipo', field: 'tipo', sortable: true },
  { name: 'descripcion', align: 'center', label: 'descripcion', field: 'descripcion', sortable: true },
  { name: 'fecha_inicio', align: 'center', label: 'fecha_inicio', field: 'fecha_inicio', sortable: true },
  { name: 'fecha_final', align: 'center', label: 'fecha_final', field: 'fecha_final', sortable: true },
  { name: 'estado', align: 'center', label: 'Estado', field: 'estado', sortable: true },
  { name: 'opciones', align: 'center', label: 'Opciones', field: 'opciones', sortable: true },
]);
onMounted(() => {
});
</script>

<template>
<div class="container">

<div class="title text-h2 text-center">
Procesos
</div>
<hr class="divider">
<q-table v-if="!loading" flat bordered title="Lista de Procesos" :rows="rows" :columns="columns" row-key="id" class="table">
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
