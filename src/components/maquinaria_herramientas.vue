<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useStoreMaquinaria } from "../stores/maquinaria_herramientas.js";
import { useQuasar } from "quasar";

const $q = useQuasar();
const useMaquinaria = useStoreMaquinaria();

const opcionesTabla = ["Todos", "Activos", "Inactivos", "Fechas", "Tipo"];

const proveedores = ref([]);
const rows = ref([]);
const columns = ref([
	{
		name: "nombre",
		label: "Nombre",
		field: "nombre",
		align: "center",
		sortable: true,
	},
	{
		name: "tipo",
		label: "Tipo",
		field: "tipo",
		align: "center",
		sortable: true,
	},
	{
		name: "fechaCompra",
		label: "Fecha de Compra",
		field: (row) => `${row.fechaCompra}`.split("T")[0],
		align: "center",
		sortable: true,
	},
	{
		name: "cantidad",
		label: "Cantidad",
		field: "cantidad",
		align: "center",
		sortable: true,
	},
	{
		name: "total",
		label: "Total",
		field: "total",
		align: "center",
		sortable: true,
	},
	{
		name: "estado",
		label: "Estado",
		field: (row) => (row.estado === 1 ? "Activo" : "Inactivo"),
		align: "center",
		sortable: true,
	},
	{
		name: "opciones",
		label: "Opciones",
		field: "opciones",
		align: "center",
	},
]);

const nombre = ref("");
const tipo = ref("");
const fechaCompra = ref("");
const observaciones = ref("");
const cantidad = ref("");
const total = ref("");
const proveedor = ref("");

const datos = ref([]);

const opcionTabla = ref("Todos");
const fechaInicio = ref("");
const fechaFin = ref("");
const tipoFiltro = ref("");

const mostrarInput = ref(false);
const mostrarInputFechas = ref(false);
const mostrarInputTipo = ref(false);
const mostrarFormularioMaquinaria = ref(false);
const mostrarBotonEditar = ref(false);
const loading = ref(true);

const opcionesProveedores = computed(() => {
	return proveedores.value.map((proveedor) => {
		return { label: proveedor.nombre, id: proveedor._id };
	});
});

async function listarProveedore() {
	try {
		loading.value = true;
		const r = await useMaquinaria.getProveedores();
		proveedores.value = r.data.proveedores;
	} finally {
		loading.value = false;
	}
}

async function listarMaquinaria() {
	try {
		loading.value = true;
		const r = await useMaquinaria.getMaquinaria();
		rows.value = r.data.maquinariaH;
	} finally {
		loading.value = false;
	}
}

async function listarMaquinariaActivo() {
	try {
		loading.value = true;
		const r = await useMaquinaria.getMaquinariaActivos();
		rows.value = r.data.maquinariaH;
	} finally {
		loading.value = false;
	}
}

async function listarMaquinariaInactivo() {
	try {
		loading.value = true;
		const r = await useMaquinaria.getMaquinariaInactivos();
		rows.value = r.data.maquinariaH;
	} finally {
		loading.value = false;
	}
}

async function listarMaquinariaFechas() {
	if (fechaInicio.value && fechaFin.value) {
		try {
			loading.value = true;
			const r = await useMaquinaria.getMaquinariaFechas(
				fechaInicio.value,
				fechaFin.value
			);
			rows.value = r.data.maquinariaH;
		} finally {
			loading.value = false;
		}
	} else {
		$q.notify({
			type: "negative",
			message: "Llena los campos",
			position: "bottom",
		});
	}
}

async function listarMaquinariaTipo() {
	if (tipoFiltro.value) {
		try {
			loading.value = true;
			const r = await useMaquinaria.getMaquinariaTipo(tipoFiltro.value);
			rows.value = r.data.maquinariaH;
		} finally {
			loading.value = false;
		}
	} else {
		$q.notify({
			type: "negative",
			message: "Selecciona un tipo",
			position: "bottom",
		});
	}
}

async function editarEstado(elemento) {
	try {
		loading.value = true;
		if (elemento.estado === 1) {
			await useMaquinaria.putMaquinariaInactivar(elemento._id);
		} else if (elemento.estado === 0) {
			await useMaquinaria.putMaquinariaActivar(elemento._id);
		}
		listarMaquinaria();
	} finally {
		loading.value = false;
	}
}

async function registrar() {
	if (validarDatos()) {
		try {
			loading.value = true;
			const info = {
				proveedores_id: proveedor.value.id,
				nombre: nombre.value,
				tipo: tipo.value,
				fechaCompra: fechaCompra.value,
				observaciones: observaciones.value,
				cantidad: cantidad.value,
				total: total.value,
			};

			const res = await useMaquinaria.postMaquinaria(info);
			if (res.status === 200) {
				mostrarFormularioMaquinaria.value = false;
				listarMaquinaria();
			}
		} finally {
			loading.value = false;
		}
	}
}

async function editar() {
	if (validarDatos()) {
		try {
			loading.value = true;
			const info = {
				proveedores_id: proveedor.value.id,
				nombre: nombre.value,
				tipo: tipo.value,
				fechaCompra: fechaCompra.value,
				observaciones: observaciones.value,
				cantidad: cantidad.value,
				total: total.value,
			};

			const res = await useMaquinaria.putMaquinaria(
				datos.value._id,
				info
			);
			if (res.status === 200) {
				mostrarFormularioMaquinaria.value = false;
				listarMaquinaria();
			}
		} finally {
			loading.value = false;
		}
	}
}

