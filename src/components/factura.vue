<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useStoreFacturas } from "../stores/factura.js";
import notify from "../utils/notificaciones.js";

const useFacturas = useStoreFacturas();

/* {
        // Datos de la factura
        fecha: "2024-10-01T12:34:56Z",
        numFactura: 101,
        total: 750,
        comprador_id: { nombre: "Juan Pérez" }, // Información del comprador
        detalles: [
            {
                id_produccion: "63dbf2fa36f0d2a2d0bcb54b", // Referencia a la producción
                nombreProducto: "Producto A",
                valor: 100,
                cantidad: 3,
                subtotal: 300, // valor * cantidad
                iva: 30, // IVA del 10%
                opciones: "Acciones aquí",
            },
            {
                id_produccion: "63dbf2fa36f0d2a2d0bcb54c", // Referencia a la producción
                nombreProducto: "Producto B",
                valor: 150,
                cantidad: 3,
                subtotal: 450, // valor * cantidad
                iva: 45, // IVA del 10%
                opciones: "Acciones aquí",
            },
        ],
    },
    {
        fecha: "2024-10-02T15:20:10Z",
        numFactura: 102,
        total: 520,
        comprador_id: { nombre: "María López" }, // Información del comprador
        detalles: [
            {
                id_produccion: "63dbf2fa36f0d2a2d0bcb54d", // Referencia a la producción
                nombreProducto: "Producto C",
                valor: 100,
                cantidad: 2,
                subtotal: 200, // valor * cantidad
                iva: 20, // IVA del 10%
                opciones: "Acciones aquí",
            },
            {
                id_produccion: "63dbf2fa36f0d2a2d0bcb54e", // Referencia a la producción
                nombreProducto: "Producto D",
                valor: 160,
                cantidad: 2,
                subtotal: 320, // valor * cantidad
                iva: 32, // IVA del 10%
                opciones: "Acciones aquí",
            },
        ],
    },
    {
        fecha: "2024-10-03T10:15:00Z",
        numFactura: 103,
        total: 350,
        comprador_id: { nombre: "Carlos García" }, // Información del comprador
        detalles: [
            {
                id_produccion: "63dbf2fa36f0d2a2d0bcb54f", // Referencia a la producción
                nombreProducto: "Producto E",
                valor: 70,
                cantidad: 2,
                subtotal: 140, // valor * cantidad
                iva: 14, // IVA del 10%
                opciones: "Acciones aquí",
            },
            {
                id_produccion: "63dbf2fa36f0d2a2d0bcb550", // Referencia a la producción
                nombreProducto: "Producto F",
                valor: 100,
                cantidad: 2,
                subtotal: 200, // valor * cantidad
                iva: 20, // IVA del 10%
                opciones: "Acciones aquí",
            },
        ],
    }, */

const rowsDetalles = ref([]);
const rows = ref([]);
let columns1 = ref([
	{
		name: "numFactura",
		align: "center",
		label: "Numero de Factura",
		field: "numFactura",
		sortable: true,
	},
	{
		name: "fecha",
		align: "center",
		label: "Fecha",
		field: (row) => {
			return row.fecha.split("T")[0];
		},
		sortable: true,
	},
	{
		name: "comprador_id",
		align: "center",
		label: "Comprador",
		field: (row) => `${row.comprador_id.nombre}`,
		sortable: true,
	},
	{
		name: "total",
		align: "center",
		label: "Total",
		field: "total",
		sortable: true,
	},
	{
		name: "opciones",
		align: "center",
		label: "Opciones",
		field: "opciones",
		sortable: true,
	},
]);

