<template>
  <div>
    <!-- <q-card>
      <q-card-section>
        <q-table
          :rows="filteredRows"
          :columns="columns"
          row-key="_id"
          :rows-per-page-options="[10, 20, 30]"
          :pagination="pagination">
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
              <q-td key="nombre" :props="props">
                {{ props.row.nombre }}
              </q-td>
              <q-td key="fecha" :props="props">
                {{ formatDate(props.row.fecha) }}
              </q-td>
              <q-td key="especie" :props="props">
                {{ props.row.especie || "-" }}
              </q-td>
              <q-td key="telefono" :props="props">
                {{ props.row.telefono }}
              </q-td>
              <q-td key="cantidad" :props="props">
                {{ props.row.cantidad }}
              </q-td>
              <q-td key="numeroGuiaTransporte" :props="props">
                {{ props.row.numeroGuiaTransporte || "-" }}
              </q-td>
              <q-td key="numeroLoteComercial" :props="props">
                {{ props.row.numeroLoteComercial || "-" }}
              </q-td>
              <q-td key="ingreso_id" :props="props">
                {{ props.row.ingreso_id || "-" }}
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

const pagination = ref({
	sortBy: "fecha",
	descending: true,
	page: 1,
	rowsPerPage: 10,
});

const options = ref([
	{ label: "Listar Compradores", value: "Listar Compradores" },
]);

const selectedOption = ref("Listar Compradores");

const columns = ref([
	{ name: "nombre", label: "Nombre", align: "center" },
	{ name: "fecha", label: "Fecha", align: "center" },
	{ name: "especie", label: "Especie", align: "center" },
	{ name: "telefono", label: "Teléfono", align: "center" },
	{ name: "cantidad", label: "Cantidad", align: "center" },
	{
		name: "numeroGuiaTransporte",
		label: "Guía de Transporte",
		align: "center",
	},
	{ name: "numeroLoteComercial", label: "Lote Comercial", align: "center" },
	{ name: "ingreso_id", label: "ID de Ingreso", align: "center" },
]);

const formatDate = (dateString) => {
	const date = new Date(dateString);
	return date.toLocaleDateString("es-ES");
};

const listarCompradores = async () => {
	try {
		const response = await Comprador.find(); // Ajusta esto según cómo consultas los datos
		return response;
	} catch (error) {
		console.error("Error al listar compradores:", error);
		return [];
	}
};

const filteredRows = computed(() => {
	switch (selectedOption.value) {
		case "Listar Compradores":
			return listarCompradores();
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
