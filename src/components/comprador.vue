<script setup>
import { ref, onMounted, computed } from "vue";
import { useStoreComprador } from "../stores/comprador.js";
import notify from "../utils/notificaciones.js";

const useComprador = useStoreComprador();

const opcionesTabla = ["Todos", "Activos", "Inactivos", "Fechas", "Documento"];
const produccion = ref([]);
const rows = ref([]);
const columns = ref([
    {
        name: "_id_produccion",
        label: "Produccion",
        field: (row) =>
            `${row._id_produccion.cultivo_id.nombre} (tipo: ${row._id_produccion.cultivo_id.tipo})`,
        align: "center",
        sortable: true,
    },
    {
        name: "fecha",
        label: "Fecha",
        field: (row) => {
            return row.fecha.split("T")[0];
        },
        align: "center",
    },
    {
        name: "especie",
        label: "Especie",
        field: "especie",
        align: "center",
        sortable: true,
    },
    {
        name: "nombre",
        label: "Nombre",
        field: "nombre",
        align: "center",
    },
    {
        name: "telefono",
        label: "Telefono",
        field: "telefono",
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
        name: "numeroGuiaTransporte",
        label: "Num. Guia de transporte",
        field: "numeroGuiaTransporte",
        align: "center",
        sortable: true,
    },
    {
        name: "valor",
        label: "Valor",
        field: "valor",
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

const produccionComprador = ref("");
const fechaComprador = ref("");
const especieComprador = ref("");
const nombreComprador = ref("");
const telefonoComprador = ref("");
const cantidadComprador = ref("");
const numeroGuiaTransporteComprador = ref("");
const valorComprador = ref("");

const opcionTabla = ref("Todos");

const fechaInicio = ref("");
const fechaFin = ref("");
const documento = ref("");

const datos = ref([]);

const mostrarFormularioComprador = ref(false);
const mostrarBotonEditar = ref(false);
const mostrarInputFecha = ref(false);
const mostrarSelectDocumento = ref(false);
const mostraInput = ref(false);
const loading = ref(true);

const opcionesProduccion = computed(() => {
    return produccion.value.map((p) => {
        return {
            label: `${p.cultivo_id.nombre} (tipo: ${p.cultivo_id.tipo})`,
            id: `${p._id}`,
        };
    });
});

const opcionesDocumento = computed(() => {
    return rows.value.map((c) => {
        return {
            label: `${c.nombre} (dni: ${c.documento})`,
            id: `${c.documento}`,
        };
    });
});

async function listarProduccion() {
    try {
        loading.value = true;
        const r = await useComprador.getProduccion();
        produccion.value = r.data.producciones;
    } finally {
        loading.value = false;
    }
}

async function listarComprador() {
    try {
        loading.value = true;
        const r = await useComprador.getComprador();
        rows.value = r.data.compradores;
    } finally {
        loading.value = false;
    }
}

async function listarCompradorActivo() {
    try {
        loading.value = true;
        const r = await useComprador.getCompradorActivos();
        rows.value = r.data.compradores;
    } finally {
        loading.value = false;
    }
}

async function listarCompradorInactivo() {
    try {
        loading.value = true;
        const r = await useComprador.getCompradorInactivos();
        rows.value = r.data.compradores;
    } finally {
        loading.value = false;
    }
}

async function listarCompradorFechas() {
    if (fechaInicio.value && fechaFin.value) {
        const inicio = new Date(fechaInicio.value);
        const fin = new Date(fechaFin.value);

        if (inicio > fin) {
            notify("La fecha de inicio no puede ser mayor que la fecha de fin.")
            return;
        }
        try {
            loading.value = true;
            const r = await useComprador.getCompradorFechas(
                fechaInicio.value,
                fechaFin.value
            );
            console.log(fechaFin.value, fechaInicio.value);

            rows.value = r.data.compradores;
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

async function listarCompradorDocumento() {
    if (documento.value) {
        console.log(documento.value);

        try {
            loading.value = true;
            const r = await useComprador.getCompradorDocumento(
                documento.value.id
            );
            rows.value = r.data.compradores;
        } finally {
            loading.value = false;
        }
    } else {
        notify("Llena el campo")
    }
}

async function editarEstado(elemento) {
    try {
        loading.value = true;
        if (elemento.estado === 1) {
            const res = await useComprador.putCompradorInactivar(elemento._id);
        } else if (elemento.estado === 0) {
            const res = await useComprador.putCompradorActivar(elemento._id);
        }
        listarComprador();
    } finally {
        loading.value = false;
    }
}

async function registrar() {
    if (validarDatos()) {
        try {
            loading.value = true;
            const info = {
                _id_produccion: produccionComprador.value.id,
                fecha: fechaComprador.value,
                especie: especieComprador.value,
                nombre: nombreComprador.value,
                telefono: telefonoComprador.value,
                cantidad: cantidadComprador.value,
                numeroGuiaTransporte: numeroGuiaTransporteComprador.value,
                valor: valorComprador.value,
            };

            const r = await useComprador.postComprador(info);
            if (r.status === 200) {
                mostrarFormularioComprador.value = false;
                listarComprador();
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
                _id_produccion: produccionComprador.value.id,
                fecha: fechaComprador.value,
                especie: especieComprador.value,
                nombre: nombreComprador.value,
                telefono: telefonoComprador.value,
                cantidad: cantidadComprador.value,
                numeroGuiaTransporte: numeroGuiaTransporteComprador.value,
                valor: valorComprador.value,
            };

            const r = await useComprador.putComprador(datos.value._id, info);
            if (r.status === 200) {
                mostrarFormularioComprador.value = false;
                listarComprador();
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
        !produccionComprador.value &&
        !fechaComprador.value &&
        !especieComprador.value.trim() &&
        !nombreComprador.value.trim() &&
        !telefonoComprador.value.trim() &&
        !cantidadComprador.value.trim() &&
        !numeroGuiaTransporteComprador.value.trim() &&
        !valorComprador.value.trim()
    ) {
        notify("Llena todos los campos");
        validacion = false;
    } else {
        if (!produccionComprador.value) {
            notify("La producción está vacía");
            validacion = false;
        }
        if (!fechaComprador.value) {
            notify("La fecha está vacía");
            validacion = false;
        }
        if (!especieComprador.value.trim()) {
            notify("La especie está vacía");
            validacion = false;
        }
        if (!nombreComprador.value.trim()) {
            notify("El nombre está vacío");
            validacion = false;
        }
        if (!telefonoComprador.value.trim()) {
            notify("El teléfono está vacío");
            validacion = false;
        }
        if (!cantidadComprador.value.trim()) {
            notify("La cantidad está vacía");
            validacion = false;
        }
        if (!numeroGuiaTransporteComprador.value.trim()) {
            notify("El número de guía de transporte está vacío");
            validacion = false;
        }
        if (!valorComprador.value.trim()) {
            notify("El total está vacío");
            validacion = false;
        }
    }

    return validacion;
}

function controlFormulario(obj, boolean) {
    produccionComprador.value = "";
    fechaComprador.value = "";
    especieComprador.value = "";
    nombreComprador.value = "";
    telefonoComprador.value = "";
    cantidadComprador.value = "";
    numeroGuiaTransporteComprador.value = "";
    valorComprador.value = "";

    datos.value = obj;
    mostrarBotonEditar.value = false;
    if (obj != null && boolean == true) {
        produccionComprador.value = opcionesProduccion.value.find(
            (p) => p.id == datos.value._id_produccion._id
        );
        fechaComprador.value = datos.value.fecha.split("T")[0];
        especieComprador.value = datos.value.especie;
        nombreComprador.value = datos.value.nombre;
        telefonoComprador.value = String(datos.value.telefono);
        cantidadComprador.value = String(datos.value.cantidad);
        numeroGuiaTransporteComprador.value = datos.value.numeroGuiaTransporte;
        valorComprador.value = String(datos.value.total);

        mostrarBotonEditar.value = true;
    }
    mostrarFormularioComprador.value = boolean;
}

function estadoTabla() {
    if (opcionTabla.value == "Activos") {
        mostrarInputFecha.value = false;
        mostrarSelectDocumento.value = false;
        mostraInput.value = false;
        listarCompradorActivo();
    } else if (opcionTabla.value == "Inactivos") {
        mostrarInputFecha.value = false;
        mostrarSelectDocumento.value = false;
        mostraInput.value = false;
        listarCompradorInactivo();
    } else if (opcionTabla.value == "Fechas") {
        fechaFin.value = "";
        fechaInicio.value = "";
        mostrarInputFecha.value = true;
        mostrarSelectDocumento.value = false;
        mostraInput.value = true;
    } else if (opcionTabla.value == "Documento") {
        documento.value = "";
        mostrarInputFecha.value = false;
        mostrarSelectDocumento.value = true;
        mostraInput.value = true;
    } else {
        mostrarInputFecha.value = false;
        mostrarSelectDocumento.value = false;
        mostraInput.value = false;
        listarComprador();
    }
}

onMounted(() => {
    listarProduccion();
    listarComprador();
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
                                Comprador
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
                                <q-select
                                    standout
                                    style="width: 300px"
                                    v-if="mostrarSelectDocumento"
                                    label="Responsable"
                                    :options="opcionesDocumento"
                                    v-model="documento" />
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
                                <q-btn
                                    unelevated
                                    style="background-color: #ededed"
                                    v-if="mostraInput"
                                    @click="
                                        mostrarInputFecha
                                            ? listarCompradorFechas()
                                            : mostrarSelectDocumento
                                            ? listarCompradorDocumento()
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
            </q-table>
        </div>
        <q-dialog v-model="mostrarFormularioComprador">
            <q-card>
                <q-form
                    @submit="mostrarBotonEditar ? editar() : registrar()"
                    class="q-gutter-md">
                    <p class="text-h5 text-center q-pb-md text-green">
                        {{ datos ? "Editar" : "Agregar" }} Comprador
                    </p>
                    <q-select
                        standout="bg-green text-white"
                        :options="opcionesProduccion"
                        label="Produccion"
                        v-model="produccionComprador" />
                    <q-input
                        standout="bg-green text-while"
                        type="date"
                        label="Fecha"
                        v-model="fechaComprador" />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Especie"
                        v-model="especieComprador" />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Nombre"
                        v-model="nombreComprador" />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Telefono"
                        v-model="telefonoComprador" />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Cantidad"
                        v-model="cantidadComprador" />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Num Guia de Transporte"
                        v-model="numeroGuiaTransporteComprador" />
                    <q-input
                        standout="bg-green text-while"
                        type="text"
                        label="Valor"
                        v-model="valorComprador" />
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
