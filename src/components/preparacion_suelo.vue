<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
const $q = useQuasar();
// Variables para el funcionamiento de la tabla
let rows = ref([
  {
    fecha: '2024-07-10',
    id_parcela: '7eb79a7e7',
    empleado_id: '12214b1',
    productos: 'Fertilizante NPK 10-10-10',
    ingredienteActivo: 'Nitrógeno, Fósforo, Potasio',
    dosis: 50,
    metodoAplicacion: 'Aplicación foliar',
    operario: 'Luis Rodríguez',
    responsable: 'María Fernández',
    observaciones: 'Aplicar en condiciones de humedad para mejor absorción'
  },

  {
    fecha: '2024-08-01',
    id_parcela: '7f0f0dcb8e',
    empleado_id: '987cf24a0',
    productos: 'Cal en polvo',
    ingredienteActivo: 'Carbonato de Calcio',
    dosis: 25,
    metodoAplicacion: 'Incorporación al suelo',
    operario: 'Esperanza Gómez',
    responsable: 'Carlos López',
    observaciones: 'Verificar pH del suelo después de la aplicación'
  },


]);
let columns = ref([
  { name: 'fecha', align: 'center', label: 'Fecha', field: 'fecha', sortable: true },
  { name: 'id_parcela', align: 'center', label: 'Id de la Parcela', field: 'id_parcela', sortable: true },
  { name: 'empleado_id', align: 'center', label: 'Id del Empleado', field: 'empleado_id', sortable: true },
  { name: 'productos', align: 'center', label: 'Productos', field: 'productos', sortable: true },
  { name: 'ingredienteActivo', align: 'center', label: 'Ingredientes Activos', field: 'ingredienteActivo', sortable: true },
  { name: 'dosis', align: 'center', label: 'Dósis', field: 'dosis', sortable: true },
  { name: 'metodoAplicacion', align: 'center', label: 'Método de Aplicación', field: 'metodoAplicacion', sortable: true },
  { name: 'operario', align: 'center', label: 'Operario', field: 'operario', sortable: true },
  { name: 'responsable', align: 'center', label: 'Responsable', field: 'responsable', sortable: true },
  { name: 'observaciones', align: 'center', label: 'Observaciones', field: 'observaciones', sortable: true },
  { name: 'opciones', align: 'center', label: 'Editar', field: 'opciones', sortable: true },


]);
onMounted(() => {
});
</script>

<template>
<div class="container">

<div class="title text-h2 text-center">
Preparación de Suelos
</div>
<hr class="divider">
<q-table v-if="!loading" flat bordered title="Lista de Preparaciones de Suelos" :rows="rows" :columns="columns" row-key="id" class="table">
<template v-slot:body-cell-opciones="props">
<q-td :props="props" class="actions-cell">
<q-btn @click="editarVistaFondo(true, props.row, false)" class="btn-editar">
  ✏️
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
