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
              <q-td key="proveedores_id" :props="props">
                {{ props.row.proveedores_id || '-' }}
              </q-td>
              <q-td key="nombre" :props="props">
                {{ props.row.nombre }}
              </q-td>
              <q-td key="tipo" :props="props">
                {{ props.row.tipo }}
              </q-td>
              <q-td key="fecha" :props="props">
                {{ formatDate(props.row.fecha) }}
              </q-td>
              <q-td key="fechaCompra" :props="props">
                {{ formatDate(props.row.fechaCompra) }}
              </q-td>
              <q-td key="observaciones" :props="props">
                {{ props.row.observaciones || '-' }}
              </q-td>
              <q-td key="cantidad" :props="props">
                {{ props.row.cantidad }}
              </q-td>
              <q-td key="total" :props="props">
                {{ props.row.total }}
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
    { label: 'Listar Maquinaria y Herramientas', value: 'Listar Maquinaria y Herramientas' },
    // Agrega más opciones según tus necesidades
  ]);
  
  const selectedOption = ref('Listar Maquinaria y Herramientas');
  
  const columns = ref([
    { name: 'proveedores_id', label: 'ID de Proveedor', align: 'center' },
    { name: 'nombre', label: 'Nombre', align: 'center' },
    { name: 'tipo', label: 'Tipo', align: 'center' },
    { name: 'fecha', label: 'Fecha', align: 'center' },
    { name: 'fechaCompra', label: 'Fecha de Compra', align: 'center' },
    { name: 'observaciones', label: 'Observaciones', align: 'center' },
    { name: 'cantidad', label: 'Cantidad', align: 'center' },
    { name: 'total', label: 'Total', align: 'center' },
    { name: 'estado', label: 'Estado', align: 'center' },
  ]);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };
  
  const listarMaquinariaHerramientas = async () => {
    try {
      const response = await MaquinariaHerramienta.find(); // Ajusta esto según cómo consultas los datos
      return response;
    } catch (error) {
      console.error('Error al listar maquinaria y herramientas:', error);
      return [];
    }
  };
  
  const filteredRows = computed(() => {
    switch (selectedOption.value) {
      case 'Listar Maquinaria y Herramientas':
        return listarMaquinariaHerramientas();
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
