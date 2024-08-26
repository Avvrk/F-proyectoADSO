<script setup>
import { ref, onMounted, computed } from "vue";
import { useStoreComprador } from "../stores/comprador.js";
import { useQuasar } from "quasar";

const $q = useQuasar();

const useComprador = useStoreComprador();

const opcionesTabla = ["Todos", "Activos", "Inactivos", "Fechas", "Documento"];
const produccion = ref([]);
const rows = ref([]);
const columns = ref([
	{
		name: "_id_produccion",
		label: "Produccion",
		field: (row) =>
			`${row._id_produccion.cultivo_id.nombre} (tipo: ${row._id_produccion.cultivo_id.tipo})`,
		align: "center",
		sortable: true,
	},
	{
		name: "fecha",
		label: "Fecha",
		field: (row) => {
			return row.fecha.split("T")[0];
		},
		align: "center",
	},
	{
		name: "especie",
		label: "Especie",
		field: "especie",
		align: "center",
		sortable: true,
	},
	{
		name: "nombre",
		label: "Nombre",
		field: "nombre",
		align: "center",
	},
	{
		name: "documento",
		label: "Documento",
		field: "documento",
		align: "center",
		sortable: true,
	},
	{
		name: "telefono",
		label: "Telefono",
		field: "telefono",
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
		name: "numeroGuiaTransporte",
		label: "Num. Guia de transporte",
		field: "numeroGuiaTransporte",
		align: "center",
		sortable: true,
	},
	{
		name: "numeroLoteComercial",
		label: "Num. Lote Comercial",
		field: "numeroLoteComercial",
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

const produccionComprador = ref("");
const fechaComprador = ref("");
const especieComprador = ref("");
const nombreComprador = ref("");
const documentoComprador = ref("");
const telefonoComprador = ref("");
const cantidadComprador = ref("");
const numeroGuiaTransporteComprador = ref("");
const numeroLoteComercialComprador = ref("");
const totalComprador = ref("");

const opcionTabla = ref("Todos");

const fechaInicio = ref("");
const fechaFin = ref("");
const documento = ref("");

const datos = ref([]);

const mostrarFormularioComprador = ref(false);
const mostrarBotonEditar = ref(false);
const mostrarInputFecha = ref(false);
const mostrarSelectDocumento = ref(false);
const mostraInput = ref(false);
const loading = ref(true);

const opcionesProduccion = computed(() => {
	return produccion.value.map((p) => {
		return {
			label: `${p.cultivo_id.nombre} (tipo: ${p.cultivo_id.tipo})`,
			id: `${p._id}`,
		};
	});
});

const opcionesDocumento = computed(() => {
	return rows.value.map((c) => {
		return {
			label: `${c.nombre} (dni: ${c.documento})`,
			id: `${c.documento}`,
		};
	});
});

async function listarProduccion() {
	try {
		loading.value = true;
		const r = await useComprador.getProduccion();
		produccion.value = r.data.producciones;
	} finally {
		loading.value = false;
	}
}

async function listarComprador() {
	try {
		loading.value = true;
		const r = await useComprador.getComprador();
		rows.value = r.data.compradores;
	} finally {
		loading.value = false;
	}
}

async function listarCompradorActivo() {
	try {
		loading.value = true;
		const r = await useComprador.getCompradorActivos();
		rows.value = r.data.compradores;
	} finally {
		loading.value = false;
	}
}

async function listarCompradorInactivo() {
	try {
		loading.value = true;
		const r = await useComprador.getCompradorInactivos();
		rows.value = r.data.compradores;
	} finally {
		loading.value = false;
	}
}

async function listarCompradorFechas() {
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
			const r = await useComprador.getCompradorFechas(
				fechaInicio.value,
				fechaFin.value
			);
			console.log(fechaFin.value, fechaInicio.value);

			rows.value = r.data.compradores;
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

async function listarCompradorDocumento() {
	if (documento.value) {
		console.log(documento.value);

		try {
			loading.value = true;
			const r = await useComprador.getCompradorDocumento(
				documento.value.id
			);
			rows.value = r.data.compradores;
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

async function editarEstado(elemento) {
	try {
		loading.value = true;
		if (elemento.estado === 1) {
			const res = await useComprador.putCompradorInactivar(elemento._id);
		} else if (elemento.estado === 0) {
			const res = await useComprador.putCompradorActivar(elemento._id);
		}
		listarComprador();
	} finally {
		loading.value = false;
	}
}

async function registrar() {
	if (validarDatos()) {
		try {
			loading.value = true;
			const info = {
				_id_produccion: produccionComprador.value.id,
				fecha: fechaComprador.value,
				especie: especieComprador.value,
				nombre: nombreComprador.value,
				documento: documentoComprador.value,
				telefono: telefonoComprador.value,
				cantidad: cantidadComprador.value,
				numeroGuiaTransporte: numeroGuiaTransporteComprador.value,
				numeroLoteComercial: numeroLoteComercialComprador.value,
				total: totalComprador.value,
			};

			const res = await useComprador.postComprador(info);
			if (res.status === 200) {
				mostrarFormularioComprador.value = false;
				listarComprador();
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
				_id_produccion: produccionComprador.value.id,
				fecha: fechaComprador.value,
				especie: especieComprador.value,
				nombre: nombreComprador.value,
				documento: documentoComprador.value,
				telefono: telefonoComprador.value,
				cantidad: cantidadComprador.value,
				numeroGuiaTransporte: numeroGuiaTransporteComprador.value,
				numeroLoteComercial: numeroLoteComercialComprador.value,
				total: totalComprador.value,
			};

			const res = await useComprador.putComprador(datos.value._id, info);
			if (res.status === 200) {
				mostrarFormularioComprador.value = false;
				listarComprador();
			}
		} finally {
			loading.value = false;
		}
	}
}

function validarDatos() {
	let validacion = true;
	if (
		!produccionComprador.value &&
		!fechaComprador.value &&
		!especieComprador.value.trim() &&
		!nombreComprador.value.trim() &&
		!documentoComprador.value.trim() &&
		!telefonoComprador.value.trim() &&
		!cantidadComprador.value.trim() &&
		!numeroGuiaTransporteComprador.value.trim() &&
		!numeroLoteComercialComprador.value.trim() &&
		!totalComprador.value.trim()
	) {
		$q.notify({
			type: "negative",
			message: "Llena todos los campos",
			position: "bottom",
		});
		validacion = false;
	} else {
		if (!produccionComprador.value) {
			$q.notify({
				type: "negative",
				message: "La produccion esta vacia",
				position: "bottom",
			});
			validacion = false;
		}
		if (!fechaComprador.value) {
			$q.notify({
				type: "negative",
				message: "La fecha esta vacia",
				position: "bottom",
			});
			validacion = false;
		}
		if (!especieComprador.value.trim()) {
			$q.notify({
				type: "negative",
				message: "La especie esta vacia",
				position: "bottom",
			});
			validacion = false;
		}
		if (!nombreComprador.value.trim()) {
			$q.notify({
				type: "negative",
				message: "El nombre esta vacio",
				position: "bottom",
			});
			validacion = false;
		}
		if (!documentoComprador.value.trim()) {
			$q.notify({
				type: "negative",
				message: "El documento esta vacio",
				position: "bottom",
			});
			validacion = false;
		}
		if (!telefonoComprador.value.trim()) {
			$q.notify({
				type: "negative",
				message: "El telefono esta vacio",
				position: "bottom",
			});
			validacion = false;
		}
		if (!cantidadComprador.value.trim()) {
			$q.notify({
				type: "negative",
				message: "La cantidad esta vacia",
				position: "bottom",
			});
			validacion = false;
		}
		if (!numeroGuiaTransporteComprador.value.trim()) {
			$q.notify({
				type: "negative",
				message: "El Num. guia transporte esta vacio",
				position: "bottom",
			});
			validacion = false;
		}
		if (!numeroLoteComercialComprador.value.trim()) {
			$q.notify({
				type: "negative",
				message: "El Num. lote comercial esta vacio",
				position: "bottom",
			});
			validacion = false;
		}
		if (!totalComprador.value.trim()) {
			$q.notify({
				type: "negative",
				message: "El total esta vacio",
				position: "bottom",
			});
			validacion = false;
		}
	}
	return validacion;
}

function controlFormulario(obj, boolean) {
	produccionComprador.value = "";
	fechaComprador.value = "";
	especieComprador.value = "";
	nombreComprador.value = "";
	documentoComprador.value = "";
	telefonoComprador.value = "";
	cantidadComprador.value = "";
	numeroGuiaTransporteComprador.value = "";
	numeroLoteComercialComprador.value = "";
	totalComprador.value = "";

	datos.value = obj;
	mostrarBotonEditar.value = false;
	if (obj != null && boolean == true) {
		produccionComprador.value = opcionesProduccion.value.find(
			(p) => p.id == datos.value._id_produccion._id
		);
		fechaComprador.value = datos.value.fecha.split("T")[0];
		especieComprador.value = datos.value.especie;
		nombreComprador.value = datos.value.nombre;
		documentoComprador.value = datos.value.documento;
		telefonoComprador.value = String(datos.value.telefono);
		cantidadComprador.value = String(datos.value.cantidad);
		numeroGuiaTransporteComprador.value = datos.value.numeroGuiaTransporte;
		numeroLoteComercialComprador.value = datos.value.numeroLoteComercial;
		totalComprador.value = String(datos.value.total);

		mostrarBotonEditar.value = true;
	}
	mostrarFormularioComprador.value = boolean;
}

function estadoTabla() {
	if (opcionTabla.value == "Activos") {
		mostrarInputFecha.value = false;
		mostrarSelectDocumento.value = false;
		mostraInput.value = false;
		listarCompradorActivo();
	} else if (opcionTabla.value == "Inactivos") {
		mostrarInputFecha.value = false;
		mostrarSelectDocumento.value = false;
		mostraInput.value = false;
		listarCompradorInactivo();
	} else if (opcionTabla.value == "Fechas") {
		fechaFin.value = "";
		fechaInicio.value = "";
		mostrarInputFecha.value = true;
		mostrarSelectDocumento.value = false;
		mostraInput.value = true;
	} else if (opcionTabla.value == "Documento") {
		documento.value = "";
		mostrarInputFecha.value = false;
		mostrarSelectDocumento.value = true;
		mostraInput.value = true;
	} else {
		mostrarInputFecha.value = false;
		mostrarSelectDocumento.value = false;
		mostraInput.value = false;
		listarComprador();
	}
}

onMounted(() => {
	listarProduccion();
	listarComprador();
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
			title="Comprador"
			:rows="rows"
			:columns="columns"
			row-key="id">
			<template v-slot:top>
				<q-select
					v-if="mostrarSelectDocumento"
					label="Responsable"
					:options="opcionesDocumento"
					v-model="documento" />
				<q-input
					v-if="mostrarInputFecha"
					label="Fecha Inicio"
					type="date"
					v-model="fechaInicio" />
				<q-input
					v-if="mostrarInputFecha"
					label="Fecha Fin"
					type="date"
					v-model="fechaFin" />
				<q-btn
					v-if="mostraInput"
					@click="
						mostrarInputFecha
							? listarCompradorFechas()
							: mostrarSelectDocumento
							? listarCompradorDocumento()
							: ''
					"
					label="Buscar" />
				<q-select
					standout="bg-green text-while"
					:options="opcionesTabla"
					v-model="opcionTabla"
					@update:model-value="estadoTabla" />
			</template>
			<template v-slot:body-cell-opciones="props">
				<q-td :props="props">
					<q-btn @click="controlFormulario(props.row, true)">
						✏️
					</q-btn>
					<q-btn
						v-if="props.row.estado == 1"
						@click="editarEstado(props.row)">
						❌
					</q-btn>
					<q-btn v-else @click="editarEstado(props.row)"> ✅ </q-btn>
				</q-td>
			</template>
			<template v-slot:body-cell-estado="props">
				<q-td :props="props">
					<p v-if="props.row.estado == 1" style="color: green">
						Activo
					</p>
					<p v-else style="color: red">Inactivo</p>
				</q-td>
			</template>
		</q-table>
		<q-dialog v-model="mostrarFormularioComprador">
			<q-card>
				<q-form
					@submit="mostrarBotonEditar ? editar() : registrar()"
					class="q-gutter-md">
					<q-select
						standout="bg-green text-white"
						:options="opcionesProduccion"
						label="Produccion"
						v-model="produccionComprador" />
					<q-input
						standout="bg-green text-while"
						type="date"
						label="Fecha"
						v-model="fechaComprador" />
					<q-input
						standout="bg-green text-while"
						type="text"
						label="Especie"
						v-model="especieComprador" />
					<q-input
						standout="bg-green text-while"
						type="text"
						label="Nombre"
						v-model="nombreComprador" />
					<q-input
						standout="bg-green text-while"
						type="text"
						label="Documento"
						v-model="documentoComprador" />
					<q-input
						standout="bg-green text-while"
						type="text"
						label="Telefono"
						v-model="telefonoComprador" />
					<q-input
						standout="bg-green text-while"
						type="text"
						label="Cantidad"
						v-model="cantidadComprador" />
					<q-input
						standout="bg-green text-while"
						type="text"
						label="Num Guia de Transporte"
						v-model="numeroGuiaTransporteComprador" />
					<q-input
						standout="bg-green text-while"
						type="text"
						label="Num Lote Comercial"
						v-model="numeroLoteComercialComprador" />
					<q-input
						standout="bg-green text-while"
						type="text"
						label="Total"
						v-model="totalComprador" />
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
