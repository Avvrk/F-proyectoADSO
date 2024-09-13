<script setup>
import { ref, onMounted, computed } from "vue";
import { useStoreFincas } from "../stores/fincas.js";
import { date, useQuasar } from "quasar";

const $q = useQuasar();

const useFincas = useStoreFincas();

const opcionesTabla = ["Todos", "Activos", "Inactivos"];

// Datos de las Fincas
let rows = ref([]);
let columns = ref([
    {
        name: "_idAdmin",
        align: "center",
        label: "Administrador",
        field: (row) => `${row._idAdmin.nombre}`,
        sortable: true,
    },
    {
        name: "nombre",
        align: "center",
        label: "Nombre Finca",
        field: "nombre",
        sortable: true,
    },
    {
        name: "rut",
        align: "center",
        label: "RUT",
        field: "rut",
        sortable: true,
    },
    {
        name: "direccion",
        align: "center",
        label: "Dirección",
        field: "direccion",
        sortable: true,
    },
    {
        name: "ubicacionGeografica",
        align: "center",
        label: "Ubicación Geográfica",
        field: "ubicacionGeografica",
        sortable: true,
    },
    {
        name: "departamento",
        align: "center",
        label: "Departamento",
        field: "departamento",
        sortable: true,
    },
    {
        name: "ciudad",
        align: "center",
        label: "Ciudad",
        field: "ciudad",
        sortable: true,
    },
    {
        name: "limites",
        align: "center",
        label: "Límites",
        field: "limites",
        sortable: true,
    },
    {
        name: "area",
        align: "center",
        label: "Área",
        field: "area",
        sortable: true,
    },
    {
        name: "estado",
        align: "center",
        label: "Estado",
        field: "estado",
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

const admin = ref([]);

const opcionTabla = ref("Todos");
const colombia = ref([]);
const datos = ref([]);

//Variables necesarias en el formulario
const idAdminFin = ref("");
const nombreFin = ref("");
const rutFin = ref("");
const direccionFin = ref("");
const ubicacionGeograficaFin = ref("");
const departamentoFin = ref("");
const ciudadFin = ref("");
const limitesFin = ref("");
const areaFin = ref("");

//Variables necesarias para la edición
const mostrarFormularioFinca = ref(false);
const mostrarBotonEditar = ref(false);
const loading = ref(true);

const ciudadOpciones = computed(() => {
    const ciudad = colombia.value.find(
        (f) => f.departamento == departamentoFin.value.departamento
    );
    return ciudad ? ciudad.ciudades : [];
});

const opcionesAdmins = computed(() => {
    return admin.value.map((a) => {
        return { label: `${a.nombre}`, id: `${a._id}` };
    });
});

async function listarMunicipio() {
    const r = await useFincas.getMunicipios();
    colombia.value = r.data;
}

async function listarAdmins() {
    try {
        loading.value = true;
        const r = await useFincas.getAdmin();
        admin.value = r.data.admins;
    } finally {
        loading.value = false;
    }
}

async function listarFincas() {
    try {
        loading.value = true;
        const r = await useFincas.getFincas();
        rows.value = r.data.fincas;
    } finally {
        loading.value = false;
    }
}

async function listarFincaActivo() {
    try {
        loading.value = true;
        const r = await useFincas.getFincasActivos();
        rows.value = r.data.fincas;
    } finally {
        loading.value = false;
    }
}

async function listarFincaInactivo() {
    try {
        loading.value = true;
        const r = await useFincas.getFincasInactivos();
        rows.value = r.data.fincas;
    } finally {
        loading.value = false;
    }
}

async function editarEstado(elemento) {
    try {
        loading.value = true;
        if (elemento.estado === 1) {
            const res = await useFincas.putFincaInactivar(elemento._id);
        } else if (elemento.estado === 0) {
            const res = await useFincas.putFincaActivar(elemento._id);
        }
        listarFincas();
    } finally {
        loading.value = false;
    }
}

async function registrar() {
    if (validarDatos()) {
        try {
            loading.value = true;
            const info = {
                _idAdmin: idAdminFin.value.id,
                nombre: nombreFin.value,
                rut: rutFin.value,
                direccion: direccionFin.value,
                ubicacionGeografica: ubicacionGeograficaFin.value,
                departamento: departamentoFin.value,
                ciudad: ciudadFin.value,
                limites: limitesFin.value,
                area: areaFin.value,
            };
            console.log(info);

            const r = await useFincas.postFincas(info);
            mostrarFormularioFinca.value = false;
            listarFincas();
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
                _idAdmin: idAdminFin.value.id,
                nombre: nombreFin.value,
                rut: rutFin.value,
                direccion: direccionFin.value,
                ubicacionGeografica: ubicacionGeograficaFin.value,
                departamento: departamentoFin.value,
                ciudad: ciudadFin.value,
                limites: limitesFin.value,
                area: areaFin.value,
            };

            const r = await useFincas.putFincas(datos.value._id, info);
            mostrarFormularioFinca.value = false;
            listarFincas();
        } finally {
            loading.value = false;
        }
    }
}

function validarDatos() {
    let validacion = true;
    if (
        !idAdminFin.value &&
        !nombreFin.value &&
        !rutFin.value &&
        !direccionFin.value &&
        !ubicacionGeograficaFin.value &&
        !departamentoFin.value &&
        !ciudadFin.value &&
        !limitesFin.value &&
        !areaFin.value
    ) {
        $q.notify({
            color: "negative",
            position: "top",
            message: "Todos los campos son obligatorios",
        });
        validacion = false;
    } else {
        if (!idAdminFin.value) {
            $q.notify({
                color: "negative",
                position: "top",
                message: "El campo ID de Administrador es obligatorio",
            });
            validacion = false;
        }
        if (!nombreFin.value) {
            $q.notify({
                color: "negative",
                position: "top",
                message: "El campo Nombre es obligatorio",
            });
            validacion = false;
        }
        if (!rutFin.value) {
            $q.notify({
                color: "negative",
                position: "top",
                message: "El campo RUT es obligatorio",
            });
            validacion = false;
        }
        if (!direccionFin.value) {
            $q.notify({
                color: "negative",
                position: "top",
                message: "El campo Dirección es obligatorio",
            });
            validacion = false;
        }
        if (!ubicacionGeograficaFin.value) {
            $q.notify({
                color: "negative",
                position: "top",
                message: "El campo Ubicación Geográfica es obligatorio",
            });
            validacion = false;
        }
        if (!departamentoFin.value) {
            $q.notify({
                color: "negative",
                position: "top",
                message: "El campo Departamento es obligatorio",
            });
            validacion = false;
        }
        if (!ciudadFin.value) {
            $q.notify({
                color: "negative",
                position: "top",
                message: "El campo Ciudad es obligatorio",
            });
            validacion = false;
        }
        if (!limitesFin.value) {
            $q.notify({
                color: "negative",
                position: "top",
                message: "El campo Límites es obligatorio",
            });
            validacion = false;
        }
        if (!areaFin.value) {
            $q.notify({
                color: "negative",
                position: "top",
                message: "El campo Área es obligatorio",
            });
            validacion = false;
        }
    }
    return validacion;
}

function controlFormulario(obj, boolean) {
    idAdminFin.value = "";
    nombreFin.value = "";
    rutFin.value = "";
    direccionFin.value = "";
    ubicacionGeograficaFin.value = "";
    departamentoFin.value = "";
    ciudadFin.value = "";
    limitesFin.value = "";
    areaFin.value = "";

    datos.value = obj;
    mostrarBotonEditar.value = false;
    if (obj != null && boolean == true) {
        idAdminFin.value = opcionesAdmins.value.find(
            (a) => a.id == datos.value._idAdmin._id
        );
        nombreFin.value = obj.nombre;
        rutFin.value = obj.rut;
        direccionFin.value = obj.direccion;
        ubicacionGeograficaFin.value = obj.ubicacionGeografica;
        departamentoFin.value = datos.value.municipio;
        ciudadFin.value = datos.value.ciudad;
        limitesFin.value = obj.limites;
        areaFin.value = obj.area;
        mostrarBotonEditar.value = true;
    }

    console.log(datos.value);

    mostrarFormularioFinca.value = boolean;
}

function estadoTabla() {
    console.log(opcionTabla.value);

    if (opcionTabla.value == "Activos") {
        listarFincaActivo();
    } else if (opcionTabla.value == "Inactivos") {
        listarFincaInactivo();
    } else {
        listarFincas();
    }
}

onMounted(() => {
    listarMunicipio();
    listarAdmins();
    listarFincas();
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
                            <h1 class="text-h4 q-pl-xl text-green-7">Fincas</h1>
                            <q-space />
                            <q-btn
                                size="md"
                                @click="controlFormulario(null, true)"
                                label="Agregar"
                            />
                        </div>
                        <div class="row items-center q-pb-md">
                            <q-space />
                            <q-select
                                style="width: 200px"
                                standout="bg-green text-while"
                                :options="opcionesTabla"
                                v-model="opcionTabla"
                                label="Filtro por"
                                @update:model-value="estadoTabla"
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
                        <q-btn
                            v-if="props.row.estado == 1"
                            @click="editarEstado(props.row)"
                        >
                            ❌
                        </q-btn>
                        <q-btn v-else @click="editarEstado(props.row)">
                            ✅
                        </q-btn>
                    </q-td>
                </template>
            </q-table>
        </div>
        <q-dialog v-model="mostrarFormularioFinca">
            <q-card>
                <q-form
                    @submit="mostrarBotonEditar ? editar() : registrar()"
                    class="q-gutter-md"
                >
                    <p class="text-h5 text-center q-pb-md text-green">
                        {{ datos ? "Editar" : "Agregar" }} Finca
                    </p>
                    <q-select
                        standout="bg-green text-while"
                        :options="opcionesAdmins"
                        label="Administrador"
                        v-model="idAdminFin"
                    />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Nombre Finca"
                        v-model="nombreFin"
                    />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Rut"
                        v-model="rutFin"
                    />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Dirección Finca"
                        v-model="direccionFin"
                    />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Ubicación Geográfica"
                        v-model="ubicacionGeograficaFin"
                    />
                    <q-select
                        standout="bg-green text-while"
                        :options="colombia"
                        option-label="departamento"
                        option-value="departamento"
                        label="Departamento"
                        v-model="departamentoFin"
                    />
                    <q-select
                        standout="bg-green text-while"
                        :options="ciudadOpciones"
                        label="Ciudad"
                        v-model="ciudadFin"
                    />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Límites Finca"
                        v-model="limitesFin"
                    />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Área Finca"
                        v-model="areaFin"
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
.q-form .q-select {
    margin-bottom: 15px;
}
</style>
