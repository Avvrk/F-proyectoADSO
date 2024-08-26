<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { notifyErrorRequest } from "../routes/routes.js";
import { useStoreSemillas } from "../stores/semillas.js";
import { useStoreProveedores } from "../stores/proveedores.js";
import { format } from "date-fns";

// Para colocar puntos decimales a los numeros
function formatoNumerico(numero) {
	return typeof numero === "number"
		? numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
		: undefined;
}

// Llamado de modelos
const useSemilla = useStoreSemillas();
const useProveedor = useStoreProveedores();

// variables para mostrar el div que aparece al pasarle el mouse a la observación
const tooltipText = ref("");
const tooltipVisible = ref(false);
const tooltipPosition = ref({ top: 0, left: 0 });

const visible = ref(true);
const loadingg = ref(true);
const listarProveedor = ref("");

const mostrarFormularioAgregarSemillas = ref(false);
const mostrarFormularioEditarSemillas = ref(false);

const idSemillaSeleccionado = ref(null);
const proveedor_id = ref("");
const fechaCompra = ref("");
const fechaVencimiento = ref("");
const especieVariedad = ref("");
const proveedorSemilla = ref("");
const numeroLote = ref("");
const origen = ref("");
const poderGerminativo = ref("");
const observaciones = ref("");
const unidad = ref("");
const total = ref("");

const selectedOption = ref("Listar Semillas");
const options = [
	{ label: "Listar Semillas", value: "Listar Semillas" },
	{ label: "Listar Semillas Activos", value: "Listar Semillas Activos" },
	{ label: "Listar Semillas Inactivos", value: "Listar Semillas Inactivos" },
	{
		label: "Listar Semilla por Proveedor",
		value: "Listar Semilla por Proveedor",
	},
];

const estadoOptions = [{ label: "Activo" }, { label: "Inactivo" }];
const estadoSemilla = ref("Activo");

let rows = ref([]);
let columns = ref([
	{
		name: "proveedor_id",
		align: "center",
		label: "Proveedor",
		field: (row) => row.proveedor_id.nombre,
		align: "center",
	},
	{
		name: "fechaCompra",
		align: "center",
		label: "Fecha Compra",
		field: (row) => format(new Date(row.fechaCompra), "dd/MM/yyyy"),
	},
	{
		name: "fechaVencimiento",
		align: "center",
		label: "fecha Vencimiento",
		field: "fechaVencimiento",
		field: (row) => format(new Date(row.fechaVencimiento), "dd/MM/yyyy"),
	},
	{
		name: "especieVariedad",
		align: "center",
		label: "Especie Variedad",
		field: "especieVariedad",
	},
	{
		name: "proveedorSemilla",
		align: "center",
		label: "Proveedor Semilla",
		field: "proveedorSemilla",
	},
	{
		name: "numeroLote",
		align: "center",
		label: "Número de Lote",
		field: "numeroLote",
	},
	{
		name: "origen",
		align: "center",
		label: "Origen",
		field: "origen",
	},
	{
		name: "poderGerminativo",
		align: "center",
		label: "Poder Germinativo",
		field: "poderGerminativo",
	},
	{
		name: "observaciones",
		align: "center",
		label: "Observaciones",
		field: "observaciones",
	},
	{
		name: "unidad",
		align: "center",
		label: "Unidad",
		field: "unidad",
	},
	{
		name: "total",
		align: "center",
		label: "Total Semillas",
		field: (row) => formatoNumerico(row.total),
	},
	{
		name: "estado",
		align: "center",
		label: "Estado",
		field: "estado",
	},
	{
		name: "opciones",
		align: "center",
		label: "Opciones",
		field: "opciones",
	},
]);

const proveedores = ref([]);

const proveedorOptions = computed(() => {
	return proveedores.value
		.filter((proveedor) => proveedor.estado != 0)
		.map((proveedor) => ({
			label: proveedor.nombre,
			id: proveedor._id,
		}));
});

// Funciones async
async function listarProveedores() {
	const r = await useProveedor.getProveedores();
	proveedores.value = r.data.proveedores;
	console.log("Proveedores", r.data.proveedores);
}

