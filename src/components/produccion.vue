<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
const $q = useQuasar();
// Variables para el funcionamiento de la tabla
let rows = ref([
  {
    cultivo_id: 2343543543,
    fecha: '10-08-2024',
    numeroLote: 11,
    especie: 'Frutas',
    cantidad: 500 ,
    cantidadTrabajadores: 7 ,
    observaciones: 'Nada'
  },

  {
    cultivo_id: 56575684,
    fecha: '08-08-2024',
    numeroLote: 6,
    especie: 'Hortalizas',
    cantidad: 700 ,
    cantidadTrabajadores: 11 ,
    observaciones: 'Regar con agua cada 8 horas'
  },

]);
let columns = ref([
  { name: 'cultivo_id', align: 'center', label: 'ID del Cultivo', field: 'cultivo_id', sortable: true },
  { name: 'fecha', align: 'center', label: 'Fecha', field: 'fecha', sortable: true },
  { name: 'numeroLote', align: 'center', label: 'Número de Lote', field: 'numeroLote', sortable: true },
  { name: 'especie', align: 'center', label: 'Especie', field: 'especie', sortable: true },
  { name: 'cantidad', align: 'center', label: 'Cantidad', field: 'cantidad', sortable: true },
  { name: 'cantidadTrabajadores', align: 'center', label: 'Cantidad de Trabajadores', field: 'cantidadTrabajadores', sortable: true },
  { name: 'observaciones', align: 'center', label: 'Observaciones', field: 'observaciones', sortable: true },
  { name: 'estado', align: 'center', label: 'Estado', field: 'estado', sortable: true },
  { name: 'opciones', align: 'center', label: 'Opciones', field: 'opciones', sortable: true },
]);
onMounted(() => {
});
</script>

<template>
<div class="container">

<div class="title text-h2 text-center">
Producción
</div>
<hr class="divider">
<q-table v-if="!loading" flat bordered title="Lista de Producciones" :rows="rows" :columns="columns" row-key="id" class="table">
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
