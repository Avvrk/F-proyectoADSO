<template>
	<q-card>
		<!--       <q-card-section>
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
              <q-td key="gastos_id" :props="props">
                {{ props.row.gastos_id || '-' }}
              </q-td>
              <q-td key="id_herramienta" :props="props">
                {{ props.row.id_herramienta || '-' }}
              </q-td>
              <q-td key="fecha" :props="props">
                {{ formatDate(props.row.fecha) }}
              </q-td>
              <q-td key="verificacionRealizada" :props="props">
                {{ props.row.verificacionRealizada || '-' }}
              </q-td>
              <q-td key="calibracion" :props="props">
                {{ props.row.calibracion || '-' }}
              </q-td>
              <q-td key="responsable" :props="props">
                {{ props.row.responsable || '-' }}
              </q-td>
              <q-td key="observaciones" :props="props">
                {{ props.row.observaciones || '-' }}
              </q-td>
              <q-td key="estado" :props="props">
                {{ props.row.estado === 1 ? 'Activo' : 'Inactivo' }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section> -->
	</q-card>
</template>

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
    { label: 'Listar Mantenimientos', value: 'Listar Mantenimientos' },
    // Agrega más opciones según tus necesidades
  ]);
  
  const selectedOption = ref('Listar Mantenimientos');
  
  const columns = ref([
    { name: 'gastos_id', label: 'ID de Gasto', align: 'center' },
    { name: 'id_herramienta', label: 'ID de Herramienta', align: 'center' },
    { name: 'fecha', label: 'Fecha', align: 'center' },
    { name: 'verificacionRealizada', label: 'Verificación Realizada', align: 'center' },
    { name: 'calibracion', label: 'Calibración', align: 'center' },
    { name: 'responsable', label: 'Responsable', align: 'center' },
    { name: 'observaciones', label: 'Observaciones', align: 'center' },
    { name: 'estado', label: 'Estado', align: 'center' },
  ]);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };
  
  const listarMantenimientos = async () => {
    try {
      const response = await Mantenimiento.find(); // Ajusta esto según cómo consultas los datos
      return response;
    } catch (error) {
      console.error('Error al listar mantenimientos:', error);
      return [];
    }
  };
  
  const filteredRows = computed(() => {
    switch (selectedOption.value) {
      case 'Listar Mantenimientos':
        return listarMantenimientos();
      // Agrega más casos según tus necesidades
      default:
        return [];
    }
  }); */
</script>

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
