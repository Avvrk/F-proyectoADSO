<script setup>
import { ref, onMounted, computed } from "vue";
import { useStoreControl_plagas } from "../stores/control_plagas.js";
import { Loading, useQuasar } from "quasar";

const $q = useQuasar();

const useControlPlaga = useStoreControl_plagas();

const opcionesTabla = [
    "Todos",
    "Fechas",
    "Tipo",
    "Operario",
];
const cultivos = ref([]);
const empleados = ref([]);
const rows = ref([]);
const columns = ref([
	{
		name: "id_cultivo",
		label: "Cultivo",
		field: (row) => `${row.id_cultivo.nombre} (tipo: ${row.id_cultivo.tipo})`,
		align: "center",
		sortable: true,
	},
	{
		name: "empleado_id",
		label: "Empleado",
		field: (row) => `${row.empleado_id.nombre} (dni: ${row.empleado_id.documento})`,
		align: "center",
	},
	{
		name: "fecha",
		label: "Fecha",
		field: (row) => { return row.fecha.split("T")[0] },
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

const cultivoControlPlagas = ref("");
const empleadoControlPlagas = ref("");
const fechaControlPlagas = ref("");
const tipoCultivoControlPlagas = ref("");
const nombreControlPlagas = ref("");
const tipoControlPlagas = ref("");
const ingredientesActivoControlPlagas = ref("");
const dosisControlPlagas = ref("");
const numeroLoteComercial = ref("");
const totalControlPlagas = ref("");
const operarioControlPlagas = ref("");
const observacionesControlPlagas = ref("");


const loading = ref(false);

const opcionesCultivos = computed(() => {
	return cultivos.value.map((c) => {
		return { label: `${c.nombre} (tipo: ${c.tipo})`}
	})
})

const opcionesEmpleados = computed(() => {
	return empleados.value.map((c) => {
		return { label: `${c.nombre} (dni: ${c.documento})`}
	})
})

async function listarControlPlagas() {
	try {
		loading.value = true;
		const r = await useControlPlaga.getControlPlagas();
		rows.value = r.data.plagas;
	} finally {
		loading.value = false;
	}
}

onMounted(() => {
	listarControlPlagas();
});
</script>

<template>
	<div>
		<div>
            <q-btn @click="controlFormulario(null, true)" label="Agregar" />
        </div>
		<q-table
			flat
			bordered
			title="Control Plagas"
			:rows="rows"
			:columns="columns"
			row-key="id">
			<template v-slot:body-cell-opciones="props">
				<q-td :props="props">
					<q-btn @click="controlFormulario(props.row, true)"> ✏️ </q-btn>
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
