<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { notifyErrorRequest } from "../routes/routes.js";
import { useStoreProduccion } from "../stores/produccion.js";
// import { useStoreCultivos } from "../stores/cultivos.js";
import { format } from "date-fns";

function formatoNumerico(numero) {
	return typeof numero === "number" ? numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : undefined;
}

const visible = ref(true);
const loadingg = ref(true);

// variables para mostrar el div que aparece al pasarle el mouse a la descripción
const tooltipText = ref("");
const tooltipVisible = ref(false);
const tooltipPosition = ref({ top: 0, left: 0 });

// Variables para mostrar formularios
const mostrarFormulario = ref(false);
const esEdicion = ref(false);

// const useCultivo = useStoreCultivos();
const useProduccion = useStoreProduccion();

const nombreCultivoProduccion = ref("");
const fecha1 = ref("");
const fecha2 = ref("");

const cultivos = ref([]);

const listarCultivos = async () => {
	const response = await useProduccion.getCultivos();
	cultivos.value = response.data.cultivos;
	// console.log("Cultivos listadas:", cultivos.value);
};

const cultivosOptions = computed(() => {
	return cultivos.value
		.filter((cultivo) => cultivo.estado != 0)
		.map((cultivo) => ({
			label: cultivo.nombre,
			id: cultivo._id,
		}));
});

const idProduccionSeleccionado = ref("");
const cultivo_id = ref("");
const fecha = ref("");
const especie = ref("");
const numeroLote = ref("");
const cantidad = ref("");
const cantidadTrabajadores = ref("");
const observaciones = ref("");
const precioUnitario = ref("");

const selectedOption = ref("Todos");
const options = [
	{ label: "Todos", value: "Todos" },
	{
		label: "Listar Producción por su Cultivo",
		value: "Listar Producción por su Cultivo",
	},
	{
		label: "Activos",
		value: "Activos",
	},
	{
		label: "Inactivos",
		value: "Inactivos",
	},
	{
		label: "Listar Producciones por Fechas",
		value: "Listar Producciones por Fechas",
	},
];

let rows = ref([]);
const columns = ref([
	{
		name: "cultivo_id",
		label: "Cultivo",
		field: (row) => row.cultivo_id.nombre,
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
		name: "numeroLote",
		label: "Numero de Lote",
		field: (row) => formatoNumerico(row.numeroLote),
		align: "center",
	},
	{
		name: "especie",
		label: "Especie",
		field: "especie",
		align: "center",
	},
	{
		name: "cantidad",
		align: "center",
		label: "Dantidad",
		field: (row) => formatoNumerico(row.cantidad),
	},
	{
		name: "cantidadTrabajadores",
		label: "Cantidad de trabajadores",
		field: (row) => formatoNumerico(row.cantidadTrabajadores),
		align: "center",
	},
	{
		name: "observaciones",
		label: "Observaciones",
		field: "observaciones",
		align: "center",
		format: (val) => (val ? val.substring(0, 20) : ""),
	},
	{
		name: "precioUnitario",
		label: "Precio Unitario",
		field: "precioUnitario",
		align: "center",
	},
	{
		name: "estado",
		label: "Estado",
		field: "estado",
		align: "center",
	},
	{
		name: "opciones",
		label: "Opciones",
		field: "opciones",
		align: "center",
	},
]);

async function actualizarListadoProducciones() {
	loadingg.value = true;
	try {
		const produccionesPromise = selectedOption.value === "Activos" ? useProduccion.getProduccionActivas() : selectedOption.value === "Inactivos" ? useProduccion.getProduccionInactivas() : useProduccion.getProduccion();

		rows.value = (await produccionesPromise).data.producciones;
		console.log("Producciones", rows.value);
	} finally {
		loadingg.value = false;
		visible.value = false;
	}
}

