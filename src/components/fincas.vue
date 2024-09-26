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
        name: "_idUsuario",
        align: "center",
        label: "Administrador",
        field: (row) => `${row._idUsuario.nombre}`,
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
        name: "area",
        align: "center",
        label: "Área",
        field: "area",
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
        name: "documentos",
        align: "center",
        label: "Documentos",
        field: "documentos",
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
const datosLimites = ref([]);
const norte = ref("");
const sur = ref("");
const este = ref("");
const oeste = ref("");

//Variables necesarias en el formulario
const idUsuarioFin = ref("");
const nombreFin = ref("");
const rutFin = ref("");
const direccionFin = ref("");
const ubicacionGeograficaFin = ref("");
const areaFin = ref("");
const departamentoFin = ref("");
const ciudadFin = ref("");
const documentosFin = ref("");
const limitesFin = ref("");

//Variables necesarias para la edición
const mostrarFormularioFinca = ref(false);
const mostrarBotonEditar = ref(false);
const loading = ref(true);

const mostrarDialogLimites = ref(false);


function mostrarLimites(finca) {
    datosLimites.value = finca;
    norte.value = finca.limites.norte;
    sur.value = finca.limites.sur;
    este.value = finca.limites.este;
    oeste.value = finca.limites.oeste;
    mostrarDialogLimites.value = true;
}

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
        admin.value = r.data.admins;
    } finally {
        loading.value = false;
    }
}

async function listarFincas() {
    try {
        loading.value = true;
        const r = await useFincas.getFincas();
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
                _idUsuario: idUsuarioFin.value.id,
                nombre: nombreFin.value,
                rut: rutFin.value,
                direccion: direccionFin.value,
                ubicacionGeografica: ubicacionGeograficaFin.value,
                area: areaFin.value,
                departamento: departamentoFin.value.departamento,
                ciudad: ciudadFin.value,
                documentos: documentosFin.value,
                limites: {
                    norte: norte.value,
                    sur: sur.value,
                    este: este.value,
                    oeste: oeste.value,
                },
            };
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
                _idUsuario: idUsuarioFin.value.id,
                nombre: nombreFin.value,
                rut: rutFin.value,
                direccion: direccionFin.value,
                ubicacionGeografica: ubicacionGeograficaFin.value,
                area: areaFin.value,
                departamento: departamentoFin.value.departamento,
                ciudad: ciudadFin.value,
                documentos: documentosFin.value,
                limites: {
                    norte: norte.value,
                    sur: sur.value,
                    este: este.value,
                    oeste: oeste.value,
                },
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
        !idUsuarioFin.value &&
        !nombreFin.value &&
        !rutFin.value &&
        !direccionFin.value &&
        !ubicacionGeograficaFin.value &&
        !areaFin.value &&
        !departamentoFin.value &&
        !ciudadFin.value &&
        !documentosFin.value &&
        !norte.value &&
        !sur.value &&
        !este.value &&
        !oeste.value
    ) {
        $q.notify({
            type: "negative",
            position: "top",
            message: "Todos los campos son obligatorios",
        });
        validacion = false;
    } else {
        if (!idUsuarioFin.value) {
            $q.notify({
                type: "negative",
                position: "top",
                message: "El campo ID de Administrador es obligatorio",
            });
            validacion = false;
        }
        if (!nombreFin.value) {
            $q.notify({
                type: "negative",
                position: "top",
                message: "El campo Nombre es obligatorio",
            });
            validacion = false;
        }
        if (!rutFin.value) {
            $q.notify({
                type: "negative",
                position: "top",
                message: "El campo RUT es obligatorio",
            });
            validacion = false;
        }
        if (!direccionFin.value) {
            $q.notify({
                type: "negative",
                position: "top",
                message: "El campo Dirección es obligatorio",
            });
            validacion = false;
        }
        if (!ubicacionGeograficaFin.value) {
            $q.notify({
                type: "negative",
                position: "top",
                message: "El campo Ubicación Geográfica es obligatorio",
            });
            validacion = false;
        }
        if (!departamentoFin.value) {
            $q.notify({
                type: "negative",
                position: "top",
                message: "El campo Departamento es obligatorio",
            });
            validacion = false;
        }
        if (!ciudadFin.value) {
            $q.notify({
                type: "negative",
                position: "top",
                message: "El campo Ciudad es obligatorio",
            });
            validacion = false;
        }
        if (!areaFin.value) {
            $q.notify({
                type: "negative",
                position: "top",
                message: "El campo Área es obligatorio",
            });
            validacion = false;
        }
        if (!documentosFin.value) {
            $q.notify({
                type: "negative",
                position: "top",
                message: "El campo documentos es obligatorio",
            });
        }
        if (!norte.value) {
            $q.notify({
                type: "negative",
                position: "top",
                message: "El campo norte es obligatorio",
            });
        }
        if (!sur.value) {
            $q.notify({
                type: "negative",
                position: "top",
                message: "El campo sur es obligatorio",
            });
        }
        if (!este.value) {
            $q.notify({
                type: "negative",
                position: "top",
                message: "El campo este es obligatorio",
            });
        }
        if (!oeste.value) {
            $q.notify({
                type: "negative",
                position: "top",
                message: "El campo oeste es obligatorio",
            });
        }
    }
    return validacion;
}