const actualizarListadoSemillas = async () => {
	loadingg.value = true;
	try {
		const semillasPromise =
			selectedOption.value === "Listar Semillas Activos"
				? useSemilla.getSemillasActivas()
				: selectedOption.value === "Listar Semillas Inactivos"
				? useSemilla.getSemillasInactivas()
				: useSemilla.getSemillas();

		rows.value = (await semillasPromise).data.semillas;
		console.log("Semillas", rows.value);
	} finally {
		loadingg.value = false;
		visible.value = false;
	}
};

const filteredRows = computed(() => {
	if (loadingg.value) {
		return []; // Retorna una lista vacía mientras se está cargando
	}

	const codigoInput = selectedOption.value.includes("Proveedor")
		? listarProveedor.value
		: "";

	return codigoInput
		? rows.value.filter((item) =>
				item.proveedor_id.nombre.toString().includes(codigoInput)
		  )
		: rows.value;
});

async function agregarSemilla() {
	const nuevaSemilla = {
		fechaCompra: fechaCompra.value,
		proveedor_id: proveedor_id.value.id,
		fechaVencimiento: fechaVencimiento.value,
		especieVariedad: especieVariedad.value,
		proveedorSemilla: proveedorSemilla.value,
		numeroLote: numeroLote.value,
		origen: origen.value,
		poderGerminativo: poderGerminativo.value,
		observaciones: observaciones.value,
		unidad: unidad.value,
		total: total.value,

		estado: estadoSemilla.value === "Activo" ? 1 : 0,
	};

	if (await validarDatosSemillas(nuevaSemilla)) {
		const r = await useSemilla.postSemillas(nuevaSemilla);
		if (r.status == 200) {
			mostrarFormularioAgregarSemillas.value = false;
			actualizarListadoSemillas();
			estadoSemilla.value = "Activo";
			console.log("Semilla agregado exitosamente", nuevaSemilla);
		}
	}
}

function cargarSemillaParaEdicion(semilla) {
	idSemillaSeleccionado.value = semilla._id;
	proveedor_id.value = semilla.proveedor_id.nombre;
	fechaCompra.value = semilla.fechaCompra.split("T")[0];
	fechaVencimiento.value = semilla.fechaVencimiento.split("T")[0];
	especieVariedad.value = semilla.especieVariedad;
	proveedorSemilla.value = semilla.proveedorSemilla;
	numeroLote.value = semilla.numeroLote;
	origen.value = semilla.origen;
	poderGerminativo.value = semilla.poderGerminativo;
	observaciones.value = semilla.observaciones;
	unidad.value = semilla.unidad;
	total.value = semilla.total;

	mostrarFormularioEditarSemillas.value = true;
	console.log("Datos de la semilla a editar", semilla);
}

async function editarSemilla() {
	let proveedorActual = proveedor_id.value.id;

	for (let pro of proveedores.value) {
		if (pro.nombre === proveedor_id.value) {
			if (pro.estado == 1) {
				proveedorActual = pro._id;
				break;
			} else {
				notifyErrorRequest("Proveedor seleccionado inactivo");
				return;
			}
		}
	}

	const SemillaEditada = {
		fechaCompra: fechaCompra.value,
		proveedor_id: proveedorActual,
		fechaVencimiento: fechaVencimiento.value,
		especieVariedad: especieVariedad.value,
		proveedorSemilla: proveedorSemilla.value,
		numeroLote: numeroLote.value,
		origen: origen.value,
		poderGerminativo: poderGerminativo.value,
		observaciones: observaciones.value,
		unidad: unidad.value,
		total: total.value,
	};

	if (await validarDatosSemillas(SemillaEditada)) {
		const r = await useSemilla.putSemillas(
			idSemillaSeleccionado.value,
			SemillaEditada
		);
		if (r.status == 200) {
			mostrarFormularioEditarSemillas.value = false;
			actualizarListadoSemillas();
			console.log("Semilla editado exitosamente", SemillaEditada);
		}
	}
}

async function validarDatosSemillas(semilla) {
	const { proveedor_id } = semilla;

	if (proveedor_id === "") {
		notifyErrorRequest("El Proveedor es requerido.");
		return false;
	}
	return true;
}

