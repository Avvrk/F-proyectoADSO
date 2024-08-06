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
              <q-td key="relacionNPK" :props="props">
                {{ props.row.relacionNPK || '-' }}
              </q-td>
              <q-td key="cantidad" :props="props">
                {{ props.row.cantidad }}
              </q-td>
              <q-td key="unidad" :props="props">
                {{ props.row.unidad }}
              </q-td>
              <q-td key="responsable" :props="props">
                {{ props.row.responsable || '-' }}
              </q-td>
              <q-td key="observaciones" :props="props">
                {{ props.row.observaciones || '-' }}
              </q-td>
              <q-td key="total" :props="props">
                {{ props.row.total }}
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
    sortBy: 'nombre',
    descending: false,
    page: 1,
    rowsPerPage: 10
  });
  
  const options = ref([
    { label: 'Listar Insumos', value: 'Listar Insumos' },
    // Agrega más opciones según tus necesidades
  ]);
  
  const selectedOption = ref('Listar Insumos');
  
  const columns = ref([
    { name: 'nombre', label: 'Nombre', align: 'center' },
    { name: 'relacionNPK', label: 'Relación NPK', align: 'center' },
    { name: 'cantidad', label: 'Cantidad', align: 'center' },
    { name: 'unidad', label: 'Unidad', align: 'center' },
    { name: 'responsable', label: 'Responsable', align: 'center' },
    { name: 'observaciones', label: 'Observaciones', align: 'center' },
    { name: 'total', label: 'Total', align: 'center' },
  ]);
  
  const listarInsumos = async () => {
    try {
      const response = await Insumo.find(); // Ajusta esto según cómo consultas los datos
      return response;
    } catch (error) {
      console.error('Error al listar insumos:', error);
      return [];
    }
  };
  
  const filteredRows = computed(() => {
    switch (selectedOption.value) {
      case 'Listar Insumos':
        return listarInsumos();
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
