<script setup>
/* import { ref, computed } from 'vue';
import { QTable, QTd, QSelect } from 'quasar';


const pagination = ref({
  sortBy: 'fecha',
  descending: true,
  page: 1,
  rowsPerPage: 10
});

const options = ref([
  { label: 'Listar Cultivos', value: 'Listar Cultivos' },
  // Agrega más opciones según tus necesidades
]);

const selectedOption = ref('Listar Cultivos');

const columns = ref([
  { name: 'nombre', label: 'Nombre', align: 'center' },
  { name: 'fecha', label: 'Fecha', align: 'center' },
  { name: 'tipoCultivo', label: 'Tipo de Cultivo', align: 'center' },
  { name: 'tipo', label: 'Tipo', align: 'center' },
  { name: 'superficie', label: 'Superficie', align: 'center' },
  { name: 'produccionEsperada', label: 'Producción Esperada', align: 'center' },
  { name: 'descripcion', label: 'Descripción', align: 'center' },
]);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES');
};

const listarCultivos = async () => {
  try {
    const response = await Cultivo.find(); // Ajusta esto según cómo consultas los datos
    return response;
  } catch (error) {
    console.error('Error al listar cultivos:', error);
    return [];
  }
};

const filteredRows = computed(() => {
  switch (selectedOption.value) {
    case 'Listar Cultivos':
      return listarCultivos();
    // Agrega más casos según tus necesidades
    default:
      return [];
  }
}); */
</script>

<template>
  <div>
    <!-- <q-card>
      <q-card-section>
        <q-table
          :rows="filteredRows"
          :columns="columns"
          row-key="_id"
          :pagination="pagination"
          :rows-per-page-options="[10, 20, 30]"
          virtual-scroll
        >
          <template v-slot:top-left>
            <q-select
              v-model="selectedOption"
              :options="options"
              label="Seleccionar opción"
              outlined
              dense
            />
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="nombre" :props="props">
                {{ props.row.nombre }}
              </q-td>
              <q-td key="fecha" :props="props">
                {{ formatDate(props.row.fecha) }}
              </q-td>
              <q-td key="tipoCultivo" :props="props">
                {{ props.row.tipoCultivo || '-' }}
              </q-td>
              <q-td key="tipo" :props="props">
                {{ props.row.tipo }}
              </q-td>
              <q-td key="superficie" :props="props">
                {{ props.row.superficie }}
              </q-td>
              <q-td key="produccionEsperada" :props="props">
                {{ props.row.produccionEsperada }}
              </q-td>
              <q-td key="descripcion" :props="props">
                {{ props.row.descripcion || '-' }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
    </q-card> -->
  </div>
  </template>

<style scoped>
/* .contSelect {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.q-select {
  max-width: 250px; 
}

.q-my-md {
  max-width: 500px;
  padding-left: 10px;
} */
</style>
