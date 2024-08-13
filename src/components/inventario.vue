<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
const $q = useQuasar();
// Variables para el funcionamiento de la tabla
let rows = ref([
  {
    tipo: 'Insumo' ,
    observacion: 'Nuevo lote de pesticida recibido' ,
    unidad: 'litros' ,
    cantidad: '150' ,
    fecha: '2024-08-15',
    insumos_id: '4b4c6fbfd8a6bfa9',
  },

  {
    tipo: 'Semilla' ,
    observacion: 'Lote de semillas de maíz recibido' ,
    unidad: 'kilogramos' ,
    cantidad: '500' ,
    fecha: '2024-08-20',
    semillas_id: '4b4c6fbfd8a6bf',
  },
  {
    tipo: 'Maquinaria' ,
    observacion: 'Nueva sembradora adquirida' ,
    unidad: 'unidad' ,
    cantidad: '1' ,
    fecha: '2024-08-25',
    maquinaria_id: 'b4c6fbfd8a6bfa',
  },
  {
    tipo: 'Herramienta' ,
    observacion: 'Nueva podadora adquirida para la cosecha' ,
    unidad: 'unidad' ,
    cantidad: '3' ,
    fecha: '2024-08-30',
    maquinaria_id: 'fd8a6bfa9e0',
  },


]);
let columns = ref([
  { name: 'tipo', align: 'center', label: 'Tipo', field: 'tipo', sortable: true },
  { name: 'observacion', align: 'center', label: 'Observación', field: 'observacion', sortable: true },
  { name: 'unidad', align: 'center', label: 'Unidad', field: 'unidad', sortable: true },
  { name: 'cantidad', align: 'center', label: 'Cantidad', field: 'cantidad', sortable: true },
  { name: 'fecha', align: 'center', label: 'Fecha', field: 'fecha', sortable: true },
  { name: 'semillas_id', align: 'center', label: 'Id Semilla', field: 'semillas_id', sortable: true },
  { name: 'insumos_id', align: 'center', label: 'Id Insumo', field: 'insumos_id', sortable: true },
  { name: 'maquinaria_id', align: 'center', label: 'Id Herramienta', field: 'maquinaria_id', sortable: true },


]);
onMounted(() => {
});
</script>

<template>
<div class="container">

<div class="title text-h2 text-center">
Inventario
</div>
<hr class="divider">
<q-table v-if="!loading" flat bordered title="Lista de Inventario" :rows="rows" :columns="columns" row-key="id" class="table">
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
