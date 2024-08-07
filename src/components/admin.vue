<script setup>
import { ref, onMounted } from "vue";
import { useStoreAdmins } from "../stores/admin";

const useAdmin = useStoreAdmins();

const rows = ref([]);
const columns = ref([
    {
        name: "nombre",
        label: "Nombre",
        field: "nombre",
        aling: "center",
        sortable: true,
    },
    {
        name: "direccion",
        label: "Direccion",
        field: "direccion",
        aling: "center",
    },
    {
        name: "correo",
        label: "Correo",
        field: "correo",
        aling: "center",
        sortable: true,
    },
    {
        name: "telefono",
        label: "Telefono",
        field: "telefono",
        aling: "center",
    },
    {
        name: "municipio",
        label: "Municipio",
        field: "municipio",
        aling: "center",
        sortable: true,
    },
    {
        name: "opciones",
        label: "Opciones",
        field: "opciones",
        aling: "center",
    },
]);

async function listarAdmin() {
    try {
        const r = await useAdmin.getAdmin();
        rows.value = r.data.admins;
    } catch (error) {
        console.log(error.message);
    }
}

onMounted(() => {
    listarAdmin;
});
</script>

<template>
    <div>
        <q-table
            flat
            bordered
            title="Administrador"
            :rows="rows"
            :columns="columns"
            row-key="id">
            <template v-slot:body-cell-opciones="props">
                <q-td :props="props">
                    <q-btn> ✏️ </q-btn>
                    <q-btn v-if="props.row.estado == 1"> ❌ </q-btn>
                    <q-btn v-else> ✅ </q-btn>
                </q-td>
            </template>
        </q-table>
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
