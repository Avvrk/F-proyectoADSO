<script setup>
import { ref, onMounted, computed } from "vue";
import { useStorePreparacionSuelos } from "../stores/preparacion_suelo.js";
import { Notify } from "quasar";

const usePS = useStorePreparacionSuelos();

// loading es el indicador de carga
const loading = ref(false);

// Variable que contendrá todos los datos al estar editando
const datos = ref([]);

// Variables que manejan lo que se muestra en pantalla
const mostrarFormularioPrepararSuelo = ref(false);
const mostrarBotonEditar = ref(false);

// Objeto que contiene las claves vacías que se llenarán antes de ser enviado al backend
const fechaPS = ref("");
const parcelaPS = ref("");
const empleadoPS = ref("");
const productosPs = [];
const ingredienteActivoProducto = ref("");
const dosisProducto = ref("");
const metodoAplicacionProducto = ref("");
const operarioPS = ref("");
const responsablePS = ref("");
const observacionesPS = ref("");

// Variables que contienen las listas de parcelas, empleados y filas de la tabla
const parcelas = ref([]);
const empleados = ref([]);
const rows = ref([]);
const rowsP = ref([]);

// Variables usadas para controlar la información de la tabla
const preparacionSuelos = ref([]);
const columns = [
	{
		name: "fecha",
		label: "Fecha",
		align: "center",
		field: (row) => `${row.fecha.split("T")[0]}`,
	},
	{
		name: "id_parcela",
		label: "Parcela",
		align: "center",
		field: "id_parcela",
	},
	{
		name: "empleado_id",
		label: "Empleado",
		align: "center",
		field: "empleado_id",
	},
	{
		name: "productos",
		label: "Productos",
		align: "center",
		field: "productos",
	},
	{
		name: "operario",
		label: "Operario",
		align: "center",
		field: "operario",
	},
	{
		name: "responsable",
		label: "Responsable",
		align: "center",
		field: "responsable",
	},
	{
		name: "observaciones",
		label: "Observaciones",
		align: "left",
		field: "observaciones",
	},
	{ name: "estado", label: "Estado", field: "estado", align: "center" },
	{
		name: "actions",
		label: "Acciones",
		align: "center",
		field: "actions",
	},
];

const columnsP = [
	{
		name: "ingredienteActivo",
		label: "Ingrediente Activo",
		align: "center",
		field: "ingredienteActivo",
	},
	{
		name: "dosis",
		label: "Dosis",
		align: "center",
		field: "dosis",
	},
	{
		name: "metodoAplicacion",
		label: "Metodo de Aplicacion",
		align: "center",
		field: "metodoAplicacion",
	},
];

// Variables que contienen los datos a buscar o filtrar en la tabla
const opcion = ref("Todos");

// Funciones computadas para generar el array a mostrar en el formulario
const opcionesParcelas = computed(() => {
	return parcelas.value.map((parcela) => {
		return {
			label: `${parcela.numero} (rut: ${parcela.rut})`,
			id: parcela._id,
		};
	});
});

const opcionesEmpleados = computed(() => {
	return empleados.value.map((empleado) => {
		return {
			label: `${empleado.nombre} (DNI: ${empleado.documento})`,
			id: empleado._id,
		};
	});
});

// Función para listar la preparación de suelos desde el backend
const listarPS = async () => {
	loading.value = true;
	try {
		const r = await usePS.getPreparacionSuelos();
		rows.value = preparacionSuelos.value;
	} finally {
		loading.value = false;
	}
};

// Funciones para cargar parcelas y empleados
const listarParcelas = async () => {
	loading.value = true;
	try {
		const r = await usePS.getParcelas();
		parcelas.value = r.data.parcelas;
	} finally {
		loading.value = false;
	}
};

const listarEmpleados = async () => {
	loading.value = true;
	try {
		const r = await usePS.getEmpleados();
		empleados.value = r.data.empleados;
	} finally {
		loading.value = false;
	}
};