let columns2 = ref([
	{
		name: "codigo",
		align: "center",
		label: "Codigo",
		field: "codigo",
		sortable: true,
	},
	{
		name: "nombreProducto",
		align: "center",
		label: "Nombre de Producto",
		field: "nombreProducto",
		sortable: true,
	},
	{
		name: "precioUnitario",
		align: "center",
		label: "Valor Unitario",
		field: "precioUnitario",
		sortable: true,
	},
	{
		name: "cantidad",
		align: "center",
		label: "Cantidad",
		field: "cantidad",
		sortable: true,
	},
	{
		name: "subtotal",
		align: "center",
		label: "Subtotal",
		field: "subtotal",
		sortable: true,
	},
	{
		name: "iva",
		align: "center",
		label: "IVA (%)",
		field: "iva",
		sortable: true,
	},
	{
		name: "total",
		align: "center",
		label: "Total",
		field: "total",
		sortable: true,
	},
	{
		name: "opciones",
		align: "center",
		label: "Opciones",
		field: "opciones",
		sortable: true,
	},
]);

const compradores = ref([]);
const producciones = ref([]);

const produccion = ref("");

//Variables necesarias en el formulario
const fechaFactura = ref("");
const numFactura = ref("");
/* Detalle */
const produccionFactura = ref("");
const cantidadFactura = ref("");
const subtotalFactura = ref("");
const ivaFactura = ref(""); // Por si se cambia el iva
const totalFactura = ref(0);
const totalDetallesFactura = ref("");
const compradorFactura = ref("");
const codigoFactura = ref("");
const cantidadUnitaria = ref("");

//Variables necesarias para la edición
const datos = ref([]);

//Variables que controla lo que se va a mostrar en la pantalla
const mostrarFormularioFactura = ref(false);
const mostrarDetalles = ref(false);
const mostrarBotonEditar = ref(false);
const loading = ref(true);

/* const opcionesInventario = computed(() => {
    return inventarios.value.map((i) => {
        return { label: i.nombre, id: i._id }
    })
}) */

/* const calcular = computed(() => {
    subtotalFactura.value = cantidadFactura.value * cantidadUnitaria.value;
    totalDetallesFactura.value =
        subtotalFactura.value + subtotalFactura.value * ivaFactura.value;
}); */

const opcionesProduccion = computed(() => {
	return producciones.value.map((p) => {
		return { label: p.cultivo_id.nombre, id: p._id };
	});
});

const opcionesComprador = computed(() => {
	return compradores.value.map((c) => {
		return { label: c.nombre, id: c._id };
	});
});

const actualizarDatos = (fila) => {
	console.log(fila);

	const subtotal = fila.precioUnitario * fila.cantidad;
	const total = subtotal + subtotal * (fila.iva / 100);

	fila.subtotal = subtotal;
	fila.total = total;

	totalGeneral();
};

const totalGeneral = () => {
	totalFactura.value = rowsDetalles.value.reduce((acc, v) => {
		return acc + v.total;
	}, 0);
};

async function listarComprador() {
	try {
		loading.value = true;
		const r = await useFacturas.getComprador();
		compradores.value = r.data.compradores;
	} finally {
		loading.value = false;
	}
}

async function listarProduccion() {
	try {
		loading.value = true;
		const r = await useFacturas.getProduccion();
		producciones.value = r.data.producciones;
	} finally {
		loading.value = false;
	}
}

async function listarFactura() {
	try {
		loading.value = true;
		const r = await useFacturas.getFacturas();
		rows.value = r.data.facturas;
	} finally {
		loading.value = false;
	}
}

