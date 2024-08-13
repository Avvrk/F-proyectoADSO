<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
const $q = useQuasar();
// Variables para el funcionamiento de la tabla
let rows = ref([
  {
    gastos_id: 'd69cb22d' ,
    id_herramienta: 'b51a860c17' ,
    fecha: '2024-07-15' ,
    verificacionRealizada: 'Cambio de aceite y revisión del sistema hidráulico' ,
    calibracion: 'Calibración de presión realizada',
    responsable: 'Carlos Martínez',
    observaciones: 'Se recomendó revisar los niveles de aceite cada 50 horas de uso'
  },

  {
    gastos_id: '721a2181' ,
    id_herramienta: 'afe617924f' ,
    fecha: '2024-08-02' ,
    verificacionRealizada: 'Reparación de la bomba de agua' ,
    calibracion: 'No se realizó calibración',
    responsable: 'Emilia López',
    observaciones: 'Se debe verificar el funcionamiento antes del próximo uso'
  },


]);
let columns = ref([
  { name: 'gastos_id', align: 'center', label: 'Id Gasto', field: 'gastos_id', sortable: true },
  { name: 'id_herramienta', align: 'center', label: 'ID Herramienta', field: 'id_herramienta', sortable: true },
  { name: 'fecha', align: 'center', label: 'Fecha', field: 'fecha', sortable: true },
  { name: 'verificacionRealizada', align: 'center', label: 'Verificación Realizada', field: 'verificacionRealizada', sortable: true },
  { name: 'calibracion', align: 'center', label: 'Calibración', field: 'calibracion', sortable: true },
  { name: 'responsable', align: 'center', label: 'Responsable', field: 'responsable', sortable: true },
  { name: 'observaciones', align: 'center', label: 'Observaciones', field: 'observaciones', sortable: true },

]);
onMounted(() => {
});
</script>

<template>
<div class="container">

<div class="title text-h2 text-center">
Mantenimientos
</div>
<hr class="divider">
<q-table v-if="!loading" flat bordered title="Lista de Mantenimientos" :rows="rows" :columns="columns" row-key="id" class="table">
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
