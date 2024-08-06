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
              <q-td key="fecha" :props="props">
                {{ formatDate(props.row.fecha) }}
              </q-td>
              <q-td key="id_parcela" :props="props">
                {{ props.row.id_parcela }}
              </q-td>
              <q-td key="empleado_id" :props="props">
                {{ props.row.empleado_id }}
              </q-td>
              <q-td key="productos" :props="props">
                {{ props.row.productos || '-' }}
              </q-td>
              <q-td key="ingredienteActivo" :props="props">
                {{ props.row.ingredienteActivo || '-' }}
              </q-td>
              <q-td key="dosis" :props="props">
                {{ props.row.dosis || '-' }}
              </q-td>
              <q-td key="metodoAplicacion" :props="props">
                {{ props.row.metodoAplicacion || '-' }}
              </q-td>
              <q-td key="operario" :props="props">
                {{ props.row.operario || '-' }}
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
 /*  import { ref, computed } from 'vue';
  import { QTable, QTd, QSelect } from 'quasar';

  
  const pagination = ref({
    sortBy: 'fecha',
    descending: true,
    page: 1,
    rowsPerPage: 10
  });
  
  const options = ref([
    { label: 'Listar Preparaciones de Suelos', value: 'Listar Preparaciones de Suelos' },
    // Agrega más opciones según tus necesidades
  ]);
  
  const selectedOption = ref('Listar Preparaciones de Suelos');
  
  const columns = ref([
    { name: 'fecha', label: 'Fecha', align: 'center' },
    { name: 'id_parcela', label: 'ID de Parcela', align: 'center' },
    { name: 'empleado_id', label: 'ID de Empleado', align: 'center' },
    { name: 'productos', label: 'Productos', align: 'center' },
    { name: 'ingredienteActivo', label: 'Ingrediente Activo', align: 'center' },
    { name: 'dosis', label: 'Dosis', align: 'center' },
    { name: 'metodoAplicacion', label: 'Método de Aplicación', align: 'center' },
    { name: 'operario', label: 'Operario', align: 'center' },
    { name: 'responsable', label: 'Responsable', align: 'center' },
    { name: 'observaciones', label: 'Observaciones', align: 'center' },
    { name: 'estado', label: 'Estado', align: 'center' },
  ]);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };
  
  const listarPreparacionesSuelos = async () => {
    try {
      const response = await PreparacionSuelos.find(); // Ajusta esto según cómo consultas los datos
      return response;
    } catch (error) {
      console.error('Error al listar preparaciones de suelos:', error);
      return [];
    }
  };
  
  const filteredRows = computed(() => {
    switch (selectedOption.value) {
      case 'Listar Preparaciones de Suelos':
        return listarPreparacionesSuelos();
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
  