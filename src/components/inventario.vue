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
              <q-td key="tipo" :props="props">
                {{ props.row.tipo }}
              </q-td>
              <q-td key="observacion" :props="props">
                {{ props.row.observacion || '-' }}
              </q-td>
              <q-td key="unidad" :props="props">
                {{ props.row.unidad || '-' }}
              </q-td>
              <q-td key="cantidad" :props="props">
                {{ props.row.cantidad }}
              </q-td>
              <q-td key="fecha" :props="props">
                {{ formatDate(props.row.fecha) }}
              </q-td>
              <q-td key="semillas_id" :props="props">
                {{ props.row.semillas_id || '-' }}
              </q-td>
              <q-td key="insumos_id" :props="props">
                {{ props.row.insumos_id || '-' }}
              </q-td>
              <q-td key="maquinaria_id" :props="props">
                {{ props.row.maquinaria_id || '-' }}
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
    { label: 'Listar Inventarios', value: 'Listar Inventarios' },
    // Agrega más opciones según tus necesidades
  ]);
  
  const selectedOption = ref('Listar Inventarios');
  
  const columns = ref([
    { name: 'tipo', label: 'Tipo', align: 'center' },
    { name: 'observacion', label: 'Observación', align: 'center' },
    { name: 'unidad', label: 'Unidad', align: 'center' },
    { name: 'cantidad', label: 'Cantidad', align: 'center' },
    { name: 'fecha', label: 'Fecha', align: 'center' },
    { name: 'semillas_id', label: 'ID de Semilla', align: 'center' },
    { name: 'insumos_id', label: 'ID de Insumo', align: 'center' },
    { name: 'maquinaria_id', label: 'ID de Maquinaria', align: 'center' },
    { name: 'estado', label: 'Estado', align: 'center' },
  ]);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };
  
  const listarInventarios = async () => {
    try {
      const response = await Inventario.find(); // Ajusta esto según cómo consultas los datos
      return response;
    } catch (error) {
      console.error('Error al listar inventarios:', error);
      return [];
    }
  };
  
  const filteredRows = computed(() => {
    switch (selectedOption.value) {
      case 'Listar Inventarios':
        return listarInventarios();
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
