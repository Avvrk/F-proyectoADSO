<script setup>
import { ref, onMounted, computed } from "vue";
import { useStoreParcelas } from "../stores/parcelas.js";
import { Notify } from "quasar";

// Variables usadas en el filtro
const opcionesTabla = ["Todos", "Fechas", "Fincas"];
const opcion = ref("Todos");
const mostrarSelectFincas = ref(false);
const mostrarInputFechas = ref(false);
const mostrarInput = ref(false);
const finca = ref("");
const fechaInicio = ref("");
const fechaFin = ref("");

const storeParcelas = useStoreParcelas();

const loading = ref(false);
const dialogEditParcela = ref(false);
const dialogAddParcela = ref(false);
const editParcela = ref({});
const newParcela = ref({
	numero: "",
	ubicacionGeografica: "",
	cultivoAnterior: "",
	cultivoActual: "",
	detalle: "",
	estado: 1,
	area: 0,
	id_finca: "", // Asegúrate de que esto sea un valor válido
});
const parcelas = ref([]);
const fincas = ref([]);

const columns = [
	{ name: "numero", label: "Número", align: "center", field: "numero" },
	{
		name: "ubicacionGeografica",
		label: "Ubicación Geográfica",
		align: "left",
		field: "ubicacionGeografica",
	},
	{
		name: "cultivoAnterior",
		label: "Cultivo Anterior",
		align: "left",
		field: "cultivoAnterior",
	},
	{
		name: "cultivoActual",
		label: "Cultivo Actual",
		align: "left",
		field: "cultivoActual",
	},
	{ name: "detalle", label: "Detalle", align: "left", field: "detalle" },
	{
		name: "area",
		label: "Área",
		align: "center",
		field: "area",
		format: (val) => `${val} m²`,
	},
	{
		name: "id_finca",
		label: "Finca",
		align: "center",
		field: (row) => (row.id_finca ? row.id_finca.nombre : "Sin Finca"),
	},
	{
		name: "estado",
		label: "Estado",
		align: "center",
		field: "estado" /* field: (row) => row.estado === 1 ? "Activo" : "Inactivo" */,
	},
	{ name: "actions", label: "Acciones", align: "center" },
];

const opcionesFinca = computed(() => {
	return fincas.value.map((f) => ({
		label: f.nombre,
		value: f._id, // Usar 'value' en lugar de 'id'
	}));
});

const loadParcelas = async () => {
	loading.value = true;
	try {
		const response = await storeParcelas.getParcelas();
		parcelas.value = response.data.parcelas;
	} catch (error) {
		Notify.create({
			type: "negative",
			message: "Error al cargar las parcelas.",
		});
	} finally {
		loading.value = false;
	}
};

const loadFincas = async () => {
	try {
		const response = await storeParcelas.getFincas();
		fincas.value = response.data.fincas; // Verifica los datos
	} catch (error) {
		Notify.create({
			type: "negative",
			message: "Error al cargar las fincas.",
		});
	}
};

const addParcela = async () => {
	try {
		if (
			!newParcela.value.numero ||
			!newParcela.value.ubicacionGeografica ||
			!newParcela.value.cultivoActual ||
			!newParcela.value.area ||
			!newParcela.value.id_finca
		) {
			Notify.create({
				type: "negative",
				message: "Por favor, completa todos los campos.",
			});
			return;
		}

		const parcelaData = {
			numero: newParcela.value.numero,
			ubicacionGeografica: newParcela.value.ubicacionGeografica,
			cultivoAnterior: newParcela.value.cultivoAnterior,
			cultivoActual: newParcela.value.cultivoActual,
			detalle: newParcela.value.detalle,
			area: newParcela.value.area,
			id_finca: newParcela.value.id_finca, // Asegúrate de que este valor sea válido
			estado: newParcela.value.estado,
		};

		await storeParcelas.postParcela(parcelaData);
		await loadParcelas();
		dialogAddParcela.value = false;
		Notify.create({
			type: "positive",
			message: "Parcela agregada con éxito.",
		});
	} catch (error) {
		console.error(error);
		Notify.create({
			type: "negative",
			message: "Error al agregar la parcela.",
		});
	}
};

