<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
const $q = useQuasar();
// Variables para el funcionamiento de la tabla
let rows = ref([
  {
    id_cultivo: '749bc227' ,
    empleado_id: '422a763ab' ,
    fecha: '2024-08-01' ,
    estadoFenologico: 'inicial' ,
    tipo: 'Antes de Siembra' ,
    nombreFertilizante: 'Fertilizante NPK 10-10-10' ,
    cantidad: 100 ,
    inventario_id: '476b4f71'
  },

  {
    id_cultivo: '66b4a789' ,
    empleado_id: 'aec0122' ,
    fecha: '2024-08-10' ,
    estadoFenologico: 'floración' ,
    tipo: 'Después de siembra' ,
    nombreFertilizante: 'Fertilizante Orgánico BioGrow' ,
    cantidad: 150 ,
    inventario_id: '6b4c73164'
  },


]);
let columns = ref([
  { name: 'id_cultivo', align: 'center', label: 'Id del Cultivo', field: 'id_cultivo', sortable: true },
  { name: 'empleado_id', align: 'center', label: 'Id del Empleado', field: 'empleado_id', sortable: true },
  { name: 'fecha', align: 'center', label: 'fecha', field: 'fecha', sortable: true },
  { name: 'estadoFenologico', align: 'center', label: 'Estado Fenológico', field: 'estadoFenologico', sortable: true },
  { name: 'tipo', align: 'center', label: 'Tipo', field: 'tipo', sortable: true },
  { name: 'nombreFertilizante', align: 'center', label: 'Nombre del Fertilizante', field: 'nombreFertilizante', sortable: true },
  { name: 'cantidad', align: 'center', label: 'Cantidad', field: 'cantidad', sortable: true },
  { name: 'inventario_id', align: 'center', label: 'Id del Inventario', field: 'inventario_id', sortable: true },
]);
onMounted(() => {
});
</script>

<template>
<div class="container">

<div class="title text-h2 text-center">
Fertilizaciones
</div>
<hr class="divider">
<q-table v-if="!loading" flat bordered title="Lista de Fertilizaciones" :rows="rows" :columns="columns" row-key="id" class="table">
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
