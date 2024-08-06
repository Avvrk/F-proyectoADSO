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
              <q-td key="tipo" :props="props">
                {{ props.row.tipo }}
              </q-td>
              <q-td key="descripcion" :props="props">
                {{ props.row.descripcion || '-' }}
              </q-td>
              <q-td key="fecha_inicio" :props="props">
                {{ formatDate(props.row.fecha_inicio) }}
              </q-td>
              <q-td key="fecha_final" :props="props">
                {{ props.row.fecha_final ? formatDate(props.row.fecha_final) : '-' }}
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
    sortBy: 'fecha_inicio',
    descending: true,
    page: 1,
    rowsPerPage: 10
  });
  
  const options = ref([
    { label: 'Listar Procesos', value: 'Listar Procesos' },
    // Agrega más opciones según tus necesidades
  ]);
  
  const selectedOption = ref('Listar Procesos');
  
  const columns = ref([
    { name: 'cultivo_id', label: 'ID de Cultivo', align: 'center' },
    { name: 'empleado_id', label: 'ID de Empleado', align: 'center' },
    { name: 'tipo', label: 'Tipo', align: 'center' },
    { name: 'descripcion', label: 'Descripción', align: 'center' },
    { name: 'fecha_inicio', label: 'Fecha de Inicio', align: 'center' },
    { name: 'fecha_final', label: 'Fecha Final', align: 'center' },
    { name: 'estado', label: 'Estado', align: 'center' },
  ]);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };
  
  const listarProcesos = async () => {
    try {
      const response = await Procesos.find(); // Ajusta esto según cómo consultas los datos
      return response;
    } catch (error) {
      console.error('Error al listar procesos:', error);
      return [];
    }
  };
  
  const filteredRows = computed(() => {
    switch (selectedOption.value) {
      case 'Listar Procesos':
        return listarProcesos();
      // Agrega más casos según tus necesidades
      default:
        return [];
    }
  }); */
  </script>
  
  <style scoped>
 /*  .contSelect {
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
  