<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useStoreInventario } from "../stores/inventario.js";
import { useQuasar } from "quasar";

const $q = useQuasar();

const useInventario = useStoreInventario();

const opcionesTabla = ["Todos", "Fechas"];

const tipos = ref([]);
const semilla = ref([]);
const insumo = ref([]);
const maquina = ref([]);
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
		name: "tipo",
		label: "Tipo",
		field: "tipo",
		align: "center",
		sortable: true,
	},
	{
		name: "observacion",
		label: "Observación",
		field: "observacion",
		align: "center",
		sortable: true,
	},
	{
		name: "unidad",
		label: "Unidad",
		field: "unidad",
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
		name: "semillas_id",
		label: "Semilla",
		field: (row) =>
			row.semillas_id ? row.semillas_id.especieVariedad : "?",
		align: "center",
		sortable: true,
	},
	{
		name: "insumos_id",
		label: "Insumo",
		field: (row) => (row.insumos_id ? row.insumos_id.nombre : "?"),
		align: "center",
		sortable: true,
	},
	{
		name: "maquinaria_id",
		label: "Maquinaria",
		field: (row) =>
			row.maquinaria_id
				? `${row.maquinaria_id.nombre} (tipo:${row.maquinaria_id.tipo})`
				: "?",
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

const fechaInventario = ref("");
const tipoInventario = ref("");
const observacionInventario = ref("");
const unidadInventario = ref("");
const cantidadInventario = ref(0);
const semillasInventario = ref("");
const insumosInventario = ref("");
const maquinariaInventario = ref("");

const opcionTabla = ref("Todos");

const fechaInicio = ref("");
const fechaFin = ref("");
// const tipo = ref("");

const datos = ref([]);

const mostrarFormularioInventario = ref(false);
const mostrarBotonEditar = ref(false);
const loading = ref(true);

// const opcionesTipos = computed(() => {
// 	return tipos.value.map((tipo) => {
// 		return { label: tipo, value: tipo };
// 	});
// });

const opcionesSemillas = computed(() => {
	return semilla.value.map((s) => {
		return { label: `${s.especieVariedad}`, id: `${s._id}` };
	});
});

const opcionesInsumos = computed(() => {
	return insumo.value.map((i) => {
		return { label: `${i.nombre}`, id: `${i._id}` };
	});
});

const opcionesMaquinaria = computed(() => {
	return maquina.value.map((m) => {
		return { label: `${m.nombre} (tipo: ${m.tipo})`, id: `${m._id}` };
	});
});

async function listarsemilla() {
	try {
		loading.value = true;
		const r = await useInventario.getSemillas();
		semilla.value = r.data.semillas;
	} finally {
		loading.value = false;
	}
}

async function listarinsumos() {
	try {
		loading.value = true;
		const r = await useInventario.getInsumos();
		insumo.value = r.data.insumos;
	} finally {
		loading.value = false;
	}
}

async function listarmaquinariaHerramienta() {
	try {
		loading.value = true;
		const r = await useInventario.getMaquinaria();
		maquina.value = r.data.maquinariaH;
	} finally {
		loading.value = false;
	}
}

async function listarInventario() {
	try {
		loading.value = true;
		const r = await useInventario.getInventario();
		rows.value = r.data.inventario;
	} finally {
		loading.value = false;
	}
}

async function listarInventarioFechas() {
	if (fechaInicio.value && fechaFin.value) {
		try {
			loading.value = true;
			const r = await useInventario.getInventarioFechas(
				fechaInicio.value,
				fechaFin.value
			);
			rows.value = r.data.inventario;
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

// async function listarInventarioTipo() {
// 	if (tipo.value) {
// 		try {
// 			loading.value = true;
// 			const r = await useInventario.getInventarioTipo(tipo.value);
// 			rows.value = r.data.inventario;
// 		} finally {
// 			loading.value = false;
// 		}
// 	} else {
// 		$q.notify({
// 			type: "negative",
// 			message: "Selecciona un tipo",
// 			position: "bottom",
// 		});
// 	}
// }

async function registrar() {
	if (validarDatos()) {
		try {
			loading.value = true;
			const info = {
				fecha: fechaInventario.value,
				tipo: tipoInventario.value,
				observacion: observacionInventario.value,
				unidad: unidadInventario.value,
				cantidad: cantidadInventario.value,
				semillas_id: semillasInventario.value
					? semillasInventario.value.id
					: null,
				insumos_id: insumosInventario.value
					? insumosInventario.value.id
					: null,
				maquinaria_id: maquinariaInventario.value
					? maquinariaInventario.value.id
					: null,
			};

			console.log(info);

			const res = await useInventario.postInventario(info);
			if (res.status === 200) {
				mostrarFormularioInventario.value = false;
				listarInventario();
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
				fecha: fechaInventario.value,
				tipo: tipoInventario.value,
				observacion: observacionInventario.value,
				unidad: unidadInventario.value,
				cantidad: cantidadInventario.value,
				semillas_id: semillasInventario.value
					? semillasInventario.value.id
					: null,
				insumos_id: insumosInventario.value
					? insumosInventario.value.id
					: null,
				maquinaria_id: maquinariaInventario.value
					? maquinariaInventario.value.id
					: null,
			};

			const res = await useInventario.putInventario(
				datos.value._id,
				info
			);
			if (res.status === 200) {
				mostrarFormularioInventario.value = false;
				listarInventario();
			}
		} finally {
			loading.value = false;
		}
	}
}

function validarDatos() {
	let validacion = true;
	if (
		!fechaInventario.value ||
		!tipoInventario.value ||
		!unidadInventario.value ||
		!cantidadInventario.value
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
	fechaInventario.value = "";
	tipoInventario.value = "";
	observacionInventario.value = "";
	unidadInventario.value = "";
	cantidadInventario.value = 0;
	semillasInventario.value = "";
	insumosInventario.value = "";
	maquinariaInventario.value = "";

	datos.value = obj;
	mostrarBotonEditar.value = false;
	if (obj != null && boolean == true) {
		fechaInventario.value = datos.value.fecha.split("T")[0];
		tipoInventario.value = datos.value.tipo;
		observacionInventario.value = datos.value.observacion;
		unidadInventario.value = datos.value.unidad;
		cantidadInventario.value = datos.value.cantidad;
		semillasInventario.value = datos.value.semillas_id
			? opcionesSemillas.value.find(
					(s) => s.id == datos.value.semillas_id
			  )
			: "";
		insumosInventario.value = datos.value.insumos_id
			? opcionesInsumos.value.find(
					(i) => i.id == datos.value.insumos_id._id
			  )
			: "";
		maquinariaInventario.value = datos.value.maquinaria_id
			? opcionesMaquinaria.value.find(
					(m) => m.id == datos.value.maquinaria_id
			  )
			: "";

		mostrarBotonEditar.value = true;
	}
	mostrarFormularioInventario.value = boolean;
}

watch(opcionTabla, (newValue) => {
	if (newValue === "Todos") {
		listarInventario();
	}
});

function estadoTabla() {
	if (opcionTabla.value == "Fechas") {
		listarInventarioFechas();
	} else {
		listarInventario();
	}
}

onMounted(() => {
	listarInventario();
	listarinsumos();
	listarsemilla();
	listarmaquinariaHerramienta();
});
</script>

<template>
	<div>
		<div>
			<q-btn @click="controlFormulario(null, true)" label="Agregar" />
		</div>
		<div v-if="opcionTabla != 'Todos'">
			<q-btn label="Realizar" @click="estadoTabla()" />
		</div>
		<q-table
			flat
			bordered
			title="Inventario"
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
				<q-btn
					v-if="opcionTabla != 'Todos'"
					label="Buscar"
					@click="listarInventarioFechas()" />
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

		<q-dialog v-model="mostrarFormularioInventario">
			<q-card>
				<q-card-section>
					<div class="text-h6">
						{{
							mostrarBotonEditar
								? "Editar Inventario"
								: "Agregar Inventario"
						}}
					</div>
				</q-card-section>
				<q-card-section>
					<q-input
						v-model="fechaInventario"
						type="date"
						label="Fecha" />
					<q-input v-model="tipoInventario" label="Tipo" />
					<q-input
						v-model="observacionInventario"
						label="Observación" />
					<q-input v-model="unidadInventario" label="Unidad" />
					<q-input
						v-model="cantidadInventario"
						type="number"
						label="Cantidad" />
					<q-select
						v-model="semillasInventario"
						:options="opcionesSemillas"
						label="Semilla" />
					<q-select
						v-model="insumosInventario"
						:options="opcionesInsumos"
						label="Insumo" />
					<q-select
						v-model="maquinariaInventario"
						:options="opcionesMaquinaria"
						label="Maquinaria" />
				</q-card-section>
				<q-card-actions>
					<q-btn
						@click="mostrarFormularioInventario = false"
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
