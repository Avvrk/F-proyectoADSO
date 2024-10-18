<script setup>
import { ref, onMounted, computed } from "vue";
import { useStoreControl_plagas } from "../stores/control_plagas.js";
import notify from "../utils/notificaciones.js";

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
        name: "operario_id",
        label: "Operario",
        field: "operario_id",
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

const tipoS = ["fitosanitario", "normal"];

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
        /* if (r.code == "ERR_BAD_REQUEST") {
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
        } */
        cultivos.value = r.data.cultivos;
    } finally {
        loading.value = false;
    }
}

async function listarEmpleados() {
    try {
        loading.value = true;
        const r = await useControlPlaga.getEmpleados();
        /* if (r.code == "ERR_BAD_REQUEST") {
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
        } */
        empleados.value = r.data.empleados;
    } finally {
        loading.value = false;
    }
}

async function listarControlPlagas() {
    try {
        loading.value = true;
        const r = await useControlPlaga.getControlPlagas();
        /* if (r.code == "ERR_BAD_REQUEST") {
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
        } */
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
            notify("La fecha de inicio no puede ser mayor que la fecha de fin.")
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
        notify("Llena los campos")
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
        notify("Llena el campo")
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
        notify("Llena el campo")
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
                operario_id: operarioControlPlagas.value.id,
                observaciones: observacionesControlPlagas.value,
            };

            const r = await useControlPlaga.postControlPlagas(info);
            if (r.status === 200) {
                mostrarFormularioControlPlaga.value = false;
                listarControlPlagas();
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
            const info = {
                id_cultivo: cultivoControlPlagas.value.id,
                empleado_id: empleadoControlPlagas.value.id,
                fecha: fechaControlPlagas.value,
                tipoCultivo: tipoCultivoControlPlagas.value,
                nombre: nombreControlPlagas.value,
                tipo: tipoControlPlagas.value,
                ingredientesActivo: ingredientesActivoControlPlagas.value,
                dosis: dosisControlPlagas.value,
                operario_id: operarioControlPlagas.value.id,
                observaciones: observacionesControlPlagas.value,
            };

            const r = await useControlPlaga.putControlPlagas(
                datos.value._id,
                info
            );
            if (r.status === 200) {
                mostrarFormularioControlPlaga.value = false;
                listarControlPlagas();
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
        !operarioControlPlagas.value &&
        !observacionesControlPlagas.value.trim()
    ) {
        notify("Llena todos los campos");
        validacion = false;
    } else {
        if (!cultivoControlPlagas.value) {
            notify("El cultivo está vacío");
            validacion = false;
        }
        if (!empleadoControlPlagas.value) {
            notify("El empleado está vacío");
            validacion = false;
        }
        if (!fechaControlPlagas.value) {
            notify("La fecha está vacía");
            validacion = false;
        }
        if (!tipoCultivoControlPlagas.value.trim()) {
            notify("El tipo del cultivo está vacío");
            validacion = false;
        }
        if (!nombreControlPlagas.value.trim()) {
            notify("El nombre está vacío");
            validacion = false;
        }
        if (!tipoControlPlagas.value) {
            notify("El tipo está vacío");
            validacion = false;
        }
        if (!ingredientesActivoControlPlagas.value.trim()) {
            notify("El ingrediente activo está vacío");
            validacion = false;
        }
        if (!dosisControlPlagas.value.trim()) {
            notify("La dosis está vacía");
            validacion = false;
        } else if (isNaN(Number(dosisControlPlagas.value))) {
            notify("La dosis debe ser un número");
            validacion = false;
        }
        if (!operarioControlPlagas.value) {
            notify("El operario está vacío");
            validacion = false;
        }
        if (!observacionesControlPlagas.value.trim()) {
            notify("La observación está vacía");
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
        operarioControlPlagas.value = opcionesEmpleados.value.find(
            (e) => e.id == datos.value.operario_id._id
        );;
        observacionesControlPlagas.value = datos.value.observaciones;

        mostrarBotonEditar.value = true;
    }
    mostrarFormularioControlPlaga.value = boolean;
}

function estadoTabla() {
    if (opcionTabla.value == "Fechas") {
        mostrarInputFecha.value = true;
        mostrarInputOperario.value = false;
        mostrarSelectTipo.value = false;
        mostrarInput.value = true;
    } else if (opcionTabla.value == "Tipo") {
        mostrarInputFecha.value = false;
        mostrarInputOperario.value = false;
        mostrarSelectTipo.value = true;
        mostrarInput.value = true;
    } else if (opcionTabla.value == "Operario") {
        mostrarInputFecha.value = false;
        mostrarInputOperario.value = true;
        mostrarSelectTipo.value = false;
        mostrarInput.value = true;
    } else {
        mostrarInputFecha.value = false;
        mostrarInputOperario.value = false;
        mostrarSelectTipo.value = false;
        mostrarInput.value = false;
        listarControlPlagas();
    }
}

onMounted(() => {
    listarCultivos();
    listarEmpleados();
    listarControlPlagas();
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
                                Control de Plagas
                            </h1>
                            <q-space />
                            <q-btn
                                size="md"
                                @click="controlFormulario(null, true)"
                                label="Agregar" />
                        </div>
                        <div class="row items-center q-pb-md">
                            <q-space />
                            <div class="row q-pr-xl q-gutter-lg">
                                <q-input
                                    standout
                                    v-if="mostrarInputFecha"
                                    label="Fecha Inicio"
                                    type="date"
                                    v-model="fechaInicio" />
                                <q-input
                                    standout
                                    v-if="mostrarInputFecha"
                                    label="Fecha Fin"
                                    type="date"
                                    v-model="fechaFin" />
                                <q-select
                                    standout
                                    style="width: 300px"
                                    v-if="mostrarSelectTipo"
                                    label="Tipo"
                                    :options="tipoS"
                                    v-model="tipo" />
                                <q-input
                                    standout
                                    v-if="mostrarInputOperario"
                                    label="Operario"
                                    type="text"
                                    v-model="operario" />
                                <q-btn
                                    unelevated
                                    style="background-color: #ededed"
                                    v-if="mostrarInput"
                                    @click="
                                        mostrarInputFecha
                                            ? listarControlPlagasFechas()
                                            : mostrarInputOperario
                                            ? listarControlPlagasOperario()
                                            : mostrarSelectTipo
                                            ? listarControlPlagasTipo()
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
        <q-dialog v-model="mostrarFormularioControlPlaga">
            <q-card>
                <q-form
                    @submit="mostrarBotonEditar ? editar() : registrar()"
                    class="q-gutter-md">
                    <p class="text-h5 text-center q-pb-md text-green">
                        {{ datos ? "Editar" : "Agregar" }} Control de Plagas
                    </p>
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
                    <q-select
                        standout="bg-green text-white"
                        :options="opcionesEmpleados"
                        label="Operario"
                        v-model="operarioControlPlagas" />
                    <q-input
                        standout="bg-green text-white"
                        type="text"
                        label="Observaciones"
                        v-model="observacionesControlPlagas" />
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
</style>
