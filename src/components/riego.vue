<template>
    <q-card>
      <!-- <q-card-section>
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
              <q-td key="cultivo_id" :props="props">
                {{ props.row.cultivo_id }}
              </q-td>
              <q-td key="empleado_id" :props="props">
                {{ props.row.empleado_id }}
              </q-td>
              <q-td key="fecha" :props="props">
                {{ formatDate(props.row.fecha) }}
              </q-td>
              <q-td key="dias_transplante" :props="props">
                {{ props.row.dias_transplante || '-' }}
              </q-td>
              <q-td key="estado_fenologico" :props="props">
                {{ props.row.estado_fenologico || '-' }}
              </q-td>
              <q-td key="hora_inicio" :props="props">
                {{ props.row.hora_inicio || '-' }}
              </q-td>
              <q-td key="hora_fin" :props="props">
                {{ props.row.hora_fin || '-' }}
              </q-td>
              <q-td key="dosis" :props="props">
                {{ props.row.dosis || '-' }}
              </q-td>
              <q-td key="cantidad_agua" :props="props">
                {{ props.row.cantidad_agua || '-' }}
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
    { label: 'Listar Riegos', value: 'Listar Riegos' },
    // Agrega más opciones según tus necesidades
  ]);
  
  const selectedOption = ref('Listar Riegos');
  
  const columns = ref([
    { name: 'cultivo_id', label: 'ID Cultivo', align: 'center' },
    { name: 'empleado_id', label: 'ID Empleado', align: 'center' },
    { name: 'fecha', label: 'Fecha', align: 'center' },
    { name: 'dias_transplante', label: 'Días Transplante', align: 'center' },
    { name: 'estado_fenologico', label: 'Estado Fenológico', align: 'center' },
    { name: 'hora_inicio', label: 'Hora Inicio', align: 'center' },
    { name: 'hora_fin', label: 'Hora Fin', align: 'center' },
    { name: 'dosis', label: 'Dosis', align: 'center' },
    { name: 'cantidad_agua', label: 'Cantidad Agua', align: 'center' },
    { name: 'estado', label: 'Estado', align: 'center' },
  ]);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };
  
  const listarRiegos = async () => {
    try {
      const response = await Riego.find(); // Ajusta esto según cómo consultas los datos
      return response;
    } catch (error) {
      console.error('Error al listar riegos:', error);
      return [];
    }
  };
  
  const filteredRows = computed(() => {
    switch (selectedOption.value) {
      case 'Listar Riegos':
        return listarRiegos();
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
  