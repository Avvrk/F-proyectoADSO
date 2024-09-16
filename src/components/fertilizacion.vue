<script setup>
import { ref, onMounted, computed } from "vue";
import { useStoreFertilizacion } from "../stores/fertilizacion.js";
import { useQuasar } from "quasar";

const $q = useQuasar();

const useFertilizacion = useStoreFertilizacion();

const estadoF = ["inicial", "floracion", "cosecha"];
const tipo = ["antes de siembra", "después de siembra"];
let rows = ref([]);
let columns = ref([
    {
        name: "id_cultivo",
        align: "center",
        label: "Cultivo",
        field: (row) =>
            `${row.id_cultivo.nombre} (tipo: ${row.id_cultivo.tipo})`,
        sortable: true,
    },
    {
        name: "empleado_id",
        align: "center",
        label: "Empleado",
        field: (row) =>
            `${row.empleado_id.nombre} (DNI: ${row.empleado_id.documento})`,
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
        name: "estadoFenologico",
        align: "center",
        label: "Estado Fenológico",
        field: "estadoFenologico",
        sortable: true,
    },
    {
        name: "tipo",
        align: "center",
        label: "Tipo",
        field: "tipo",
        sortable: true,
    },
    {
        name: "nombreFertilizante",
        align: "center",
        label: "Nombre del Fertilizante",
        field: "nombreFertilizante",
        sortable: true,
    },
    {
        name: "cantidad",
        align: "center",
        label: "Cantidad Aplicada",
        field: "cantidad",
        sortable: true,
    },
    {
        name: "inventario_id",
        align: "center",
        label: "Inventario",
        field: (row) => {
            // Verifica si inventario_id no es null o undefined antes de acceder a sus propiedades
            if (row.inventario_id) {
                return (
                    row.inventario_id.insumos_id?.nombre ||
                    row.inventario_id.semillas_id?.nombre ||
                    row.inventario_id.maquinaria_id?.nombre ||
                    "N/A"
                );
            }
            // Si inventario_id es null o undefined, retorna "N/A"
            return "N/A";
        },
        sortable: true,
    },
    {
        name: "opciones",
        align: "center",
        label: "Editar",
        field: "opciones",
        sortable: true,
    },
]);

const cultivo = ref([]);
const empleado = ref([]);
const inventario = ref([]);

//Variables necesarias en el formulario
const cultivoFer = ref("");
const empleadoFer = ref("");
const fechaFer = ref("");
const estadoFenologicoFer = ref("");
const tipoFer = ref("");
const nombreFertilizanteFer = ref("");
const cantidadFer = ref("");
const inventarioFer = ref("");

//Variables necesarias para la edición
const datos = ref([]);

//Variables que ocntrola lo que se va a mostrar en la pantalla
const mostrarFormularioFertilizacion = ref(false);
const mostrarBotonEditar = ref(false);
const loading = ref(true);

const opcionesEmplados = computed(() => {
    return empleado.value.map((e) => {
        return { label: `${e.nombre} (dni: ${e.documento})`, id: `${e._id}` };
    });
});

const opcionesCultivos = computed(() => {
    return cultivo.value.map((c) => {
        return { label: `${c.nombre} (tipo: ${c.tipo})`, id: `${c._id}` };
    });
});

const opcionesInventario = computed(() => {
    return inventario.value.map((i) => {
        if (i.semillas_id) {
            return {
                label: `${i.tipo} / ${i.semillas_id.especieVariedad}`,
                id: `${i._id}`,
            };
        } else if (i.insumos_id) {
            return {
                label: `${i.tipo} / ${i.insumos_id.nombre}`,
                id: `${i._id}`,
            };
        } else if (i.maquinaria_id) {
            return {
                label: `${i.tipo} / ${i.maquinaria_id.nombre} - ${i.maquinaria_id.tipo}`,
                id: `${i._id}`,
            };
        } else {
            return {
                label: "Datos faltantes",
                id: `${i._id}`,
            };
        }
    });
});

const buscarInventario = (row) => {
    console.log(row);
};