function controlFormulario(obj, boolean) {
    idUsuarioFin.value = "";
    nombreFin.value = "";
    rutFin.value = "";
    direccionFin.value = "";
    ubicacionGeograficaFin.value = "";
    areaFin.value = "";
    departamentoFin.value = "";
    ciudadFin.value = "";
    documentosFin.value = "";
    norte.value = "";
    sur.value = "";
    este.value = "";
    oeste.value = "";

    datos.value = obj;
    mostrarBotonEditar.value = false;
    if (obj != null && boolean == true) {
        idUsuarioFin.value = opcionesAdmins.value.find(
            (a) => a.id == datos.value._idUsuario._id
        );
        nombreFin.value = obj.nombre;
        rutFin.value = obj.rut;
        direccionFin.value = obj.direccion;
        ubicacionGeograficaFin.value = obj.ubicacionGeografica;
        areaFin.value = obj.area;
        departamentoFin.value = "";
        departamentoFin.value = colombia.value.find((c) =>
            c.ciudades.some((cc) => cc === datos.value.ciudad)
        );
        ciudadFin.value = datos.value.ciudad;
        documentosFin.value = datos.value.documentos;
        norte.value = datos.value.limites.norte;
        sur.value = datos.value.limites.sur;
        este.value = datos.value.limites.este;
        oeste.value = datos.value.limites.oeste;

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
                <template v-slot:body-cell-limites="props">
                    <q-td :props="props">
                        <q-btn
                            @click="mostrarLimites(props.row)"
                            label="📍"
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
                        v-model="idUsuarioFin"
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
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Área Finca"
                        v-model="areaFin"
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
                        standout="bg-green text while"
                        label="Documentos"
                        v-model="documentosFin"
                    />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Norte"
                        v-model="norte"
                    />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Sur"
                        v-model="sur"
                    />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Este"
                        v-model="este"
                    />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Oeste"
                        v-model="oeste"
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
        <q-dialog v-model="mostrarDialogLimites">
    <q-card>
        <q-div class="text-center">
            <p class="text-h5  q-pb-md text-green">
                Límites de la Finca: {{ datosLimites.nombre }}
            </p>
            <p><strong>Norte: </strong>{{ norte }}</p>
            <p><strong>Sur: </strong> {{ sur }}</p>
            <p><strong>Este: </strong> {{ este }}</p>
            <p><strong>Oeste: </strong> {{ oeste }}</p>
            <div class="row justify-end" style="gap: 10px">
                <q-btn @click="mostrarDialogLimites = false" flat label="Cerrar" />
            </div>
        </q-div>
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
