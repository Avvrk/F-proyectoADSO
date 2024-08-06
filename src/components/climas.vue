<script setup>
/* import { ref, onMounted, computed } from "vue";
import { useStoreClimas } from "../stores/climas.js";

const useClima = useStoreClimas();

const finca_id = ref("");
const empleado_id = ref("");
const fecha = ref("");
const tipoClima = ref("");
const horaInicio = ref("");
const horaFinal = ref("");
const temperaturaMaxima = ref("");
const temperaturaMinima = ref("");

const mostrarFormularioAgregarClima = ref(false);
const mostrarFormularioEditarClima = ref(false);
const idClimaSeleccionado = ref(null);

const options = ref([
	{ label: "Listar Clima por Fecha", value: "fecha" },
	{ label: "Listar Clima por Tipo", value: "tipoClima" },
]);

const selectedOption = ref("");
const fechaSeleccionada = ref("");
const tipoClimaSeleccionado = ref("");

const rows = ref([]);
const columns = ref([
	{ name: "finca_id", label: "Finca ID", field: "finca_id", align: "center" },
	{
		name: "empleado_id",
		label: "Empleado ID",
		field: "empleado_id",
		align: "center",
	},
	{
		name: "fecha",
		label: "Fecha",
		align: "center",
		field: (row) => format(new Date(row.fecha), "dd/MM/yyyy"),
	},
	{
		name: "tipoClima",
		label: "Tipo de Clima",
		field: "tipoClima",
		align: "center",
	},
	{
		name: "horaInicio",
		label: "Hora de Inicio",
		field: "horaInicio",
		align: "center",
	},
	{
		name: "horaFinal",
		label: "Hora Final",
		field: "horaFinal",
		align: "center",
	},
	{
		name: "temperaturaMaxima",
		label: "Temperatura Máxima",
		field: "temperaturaMaxima",
		align: "center",
	},
	{
		name: "temperaturaMinima",
		label: "Temperatura Mínima",
		field: "temperaturaMinima",
		align: "center",
	},
	{ name: "opciones", label: "Opciones", field: "opciones", align: "center" },
]);

async function listarClimas() {
	try {
		const response = await useClima.getClimas();
		rows.value = response.data;
	} catch (error) {
		console.error("Error al listar climas:", error);
		rows.value = [];
	}
}

async function agregarClima() {
	const nuevoClima = {
		finca_id: finca_id.value,
		empleado_id: empleado_id.value,
		fecha: fecha.value,
		tipoClima: tipoClima.value,
		horaInicio: horaInicio.value,
		horaFinal: horaFinal.value,
		temperaturaMaxima: temperaturaMaxima.value,
		temperaturaMinima: temperaturaMinima.value,
	};

	try {
		const response = await useClima.postClima(nuevoClima);
		if (response.status === 200) {
			listarClimas();
			mostrarFormularioAgregarClima.value = false;
			limpiarCampos();
		} else {
			console.error("Error al agregar clima:", response);
		}
	} catch (error) {
		console.error("Error al agregar clima:", error);
	}
}

function cargarClimaParaEdicion(clima) {
	idClimaSeleccionado.value = clima._id;
	finca_id.value = clima.finca_id;
	empleado_id.value = clima.empleado_id;
	fecha.value = clima.fecha;
	tipoClima.value = clima.tipoClima;
	horaInicio.value = clima.horaInicio;
	horaFinal.value = clima.horaFinal;
	temperaturaMaxima.value = clima.temperaturaMaxima;
	temperaturaMinima.value = clima.temperaturaMinima;
	mostrarFormularioEditarClima.value = true;
}

async function editarClima() {
	const climaActualizado = {
		finca_id: finca_id.value,
		empleado_id: empleado_id.value,
		fecha: fecha.value,
		tipoClima: tipoClima.value,
		horaInicio: horaInicio.value,
		horaFinal: horaFinal.value,
		temperaturaMaxima: temperaturaMaxima.value,
		temperaturaMinima: temperaturaMinima.value,
	};

	try {
		const response = await useClima.putClima(
			idClimaSeleccionado.value,
			climaActualizado
		);
		if (response.status === 200) {
			listarClimas();
			mostrarFormularioEditarClima.value = false;
			limpiarCampos();
		} else {
			console.error("Error al editar clima:", response);
		}
	} catch (error) {
		console.error("Error al editar clima:", error);
	}
}

async function eliminarClima(id) {
	try {
		const response = await useClima.deleteClima(id);
		if (response.status === 200) {
			listarClimas();
		} else {
			console.error("Error al eliminar clima:", response);
		}
	} catch (error) {
		console.error("Error al eliminar clima:", error);
	}
}

function cancelarClima() {
	mostrarFormularioAgregarClima.value = false;
	mostrarFormularioEditarClima.value = false;
	limpiarCampos();
}

function limpiarCampos() {
	finca_id.value = "";
	empleado_id.value = "";
	fecha.value = "";
	tipoClima.value = "";
	horaInicio.value = "";
	horaFinal.value = "";
	temperaturaMaxima.value = "";
	temperaturaMinima.value = "";
	idClimaSeleccionado.value = null;
}

const filteredRows = computed(() => {
	if (selectedOption.value === "fecha" && fechaSeleccionada.value) {
		return rows.value.filter(
			(row) => row.fecha === fechaSeleccionada.value
		);
	} else if (
		selectedOption.value === "tipoClima" &&
		tipoClimaSeleccionado.value
	) {
		return rows.value.filter((row) =>
			row.tipoClima
				.toLowerCase()
				.includes(tipoClimaSeleccionado.value.toLowerCase())
		);
	}
	return rows.value;
});

function selectAllText(event) {
	event.target.select();
}

onMounted(() => {
	listarClimas();
}); */
</script>

