<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useStoreMaquinaria } from "../stores/maquinaria_herramientas.js";
import notify from "../utils/notificaciones.js";

const useMaquinaria = useStoreMaquinaria();

const opcionesTabla = ["Todos", "Activos", "Inactivos", "Fechas"];

const proveedores = ref([]);
const insumos = ref([]);
const empleados = ref([]);
const rows = ref([]);
const columns = ref([
	{
		name: "proveedores_id",
		label: "Proveedor",
		field: "proveedores_id",
		align: "center",
		sortable: true,
	},
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
		name: "observaciones",
		label: "Observaciones",
		field: "observaciones",
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
		name: "mantenimiento",
		label: "Mantenimiento",
		field: "mantenimiento",
		align: "center",
	},
	{
		name: "desinfeccion",
		label: "Desinfeccion",
		field: "desinfeccion",
		align: "center",
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

const proveedorMH = ref("");
const nombreMH = ref("");
const tipoMH = ref("");
const fechaCompraMH = ref("");
const observacionesMH = ref("");
const cantidadMH = ref("");
const totalMH = ref("");
const mantenimientoMH = ref("");
const fechaMantenimientoMH = ref("");
const responsableMantenimientoMH = ref("");
const observacionesMantenimientoMH = ref("");
const precioMantenimientoMH = ref("");
const desinfeccinonMH = ref("");
const fechaDesinfeccionMH = ref("");
const insumoDesinfeccionMH = ref("");
const empleadoDesinfecionMH = ref("");

const datos = ref([]);

/* const opcionTabla = ref("Todos");
const fechaInicio = ref("");
const fechaFin = ref(""); */

/* const mostrarInput = ref(false);
const mostrarInputFechas = ref(false);
const mostrarInputTipo = ref(false); */
const mostrarFormularioMaquinaria = ref(false);
const mostrarBotonEditar = ref(false);
const loading = ref(true);

const opcionesProveedores = computed(() => {
	return proveedores.value.map((proveedor) => {
		return { label: proveedor.nombre, id: proveedor._id };
	});
});

const opcionesInsumos = computed(() => {
	return insumos.value.map((item) => {
		return { label: item.nombre, id: item._id };
	});
});

const opcionesEmpleados = computed(() => {
	return empleados.value.map((e) => {
		return { label: `${e.nombre} (dni: ${e.documento})`, id: e._id };
	});
});

async function listarProveedores() {
	try {
		loading.value = true;
		const r = await useMaquinaria.getProveedores();
		proveedores.value = r.data.proveedores;
	} finally {
		loading.value = false;
	}
}

async function listarInsumos() {
	try {
		loading.value = true;
		const r = await useMaquinaria.getInsumos();
		insumos.value = r.data.insumos;
	} finally {
		loading.value = false;
	}
}

async function listarEmpleados() {
	try {
		loading.value = true;
		const r = await useMaquinaria.getEmpleados();
		empleados.value = r.data.empleados;
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
		notify("Llena los campos");
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
	/* if (validarDatos()) { */
	try {
		loading.value = true;
		const info = {
			proveedores_id: proveedorMH.value.id,
			nombre: nombreMH.value,
			tipo: tipoMH.value,
			fechaCompra: fechaCompraMH.value,
			observaciones: observacionesMH.value,
			cantidad: cantidadMH.value,
		};

		const r = await useMaquinaria.postMaquinaria(info);
		if (r.status === 200) {
			mostrarFormularioMaquinaria.value = false;
			listarMaquinaria();
		} else if (r.response && r.response.data.errors) {
				r.response.data.errors.forEach((err) => {
					notify(err.msg);
				});
			} 
	} finally {
		loading.value = false;
	}
	/* } */
}

async function editar() {
	/* if (validarDatos()) { */
	try {
		loading.value = true;
		const info = {
			proveedores_id: proveedorMH.value.id,
			nombre: nombreMH.value,
			tipo: tipoMH.value,
			fechaCompra: fechaCompraMH.value,
			observaciones: observacionesMH.value,
			cantidad: cantidadMH.value,
			total: totalMH.value,
			mantenimiento: mantenimientoMH.value,
			desinfeccion: desinfeccinonMH.value,
		};

		const res = await useMaquinaria.putMaquinaria(datos.value._id, info);
		if (res.status === 200) {
			mostrarFormularioMaquinaria.value = false;
			listarMaquinaria();
		} else if (r.response && r.response.data.errors) {
				r.response.data.errors.forEach((err) => {
					notify(err.msg);
				});
			} 
	} finally {
		loading.value = false;
	}
	/* } */
}

/* function validarDatos() {
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
} */

function controlFormulario(obj, boolean) {
	proveedorMH.value = "";
	nombreMH.value = "";
	tipoMH.value = "";
	fechaCompraMH.value = "";
	observacionesMH.value = "";
	cantidadMH.value = "";
	tipoMH.value = "";

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

/* function estadoTabla() {
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
	} else {
		mostrarInputTipo.value = false;
		mostrarInputFechas.value = false;
		mostrarInput.value = false;
		listarMaquinaria();
	}
} */

onMounted(() => {
	listarProveedores();
	listarInsumos();
	listarEmpleados();
	listarMaquinaria();
});
</script>

<template>
	<div>
		<div class="q-pa-lg">
			<q-table
				:rows="rows"
				:columns="columns"
				row-key="id"
				:loading="loading">
				<template v-slot:top>
					<section class="column full-width q-pr-md">
						<div class="row items-center">
							<h1 class="text-h4 q-pl-xl text-green-7">
								Maquinaria y Herramientas
							</h1>
							<q-space />
							<q-btn
								size="md"
								@click="controlFormulario(null, true)"
								label="Agregar" />
						</div>
						<!-- <div class="row items-center q-pb-md">
							<q-space />
							<div class="row q-pr-xl q-gutter-lg">
								<q-input
									standout
									v-if="mostrarInputFechas"
									label="Fecha Inicio"
									type="date"
									v-model="fechaInicio" />
								<q-input
									standout
									v-if="mostrarInputFechas"
									label="Fecha Fin"
									type="date"
									v-model="fechaFin" />
								<q-btn
									v-if="mostrarInput"
									@click="
										mostrarInputFechas
											? listarMaquinariaFechas()
											: ''
									"
									label="Buscar" />
							</div>
							<q-select
								style="width: 200px"
								standout="bg-green text-while"
								:options="opcionesTabla"
								v-model="opcionTabla"
								label="Filtro por"
								@update:model-value="estadoTabla" />
						</div> -->
					</section>
				</template>
				<template v-slot:body-cell-estado="props">
					<q-td :props="props">
						<q-badge
							:color="props.row.estado === 1 ? 'green' : 'red'"
							align="top"
							:label="
								props.row.estado === 1 ? 'Activo' : 'Inactivo'
							" />
					</q-td>
				</template>
				<template v-slot:body-cell-opciones="props">
					<q-td
						:props="props"
						class="row justify-center"
						style="gap: 20px">
						<q-btn @click="controlFormulario(props.row, true)">
							✏️
						</q-btn>
						<q-btn
							v-if="props.row.estado == 1"
							@click="editarEstado(props.row)">
							❌
						</q-btn>
						<q-btn v-else @click="editarEstado(props.row)">
							✅
						</q-btn>
					</q-td>
				</template>
			</q-table>
		</div>

		<q-dialog v-model="mostrarFormularioMaquinaria">
			<q-card>
				<q-form
					@submit="mostrarBotonEditar ? editar() : registrar()"
					class="q-gutter-sm">
					<p class="text-h5 text-center q-pb-md text-green">
						{{ datos ? "Editar" : "Agregar" }} Maquinaria y
						Herramienta
					</p>
					<q-select
						standout="bg-green text-white"
						:options="opcionesProveedores"
						label="Proveedor"
						v-model="proveedorMH" />
					<q-input
						standout="bg-green text-white"
						type="text"
						label="Nombre"
						v-model="nombreMH" />
                    <q-input
						standout="bg-green text-white"
						type="text"
						label="Tipo"
						v-model="tipoMH" />
                    <q-input
						standout="bg-green text-white"
						type="date"
						label="Fecha de compra"
						v-model="fechaCompraMH" />
                    <q-input
                        autogrow
						standout="bg-green text-white"
						type="text"
						label="Observaciones"
						v-model="observacionesMH" />
                    <q-input
						standout="bg-green text-white"
						type="text"
						label="Cantidad"
						v-model="cantidadMH" />
					<div class="row justify-end" style="gap: 10px">
						<q-btn
							unelevated
							v-if="mostrarBotonEditar"
							label="Editar"
							type="submit"
							color="positive" />
						<q-btn
							unelevated
							v-else
							label="Registrar"
							type="submit"
							color="positive" />
						<q-btn
							@click="controlFormulario(null, false)"
							flat
							class="bg-red text-white"
							label="Cerrar"
							type="button" />
					</div>
				</q-form>
			</q-card>
		</q-dialog>
	</div>
</template>

<style scoped>
.q-card {
	background-color: rgb(255, 255, 255);
	padding: 40px 30px 40px 30px;
	border-radius: 1pc;
	width: 30rem;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	border: 0;
}

.q-form .q-input,
.q-form .q-select {
	margin-bottom: 15px;
}
</style>
