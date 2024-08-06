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
              <q-td key="nombre" :props="props">
                {{ props.row.nombre }}
              </q-td>
              <q-td key="fecha" :props="props">
                {{ formatDate(props.row.fecha) }}
              </q-td>
              <q-td key="numeroFactura" :props="props">
                {{ props.row.numeroFactura || '-' }}
              </q-td>
              <q-td key="descripcion" :props="props">
                {{ props.row.descripcion || '-' }}
              </q-td>
              <q-td key="total" :props="props">
                {{ props.row.total }}
              </q-td>
              <q-td key="insumos_id" :props="props">
                {{ props.row.insumos_id || '-' }}
              </q-td>
              <q-td key="semillas_id" :props="props">
                {{ props.row.semillas_id || '-' }}
              </q-td>
              <q-td key="mantenimiento_id" :props="props">
                {{ props.row.mantenimiento_id || '-' }}
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
    { label: 'Listar Gastos', value: 'Listar Gastos' },
    // Agrega más opciones según tus necesidades
  ]);
  
  const selectedOption = ref('Listar Gastos');
  
  const columns = ref([
    { name: 'nombre', label: 'Nombre', align: 'center' },
    { name: 'fecha', label: 'Fecha', align: 'center' },
    { name: 'numeroFactura', label: 'Número de Factura', align: 'center' },
    { name: 'descripcion', label: 'Descripción', align: 'center' },
    { name: 'total', label: 'Total', align: 'center' },
    { name: 'insumos_id', label: 'ID de Insumo', align: 'center' },
    { name: 'semillas_id', label: 'ID de Semilla', align: 'center' },
    { name: 'mantenimiento_id', label: 'ID de Mantenimiento', align: 'center' },
  ]);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };
  
  const listarGastos = async () => {
    try {
      const response = await Gasto.find(); // Ajusta esto según cómo consultas los datos
      return response;
    } catch (error) {
      console.error('Error al listar gastos:', error);
      return [];
    }
  };
  
  const filteredRows = computed(() => {
    switch (selectedOption.value) {
      case 'Listar Gastos':
        return listarGastos();
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
