<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { notifyErrorRequest } from "../routes/routes.js";
import { useStoreProduccion } from "../stores/produccion.js";
import { useStoreCultivos } from "../stores/cultivos.js";
import { format } from "date-fns";

function formatoNumerico(numero) {
	return typeof numero === "number"
		? numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
		: undefined;
}

const visible = ref(true);
const loadingg = ref(true);

// variables para mostrar el div que aparece al pasarle el mouse a la descripción
const tooltipText = ref("");
const tooltipVisible = ref(false);
const tooltipPosition = ref({ top: 0, left: 0 });

const mostrarFormularioAgregarProduccion = ref(false);
const mostrarFormularioEditarProduccion = ref(false);

const useCultivo = useStoreCultivos();
const useProduccion = useStoreProduccion();

const nombreMaquinaProduccion = ref("");
const fecha1 = ref("");
const fecha2 = ref("");

const cultivos = ref([]);

const listarCultivos = async () => {
	const response = await useCultivo.getCultivos();
	cultivos.value = response.data.cultivos;
	// console.log("Cultivos listadas:", cultivos.value);
};

const cultivosOptions = computed(() => {
	return cultivos.value
		.filter((cultivo) => cultivo.estado != 0)
		.map((cultivo) => ({
			label: cultivo.especie,
			id: cultivo._id,
		}));
});

const selectedMachine = ref(null);
const fecha = ref("");
const especie = ref("");
const numeroLote = ref("");
const cantidad = ref("");
const cantidadTrabajadores = ref("");
const observaciones = ref("");
const idProduccionSeleccionado = ref(null);

const estadoOptions = [{ label: "Activo" }, { label: "Inactivo" }];
const estadoM = ref("Activo");

const selectedOption = ref("Listar Producciones"); // Establecer 'Listar Producciones' como valor por defecto
const options = [
	{ label: "Listar Producciones", value: "Listar Producciones" },
	{
		label: "Listar Produccion de la Máquina por su Nombre",
		value: "Listar Produccion de la Máquina por su Nombre",
	},
	{
		label: "Listar Producciones Activos",
		value: "Listar Producciones Activos",
	},
	{
		label: "Listar Producciones Inactivos",
		value: "Listar Producciones Inactivos",
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
		label: "Máquina",
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
		const produccionesPromise =
			selectedOption.value === "Listar Producciones Activos"
				? useProduccion.getProduccionActivas()
				: selectedOption.value === "Listar Producciones Inactivos"
				? useProduccion.getProduccionInactivas()
				: useProduccion.getProduccion();

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

	const searchTermNombreMaquina = nombreMaquinaProduccion.value || "";
	const fecha1Value = fecha1.value ? new Date(fecha1.value) : null;
	const fecha2Value = fecha2.value ? new Date(fecha2.value) : null;

	return rows.value.filter((produccion) => {
		switch (selectedOption.value) {
			case "Listar Produccion de la Máquina por su Nombre":
				if (
					produccion.cultivo_id.nombre.includes(
						searchTermNombreMaquina
					)
				) {
					// notifySuccessRequest('Listado correctamente por nombre de máquina.');
					return true;
				}
				return false;

			case "Listar Producciones por Fechas":
				if (!fecha1Value || !fecha2Value) return true; // No hay filtro aplicado si no hay fechas seleccionadas
				const fechaProduccion = new Date(produccion.fecha);
				if (
					fechaProduccion >= fecha1Value &&
					fechaProduccion <= fecha2Value
				) {
					// notifySuccessRequest('Producciones listados por fechas exitosamente.');
					return true;
				} else {
					// notifyErrorRequest('Fechas inválidas o inconsistentes.');
					return false;
				}

			default:
				return true;
		}
	});
});

