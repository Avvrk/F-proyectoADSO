<script setup>
import { ref, onMounted, computed } from "vue";
import { useStoreAdmins } from "../stores/admin.js";
// import { useRouter } from "vue-router";
import notify from "../utils/notificaciones.js";

// const router = useRouter();

const useAdmin = useStoreAdmins();

const roles = ["Administrador", "Empleado"];
const opcionesTabla = ["Todos", "Activos", "Inactivos"];
const rows = ref([]);
const columns = ref([
    {
        name: "rol",
        label: "Rol",
        field: "rol",
        align: "center",
        sortable: true,
    },
    {
        name: "nombre",
        label: "Nombre",
        field: "nombre",
        align: "center",
        sortable: true,
    },
    {
        name: "rol",
        label: "Rol",
        field: "rol",
        align: "center",
        sortable: true,
    },
    {
        name: "direccion",
        label: "Direccion",
        field: "direccion",
        align: "center",
    },
    {
        name: "correo",
        label: "Correo",
        field: "correo",
        align: "center",
        sortable: true,
    },
    {
        name: "telefono",
        label: "Telefono",
        field: "telefono",
        align: "center",
    },
    {
        name: "municipio",
        label: "Municipio",
        field: "municipio",
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

// Variables necesarias en el formulario
const nombreAdmin = ref("");
const direccionAdmin = ref("");
const correoAdmin = ref("");
const telefonoAdmin = ref("");
const departamentoAdmin = ref("");
const ciudadAdmin = ref("");
const claveAdmin = ref("");
const rolAdmin = ref("");

// Varibale que controla lo que se mostrara en la tabla
const opcionTabla = ref("Todos");

const colombia = ref([]);

// Variable que contiene los datos de la persona al editar
const datos = ref([]);

// Variables que controlar no que se va a mostrar en la pantalla
const mostrarFormularioAdmin = ref(false);
const mostrarBotonEditar = ref(false);
const loading = ref(true);

const ciudadOpciones = computed(() => {
    const ciudad = colombia.value.find(
        (m) => m.departamento == departamentoAdmin.value.departamento
    );
    return ciudad ? ciudad.ciudades : [];
});

async function listarMunicipio() {
    const r = await useAdmin.getMunicipios();
    colombia.value = r.data;
}

async function listarAdmin() {
    try {
        loading.value = true;
        const r = await useAdmin.getAdmin();
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
                router.push("/")
            }
        } */
        rows.value = r.data.admins;
    } finally {
        loading.value = false;
    }
}

async function listarAdminActivo() {
    try {
        loading.value = true;
        const r = await useAdmin.getAdminActivos();
        rows.value = r.data.admins;
    } finally {
        loading.value = false;
    }
}

async function listarAdminInactivo() {
    try {
        loading.value = true;
        const r = await useAdmin.getAdminInactivos();
        rows.value = r.data.admins;
    } finally {
        loading.value = false;
    }
}

async function editarEstado(elemento) {
    try {
        loading.value = true;
        if (elemento.estado === 1) {
            const res = await useAdmin.putAdminInactivar(elemento._id);
        } else if (elemento.estado === 0) {
            const res = await useAdmin.putAdminActivar(elemento._id);
        }
        listarAdmin();
    } finally {
        loading.value = false;
    }
}

async function registrar() {
    if (validarDatos()) {
        try {
            loading.value = true;
            const info = {
                nombre: nombreAdmin.value,
                direccion: direccionAdmin.value,
                correo: correoAdmin.value,
                telefono: telefonoAdmin.value,
                municipio: ciudadAdmin.value,
                password: claveAdmin.value,
                rol: rolAdmin.value,
            };

            const res = await useAdmin.postAdmin(info);
            if (res.status === 200) {
                mostrarFormularioAdmin.value = false;
                listarAdmin();
            } else if (res.response && res.response.data.errors) {
				res.response.data.errors.forEach((err) => {
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
                nombre: nombreAdmin.value,
                direccion: direccionAdmin.value,
                correo: correoAdmin.value,
                telefono: telefonoAdmin.value,
                municipio: ciudadAdmin.value,
                rol: rolAdmin.value,
            };

            const r = await useAdmin.putAdmin(datos.value._id, info);
            if (r.status === 200) {
                mostrarFormularioAdmin.value = false;
                listarAdmin();
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
        !nombreAdmin.value.trim() &&
        !direccionAdmin.value.trim() &&
        !correoAdmin.value.trim() &&
        !telefonoAdmin.value.trim() &&
        !ciudadAdmin.value.trim() &&
        !rolAdmin.value &&
        datos.value == null &&
        !claveAdmin.value.trim() &&
        !rolAdmin.value
    ) {
        notify("Llena todos los campos");
        validacion = false;
    } else {
        if (!nombreAdmin.value.trim()) {
            notify("El nombre está vacío");
            validacion = false;
        }
        if (!direccionAdmin.value.trim()) {
            notify("La dirección está vacía");
            validacion = false;
        }
        if (!correoAdmin.value.trim()) {
            notify("El correo está vacío");
            validacion = false;
        }
        if (!telefonoAdmin.value.trim()) {
            notify("El teléfono está vacío");
            validacion = false;
        } else if (telefonoAdmin.value.length < 10) {
            notify("El teléfono debe tener mínimo 10 caracteres");
            validacion = false;
        }
        if (!ciudadAdmin.value.trim()) {
            notify("La ciudad está vacía");
            validacion = false;
        }
        if (datos === null && !claveAdmin.value.trim()) {
            notify("La contraseña está vacía");
            validacion = false;
        }
        if (!rolAdmin.value) {
            notify("El rol está vacío");
            validacion = false;
        }
    }

    return validacion;
}

function controlFormulario(obj, boolean) {
    nombreAdmin.value = "";
    direccionAdmin.value = "";
    correoAdmin.value = "";
    telefonoAdmin.value = "";
    departamentoAdmin.value = "";
    ciudadAdmin.value = "";
    rolAdmin.value = "";

    datos.value = obj;
    mostrarBotonEditar.value = false;
    if (obj != null && boolean == true) {
        nombreAdmin.value = datos.value.nombre;
        direccionAdmin.value = datos.value.direccion;
        correoAdmin.value = datos.value.correo;
        telefonoAdmin.value = String(datos.value.telefono);
        departamentoAdmin.value = "";
        departamentoAdmin.value = colombia.value.find((c) =>
            c.ciudades.some((cc) => cc === datos.value.municipio)
        );
        ciudadAdmin.value = datos.value.municipio;
        rolAdmin.value = datos.value.rol;

        mostrarBotonEditar.value = true;
    }
    mostrarFormularioAdmin.value = boolean;
}

function estadoTabla() {
    if (opcionTabla.value == "Activos") {
        listarAdminActivo();
    } else if (opcionTabla.value == "Inactivos") {
        listarAdminInactivo();
    } else {
        listarAdmin();
    }
}

onMounted(() => {
    listarAdmin();
    listarMunicipio();
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
                                Usuarios
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
                                standout="bg-green text-while"
                                :options="opcionesTabla"
                                v-model="opcionTabla"
                                label="Filtro por"
                                @update:model-value="estadoTabla" />
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
                <template v-slot:body-cell-opciones="props">
                    <q-td
                        :props="props"
                        class="row justify-center"
                        style="gap: 20px">
                        <q-btn @click="controlFormulario(props.row, true)">
                            ✏️
                        </q-btn>
                        <q-btn
                            v-if="props.row.estado == 1"
                            @click="editarEstado(props.row)">
                            ❌
                        </q-btn>
                        <q-btn v-else @click="editarEstado(props.row)">
                            ✅
                        </q-btn>
                    </q-td>
                </template>
            </q-table>
        </div>
        <q-dialog v-model="mostrarFormularioAdmin">
            <q-card>
                <q-form
                    @submit="mostrarBotonEditar ? editar() : registrar()"
                    class="q-gutter-md">
                    <p class="text-h5 text-center q-pb-md text-green">
                        {{ datos ? "Editar" : "Agregar" }} Usuario
                    </p>
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Nombre"
                        v-model="nombreAdmin" />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Direccion"
                        v-model="direccionAdmin" />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Correo"
                        v-model="correoAdmin" />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Telefono"
                        v-model="telefonoAdmin" />
                    <q-select
                        standout="bg-green text-while"
                        :options="colombia"
                        option-label="departamento"
                        option-value="departamento"
                        label="Municipio"
                        v-model="departamentoAdmin" />
                    <q-select
                        standout="bg-green text-while"
                        :options="ciudadOpciones"
                        label="Ciudad"
                        v-model="ciudadAdmin" />
                    <q-input
                        v-if="datos == null"
                        standout="bg-green text-while"
                        type="text"
                        label="Contraseña"
                        v-model="claveAdmin" />
                    <q-select
                        standout="bg-green text-while"
                        :options="roles"
                        label="Rol"
                        v-model="rolAdmin" />
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
