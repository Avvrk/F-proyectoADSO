<script setup>
import { ref, onMounted, computed } from "vue";
import { useStoreControl_plagas } from "../stores/control_plagas.js";
import { useQuasar } from "quasar";

const $q = useQuasar();

const useControlPlaga = useStoreControl_plagas();

const cultivos = ref([]);
const empleados = ref([]);
const rows = ref([]);
const columns = ref([
	{
		name: "id_cultivo",
		label: "Cultivo",
		field: (row) =>
			`${row.id_cultivo.nombre} (tipo: ${row.id_cultivo.tipo})`,
		align: "center",
		sortable: true,
	},
	{
		name: "empleado_id",
		label: "Empleado",
		field: (row) =>
			`${row.empleado_id.nombre} (dni: ${row.empleado_id.documento})`,
		align: "center",
	},
	{
		name: "fecha",
		label: "Fecha",
		field: (row) => {
			return row.fecha.split("T")[0];
		},
		align: "center",
		sortable: true,
	},
	{
		name: "tipoCultivo",
		label: "Tipo Cultivo",
		field: "tipoCultivo",
		align: "center",
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
		name: "ingredientesActivo",
		label: "Ingredientes Activo",
		field: "ingredientesActivo",
		align: "center",
		sortable: true,
	},
	{
		name: "dosis",
		label: "Dosis",
		field: "dosis",
		align: "center",
		sortable: true,
	},
	{
		name: "operario",
		label: "Operario",
		field: "operario",
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

const cultivoControlPlagas = ref("");
const empleadoControlPlagas = ref("");
const fechaControlPlagas = ref("");
const tipoCultivoControlPlagas = ref("");
const nombreControlPlagas = ref("");
const tipoControlPlagas = ref("");
const ingredientesActivoControlPlagas = ref("");
const dosisControlPlagas = ref("");
const operarioControlPlagas = ref("");
const observacionesControlPlagas = ref("");

const datos = ref([]);

const opcionesTabla = ["Todos", "Fechas", "Tipo", "Operario"];
const opcionTabla = ref("Todos");
const operario = ref("");
const fechaInicio = ref("");
const fechaFin = ref("");
const tipo = ref("");

const mostrarFormularioControlPlaga = ref(false);
const mostrarBotonEditar = ref(false);
const mostrarInputFecha = ref(false);
const mostrarInputOperario = ref(false);
const mostrarSelectTipo = ref(false);
const mostrarInput = ref(false);
const loading = ref(false);

const tipoS = ['fitosanitario', 'normal'];

const opcionesCultivos = computed(() => {
	return cultivos.value.map((c) => {
		return { label: `${c.nombre} (tipo: ${c.tipo})`, id: c._id };
	});
});

const opcionesEmpleados = computed(() => {
	return empleados.value.map((e) => {
		return { label: `${e.nombre} (dni: ${e.documento})`, id: e._id };
	});
});

async function listarCultivos() {
	try {
		loading.value = true;
		const r = await useControlPlaga.getCultivos();
		cultivos.value = r.data.cultivos;
	} finally {
		loading.value = false;
	}
}

async function listarEmpleados() {
	try {
		loading.value = true;
		const r = await useControlPlaga.getEmpleados();
		empleados.value = r.data.empleados;
	} finally {
		loading.value = false;
	}
}

async function listarControlPlagas() {
	try {
		loading.value = true;
		const r = await useControlPlaga.getControlPlagas();
		rows.value = r.data.plagas;
	} finally {
		loading.value = false;
	}
}

async function listarControlPlagasFechas() {
	if (fechaInicio.value && fechaFin.value) {
		const inicio = new Date(fechaInicio.value);
		const fin = new Date(fechaFin.value);

		if (inicio > fin) {
			$q.notify({
				type: "negative",
				message:
					"La fecha de inicio no puede ser mayor que la fecha de fin.",
				position: "bottom",
			});
			return;
		}
		try {
			loading.value = true;
			const r = await useControlPlaga.getControlPlagasFechas(
				fechaInicio.value,
				fechaFin.value
			);
			rows.value = r.data.plagas;
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

async function listarControlPlagasOperario() {
	if (operario.value.trim()) {
		try {
			loading.value = true;
			const r = await useControlPlaga.getControlPlagasOperario(
				operario.value
			);
			rows.value = r.data.plagas;
		} finally {
			loading.value = false;
		}
	} else {
		$q.notify({
			type: "negative",
			message: "Llena el campo",
			position: "bottom",
		});
	}
}

async function listarControlPlagasTipo() {
	if (tipo.value) {
		try {
			loading.value = true;
			const r = await useControlPlaga.getControlPlagasTipo(tipo.value);
			rows.value = r.data.plagas;
		} finally {
			loading.value = false;
		}
	} else {
		$q.notify({
			type: "negative",
			message: "Llena el campo",
			position: "bottom",
		});
	}
}

async function registrar() {
	if (validarDatos()) {
		try {
			loading.value = true;
			const info = {
				id_cultivo: cultivoControlPlagas.value.id,
				empleado_id: empleadoControlPlagas.value.id,
				fecha: fechaControlPlagas.value,
				tipoCultivo: tipoCultivoControlPlagas.value,
				nombre: nombreControlPlagas.value,
				tipo: tipoControlPlagas.value,
				ingredientesActivo: ingredientesActivoControlPlagas.value,
				dosis: dosisControlPlagas.value,
				operario: operarioControlPlagas.value,
				observaciones: observacionesControlPlagas.value,
			};

			const res = await useControlPlaga.postControlPlagas(info);
			if (res.status === 200) {
				mostrarFormularioControlPlaga.value = false;
				listarControlPlagas();
				/* resultadosAnalisisSuelo = [] */
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
				id_cultivo: cultivoControlPlagas.value.id,
				empleado_id: empleadoControlPlagas.value.id,
				fecha: fechaControlPlagas.value,
				tipoCultivo: tipoCultivoControlPlagas.value,
				nombre: nombreControlPlagas.value,
				tipo: tipoControlPlagas.value,
				ingredientesActivo: ingredientesActivoControlPlagas.value,
				dosis: dosisControlPlagas.value,
				operario: operarioControlPlagas.value,
				observaciones: observacionesControlPlagas.value,
			};

			const res = await useControlPlaga.putControlPlagas(
				datos.value._id,
				info
			);
			if (res.status === 200) {
				mostrarFormularioControlPlaga.value = false;
				listarControlPlagas();
				/* resultadosAnalisisSuelo = [] */
			}
		} finally {
			loading.value = false;
		}
	}
}

function validarDatos() {
	let validacion = true;
	if (
		!cultivoControlPlagas.value &&
		!empleadoControlPlagas.value &&
		!fechaControlPlagas.value &&
		!tipoCultivoControlPlagas.value.trim() &&
		!nombreControlPlagas.value.trim() &&
		!tipoControlPlagas.value &&
		!ingredientesActivoControlPlagas.value.trim() &&
		!dosisControlPlagas.value.trim() &&
		!operarioControlPlagas.value.trim() &&
		!observacionesControlPlagas.value.trim()
	) {
		$q.notify({
			type: "negative",
			message: "Llena todos los campos",
			position: "bottom",
		});
		validacion = false;
	} else {
		if (!cultivoControlPlagas.value) {
			$q.notify({
				type: "negative",
				message: "El cultivo esta vacio",
				position: "bottom",
			});
			validacion = false;
		}
		if (!empleadoControlPlagas.value) {
			$q.notify({
				type: "negative",
				message: "El empleado esta vacio",
				position: "bottom",
			});
			validacion = false;
		}
		if (!fechaControlPlagas.value) {
			$q.notify({
				type: "negative",
				message: "La fecha esta vacia",
				position: "bottom",
			});
			validacion = false;
		}
		if (!tipoCultivoControlPlagas.value.trim()) {
			$q.notify({
				type: "negative",
				message: "El tipo del cultivo esta vacio",
				position: "bottom",
			});
			validacion = false;
		}
		if (!nombreControlPlagas.value.trim()) {
			$q.notify({
				type: "negative",
				message: "El nombre esta vacio",
				position: "bottom",
			});
			validacion = false;
		}
		if (!tipoControlPlagas.value) {
			$q.notify({
				type: "negative",
				message: "El tipo esta vacio",
				position: "bottom",
			});
			validacion = false;
		}
		if (!ingredientesActivoControlPlagas.value.trim()) {
			$q.notify({
				type: "negative",
				message: "El ingrediente activo esta vacio",
				position: "bottom",
			});
			validacion = false;
		}
		if (!dosisControlPlagas.value.trim()) {
			$q.notify({
				type: "negative",
				message: "La dosis esta vacia",
				position: "bottom",
			});
			validacion = false;
		} else if (isNaN(Number(dosisControlPlagas.value))) {
			$q.notify({
				type: "negative",
				message: "La dosis debe ser un numero",
				position: "bottom",
			});
			validacion = false;
		}
		if (!operarioControlPlagas.value.trim()) {
			$q.notify({
				type: "negative",
				message: "El operario esta vacio",
				position: "bottom",
			});
			validacion = false;
		}
		if (!observacionesControlPlagas.value.trim()) {
			$q.notify({
				type: "negative",
				message: "La observacion esta vacia",
				position: "bottom",
			});
			validacion = false;
		}
	}
	return validacion;
}

function controlFormulario(obj, boolean) {
	cultivoControlPlagas.value = "";
	empleadoControlPlagas.value = "";
	fechaControlPlagas.value = "";
	tipoCultivoControlPlagas.value = "";
	nombreControlPlagas.value = "";
	tipoControlPlagas.value = "";
	ingredientesActivoControlPlagas.value = "";
	dosisControlPlagas.value = "";
	operarioControlPlagas.value = "";
	observacionesControlPlagas.value = "";

	datos.value = obj;
	mostrarBotonEditar.value = false;
	if (obj != null && boolean == true) {
		cultivoControlPlagas.value = opcionesCultivos.value.find(
			(c) => c.id == datos.value.id_cultivo._id
		);
		empleadoControlPlagas.value = opcionesEmpleados.value.find(
			(e) => e.id == datos.value.empleado_id._id
		);
		fechaControlPlagas.value = datos.value.fecha.split("T")[0];
		tipoCultivoControlPlagas.value = datos.value.tipoCultivo;
		nombreControlPlagas.value = datos.value.nombre;
		tipoControlPlagas.value = datos.value.tipo;
		ingredientesActivoControlPlagas.value = datos.value.ingredientesActivo;
		dosisControlPlagas.value = String(datos.value.dosis);
		operarioControlPlagas.value = datos.value.operario;
		observacionesControlPlagas.value = datos.value.observaciones;

		mostrarBotonEditar.value = true;
	}
	mostrarFormularioControlPlaga.value = boolean;
}

onMounted(() => {
	listarCultivos();
	listarEmpleados();
	listarControlPlagas();
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
			title="Control Plagas"
			:rows="rows"
			:columns="columns"
			row-key="id">
			<template v-slot:body-cell-opciones="props">
				<q-td :props="props">
					<q-btn @click="controlFormulario(props.row, true)">
						✏️
					</q-btn>
				</q-td>
			</template>
		</q-table>
		<q-dialog v-model="mostrarFormularioControlPlaga">
			<q-card>
				<q-form
					@submit="mostrarBotonEditar ? editar() : registrar()"
					class="q-gutter-md">
					<q-select
						standout="bg-green text-white"
						:options="opcionesCultivos"
						label="Cultivo"
						v-model="cultivoControlPlagas" />
					<q-select
						standout="bg-green text-white"
						:options="opcionesEmpleados"
						label="Empleado"
						v-model="empleadoControlPlagas" />
					<q-input
						standout="bg-green text-white"
						type="date"
						label="Fecha"
						v-model="fechaControlPlagas" />
					<q-input
						standout="bg-green text-white"
						type="text"
						label="Tipo Cultivo"
						v-model="tipoCultivoControlPlagas" />
					<q-input
						standout="bg-green text-white"
						type="text"
						label="Nombre"
						v-model="nombreControlPlagas" />
					<q-select
						standout="bg-green text-white"
						:options="tipoS"
						label="Tipo"
						v-model="tipoControlPlagas" />
					<q-input
						standout="bg-green text-white"
						type="text"
						label="Ingrediente Activo"
						v-model="ingredientesActivoControlPlagas" />
					<q-input
						standout="bg-green text-white"
						type="text"
						label="Dosis"
						v-model="dosisControlPlagas" />
					<q-input
						standout="bg-green text-white"
						type="text"
						label="Operario"
						v-model="operarioControlPlagas" />
					<q-input
						standout="bg-green text-white"
						type="text"
						label="Observaciones"
						v-model="observacionesControlPlagas" />
					<div>
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
							label="Cerrar"
							type="button" />
					</div>
				</q-form>
			</q-card>
		</q-dialog>
	</div>
</template>

<style scoped></style>