const cargarProduccionParaEdicion = (produccion) => {
	idProduccionSeleccionado.value = produccion._id;
	selectedMachine.value = produccion.cultivo_id.nombre;
	fecha.value = produccion.fecha.split("T")[0];
	numeroLote.value = produccion.numeroLote;
	especie.value = produccion.especie;
	cantidad.value = produccion.cantidad;
	cantidadTrabajadores.value = produccion.cantidadTrabajadores;
	observaciones.value = produccion.observaciones;

	console.log("Datos del produccion a editar:", {
		idProduccionSeleccionado: produccion._id,
		cultivo_id: produccion.cultivo_id.nombre,
		fecha: produccion.fecha.split("T")[0],
		numeroLote: produccion.numeroLote,
		especie: produccion.especie,
		cantidad: produccion.cantidad,
		cantidadTrabajadores: produccion.cantidadTrabajadores,
		observaciones: produccion.observaciones,
	});

	mostrarFormularioEditarProduccion.value = true;
};

async function validarDatosProduccion(produccion) {
	const { cultivo_id } = produccion;

	if (cultivo_id === undefined) {
		notifyErrorRequest("La Máquina es requerida.");
		return false;
	}

	return true;
}

const agregarProduccion = async () => {
	const produccionData = {
		cultivo_id: selectedMachine.value.id,
		fecha: fecha.value,
		numeroLote: numeroLote.value,
		especie: especie.value,
		cantidad: cantidad.value,
		cantidadTrabajadores: cantidadTrabajadores.value,
		observaciones: observaciones.value,
		estado: estadoM.value === "Activo" ? 1 : 0,
	};

	if (await validarDatosProduccion(produccionData)) {
		const r = await useProduccion.postProduccion(produccionData);
		if (r.status == 200) {
			mostrarFormularioAgregarProduccion.value = false;
			actualizarListadoProducciones();
			estadoM.value = "Activo";
			console.log("Produccion agregado exitosamente", produccionData);
		}
	}
};