async function listarCultivo() {
    try {
        loading.value = true;
        const r = await useFertilizacion.getCultivos();
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
        cultivo.value = r.data.cultivos;
    } finally {
        loading.value = false;
    }
}

async function listarEmpleado() {
    try {
        loading.value = true;
        const r = await useFertilizacion.getEmpleados();
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
        empleado.value = r.data.empleados;
    } finally {
        loading.value = false;
    }
}

async function listarInventario() {
    try {
        loading.value = true;
        const r = await useFertilizacion.getInventario();
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
        inventario.value = r.data.inventario;
    } finally {
        loading.value = false;
    }
}

async function listarFertilizacion() {
    try {
        loading.value = true;
        const r = await useFertilizacion.getFertilizacion();
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
        rows.value = r.data.fertilizaciones;
    } finally {
        loading.value = false;
    }
}

async function registrar() {
    if (validarDatos()) {
        try {
            loading.value = true;
            const info = {
                id_cultivo: cultivoFer.value.id,
                empleado_id: empleadoFer.value.id,
                fecha: fechaFer.value,
                estadoFenologico: estadoFenologicoFer.value,
                tipo: tipoFer.value,
                nombreFertilizante: nombreFertilizanteFer.value,
                cantidad: cantidadFer.value,
                inventario_id: inventarioFer.value.id,
            };
            console.log(info);

            const r = await useFertilizacion.postFertilizacion(info);
            mostrarFormularioFertilizacion.value = false;
            listarFertilizacion();
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
                id_cultivo: cultivoFer.value.id,
                empleado_id: empleadoFer.value.id,
                fecha: fechaFer.value,
                estadoFenologico: estadoFenologicoFer.value,
                tipo: tipoFer.value,
                nombreFertilizante: nombreFertilizanteFer.value,
                cantidad: cantidadFer.value,
                inventario_id: inventarioFer.value.id,
            };

            const r = await useFertilizacion.putFertilizacion(
                datos.value._id,
                info
            );
            mostrarFormularioFertilizacion.value = false;
            listarFertilizacion();
        } finally {
            loading.value = false;
        }
    }
}

function validarDatos() {
    let validacion = true;
    if (
        !cultivoFer.value &&
        !empleadoFer.value &&
        !fechaFer.value &&
        !estadoFenologicoFer.value &&
        !tipoFer.value &&
        !nombreFertilizanteFer.value &&
        !cantidadFer.value &&
        !inventarioFer.value
    ) {
        $q.notify({
            color: "negative",
            message: "Llena todos los campos",
            position: "top",
        });
        validacion = false;
    } else {
        if (!cultivoFer.value) {
            $q.notify({
                color: "negative",
                message: "El campo cultivo está vacío",
                position: "top",
            });
            validacion = false;
        }
        if (!empleadoFer.value) {
            $q.notify({
                color: "negative",
                message: "El campo empleado está vacío",
                position: "top",
            });
            validacion = false;
        }
        if (!fechaFer.value) {
            $q.notify({
                color: "negative",
                message: "El campo fecha está vacío",
                position: "top",
            });
            validacion = false;
        }
        if (!estadoFenologicoFer.value) {
            $q.notify({
                color: "negative",
                message: "El campo estado fenológico está vacío",
                position: "top",
            });
            validacion = false;
        }
        if (!tipoFer.value) {
            $q.notify({
                color: "negative",
                message: "El campo tipo está vacío",
                position: "top",
            });
            validacion = false;
        }
        if (!nombreFertilizanteFer.value) {
            $q.notify({
                color: "negative",
                message: "El campo nombre de fertilizante está vacío",
                position: "top",
            });
            validacion = false;
        }
        if (!cantidadFer.value) {
            $q.notify({
                color: "negative",
                message: "El campo cantidad está vacío",
                position: "top",
            });
            validacion = false;
        }
        if (!inventarioFer.value) {
            $q.notify({
                color: "negative",
                message: "El campo inventario está vacío",
                position: "top",
            });
            validacion = false;
        }
    }
    return validacion;
}