async function editarEstado(props) {
	if (props.estado == 1) {
		await useSemilla.putSemillasInactivar(props._id);
	} else {
		await useSemilla.putSemillasActivar(props._id);
	}
	actualizarListadoSemillas();
}

function limpiarCampos() {
	fechaCompra.value = "";
	proveedor_id.value = "";
	fechaVencimiento.value = "";
	especieVariedad.value = "";
	proveedorSemilla.value = "";
	numeroLote.value = "";
	origen.value = "";
	poderGerminativo.value = "";
	observaciones.value = "";
	unidad.value = "";
	total.value = "";
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

// Montaje
onMounted(() => {
	actualizarListadoSemillas();
	listarProveedores();
});

watch(selectedOption, () => actualizarListadoSemillas(), isLoading, loadingg);
</script>

<template>
	<div class="q-pa-md" v-if="!visible">
		<div>
			<h3 style="text-align: center; margin: 10px">Semillas</h3>
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
				v-if="selectedOption === 'Listar Semilla por Proveedor'"
				v-model="listarProveedor"
				class="q-my-md"
				type="text"
				name="listarProveedor"
				id="listarProveedor"
				placeholder="Código del semilla" />
		</div>

		<div>
			<div
				style="margin-left: 5%; text-align: end; margin-right: 5%"
				class="q-mb-md">
				<q-btn
					label="Agregar Semilla"
					@click="mostrarFormularioAgregarSemillas = true">
					<q-tooltip> Agregar Semilla </q-tooltip>
				</q-btn>
				<!-- <q-btn label="Editar Semilla" @click="mostrarFormularioEditarSemillas = true" /> -->
			</div>

			<!-- Diálogo para agregar semilla -->
			<q-dialog
				v-model="mostrarFormularioAgregarSemillas"
				v-bind="mostrarFormularioAgregarSemillas && limpiarCampos()">
				<q-card>
					<q-card-section>
						<div class="text-h5" style="padding: 10px 0 0 25px">
							Agregar Semilla
						</div>
					</q-card-section>

					<q-card-section>
						<q-form @submit.prevent="agregarSemilla">
							<q-select
								v-model="proveedor_id"
								label="Proveedor"
								filled
								outlined
								:options="proveedorOptions"
								class="q-mb-md"
								style="max-width: 100%"
								required>
								<template v-slot:no-option>
									<q-item>
										<q-item-section>
											No results
										</q-item-section>
									</q-item>
								</template>
							</q-select>
							<q-input
								v-model="fechaCompra"
								type="date"
								label="Fecha de compra"
								filled
								required
								class="q-mb-md" />
							<q-input
								v-model="fechaVencimiento"
								type="date"
								label="Fecha de vencimiento"
								filled
								required
								class="q-mb-md" />
							<q-input
								v-model.trim="especieVariedad"
								label="Especie y variedad"
								type="string"
								filled
								required
								class="q-mb-md" />
							<q-input
								v-model.trim="proveedorSemilla"
								label="Proveedor de la semilla"
								type="string"
								filled
								required
								class="q-mb-md" />
							<q-input
								v-model.trim="numeroLote"
								label="Número de Lote"
								type="string"
								filled
								required
								class="q-mb-md" />
							<q-input
								v-model.trim="origen"
								label="Origen"
								type="string"
								filled
								required
								class="q-mb-md" />
							<q-input
								v-model.trim="poderGerminativo"
								label="Poder Germinativo"
								type="string"
								filled
								required
								class="q-mb-md" />
							<q-input
								v-model.trim="observaciones"
								label="Observaciones"
								type="string"
								filled
								required
								class="q-mb-md" />
							<q-input
								v-model.trim="unidad"
								label="Unidad"
								filled
								class="q-mb-md"
								required />
							<q-input
								v-model="total"
								label="Total"
								type="number"
								filled
								outlined
								class="q-mb-md"
								required
								min="0" />

							<q-select
								v-model="estadoSemilla"
								label="Estado"
								filled
								outlined
								:options="estadoOptions"
								required
								class="q-mb-md"
								style="max-width: 100%" />
							<!-- Botones de acción -->
							<div class="q-mt-md">
								<q-btn
									@click="
										mostrarFormularioAgregarSemillas = false
									"
									label="Cancelar"
									color="negative"
									class="q-mr-sm">
									<q-tooltip> Cancelar </q-tooltip>
								</q-btn>
								<q-btn
									:loading="useSemilla.loading"
									:disable="useSemilla.loading"
									type="submit"
									label="Guardar Semilla"
									color="primary">
									<q-tooltip> Guardar Semilla </q-tooltip>
									<template v-slot:loading>
										<q-spinner color="white" size="1em" />
									</template>
								</q-btn>
							</div>
						</q-form>
					</q-card-section>
				</q-card>
			</q-dialog>

			<!-- Diálogo para editar semilla -->
			<q-dialog v-model="mostrarFormularioEditarSemillas">
				<q-card>
					<q-card-section>
						<div class="text-h5" style="padding: 10px 0 0 25px">
							Editar Semilla
						</div>
					</q-card-section>

					<q-card-section>
						<q-form @submit.prevent="editarSemilla">
							<q-select
								v-model="proveedor_id"
								label="Proveedor"
								filled
								outlined
								:options="proveedorOptions"
								class="q-mb-md"
								style="max-width: 100%"
								required>
								<template v-slot:no-option>
									<q-item>
										<q-item-section>
											No results
										</q-item-section>
									</q-item>
								</template>
							</q-select>
							<q-input
								v-model="fechaCompra"
								type="date"
								label="Fecha de compra"
								filled
								required
								class="q-mb-md" />
							<q-input
								v-model="fechaVencimiento"
								type="date"
								label="Fecha de vencimiento"
								filled
								required
								class="q-mb-md" />
							<q-input
								v-model.trim="especieVariedad"
								label="Especie y variedad"
								type="string"
								filled
								required
								class="q-mb-md" />
							<q-input
								v-model.trim="proveedorSemilla"
								label="Proveedor de la semilla"
								type="string"
								filled
								required
								class="q-mb-md" />
							<q-input
								v-model.trim="numeroLote"
								label="Número de Lote"
								type="string"
								filled
								required
								class="q-mb-md" />
							<q-input
								v-model.trim="origen"
								label="Origen"
								type="string"
								filled
								required
								class="q-mb-md" />
							<q-input
								v-model.trim="poderGerminativo"
								label="Poder Germinativo"
								type="string"
								filled
								required
								class="q-mb-md" />
							<q-input
								v-model.trim="observaciones"
								label="Observaciones"
								type="string"
								filled
								required
								class="q-mb-md" />
							<q-input
								v-model.trim="unidad"
								label="Unidad"
								filled
								class="q-mb-md"
								required />
							<q-input
								v-model="total"
								label="Total"
								type="number"
								filled
								outlined
								class="q-mb-md"
								required
								min="0" />

							<!-- style="padding: 10px 0 0 25px;" -->
							<!-- Botones de acción -->
							<div class="q-mt-md">
								<q-btn
									@click="
										mostrarFormularioEditarSemillas = false
									"
									label="Cancelar"
									color="negative"
									class="q-mr-sm">
									<q-tooltip> Cancelar </q-tooltip>
								</q-btn>
								<q-btn
									:loading="useSemilla.loading"
									:disable="useSemilla.loading"
									type="submit"
									label="Guardar Cambios"
									color="primary">
									<q-tooltip> Guardar Cambios </q-tooltip>
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
		<q-table
			flat
			bordered
			title="Semillas"
			title-class="text-green text-weight-bolder text-h5"
			:rows="filteredRows"
			:columns="columns"
			row-key="id"
			:loading="loadingg">
			<template v-slot:body-cell-opciones="props">
				<q-td :props="props">
					<q-btn @click="cargarSemillaParaEdicion(props.row)">
						✏️
						<q-tooltip> Editar Semilla </q-tooltip>
					</q-btn>
					<q-btn
						v-if="props.row.estado == 1"
						@click="editarEstado(props.row)">
						❌
						<q-tooltip> Inactivar Semilla </q-tooltip>
					</q-btn>
					<q-btn v-else @click="editarEstado(props.row)">
						✅
						<q-tooltip> Activar Semilla </q-tooltip>
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
	max-width: 200px;
}

.q-my-md {
	max-width: 500px;
	padding-left: 10px;
}
</style>
