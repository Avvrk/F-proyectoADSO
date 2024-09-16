<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

// Datos de los insumos
let rows = ref([]);
let columns = ref([
	{
		name: "_idProveedor",
		align: "center",
		label: "ID de Proveedor",
		field: "_idProveedor",
		sortable: true,
	},
	{
		name: "nombre",
		align: "center",
		label: "Nombre",
		field: "nombre",
		sortable: true,
	},
	{
		name: "relacionNPK",
		align: "center",
		label: "Relación NPK",
		field: "relacionNPK",
		sortable: true,
	},
	{
		name: "cantidad",
		align: "center",
		label: "Cantidad",
		field: "cantidad",
		sortable: true,
	},
	{
		name: "unidad",
		align: "center",
		label: "Unidad",
		field: "unidad",
		sortable: true,
	},
	{
		name: "total",
		align: "center",
		label: "Total",
		field: "total",
		sortable: true,
	},
	{
		name: "responsable",
		align: "center",
		label: "Responsable",
		field: "responsable",
		sortable: true,
	},
	{
		name: "observaciones",
		align: "center",
		label: "Observaciones",
		field: "observaciones",
		sortable: true,
	},
	{
		name: "opciones",
		align: "center",
		label: "Editar",
		field: "opciones",
		sortable: true,
	},
]);

// Información del insumo en edición
const editando = ref(false);
const insumoActual = ref({
	_idProveedor: "",
	nombre: "",
	relacionNPK: "",
	cantidad: 0,
	unidad: "",
	total: "",
	responsable: "",
	observaciones: "",
});

// Función para abrir la card de edición
function editarInsumo(insumo) {
	insumoActual.value = { ...insumo };
	editando.value = true;
}

// Función para guardar los cambios del insumo
function guardarCambios() {
	const indice = rows.value.findIndex(
		(i) => i._idProveedor === insumoActual.value._idProveedor
	);
	if (indice !== -1) {
		rows.value[indice] = { ...insumoActual.value };
		$q.notify({
			type: "positive",
			message: "Cambios guardados exitosamente.",
		});
	}
	editando.value = false;
}

// Función para cerrar la card de edición
function cerrarEditar() {
	editando.value = false;
}

onMounted(() => {});
</script>

<template>
	<div class="container">
		<div class="title text-h2 text-center">Insumos</div>
		<hr class="divider" />

		<!-- Tabla de insumos -->
		<q-table
			flat
			bordered
			title="Lista de Insumos"
			:rows="rows"
			:columns="columns"
			row-key="_idProveedor"
			class="table">
			<template v-slot:body-cell-opciones="props">
				<q-td :props="props" class="actions-cell">
					<q-btn @click="editarInsumo(props.row)" class="btn-editar"
						>✏️</q-btn
					>
				</q-td>
			</template>
		</q-table>

		<!-- Card de edición de insumo -->
		<q-dialog v-model="editando">
			<q-card>
				<q-card-section>
					<q-input
						v-model="insumoActual._idProveedor"
						label="ID de Proveedor"></q-input>
					<q-input
						v-model="insumoActual.nombre"
						label="Nombre"></q-input>
					<q-input
						v-model="insumoActual.relacionNPK"
						label="Relación NPK"></q-input>
					<q-input
						v-model="insumoActual.cantidad"
						label="Cantidad"
						type="number"></q-input>
					<q-input
						v-model="insumoActual.unidad"
						label="Unidad"></q-input>
					<q-input
						v-model="insumoActual.total"
						label="Total"></q-input>
					<q-input
						v-model="insumoActual.responsable"
						label="Responsable"></q-input>
					<q-input
						v-model="insumoActual.observaciones"
						label="Observaciones"></q-input>
				</q-card-section>
				<q-card-actions>
					<q-btn @click="guardarCambios" color="primary"
						>Guardar</q-btn
					>
					<q-btn @click="cerrarEditar" color="secondary"
						>Cancelar</q-btn
					>
				</q-card-actions>
			</q-card>
		</q-dialog>
	</div>
</template>

<style scoped>
.container {
	padding: 20px;
	background-color: #f5f5f5;
	border-radius: 10px;
}
.title {
	margin-top: 20px;
	margin-bottom: 20px;
	color: #333;
}
.divider {
	height: 5px;
	background-color: #007bff;
	border: none;
	margin: 20px 0;
}
.table {
	margin-top: 40px;
	border-radius: 10px;
	overflow: hidden;
}
.actions-cell {
	display: flex;
	justify-content: space-around;
	align-items: center;
}
.btn-editar {
	font-size: 1pc;
	margin: 5px 5px;
	color: #007bff;
}
</style>
