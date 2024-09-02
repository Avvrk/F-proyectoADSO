<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { notifyErrorRequest } from "../routes/routes.js";
import { useStoreCultivos } from "../stores/cultivos.js";
import { useStoreEmpleados } from "../stores/empleados.js";
import { useStoreInventario } from "../stores/inventario.js";
import { useStoreSiembra } from "../stores/siembra.js";
import { format } from "date-fns";

// Variables parra mostrar formularios
const mostrarFormularioAgregarSiembra = ref(false);
const mostrarFormularioEditarSiembra = ref(false);

// // Variables de los inputs de agregar y editar
const selectedSiembraId = ref(null);
const id_cultivo = ref("");
const empleado_id = ref("");
const fechaSiembra = ref("");
const fechaCosecha = ref("");
const transplante = ref("");
const cultivoAnterior = ref("");
const inventario_id = ref("");

const estadoOptions = [{ label: "Activo" }, { label: "Inactivo" }];

// estado predeterminado
const estado = ref("Activo");

const useCultivo = useStoreCultivos();
const useEmpleado = useStoreEmpleados();
const useInventario = useStoreInventario();
const useSiembra = useStoreSiembra();

const visible = ref(true);
const loadingg = ref(true);

const listarCultivo = ref("");
const listarEmpleado = ref("");
const listarCultivoAnterior = ref("");

// Variables del input para listar siembras por fechas de Siembra
const fecha1 = ref("");
const fecha2 = ref("")

const selectedOption = ref("Listar Siembras");
const options = [
	{ label: "Listar Siembras", value: "Listar Siembras" },
	{
		label: "Listar Siembra por Cultivo Actual",
		value: "Listar Siembra por Cultivo Actual",
	},
	{
		label: "Listar Siembras por Fechas de Siembra",
		value: "Listar Siembras por Fechas de Siembra",
	},
	{ label: "Listar Siembras Activas", value: "Listar Siembras Activas" },
	{ label: "Listar Siembras Inactivas", value: "Listar Siembras Inactivas" },
	{
		label: "Listar Siembras por Empleado",
		value: "Listar Siembras por Empleado",
	},
	{
		label: "Listar Siembras por Cultivo Anterior",
		value: "Listar Siembras por Cultivo Anterior",
	},
];

let rows = ref([]);
let columns = ref([
	{
		name: "id_cultivo",
		label: "Cultivo",
		field: (row) => row.id_cultivo.nombre,
		align: "center",
	},
	{
		name: "empleado_id",
		label: "Empleado",
		field: (row) => row.empleado_id.nombre,
		align: "center",
	},
	{
		name: "fechaSiembra",
		label: "Fecha Siembra",
		field: (row) => format(new Date(row.fechaSiembra), "dd/MM/yyyy"),
		align: "center",
	},
	{
		name: "fechaCosecha",
		label: "Fecha Cosecha",
		field: (row) => format(new Date(row.fechaCosecha), "dd/MM/yyyy"),
		align: "center",
	},
	{
		name: "transplante",
		label: "Transplante",
		field: "transplante",
		align: "center",
	},
	{
		name: "cultivoAnterior",
		label: "Cultivo Anterior",
		field: "cultivoAnterior",
		align: "center",
	},
	{
		name: "inventario_id",
		label: "Tipo de producto",
		field: (row) => row.inventario_id.tipo,
		align: "center",
	},
	{ name: "estado", label: "Estado", field: "estado", align: "center" },
	{ name: "opciones", label: "Opciones", field: "opciones", align: "center" },
]);

const cultivos = ref([]);
const empleados = ref([]);
const inventarios = ref([]);

async function listarCultivos() {
	const r = await useCultivo.getCultivos();
	cultivos.value = r.data.cultivos;
	console.log("Cultivos:", cultivos.value);
}

async function listarEmpleados() {
	const r = await useEmpleado.getEmpleados();
	empleados.value = r.data.empleados;
	console.log("Empleados", empleados.value);
}