const editParcelaData = async (parcela) => {
	try {
		// Cargar los datos de la parcela seleccionada en el formulario de edición
		editParcela.value = {
			...parcela,
			id_finca: opcionesFinca.value.find(
				(f) => f.value === parcela.id_finca
			), // Usar 'value'
		};
		dialogEditParcela.value = true;
	} catch (error) {
		Notify.create({
			type: "negative",
			message: "Error al cargar la parcela para edición.",
		});
	}
};

const updateParcela = async () => {
	try {
		await storeParcelas.putParcela(editParcela.value._id, {
			...editParcela.value,
			id_finca: editParcela.value.id_finca.value, // Asegurarse de enviar solo el ID de la finca
		});
		await loadParcelas();
		dialogEditParcela.value = false;
		Notify.create({
			type: "positive",
			message: "Parcela actualizada con éxito.",
		});
	} catch (error) {
		console.error(error);
		Notify.create({
			type: "negative",
			message: "Error al actualizar la parcela.",
		});
	}
};

const changeParcelaState = async (id, estado) => {
	try {
		const newState = estado === 1 ? 0 : 1;
		await storeParcelas.putParcelaEstado(id, newState);
		await loadParcelas();
		Notify.create({
			type: "positive",
			message: `Parcela ${
				newState === 1 ? "activada" : "inactivada"
			} con éxito.`,
		});
	} catch (error) {
		Notify.create({
			type: "negative",
			message: "Error al cambiar el estado de la parcela.",
		});
	}
};

async function listarParcelasFechas() {
	if (fechaInicio.value && fechaFin.value) {
		const inicio = new Date(fechaInicio.value);
		const fin = new Date(fechaFin.value);

		if (inicio > fin) {
			Notify.create({
				type: "negative",
				message:
					"La fecha de inicio no puede ser mayor que la fecha de fin.",
				position: "bottom",
			});
			return;
		}
		try {
			loading.value = true;
			const r = await storeParcelas.getParcelasFechas(
				fechaInicio.value,
				fechaFin.value
			);
			parcelas.value = r.data.parcelas;
		} finally {
			loading.value = false;
		}
	} else {
		Notify.create({
			type: "negative",
			message: "Llena los campos",
			position: "bottom",
		});
	}
}

async function listarParcelasFinca() {
	try {
		if (finca.value) {
			loading.value = true;
			const r = await storeParcelas.getParcelasFinca(finca.value);
			parcelas.value = r.data.parcelas;
		} else {
			Notify.create({
				type: "negative",
				message: "Complete el campo",
				position: "bottom",
			});
		}
	} finally {
		loading.value = false;
	}
}

function estadoTabla() {
	if (opcion.value === "Fechas") {
		mostrarSelectFincas.value = false;
		mostrarInputFechas.value = true;
		mostrarInput.value = true;
	} else if (opcion.value === "Fincas") {
		mostrarInputFechas.value = false;
		mostrarSelectFincas.value = true;
		mostrarInput.value = true;
	} else {
		mostrarInputFechas.value = false;
		mostrarSelectFincas.value = false;
		mostrarInput.value = false;
		loadParcelas();
	}
}

onMounted(() => {
	loadParcelas();
	loadFincas();
});
</script>

