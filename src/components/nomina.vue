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
              <q-td key="id_empleado" :props="props">
                {{ props.row.id_empleado }}
              </q-td>
              <q-td key="tipo" :props="props">
                {{ props.row.tipo }}
              </q-td>
              <q-td key="valor" :props="props">
                {{ props.row.valor }}
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
    { label: 'Listar Nóminas', value: 'Listar Nóminas' },
    // Agrega más opciones según tus necesidades
  ]);
  
  const selectedOption = ref('Listar Nóminas');
  
  const columns = ref([
    { name: 'fecha', label: 'Fecha', align: 'center' },
    { name: 'id_empleado', label: 'ID de Empleado', align: 'center' },
    { name: 'tipo', label: 'Tipo', align: 'center' },
    { name: 'valor', label: 'Valor', align: 'center' },
    { name: 'estado', label: 'Estado', align: 'center' },
  ]);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };
  
  const listarNominas = async () => {
    try {
      const response = await Nomina.find(); // Ajusta esto según cómo consultas los datos
      return response;
    } catch (error) {
      console.error('Error al listar nóminas:', error);
      return [];
    }
  };
  
  const filteredRows = computed(() => {
    switch (selectedOption.value) {
      case 'Listar Nóminas':
        return listarNominas();
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
