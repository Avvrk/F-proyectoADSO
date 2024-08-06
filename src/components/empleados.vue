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
              <q-td key="nombre" :props="props">
                {{ props.row.nombre }}
              </q-td>
              <q-td key="direccion" :props="props">
                {{ props.row.direccion || '-' }}
              </q-td>
              <q-td key="telefono" :props="props">
                {{ props.row.telefono || '-' }}
              </q-td>
              <q-td key="estudios" :props="props">
                {{ props.row.estudios || '-' }}
              </q-td>
              <q-td key="descripcion" :props="props">
                {{ props.row.descripcion || '-' }}
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
    { label: 'Listar Empleados', value: 'Listar Empleados' },
    // Agrega más opciones según tus necesidades
  ]);
  
  const selectedOption = ref('Listar Empleados');
  
  const columns = ref([
    { name: 'nombre', label: 'Nombre', align: 'center' },
    { name: 'direccion', label: 'Dirección', align: 'center' },
    { name: 'telefono', label: 'Teléfono', align: 'center' },
    { name: 'estudios', label: 'Estudios', align: 'center' },
    { name: 'descripcion', label: 'Descripción', align: 'center' },
  ]);
  
  const listarEmpleados = async () => {
    try {
      const response = await Empleado.find(); // Ajusta esto según cómo consultas los datos
      return response;
    } catch (error) {
      console.error('Error al listar empleados:', error);
      return [];
    }
  };
  
  const filteredRows = computed(() => {
    switch (selectedOption.value) {
      case 'Listar Empleados':
        return listarEmpleados();
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
