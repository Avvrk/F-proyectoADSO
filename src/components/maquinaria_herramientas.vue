<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useStoreMaquinaria } from "../stores/maquinaria_herramientas.js";
import { useQuasar } from "quasar";

const $q = useQuasar();
const useMaquinaria = useStoreMaquinaria();

const opcionesTabla = ["Todos", "Activos", "Inactivos", "Fechas"];

const proveedores = ref([]);
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
        name: "tipo",
        label: "Tipo",
        field: "tipo",
        align: "center",
        sortable: true,
    },
    {
        name: "fechaCompra",
        label: "Fecha de Compra",
        field: (row) => `${row.fechaCompra}`.split("T")[0],
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
        name: "total",
        label: "Total",
        field: "total",
        align: "center",
        sortable: true,
    },
    {
        name: "estado",
        label: "Estado",
        field: (row) => (row.estado === 1 ? "Activo" : "Inactivo"),
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

const nombre = ref("");
const tipo = ref("");
const fechaCompra = ref("");
const observaciones = ref("");
const cantidad = ref("");
const total = ref("");
const proveedor = ref("");

const datos = ref([]);

const opcionTabla = ref("Todos");
const fechaInicio = ref("");
const fechaFin = ref("");


const mostrarInput = ref(false);
const mostrarInputFechas = ref(false);
const mostrarInputTipo = ref(false);
const mostrarFormularioMaquinaria = ref(false);
const mostrarBotonEditar = ref(false);
const loading = ref(true);

const opcionesProveedores = computed(() => {
    return proveedores.value.map((proveedor) => {
        return { label: proveedor.nombre, id: proveedor._id };
    });
});

async function listarProveedore() {
    try {
        loading.value = true;
        const r = await useMaquinaria.getProveedores();
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
        proveedores.value = r.data.proveedores;
    } finally {
        loading.value = false;
    }
}

async function listarMaquinaria() {
    try {
        loading.value = true;
        const r = await useMaquinaria.getMaquinaria();
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
        rows.value = r.data.maquinariaH;
    } finally {
        loading.value = false;
    }
}

async function listarMaquinariaActivo() {
    try {
        loading.value = true;
        const r = await useMaquinaria.getMaquinariaActivos();
		
        rows.value = r.data.maquinariaH;
    } finally {
        loading.value = false;
    }
}

async function listarMaquinariaInactivo() {
    try {
        loading.value = true;
        const r = await useMaquinaria.getMaquinariaInactivos();
        rows.value = r.data.maquinariaH;
    } finally {
        loading.value = false;
    }
}

async function listarMaquinariaFechas() {
    if (fechaInicio.value && fechaFin.value) {
        try {
            loading.value = true;
            const r = await useMaquinaria.getMaquinariaFechas(fechaInicio.value, fechaFin.value);
            rows.value = r.data.maquinariaH;
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

async function editarEstado(elemento) {
    try {
        loading.value = true;
        if (elemento.estado === 1) {
            await useMaquinaria.putMaquinariaInactivar(elemento._id);
        } else if (elemento.estado === 0) {
            await useMaquinaria.putMaquinariaActivar(elemento._id);
        }
        listarMaquinaria();
    } finally {
        loading.value = false;
    }
}

async function registrar() {
    if (validarDatos()) {
        try {
            loading.value = true;
            const info = {
                proveedores_id: proveedor.value.id,
                nombre: nombre.value,
                tipo: tipo.value,
                fechaCompra: fechaCompra.value,
                observaciones: observaciones.value,
                cantidad: cantidad.value,
                total: total.value,
            };

            const res = await useMaquinaria.postMaquinaria(info);
            if (res.status === 200) {
                mostrarFormularioMaquinaria.value = false;
                listarMaquinaria();
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
                proveedores_id: proveedor.value.id,
                nombre: nombre.value,
                tipo: tipo.value,
                fechaCompra: fechaCompra.value,
                observaciones: observaciones.value,
                cantidad: cantidad.value,
                total: total.value,
            };

            const res = await useMaquinaria.putMaquinaria(datos.value._id, info);
            if (res.status === 200) {
                mostrarFormularioMaquinaria.value = false;
                listarMaquinaria();
            }
        } finally {
            loading.value = false;
        }
    }
}

function validarDatos() {
    let validacion = true;
    if (!nombre.value || !tipo.value || !fechaCompra.value || !cantidad.value || !total.value || !proveedor.value) {
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
    nombre.value = "";
    tipo.value = "";
    fechaCompra.value = "";
    observaciones.value = "";
    cantidad.value = "";
    total.value = "";
    proveedor.value = "";

    datos.value = obj;
    mostrarBotonEditar.value = false;
    if (obj != null && boolean == true) {
        nombre.value = datos.value.nombre;
        tipo.value = datos.value.tipo;
        fechaCompra.value = datos.value.fechaCompra.split("T")[0];
        observaciones.value = datos.value.observaciones;
        cantidad.value = datos.value.cantidad;
        total.value = datos.value.total;
        proveedor.value = opcionesProveedores.value.find((p) => p.id == datos.value.proveedores_id);

        mostrarBotonEditar.value = true;
    }
    mostrarFormularioMaquinaria.value = boolean;
}

function estadoTabla() {
    if (opcionTabla.value == "Activos") {
        mostrarInputTipo.value = false;
        mostrarInputFechas.value = false;
        mostrarInput.value = false;
        listarMaquinariaActivo();
    } else if (opcionTabla.value == "Inactivos") {
        mostrarInputTipo.value = false;
        mostrarInputFechas.value = false;
        mostrarInput.value = false;
        listarMaquinariaInactivo();
    } else if (opcionTabla.value == "Fechas") {
        mostrarInputTipo.value = false;
        mostrarInputFechas.value = true;
        mostrarInput.value = true;
    } else {
        mostrarInputTipo.value = false;
        mostrarInputFechas.value = false;
        mostrarInput.value = false;
        listarMaquinaria();
    }
}

onMounted(() => {
    listarProveedore();
    listarMaquinaria();
});
</script>

<template>
    <div>
        <div class="q-pa-lg">
            <q-table :rows="rows" :columns="columns" row-key="id" :loading="loading">
                <template v-slot:top>
                    <section class="column full-width q-pr-md">
                        <div class="row items-center">
                            <h1 class="text-h4 q-pl-xl text-green-7">Maquinaria y Herramientas</h1>
                            <q-space />
                            <q-btn size="md" @click="controlFormulario(null, true)" label="Agregar" />
                        </div>
                        <div class="row items-center q-pb-md">
                            <q-space />
							<div class="row q-pr-xl q-gutter-lg">
                
                                <q-input standout v-if="mostrarInputFechas" label="Fecha Inicio" type="date" v-model="fechaInicio" />
                                <q-input standout v-if="mostrarInputFechas" label="Fecha Fin" type="date" v-model="fechaFin" />
                                <q-btn v-if="mostrarInput" @click="mostrarInputFechas ? listarMaquinariaFechas() : ''" label="Buscar" />
                            </div>
                            <q-select style="width: 200px" standout="bg-green text-while" :options="opcionesTabla" v-model="opcionTabla" label="Filtro por" @update:model-value="estadoTabla" />
                        </div>
                    </section>
                </template>
                <template v-slot:body-cell-estado="props">
                    <q-td :props="props">
                        <q-badge :color="props.row.estado === 1 ? 'green' : 'red'" align="top" :label="props.row.estado === 1 ? 'Activo' : 'Inactivo'" />
                    </q-td>
                </template>
                <template v-slot:body-cell-opciones="props">
                    <q-td :props="props" class="row justify-center" style="gap: 20px">
                        <q-btn @click="controlFormulario(props.row, true)"> ✏️ </q-btn>
                        <q-btn v-if="props.row.estado == 1" @click="editarEstado(props.row)"> ❌ </q-btn>
                        <q-btn v-else @click="editarEstado(props.row)"> ✅ </q-btn>
                    </q-td>
                </template>
            </q-table>
        </div>

        <q-dialog v-model="mostrarFormularioMaquinaria">
            <q-card>
                <q-form @submit="mostrarBotonEditar ? editar() : registrar()" class="q-gutter-sm">
                    <p class="text-h5 text-center q-pb-md text-green">{{ datos ? "Editar" : "Agregar" }} Administrador</p>
                    <q-input standout="bg-green text-while" type="text" label="Nombre" v-model="nombreAdmin" />
                    <q-input standout="bg-green text-while" type="text" label="tipo" v-model="direccionAdmin" />
                    <q-input standout="bg-green text-while" type="date" label="fecha de compra" v-model="correoAdmin" />
                    <q-input standout="bg-green text-while" type="text" label="cantidad" v-model="telefonoAdmin" />
                    <q-input standout="bg-green text-while" type="text" label="total" v-model="claveAdmin" />
                    <div class="row justify-end" style="gap: 10px">
                        <q-btn unelevated v-if="mostrarBotonEditar" label="Editar" type="submit" color="positive" />
                        <q-btn unelevated v-else label="Registrar" type="submit" color="positive" />
                        <q-btn @click="controlFormulario(null, false)" flat class="bg-red text-white" label="Cerrar" type="button" />
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
