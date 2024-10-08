<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { notifyErrorRequest } from "../routes/routes.js";
// import { useStoreCultivos } from "../stores/cultivos.js";
// import { useStoreEmpleados } from "../stores/empleados.js";
import { useStoreProcesos } from "../stores/procesos.js";
import { format } from "date-fns";

// Loading
const visible = ref(true);
const loadingg = ref(true);

// Variables para mostrar formularios
const mostrarFormulario = ref(false);
const esEdicion = ref(false);

// Llamado de modelos
// const useCultivo = useStoreCultivos();
// const useEmpleado = useStoreEmpleados();
const useProceso = useStoreProcesos();

// variables para mostrar el div que aparece al pasarle el mouse a la observación
const tooltipText = ref("");
const tooltipVisible = ref(false);
const tooltipPosition = ref({ top: 0, left: 0 });

// Variables del input para peticiones get
const fecha = ref("");

// Arrays de modelos
const cultivos = ref([]);
const empleados = ref([]);

// Variables de los inputs de agregar y editar
const idProcesoSeleccionada = ref("");
const cultivo_id = ref("");
const tipo = ref("");
const descripcion = ref("");
const empleado_id = ref("");
const fecha_inicio = ref("");
const fecha_final = ref("");

async function actualizarListadoProcesos() {
	loadingg.value = true;
	try {
		const procesosPromise = selectedOption.value === "Tipo" ? useProceso.getProcesosTipo() : selectedOption.value === "Fechas" ? useProceso.getProcesosFechas() : selectedOption.value === "Inactivos" ? useProceso.getProcesosInactivos() : selectedOption.value === "Activos" ? useProceso.getProcesosActivos() : useProceso.getProcesos();

		rows.value = (await procesosPromise).data.procesos;
		console.log("Procesos", rows.value);
	} finally {
		loadingg.value = false;
		visible.value = false;
	}
}

async function listarCultivos() {
	const r = await useProceso.getCultivos();
	cultivos.value = r.data.cultivos;
	// console.log("cultivos", cultivos.value);
}

async function listarEmpleados() {
	const r = await useProceso.getEmpleados();
	empleados.value = r.data.admins;
	// console.log("empleados", r.data.empleados);
}

const cultivosOptions = computed(() => {
	return cultivos.value
		.filter((cultivo) => cultivo.estado != 0)
		.map((cultivo) => ({
			label: cultivo.nombre,
			id: cultivo._id,
		}));
});

const empleadoOptions = computed(() => {
	return empleados.value
		.filter((empleado) => empleado.estado != 0)
		.filter(({ rol }) => rol == "Empleado")
		.map((empleado) => ({
			label: empleado.nombre,
			id: empleado._id,
		}));
});

const selectedOption = ref("Todos");
const options = [
	{ label: "Todos", value: "Todos" },
	{ label: "Activos", value: "Activos" },
	{ label: "Inactivos", value: "Inactivos" },
	{ label: "Fechas", value: "Fechas" },
	{ label: "Tipo", value: "Tipo" },
];

let rows = ref([]);
const columns = ref([
	{
		name: "cultivo_id",
		label: "Cultivo",
		field: (row) => (row.cultivo_id ? row.cultivo_id.nombre : ""),
		align: "center",
	},
	{
		name: "empleado_id",
		label: "Empleado",
		field: (row) => (row.empleado_id ? row.empleado_id.nombre : ""),
		align: "center",
	},
	{
		name: "tipo",
		label: "Tipo",
		field: "tipo",
		align: "center",
	},
	{
		name: "descripcion",
		label: "Descripción",
		field: "descripcion",
		align: "center",
	},
	{
		name: "fecha_inicio",
		label: "Fecha inicial",
		field: (row) => {
			const fecha = new Date(row.fecha_inicio);
			fecha.setDate(fecha.getDate() + 1);
			const fechaFormateada = format(fecha, "dd/MM/yyyy");
			return fechaFormateada;
		},
		align: "center",
	},
	{
		name: "fecha_final",
		label: "Fecha final",
		field: (row) => {
			const fecha = new Date(row.fecha_final);
			fecha.setDate(fecha.getDate() + 1);
			const fechaFormateada = format(fecha, "dd/MM/yyyy");
			return fechaFormateada;
		},
		align: "center",
	},
	{ name: "estado", label: "Estado", field: "estado", align: "center" },
	{ name: "opciones", label: "Opciones", field: "opciones", align: "center" },
]);

async function editarEstado(props) {
	if (props.estado == 1) {
		await useProceso.putProcesoInactivar(props._id);
	} else {
		await useProceso.putProcesoActivar(props._id);
	}
	actualizarListadoProcesos();
}

