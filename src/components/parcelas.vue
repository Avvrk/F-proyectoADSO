<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
const $q = useQuasar();
// Variables para el funcionamiento de la tabla
let rows = ref([
  {
    id_fincas: '6f9a7e7620' ,
    numero: 1,
    ubicacionGeografica: '4.5678,-74.3456' ,
    cultivoAnterior: 'Maíz' ,
    cultivoActual: 'Soja' ,
    detalle: 'Parcela ubicada cerca del arroyo' ,
    area: 40 ,
    asistenteTecnico: 'Juan Pérez'
  },

  {
    id_fincas: 'd6eee9a7e7' ,
    numero: 2,
    ubicacionGeografica: '6.5721,-73.1123' ,
    cultivoAnterior: 'Café' ,
    cultivoActual: 'Frijoles' ,
    detalle: 'Parcela con buen acceso al agua' ,
    area: 12 ,
    asistenteTecnico: 'Esperanza Gómez'
  },

  {
    id_fincas: '20df867f' ,
    numero: 3,
    ubicacionGeografica: '4.5647,-74.3356' ,
    cultivoAnterior: 'Maíz' ,
    cultivoActual: 'Soya' ,
    detalle: 'Parcela con riego automático' ,
    area: 30 ,
    asistenteTecnico: 'Juan Pérez'
  },

  {
    id_fincas: '66ad6eee9' ,
    numero: 4,
    ubicacionGeografica: '6.5698,-73.1081' ,
    cultivoAnterior: 'Arroz' ,
    cultivoActual: 'Café' ,
    detalle: 'Parcela en pendiente con control de erosión' ,
    area: 11.5,
    asistenteTecnico: 'Alejo Gonzalez'
  },


]);
let columns = ref([
  { name: 'id_fincas', align: 'center', label: 'Id Finca', field: 'id_fincas', sortable: true },
  { name: 'numero', align: 'center', label: 'Número', field: 'numero', sortable: true },
  { name: 'ubicacionGeografica', align: 'center', label: 'Ubicación Geográfica', field: 'ubicacionGeografica', sortable: true },
  { name: 'cultivoAnterior', align: 'center', label: 'Cultivo Anterior', field: 'cultivoAnterior', sortable: true },
  { name: 'cultivoActual', align: 'center', label: 'Cultivo Actual', field: 'cultivoActual', sortable: true },
  { name: 'detalle', align: 'center', label: 'Detalle', field: 'detalle', sortable: true },
  { name: 'area', align: 'center', label: 'Área', field: 'area', sortable: true },
  { name: 'asistenteTecnico', align: 'center', label: 'Asistente Técnico', field: 'asistenteTecnico', sortable: true },
  { name: 'estado', align: 'center', label: 'Estado', field: 'estado', sortable: true },
  { name: 'opciones', align: 'center', label: 'Opciones', field: 'opciones', sortable: true },
]);
onMounted(() => {
});
</script>

<template>
<div class="container">

<div class="title text-h2 text-center">
Parcelas
</div>
<hr class="divider">
<q-table v-if="!loading" flat bordered title="Lista de Parcelas" :rows="rows" :columns="columns" row-key="id" class="table">
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
