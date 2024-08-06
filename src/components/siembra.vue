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
              <q-td key="id_cultivo" :props="props">
                {{ props.row.id_cultivo }}
              </q-td>
              <q-td key="empleado_id" :props="props">
                {{ props.row.empleado_id }}
              </q-td>
              <q-td key="fechaSiembra" :props="props">
                {{ formatDate(props.row.fechaSiembra) }}
              </q-td>
              <q-td key="fechaCosecha" :props="props">
                {{ formatDate(props.row.fechaCosecha) }}
              </q-td>
              <q-td key="transplante" :props="props">
                {{ props.row.transplante ? 'Sí' : 'No' }}
              </q-td>
              <q-td key="cultivoAnterior" :props="props">
                {{ props.row.cultivoAnterior || '-' }}
              </q-td>
              <q-td key="inventario_id" :props="props">
                {{ props.row.inventario_id || '-' }}
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
/*   import { ref, computed } from 'vue';
  import { QTable, QTd, QSelect } from 'quasar';

  
  const pagination = ref({
    sortBy: 'fechaSiembra',
    descending: true,
    page: 1,
    rowsPerPage: 10
  });
  
  const options = ref([
    { label: 'Listar Siembras', value: 'Listar Siembras' },
    // Agrega más opciones según tus necesidades
  ]);
  
  const selectedOption = ref('Listar Siembras');
  
  const columns = ref([
    { name: 'id_cultivo', label: 'ID Cultivo', align: 'center' },
    { name: 'empleado_id', label: 'ID Empleado', align: 'center' },
    { name: 'fechaSiembra', label: 'Fecha de Siembra', align: 'center' },
    { name: 'fechaCosecha', label: 'Fecha de Cosecha', align: 'center' },
    { name: 'transplante', label: 'Transplante', align: 'center' },
    { name: 'cultivoAnterior', label: 'Cultivo Anterior', align: 'center' },
    { name: 'inventario_id', label: 'ID Inventario', align: 'center' },
    { name: 'estado', label: 'Estado', align: 'center' },
  ]);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };
  
  const listarSiembras = async () => {
    try {
      const response = await Siembra.find(); // Ajusta esto según cómo consultas los datos
      return response;
    } catch (error) {
      console.error('Error al listar siembras:', error);
      return [];
    }
  };
  
  const filteredRows = computed(() => {
    switch (selectedOption.value) {
      case 'Listar Siembras':
        return listarSiembras();
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
  