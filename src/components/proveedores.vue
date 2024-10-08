<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useStoreProveedores } from "../stores/proveedores.js";

// Loading
const visible = ref(true);
const loadingg = ref(true);

// Variables para mostrar formularios
const mostrarFormulario = ref(false);
const esEdicion = ref(false);

// Llamado de modelos
const useProveedor = useStoreProveedores();

// Arrays de modelos
const fincas = ref([]);

// // Variables de los inputs de agregar y editar
const idProveedorSeleccionada = ref("");
const finca_id = ref("");
const nombre = ref("");
const direccion = ref("");
const telefono = ref("");
const email = ref("");

const selectedOption = ref("Todos");
const options = [
	{ label: "Todos", value: "Todos" },
	{
		label: "Activos",
		value: "Activos",
	},
	{
		label: "Inactivos",
		value: "Inactivos",
	},
];

let rows = ref([]);
const columns = ref([
	{
		name: "finca_id",
		label: "Finca",
		field: (row) => row.finca_id.nombre,
		align: "center",
	},
	{
		name: "nombre",
		label: "Nombre",
		field: "nombre",
		align: "center",
	},
	{
		name: "direccion",
		label: "Dirección",
		field: "direccion",
		align: "center",
	},
	{
		name: "telefono",
		label: "Teléfono",
		field: "telefono",
		align: "center",
	},
	{
		name: "email",
		label: "Email",
		field: "email",
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

async function actualizarListadoProveedores() {
	loadingg.value = true;
	try {
		const proveedoresPromise = selectedOption.value === "Activos" ? useProveedor.getProveedoresActivos() : selectedOption.value === "Inactivos" ? useProveedor.getProveedoresInactivos() : useProveedor.getProveedores();

		rows.value = (await proveedoresPromise).data.proveedores;
		console.log("Proveedores", rows.value);
	} finally {
		loadingg.value = false;
		visible.value = false;
	}
}

async function listarFincas() {
	const r = await useProveedor.getFincas();
	fincas.value = r.data.fincas;
	// console.log("fincas", r.data.fincas);
}

const fincasOptions = computed(() => {
	return fincas.value
		.filter(({ estado }) => estado != 0)
		.map((finca) => ({
			label: finca.nombre,
			id: finca._id,
		}));
});

async function editarEstado(props) {
	if (props.estado == 1) {
		await useProveedor.putProveedoresInactivar(props._id);
	} else {
		await useProveedor.putProveedoresActivar(props._id);
	}
	actualizarListadoProveedores();
}

const limpiarCampos = () => {
	idProveedorSeleccionada.value = "";
	finca_id.value = "";
	nombre.value = "";
	direccion.value = "";
	telefono.value = "";
	email.value = "";
	esEdicion.value = false;
};

async function validarDatosProveedor(proveedor) {
	const { finca_id } = proveedor;

	if (finca_id === "") {
		notifyErrorRequest(`La Finca es requerida.`);
		return false;
	}
	// Si no hay errores, retornar true
	return true;
}

async function agregarProveedor() {
	const nuevoProveedor = {
		finca_id: finca_id.value.id,
		nombre: nombre.value,
		direccion: direccion.value,
		telefono: telefono.value,
		email: email.value,
	};

	if (await validarDatosProveedor(nuevoProveedor)) {
		const r = await useProveedor.postProveedores(nuevoProveedor);
		if (r.status === 200) {
			mostrarFormulario.value = false;
			actualizarListadoProveedores();
			console.log("Proveedor agregado exitosamente", nuevoProveedor);
		}
	}
}

function cargarProveedorParaEdicion(proveedor) {
	idProveedorSeleccionada.value = proveedor._id;
	finca_id.value = proveedor.finca.nombre;
	nombre.value = proveedor.nombre;
	direccion.value = proveedor.direccion;
	telefono.value = proveedor.telefono;
	email.value = proveedor.email;

	esEdicion.value = true;
	mostrarFormulario.value = true;
	console.log("Datos del proveedor a editar", proveedor);
}

async function editarProveedor() {
	let idFincaAgregar = finca_id.value.id;

	for (let finca of fincas.value) {
		if (finca.nombre === finca_id.value) {
			// if (finca.estado == 1) {
			idFincaAgregar = finca._id;
			break;
			// }
			// else {
			// 	notifyErrorRequest("Finca seleccionado inactivo");
			// 	return;
			// }
		}
	}
	const proveedorEditado = {
		_id: idProveedorSeleccionada.value,
		finca_id: idFincaAgregar.value,
		nombre: nombre.value,
		direccion: direccion.value,
		telefono: telefono.value,
		email: email.value,
	};

	if (await validarDatosProveedor(proveedorEditado)) {
		const r = await useProveedor.putProveedores(idProveedorSeleccionada.value, proveedorEditado);
		if (r.status === 200) {
			mostrarFormulario.value = false;
			actualizarListadoProveedores();
			console.log("Proveedor editado exitosamente", proveedorEditado);
		}
	}
}

const isLoading = computed(() => visible.value);

onMounted(() => {
	actualizarListadoProveedores();
	listarFincas();
});

watch(selectedOption, () => {
	actualizarListadoProveedores();
	isLoading;
	loadingg;
});
</script>

<template>
	<div class="q-pa-md" v-if="!visible">
		<q-dialog v-model="mostrarFormulario" v-bind="!mostrarFormulario && limpiarCampos()">
			<q-card style="width: 30rem">
				<q-card-section style="padding-bottom: 0">
					<div class="text-h5 text-center text-green q-pt-lg">{{ esEdicion ? "Editar" : "Agregar" }} Proveedor</div>
				</q-card-section>
				<q-card-section>
					<q-form @submit.prevent="esEdicion ? editarProveedor() : agregarProveedor()" class="q-pa-md">
						<q-select v-model="finca_id" standout="bg-green text-while" filled outlined :options="fincasOptions" label="Finca" class="q-mb-md" style="min-width: 100%" required>
							<template v-slot:no-option>
								<q-item>
									<q-item-section>No results</q-item-section>
								</q-item>
							</template>
						</q-select>
						<q-input v-model.trim="nombre" standout="bg-green text-while" label="Nombre" filled outlined class="q-mb-md" required />
						<q-input v-model.trim="direccion" standout="bg-green text-while" label="Dirección" filled class="q-mb-md" required />
						<q-input v-model.trim="telefono" standout="bg-green text-while" label="Teléfono" type="number" filled outlined class="q-mb-md" required />
						<q-input v-model.trim="email" standout="bg-green text-while" label="Email" type="email" filled outlined class="q-mb-md" required />

						<div class="q-mt-md row justify-end">
							<q-btn :loading="useProveedor.loading" :disable="useProveedor.loading" type="submit" color="positive" class="q-mr-sm"
								>Registrar
								<q-tooltip> Registrar </q-tooltip>
								<template v-slot:loading>
									<q-spinner color="white" size="1em" />
								</template>
							</q-btn>
							<q-btn class="bg-red text-white" @click="mostrarFormulario = false"
								>Cerrar
								<q-tooltip> Cerrar </q-tooltip>
							</q-btn>
						</div>
					</q-form>
				</q-card-section>
			</q-card>
		</q-dialog>

		<q-table flat bordered :rows="rows" :columns="columns" row-key="id" :loading="loadingg" style="text-align: center">
			<template v-slot:top>
				<h4 class="text-green-7 q-pl-xl text-h4" style="position: absolute; top: -10px">Proveedores</h4>
				<div class="q-pa-lg q-gutter-lg q-ml-auto" style="display: flex; flex-direction: column; gap: 10px; align-items: flex-end">
					<q-btn label="Agregar" @click="mostrarFormulario = true">
						<q-tooltip>Agregar Proveedor</q-tooltip>
					</q-btn>

					<q-select standout="bg-green text-while" background-color="green" id="q-select" v-model="selectedOption" label="Filtro por" options-dense :options="options" emit-value style="width: 200px" />
				</div>
			</template>

			<template v-slot:body-cell-opciones="props">
				<q-td :props="props">
					<q-btn @click="cargarProveedorParaEdicion(props.row)">
						✏️
						<q-tooltip> Editar Proveedor </q-tooltip>
					</q-btn>
					<q-btn v-if="props.row.estado == 1" @click="editarEstado(props.row)">
						❌
						<q-tooltip> Inactivar Proveedor </q-tooltip>
					</q-btn>
					<q-btn v-else @click="editarEstado(props.row)">
						✅
						<q-tooltip> Activar Proveedor </q-tooltip>
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
