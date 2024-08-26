<script setup>
import { ref, onMounted } from "vue";
import { useStoreControl_plagas } from "../stores/control_plagas.js";

const useControlPlaga = useStoreControl_plagas();

const rows = ref([
	{
		_id: "66b4ab7e2c2ef260f94c2f17",
		id_cultivo: "66b4a789806c1caa749bc229",
		empleado_id: "66a9879724a00ac422a763ab",
		fecha: "2024-08-10T00:00:00Z",
		tipoCultivo: "Hortaliza",
		nombre: "Tratamiento contra pulgones",
		tipo: "fitosanitario",
		ingredientesActivo: ["Aceite de neem", "Pirimetanil"],
		dosis: 50,
		operario: "Julio",
		observaciones: "Aplicar en la mañana para evitar el sol fuerte.",
	},
]);
const columns = ref([
	{
		name: "id_cultivo",
		label: "Cultivo",
		field: "id_cultivo",
		align: "center",
		sortable: true,
	},
	{
		name: "empleado_id",
		label: "Empleado",
		field: "empleado_id",
		align: "center",
	},
	{
		name: "fecha",
		label: "Fecha",
		field: "fecha",
		align: "center",
		sortable: true,
	},
	{
		name: "tipoCultivo",
		label: "Tipo Cultivo",
		field: "tipoCultivo",
		align: "center",
	},
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
		sortable: true,
	},
	{
		name: "ingredientesActivo",
		label: "Ingredientes Activo",
		field: "ingredientesActivo",
		align: "center",
		sortable: true,
	},
	{
		name: "dosis",
		label: "Dosis",
		field: "dosis",
		align: "center",
		sortable: true,
	},
	{
		name: "numeroLoteComercial",
		label: "Num. Lote Comercial",
		field: "numeroLoteComercial",
		align: "center",
		sortable: true,
	},
	{
		name: "total",
		label: "Total",
		field: "total",
		align: "center",
		sortable: true,
	},
	{
		name: "operario",
		label: "Operario",
		field: "operario",
		align: "center",
		sortable: true,
	},
	{
		name: "observaciones",
		label: "Observaciones",
		field: "observaciones",
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

async function listarControlPlagas() {
	try {
		const r = await useControlPlaga.getControlPlagas();
		rows.value = r.data.climas;
	} catch (error) {
		console.log(error.message);
	}
}

onMounted(() => {
	listarControlPlagas();
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
