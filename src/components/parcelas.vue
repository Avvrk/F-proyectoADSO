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
              <q-td key="numero" :props="props">
                {{ props.row.numero }}
              </q-td>
              <q-td key="ubicacionGeografica" :props="props">
                {{ props.row.ubicacionGeografica }}
              </q-td>
              <q-td key="cultivoAnterior" :props="props">
                {{ props.row.cultivoAnterior || '-' }}
              </q-td>
              <q-td key="cultivoActual" :props="props">
                {{ props.row.cultivoActual }}
              </q-td>
              <q-td key="detalle" :props="props">
                {{ props.row.detalle || '-' }}
              </q-td>
              <q-td key="estado" :props="props">
                {{ props.row.estado === '1' ? 'Activo' : 'Inactivo' }}
              </q-td>
              <q-td key="area" :props="props">
                {{ props.row.area }}
              </q-td>
              <q-td key="asistenteTecnico" :props="props">
                {{ props.row.asistenteTecnico || '-' }}
              </q-td>
              <q-td key="id_fincas" :props="props">
                {{ props.row.id_fincas }}
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
    sortBy: 'numero',
    descending: false,
    page: 1,
    rowsPerPage: 10
  });
  
  const options = ref([
    { label: 'Listar Parcelas', value: 'Listar Parcelas' },
    // Agrega más opciones según tus necesidades
  ]);
  
  const selectedOption = ref('Listar Parcelas');
  
  const columns = ref([
    { name: 'numero', label: 'Número', align: 'center' },
    { name: 'ubicacionGeografica', label: 'Ubicación Geográfica', align: 'center' },
    { name: 'cultivoAnterior', label: 'Cultivo Anterior', align: 'center' },
    { name: 'cultivoActual', label: 'Cultivo Actual', align: 'center' },
    { name: 'detalle', label: 'Detalle', align: 'center' },
    { name: 'estado', label: 'Estado', align: 'center' },
    { name: 'area', label: 'Área', align: 'center' },
    { name: 'asistenteTecnico', label: 'Asistente Técnico', align: 'center' },
    { name: 'id_fincas', label: 'ID de Finca', align: 'center' },
  ]);
  
  const listarParcelas = async () => {
    try {
      const response = await Parcela.find(); // Ajusta esto según cómo consultas los datos
      return response;
    } catch (error) {
      console.error('Error al listar parcelas:', error);
      return [];
    }
  };
  
  const filteredRows = computed(() => {
    switch (selectedOption.value) {
      case 'Listar Parcelas':
        return listarParcelas();
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
