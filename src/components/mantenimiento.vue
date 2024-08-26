<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useStoreMantenimiento } from "../stores/mantenimiento.js";
import { useQuasar } from "quasar";

const $q = useQuasar();
const useMantenimiento = useStoreMantenimiento();

const opcionesTabla = ["Todos", "Fechas", "Herramienta", "Responsable"];

const herramientas = ref([]);
const gastos = ref([]);
const rows = ref([]);
const columns = ref([
	{
		name: "fecha",
		label: "Fecha",
		field: (row) => {
			const fechaa = `${row.fecha}`;
			return fechaa.split("T")[0];
		},
		align: "center",
		sortable: true,
	},
	{
		name: "gastos",
		label: "Gastos",
		field: (row) =>
			row.gastos_id
				? `${row.gastos_id.nombre} (num factura:${row.gastos_id.numeroFactura})`
				: "",
		align: "center",
		sortable: true,
	},
	{
		name: "herramienta",
		label: "Herramienta",
		field: (row) => (row.id_herramienta ? row.id_herramienta.nombre : ""),
		align: "center",
		sortable: true,
	},
	{
		name: "verificacionRealizada",
		label: "Verificación Realizada",
		field: "verificacionRealizada",
		align: "center",
		sortable: true,
	},
	{
		name: "calibracion",
		label: "Calibración",
		field: "calibracion",
		align: "center",
		sortable: true,
	},
	{
		name: "responsable",
		label: "Responsable",
		field: "responsable",
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
		name: "opciones",
		label: "Opciones",
		field: "opciones",
		align: "center",
	},
]);

const fechaMantenimiento = ref("");
const verificacionRealizada = ref("");
const calibracion = ref("");
const responsable = ref("");
const observaciones = ref("");
const gasto = ref("");

const opcionTabla = ref("Todos");

const fechaInicio = ref("");
const fechaFin = ref("");
const herramienta = ref("");
const responsableFiltro = ref("");

const datos = ref([]);

const mostrarFormularioMantenimiento = ref(false);
const mostrarBotonEditar = ref(false);
const loading = ref(true);

const opcionesHerramientas = computed(() => {
	return herramientas.value.map((herramienta) => {
		return { label: herramienta.nombre, id: herramienta._id };
	});
});

const opcionesGastos = computed(() => {
	return gastos.value.map((gastos) => {
		return {
			label: `${gastos.nombre} (num. factura:${gastos.numeroFactura})`,
			id: gastos._id,
		};
	});
});

const opcionesResponsables = computed(() => {
	return rows.value.map((responsable) => {
		return { label: responsable.responsable, id: responsable.responsable };
	});
});

async function listarGastos() {
	try {
		loading.value = true;
		const r = await useMantenimiento.getGastos();
		gastos.value = r.data.gastos;
	} finally {
		loading.value = false;
	}
}

async function listarHerramientas() {
	try {
		loading.value = true;
		const r = await useMantenimiento.getHerramientas();
		herramientas.value = r.data.maquinariaH;
	} finally {
		loading.value = false;
	}
}

async function listarMantenimiento() {
	try {
		loading.value = true;
		const r = await useMantenimiento.getMantenimientos();
		rows.value = r.data.mantenimientos;
	} finally {
		loading.value = false;
	}
}

