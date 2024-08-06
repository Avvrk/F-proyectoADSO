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
              <q-td key="id_cultivo" :props="props">
                {{ props.row.id_cultivo }}
              </q-td>
              <q-td key="empleado_id" :props="props">
                {{ props.row.empleado_id }}
              </q-td>
              <q-td key="fecha" :props="props">
                {{ formatDate(props.row.fecha) }}
              </q-td>
              <q-td key="estadoFenologico" :props="props">
                {{ props.row.estadoFenologico }}
              </q-td>
              <q-td key="tipo" :props="props">
                {{ props.row.tipo }}
              </q-td>
              <q-td key="nombreFertilizante" :props="props">
                {{ props.row.nombreFertilizante }}
              </q-td>
              <q-td key="cantidad" :props="props">
                {{ props.row.cantidad }}
              </q-td>
              <q-td key="inventario_id" :props="props">
                {{ props.row.inventario_id }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
    </q-card> -->
	</div>
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
    { label: 'Listar Fertilizaciones', value: 'Listar Fertilizaciones' },
    // Agrega más opciones según tus necesidades
  ]);
  
  const selectedOption = ref('Listar Fertilizaciones');
  
  const columns = ref([
    { name: 'id_cultivo', label: 'ID de Cultivo', align: 'center' },
    { name: 'empleado_id', label: 'ID de Empleado', align: 'center' },
    { name: 'fecha', label: 'Fecha', align: 'center' },
    { name: 'estadoFenologico', label: 'Estado Fenológico', align: 'center' },
    { name: 'tipo', label: 'Tipo', align: 'center' },
    { name: 'nombreFertilizante', label: 'Nombre del Fertilizante', align: 'center' },
    { name: 'cantidad', label: 'Cantidad', align: 'center' },
    { name: 'inventario_id', label: 'ID de Inventario', align: 'center' },
  ]);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };
  
  const listarFertilizaciones = async () => {
    try {
      const response = await Fertilizacion.find(); // Ajusta esto según cómo consultas los datos
      return response;
    } catch (error) {
      console.error('Error al listar fertilizaciones:', error);
      return [];
    }
  };
  
  const filteredRows = computed(() => {
    switch (selectedOption.value) {
      case 'Listar Fertilizaciones':
        return listarFertilizaciones();
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
