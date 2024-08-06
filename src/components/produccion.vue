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
              <q-td key="fecha" :props="props">
                {{ formatDate(props.row.fecha) }}
              </q-td>
              <q-td key="numeroLote" :props="props">
                {{ props.row.numeroLote }}
              </q-td>
              <q-td key="especie" :props="props">
                {{ props.row.especie || '-' }}
              </q-td>
              <q-td key="cantidad" :props="props">
                {{ props.row.cantidad }}
              </q-td>
              <q-td key="cantidadTrabajadores" :props="props">
                {{ props.row.cantidadTrabajadores || '-' }}
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
    { label: 'Listar Producción', value: 'Listar Producción' },
    // Agrega más opciones según tus necesidades
  ]);
  
  const selectedOption = ref('Listar Producción');
  
  const columns = ref([
    { name: 'cultivo_id', label: 'ID de Cultivo', align: 'center' },
    { name: 'fecha', label: 'Fecha', align: 'center' },
    { name: 'numeroLote', label: 'Número de Lote', align: 'center' },
    { name: 'especie', label: 'Especie', align: 'center' },
    { name: 'cantidad', label: 'Cantidad', align: 'center' },
    { name: 'cantidadTrabajadores', label: 'Cantidad de Trabajadores', align: 'center' },
    { name: 'observaciones', label: 'Observaciones', align: 'center' },
    { name: 'estado', label: 'Estado', align: 'center' },
  ]);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };
  
  const listarProduccion = async () => {
    try {
      const response = await Produccion.find(); // Ajusta esto según cómo consultas los datos
      return response;
    } catch (error) {
      console.error('Error al listar producción:', error);
      return [];
    }
  };
  
  const filteredRows = computed(() => {
    switch (selectedOption.value) {
      case 'Listar Producción':
        return listarProduccion();
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
  