const limpiarCampos = () => {
	cultivo_id.value = "";
	empleado_id.value = "";
	tipo.value = "";
	descripcion.value = "";
	fecha_inicio.value = "";
	fecha_final.value = "";
	esEdicion.value = false;
};

async function validarDatosProceso(proceso) {
	const { cultivo_id, empleado_id } = proceso;

	if (cultivo_id === "") {
		notifyErrorRequest(`El Cultivo es requerido.`);
		return false;
	}
	if (empleado_id === undefined) {
		notifyErrorRequest(`El Empleado es requerido.`);
		return false;
	}

	// Si no hay errores, retornar true
	return true;
}

const agregarProceso = async () => {
	const nuevoProceso = {
		cultivo_id: cultivo_id.value.id,
		empleado_id: empleado_id.value.id,
		tipo: tipo.value,
		descripcion: descripcion.value,
		fecha_inicio: fecha_inicio.value,
		fecha_final: fecha_final.value,
	};

	if (await validarDatosProceso(nuevoProceso)) {
		const r = await useProceso.postProceso(nuevoProceso);
		if (r.status == 200) {
			mostrarFormulario.value = false;
			actualizarListadoProcesos();
			console.log("Proceso agregado exitosamente", nuevoProceso);
		}
	}
};

const cargarProcesoParaEdicion = (proceso) => {
	idProcesoSeleccionada.value = proceso._id;
	cultivo_id.value = proceso.cultivo_id.nombre;
	empleado_id.value = proceso.empleado_id.nombre;
	tipo.value = proceso.tipo;
	descripcion.value = proceso.descripcion;
	fecha_inicio.value = proceso.fecha_inicio.split("T")[0];
	fecha_final.value = proceso.fecha_final.split("T")[0];

	esEdicion.value = true;
	mostrarFormulario.value = true;
	console.log("Datos del proceso del cultivo a editar:", proceso);
};

async function editarProceso() {
	let idCultivo = cultivo_id.value.id;
	let idEmpleado = empleado_id.value.id;

	for (let cultivo of cultivos.value) {
		if (cultivo.nombre === cultivo_id.value) {
			// if (cultivo.estado == 1) {
			idCultivo = cultivo._id;
			break;
			// }
			// else {
			// 	notifyErrorRequest("Cultivo seleccionado inactivo");
			// 	return;
			// }
		}
	}
	for (let empleado of empleados.value) {
		if (empleado.nombre === empleado_id.value) {
			// if (empleado.estado == 1) {
			idEmpleado = empleado._id;
			break;
			// }
			// else {
			// 	notifyErrorRequest("Empleado seleccionado inactivo");
			// 	return;
			// }
		}
	}
	const procesoEditado = {
		_id: idProcesoSeleccionada.value,
		cultivo_id: idCultivo,
		tipo: tipo.value,
		descripcion: descripcion.value,
		empleado_id: idEmpleado,
		fecha_inicio: fecha_inicio.value,
		fecha_final: fecha_final.value,
	};

	if (await validarDatosProceso(procesoEditado)) {
		const r = await useProceso.putProceso(idProcesoSeleccionada.value, procesoEditado);
		if (r.status == 200) {
			mostrarFormulario.value = false;
			actualizarListadoProcesos();
			console.log("Proceso editado exitosamente", procesoEditado);
		}
	}
}

// Funciones auxiliares
function showTooltip(event, text) {
	tooltipText.value = text;
	tooltipVisible.value = true;
	tooltipPosition.value = { top: event.clientY, left: event.clientX };
}
function hideTooltip() {
	tooltipVisible.value = false;
}
function truncateText(text, maxLength) {
	if (!text) return "";
	if (text.length <= maxLength) return text;
	return text.substring(0, maxLength) + "...";
}
function checkAndShowTooltip(event, text, maxLength) {
	if (text.length > maxLength) {
		showTooltip(event, text);
	}
}

const isLoading = computed(() => visible.value);

onMounted(() => {
	actualizarListadoProcesos();
	listarCultivos();
	listarEmpleados();
});

watch(selectedOption, () => {
	actualizarListadoProcesos();
	isLoading;
	loadingg;
});
</script>