const filtrarFilas = computed(() => {
	if (loadingg.value) {
		return []; // Retorna una lista vacía mientras se está cargando
	}

	return rows.value.filter((produccion) => {
		switch (selectedOption.value) {
			case "Listar Producción por su Cultivo":
				return produccion.cultivo_id.nombre.includes(nombreCultivoProduccion.value);

			case "Listar Producciones por Fechas":
				if (fecha1.value && fecha2.value) {
					const normalizeDate = (date) => new Date(date).toISOString().slice(0, 10);
					const startDate = normalizeDate(fecha1.value);
					const endDate = normalizeDate(fecha2.value);

					const produccionDate = normalizeDate(produccion.fecha);
					const isWithinDateRange = produccionDate >= startDate && produccionDate <= endDate;

					if (isWithinDateRange) {
						return true;
					}

					// No data available for the selected date range
					console.log("No data available for the selected date range.");
					return false; // Exclude this production as it does not match the date range
				}
				return rows.value; // Retorna todos los producciones si no se proporcionan fechas válidas

			default:
				return true; // No filtra si la opción seleccionada no coincide
		}
	});
});

const cargarProduccionParaEdicion = (produccion) => {
	idProduccionSeleccionado.value = produccion._id;
	cultivo_id.value = produccion.cultivo_id.nombre;
	fecha.value = produccion.fecha.split("T")[0];
	numeroLote.value = produccion.numeroLote;
	especie.value = produccion.especie;
	cantidad.value = produccion.cantidad;
	cantidadTrabajadores.value = produccion.cantidadTrabajadores;
	observaciones.value = produccion.observaciones;
	precioUnitario.value = produccion.precioUnitario;
	esEdicion.value = true;
	mostrarFormulario.value = true;
	console.log("Datos del produccion a editar:", produccion);
};

async function validarDatosProduccion(produccion) {
	const { cultivo_id } = produccion;

	if (cultivo_id === undefined) {
		notifyErrorRequest("El Cultivo es requerido.");
		return false;
	}

	return true;
}

const agregarProduccion = async () => {
	const produccionData = {
		cultivo_id: cultivo_id.value.id,
		fecha: fecha.value,
		numeroLote: numeroLote.value,
		especie: especie.value,
		cantidad: cantidad.value,
		cantidadTrabajadores: cantidadTrabajadores.value,
		observaciones: observaciones.value,
		precioUnitario: precioUnitario.value,
	};

	console.log("Produccion agregado exitosamente", produccionData);
	if (await validarDatosProduccion(produccionData)) {
		const r = await useProduccion.postProduccion(produccionData);
		if (r.status == 200) {
			mostrarFormulario.value = false;
			actualizarListadoProducciones();
		}
	}
};

const editarProduccion = async () => {
	let cultivo_idSeleccionada = cultivo_id.value.id;

	for (let cultivo of cultivos.value) {
		if (cultivo.nombre == cultivo_id.value) {
			// if (cultivo.estado == 1) {
			cultivo_idSeleccionada = cultivo._id;
			break;
			// }
			// else {
			// 	notifyErrorRequest("Cultivo seleccionado inactivo");
			// 	return;
			// }
		}
	}
	const produccionEditado = {
		cultivo_id: cultivo_idSeleccionada,
		fecha: fecha.value,
		numeroLote: numeroLote.value,
		especie: especie.value,
		cantidad: cantidad.value,
		cantidadTrabajadores: cantidadTrabajadores.value,
		observaciones: observaciones.value,
		precioUnitario: precioUnitario.value,
	};

	if (await validarDatosProduccion(produccionEditado)) {
		const r = await useProduccion.putProduccion(idProduccionSeleccionado.value, produccionEditado);
		if (r.status == 200) {
			mostrarFormulario.value = false;
			actualizarListadoProducciones();
			console.log("Produccion editado exitosamente", produccionEditado);
		}
	}
};

const limpiarCampos = () => {
	cultivo_id.value = "";
	fecha.value = "";
	numeroLote.value = "";
	especie.value = "";
	cantidad.value = "";
	cantidadTrabajadores.value = "";
	observaciones.value = "";
	precioUnitario.value = "";
	esEdicion.value = false;
};

