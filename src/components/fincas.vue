<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

// Datos de las Fincas
let rows = ref([
  {
    _idAdmin: 34546546,
    nombre: 'Julian',
    rut: 8765421,
    direccion: 'Vereda Los Naranjales',
    ubicacionGeografica: 83274983,
    departamento: 'Santander',
    ciudad: 'Barichara',
    limites: 6787678923,
    area: '5000 Km',
    estado: 1
  },
  {
    _idAdmin: 456547657,
    nombre: 'Fernando',
    rut: 45657345,
    direccion: 'Vereda Robles Km 5',
    ubicacionGeografica: 34546567,
    departamento: 'Santander',
    ciudad: 'Villanueva',
    limites: 5645345345,
    area: '3000 Km',
    estado: 0
  }
]);

let columns = ref([
  { name: '_idAdmin', align: 'center', label: 'ID de Administrador', field: '_idAdmin', sortable: true },
  { name: 'nombre', align: 'center', label: 'Nombre', field: 'nombre', sortable: true },
  { name: 'rut', align: 'center', label: 'RUT', field: 'rut', sortable: true },
  { name: 'direccion', align: 'center', label: 'Dirección', field: 'direccion', sortable: true },
  { name: 'ubicacionGeografica', align: 'center', label: 'Ubicación Geográfica', field: 'ubicacionGeografica', sortable: true },
  { name: 'departamento', align: 'center', label: 'Departamento', field: 'departamento', sortable: true },
  { name: 'ciudad', align: 'center', label: 'Ciudad', field: 'ciudad', sortable: true },
  { name: 'limites', align: 'center', label: 'Límites', field: 'limites', sortable: true },
  { name: 'area', align: 'center', label: 'Área', field: 'area', sortable: true },
  { name: 'estado', align: 'center', label: 'Estado', field: 'estado', sortable: true },
  { name: 'opciones', align: 'center', label: 'Opciones', field: 'opciones', sortable: true },
]);

// Información de la finca en edición
const editando = ref(false);
const fincaActual = ref({
  _idAdmin: '',
  nombre: '',
  rut: '',
  direccion: '',
  ubicacionGeografica: '',
  departamento: '',
  ciudad: '',
  limites: '',
  area: '',
});

// Función para abrir la card de edición
function editarFinca(finca) {
  fincaActual.value = { ...finca };
  editando.value = true;
}

// Función para guardar los cambios de la finca
function guardarCambios() {
  const indice = rows.value.findIndex(finca => finca._idAdmin === fincaActual.value._idAdmin);
  if (indice !== -1) {
    rows.value[indice] = { ...fincaActual.value };
    $q.notify({
      type: 'positive',
      message: 'Cambios guardados exitosamente.'
    });
  }
  editando.value = false;
}

// Función para cerrar la card de edición
function cerrarEditar() {
  editando.value = false;
}

// Función para cambiar el estado de la finca
function editarEstado(finca) {
  const indice = rows.value.findIndex(f => f._idAdmin === finca._idAdmin);
  if (indice !== -1) {
    rows.value[indice].estado = rows.value[indice].estado === 1 ? 0 : 1;
  }
}

onMounted(() => {

});
</script>

<template>
  <div class="container">
    <div class="title text-h2 text-center">Fincas</div>
    <hr class="divider">

    <!-- Tabla de fincas -->
    <q-table flat bordered title="Lista de Fincas" :rows="rows" :columns="columns" row-key="_idAdmin" class="table">
      <template v-slot:body-cell-opciones="props">
        <q-td :props="props" class="actions-cell">
          <q-btn @click="editarFinca(props.row)" class="btn-editar">✏️</q-btn>
          <q-btn v-if="props.row.estado == 1" @click="editarEstado(props.row)" class="btn-inactivar">❌</q-btn>
          <q-btn v-else @click="editarEstado(props.row)" class="btn-activar">✅</q-btn>
        </q-td>
      </template>
      <template v-slot:body-cell-estado="props">
        <q-td :props="props" class="status-cell">
          <p v-if="props.row.estado == 1" class="status-activo">Activo</p>
          <p v-else class="status-inactivo">Inactivo</p>
        </q-td>
      </template>
    </q-table>

    <!-- Tabla para la edición de la Finca -->
    <q-dialog v-model="editando">
      <q-card>
        <q-card-section>
          <q-input v-model="fincaActual._idAdmin" label="ID de Administrador"></q-input>
          <q-input v-model="fincaActual.nombre" label="Nombre"></q-input>
          <q-input v-model="fincaActual.rut" label="RUT" type="number"></q-input>
          <q-input v-model="fincaActual.direccion" label="Dirección"></q-input>
          <q-input v-model="fincaActual.ubicacionGeografica" label="Ubicación Geográfica" type="number"></q-input>
          <q-input v-model="fincaActual.departamento" label="Departamento"></q-input>
          <q-input v-model="fincaActual.ciudad" label="Ciudad"></q-input>
          <q-input v-model="fincaActual.limites" label="Límites" type="number"></q-input>
          <q-input v-model="fincaActual.area" label="Área"></q-input>
        </q-card-section>
        <q-card-actions>
          <q-btn @click="guardarCambios" color="primary">Guardar</q-btn>
          <q-btn @click="cerrarEditar" color="secondary">Cancelar</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
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