async function listarInventarios() {
	const r = await useInventario.getInventario();
	inventarios.value = r.data.inventario;
	console.log("Inventarios", inventarios.value);
}

const cultivoOptions = computed(() => {
	return cultivos.value
		.filter((plan) => plan.estado != 0)
		.map((cultivo) => ({
			label: cultivo.nombre,
			id: cultivo._id,
		}));
});

const empleadoOptions = computed(() => {
	return empleados.value
		.filter((plan) => plan.estado != 0)
		.map((empleado) => ({
			label: empleado.nombre,
			id: empleado._id,
		}));
});

const inventarioOptions = computed(() => {
	return inventarios.value
		.filter((plan) => plan.estado != 0)
		.map((inventario) => ({
			label: inventario.tipo,
			id: inventario._id,
		}));
});

const filteredFilas = computed(() => {
	if (loadingg.value) {
		return []; // Retorna una lista vacía mientras se está cargando
	}

	// Variables de entrada según la opción seleccionada
	const codigoInput = selectedOption.value.includes("Actual")
		? listarCultivo.value
		: "";
	const empleado = selectedOption.value.includes("Empleado")
		? listarEmpleado.value
		: "";
	const cultivoAnterior = selectedOption.value.includes("Anterior")
		? listarCultivoAnterior.value
		: "";

	// Filtra las filas basándose en la opción seleccionada
	if (codigoInput) {
		return rows.value.filter((siembra) =>
			siembra.id_cultivo.nombre.toString().includes(codigoInput)
		);
	} else if (empleado) {
		return rows.value.filter((siembra) =>
			siembra.empleado_id.nombre.toString().includes(empleado)
		);
	} else if (cultivoAnterior) {
		return rows.value.filter((siembra) =>
			siembra.cultivoAnterior.toString().includes(cultivoAnterior)
		);
	} else if (fecha1.value && fecha2.value) {
		const normalizeDate = date => new Date(date).toISOString().slice(0, 10);

		const startDate = normalizeDate(fecha1.value);
		const endDate = normalizeDate(fecha2.value);

		if (startDate === endDate) {
			// Filtra por la fecha específica si ambas fechas son iguales
			return rows.value.filter(siembra => {
				const siembraDate = normalizeDate(siembra.fechaSiembra);
				return siembraDate === startDate;
			});
			// notifySuccessRequest('Siembras listadas por fecha específica exitosamente.');
		}
	}

	return rows.value;
});

async function actualizarListadoSiembras() {
	loadingg.value = true;
	try {
		const siembraPromise =
			selectedOption.value === "Listar Siembras Activas"
				? useSiembra.getSiembraActivas()
				: selectedOption.value === "Listar Siembras Inactivas"
					? useSiembra.getSiembraInactivas()
					: useSiembra.getSiembra();

		rows.value = (await siembraPromise).data.siembras;
		console.log("Siembras", rows.value);
	} finally {
		loadingg.value = false;
		visible.value = false;
	}
}

async function editarEstado(props) {
	if (props.estado == 1) await useSiembra.putSiembraInactivar(props._id);
	else await useSiembra.putSiembraActivar(props._id);
	actualizarListadoSiembras();
}

const limpiarCampos = () => {
	id_cultivo.value = "";
	empleado_id.value = "";
	fechaSiembra.value = "";
	fechaCosecha.value = "";
	transplante.value = "";
	cultivoAnterior.value = "";
	inventario_id.value = "";
};

const agregarSiembra = async () => {
	const datosSiembra = {
		id_cultivo: id_cultivo.value.id,
		empleado_id: empleado_id.value.id,
		fechaSiembra: fechaSiembra.value,
		fechaCosecha: fechaCosecha.value,
		transplante: transplante.value,
		cultivoAnterior: cultivoAnterior.value,
		inventario_id: inventario_id.value.id,
		estado: estado.value === "Activo" ? 1 : 0,
	};

	if (await validarDatosSiembra(datosSiembra)) {
		const r = await useSiembra.postSiembra(datosSiembra);
		if (r.status == 200) {
			mostrarFormularioAgregarSiembra.value = false;
			actualizarListadoSiembras();
			estado.value = "Activo";
			console.log("Siembra agregada exitosamente", datosSiembra);
		}
	}
};

