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
              <q-td key="proveedor_id" :props="props">
                {{ props.row.proveedor_id }}
              </q-td>
              <q-td key="numFactura" :props="props">
                {{ props.row.numFactura || '-' }}
              </q-td>
              <q-td key="fechaCompra" :props="props">
                {{ formatDate(props.row.fechaCompra) }}
              </q-td>
              <q-td key="fechaVencimiento" :props="props">
                {{ formatDate(props.row.fechaVencimiento) }}
              </q-td>
              <q-td key="especieVariedad" :props="props">
                {{ props.row.especieVariedad || '-' }}
              </q-td>
              <q-td key="proveedorSemilla" :props="props">
                {{ props.row.proveedorSemilla || '-' }}
              </q-td>
              <q-td key="numeroLote" :props="props">
                {{ props.row.numeroLote || '-' }}
              </q-td>
              <q-td key="origen" :props="props">
                {{ props.row.origen || '-' }}
              </q-td>
              <q-td key="poderGerminativo" :props="props">
                {{ props.row.poderGerminativo || '-' }}
              </q-td>
              <q-td key="observaciones" :props="props">
                {{ props.row.observaciones || '-' }}
              </q-td>
              <q-td key="unidad" :props="props">
                {{ props.row.unidad || '-' }}
              </q-td>
              <q-td key="total" :props="props">
                {{ props.row.total || '-' }}
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
    sortBy: 'fechaCompra',
    descending: true,
    page: 1,
    rowsPerPage: 10
  });
  
  const options = ref([
    { label: 'Listar Semillas', value: 'Listar Semillas' },
    // Agrega más opciones según tus necesidades
  ]);
  
  const selectedOption = ref('Listar Semillas');
  
  const columns = ref([
    { name: 'proveedor_id', label: 'ID Proveedor', align: 'center' },
    { name: 'numFactura', label: 'Número de Factura', align: 'center' },
    { name: 'fechaCompra', label: 'Fecha de Compra', align: 'center' },
    { name: 'fechaVencimiento', label: 'Fecha de Vencimiento', align: 'center' },
    { name: 'especieVariedad', label: 'Especie/Variedad', align: 'center' },
    { name: 'proveedorSemilla', label: 'Proveedor Semilla', align: 'center' },
    { name: 'numeroLote', label: 'Número de Lote', align: 'center' },
    { name: 'origen', label: 'Origen', align: 'center' },
    { name: 'poderGerminativo', label: 'Poder Germinativo', align: 'center' },
    { name: 'observaciones', label: 'Observaciones', align: 'center' },
    { name: 'unidad', label: 'Unidad', align: 'center' },
    { name: 'total', label: 'Total', align: 'center' },
    { name: 'estado', label: 'Estado', align: 'center' },
  ]);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };
  
  const listarSemillas = async () => {
    try {
      const response = await Semilla.find(); // Ajusta esto según cómo consultas los datos
      return response;
    } catch (error) {
      console.error('Error al listar semillas:', error);
      return [];
    }
  };
  
  const filteredRows = computed(() => {
    switch (selectedOption.value) {
      case 'Listar Semillas':
        return listarSemillas();
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