// Función para agregar una nueva preparación de suelo
const registrar = async () => {
	try {
		loading.value = true;
		/* if (
			!objPreparacionSuelo.value.fecha ||
			!objPreparacionSuelo.value.id_parcela ||
			!objPreparacionSuelo.value.empleado_id ||
			!objPreparacionSuelo.value.productos ||
			!objPreparacionSuelo.value.ingredienteActivo ||
			!objPreparacionSuelo.value.dosis ||
			!objPreparacionSuelo.value.metodoAplicacion ||
			!objPreparacionSuelo.value.responsable ||
			!objPreparacionSuelo.value.observaciones
		) {
			Notify.create({
				type: "negative",
				message: "Por favor, completa todos los campos.",
			});
			return;
		} */

		const preparacionSueloData = {
			fecha: fechaPS.value,
			id_parcela: parcelaPS.value.id,
			empleado_id: empleadoPS.value.id,
			productos: productosPs.value,
			operario: operarioPS.value,
			responsable: responsablePS.value,
			observaciones: observacionesPS.value,
		};

		const r = await usePS.postPreparacionSuelo(preparacionSueloData);
		if (r.status === 200) {
			listarPS();
			mostrarFormularioPrepararSuelo.value = false;
		} else if (r.response && r.response.data.errors) {
			r.response.data.errors.forEach((err) => {
				notify(err.msg);
			});
		}
	} finally {
		loading.value = false;
	}
};

// Función para actualizar una preparación de suelo
const editar = async () => {
	try {
		loading.value = true;
		/* if (
			!objPreparacionSuelo.value.fecha ||
			!objPreparacionSuelo.value.id_parcela ||
			!objPreparacionSuelo.value.empleado_id ||
			!objPreparacionSuelo.value.productos ||
			!objPreparacionSuelo.value.ingredienteActivo ||
			!objPreparacionSuelo.value.dosis ||
			!objPreparacionSuelo.value.metodoAplicacion ||
			!objPreparacionSuelo.value.responsable ||
			!objPreparacionSuelo.value.observaciones
		) {
			Notify.create({
				type: "negative",
				message: "Por favor, completa todos los campos.",
			});
			return;
		} */

		const preparacionSueloData = {
			fecha: fechaPS.value,
			id_parcela: parcelaPS.value.id,
			empleado_id: empleadoPS.value.id,
			productos: productosPs.value,
			operario: operarioPS.value,
			responsable: responsablePS.value,
			observaciones: observacionesPS.value,
		};

		const r = await usePS.putPreparacionSuelo(
			datos.value._id,
			preparacionSueloData
		);
		if (r.status === 200) {
			listarPS();
			mostrarFormularioPrepararSuelo.value = false;
		} else if (r.response && r.response.data.errors) {
			r.response.data.errors.forEach((err) => {
				notify(err.msg);
			});
		}
	} finally {
		loading.value = false;
	}
};

// Función para cambiar el estado de una preparación de suelo
const changePreparacionSueloState = async (id, estado) => {
	try {
		loading.value = true;
		await usePS.putPreparacionSueloEstado(id, estado);

		listarPS();
	} finally {
		loading.value = false;
	}
};

// Función que administra lo que se ve en el formulario
function controlFormulario(d, boolean) {
	fechaPS.value = "";
	parcelaPS.value = "";
	empleadoPS.value = "";
	productosPs.value = [];
	rowsP.value = [];
	operarioPS.value = "";
	responsablePS.value = "";
	observacionesPS.value = "";
	mostrarBotonEditar.value = false;
	datos.value = d;

	if (d != null && boolean === true) {
		fechaPS.value = datos.value.fecha;
		parcelaPS.value = opcionesParcelas.value.find(
			(p) => p.id === datos.value.id_parcela
		);
		empleadoPS.value = opcionesEmpleados.value.find(
			(p) => p.id === datos.value.empleado_id
		);
		operarioPS.value = datos.value.operario;
		responsablePS.value = datos.value.responsable;
		observacionesPS.value = datos.value.observaciones;

		mostrarBotonEditar.value = true;
	}

	mostrarFormularioPrepararSuelo.value = boolean;
}

function manejarProductos(accion = "agregar", index = null) {
	if (accion == "agregar") {
		productosPs.push({
			ingredienteActivo: ingredienteActivoProducto.value,
			dosis: dosisProducto.value,
			metodoAplicacion: metodoAplicacionProducto.value,
		});
		rowsP.value = productosPs
		ingredienteActivoProducto.value = "";
		dosisProducto.value = "";
		metodoAplicacionProducto.value = "";
	} else {
		productosPs.splice(index, 1);
		rowsP.value = productosPs
	}
}

