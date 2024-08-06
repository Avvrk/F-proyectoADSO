<script setup>
/* import { ref, computed, onMounted } from "vue";
import { useStoreAdmins } from "../stores/admin.js";
// import { notifyErrorRequest } from "../routes/routes.js";

const adminStore = useStoreAdmins();


// Propiedad calculada para comprobar si el usuario es un instructor
const isInstructor = computed(() => useUsuario.user.rol === 'Instructor');

// Variables y métodos directamente desde la store de Admin
const { 
  mostrarMensajeCliente,
  fechaSeleccionada,
  fechaIngreso,
  planC,
  fechaCumpleanos,
  nombreCliente,
  telefonoCliente,
  idClienteSeleccionado,
  fechaIngresoCliente,
  documentoCliente,
  fechaNacimientoCliente,
  edadCliente,
  direccionCliente,
  objetivoCliente,
  observacionesCliente,
  planCliente,
  fechaVencimientoCliente,
  seguimientoCliente,
  selectedOption,
  options,
  rows,
  columns,
  listarClientes,
  listarPlanes,
  listarUsuarios,
  listarClientePorDocumento
} = adminStore;

// Montar la store para listar clientes al iniciar
onMounted(() => {
  listarClientes();
}); */
</script>

<template>
  <div>
    <!-- <q-select
      v-model="selectedOption"
      :options="options"
      label="Selecciona una opción"
    />


    <q-table
      :rows="rows"
      :columns="columns"
      row-key="id"
    />


    <div v-if="mostrarMensajeCliente">
      <p>Información del Cliente:</p>
      <p>Nombre: {{ nombreCliente }}</p>
      <p>Teléfono: {{ telefonoCliente }}</p>
      <p>Documento: {{ documentoCliente }}</p>
      <p>Fecha de Nacimiento: {{ fechaNacimientoCliente }}</p>
      <p>Edad: {{ edadCliente }}</p>
      <p>Dirección: {{ direccionCliente }}</p>
      <p>Objetivo: {{ objetivoCliente }}</p>
      <p>Observaciones: {{ observacionesCliente }}</p>
      <p>Plan: {{ planCliente }}</p>
      <p>Fecha de Vencimiento: {{ fechaVencimientoCliente }}</p>
      <p>Seguimiento:</p>
      <ul>
        <li v-for="(seguimiento, index) in seguimientoCliente" :key="index">
          Fecha: {{ seguimiento.fecha }},
          Peso: {{ seguimiento.peso }},
          IMC: {{ seguimiento.imc }},
          Brazo: {{ seguimiento.brazo }},
          Pierna: {{ seguimiento.pierna }},
          Cintura: {{ seguimiento.cintura }},
          Estatura: {{ seguimiento.estatura }}
        </li>
      </ul>
    </div> -->
  </div>
</template>