<template>
	<q-page>
		<q-card>
			<q-card-section>
				<q-btn
					@click="dialogAddParcela = true"
					label="Agregar Parcela"
					color="positive" />
			</q-card-section>

			<q-table
				:rows="parcelas"
				:columns="columns"
				row-key="_id"
				:loading="loading">
				<template v-slot:top>
					<q-select
						v-if="mostrarSelectFincas"
						:options="opcionesFinca"
						v-model="finca" />
					<q-input
						v-if="mostrarInputFechas"
						type="date"
						label="Fecha Inicio"
						v-model="fechaInicio" />
					<q-input
						v-if="mostrarInputFechas"
						type="date"
						label="Fecha Fin"
						v-model="fechaFin" />
					<q-btn
						v-if="mostrarInput"
						label="Buscar"
						@click="
							mostrarInputFechas
								? listarParcelasFechas()
								: mostrarSelectFincas
								? listarParcelasFinca()
								: ''
						" />
					<q-select
						standout="bg-green text-white"
						:options="opcionesTabla"
						v-model="opcion"
						@update:model-value="estadoTabla" />
				</template>
				<template v-slot:loading>
					<q-inner-loading :showing="loading" />
				</template>
				<template v-slot:body-cell-actions="props">
					<q-td :props="props">
						<q-btn
							@click="editParcelaData(props.row)"
							icon="edit"
							color="primary" />
						<q-btn
							@click="
								changeParcelaState(
									props.row._id,
									props.row.estado
								)
							"
							:icon="
								props.row.estado === 1
									? 'toggle_off'
									: 'toggle_on'
							"
							color="secondary" />
					</q-td>
				</template>
			</q-table>

			<!-- Diálogo para editar parcela -->
			<q-dialog v-model="dialogEditParcela" persistent>
				<q-card>
					<q-card-section>
						<q-input
							v-model="editParcela.numero"
							label="Número"
							type="number" />
						<q-input
							v-model="editParcela.ubicacionGeografica"
							label="Ubicación Geográfica" />
						<q-input
							v-model="editParcela.cultivoAnterior"
							label="Cultivo Anterior" />
						<q-input
							v-model="editParcela.cultivoActual"
							label="Cultivo Actual" />
						<q-input
							v-model="editParcela.detalle"
							label="Detalle" />
						<q-input
							v-model="editParcela.area"
							label="Área"
							type="number" />
						<q-select
							v-model="editParcela.id_finca"
							:options="opcionesFinca"
							label="Finca" />
						<q-select
							v-model="editParcela.estado"
							:options="[
								{ label: 'Activo', value: 1 },
								{ label: 'Inactivo', value: 0 },
							]"
							label="Estado" />
					</q-card-section>
					<q-card-actions>
						<q-btn
							@click="updateParcela"
							label="Guardar"
							color="primary" />
						<q-btn
							@click="dialogEditParcela = false"
							label="Cancelar"
							color="secondary" />
					</q-card-actions>
				</q-card>
			</q-dialog>

			<!-- Diálogo para agregar parcela -->
			<q-dialog v-model="dialogAddParcela" persistent>
				<q-card>
					<q-card-section>
						<q-input
							v-model="newParcela.numero"
							label="Número"
							type="number" />
						<q-input
							v-model="newParcela.ubicacionGeografica"
							label="Ubicación Geográfica" />
						<q-input
							v-model="newParcela.cultivoAnterior"
							label="Cultivo Anterior" />
						<q-input
							v-model="newParcela.cultivoActual"
							label="Cultivo Actual" />
						<q-input v-model="newParcela.detalle" label="Detalle" />
						<q-input
							v-model="newParcela.area"
							label="Área"
							type="number" />
						<q-select
							v-model="newParcela.id_finca"
							:options="opcionesFinca"
							label="Finca" />
						<q-select
							v-model="newParcela.estado"
							:options="[
								{ label: 'Activo', value: 1 },
								{ label: 'Inactivo', value: 0 },
							]"
							label="Estado" />
					</q-card-section>
					<q-card-actions>
						<q-btn
							@click="addParcela"
							label="Agregar"
							color="primary" />
						<q-btn
							@click="dialogAddParcela = false"
							label="Cancelar"
							color="secondary" />
					</q-card-actions>
				</q-card>
			</q-dialog>
		</q-card>
	</q-page>
</template>
