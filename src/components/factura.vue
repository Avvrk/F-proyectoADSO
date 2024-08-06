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
              <q-td key="fecha" :props="props">
                {{ formatDate(props.row.fecha) }}
              </q-td>
              <q-td key="valor" :props="props">
                {{ props.row.valor }}
              </q-td>
              <q-td key="detalles" :props="props">
                {{ props.row.detalles || '-' }}
              </q-td>
              <q-td key="inventario_id" :props="props">
                {{ props.row.inventario_id || '-' }}
              </q-td>
              <q-td key="cantidad" :props="props">
                {{ props.row.cantidad }}
              </q-td>
              <q-td key="nombreProducto" :props="props">
                {{ props.row.nombreProducto }}
              </q-td>
              <q-td key="subtotal" :props="props">
                {{ props.row.subtotal }}
              </q-td>
              <q-td key="iva" :props="props">
                {{ props.row.iva }}
              </q-td>
              <q-td key="total" :props="props">
                {{ props.row.total }}
              </q-td>
              <q-td key="comprador_id" :props="props">
                {{ props.row.comprador_id || '-' }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
    </q-card> -->
	</div>
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
    { label: 'Listar Facturas', value: 'Listar Facturas' },
    // Agrega más opciones según tus necesidades
  ]);
  
  const selectedOption = ref('Listar Facturas');
  
  const columns = ref([
    { name: 'fecha', label: 'Fecha', align: 'center' },
    { name: 'valor', label: 'Valor', align: 'center' },
    { name: 'detalles', label: 'Detalles', align: 'center' },
    { name: 'inventario_id', label: 'ID de Inventario', align: 'center' },
    { name: 'cantidad', label: 'Cantidad', align: 'center' },
    { name: 'nombreProducto', label: 'Nombre del Producto', align: 'center' },
    { name: 'subtotal', label: 'Subtotal', align: 'center' },
    { name: 'iva', label: 'IVA', align: 'center' },
    { name: 'total', label: 'Total', align: 'center' },
    { name: 'comprador_id', label: 'ID del Comprador', align: 'center' },
  ]);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };
  
  const listarFacturas = async () => {
    try {
      const response = await Factura.find(); // Ajusta esto según cómo consultas los datos
      return response;
    } catch (error) {
      console.error('Error al listar facturas:', error);
      return [];
    }
  };
  
  const filteredRows = computed(() => {
    switch (selectedOption.value) {
      case 'Listar Facturas':
        return listarFacturas();
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