const editarSiembra = async () => {
	let cultivoA = id_cultivo.value.id;
	let empleadoA = empleado_id.value.id;
	let inventarioA = inventario_id.value.id;

	for (let cult of cultivos.value) {
		if (cult.nombre === id_cultivo.value) {
			// if (cult.estado == 1) {
			cultivoA = cult._id;
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
			empleadoA = emple._id;
			break;
			// } else {
			// 	notifyErrorRequest("Empleado seleccionado inactivo");
			// 	return;
			// }
		}
	}
	for (let inven of inventarios.value) {
		if (inven.tipo === inventario_id.value) {
			// if (inven.estado == 1) {
			inventarioA = inven._id;
			break;
			// } else {
			//   notifyErrorRequest("Producto seleccionado inactivo")
			//   return;
			// }
		}
	}

	const datosSiembra = {
		id_cultivo: cultivoA,
		empleado_id: empleadoA,
		fechaSiembra: fechaSiembra.value,
		fechaCosecha: fechaCosecha.value,
		transplante: transplante.value,
		cultivoAnterior: cultivoAnterior.value,
		inventario_id: inventarioA,
	};

	console.log("Siembra editada exitosamente", datosSiembra);
	if (await validarDatosSiembra(datosSiembra)) {
		const r = await useSiembra.putSiembra(
			selectedSiembraId.value,
			datosSiembra
		);
		if (r.status == 200) {
			mostrarFormularioEditarSiembra.value = false;
			actualizarListadoSiembras();
		}
	}
};

async function validarDatosSiembra(siembra) {
	const { id_cultivo, empleado_id, inventario_id } = siembra;

	if (id_cultivo === "") {
		notifyErrorRequest(`El Cultivo es requerido.`);
		return false;
	}
	if (empleado_id === "") {
		notifyErrorRequest(`El Empleado es requerido.`);
		return false;
	}
	if (inventario_id === "") {
		notifyErrorRequest(`El Producto es requerido.`);
		return false;
	}
	return true;
}

const mostrarDatosParaEditar = (siembra) => {
	selectedSiembraId.value = siembra._id;
	id_cultivo.value = siembra.id_cultivo.nombre;
	empleado_id.value = siembra.empleado_id.nombre;
	fechaSiembra.value = siembra.fechaSiembra.split("T")[0];
	fechaCosecha.value = siembra.fechaCosecha.split("T")[0];
	transplante.value = siembra.transplante.toString();
	cultivoAnterior.value = siembra.cultivoAnterior;
	inventario_id.value = siembra.inventario_id.tipo;

	console.log("Datos de la siembra a editar:", siembra);
	mostrarFormularioEditarSiembra.value = true;
};

onMounted(() => {
	actualizarListadoSiembras();
	listarCultivos();
	listarEmpleados();
	listarInventarios();
});

const isLoading = computed(() => visible.value);

watch(selectedOption, () => {
	actualizarListadoSiembras();
	isLoading;
	loadingg;
});
</script>