function controlFormulario(obj, boolean) {
    cultivoFer.value = "";
    empleadoFer.value = "";
    fechaFer.value = "";
    estadoFenologicoFer.value = "";
    tipoFer.value = "";
    nombreFertilizanteFer.value = "";
    cantidadFer.value = "";
    inventarioFer.value = "";
    console.log(obj);

    datos.value = obj;
    mostrarBotonEditar.value = false;
    if (obj != null && boolean == true) {
        cultivoFer.value = opcionesCultivos.value.find(
            (c) => c.id == datos.value.id_cultivo._id
        );
        empleadoFer.value = opcionesEmplados.value.find(
            (e) => e.id == datos.value.empleado_id._id
        );
        fechaFer.value = datos.value.fecha;
        estadoFenologicoFer.value = datos.value.estadoFenologico;
        tipoFer.value = datos.value.tipo;
        nombreFertilizanteFer.value = datos.value.nombreFertilizante;
        cantidadFer.value = datos.value.cantidad;
        inventarioFer.value = opcionesInventario.value.find(
            (i) => i.id == datos.value.inventario_id._id
        );
        mostrarBotonEditar.value = true;
    }

    console.log(datos.value);

    mostrarFormularioFertilizacion.value = boolean;
}

onMounted(() => {
    listarCultivo();
    listarEmpleado();
    listarInventario();
    listarFertilizacion();
});
</script>

<template>
    <div>
        <div class="q-pa-lg">
            <q-table
                :rows="rows"
                :columns="columns"
                row-key="id"
                :loading="loading"
            >
                <template v-slot:top>
                    <section class="column full-width q-pr-md">
                        <div class="row items-center">
                            <h1 class="text-h4 q-pl-xl text-green-7">
                                Fertilizaciones
                            </h1>
                            <q-space />
                            <q-btn
                                size="md"
                                @click="controlFormulario(null, true)"
                                label="Agregar"
                            />
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
                            "
                        />
                    </q-td>
                </template>
                <template v-slot:body-cell-opciones="props">
                    <q-td
                        :props="props"
                        class="row justify-center"
                        style="gap: 20px"
                    >
                        <q-btn @click="controlFormulario(props.row, true)">
                            ✏️
                        </q-btn>
                    </q-td>
                </template>
            </q-table>
        </div>
        <q-dialog v-model="mostrarFormularioFertilizacion">
            <q-card>
                <q-form
                    @submit="mostrarBotonEditar ? editar() : registrar()"
                    class="q-gutter-md"
                >
                    <p class="text-h5 text-center q-pb-md text-green">
                        {{ datos ? "Editar" : "Agregar" }} fertilización
                    </p>
                    <q-select
                        standout="bg-green text-while"
                        :options="opcionesCultivos"
                        label="Cultivo"
                        v-model="cultivoFer"
                    />
                    <q-select
                        standout="bg-green text-while"
                        :options="opcionesEmplados"
                        label="Empleado"
                        v-model="empleadoFer"
                    />
                    <q-input
                        standout="bg-green text-while"
                        type="date"
                        label="Fecha"
                        v-model="fechaFer"
                    />
                    <q-select
                        standout="bg-green text-while"
                        :options="estadoF"
                        label="Estado Fenológico"
                        v-model="estadoFenologicoFer"
                    />
                    <q-select
                        standout="bg-green text-while"
                        :options="tipo"
                        label="tipo"
                        v-model="tipoFer"
                    />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Nombre Fertilizante"
                        v-model="nombreFertilizanteFer"
                    />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Cantidad"
                        v-model="cantidadFer"
                    />
                    <q-select
                        standout="bg-green text-while"
                        :options="opcionesInventario"
                        label="Inventario"
                        v-model="inventarioFer"
                    />
                    <div class="row justify-end" style="gap: 10px">
                        <q-btn
                            unelevated
                            v-if="mostrarBotonEditar"
                            label="Editar"
                            type="submit"
                            color="positive"
                        />
                        <q-btn
                            unelevated
                            v-else
                            label="Registrar"
                            type="submit"
                            color="positive"
                        />
                        <q-btn
                            @click="controlFormulario(null, false)"
                            flat
                            class="bg-red text-white"
                            label="Cerrar"
                            type="button"
                        />
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