async function listarMantenimientoFechas() {
	if (fechaInicio.value && fechaFin.value) {
		try {
			loading.value = true;
			const r = await useMantenimiento.getMantenimientosFechas(
				fechaInicio.value,
				fechaFin.value
			);
			rows.value = r.data.mantenimiento;
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

async function listarMantenimientoHerramienta() {
	if (herramienta.value) {
		try {
			loading.value = true;
			const r = await useMantenimiento.getMantenimientosHerramientas(
				herramienta.value.id
			);
			rows.value = r.data.herramienta;
		} finally {
			loading.value = false;
		}
	} else {
		$q.notify({
			type: "negative",
			message: "Selecciona una herramienta",
			position: "bottom",
		});
	}
}

async function listarMantenimientoResponsable() {
	if (responsableFiltro.value) {
		try {
			loading.value = true;
			const r = await useMantenimiento.getMantenimientosResponsable(
				responsableFiltro.value.id
			);
			rows.value = r.data.responsable;
		} finally {
			loading.value = false;
		}
	} else {
		$q.notify({
			type: "negative",
			message: "Selecciona un responsable",
			position: "bottom",
		});
	}
}

async function registrar() {
	if (validarDatos()) {
		try {
			loading.value = true;
			const info = {
				fecha: fechaMantenimiento.value,
				verificacionRealizada: verificacionRealizada.value,
				calibracion: calibracion.value,
				responsable: responsable.value,
				observaciones: observaciones.value,
				id_herramienta: herramienta.value.id,
				gastos_id: gasto.value.id,
			};

			const res = await useMantenimiento.postMantenimiento(info);
			if (res.status === 200) {
				mostrarFormularioMantenimiento.value = false;
				listarMantenimiento();
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
				fecha: fechaMantenimiento.value,
				verificacionRealizada: verificacionRealizada.value,
				calibracion: calibracion.value,
				responsable: responsable.value,
				observaciones: observaciones.value,
				id_herramienta: herramienta.value.id,
				gastos_id: gasto.value.id,
			};

			const res = await useMantenimiento.putMantenimiento(
				datos.value._id,
				info
			);
			if (res.status === 200) {
				mostrarFormularioMantenimiento.value = false;
				listarMantenimiento();
			}
		} finally {
			loading.value = false;
		}
	}
}

function validarDatos() {
	let validacion = true;
	if (
		!fechaMantenimiento.value ||
		!verificacionRealizada.value ||
		!calibracion.value ||
		!responsable.value
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
	fechaMantenimiento.value = "";
	verificacionRealizada.value = "";
	calibracion.value = "";
	responsable.value = "";
	observaciones.value = "";
	herramienta.value = "";
	gasto.value = "";

	datos.value = obj;
	mostrarBotonEditar.value = false;
	if (obj != null && boolean == true) {
		fechaMantenimiento.value = datos.value.fecha.split("T")[0];
		verificacionRealizada.value = datos.value.verificacionRealizada;
		calibracion.value = datos.value.calibracion;
		responsable.value = datos.value.responsable;
		observaciones.value = datos.value.observaciones;
		herramienta.value = opcionesHerramientas.value.find(
			(h) => h.id == datos.value.id_herramienta._id
		);
		gasto.value = opcionesGastos.value.find(
			(g) => g.id == datos.value.gastos_id._id
		);

		mostrarBotonEditar.value = true;
	}
	mostrarFormularioMantenimiento.value = boolean;
}

watch(opcionTabla, (newValue) => {
	if (newValue === "Todos") {
		listarMantenimiento();
	}
});

function estadoTabla() {
	if (opcionTabla.value == "Fechas") {
		console.log(fechaFin.value);
		listarMantenimientoFechas();
	} else if (opcionTabla.value == "Herramienta") {
		listarMantenimientoHerramienta();
	} else if (opcionTabla.value == "Responsable") {
		listarMantenimientoResponsable();
	} else {
		listarMantenimiento();
	}
}

onMounted(() => {
	listarGastos();
	listarHerramientas();
	listarMantenimiento();
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
			title="Mantenimiento"
			:rows="rows"
			:columns="columns"
			row-key="id"
			:loading="loading">
			<template v-slot:top>
				<q-input
					v-if="opcionTabla == 'Fechas'"
					v-model="fechaInicio"
					type="date"
					label="Fecha Inicio" />
				<q-input
					v-if="opcionTabla == 'Fechas'"
					v-model="fechaFin"
					type="date"
					label="Fecha Fin" />
				<q-select
					v-if="opcionTabla == 'Herramienta'"
					v-model="herramienta"
					:options="opcionesHerramientas"
					label="Herramienta" />
				<q-btn
					v-if="opcionTabla != 'Todos'"
					label="Realizar"
					@click="estadoTabla()" />
				<q-select
					filled
					v-model="opcionTabla"
					:options="opcionesTabla"
					label="Filtrar por" />
			</template>
			<template v-slot:body-cell-opciones="props">
				<q-td :props="props">
					<q-btn
						@click="controlFormulario(props.row, true)"
						color="primary"
						label="Editar" />
				</q-td>
			</template>
		</q-table>

		<q-dialog v-model="mostrarFormularioMantenimiento">
			<q-card>
				<q-card-section>
					<div class="text-h6">
						{{
							mostrarBotonEditar
								? "Editar Mantenimiento"
								: "Agregar Mantenimiento"
						}}
					</div>
				</q-card-section>
				<q-card-section>
					<q-input
						v-model="fechaMantenimiento"
						type="date"
						label="Fecha" />
					<q-input
						v-model="verificacionRealizada"
						label="Verificación Realizada" />
					<q-input v-model="calibracion" label="Calibración" />
					<q-select
						v-model="herramienta"
						:options="opcionesHerramientas"
						label="Herramienta" />
					<q-select
						v-model="gasto"
						:options="opcionesGastos"
						label="Gatos" />
					<q-input v-model="responsable" label="Responsable" />
					<q-input v-model="observaciones" label="Observaciones" />
				</q-card-section>
				<q-card-actions>
					<q-btn
						@click="mostrarFormularioMantenimiento = false"
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