<template>
	<div class="q-pa-md" v-if="!visible">
		<div>
			<h3 style="text-align: center; margin: 10px">Siembras</h3>
			<hr style="width: 70%; height: 5px; background-color: green" />
		</div>

		<div class="contSelect" style="margin-left: 5%; text-align: end; margin-right: 5%">
			<!-- Select para las opciones -->
			<q-select background-color="green" class="q-my-md" v-model="selectedOption" outlined dense options-dense
				emit-value :options="options" />

			<!-- Input para 'Listar Siembra por Cultivo Actual' -->
			<input v-if="selectedOption === 'Listar Siembra por Cultivo Actual'" v-model="listarCultivo" class="q-my-md"
				type="text" name="listarCultivo" id="listarCultivo" placeholder="Cultivo Actual" />

			<!-- Input para 'Listar Siembra por Empleado' -->
			<input v-if="selectedOption === 'Listar Siembras por Empleado'" v-model="listarEmpleado" class="q-my-md"
				type="text" name="listarEmpleado" id="listarEmpleado" placeholder="Empleado" />

			<!-- Input para 'Listar Siembras por Cultivo Anterior' -->
			<input v-if="selectedOption === 'Listar Siembras por Cultivo Anterior'" v-model="listarCultivoAnterior"
				class="q-my-md" type="text" name="listarCultivoAnterior" id="listarCultivoAnterior"
				placeholder="Cultivo Anterior" />

			<div v-if="selectedOption === 'Listar Siembras por Fechas de Siembra'"
				style="display: flex; flex-direction: row; text-align: center; flex-wrap: wrap; position: absolute; top: 147px; left: 350px;">
				<label for="fecha1" style="height: 100%; line-height: 88px; margin-left: 80px;">De:</label>
				<q-input v-model="fecha1" class="q-my-md" type="date" name="search" id="fecha1" />

				<label for="fecha2" style="height: 100%; line-height: 88px; margin-left: 80px;">A:</label>
				<q-input v-model="fecha2" class="q-my-md" type="date" name="search" id="fecha2" />
			</div>
		</div>

		<div>
			<div style="margin-left: 5%; text-align: end; margin-right: 5%" class="q-mb-md">
				<q-btn label="Agregar Siembra" @click="mostrarFormularioAgregarSiembra = true">
					<q-tooltip> Agregar Siembra </q-tooltip>
				</q-btn>
			</div>
			<!-- Dialogo para agregar siembra -->
			<q-dialog v-model="mostrarFormularioAgregarSiembra"
				v-bind="mostrarFormularioAgregarSiembra && limpiarCampos()">
				<q-card>
					<q-card-section>
						<div class="text-h6">Agregar Siembra</div>
					</q-card-section>

					<q-card-section>
						<q-form @submit.prevent="agregarSiembra">
							<q-select v-model="id_cultivo" label="Cultivo" filled outlined :options="cultivoOptions"
								class="q-mb-md" style="max-width: 100%" required>
								<template v-slot:no-option>
									<q-item>
										<q-item-section>
											No results
										</q-item-section>
									</q-item>
								</template>
							</q-select>
							<q-select v-model="empleado_id" label="Empleado" filled outlined :options="empleadoOptions"
								class="q-mb-md" style="max-width: 100%" required>
								<template v-slot:no-option>
									<q-item>
										<q-item-section>
											No results
										</q-item-section>
									</q-item>
								</template>
							</q-select>
							<q-input v-model="fechaSiembra" label="fechaSiembra" type="date" filled required
								class="q-mb-md" />
							<q-input v-model="fechaCosecha" label="fechaCosecha" type="date" filled required
								class="q-mb-md" />
							<q-input v-model="transplante" label="transplante (true or false)" filled required
								class="q-mb-md" />
							<q-input v-model.trim="cultivoAnterior" label="cultivoAnterior" filled required
								class="q-mb-md" />
							<q-select v-model="inventario_id" label="Producto" filled outlined
								:options="inventarioOptions" class="q-mb-md" style="max-width: 100%" required>
								<template v-slot:no-option>
									<q-item>
										<q-item-section>
											No results
										</q-item-section>
									</q-item>
								</template>
							</q-select>

							<q-select v-model="estado" label="Estado" filled required :options="estadoOptions"
								class="q-mb-md" style="max-width: 100%" />
							<div class="q-mt-md">
								<q-btn @click="
									mostrarFormularioAgregarSiembra = false
									" label="Cancelar" class="q-mr-sm">
									<q-tooltip> Cancelar </q-tooltip>
								</q-btn>
								<q-btn :loading="useSiembra.loading" :disable="useSiembra.loading" type="submit"
									label="Guardar Siembra" color="primary" class="q-ma-sm">
									<q-tooltip> Guardar Siembra </q-tooltip>
									<template v-slot:loading>
										<q-spinner color="white" size="1em" />
									</template>
								</q-btn>
							</div>
						</q-form>
					</q-card-section>
				</q-card>
			</q-dialog>

			<!-- Dialogo para editar siembra -->
			<q-dialog v-model="mostrarFormularioEditarSiembra">
				<q-card>
					<q-card-section>
						<div class="text-h6">Editar Siembra</div>
					</q-card-section>

					<q-card-section>
						<q-form @submit.prevent="editarSiembra">
							<q-select v-model="id_cultivo" label="Cultivo" filled outlined :options="cultivoOptions"
								class="q-mb-md" style="max-width: 100%" required>
								<template v-slot:no-option>
									<q-item>
										<q-item-section>
											No results
										</q-item-section>
									</q-item>
								</template>
							</q-select>
							<q-select v-model="empleado_id" label="Empleado" filled outlined :options="empleadoOptions"
								class="q-mb-md" style="max-width: 100%" required>
								<template v-slot:no-option>
									<q-item>
										<q-item-section>
											No results
										</q-item-section>
									</q-item>
								</template>
							</q-select>
							<q-input v-model="fechaSiembra" label="fechaSiembra" type="date" filled required
								class="q-mb-md" />
							<q-input v-model="fechaCosecha" label="fechaCosecha" type="date" filled required
								class="q-mb-md" />
							<q-input v-model="transplante" label="transplante (true or false)" filled required
								class="q-mb-md" />
							<q-input v-model.trim="cultivoAnterior" label="cultivoAnterior" filled required
								class="q-mb-md" />
							<q-select v-model="inventario_id" label="Producto" filled outlined
								:options="inventarioOptions" class="q-mb-md" style="max-width: 100%" required>
								<template v-slot:no-option>
									<q-item>
										<q-item-section>
											No results
										</q-item-section>
									</q-item>
								</template>
							</q-select>

							<div class="q-mt-md">
								<q-btn @click="
									mostrarFormularioEditarSiembra = false
									" label="Cancelar" class="q-mr-sm">
									<q-tooltip> Cancelar </q-tooltip>
								</q-btn>
								<q-btn :loading="useSiembra.loading" :disable="useSiembra.loading" type="submit"
									label="Guardar cambios" color="primary" class="q-ma-sm">
									<q-tooltip> Guardar cambios </q-tooltip>
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

		<q-table flat bordered title="Siembras" title-class="text-green text-weight-bolder text-h5"
			:rows="filteredFilas" :columns="columns" row-key="id" style="text-align: center" :loading="loadingg">
			<template v-slot:body-cell-opciones="props">
				<q-td :props="props">
					<q-btn @click="mostrarDatosParaEditar(props.row)">
						✏️
						<q-tooltip> Editar Siembra </q-tooltip>
					</q-btn>
					<q-btn v-if="props.row.estado == 1" @click="editarEstado(props.row)">
						❌
						<q-tooltip> Inactivar Siembra </q-tooltip>
					</q-btn>
					<q-btn v-else @click="editarEstado(props.row)">
						✅
						<q-tooltip> Activar Siembra </q-tooltip>
					</q-btn>
				</q-td>
			</template>

			<template v-slot:body-cell-estado="props">
				<q-td :props="props">
					<p :style="{
						color: props.row.estado === 1 ? 'green' : 'red',
						margin: 0,
					}">
						{{ props.row.estado === 1 ? "Activo" : "Inactivo" }}
					</p>
				</q-td>
			</template>

			<template v-slot:loading>
				<q-inner-loading :showing="loadingg" label="Por favor espere..." label-class="text-teal"
					label-style="font-size: 1.1em">
				</q-inner-loading>
			</template>
		</q-table>
	</div>
	<q-inner-loading :showing="isLoading" label="Por favor espere..." label-class="text-teal"
		label-style="font-size: 1.1em" />
</template>

<style scoped>
.contSelect {
	display: flex;
	flex-direction: row;
	gap: 20px;
}

.q-my-md {
	max-width: 500px;
	padding-left: 10px;
}
</style>
