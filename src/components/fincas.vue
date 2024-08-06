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
              <q-td key="_idAdmin" :props="props">
                {{ props.row._idAdmin }}
              </q-td>
              <q-td key="nombre" :props="props">
                {{ props.row.nombre }}
              </q-td>
              <q-td key="rut" :props="props">
                {{ props.row.rut }}
              </q-td>
              <q-td key="direccion" :props="props">
                {{ props.row.direccion }}
              </q-td>
              <q-td key="ubicacionGeografica" :props="props">
                {{ props.row.ubicacionGeografica }}
              </q-td>
              <q-td key="departamento" :props="props">
                {{ props.row.departamento }}
              </q-td>
              <q-td key="ciudad" :props="props">
                {{ props.row.ciudad }}
              </q-td>
              <q-td key="limites" :props="props">
                {{ props.row.limites }}
              </q-td>
              <q-td key="area" :props="props">
                {{ props.row.area }}
              </q-td>
              <q-td key="estado" :props="props">
                {{ props.row.estado === 1 ? 'Activa' : 'Inactiva' }}
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
    sortBy: 'nombre',
    descending: false,
    page: 1,
    rowsPerPage: 10
  });
  
  const options = ref([
    { label: 'Listar Fincas', value: 'Listar Fincas' },
    // Agrega más opciones según tus necesidades
  ]);
  
  const selectedOption = ref('Listar Fincas');
  
  const columns = ref([
    { name: '_idAdmin', label: 'ID de Administrador', align: 'center' },
    { name: 'nombre', label: 'Nombre', align: 'center' },
    { name: 'rut', label: 'RUT', align: 'center' },
    { name: 'direccion', label: 'Dirección', align: 'center' },
    { name: 'ubicacionGeografica', label: 'Ubicación Geográfica', align: 'center' },
    { name: 'departamento', label: 'Departamento', align: 'center' },
    { name: 'ciudad', label: 'Ciudad', align: 'center' },
    { name: 'limites', label: 'Límites', align: 'center' },
    { name: 'area', label: 'Área', align: 'center' },
    { name: 'estado', label: 'Estado', align: 'center' },
  ]);
  
  const listarFincas = async () => {
    try {
      const response = await Finca.find(); // Ajusta esto según cómo consultas los datos
      return response;
    } catch (error) {
      console.error('Error al listar fincas:', error);
      return [];
    }
  };
  
  const filteredRows = computed(() => {
    switch (selectedOption.value) {
      case 'Listar Fincas':
        return listarFincas();
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
