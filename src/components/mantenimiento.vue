<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useStoreMantenimiento } from "../stores/mantenimiento.js";
import { useQuasar } from "quasar";

const $q = useQuasar();
const useMantenimiento = useStoreMantenimiento();

const opcionesTabla = ["Todos", "Fechas", "Herramienta", "Responsable"];

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
        field: (row) => (row.gastos_id ? `${row.gastos_id.nombre} (num factura:${row.gastos_id.numeroFactura})` : ""),
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

const fechaInicio = ref("");
const fechaFin = ref("");
const responsable = ref("");
const herramienta = ref("");
const mostrarInputFecha = ref(false);
const fechaMantenimiento = ref("");
const verificacionRealizada = ref("");
const calibracion = ref("");
const observaciones = ref("");
const gasto = ref("");
const mostrarInput = ref(false);
const mostrarSelectResponsable = ref(false);
const mostrarSelectHerramienta = ref(false); 
const herramientaS = ref("");

const h = ref([]);
const respaldo = ref(null);
const eoa = ref(false);

const opcionTabla = ref("Todos");

const datos = ref([]);

const mostrarFormularioMantenimiento = ref(false);
const mostrarBotonEditar = ref(false);
const loading = ref(true);

const opcionesHerramientas = computed(() => {
    console.log(respaldo.value);
    
    return h.value.map((herramienta) => { // Asegúrate de que `rows` contenga los datos de herramientas
        return { label: `${herramienta.nombre} (tipo: ${herramienta.tipo})`, id: herramienta._id };
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
    // Usamos un Set para asegurarnos de que los responsables no se repitan
    const responsablesUnicos = new Set();
    
    // Filtramos los responsables y sólo agregamos los que no están en el Set
    return respaldo.value
        .filter((responsable) => {
            if (!responsablesUnicos.has(responsable.responsable)) {
                responsablesUnicos.add(responsable.responsable);
                return true;
            }
            return false;
        })
        .map((responsable) => {
            return { label: responsable.responsable, id: responsable.responsable };
        });
});

async function listarGastos() {
    try {
        loading.value = true;
        const r = await useMantenimiento.getGastos();
        if (r.code == "ERR_BAD_REQUEST") {
            if (
                r.response.data.msg == "No hay token en la peticion" ||
                r.response.data.msg == "Token no válido! ." ||
                r.response.data.msg == "Token no válido!!  " ||
                r.response.data.msg == "Token no valido"
            ) {
                $q.notify({
                    type: "negative",
                    message: "Token no valido",
                });
                return router.push("/");
            }
        }
        gastos.value = r.data.gastos;
    } finally {
        loading.value = false;
    }
}

async function listarHerramientas() {
    try {
        loading.value = true;
        const r = await useMantenimiento.getHerramientas();
        if (r.code == "ERR_BAD_REQUEST") {
            if (
                r.response.data.msg == "No hay token en la peticion" ||
                r.response.data.msg == "Token no válido! ." ||
                r.response.data.msg == "Token no válido!!  " ||
                r.response.data.msg == "Token no valido"
            ) {
                $q.notify({
                    type: "negative",
                    message: "Token no valido",
                });
                return router.push("/");
            }
        }
        h.value = r.data.maquinariaH;
    } finally {
        loading.value = false;
    }
}

async function listarMantenimiento() {
    try {
        loading.value = true;
        const r = await useMantenimiento.getMantenimientos();
        if (r.code == "ERR_BAD_REQUEST") {
            if (
                r.response.data.msg == "No hay token en la peticion" ||
                r.response.data.msg == "Token no válido! ." ||
                r.response.data.msg == "Token no válido!!  " ||
                r.response.data.msg == "Token no valido"
            ) {
                $q.notify({
                    type: "negative",
                    message: "Token no valido",
                });
                return router.push("/");
            }
        }
        rows.value = r.data.mantenimientos;
        if (respaldo.value == null || opcionTabla.value == "Todos" || eoa.value == true) {
            respaldo.value = r.data.mantenimientos;
        }
        eoa.value = false;
    } finally {
        loading.value = false;
    }
}

async function listarmantenimientoFechas() {
    if (fechaInicio.value && fechaFin.value) {
        const inicio = new Date(fechaInicio.value);
        const fin = new Date(fechaFin.value);

        if (inicio > fin) {
            $q.notify({
                type: "negative",
                message: "La fecha de inicio no puede ser mayor que la fecha de fin.",
                position: "bottom",
            });
            return;
        }
        try {
            loading.value = true;
            const r = await useMantenimiento.getMantenimientosFechas(fechaInicio.value, fechaFin.value);
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
    if (herramientaS.value && herramientaS.value.id) {
        try {
            loading.value = true;
            const r = await useMantenimiento.getMantenimientosHerramientas(herramientaS.value.id);
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
    if (responsable.value && responsable.value.id) {
        try {
            loading.value = true;
            const r = await useMantenimiento.getMantenimientosResponsable(responsable.value.id);
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
                eoa.value = true;
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

            const res = await useMantenimiento.putMantenimiento(datos.value._id, info);
            if (res.status === 200) {
                mostrarFormularioMantenimiento.value = false;
                eoa.value = true;
                listarMantenimiento();
            }
        } finally {
            loading.value = false;
        }
    }
}

function validarDatos() {
    let validacion = true;
    if (!fechaMantenimiento.value || !verificacionRealizada.value || !calibracion.value || !responsable.value) {
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
        herramienta.value = opcionesHerramientas.value.find((h) => h.id == datos.value.id_herramienta._id);
        gasto.value = opcionesGastos.value.find((g) => g.id == datos.value.gastos_id._id);

        mostrarBotonEditar.value = true;
    }

    mostrarFormularioMantenimiento.value = true;
}

function estadoTabla() {
    switch (opcionTabla.value) {
        case "Todos":
            mostrarInputFecha.value = false;
            mostrarSelectResponsable.value = false;
            mostrarSelectHerramienta.value = false; 
            mostrarInput.value = false;
            listarMantenimiento();
            break;
        case "Fechas":
            mostrarInputFecha.value = true;
            mostrarSelectResponsable.value = false;
            mostrarSelectHerramienta.value = false; 
            mostrarInput.value = true;
            break;
        case "Herramienta":
            mostrarInputFecha.value = false;
            mostrarSelectHerramienta.value = true; 
            mostrarSelectResponsable.value = false;
            mostrarInput.value = true;
            break;
        case "Responsable":
            mostrarInputFecha.value = false;
            mostrarSelectHerramienta.value = false; 
            mostrarSelectResponsable.value = true;
            mostrarInput.value = true;
            break;
    }
}


onMounted(() => {
    listarHerramientas();
    listarGastos();
    listarMantenimiento();
});
</script>

<template>
    <div class="q-pa-lg">
        <q-table :rows="rows" :columns="columns" row-key="id" :loading="loading">
            <template v-slot:top>
                <section class="column full-width q-pr-md">
                    <div class="row items-center q-gutter-md">
                        <h1 class="text-h4 q-pl-xl text-green-7">Gestión de Mantenimientos</h1>
                        <q-space />
                        <q-btn size="md" @click="controlFormulario(null, true)" label="Agregar" />
                    </div>

                    <div class="row items-center q-pb-md">
                        <q-space />
                        <div class="row q-pr-xl q-gutter-lg">
                            <q-select standout style="width: 300px" v-if="mostrarSelectResponsable" label="Responsable" :options="opcionesResponsables" v-model="responsable" />
                            <q-input standout v-if="mostrarInputFecha" label="Fecha Inicio" type="date" v-model="fechaInicio" />
                            <q-input standout v-if="mostrarInputFecha" label="Fecha Fin" type="date" v-model="fechaFin" />
                            <q-select standout style="width: 300px" v-if="mostrarSelectHerramienta" label="Herramienta" :options="opcionesHerramientas" v-model="herramientaS" />
                            <q-btn v-if="mostrarInput" @click="mostrarInputFecha ? listarmantenimientoFechas() : mostrarSelectResponsable ? listarMantenimientoResponsable()  : mostrarSelectHerramienta ? listarMantenimientoHerramienta() : ''" label="Buscar" />
                        </div>
                        <q-select style="width: 200px" standout="bg-green text-while" :options="opcionesTabla" v-model="opcionTabla" label="Filtro por" @update:model-value="estadoTabla" />
                    </div>
                </section>
            </template>

            <template v-slot:body-cell-opciones="props">
                <q-td :props="props" class="row justify-center" style="gap: 20px">
                    <q-btn @click="controlFormulario(props.row, true)" color="white" class="edit-btn">✏️</q-btn>
                </q-td>
            </template>
        </q-table>

        <!-- Diálogo para formulario de mantenimiento -->
        <q-dialog v-model="mostrarFormularioMantenimiento" persistent>
            <q-card>
                <q-form @submit="mostrarBotonEditar ? editar() : registrar()" class="q-gutter-sm">
                    <q-card-section>
                        <p class="text-h5 text-center q-pb-md text-green">
                            {{ mostrarBotonEditar ? "Editar Mantenimiento" : "Agregar Mantenimiento" }}
                        </p>
                    </q-card-section>
                    <q-card-section>
                        <q-input filled type="date" label="Fecha" v-model="fechaMantenimiento" />
                        <q-input filled type="text" label="Verificación Realizada" v-model="verificacionRealizada" />
                        <q-input filled type="text" label="Calibración" v-model="calibracion" />
                        <q-select filled :options="opcionesHerramientas" label="Herramienta" v-model="herramienta" />
                        <q-select filled :options="opcionesGastos" label="Gasto" v-model="gasto" />
                        <q-input filled type="text" label="Responsable" v-model="responsable" />
                        <q-input filled type="text" label="Observaciones" v-model="observaciones" />
                    </q-card-section>
                    <q-card-actions class="actions-right">
                        <q-btn unelevated v-if="mostrarBotonEditar" label="Editar" type="submit" color="positive" />
                        <q-btn unelevated v-else label="Agregar" type="submit" color="positive" />
                        <q-btn @click="mostrarFormularioMantenimiento = false" flat class="bg-red text-white" label="Cerrar" type="button" />
                    </q-card-actions>
                </q-form>
            </q-card>
        </q-dialog>
    </div>
</template>

<style scoped>
.q-card {
    background-color: rgb(255, 255, 255);
    padding: 40px 30px;
    border-radius: 8px;
    width: 30rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border: 0;
}

.q-form .q-input,
.q-form .q-select {
    margin-bottom: 15px;
}

.q-btn[color="primary"] {
    background-color: #43a047;
    color: white;
}

.q-btn[color="secondary"] {
    background-color: #e53935;
    color: white;
}

.q-btn.edit-btn {
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.q-btn.flat.bg-red.text-white {
    background-color: #e53935;
    color: white;
}

.add-btn {
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.filter-select {
    background-color: white;
}

.q-gutter-md {
    gap: 16px;
}

.actions-right {
    display: flex;
    justify-content: flex-end;
}
</style>
