  <script setup>
  import { ref, onMounted } from "vue";
  import { useQuasar } from "quasar";
  const $q = useQuasar();
  // Variables para el funcionamiento de la tabla
  let rows = ref([
    {
      nombre: 'Francisco',
      direccion: 'Carrera 41 #32B-125, Bucaramanga',
      telefono: 123456789,
      email: 'Fran@gmail.com',
    },
    {
      nombre: 'Carlos',
      direccion: 'Cc La Castellana, piso 3 Local #29-31, Cali',
      telefono: 987654321,
      email: 'Carleto@gmail.com',
    },
  ]);
  let columns = ref([
    { name: 'nombre', align: 'center', label: 'Nombre', field: 'nombre', sortable: true },
    { name: 'direccion', align: 'center', label: 'Dirección', field: 'direccion', sortable: true },
    { name: 'telefono', align: 'center', label: 'Teléfono', field: 'telefono', sortable: true },
    { name: 'email', align: 'center', label: 'Email', field: 'email', sortable: true },
    { name: 'estado', align: 'center', label: 'Estado', field: 'estado', sortable: true },
    { name: 'opciones', align: 'center', label: 'Opciones', field: 'opciones', sortable: true },
  ]);
  onMounted(() => {
  });
  </script>

<template>
<div class="container">

<div class="title text-h2 text-center">
  Proveedores
</div>
<hr class="divider">
<q-table v-if="!loading" flat bordered title="Lista de Proveedores" :rows="rows" :columns="columns" row-key="id" class="table">
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