onMounted(() => {
	listarEmpleados();
	listarParcelas();
	listarPS();
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
								Preparación de suelos
							</h1>
							<q-space />
							<q-btn
								size="md"
								@click="controlFormulario(null, true)"
								label="Agregar" />
						</div>
						<div class="row items-center q-pb-md">
							<q-space />
							<q-select
								style="width: 200px"
								standout="bg-green text-white"
								:options="['Todos', 'Fechas', 'Parcelas']"
								v-model="opcion"
								label="Filtrar por" />
						</div>
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
				<template v-slot:body-cell-actions="props">
					<q-td :props="props">
						<q-btn @click="controlFormulario(props.row, true)">
							✏️
						</q-btn>
						<q-btn
							v-if="props.row.estado == 1"
							@click="
								changePreparacionSueloState(props.row._id, 0)
							">
							❌
						</q-btn>
						<q-btn
							v-else
							@click="
								changePreparacionSueloState(props.row._id, 1)
							">
							✅
						</q-btn>
					</q-td>
				</template>
			</q-table>
		</div>
		<q-dialog v-model="mostrarFormularioPrepararSuelo">
			<q-card>
				<q-form
					@submit="mostrarBotonEditar ? editar() : registrar()"
					class="q-gutter-sm">
					<p class="text-h5 text-center q-pb-md text-green">
						{{ datos ? "Editar" : "Agregar" }} preparacion de suelos
					</p>
					<q-input
						standout="bg-green text-while"
						type="date"
						label="Fecha"
						v-model="fechaPS" />
					<q-select
						standout="bg-green text-while"
						:options="opcionesParcelas"
						label="Parcela"
						v-model="parcelaPS" />
					<q-select
						standout="bg-green text-while"
						:options="opcionesEmpleados"
						label="Empleado"
						v-model="empleadoPS" />
					<q-input
						standout="bg-green text-while"
						type="text"
						label="Operario"
						v-model="operarioPS" />
					<q-input
						standout="bg-green text-while"
						type="text"
						label="Responsable"
						v-model="responsablePS" />
					<q-input
						autogrow
						standout="bg-green text-while"
						type="text"
						label="Observaciones"
						v-model="observacionesPS" />
					<div class="q-mt-lg row justify-between items-center">
						<p class="text-grey-8 q-mb-none">Producto:</p>
						<q-btn
							@click="manejarProductos()"
							label="Agregar producto" />
					</div>
					<q-input
						standout="bg-green text-while"
						type="text"
						label="Ingrediente Activo"
						v-model="ingredienteActivoProducto" />
					<q-input
						standout="bg-green text-while"
						type="text"
						label="Dosis"
						v-model="dosisProducto" />
					<q-input
						standout="bg-green text-while"
						type="text"
						label="Metodo de Aplicacion"
						v-model="metodoAplicacionProducto" />
					<q-list>
						<q-item
							v-for="(producto, index) in productosPs"
							:key="index">
							<q-item-section
								>Ingrediente Activo:
								{{ producto.ingredienteActivo }}</q-item-section
							>
							<q-item-section
								>Dosis: {{ producto.dosis }}</q-item-section
							>
							<q-item-section
								>Metodo de Aplicacion:
								{{ producto.metodoAplicacion }}</q-item-section
							>
						</q-item>
					</q-list>
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
			<q-card>
				<q-table
					:rows="rowsP"
					:columns="columnsP"
					row-key="id"
					:loading="loading">
					<template v-slot:top>
						<section class="column full-width q-pr-md">
							<div class="row items-center">
								<h1 class="text-h4 q-pl-xl text-green-7">
									Productos
								</h1>
								<q-space />
							</div>
						</section>
					</template>
					<template v-slot:body-cell-actions="props">
						<q-td :props="props">
							<q-btn
								@click="
									manejarProductos('borrar', props.rowIndex)
								">
								❌
							</q-btn>
						</q-td>
					</template>
				</q-table>
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
