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
const fecha1 = ref("");
const fecha2 = ref("");
const empleadoC = ref("");
const listarCultivo = ref("");

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
		const procesosPromise = selectedOption.value === "Listar Procesos Activos" ? useProceso.getProcesosActivos() : selectedOption.value === "Listar Procesos Inactivos" ? useProceso.getProcesosInactivos() : useProceso.getProcesos();

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
	empleados.value = r.data.empleados;
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
		.map((empleado) => ({
			label: empleado.nombre,
			id: empleado._id,
		}));
});

const selectedOption = ref("Listar Procesos");
const options = [
	{ label: "Listar Procesos", value: "Listar Procesos" },
	{
		label: "Listar Procesos por Fechas",
		value: "Listar Procesos por Fechas",
	},
	{
		label: "Listar Procesos por Empleado",
		value: "Listar Procesos por Empleado",
	},
	{
		label: "Listar Procesos por Cultivo",
		value: "Listar Procesos por Cultivo",
	},
	{ label: "Listar Procesos Activos", value: "Listar Procesos Activos" },
	{ label: "Listar Procesos Inactivos", value: "Listar Procesos Inactivos" },
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

const filtrarFilas = computed(() => {
	if (loadingg.value) {
		return []; // Retorna una lista vacía mientras se está cargando
	}

	const empleadoInput = empleadoC.value ? empleadoC.value.toString() : "";
	const cultivoInput = listarCultivo.value ? listarCultivo.value : "";

	if (selectedOption.value === "Listar Procesos por Fechas") {
		if (fecha1.value && fecha2.value) {
			const normalizeDate = (date) => new Date(date).toISOString().slice(0, 10);
			const startDate = normalizeDate(fecha1.value);
			const endDate = normalizeDate(fecha2.value);

			const filteredByDate = rows.value.filter((proceso) => {
				const procesoDate = normalizeDate(proceso.fecha_inicio);
				return procesoDate >= startDate && procesoDate <= endDate;
			});

			if (filteredByDate.length === 0) {
				// Notificar que no hay datos disponibles
				console.log("No data available for the selected date range.");
				// Opcionalmente, puedes mostrar una notificación en la interfaz de usuario aquí
				return rows.value; // Retorna todos los procesos si no hay datos en el rango de fechas
			}

			return filteredByDate;
		}
		return rows.value; // Retorna todos los procesos si no se proporcionan fechas válidas
	}

	// Filtrado por Empleado o Cultivo
	return rows.value.filter((proceso) => {
		switch (selectedOption.value) {
			case "Listar Procesos por Empleado":
				return proceso.cultivo_id.nombre.toString().includes(empleadoInput);

			case "Listar Procesos por Cultivo":
				return proceso.empleado_id.nombre.includes(cultivoInput);

			default:
				return true; // No filtra si la opción seleccionada no coincide
		}
	});
});

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
		<div>
			<h3 style="text-align: center; margin: 10px">Procesos</h3>
			<hr style="width: 70%; height: 5px; background-color: green" />
		</div>

		<div class="contSelect" style="margin-left: 5%; text-align: end; margin-right: 5%">
			<q-select background-color="green" class="q-my-md" v-model="selectedOption" outlined dense options-dense emit-value :options="options" />

			<div v-if="selectedOption === 'Listar Procesos por Fechas'" style="display: flex; flex-direction: row; text-align: center; flex-wrap: wrap; position: absolute; top: 147px; left: 270px">
				<label for="fecha1" style="height: 100%; line-height: 88px; margin-left: 80px">De:</label>
				<q-input v-model="fecha1" class="q-my-md" type="date" name="search" id="fecha1" placeholder="Ingrese la fecha" />

				<label for="fecha2" style="height: 100%; line-height: 88px; margin-left: 80px">A:</label>
				<q-input v-model="fecha2" class="q-my-md" type="date" name="search" id="fecha2" placeholder="Ingrese la fecha" />
			</div>

			<input v-if="selectedOption === 'Listar Procesos por Empleado'" v-model="empleadoC" class="q-my-md" type="text" name="search" id="empleadoC" placeholder="Ingrese el empleado" />
			<input v-if="selectedOption === 'Listar Procesos por Cultivo'" v-model="listarCultivo" class="q-my-md" type="text" name="search" placeholder="Nombre del cultivo" />
		</div>

		<div>
			<div style="margin-left: 5%; text-align: end; margin-right: 5%" class="q-mb-md">
				<q-btn label="Agregar Proceso" @click="mostrarFormulario = true">
					<q-tooltip> Agregar Proceso </q-tooltip>
				</q-btn>
			</div>

			<!-- Diálogo para agregar o editar proceso -->
			<q-dialog v-model="mostrarFormulario"  v-bind="!mostrarFormulario && limpiarCampos()">
				<q-card>
					<q-card-section>
						<div class="text-h5" style="padding: 10px 0 0 25px">
							{{ esEdicion ? "Editar Proceso" : "Agregar Proceso" }}
						</div>
					</q-card-section>

					<q-card-section>
						<div class="q-pa-md">
							<q-form @submit.prevent="esEdicion ? editarProceso() : agregarProceso()">
								<!-- Campos del formulario de agregar o editar proceso -->
								<q-select v-model="cultivo_id" filled outlined :options="cultivosOptions" label="Cultivo" class="q-mb-md" style="min-width: 100%" required>
									<template v-slot:no-option>
										<q-item>
											<q-item-section>No results</q-item-section>
										</q-item>
									</template>
								</q-select>
								<q-select v-model="empleado_id" label="Empleado" filled outlined :options="empleadoOptions" class="q-mb-md" style="max-width: 100%">
									<template v-slot:no-option>
										<q-item>
											<q-item-section>No results</q-item-section>
										</q-item>
									</template>
								</q-select>
								<q-input v-model.trim="tipo" label="Tipo" filled outlined class="q-mb-md" required />
								<q-input v-model.trim="descripcion" label="Descripción" filled outlined class="q-mb-md" required />
								<q-input v-model="fecha_inicio" label="Fecha inicial" filled type="date" outlined class="q-mb-md" required />
								<q-input v-model="fecha_final" label="Fecha final" filled type="date" outlined class="q-mb-md" required />

								<!-- Botones de acción -->
								<div class="q-mt-md">
									<q-btn @click="mostrarFormulario = false" label="Cancelar" color="negative" class="q-mr-sm">
										<q-tooltip>Cancelar</q-tooltip>
									</q-btn>
									<q-btn :loading="useProceso.loading" :disable="useProceso.loading" type="submit" :label="esEdicion ? 'Guardar Cambios' : 'Guardar Proceso'" color="primary">
										<q-tooltip>{{ esEdicion ? "Guardar cambios" : "Guardar Proceso" }}</q-tooltip>
										<template v-slot:loading>
											<q-spinner color="white" size="1em" />
										</template>
									</q-btn>
								</div>
							</q-form>
						</div>
					</q-card-section>
				</q-card>
			</q-dialog>
		</div>

		<q-table flat bordered title="Procesos" title-class="text-green text-weight-bolder text-h5" :rows="filtrarFilas" :columns="columns" row-key="id" :loading="loadingg">
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

			<!-- Descripción Column -->
			<template v-slot:body-cell-descripcion="props">
				<q-td :props="props" class="relative">
					<div class="truncated-text" @mouseover="checkAndShowTooltip($event, props.row.descripcion, 20)" @mouseleave="hideTooltip">
						{{ truncateText(props.row.descripcion, 20) }}
					</div>
				</q-td>
			</template>

			<template v-slot:loading>
				<q-inner-loading :showing="loadingg" label="Por favor espere..." label-class="text-teal" label-style="font-size: 1.1em"> </q-inner-loading>
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
