<script setup>
import { ref, onMounted, computed } from "vue";
import { useStoreInsumos } from "../stores/insumos.js";
import { useQuasar } from "quasar";
import { router } from "../routes/routes.js";

const $q = useQuasar();

const useInsumo = useStoreInsumos();

const proveedores = ref([]);

let rows = ref([]);
let columns = ref([
{ 
    name: "proveedores_id", 
    align: "center", 
    label: "Proveedor", 
    field: (row) => `${row.proveedores_id.nombre} / Tlf: ${row.proveedores_id.telefono}`,
    sortable: true, 
},
	{ name: "nombre", align: "center", label: "Nombre", field: "nombre", sortable: true, },
	{ name: "relacionNPK", align: "center", label: "Relación NPK", field: "relacionNPK", sortable: true, },
	{ name: "cantidad", align: "center", label: "Cantidad", field: "cantidad", sortable: true, },
	{ name: "unidad", align: "center", label: "Unidad", field: "unidad", sortable: true, },
	{ name: "total", align: "center", label: "Total", field: "total", sortable: true, },
	{ name: "responsable", align: "center", label: "Responsable", field: "responsable", sortable: true, },
	{ name: "observaciones", align: "center", label: "Observaciones", field: "observaciones", sortable: true, },
	{ name: "opciones", align: "center", label: "Editar", field: "opciones", sortable: true, },
]);

const proveedorInsumo = ref ("");
const nombreInsumo = ref ("");
const relacionNPKInsumo = ref ("");
const cantidadInsumo = ref ("");
const unidadInsumo = ref ("");
const totalInsumo = ref ("");
const responsableInsumo = ref ("");
const observacionesInsumo = ref ("");

const datos = ref([]);

const mostrarFormularioInsumo = ref(false);
const mostrarBotonEditar = ref(false);
const loading = ref(false);

const opcionesProveedores = computed (()=> {
	return proveedores.value.map((p) => {
		return { label: `${p.nombre} (Tlf: ${p.telefono}) (Email: ${p.email})`, id: p._id };
	});
});

async function listarProveedores() {
	try {
		loading.value = true;
		const r = await useInsumo.getProveedores();
		if (r.code == "ERR_BAD_REQUEST") {
			if (
				r.response.data.msg == "No hay token en la peticion" ||
                r.response.data.msg == "Token no válido! ." ||
                r.response.data.msg == "Token no válido!!  " ||
                r.response.data.msg == "Token no valido"
			) {
				$q.notify({
					color: "red-4",
					position: "top",
					message: "No hay token en la petición",
					icon: "report_problem",
				});
				return router.push("/");

			}
		}
		proveedores.value = r.data.proveedores;
	} finally {
		loading.value = false;
	}
}

async function listarInsumos() {
	try {
		loading.value = true;
		const r = await useInsumo.getInsumos();
		if (r.code == "ERR_BAD_REQUEST") {
			if (
				r.response.data.msg == "No hay token en la peticion" ||
				r.response.data.msg == "Token no válido! ." ||
				r.response.data.msg == "Token no válido!!  " ||
				r.response.data.msg == "Token no valido"
			) {
				$q.notify({
					color: "red-4",
					position: "top",
					message: "No hay token en la petición",
					icon: "report_problem",
				});
				return router.push("/");

			}
		}
		rows.value = r.data.insumos;
	} finally {
		loading.value = false;
	}
}

async function registrar() {
	if (validarDatos()) {
		try {
			loading.value = true;
			const info = {
				proveedores_id: proveedorInsumo.value.id,
				nombre: nombreInsumo.value,
				relacionNPK: relacionNPKInsumo.value,
				cantidad: cantidadInsumo.value,
				unidad: unidadInsumo.value,
				total: totalInsumo.value,
				responsable: responsableInsumo.value,
				observaciones: observacionesInsumo.value,
			};

			const r = await useInsumo.postInsumos(info);
			if ( r.status === 200) {
				mostrarFormularioInsumo.value = false;
				listarInsumos();
			}
		} finally {
			loading.value = false;
		}
	}
}

async function editar() {
	if (validarDatos()){
		try {
			loading.value = true;
			const info = {
				proveedores_id: proveedorInsumo.value.id,
				nombre: nombreInsumo.value,
				relacionNPK: relacionNPKInsumo.value,
				cantidad: cantidadInsumo.value,
				unidad: unidadInsumo.value,
				total: totalInsumo.value,
				responsable: responsableInsumo.value,
				observaciones: observacionesInsumo.value,
			};

			const r = await useInsumo.putInsumos(info);
			if ( r.status === 200) {
				mostrarFormularioInsumo.value = false;
				listarInsumos();
			}
		} finally {
			loading.value = false;
		}
	}
}