const editarProduccion = async () => {
	let cultivo_idSeleccionada = selectedMachine.value.id;

	for (let cultivo of cultivos.value) {
		if (cultivo.especie == selectedMachine.value) {
			if (cultivo.estado == 1) {
				cultivo_idSeleccionada = cultivo._id;
				break;
			} else {
				notifyErrorRequest("Máquina seleccionada inactiva");
				return;
			}
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
	};

	if (await validarDatosProduccion(produccionEditado)) {
		const r = await useProduccion.putProduccion(
			idProduccionSeleccionado.value,
			produccionEditado
		);
		if (r.status == 200) {
			mostrarFormularioEditarProduccion.value = false;
			actualizarListadoProducciones();
			console.log("Produccion editado exitosamente", produccionEditado);
		}
	}
};

const limpiarCampos = () => {
	selectedMachine.value = "";
	fecha.value = "";
	numeroLote.value = "";
	especie.value = "";
	cantidad.value = "";
	cantidadTrabajadores.value = "";
	observaciones.value = "";
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
		<div>
			<h3 style="text-align: center; margin: 10px">Producciones</h3>
			<hr style="width: 70%; height: 5px; background-color: green" />
		</div>

		<div
			class="contSelect"
			style="margin-left: 5%; text-align: end; margin-right: 5%">
			<q-select
				background-color="green"
				class="q-my-md"
				v-model="selectedOption"
				outlined
				dense
				options-dense
				emit-value
				:options="options" />

			<input
				v-if="
					selectedOption ===
					'Listar Produccion de la Máquina por su Nombre'
				"
				v-model="nombreMaquinaProduccion"
				class="q-my-md"
				type="text"
				name="search"
				id="searchMaquina"
				@dblclick="selectAllText"
				placeholder="Nombre de la Máquina" />

			<div
				v-if="selectedOption === 'Listar Producciones por Fechas'"
				style="
					display: flex;
					flex-direction: row;
					text-align: center;
					flex-wrap: wrap;
					position: absolute;
					top: 147px;
					left: 350px;
				">
				<label
					for="fecha1"
					style="height: 100%; line-height: 88px; margin-left: 40px"
					>De:</label
				>
				<q-input
					v-model="fecha1"
					class="q-my-md"
					type="date"
					name="search"
					id="fecha1" />

				<label
					for="fecha2"
					style="height: 100%; line-height: 88px; margin-left: 40px"
					>A:</label
				>
				<q-input
					v-model="fecha2"
					class="q-my-md"
					type="date"
					name="search"
					id="fecha2" />
			</div>
		</div>

		<div>
			<div
				style="margin-left: 5%; text-align: end; margin-right: 5%"
				class="q-mb-md">
				<q-btn
					label="Agregar Produccion"
					@click="mostrarFormularioAgregarProduccion = true">
					<!-- <q-btn label="Editar Produccion" @click="mostrarFormularioEditarProduccion = true" /> -->
					<q-tooltip> Agregar Produccion </q-tooltip>
				</q-btn>
			</div>
			<!-- Dialogo para agregar produccion -->
			<q-dialog
				v-model="mostrarFormularioAgregarProduccion"
				n
				v-bind="mostrarFormularioAgregarProduccion && limpiarCampos()">
				<q-card>
					<q-card-section>
						<div class="text-h5" style="padding: 10px 0 0 25px">
							Agregar Produccion
						</div>
					</q-card-section>

					<q-card-section>
						<div class="q-pa-md">
							<q-form @submit.prevent="agregarProduccion">
								<!-- Campos del formulario de agregar produccion -->
								<!-- Selección de máquina -->
								<q-select
									v-model="selectedMachine"
									filled
									outlined
									label="Máquina"
									:options="cultivosOptions"
									class="q-mb-md"
									style="max-width: 100%">
									<template v-slot:no-option>
										<q-item>
											<q-item-section>
												No results
											</q-item-section>
										</q-item>
									</template>
								</q-select>
								<q-input
									v-model="fecha"
									label="Fecha"
									type="date"
									filled
									class="q-mb-md"
									required />
								<q-input
									v-model="numeroLote"
									label="Numero de Lote"
									type="number"
									filled
									class="q-mb-md"
									required
									min="0" />
								<q-input
									v-model.trim="especie"
									label="Especie"
									type="textarea"
									filled
									class="q-mb-md"
									required />
								<q-input
									v-model="cantidad"
									label="cantidad"
									type="number"
									filled
									class="q-mb-md"
									required
									min="0"
									outlined />
								<q-input
									v-model="cantidadTrabajadores"
									label="Cantidad de trabajadores"
									type="number"
									filled
									class="q-mb-md"
									required
									min="0"
									outlined />
								<q-input
									v-model.trim="observaciones"
									label="Observaciones"
									filled
									class="q-mb-md"
									required />
								<q-select
									v-model="estadoM"
									label="Estado"
									outlined
									:options="estadoOptions"
									filled
									class="q-mb-md"
									style="max-width: 100%" />

								<!-- Botón para agregar produccion -->
								<div class="q-mt-md">
									<q-btn
										@click="
											mostrarFormularioAgregarProduccion = false
										"
										label="Cancelar"
										color="negative"
										class="q-ma-sm">
										<q-tooltip> Cancelar </q-tooltip>
									</q-btn>
									<q-btn
										:loading="useProduccion.loading"
										:disable="useProduccion.loading"
										type="submit"
										label="Guardar Produccion"
										color="primary"
										class="q-ma-sm">
										<q-tooltip>
											Guardar Produccion
										</q-tooltip>
										<template v-slot:loading>
											<q-spinner
												color="white"
												size="1em" />
										</template>
									</q-btn>
								</div>
							</q-form>
						</div>
					</q-card-section>
				</q-card>
			</q-dialog>

			<!-- Dialogo para editar produccion -->
			<q-dialog v-model="mostrarFormularioEditarProduccion">
				<q-card>
					<q-card-section>
						<div class="text-h5" style="padding: 10px 0 0 25px">
							Editar Produccion
						</div>
					</q-card-section>

					<q-card-section>
						<div class="q-pa-md">
							<q-form @submit.prevent="editarProduccion">
								<!-- Campos del formulario de editar produccion -->
								<!-- Selección de máquina -->
								<q-select
									v-model="selectedMachine"
									filled
									outlined
									label="Máquina"
									:options="cultivosOptions"
									class="q-mb-md"
									style="max-width: 100%">
									<template v-slot:no-option>
										<q-item>
											<q-item-section>
												No results
											</q-item-section>
										</q-item>
									</template>
								</q-select>
								<q-input
									v-model="fecha"
									label="Fecha"
									type="date"
									filled
									class="q-mb-md"
									required />
								<q-input
									v-model="numeroLote"
									label="Numero de Lote"
									type="number"
									filled
									class="q-mb-md"
									required
									min="0" />
								<q-input
									v-model.trim="especie"
									label="Especie"
									type="textarea"
									filled
									class="q-mb-md"
									required />
								<q-input
									v-model="cantidad"
									label="cantidad"
									type="number"
									filled
									class="q-mb-md"
									required
									min="0"
									outlined />
								<q-input
									v-model="cantidadTrabajadores"
									label="Cantidad de trabajadores"
									type="number"
									filled
									class="q-mb-md"
									required
									min="0"
									outlined />
								<q-input
									v-model.trim="observaciones"
									label="Observaciones"
									filled
									class="q-mb-md"
									required />

								<!-- Botón para editar produccion -->
								<div class="q-mt-md">
									<q-btn
										@click="
											mostrarFormularioEditarProduccion = false
										"
										label="Cancelar"
										color="negative"
										class="q-ma-sm">
										<q-tooltip> Cancelar </q-tooltip>
									</q-btn>
									<q-btn
										:loading="useProduccion.loading"
										:disable="useProduccion.loading"
										type="submit"
										label="Guardar Cambios"
										color="primary"
										class="q-ma-sm">
										<q-tooltip> Guardar Cambios </q-tooltip>
										<template v-slot:loading>
											<q-spinner
												color="white"
												size="1em" />
										</template>
									</q-btn>
								</div>
							</q-form>
						</div>
					</q-card-section>
				</q-card>
			</q-dialog>
		</div>

		<q-table
			flat
			bordered
			title="Producciones"
			title-class="text-green text-weight-bolder text-h5"
			:rows="filtrarFilas"
			:columns="columns"
			row-key="id"
			:loading="loadingg">
			<template v-slot:body-cell-opciones="props">
				<q-td :props="props">
					<q-btn @click="cargarProduccionParaEdicion(props.row)">
						✏️
						<q-tooltip> Editar Produccion </q-tooltip>
					</q-btn>
					<q-btn
						v-if="props.row.estado == 1"
						@click="editarEstado(props.row)">
						❌
						<q-tooltip> Inactivar Produccion </q-tooltip>
					</q-btn>
					<q-btn v-else @click="editarEstado(props.row)">
						✅
						<q-tooltip> Activar Produccion </q-tooltip>
					</q-btn>
				</q-td>
			</template>

			<template class="a" v-slot:body-cell-estado="props">
				<q-td class="b" :props="props">
					<p
						:style="{
							color: props.row.estado === 1 ? 'green' : 'red',
							margin: 0,
						}">
						{{ props.row.estado === 1 ? "Activo" : "Inactivo" }}
					</p>
				</q-td>
			</template>

			<!-- Observaciones Column -->
			<template v-slot:body-cell-observaciones="props">
				<q-td :props="props" class="relative">
					<div
						class="truncated-text"
						@mouseover="
							checkAndShowTooltip(
								$event,
								props.row.observaciones,
								20
							)
						"
						@mouseleave="hideTooltip">
						{{ truncateText(props.row.observaciones, 20) }}
					</div>
				</q-td>
			</template>

			<template v-slot:loading>
				<q-inner-loading
					:showing="loadingg"
					label="Por favor espere..."
					label-class="text-teal"
					label-style="font-size: 1.1em">
				</q-inner-loading>
			</template>
		</q-table>
	</div>
	<q-inner-loading
		:showing="isLoading"
		label="Por favor espere..."
		label-class="text-teal"
		label-style="font-size: 1.1em" />
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
