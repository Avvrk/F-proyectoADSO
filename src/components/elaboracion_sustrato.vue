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
          virtual-scroll>
          <template v-slot:top-left>
            <q-select
              v-model="selectedOption"
              :options="options"
              label="Seleccionar opción"
              outlined
              dense />
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="fecha" :props="props">
                {{ formatDate(props.row.fecha) }}
              </q-td>
              <q-td key="productoComercial" :props="props">
                {{ props.row.productoComercial || "-" }}
              </q-td>
              <q-td key="ingredienteActivo" :props="props">
                {{ props.row.ingredienteActivo || "-" }}
              </q-td>
              <q-td key="dosisUtilizada" :props="props">
                {{ props.row.dosisUtilizada || "-" }}
              </q-td>
              <q-td key="metodoAplicacion" :props="props">
                {{ props.row.metodoAplicacion || "-" }}
              </q-td>
              <q-td key="empleado_idOperario" :props="props">
                {{ props.row.empleado_idOperario || "-" }}
              </q-td>
              <q-td key="empleado_idResponsable" :props="props">
                {{ props.row.empleado_idResponsable || "-" }}
              </q-td>
              <q-td key="observaciones" :props="props">
                {{ props.row.observaciones || "-" }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
    </q-card> -->
  </div>
</template>

<script setup>
/* import { ref, computed } from "vue";
import { QTable, QTd, QSelect } from "quasar";

const pagination = ref({
	sortBy: "fecha",
	descending: true,
	page: 1,
	rowsPerPage: 10,
});

const options = ref([
	{ label: "Listar Sustratos", value: "Listar Sustratos" },
	// Agrega más opciones según tus necesidades
]);

const selectedOption = ref("Listar Sustratos");

const columns = ref([
	{ name: "fecha", label: "Fecha", align: "center" },
	{ name: "productoComercial", label: "Producto Comercial", align: "center" },
	{ name: "ingredienteActivo", label: "Ingrediente Activo", align: "center" },
	{ name: "dosisUtilizada", label: "Dosis Utilizada", align: "center" },
	{
		name: "metodoAplicacion",
		label: "Método de Aplicación",
		align: "center",
	},
	{ name: "empleado_idOperario", label: "ID de Operario", align: "center" },
	{
		name: "empleado_idResponsable",
		label: "ID de Responsable",
		align: "center",
	},
	{ name: "observaciones", label: "Observaciones", align: "center" },
]);

const formatDate = (dateString) => {
	const date = new Date(dateString);
	return date.toLocaleDateString("es-ES");
};

const listarSustratos = async () => {
	try {
		const response = await Sustrato.find(); // Ajusta esto según cómo consultas los datos
		return response;
	} catch (error) {
		console.error("Error al listar sustratos:", error);
		return [];
	}
};

const filteredRows = computed(() => {
	switch (selectedOption.value) {
		case "Listar Sustratos":
			return listarSustratos();
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