async function editarEstado(props) {
	if (props.estado == 1) {
		await useProduccion.putProduccionInactivar(props._id);
	} else {
		await useProduccion.putProduccionActivar(props._id);
	}
	actualizarListadoProducciones();
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

onMounted(async () => {
	actualizarListadoProducciones();
	listarCultivos();
});

watch(selectedOption, () => {
	actualizarListadoProducciones();
	isLoading;
	loadingg;
});
</script>

<template>
	<div class="q-pa-md" v-if="!visible">
		<q-dialog v-model="mostrarFormulario" v-bind="!mostrarFormulario && limpiarCampos()">
			<q-card style="width: 30rem">
				<q-card-section style="padding-bottom: 0">
					<div class="text-h5 text-center text-green q-pt-lg">{{ esEdicion ? "Editar" : "Agregar" }} Producción</div>
				</q-card-section>

				<q-card-section>
					<q-form @submit.prevent="esEdicion ? editarProduccion() : agregarProduccion()" class="q-pa-md">
						<q-select v-model="cultivo_id" standout="bg-green text-while" filled outlined label="Cultivo" :options="cultivosOptions" class="q-mb-md" style="max-width: 100%">
							<template v-slot:no-option>
								<q-item>
									<q-item-section> No results </q-item-section>
								</q-item>
							</template>
						</q-select>
						<q-input v-model="fecha" standout="bg-green text-while" label="Fecha" type="date" filled class="q-mb-md" required />
						<q-input v-model="numeroLote" standout="bg-green text-while" label="Número de Lote" type="number" filled class="q-mb-md" required min="0" />
						<q-input v-model.trim="especie" standout="bg-green text-while" label="Especie" type="textarea" filled class="q-mb-md" required />
						<q-input v-model="cantidad" standout="bg-green text-while" label="Cantidad" type="number" filled class="q-mb-md" required min="0" outlined />
						<q-input v-model="cantidadTrabajadores" standout="bg-green text-while" label="Cantidad de trabajadores" type="number" filled class="q-mb-md" required min="0" outlined />
						<q-input v-model.trim="observaciones" standout="bg-green text-while" label="Observaciones" filled class="q-mb-md" required />
						<q-input v-model.trim="precioUnitario" standout="bg-green text-while" label="Precio Unitario" type="number" filled class="q-mb-md" required />

						<div class="q-mt-md row justify-end">
							<q-btn :loading="useProduccion.loading" :disable="useProduccion.loading" type="submit" color="positive" class="q-mr-sm"
								>Registrar
								<q-tooltip> Registrar </q-tooltip>
								<template v-slot:loading>
									<q-spinner color="white" size="1em" />
								</template>
							</q-btn>
							<q-btn @click="mostrarFormulario = false" class="bg-red text-white"
								>Cerrar
								<q-tooltip> Cerrar </q-tooltip>
							</q-btn>
						</div>
					</q-form>
				</q-card-section>
			</q-card>
		</q-dialog>

		<q-table flat bordered :rows="filtrarFilas" :columns="columns" row-key="id" :loading="loadingg">
			<template v-slot:top>
				<h4 class="text-green-7 q-pl-xl text-h4" style="position: absolute; top: -10px">Producciones</h4>
				<div class="q-pa-lg q-gutter-lg q-ml-auto" style="display: flex; flex-direction: column; gap: 10px; align-items: flex-end">
					<q-btn label="Agregar" @click="mostrarFormulario = true">
						<q-tooltip>Agregar Producción</q-tooltip>
					</q-btn>
					<q-select standout="bg-green text-while" background-color="green" id="q-select" v-model="selectedOption" label="Filtro por" options-dense :options="options" style="width: 200px" />
				</div>
			</template>

			<template v-slot:body-cell-opciones="props">
				<q-td :props="props">
					<q-btn @click="cargarProduccionParaEdicion(props.row)">
						✏️
						<q-tooltip> Editar Produccion </q-tooltip>
					</q-btn>
					<q-btn v-if="props.row.estado == 1" @click="editarEstado(props.row)">
						❌
						<q-tooltip> Inactivar Produccion </q-tooltip>
					</q-btn>
					<q-btn v-else @click="editarEstado(props.row)">
						✅
						<q-tooltip> Activar Produccion </q-tooltip>
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

			<template v-slot:body-cell-observaciones="props">
				<q-td :props="props" class="relative">
					<div class="truncated-text" @mouseover="checkAndShowTooltip($event, props.row.observaciones, 20)" @mouseleave="hideTooltip">
						{{ truncateText(props.row.observaciones, 20) }}
					</div>
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

.q-select {
	max-width: 250px;
}

.q-my-md {
	max-width: 500px;
	padding-left: 10px;
}
</style>
