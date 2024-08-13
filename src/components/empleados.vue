<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();

// Datos de los empleados
let filas = ref([
  {
    nombre: 'Jorge Martínez',
    direccion: 'Cañaveral #23-123',
    telefono: 23454364565,
    estudios: 'Ingeniería Agrícola',
    descripcion: 'Responsabilidad',
    estado: 1
  },
  {
    nombre: 'Yolanda Contreras',
    direccion: 'La Rosaleda, Carrera 32 #84A-32',
    telefono: 5676867546,
    estudios: 'Recursos Humanos',
    descripcion: 'Organización',
    estado: 0
  },
]);

let columnas = ref([
  { name: 'nombre', align: 'center', label: 'Nombre', field: 'nombre', sortable: true },
  { name: 'direccion', align: 'center', label: 'Dirección', field: 'direccion', sortable: true },
  { name: 'telefono', align: 'center', label: 'Teléfono', field: 'telefono', sortable: true },
  { name: 'estudios', align: 'center', label: 'Estudios', field: 'estudios', sortable: true },
  { name: 'descripcion', align: 'center', label: 'Descripción', field: 'descripcion', sortable: true },
  { name: 'estado', align: 'center', label: 'Estado', field: 'estado', sortable: true },
  { name: 'opciones', align: 'center', label: 'Opciones', field: 'opciones', sortable: true },
]);

// Datos del Empleado
const Editando = ref(false);
const empleadoActual = ref({
  nombre: '',
  direccion: '',
  telefono: '',
  estudios: '',
  descripcion: '',
  estado: 1
});

// Función para cambiar el estado entre activo e inactivo
function cambiarEstado(empleado) {
  empleado.estado = empleado.estado === 1 ? 0 : 1;
}

// Función para abrir la card para editar el empleado
function abrirModalEdicion(empleado) {
  empleadoActual.value = { ...empleado };
  Editando.value = true;
}

// Función para guardar los cambios realizados
function guardarCambios() {
  const indice = filas.value.findIndex(emp => emp.nombre === empleadoActual.value.nombre);
  if (indice !== -1) {
    filas.value[indice] = { ...empleadoActual.value };
    $q.notify({
      type: 'positive',
      message: 'Cambios guardados exitosamente.'
    });
  }
  Editando.value = false;
}

// Función para cerrar la card de para editar el empleado
function cancelarEdicion() {
  Editando.value = false;
}
</script>

<template>
  <div class="container">
    <div class="title text-h2 text-center">Empleados</div>
    <hr class="divider">

    <!-- Tabla de empleados -->
    <q-table flat bordered title="Lista de Empleados" :rows="filas" :columns="columnas" row-key="nombre" class="table">
      <template v-slot:body-cell-opciones="props">
        <q-td :props="props" class="actions-cell">
          <q-btn @click="abrirModalEdicion(props.row)" class="btn-editar">✏️</q-btn>
          <q-btn v-if="props.row.estado === 1" @click="cambiarEstado(props.row)" class="btn-inactivar">❌</q-btn>
          <q-btn v-else @click="cambiarEstado(props.row)" class="btn-activar">✅</q-btn>
        </q-td>
      </template>
      <template v-slot:body-cell-estado="props">
        <q-td :props="props" class="status-cell">
          <p v-if="props.row.estado === 1" class="status-activo">Activo</p>
          <p v-else class="status-inactivo">Inactivo</p>
        </q-td>
      </template>
    </q-table>

    <!-- Tabla de edición del empleado -->
    <q-dialog v-model="Editando">
      <q-card>
        <q-card-section>
          <q-input v-model="empleadoActual.nombre" label="Nombre"></q-input>
          <q-input v-model="empleadoActual.direccion" label="Dirección"></q-input>
          <q-input v-model="empleadoActual.telefono" label="Teléfono" type="number"></q-input>
          <q-input v-model="empleadoActual.estudios" label="Estudios"></q-input>
          <q-input v-model="empleadoActual.descripcion" label="Descripción"></q-input>
        </q-card-section>
        <q-card-actions>
          <q-btn @click="guardarCambios" color="primary">Guardar</q-btn>
          <q-btn @click="cancelarEdicion" color="secondary">Cancelar</q-btn>
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