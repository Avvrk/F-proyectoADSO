<script setup>
import { ref, onMounted } from "vue";
import { useStoreElaboracion_sustrato } from "../stores/elaboracion_sustrato.js";

const useSustrato = useStoreElaboracion_sustrato();

const rows = ref([
	{
		_id: "66b4a471806c1caa749bc227",
		nombre: "Tomate",
		tipo: "Hortaliza",
		id_parcela: "64d7a5f9dcb8e4f6476b4f30",
	},
]);
const columns = ref([
	{
		name: "nombre",
		label: "Nombre",
		field: "nombre",
		align: "center",
		sortable: true,
	},
	{
		name: "tipo",
		label: "Tipo",
		field: "tipo",
		align: "center",
	},
	{
		name: "id_parcela",
		label: "Parcela",
		field: "id_parcela",
		align: "center",
		sortable: true,
	},
	{
		name: "opciones",
		label: "Opciones",
		field: "opciones",
		align: "center",
	},
]);

async function listarSustratos() {
	try {
		const r = await useSustrato.getSustratos();
		rows.value = r.data.sustratos;
	} catch (error) {
		console.log(error.message);
	}
}

onMounted(() => {
	listarSustratos();
});
</script>

<template>
	<div>
		<q-table
			flat
			bordered
			title="Climas"
			:rows="rows"
			:columns="columns"
			row-key="id">
			<template v-slot:body-cell-opciones="props">
				<q-td :props="props">
					<q-btn> ✏️ </q-btn>
					<q-btn v-if="props.row.estado == 1"> ❌ </q-btn>
					<q-btn v-else> ✅ </q-btn>
				</q-td>
			</template>
			<template v-slot:body-cell-estado="props">
				<q-td :props="props">
					<p v-if="props.row.estado == 1" style="color: green">
						Activo
					</p>
					<p v-else style="color: red">Inactivo</p>
				</q-td>
			</template>
		</q-table>
	</div>
</template>

<style scoped></style>
