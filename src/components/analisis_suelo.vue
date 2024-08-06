<script setup>
/* import { ref, computed, onMounted } from "vue";
import { QTable, QTd, QSelect, QTr } from "quasar";
import { useStoreAnalisisSuelos } from "../stores/analisis_suelo.js"; // Asegúrate de importar la store correctamente

const analisisSuelosStore = useStoreAnalisisSuelos();

// Montar la store para listar análisis de suelos al iniciar
onMounted(() => {
	analisisSuelosStore.listarAnalisisSuelos();
});

const pagination = ref({
	sortBy: "fecha",
	descending: true,
	page: 1,
	rowsPerPage: 10,
});

const selectedOption = ref("Listar Análisis de Suelos");
const options = computed(() => analisisSuelosStore.options);
const columns = computed(() => analisisSuelosStore.columns);

const filteredRows = computed(() => {
	switch (selectedOption.value) {
		case "Listar Análisis de Suelos":
			return analisisSuelosStore.rows;
		// Agrega más casos según tus necesidades
		default:
			return [];
	}
});

const formatDate = (dateString) => {
	const date = new Date(dateString);
	return date.toLocaleDateString("es-ES");
}; */
</script>

<template>
  <div>
<!--     <q-card>
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
              <q-td key="id_parcela" :props="props">
                {{ props.row.id_parcela }}
              </q-td>
              <q-td key="empleado_id" :props="props">
                {{ props.row.empleado_id }}
              </q-td>
              <q-td key="muestra" :props="props">
                {{ props.row.muestra }}
              </q-td>
              <q-td key="cultivo" :props="props">
                {{ props.row.cultivo || "-" }}
              </q-td>
              <q-td key="laboratorio" :props="props">
                {{ props.row.laboratorio || "-" }}
              </q-td>
              <q-td key="resultados" :props="props">
                <ul>
                  <li
                    v-for="(resultado, index) in props.row
                      .resultados"
                    :key="index">
                    {{ resultado }}
                  </li>
                </ul>
              </q-td>
              <q-td key="recomendaciones" :props="props">
                {{ props.row.recomendaciones || "-" }}
              </q-td>
              <q-td key="estado" :props="props">
                {{ props.row.estado === 1 ? "Activo" : "Inactivo" }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
    </q-card> -->
  </div>
</template>

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