function validarDatos() {
	let validacion = true;
	if (
		!proveedorInsumo.value ||
		!nombreInsumo.value ||
		!relacionNPKInsumo.value ||
		!cantidadInsumo.value ||
		!unidadInsumo.value ||
		!totalInsumo.value ||
		!responsableInsumo.value ||
		!observacionesInsumo.value
	) {
		$q.notify({
			color: "red-4",
			position: "top",
			message: "Todos los campos son obligatorios",
			icon: "report_problem",
		});
		validacion = false;
	} else {
		if (!proveedorInsumo.value){
			$q.notify({
				color: "red-4",
				position: "top",
				message: "El campo proveedor es obligatorio",
				icon: "report_problem",
			});
			validacion = false;
		}
		if (!nombreInsumo.value){
			$q.notify({
				color: "red-4",
				position: "top",
				message: "El campo nombre es obligatorio",
				icon: "report_problem",
			});
			validacion = false;
		}
		if (!relacionNPKInsumo.value){
			$q.notify({
				color: "red-4",
				position: "top",
				message: "El campo relación NPK es obligatorio",
				icon: "report_problem",
			});
			validacion = false;
		}
		if (!cantidadInsumo.value){
			$q.notify({
				color: "red-4",
				position: "top",
				message: "El campo cantidad es obligatorio",
				icon: "report_problem",
			});
			validacion = false;
		}
		if (!unidadInsumo.value){
			$q.notify({
				color: "red-4",
				position: "top",
				message: "El campo unidad es obligatorio",
				icon: "report_problem",
			});
			validacion = false;
		}
		if (!totalInsumo.value){
			$q.notify({
				color: "red-4",
				position: "top",
				message: "El campo total es obligatorio",
				icon: "report_problem",
			});
			validacion = false;
		}
		if (!responsableInsumo.value){
			$q.notify({
				color: "red-4",
				position: "top",
				message: "El campo responsable es obligatorio",
				icon: "report_problem",
			});
			validacion = false;
		}
		if (!observacionesInsumo.value){
			$q.notify({
				color: "red-4",
				position: "top",
				message: "El campo observaciones es obligatorio",
				icon: "report_problem",
			});
			validacion = false;
		}

	}
	return validacion;
}

function controlFormulario(obj, boolean) {
	proveedorInsumo.value = "";
	nombreInsumo.value = "";
	relacionNPKInsumo.value = "";
	cantidadInsumo.value = "";
	unidadInsumo.value = "";
	totalInsumo.value = "";
	responsableInsumo.value = "";
	observacionesInsumo.value = "";

	datos.value = obj;
	mostrarBotonEditar.value = false;
	if (obj != null && boolean) {
		proveedorInsumo.value = opcionesProveedores.value.find((p) => p.id == datos.value.proveedores_id._id);
		nombreInsumo.value = datos.value.nombre;
		relacionNPKInsumo.value = datos.value.relacionNPK;
		cantidadInsumo.value = datos.value.cantidad;
		unidadInsumo.value = datos.value.unidad;
		totalInsumo.value = datos.value.total;
		responsableInsumo.value = datos.value.responsable;
		observacionesInsumo.value = datos.value.observaciones;

		mostrarBotonEditar.value = true;
	}
	mostrarFormularioInsumo.value = boolean;
}

onMounted(() => {
	listarProveedores();
	listarInsumos();
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
                                Insumos
                            </h1>
                            <q-space />
                            <q-btn
                                size="md"
                                @click="controlFormulario(null, true)"
                                label="Agregar" />
                        </div>
                        
                    </section>
                </template>
                <template v-slot:body-cell-opciones="props">
                    <q-td :props="props">
                        <q-btn @click="controlFormulario(props.row, true)">
                            ✏️
                        </q-btn>
                    </q-td>
                </template>
            </q-table>
        </div>
        <q-dialog v-model="mostrarFormularioInsumo">
            <q-card>
                <q-form
                    @submit="mostrarBotonEditar ? editar() : registrar()"
                    class="q-gutter-sm">
                    <p class="text-h5 text-center q-pb-md text-green">
                        {{ datos ? "Editar" : "Agregar" }} Insumo
                    </p>
                    <q-select
                        standout="bg-green text-white"
                        :options="opcionesProveedores"
                        label="Proveedor"
                        v-model="proveedores_id" />
                    <q-input
                        standout="bg-green text-white"
                        type="text"
                        label="Nombre"
                        v-model="nombre" />
                    <q-input
                        standout="bg-green text-white"
                        type="text"
                        label="Relación NPK"
                        v-model="relacionNPK" />
                    <q-input
                        standout="bg-green text-white"
                        type="text"
                        label="Cantidad"
                        v-model="cantidad" />
                    <q-input
                        standout="bg-green text-white"
                        type="text"
                        label="Dosis"
                        v-model="dosisControlPlagas" />
                    <q-input
                        standout="bg-green text-white"
                        type="text"
                        label="Unidad"
                        v-model="unidad" />
                    <q-input
                        standout="bg-green text-white"
                        type="text"
                        label="Responsable"
                        v-model="responsable" />
						<q-input
                        standout="bg-green text-white"
                        type="text"
                        label="Observaciones"
                        v-model="observaciones" />
						<q-input
                        standout="bg-green text-white"
                        type="text"
                        label="Total"
                        v-model="total" />
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
