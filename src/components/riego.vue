<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { notifyErrorRequest } from "../routes/routes.js";
import { useStoreRiego } from "../stores/riego.js";
// import { useStoreCultivos } from "../stores/cultivos.js";
// import { useStoreEmpleados } from "../stores/empleados.js";
import { format } from "date-fns";

// Para colocar puntos decimales a los números
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

const selectedOption = ref("Todos");
const options = [
	{ label: "Todos", value: "Todos" },
	{ label: "Listar Riegos por Cultivo", value: "Listar Riegos por Cultivo" },
	{ label: "Listar Riegos por fechas", value: "Listar Riegos por fechas" },
	{ label: "Activos", value: "Activos" },
	{ label: "Inactivos", value: "Inactivos" },
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
	empleados.value = r.data.admins;
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
		.filter(({ rol }) => rol == "Empleado")
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
		const riegoPromise = selectedOption.value === "Activos" ? useRiego.getRiegoActivos() : selectedOption.value === "Inactivos" ? useRiego.getRiegoInactivos() : useRiego.getRiego();

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
		<q-dialog v-model="mostrarFormulario" v-bind="!mostrarFormulario && limpiarCampos()">
			<q-card style="width: 30rem">
				<q-card-section style="padding-bottom: 0">
					<div class="text-h5 text-center text-green q-pt-lg">{{ esEdicion ? "Editar" : "Agregar" }} Riego</div>
				</q-card-section>

				<q-card-section>
					<q-form @submit.prevent="esEdicion ? editarRiego() : agregarRiego()" class="q-pa-md">
						<q-select v-model="cultivo_id" standout="bg-green text-while" label="Cultivo" filled outlined :options="cultivoOptions" class="q-mb-md" required>
							<template v-slot:no-option>
								<q-item>
									<q-item-section>No results</q-item-section>
								</q-item>
							</template>
						</q-select>
						<q-select v-model="empleado_id" standout="bg-green text-while" label="Empleado" filled outlined :options="empleadoOptions" class="q-mb-md" required>
							<template v-slot:no-option>
								<q-item>
									<q-item-section>No results</q-item-section>
								</q-item>
							</template>
						</q-select>
						<q-input v-model="fecha" standout="bg-green text-while" label="Fecha" type="date" filled class="q-mb-md" required />
						<q-input v-model="dias_transplante" standout="bg-green text-while" label="Días_transplante" type="number" filled class="q-mb-md" required min="0" outlined />
						<q-select v-model="estado_fenologico" standout="bg-green text-while" label="Estado_fenológico" filled outlined :options="['Inicial', 'Floracion', 'Cosecha']" class="q-mb-md" required>
							<template v-slot:no-option>
								<q-item>
									<q-item-section>No results</q-item-section>
								</q-item>
							</template>
						</q-select>
						<q-input v-model.trim="hora_inicio" standout="bg-green text-while" label="Hora_inicio" type="time" filled class="q-mb-md" required />
						<q-input v-model.trim="hora_fin" standout="bg-green text-while" label="Hora_fin" type="time" filled class="q-mb-md" required />
						<q-input v-model="dosis" standout="bg-green text-while" label="Dosis" type="number" filled outlined class="q-mb-md" min="0" required />
						<q-input v-model="cantidad_agua" standout="bg-green text-while" label="Cantidad de Agua" type="number" filled outlined class="q-mb-md" min="0" required />

						<div class="q-mt-md row justify-end">
							<q-btn :loading="useRiego.loading" :disable="useRiego.loading" type="submit" color="positive" class="q-mr-sm">
								Registrar
								<q-tooltip>Registrar</q-tooltip>
								<template v-slot:loading>
									<q-spinner color="white" size="1em" />
								</template>
							</q-btn>
							<q-btn @click="mostrarFormulario = false" class="bg-red text-white"
								>Cerrar
								<q-tooltip>Cerrar</q-tooltip>
							</q-btn>
						</div>
					</q-form>
				</q-card-section>
			</q-card>
		</q-dialog>

		<q-table flat bordered :rows="filtrarFilas" :columns="columns" row-key="id" :loading="loadingg">
			<template v-slot:top>
				<h4 class="text-green-7 q-pl-xl text-h4" style="position: absolute; top: -10px">Riegos</h4>
				<div class="q-pa-lg q-gutter-lg q-ml-auto" style="display: flex; flex-direction: column; gap: 10px; align-items: flex-end">
					<q-btn label="Agregar" @click="mostrarFormulario = true">
						<q-tooltip>Agregar Riego</q-tooltip>
					</q-btn>
					<q-select standout="bg-green text-while" background-color="green" id="q-select" v-model="selectedOption" label="Filtro por" options-dense :options="options" style="width: 200px" />
				</div>
			</template>

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
				<q-inner-loading :showing="loadingg" label="Por favor espere..." label-class="text-teal" label-style="font-size: 1.1em"/>
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
