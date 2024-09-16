<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { notifyErrorRequest } from "../routes/routes.js";
import { useStoreRiego } from "../stores/riego.js";
// import { useStoreCultivos } from "../stores/cultivos.js";
// import { useStoreEmpleados } from "../stores/empleados.js";
import { format } from "date-fns";

// Para colocar puntos decimales a los nuemros
function formatoNumerico(numero) {
	return typeof numero === "number" ? numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : undefined;
}

// Loading
const visible = ref(true);
const loadingg = ref(true);

const listarCodigo = ref("");

const listarFechasOne = ref("");
const listarFechasTwo = ref("");

// Variables para mostrar formularios
const mostrarFormulario = ref(false);
const esEdicion = ref(false);

// Llamado de modelos
const useRiego = useStoreRiego();
// const useCultivo = useStoreCultivos();
// const useEmpleado = useStoreEmpleados();

// Variables de los inputs de agregar y editar
const idRiegoSeleccionada = ref("");
const cultivo_id = ref("");
const empleado_id = ref("");
const fecha = ref("");
const dias_transplante = ref("");
const estado_fenologico = ref("");
const hora_inicio = ref("");
const hora_fin = ref("");
const dosis = ref("");
const cantidad_agua = ref("");

const selectedOption = ref("Listar Riegos");
const options = [
	{ label: "Listar Riegos", value: "Listar Riegos" },
	{ label: "Listar Riegos por Cultivo", value: "Listar Riegos por Cultivo" },
	{ label: "Listar Riegos por fechas", value: "Listar Riegos por fechas" },
	{ label: "Listar Riegos Activos", value: "Listar Riegos Activos" },
	{ label: "Listar Riegos Inactivos", value: "Listar Riegos Inactivos" },
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
		name: "fecha",
		label: "Fecha",
		align: "center",
		field: (row) => {
			// Obtener la fecha en formato de objeto Date
			const fecha = new Date(row.fecha);
			fecha.setDate(fecha.getDate() + 1);
			// Formatear la fecha sumada como "día/mes/año" usando date-fns
			const fechaFormateada = format(fecha, "dd/MM/yyyy");
			return fechaFormateada;
		},
	},
	{
		name: "dias_transplante",
		label: "Dias_transplante",
		field: (row) => formatoNumerico(row.dias_transplante),
		align: "center",
	},
	{
		name: "estado_fenologico",
		label: "Estado_fenologico",
		field: "estado_fenologico",
		align: "center",
	},
	{
		name: "hora_inicio",
		label: "Hora_inicio",
		field: "hora_inicio",
		align: "center",
	},
	{
		name: "hora_fin",
		label: "Hora_fin",
		field: "hora_fin",
		align: "center",
	},
	{
		name: "dosis",
		label: "Dosis",
		field: (row) => formatoNumerico(row.dosis),
		align: "center",
	},
	{
		name: "cantidad_agua",
		label: "Cantidad de Agua",
		field: (row) => formatoNumerico(row.cantidad_agua),
		align: "center",
	},
	{
		name: "estado",
		label: "Estado",
		field: "estado",
		align: "center",
	},
	{ name: "opciones", label: "Opciones", field: "opciones", align: "center" },
]);

const cultivos = ref([]);
const empleados = ref([]);

async function listarCultivos() {
	const r = await useRiego.getCultivos();
	cultivos.value = r.data.cultivos;
	console.log("Cultivos:", cultivos.value);
}

async function listarEmpleados() {
	const r = await useRiego.getEmpleados();
	empleados.value = r.data.empleados;
	console.log("empleados:", empleados.value);
}

