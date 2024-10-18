<script setup>
import { ref, onMounted, computed } from "vue";
import { useStoreEmpleados } from "../stores/empleados.js";
import notify from "../utils/notificaciones.js";

const useEmpleado = useStoreEmpleados();

const opcionesTabla = ["Todos", "Activos", "Inactivos"];
const rows = ref([]);
const columns = ref([
    {
        name: "nombre",
        label: "Nombre",
        field: "nombre",
        align: "center",
        sortable: true,
    },
    {
        name: "documento",
        label: "Documento",
        field: "documento",
        align: "center",
        sortable: true,
    },
    {
        name: "direccion",
        label: "Direccion",
        field: "direccion",
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
        name: "estudios",
        label: "Estudios",
        field: "estudios",
        align: "center",
        sortable: true,
    },
    {
        name: "descripcion",
        label: "Descripción",
        field: "descripcion",
        align: "center",
        sortable: true,
    },
    { name: "estado", label: "Estado", field: "estado", align: "center" },
    { name: "opciones", label: "Opciones", field: "opciones", align: "center" },
]);

// Variables necesarias en el formulario
const nombreEmpleado = ref("");
const documentoEmpleado = ref("");
const direccionEmpleado = ref("");
const telefonoEmpleado = ref("");
const estudiosEmpleado = ref("");
const descripcionEmpleado = ref("");

// Varibale que controla lo que se mostrara en la tabla
const opcionTabla = ref("Todos");

// Variable que contiene los datos del empleado al editar
const datos = ref([]);

// Variables que controla no que se va a mostrar en la pantalla
const mostrarFormularioEmpleado = ref(false);
const mostrarBotonEditar = ref(false);
const loading = ref(true);

async function listarEmpleado() {
    try {
        loading.value = true;
        const r = await useEmpleado.getEmpleados();
        rows.value = r.data.empleados;
    } finally {
        loading.value = false;
    }
}

async function listarEmpleadoActivo() {
    try {
        loading.value = true;
        const r = await useEmpleado.getEmpleadosActivos();
        rows.value = r.data.empleados;
    } finally {
        loading.value = false;
    }
}

async function listarEmpleadoInactivo() {
    try {
        loading.value = true;
        const r = await useEmpleado.getEmpleadosInactivos();
        rows.value = r.data.empleados;
    } finally {
        loading.value = false;
    }
}

async function editarEstado(elemento) {
    try {
        loading.value = true;
        if (elemento.estado === 1) {
            const res = await useEmpleado.putEmpleadosInactivar(elemento._id);
        } else if (elemento.estado === 0) {
            const res = await useEmpleado.putEmpleadosActivar(elemento._id);
        }
        listarEmpleado();
    } finally {
        loading.value = false;
    }
}

async function registrar() {
    if (validarDatos()) {
        try {
            loading.value = true;
            const info = {
                nombre: nombreEmpleado.value,
                documento: documentoEmpleado.value,
                direccion: direccionEmpleado.value,
                telefono: telefonoEmpleado.value,
                estudios: estudiosEmpleado.value,
                descripcion: descripcionEmpleado.value,
            };

            const r = await useEmpleado.postEmpleados(info);
            if (r.status === 200) {
                mostrarFormularioEmpleado.value = false;
                listarEmpleado();
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
                nombre: nombreEmpleado.value,
                documento: documentoEmpleado.value,
                direccion: direccionEmpleado.value,
                telefono: telefonoEmpleado.value,
                estudios: estudiosEmpleado.value,
                descripcion: descripcionEmpleado.value,
            };

            const r = await useEmpleado.putEmpleados(datos.value._id, info);
            if (r.status === 200) {
                mostrarFormularioEmpleado.value = false;
                listarEmpleado();
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
        !nombreEmpleado.value.trim() &&
        !documentoEmpleado.value.trim() &&
        !direccionEmpleado.value.trim() &&
        !telefonoEmpleado.value.trim() &&
        !estudiosEmpleado.value.trim() &&
        !descripcionEmpleado.value.trim()
    ) {
        notify("Llena todos los campos");
        validacion = false;
    } else {
        if (!nombreEmpleado.value.trim()) {
            notify("El nombre está vacío");
            validacion = false;
        }
        if (!documentoEmpleado.value.trim()) {
            notify("El documento está vacío");
            validacion = false;
        }
        if (!direccionEmpleado.value.trim()) {
            notify("La dirección está vacía");
            validacion = false;
        }
        if (!telefonoEmpleado.value.trim()) {
            notify("El teléfono está vacío");
            validacion = false;
        }
        if (!estudiosEmpleado.value.trim()) {
            notify("El campo estudios está vacío");
            validacion = false;
        }
        if (!descripcionEmpleado.value.trim()) {
            notify("El campo descripción está vacío");
            validacion = false;
        }
    }

    return validacion;
}

function controlFormulario(obj, boolean) {
    nombreEmpleado.value = "";
    documentoEmpleado.value = "";
    direccionEmpleado.value = "";
    telefonoEmpleado.value = "";
    estudiosEmpleado.value = "";
    descripcionEmpleado.value = "";

    datos.value = obj;
    mostrarBotonEditar.value = false;
    if (obj != null && boolean == true) {
        nombreEmpleado.value = datos.value.nombre;
        documentoEmpleado.value = datos.value.documento;
        direccionEmpleado.value = datos.value.direccion;
        telefonoEmpleado.value = datos.value.telefono;
        estudiosEmpleado.value = datos.value.estudios;
        descripcionEmpleado.value = datos.value.descripcion;
        mostrarBotonEditar.value = true;
    }
    mostrarFormularioEmpleado.value = boolean;
}

function estadoTabla() {
    if (opcionTabla.value == "Activos") {
        listarEmpleadoActivo();
    } else if (opcionTabla.value == "Inactivos") {
        listarEmpleadoInactivo();
    } else {
        listarEmpleado();
    }
}

onMounted(() => {
    listarEmpleado();
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
                                Empleados
                            </h1>
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
        <q-dialog v-model="mostrarFormularioEmpleado">
            <q-card>
                <q-form
                    @submit="mostrarBotonEditar ? editar() : registrar()"
                    class="q-gutter-md"
                >
                    <p class="text-h5 text-center q-pb-md text-green">
                        {{ datos ? "Editar" : "Agregar" }} Empleado
                    </p>
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Nombre"
                        v-model="nombreEmpleado"
                    />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Documento"
                        v-model="documentoEmpleado"
                    />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Direccion"
                        v-model="direccionEmpleado"
                    />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Teléfono"
                        v-model="telefonoEmpleado"
                    />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Estudios"
                        v-model="estudiosEmpleado"
                    />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Descripción"
                        v-model="descripcionEmpleado"
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