async function registrar() {
	if (validarDatosFactura()) {
		try {
			loading.value = true;
			const info = {
				fecha: fechaFactura.value,
				numFactura: numFactura.value,
				detalles: [
					{
						id_produccion: "",
						cantidad: "",
						nombreProducto: "",
						subtotal: "",
						iva: "",
						total: "",
					},
				],
				comprador_id: compradorFactura.value.id,
				total: totalFactura.value,
			};

			const r = await useFacturas.postFactura(info);
			if (r.status === 200) {
				mostrarFormularioFactura.value = false;
				listarFactura();
			} else if (r.response && r.response.data.errors) {
				r.response.data.errors.forEach((err) => {
					notify(err.msg);
				});
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
			const d = JSON.parse(JSON.stringify(rowsDetalles.value));
			const info = {
				fecha: fechaFactura.value,
				numFactura: numFactura.value,
				detalles: d,
				comprador_id: compradorFactura.value.id,
				total: totalFactura.value,
			};

			const r = await useFacturas.putFactura(datos.value._id, info);
			if (r.status === 200) {
				mostrarFormularioFactura.value = false;
				listarFactura();
			} else if (r.response && r.response.data.errors) {
				r.response.data.errors.forEach((err) => {
					notify(err.msg);
				});
			}
		} finally {
			loading.value = false;
		}
	}
}

function validarDatosFactura() {
	let validacion = true;

	if (
		!fechaFactura.value &&
		!numFactura.value.trim() &&
		!compradorFactura.value
	) {
		notify("Llena todos los campos");
		validacion = false;
	} else {
		if (!fechaFactura.value) {
			notify("El campo fecha está vacío");
			validacion = false;
		}
		if (!numFactura.value) {
			notify("El campo valor está vacío");
			validacion = false;
		}
		if (!compradorFactura.value) {
			notify("El campo comprador está vacío");
			validacion = false;
		}
	}

	return validacion;
}

function validarDatos() {
	let validacion = true;

	// Validación general de campos vacíos
	if (!fechaFactura.value) {
		notify("El campo fecha está vacío");
		validacion = false;
	}

	if (!numFactura.value) {
		notify("El campo número de factura está vacío");
		validacion = false;
	}

	if (!compradorFactura.value) {
		notify("El campo comprador está vacío");
		validacion = false;
	}

	// Validación de detalles (asegurarse de que hay al menos un producto)
	if (!rowsDetalles.value.length) {
		notify("Debe agregar al menos un producto");
		validacion = false;
	}

	// Validación de cada detalle (por ejemplo, cantidad, subtotal, iva)
	rowsDetalles.value.forEach((detalle, index) => {
		if (detalle.cantidad == undefined || detalle.cantidad <= 0) {
			notify(`La cantidad en el producto ${index + 1} no es válida`);
			validacion = false;
		}
		if (detalle.subtotal <= 0) {
			notify(`El subtotal en el producto ${index + 1} no es válido`);
			validacion = false;
		}
		if (detalle.iva == undefined || detalle.iva <= -1) {
			notify(`El IVA en el producto ${index + 1} no es válido `);
			validacion = false;
		}
		if (detalle.total <= 0) {
			notify(`El total en el producto ${index + 1} no es válido`);
			validacion = false;
		}
	});

	return validacion;
}

function controlFormulario(boolean) {
	fechaFactura.value = "";
	numFactura.value = "";
	totalFactura.value = 0;
	compradorFactura.value = "";
	mostrarFormularioFactura.value = boolean;
}

function controlFormularioDetalles(obj, boolean) {
	datos.value = obj;
	rowsDetalles.value = "";
	fechaFactura.value = "";
	numFactura.value = "";
	totalFactura.value = "";

	if (obj != null && boolean == true) {
		rowsDetalles.value = obj.detalles;
		fechaFactura.value = obj.fecha.split("T")[0];
		numFactura.value = obj.numFactura;
		totalFactura.value = obj.total;
		compradorFactura.value = opcionesComprador.value.find(
			(c) => c.id == obj.comprador_id._id
		);
	}

	mostrarDetalles.value = boolean;
}

function controlProducto() {
	if (!produccion.value) {
		notify("No hay un producto seleccionado");
		return;
	}
	const producto = producciones.value.find(
		({ _id }) => _id == produccion.value.id
	);
	codigoFactura.value = rowsDetalles.value.length + 1;

	if (codigoFactura.value == 1) {
		rowsDetalles.value.push({
			codigo: codigoFactura.value,
			id_produccion: producto._id,
			precioUnitario: producto.precioUnitario,
			cantidad: (cantidadFactura.value = 1),
			nombreProducto: producto.cultivo_id.nombre,
			subtotal: subtotalFactura.value,
			iva: (ivaFactura.value = 0),
			total: totalDetallesFactura.value,
		});

		actualizarDatos(rowsDetalles.value[0]);
	} else {
		const repetido = rowsDetalles.value.find(
			({ id_produccion: id }) => id == producto._id
		);

		if (!repetido) {
			rowsDetalles.value.push({
				codigo: codigoFactura.value,
				id_produccion: producto._id,
				precioUnitario: producto.precioUnitario,
				cantidad: (cantidadFactura.value = 1),
				nombreProducto: producto.cultivo_id.nombre,
				subtotal: subtotalFactura.value,
				iva: (ivaFactura.value = 0),
				total: totalDetallesFactura.value,
			});

			actualizarDatos(rowsDetalles.value[rowsDetalles.value.length - 1]);

			return;
		}

		notify("El producto ya se encuentra", "warning");
	}
}

function borrarDetalle(index) {
	rowsDetalles.value.splice(index, 1);

	rowsDetalles.value.forEach((obj, i) => {
		obj.codigo = i += 1;
	});
}

function validateAndSet(scope, row = null) {
	// Asegura que el valor no sea negativo
	if (scope.value < 0) {
		scope.value = 0;
	}
	scope.set(); // Guarda el valor

	// Si se pasa la fila, actualiza los datos
	if (row) {
		actualizarDatos(row);
	}
}

onMounted(() => {
	listarComprador();
	listarProduccion();
	listarFactura();
});
</script>

<template>
	<div>
		<div v-if="!mostrarDetalles" class="q-pa-lg">
			<q-table
				:rows="rows"
				:columns="columns1"
				row-key="id"
				:loading="loading">
				<template v-slot:top>
					<section class="column full-width q-pr-md">
						<div class="row items-center">
							<h1 class="text-h4 q-pl-xl text-green-7">
								Facturas
							</h1>
							<q-space />
							<q-btn
								size="md"
								@click="controlFormulario(true)"
								label="Agregar" />
						</div>
					</section>
				</template>
				<template v-slot:body-cell-opciones="props">
					<q-td
						:props="props"
						class="row justify-center"
						style="gap: 20px">
						<q-btn
							@click="controlFormularioDetalles(props.row, true)">
							👁️
						</q-btn>
					</q-td>
				</template>
			</q-table>
		</div>
		<div v-if="mostrarDetalles" class="q-pa-lg absolute full-width">
			<div class="row full-width q-mb-md">
				<q-space />
				<q-btn flat @click="controlFormularioDetalles(null, false)">
					❌
				</q-btn>
			</div>
			<q-table
				:rows="rowsDetalles"
				:columns="columns2"
				row-key="id"
				:loading="loading">
				<template v-slot:top>
					<section
						class="row full-width justify-evenly items-center q-pr-md">
						<h2 class="text-h4 q-pl-xl text-green-7">
							Detalles de Factura
						</h2>
						<q-space />
						<q-btn
							size="md"
							@click="editar()"
							label="Guardar Detalles" />
					</section>
					<section class="column full-width q-pr-md">
						<div class="row justify-evenly items-center q-mb-md">
							<q-input
								standout="bg-green text-while"
								type="text"
								label="Numero de Factura"
								v-model="numFactura" />
							<q-input
								standout="bg-green text-while"
								type="date"
								label="Fecha"
								v-model="fechaFactura" />
							<q-select
								style="width: 200px"
								standout="bg-green text-while"
								option-value="id"
								:options="opcionesComprador"
								label="Comprador"
								v-model="compradorFactura" />
							<q-input
								:disable="true"
								standout="bg-green text-while"
								type="text"
								label="Total"
								v-model="totalFactura" />
						</div>
						<div class="row items-center">
							<h1 class="text-h4 q-pl-xl text-green-7">
								Productos
							</h1>
							<q-space />
							<q-select
								standout="bg-green text-while"
								style="width: 200px; margin-right: 30px"
								:options="opcionesProduccion"
								v-model="produccion"
								label="Productos" />
							<q-btn
								size="md"
								@click="controlProducto()"
								label="Agregar Producto" />
						</div>
					</section>
				</template>
				<template v-slot:body-cell-cantidad="props">
					<q-td :props="props">
						{{ props.row.cantidad }}
						<q-popup-edit
							v-model="props.row.cantidad"
							auto-save
							v-slot="scope">
							<q-input
								type="number"
								min="0"
								v-model="scope.value"
								dense
								autofocus
								@keyup.enter="validateAndSet(scope)"
								@focusout="validateAndSet(scope, props.row)" />
						</q-popup-edit>
					</q-td>
				</template>
				<template v-slot:body-cell-iva="props">
					<q-td :props="props">
						{{ props.row.iva }}
						<q-popup-edit
							v-model="props.row.iva"
							auto-save
							v-slot="scope">
							<q-input
								type="number"
								min="0"
								v-model="scope.value"
								dense
								autofocus
								@keyup.enter="validateAndSet(scope)"
								@focusout="validateAndSet(scope, props.row)" />
						</q-popup-edit>
					</q-td>
				</template>
				<template v-slot:body-cell-opciones="props">
					<q-td
						:props="props"
						class="row justify-center"
						style="gap: 20px">
						<q-btn @click="borrarDetalle(props.rowIndex)">
							❌
						</q-btn>
					</q-td>
				</template>
			</q-table>
			<!-- <q-dialog v-model="mostrarFormularioFacturaDetalle">
                <q-card>
                    <q-form
                        @submit="mostrarBotonEditar ? editar() : registrar()"
                        class="q-gutter-md">
                        <p class="text-h5 text-center q-pb-md text-green">
                            {{ datos ? "Editar" : "Agregar" }} Detalle
                        </p>
                        <q-input
                            standout="bg-green text-while"
                            type="date"
                            label="Produccion"
                            v-model="produccionFactura" />
                        <q-input
                            standout="bg-green text-while"
                            type="text"
                            label="Cantidad"
                            v-model="cantidadFactura" />
                        <q-input
                            standout="bg-green text-while"
                            type="text"
                            label="Nombre Producto"
                            v-model="nombreProductoFactura" />
                        <q-input
                            standout="bg-green text-while"
                            type="text"
                            label="Subtotal"
                            v-model="subtotalFactura" />
                        <q-input
                            standout="bg-green text-while"
                            type="text"
                            label="Iva"
                            v-model="ivaFactura" />
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
            </q-dialog> -->
		</div>
		<q-dialog v-model="mostrarFormularioFactura">
			<q-card>
				<q-form @submit="registrar()" class="q-gutter-md">
					<p class="text-h5 text-center q-pb-md text-green">
						{{ datos ? "Editar" : "Agregar" }} Factura
					</p>
					<q-input
						standout="bg-green text-while"
						type="text"
						label="Numero de Factura"
						v-model="numFactura" />
					<q-input
						standout="bg-green text-while"
						type="date"
						label="Fecha"
						v-model="fechaFactura" />
					<q-select
						standout="bg-green text-while"
						:options="opcionesComprador"
						label="Comprador"
						v-model="compradorFactura" />
					<q-input
						:disable="true"
						standout="bg-green text-while"
						type="text"
						label="Total"
						v-model="totalFactura" />
					<div class="row justify-end" style="gap: 10px">
						<q-btn
							unelevated
							label="Registrar"
							type="submit"
							color="positive" />
						<q-btn
							@click="controlFormulario(false)"
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
.q-form {
	margin-bottom: 15px;
}
</style>