const cultivoOptions = computed(() => {
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

const filtrarFilas = computed(() => {
	if (loadingg.value) {
		return []; // Retorna una lista vacía mientras se está cargando
	}

	let riegosFiltradas = rows.value;

	if (selectedOption.value === "Listar Riegos por Cultivo" && listarCodigo.value) {
		riegosFiltradas = riegosFiltradas.filter((row) => row.cultivo_id.nombre.toLowerCase().includes(listarCodigo.value.toLowerCase()));
		// notifySuccessRequest('Riegos listadas por cultivo exitosamente.');
	}

	// Filtrar por rango de fechas
	if (listarFechasOne.value && listarFechasTwo.value) {
		const normalizeDate = (date) => {
			const d = new Date(date);
			return d.toISOString().split("T")[0]; // Formato YYYY-MM-DD
		};

		const startDate = normalizeDate(listarFechasOne.value);
		const endDate = normalizeDate(listarFechasTwo.value);

		riegosFiltradas = riegosFiltradas.filter((riego) => {
			const riegoDate = normalizeDate(riego.fecha); // Asegúrate de usar el campo correcto aquí
			return riegoDate >= startDate && riegoDate <= endDate;
		});
		// notifySuccessRequest('Riegos listados por rango de fechas exitosamente.');
	}

	return riegosFiltradas;
});

async function actualizarListadoRiegos() {
	loadingg.value = true;
	try {
		const riegoPromise = selectedOption.value === "Listar Riegos Activos" ? useRiego.getRiegoActivos() : selectedOption.value === "Listar Riegos Inactivos" ? useRiego.getRiegoInactivos() : useRiego.getRiego();

		rows.value = (await riegoPromise).data.riegos;
		console.log("Riegos", rows.value);
	} finally {
		loadingg.value = false;
		visible.value = false;
	}
}

async function editarEstado(props) {
	if (props.estado == 1) {
		await useRiego.putRiegoInactivar(props._id);
	} else {
		await useRiego.putRiegoActivar(props._id);
	}
	actualizarListadoRiegos();
}

function limpiarCampos() {
	idRiegoSeleccionada.value = "";
	cultivo_id.value = "";
	empleado_id.value = "";
	fecha.value = "";
	dias_transplante.value = "";
	estado_fenologico.value = "";
	hora_inicio.value = "";
	hora_fin.value = "";
	dosis.value = "";
	cantidad_agua.value = "";
	esEdicion.value = false;
}

async function validarDatosRiego(riego) {
	const { cultivo_id, empleado_id } = riego;

	if (cultivo_id == undefined) {
		notifyErrorRequest("El Cultivo es requerido.");
		return false;
	}
	if (empleado_id == undefined) {
		notifyErrorRequest("El Empleado es requerido.");
		return false;
	}

	return true;
}

async function agregarRiego() {
	const nuevoRiego = {
		cultivo_id: cultivo_id.value.id,
		empleado_id: empleado_id.value.id,
		fecha: fecha.value,
		dias_transplante: dias_transplante.value,
		estado_fenologico: estado_fenologico.value,
		hora_inicio: hora_inicio.value,
		hora_fin: hora_fin.value,
		dosis: dosis.value,
		cantidad_agua: cantidad_agua.value,
	};

	if (await validarDatosRiego(nuevoRiego)) {
		const r = await useRiego.postRiego(nuevoRiego);
		if (r.status == 200) {
			mostrarFormulario.value = false;
			actualizarListadoRiegos();
			console.log("Riego agregado exitosamente", nuevoRiego);
		}
	}
}

function cargarRiegoParaEdicion(riego) {
	idRiegoSeleccionada.value = riego._id;
	cultivo_id.value = riego.cultivo_id.nombre;
	empleado_id.value = riego.empleado_id.nombre;
	fecha.value = riego.fecha.split("T")[0];
	dias_transplante.value = riego.dias_transplante;
	estado_fenologico.value = riego.estado_fenologico;
	hora_inicio.value = riego.hora_inicio;
	hora_fin.value = riego.hora_fin;
	dosis.value = riego.dosis;
	cantidad_agua.value = riego.cantidad_agua;

	esEdicion.value = true;
	mostrarFormulario.value = true;
	console.log("Datos de la Riego a editar", riego);
}

async function editarRiego() {
	let idCultivo_id = cultivo_id.value.id;
	let idEmpleado_id = empleado_id.value.id;

	for (let cult of cultivos.value) {
		if (cult.nombre === cultivo_id.value) {
			// if (cult.estado == 1) {
			idCultivo_id = cult._id;
			break;
			// } else {
			//   notifyErrorRequest("Cultivo seleccionado inactivo")
			//   return;
			// }
		}
	}
	for (let emple of empleados.value) {
		if (emple.nombre === empleado_id.value) {
			// if (emple.estado == 1) {
			idEmpleado_id = emple._id;
			break;
			// } else {
			//   notifyErrorRequest("Cultivo seleccionado inactivo")
			//   return;
			// }
		}
	}
	const riegoEditada = {
		_id: idRiegoSeleccionada.value,
		cultivo_id: idCultivo_id,
		empleado_id: idEmpleado_id,
		fecha: fecha.value,
		dias_transplante: dias_transplante.value,
		estado_fenologico: estado_fenologico.value,
		hora_inicio: hora_inicio.value,
		hora_fin: hora_fin.value,
		dosis: dosis.value,
		cantidad_agua: cantidad_agua.value,
	};
	if (await validarDatosRiego(riegoEditada)) {
		const r = await useRiego.putRiego(idRiegoSeleccionada.value, riegoEditada);
		if (r.status == 200) {
			mostrarFormulario.value = false;
			actualizarListadoRiegos();
			console.log("Riego editado exitosamente", riegoEditada);
		}
	}
}

const isLoading = computed(() => visible.value);

onMounted(() => {
	actualizarListadoRiegos();
	listarCultivos();
	listarEmpleados();
});

watch(selectedOption, () => {
	actualizarListadoRiegos();
	isLoading;
	loadingg;
});
</script>

<template>
	<div class="q-pa-md" v-if="!visible">
		<div>
			<h3 style="text-align: center; margin: 10px">Riegos</h3>
			<hr style="width: 70%; height: 5px; background-color: green" />
		</div>

		<div class="contSelect" style="margin-left: 5%; text-align: end; margin-right: 5%">
			<q-select background-color="green" class="q-my-md" id="q-select" v-model="selectedOption" outlined dense options-dense emit-value :options="options" />

			<input v-if="selectedOption === 'Listar Riegos por Cultivo'" v-model="listarCodigo" class="q-my-md" type="text" name="search" id="search" placeholder="Cultivo" />

			<div v-if="selectedOption === 'Listar Riegos por fechas'" style="display: flex; flex-direction: row; text-align: center; flex-wrap: wrap; position: absolute; top: 150px; left: 240px">
				<label for="listarFechasOne" style="height: 100%; line-height: 88px; margin-left: 40px">De:</label>
				<q-input v-model="listarFechasOne" class="q-my-md" type="date" name="search" id="listarFechasOne" placeholder="Ingrese la fecha" />

				<label for="listarFechasTwo" style="height: 100%; line-height: 88px; margin-left: 40px">A:</label>
				<q-input v-model="listarFechasTwo" class="q-my-md" type="date" name="search" id="listarFechasTwo" placeholder="Ingrese la fecha" />
			</div>
		</div>

		<div>
			<div style="margin-left: 5%; text-align: end; margin-right: 5%" class="q-mb-md">
				<q-btn label="Agregar Riego" @click="mostrarFormulario = true">
					<!-- <q-btn label="Editar Riego" @click="mostrarFormularioEditarRiego = true" /> -->
					<q-tooltip> Agregar Riego </q-tooltip>
				</q-btn>
			</div>

			<!-- Diálogo para agregar o editar riego -->
			<q-dialog v-model="mostrarFormulario"  v-bind="!mostrarFormulario && limpiarCampos()">
				<q-card>
					<q-card-section>
						<div class="text-h6">
							{{ esEdicion ? "Editar Riego" : "Agregar Riego" }}
						</div>
					</q-card-section>
					<q-card-section>
						<q-form @submit.prevent="esEdicion ? editarRiego() : agregarRiego()">
							<!-- Campos del formulario de agregar o editar riego -->
							<q-select v-model="cultivo_id" label="Cultivo" filled outlined :options="cultivoOptions" class="q-mb-md" required>
								<template v-slot:no-option>
									<q-item>
										<q-item-section>No results</q-item-section>
									</q-item>
								</template>
							</q-select>
							<q-select v-model="empleado_id" label="Empleado" filled outlined :options="empleadoOptions" class="q-mb-md" required>
								<template v-slot:no-option>
									<q-item>
										<q-item-section>No results</q-item-section>
									</q-item>
								</template>
							</q-select>
							<q-input v-model="fecha" label="Fecha" type="date" filled class="q-mb-md" required />
							<q-input v-model="dias_transplante" label="Días_transplante" type="number" filled class="q-mb-md" required min="0" outlined />
							<q-input v-model.trim="estado_fenologico" label="Estado_fenológico (Inicial, Floración o Cosecha)" filled class="q-mb-md" required />
							<q-input v-model.trim="hora_inicio" label="Hora_inicio" filled class="q-mb-md" required />
							<q-input v-model.trim="hora_fin" label="Hora_fin" filled class="q-mb-md" required />
							<q-input v-model="dosis" label="Dosis" type="number" filled outlined class="q-mb-md" min="0" required />
							<q-input v-model="cantidad_agua" label="Cantidad de Agua" type="number" filled outlined class="q-mb-md" min="0" required />

							<!-- Botones de acción -->
							<div class="q-mt-md">
								<q-btn @click="mostrarFormulario = false" label="Cancelar" color="negative" class="q-ma-sm">
									<q-tooltip>Cancelar</q-tooltip>
								</q-btn>
								<q-btn :loading="useRiego.loading" :disable="useRiego.loading" type="submit" :label="esEdicion ? 'Guardar Cambios' : 'Guardar Riego'" color="primary" class="q-ma-sm">
									<q-tooltip>{{ esEdicion ? "Guardar Cambios" : "Guardar Riego" }}</q-tooltip>
									<template v-slot:loading>
										<q-spinner color="white" size="1em" />
									</template>
								</q-btn>
							</div>
						</q-form>
					</q-card-section>
				</q-card>
			</q-dialog>
		</div>

		<q-table flat bordered title="Riegos" title-class="text-green text-weight-bolder text-h5" :rows="filtrarFilas" :columns="columns" row-key="id" :loading="loadingg">
			<template v-slot:body-cell-opciones="props">
				<q-td :props="props">
					<q-btn @click="cargarRiegoParaEdicion(props.row)">
						✏️
						<q-tooltip> Editar Riego </q-tooltip>
					</q-btn>
					<q-btn v-if="props.row.estado == 1" @click="editarEstado(props.row)">
						❌
						<q-tooltip> Inactivar Cultivo </q-tooltip>
					</q-btn>
					<q-btn v-else @click="editarEstado(props.row)">
						✅
						<q-tooltip> Activar Cultivo </q-tooltip>
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

.q-my-md {
	max-width: 200px;
	padding-left: 10px;
}
</style>
