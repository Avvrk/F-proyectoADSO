<script setup>
import { ref, onMounted, computed } from "vue";
import { useStoreInsumos } from "../stores/insumos.js";
import notify from "../utils/notificaciones.js";

const useInsumo = useStoreInsumos();

const fincas = ref([]);

const unidad = ["kg", "lts"]
let rows = ref([]);
let columns = ref([
	{
		name: "id_finca",
		align: "center",
		label: "Finca",
		field: (row) => `${row.id_finca.nombre}`,
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
		name: "registro_ica",
		align: "center",
		label: "Registro Ica",
		field: "registro_ica",
		sortable: true,
	},
	{
		name: "registro_invima",
		align: "center",
		label: "Registro Invima",
		field: "registro_invima",
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

const fincaInsumo = ref("");
const nombreInsumo = ref("");
const registroIcaInsumo = ref("");
const registroInvimaInsumo = ref("");
const relacionNPKInsumo = ref("");
const cantidadInsumo = ref("");
const unidadInsumo = ref("");
const observacionesInsumo = ref("");

const datos = ref([]);

const mostrarFormularioInsumo = ref(false);
const mostrarBotonEditar = ref(false);
const loading = ref(false);

const opcionesFinca = computed(() => {
	return fincas.value.map((f) => {
		return { label: `${f.nombre} (rut: ${f.rut})`, id: f._id };
	});
});

async function listarFinca() {
	try {
		loading.value = true;
		const r = await useInsumo.getFincas();
		fincas.value = r.data.fincas;
	} finally {
		loading.value = false;
	}
}

async function listarInsumos() {
	try {
		loading.value = true;
		const r = await useInsumo.getInsumos();
		rows.value = r.data.insumos;
	} finally {
		loading.value = false;
	}
}

async function registrar() {
/* 	if (validarDatos()) { */
		try {
			loading.value = true;
			const info = {
				id_finca: fincaInsumo.value.id,
				nombre: nombreInsumo.value,
				registro_ica: registroIcaInsumo.value,
				registro_invima: registroInvimaInsumo.value,
				relacionNPK: relacionNPKInsumo.value,
				cantidad: cantidadInsumo.value,
				unidad: unidadInsumo.value,
				observaciones: observacionesInsumo.value,
			};

			const r = await useInsumo.postInsumos(info);
			if (r.status === 200) {
				mostrarFormularioInsumo.value = false;
				listarInsumos();
			} else if (r.response && r.response.data.errors) {
				r.response.data.errors.forEach((err) => {
					notify(err.msg);
				});
			}
		} finally {
			loading.value = false;
		}
/* 	} */
}

async function editar() {
/* 	if (validarDatos()) { */
		try {
			loading.value = true;
			const info = {
				id_finca: fincaInsumo.value.id,
				nombre: nombreInsumo.value,
				registro_ica: registroIcaInsumo.value,
				registro_invima: registroInvimaInsumo.value,
				relacionNPK: relacionNPKInsumo.value,
				cantidad: cantidadInsumo.value,
				unidad: unidadInsumo.value,
				observaciones: observacionesInsumo.value,
			};

			const r = await useInsumo.putInsumos(datos.value._id, info);
			if (r.status === 200) {
				mostrarFormularioInsumo.value = false;
				listarInsumos();
			} else if (r.response && r.response.data.errors) {
				r.response.data.errors.forEach((err) => {
					notify(err.msg);
				});
			}
		} finally {
			loading.value = false;
		}
/* 	} */
}

/* function validarDatos() {
	let validacion = true;
	if (
		!proveedorInsumo.value ||
		!nombreInsumo.value ||
		!relacionNPKInsumo.value ||
		!cantidadInsumo.value ||
		!unidadInsumo.value ||
		!totalInsumo.value ||
		!responsableInsumo.value ||
		!observacionesInsumo.value
	) {
		$q.notify({
			color: "red-4",
			position: "top",
			message: "Todos los campos son obligatorios",
			icon: "report_problem",
		});
		validacion = false;
	} else {
		if (!proveedorInsumo.value){
			$q.notify({
				color: "red-4",
				position: "top",
				message: "El campo proveedor es obligatorio",
				icon: "report_problem",
			});
			validacion = false;
		}
		if (!nombreInsumo.value){
			$q.notify({
				color: "red-4",
				position: "top",
				message: "El campo nombre es obligatorio",
				icon: "report_problem",
			});
			validacion = false;
		}
		if (!relacionNPKInsumo.value){
			$q.notify({
				color: "red-4",
				position: "top",
				message: "El campo relación NPK es obligatorio",
				icon: "report_problem",
			});
			validacion = false;
		}
		if (!cantidadInsumo.value){
			$q.notify({
				color: "red-4",
				position: "top",
				message: "El campo cantidad es obligatorio",
				icon: "report_problem",
			});
			validacion = false;
		}
		if (!unidadInsumo.value){
			$q.notify({
				color: "red-4",
				position: "top",
				message: "El campo unidad es obligatorio",
				icon: "report_problem",
			});
			validacion = false;
		}
		if (!totalInsumo.value){
			$q.notify({
				color: "red-4",
				position: "top",
				message: "El campo total es obligatorio",
				icon: "report_problem",
			});
			validacion = false;
		}
		if (!responsableInsumo.value){
			$q.notify({
				color: "red-4",
				position: "top",
				message: "El campo responsable es obligatorio",
				icon: "report_problem",
			});
			validacion = false;
		}
		if (!observacionesInsumo.value){
			$q.notify({
				color: "red-4",
				position: "top",
				message: "El campo observaciones es obligatorio",
				icon: "report_problem",
			});
			validacion = false;
		}

	}
	return validacion;
} */

function controlFormulario(obj, boolean) {
	fincaInsumo.value = "";
	nombreInsumo.value = "";
	registroIcaInsumo.value = "";
	registroInvimaInsumo.value = "";
	relacionNPKInsumo.value = "";
	cantidadInsumo.value = "";
	unidadInsumo.value = "";
	observacionesInsumo.value = "";

	datos.value = obj;
	mostrarBotonEditar.value = false;
	if (obj != null && boolean) {
		fincaInsumo.value = opcionesFinca.value.find(
			(f) => f.id == datos.value.id_finca._id
		);
		nombreInsumo.value = datos.value.nombre;
		registroIcaInsumo.value = datos.value.registro_ica;
		registroInvimaInsumo.value = datos.value.registro_invima;
		relacionNPKInsumo.value = datos.value.relacionNPK;
		cantidadInsumo.value = datos.value.cantidad;
		unidadInsumo.value = datos.value.unidad;
		observacionesInsumo.value = datos.value.observaciones;

		mostrarBotonEditar.value = true;
	}
	mostrarFormularioInsumo.value = boolean;
}

onMounted(() => {
	listarFinca();
	listarInsumos();
});
</script>

<template>
	<div>
		<div class="q-pa-lg">
			<q-table
				:rows="rows"
				:columns="columns"
				row-key="id"
				:loading="loading">
				<template v-slot:top>
					<section class="column full-width q-pr-md">
						<div class="row items-center">
							<h1 class="text-h4 q-pl-xl text-green-7">
								Insumos
							</h1>
							<q-space />
							<q-btn
								size="md"
								@click="controlFormulario(null, true)"
								label="Agregar" />
						</div>
					</section>
				</template>
				<template v-slot:body-cell-opciones="props">
					<q-td :props="props">
						<q-btn @click="controlFormulario(props.row, true)">
							✏️
						</q-btn>
					</q-td>
				</template>
			</q-table>
		</div>
		<q-dialog v-model="mostrarFormularioInsumo">
			<q-card>
				<q-form
					@submit="mostrarBotonEditar ? editar() : registrar()"
					class="q-gutter-sm">
					<p class="text-h5 text-center q-pb-md text-green">
						{{ datos ? "Editar" : "Agregar" }} Insumo
					</p>
					<q-select
						standout="bg-green text-white"
						:options="opcionesFinca"
						label="Finca"
						v-model="fincaInsumo" />
					<q-input
						standout="bg-green text-white"
						type="text"
						label="Nombre"
						v-model="nombreInsumo" />
					<q-input
						standout="bg-green text-white"
						type="text"
						label="Registro Ica"
						v-model="registroIcaInsumo" />
					<q-input
						standout="bg-green text-white"
						type="text"
						label="Registro Invima"
						v-model="registroInvimaInsumo" />
					<q-input
						standout="bg-green text-white"
						type="text"
						label="Relación NPK"
						v-model="relacionNPKInsumo" />
					<q-input
						standout="bg-green text-white"
						type="text"
						label="Cantidad"
						v-model="cantidadInsumo" />
					<q-select
						standout="bg-green text-white"
						:options="unidad"
						label="Unidad"
						v-model="unidadInsumo" />
					<q-input
						standout="bg-green text-white"
						type="text"
						label="Observaciones"
						v-model="observacionesInsumo" />
					<div class="row justify-end" style="gap: 10px">
						<q-btn
							unelevated
							v-if="mostrarBotonEditar"
							label="Editar"
							type="submit"
							color="positive" />
						<q-btn
							unelevated
							v-else
							label="Registrar"
							type="submit"
							color="positive" />
						<q-btn
							@click="controlFormulario(null, false)"
							flat
							class="bg-red text-white"
							label="Cerrar"
							type="button" />
					</div>
				</q-form>
			</q-card>
		</q-dialog>
	</div>
</template>

<style scoped>
.q-card {
	background-color: rgb(255, 255, 255);
	padding: 40px 30px 40px 30px;
	border-radius: 1pc;
	width: 30rem;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	border: 0;
}

.q-form .q-input,
.q-form .q-select {
	margin-bottom: 15px;
}
</style>