function validarDatos() {
	let validacion = true;
	if (
		!nombre.value ||
		!tipo.value ||
		!fechaCompra.value ||
		!cantidad.value ||
		!total.value ||
		!proveedor.value
	) {
		$q.notify({
			type: "negative",
			message: "Llena todos los campos obligatorios",
			position: "bottom",
		});
		validacion = false;
	}
	return validacion;
}

function controlFormulario(obj, boolean) {
	nombre.value = "";
	tipo.value = "";
	fechaCompra.value = "";
	observaciones.value = "";
	cantidad.value = "";
	total.value = "";
	proveedor.value = "";

	datos.value = obj;
	mostrarBotonEditar.value = false;
	if (obj != null && boolean == true) {
		nombre.value = datos.value.nombre;
		tipo.value = datos.value.tipo;
		fechaCompra.value = datos.value.fechaCompra.split("T")[0];
		observaciones.value = datos.value.observaciones;
		cantidad.value = datos.value.cantidad;
		total.value = datos.value.total;
		proveedor.value = opcionesProveedores.value.find(
			(p) => p.id == datos.value.proveedores_id
		);

		mostrarBotonEditar.value = true;
	}
	mostrarFormularioMaquinaria.value = boolean;
}

function estadoTabla() {
	if (opcionTabla.value == "Activos") {
		mostrarInputTipo.value = false;
		mostrarInputFechas.value = false;
		mostrarInput.value = false;
		listarMaquinariaActivo();
	} else if (opcionTabla.value == "Inactivos") {
		mostrarInputTipo.value = false;
		mostrarInputFechas.value = false;
		mostrarInput.value = false;
		listarMaquinariaInactivo();
	} else if (opcionTabla.value == "Fechas") {
		mostrarInputTipo.value = false;
		mostrarInputFechas.value = true;
		mostrarInput.value = true;
	} else if (opcionTabla.value == "Tipo") {
		mostrarInputTipo.value = true;
		mostrarInputFechas.value = false;
		mostrarInput.value = true;
	} else {
		mostrarInputTipo.value = false;
		mostrarInputFechas.value = false;
		mostrarInput.value = false;
		listarMaquinaria();
	}
}

onMounted(() => {
	listarProveedore();
	listarMaquinaria();
});
</script>

<template>
	<div>
		<div>
			<q-btn @click="controlFormulario(null, true)" label="Agregar" />
		</div>
		<q-table
			flat
			bordered
			title="Maquinaria y Herramientas"
			:rows="rows"
			:columns="columns"
			row-key="id"
			:loading="loading">
			<template v-slot:top>
				<q-select
					v-if="mostrarInputTipo"
					v-model="tipoFiltro"
					:options="opcionesTipos"
					label="Tipo" />
				<q-input
					v-if="mostrarInputFechas"
					v-model="fechaInicio"
					type="date"
					label="Fecha Inicio" />
				<q-input
					v-if="mostrarInputFechas"
					v-model="fechaFin"
					type="date"
					label="Fecha Fin" />
				<q-btn
					v-if="mostrarInput"
					label="Realizar"
					@click="
						mostrarInputTipo
							? listarMaquinariaTipo()
							: mostrarInputFechas
							? listarMaquinariaFechas()
							: ''
					" />
				<q-select
					filled
					v-model="opcionTabla"
					:options="opcionesTabla"
					label="Filtrar por"
					@update:model-value="estadoTabla" />
			</template>
			<template v-slot:body-cell-opciones="props">
				<q-td :props="props">
					<q-btn
						@click="controlFormulario(props.row, true)"
						color="primary"
						label="Editar" />
					<q-btn
						@click="editarEstado(props.row)"
						color="secondary"
						label="Cambiar Estado" />
				</q-td>
			</template>
		</q-table>

		<q-dialog v-model="mostrarFormularioMaquinaria">
			<q-card>
				<q-card-section>
					<div class="text-h6">
						{{
							mostrarBotonEditar
								? "Editar Maquinaria y Herramientas"
								: "Agregar Maquinaria y Herramientas"
						}}
					</div>
				</q-card-section>
				<q-card-section>
					<q-input v-model="nombre" label="Nombre" />
					<q-select
						v-model="proveedor"
						:options="opcionesProveedores"
						label="Proveedor" />
					<q-input v-model="tipo" label="Tipo" />
					<q-input
						v-model="fechaCompra"
						type="date"
						label="Fecha de Compra" />
					<q-input v-model="observaciones" label="Observaciones" />
					<q-input
						v-model="cantidad"
						label="Cantidad"
						type="number" />
					<q-input v-model="total" label="Total" type="number" />
				</q-card-section>
				<q-card-actions>
					<q-btn
						@click="mostrarFormularioMaquinaria = false"
						color="secondary"
						label="Cancelar" />
					<q-btn
						@click="mostrarBotonEditar ? editar() : registrar()"
						color="primary"
						label="Guardar" />
				</q-card-actions>
			</q-card>
		</q-dialog>
	</div>
</template>

<style scoped>
/* Agrega estilos personalizados aquí si es necesario */
</style>