<template>
	<div class="q-pa-md">
		<!-- <div>
			<div>
				<h3 style="text-align: center; margin: 10px">Clima</h3>
				<hr style="width: 70%; height: 5px; background-color: green" />
			</div>

			<div
				class="contSelect"
				style="margin-left: 5%; text-align: end; margin-right: 5%">
				<q-select
					background-color="green"
					class="q-my-md"
					v-model="selectedOption"
					outlined
					dense
					emit-value
					:options="options" />
				<input
					v-if="selectedOption === 'fecha'"
					v-model="fechaSeleccionada"
					class="q-my-md"
					type="date"
					name="search"
					id="search"
					placeholder="Fecha"
					@dblclick="selectAllText" />
				<input
					v-if="selectedOption === 'tipoClima'"
					v-model="tipoClimaSeleccionado"
					class="q-my-md"
					type="text"
					name="search"
					id="search"
					placeholder="Tipo de Clima"
					@dblclick="selectAllText" />
			</div>

			<div
				style="margin-left: 5%; text-align: end; margin-right: 5%"
				class="q-my-md">
				<q-btn
					label="Agregar Clima"
					@click="mostrarFormularioAgregarClima = true">
					<q-tooltip> Agregar Clima </q-tooltip>
				</q-btn>
			</div>

			<q-dialog v-model="mostrarFormularioAgregarClima">
				<q-card>
					<q-card-section>
						<div class="text-h5">Agregar Clima</div>
					</q-card-section>

					<q-card-section>
						<q-form @submit.prevent="agregarClima">
							<q-input
								v-model="finca_id"
								label="ID de Finca"
								filled
								required
								class="q-mb-md" />
							<q-input
								v-model="empleado_id"
								label="ID de Empleado"
								filled
								required
								class="q-mb-md" />
							<q-input
								v-model="fecha"
								label="Fecha"
								type="date"
								filled
								required
								class="q-mb-md" />
							<q-input
								v-model="tipoClima"
								label="Tipo de Clima"
								filled
								required
								class="q-mb-md" />
							<q-input
								v-model="horaInicio"
								label="Hora de Inicio"
								filled
								required
								class="q-mb-md" />
							<q-input
								v-model="horaFinal"
								label="Hora de Finalización"
								filled
								required
								class="q-mb-md" />
							<q-input
								v-model="temperaturaMaxima"
								label="Temperatura Máxima"
								type="number"
								filled
								required
								class="q-mb-md" />
							<q-input
								v-model="temperaturaMinima"
								label="Temperatura Mínima"
								type="number"
								filled
								required
								class="q-mb-md" />

							<div class="q-gutter-md row justify-center">
								<q-btn
									label="Agregar"
									type="submit"
									color="primary" />
								<q-btn
									label="Cancelar"
									color="negative"
									@click="cancelarClima" />
							</div>
						</q-form>
					</q-card-section>
				</q-card>
			</q-dialog>

			<q-dialog v-model="mostrarFormularioEditarClima">
				<q-card>
					<q-card-section>
						<div class="text-h5">Editar Clima</div>
					</q-card-section>

					<q-card-section>
						<q-form @submit.prevent="editarClima">
							<q-input
								v-model="finca_id"
								label="ID de Finca"
								filled
								required
								class="q-mb-md" />
							<q-input
								v-model="empleado_id"
								label="ID de Empleado"
								filled
								required
								class="q-mb-md" />
							<q-input
								v-model="fecha"
								label="Fecha"
								type="date"
								filled
								required
								class="q-mb-md" />
							<q-input
								v-model="tipoClima"
								label="Tipo de Clima"
								filled
								required
								class="q-mb-md" />
							<q-input
								v-model="horaInicio"
								label="Hora de Inicio"
								filled
								required
								class="q-mb-md" />
							<q-input
								v-model="horaFinal"
								label="Hora de Finalización"
								filled
								required
								class="q-mb-md" />
							<q-input
								v-model="temperaturaMaxima"
								label="Temperatura Máxima"
								type="number"
								filled
								required
								class="q-mb-md" />
							<q-input
								v-model="temperaturaMinima"
								label="Temperatura Mínima"
								type="number"
								filled
								required
								class="q-mb-md" />

							<div class="q-gutter-md row justify-center">
								<q-btn
									label="Guardar"
									type="submit"
									color="primary" />
								<q-btn
									label="Cancelar"
									color="negative"
									@click="cancelarClima" />
							</div>
						</q-form>
					</q-card-section>
				</q-card>
			</q-dialog>

			<q-table
				:rows="filteredRows"
				:columns="columns"
				row-key="_id"
				flat
				:rows-per-page-options="[10, 20, 30]">
				<template v-slot:body-cell-opciones="props">
					<q-td align="center">
						<q-btn
							dense
							round
							icon="edit"
							@click="cargarClimaParaEdicion(props.row)" />
						<q-btn
							dense
							round
							icon="delete"
							color="negative"
							@click="eliminarClima(props.row._id)" />
					</q-td>
				</template>
			</q-table>
		</div> -->
	</div>
</template>

<style scoped>
.contSelect .q-select__inner {
	background-color: green;
}
.q-my-md {
	margin-top: 10px;
	margin-bottom: 10px;
}
</style>
