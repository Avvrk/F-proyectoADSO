<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
const $q = useQuasar();
// Variables para el funcionamiento de la tabla
let rows = ref([
  {
    cultivo_id: 'fce8e247' ,
    empleado_id: '749bc227' ,
    fecha: '2024-08-01' ,
    dias_transplante: 30 ,
    estado_fenologico: 'Floración' ,
    hora_inicio: '07:00' ,
    hora_fin: '08:00' ,
    dosis: 20 ,
    cantidad_agua: 1500
  },

  {
    cultivo_id: 'trs8e537' ,
    empleado_id: '471hy286' ,
    fecha: '2024-08-01' ,
    dias_transplante: 25 ,
    estado_fenologico: 'Inicial' ,
    hora_inicio: '05:00' ,
    hora_fin: '06:00' ,
    dosis: 18 ,
    cantidad_agua: 1200
  },



]);
let columns = ref([
  { name: 'cultivo_id', align: 'center', label: 'ID del Cultivo', field: 'cultivo_id', sortable: true },
  { name: 'empleado_id', align: 'center', label: 'ID del Empleado', field: 'empleado_id', sortable: true },
  { name: 'fecha', align: 'center', label: 'Fecha', field: 'fecha', sortable: true },
  { name: 'dias_transplante', align: 'center', label: 'Días Transplante', field: 'dias_transplante', sortable: true },
  { name: 'estado_fenologico', align: 'center', label: 'Estado Fenológico', field: 'estado_fenologico', sortable: true },
  { name: 'hora_inicio', align: 'center', label: 'Hora Inicio', field: 'hora_inicio', sortable: true },
  { name: 'hora_fin', align: 'center', label: 'Hora Fin', field: 'hora_fin', sortable: true },
  { name: 'dosis', align: 'center', label: 'Dósis', field: 'dosis', sortable: true },
  { name: 'cantidad_agua', align: 'center', label: 'Cantidad Agua', field: 'cantidad_agua', sortable: true },
  { name: 'estado', align: 'center', label: 'Estado', field: 'estado', sortable: true },
  { name: 'opciones', align: 'center', label: 'Opciones', field: 'opciones', sortable: true },
]);
onMounted(() => {
});
</script>

<template>
<div class="container">

<div class="title text-h2 text-center">
Riego
</div>
<hr class="divider">
<q-table v-if="!loading" flat bordered title="Lista de Riegos" :rows="rows" :columns="columns" row-key="id" class="table">
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