<template>
	<div class="q-pa-md" v-if="!visible">
		<q-dialog v-model="mostrarFormulario" v-bind="!mostrarFormulario && limpiarCampos()">
			<q-card style="width: 30rem">
				<q-card-section style="padding-bottom: 0">
					<div class="text-h5 text-center text-green q-pt-lg">{{ esEdicion ? "Editar" : "Agregar" }} Proceso</div>
				</q-card-section>

				<q-card-section>
					<q-form @submit.prevent="esEdicion ? editarProceso() : agregarProceso()" class="q-pa-md">
						<q-select v-model="cultivo_id" standout="bg-green text-while" filled outlined :options="cultivosOptions" label="Cultivo" class="q-mb-md" style="min-width: 100%" required>
							<template v-slot:no-option>
								<q-item>
									<q-item-section>No results</q-item-section>
								</q-item>
							</template>
						</q-select>
						<q-select v-model="empleado_id" standout="bg-green text-while" label="Empleado" filled outlined :options="empleadoOptions" class="q-mb-md" style="max-width: 100%">
							<template v-slot:no-option>
								<q-item>
									<q-item-section>No results</q-item-section>
								</q-item>
							</template>
						</q-select>
						<q-input v-model.trim="tipo" standout="bg-green text-while" label="Tipo" filled outlined class="q-mb-md" required />
						<q-input v-model.trim="descripcion" standout="bg-green text-while" label="Descripción" filled outlined class="q-mb-md" required />
						<q-input v-model="fecha_inicio" standout="bg-green text-while" label="Fecha inicial" filled type="date" outlined class="q-mb-md" required />
						<q-input v-model="fecha_final" standout="bg-green text-while" label="Fecha final" filled type="date" outlined class="q-mb-md" required />

						<div class="q-mt-md row justify-end">
							<q-btn :loading="useProceso.loading" :disable="useProceso.loading" type="submit" color="positive" class="q-mr-sm">
								Registrar
								<q-tooltip> Registrar </q-tooltip>
								<template v-slot:loading>
									<q-spinner color="white" size="1em" />
								</template>
							</q-btn>
							<q-btn @click="mostrarFormulario = false" class="bg-red text-white">
								Cerrar
								<q-tooltip> Cerrar </q-tooltip>
							</q-btn>
						</div>
					</q-form>
				</q-card-section>
			</q-card>
		</q-dialog>

		<q-table flat bordered :rows="rows" :columns="columns" row-key="id" :loading="loadingg">
			<template v-slot:top>
				<h4 class="text-green-7 q-pl-xl text-h4" style="position: absolute; top: -10px">Procesos</h4>
				<div class="q-pa-lg q-gutter-lg q-ml-auto" style="display: flex; flex-direction: column; gap: 10px; align-items: flex-end">
					<q-btn label="Agregar" @click="mostrarFormulario = true">
						<q-tooltip>Agregar Proceso</q-tooltip>
					</q-btn>

					<div class="contSelect">
						<q-input standout v-if="selectedOption === 'Fechas'" label="Fecha" v-model="fecha" type="date" name="search" id="fecha" />
						<q-input standout v-if="selectedOption === 'Tipo'" label="Tipo" v-model="tipo" name="search" id="q-select" />
						<q-space />

						<q-btn v-if="selectedOption == 'Fechas' || selectedOption == 'Tipo'" @click="actualizarListadoProcesos()" style="border: none"> Buscar </q-btn>
						<q-space />
						<q-select standout="bg-green text-while" background-color="green" id="q-select" v-model="selectedOption" label="Filtro por" options-dense :options="options" emit-value style="width: 200px" />
					</div>
				</div>
			</template>

			<template v-slot:body-cell-opciones="props">
				<q-td :props="props">
					<q-btn @click="cargarProcesoParaEdicion(props.row)">
						✏️
						<q-tooltip> Editar Proceso </q-tooltip>
					</q-btn>
					<q-btn v-if="props.row.estado == 1" @click="editarEstado(props.row)">
						❌
						<q-tooltip> Inactivar Proceso </q-tooltip>
					</q-btn>
					<q-btn v-else @click="editarEstado(props.row)">
						✅
						<q-tooltip> Activar Proceso </q-tooltip>
					</q-btn>
				</q-td>
			</template>

			<template v-slot:body-cell-estado="props">
				<q-td :props="props">
					<p
						:style="{
							color: props.row.estado === 1 ? 'green' : 'red',
							margin: 0,
						}">
						{{ props.row.estado === 1 ? "Activo" : "Inactivo" }}
					</p>
				</q-td>
			</template>

			<template v-slot:body-cell-descripcion="props">
				<q-td :props="props" class="relative">
					<div class="truncated-text" @mouseover="checkAndShowTooltip($event, props.row.descripcion, 20)" @mouseleave="hideTooltip">
						{{ truncateText(props.row.descripcion, 20) }}
					</div>
				</q-td>
			</template>

			<template v-slot:loading>
				<q-inner-loading :showing="loadingg" label="Por favor espere..." label-class="text-teal" label-style="font-size: 1.1em" />
			</template>
		</q-table>
	</div>
	<q-inner-loading :showing="isLoading" label="Por favor espere..." label-class="text-teal" label-style="font-size: 1.1em" />
</template>

<style scoped>
.contSelect {
	display: flex;
	flex-direction: row;
	gap: 20px;
}

.q-select {
	max-width: 200px;
}

.q-my-md {
	max-width: 500px;
	padding-left: 10px;
}
</style>
