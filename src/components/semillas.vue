<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
const $q = useQuasar();
// Variables para el funcionamiento de la tabla
let rows = ref([
  {
    proveedor_id: '836ed6d40' ,
    fechaCompra: '2024-07-15' ,
    fechaVencimiento: '2025-07-15' ,
    especieVariedad: 'Tomate Cherry' ,
    proveedorSemilla: 'Semillas del Valle' ,
    numeroLote: 'Lote-04' ,
    origen: 'Nacional',
    poderGerminativo: '85%',
    observaciones: 'Semillas de alta calidad para cultivo en invernadero',
    unidad: '$ 11.000',
    total: 1000
  },

  {
    proveedor_id: '927ab2d30',
    fechaCompra: '2024-08-05',
    fechaVencimiento: '2025-08-05',
    especieVariedad: 'Pimiento Rojo',
    proveedorSemilla: 'Semillas del Sol',
    numeroLote: 'Lote-12',
    origen: 'Importado',
    poderGerminativo: '90%',
    observaciones: 'Semillas ideales para cultivo al aire libre, resistencia a enfermedades',
    unidad: '$ 8.500',
    total: 800
}

]);
let columns = ref([
  { name: 'proveedor_id', align: 'center', label: 'Id del Proveedor', field: 'proveedor_id', sortable: true },
  { name: 'fechaCompra', align: 'center', label: 'Fecha Compra', field: 'fechaCompra', sortable: true },
  { name: 'fechaVencimiento', align: 'center', label: 'fecha Vencimiento', field: 'fechaVencimiento', sortable: true },
  { name: 'especieVariedad', align: 'center', label: 'Especie Variedad', field: 'especieVariedad', sortable: true },
  { name: 'proveedorSemilla', align: 'center', label: 'Proveedor Semilla', field: 'proveedorSemilla', sortable: true },
  { name: 'numeroLote', align: 'center', label: 'Número de Lote', field: 'numeroLote', sortable: true },
  { name: 'origen', align: 'center', label: 'Origen', field: 'origen', sortable: true },
  { name: 'poderGerminativo', align: 'center', label: 'Poder Germinativo', field: 'poderGerminativo', sortable: true },
  { name: 'observaciones', align: 'center', label: 'Observaciones', field: 'observaciones', sortable: true },
  { name: 'unidad', align: 'center', label: 'Unidad', field: 'unidad', sortable: true },
  { name: 'total', align: 'center', label: 'Total Semillas', field: 'total', sortable: true },
  { name: 'estado', align: 'center', label: 'Estado', field: 'estado', sortable: true },
  { name: 'opciones', align: 'center', label: 'Opciones', field: 'opciones', sortable: true },
]);
onMounted(() => {
});
</script>

<template>
<div class="container">

<div class="title text-h2 text-center">
Semillas
</div>
<hr class="divider">
<q-table v-if="!loading" flat bordered title="Lista de Semillas" :rows="rows" :columns="columns" row-key="id" class="table">
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
