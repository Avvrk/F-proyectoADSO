<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
const $q = useQuasar();

// Variables para el funcionamiento de la tabla
let rows = ref([
  {
    nombre: 'Jorge Martínez',
    direccion: 'Cañaveral #23-123',
    telefono: 23454364565,
    estudios: 'Ingeniería Agrícola',
    descripcion: 'Responsabilidad',
  },
  {
    nombre: 'Yolanda Contreras',
    direccion: 'La Rosaleda, Carrera 32 #84A-32',
    telefono: 5676867546,
    estudios: 'Recursos Humanos',
    descripcion: 'Organización',
  },
]);

let columns = ref([
  { name: 'nombre', align: 'center', label: 'Nombre', field: 'nombre', sortable: true },
  { name: 'direccion', align: 'center', label: 'Dirección', field: 'direccion', sortable: true },
  { name: 'telefono', align: 'center', label: 'teléfono', field: 'telefono', sortable: true },
  { name: 'estudios', align: 'center', label: 'Estudios', field: 'estudios', sortable: true },
  { name: 'descripcion', align: 'center', label: 'Descripción', field: 'descripcion', sortable: true },
  { name: 'estado', align: 'center', label: 'Estado', field: 'estado', sortable: true },
  { name: 'opciones', align: 'center', label: 'Opciones', field: 'opciones', sortable: true },
]);
onMounted(() => {
});
</script>



<template>
<div class="container">

<div class="title text-h2 text-center">
Empleados
</div>
<hr class="divider">
<q-table v-if="!loading" flat bordered title="Lista de Empleados" :rows="rows" :columns="columns" row-key="id" class="table">
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
