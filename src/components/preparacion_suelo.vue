<script setup>
import { ref, onMounted, computed } from "vue";
import { useStorePreparacionSuelos } from "../stores/preparacion_suelo.js";
import { Notify } from "quasar";

const usePS = useStorePreparacionSuelos();

// loading es el indicador de carga
const loading = ref(false);

// Variable que contendrá todos los datos al estar editando
const datos = ref([]);

// Variables que manejan lo que se muestra en pantalla
const mostrarFormularioPrepararSuelo = ref(false);
const mostrarBotonEditar = ref(false);

// Objeto que contiene las claves vacías que se llenarán antes de ser enviado al backend
const objPreparacionSuelo = ref({
    fecha: "",
    id_parcela: "",
    empleado_id: "",
    productos: "",
    ingredienteActivo: "",
    dosis: "",
    metodoAplicacion: "",
    responsable: "",
    observaciones: "",
});

// Variables que contienen las listas de parcelas, empleados y filas de la tabla
const parcelas = ref([]);
const empleados = ref([]);
const rows = ref([]);

// Variables usadas para controlar la información de la tabla
const preparacionSuelos = ref([]);
const columns = [
    { name: "fecha", label: "Fecha", align: "center", field: (row) => `${row.fecha.split("T")[0]}` },
    {
        name: "id_parcela",
        label: "Parcela",
        align: "center",
        field: "id_parcela",
    },
    {
        name: "productos",
        label: "Productos",
        align: "left",
        field: "productos",
    },
    {
        name: "ingredienteActivo",
        label: "Ingrediente Activo",
        align: "left",
        field: "ingredienteActivo",
    },
    { name: "dosis", label: "Dosis", align: "left", field: "dosis" },
    {
        name: "metodoAplicacion",
        label: "Método de Aplicación",
        align: "left",
        field: "metodoAplicacion",
    },
    {
        name: "responsable",
        label: "Responsable",
        align: "left",
        field: "responsable",
    },
    {
        name: "observaciones",
        label: "Observaciones",
        align: "left",
        field: "observaciones",
    },
    {name: "estado",
        label: "Estado",
        field: "estado",
        align: "center",
    },
    {
        name: "actions",
        label: "Acciones",
        align: "center",
        field: "actions",
        slots: { default: "actions" },
    },
];

// Variables que contienen los datos a buscar o filtrar en la tabla
const opcion = ref("Todos");

// Funciones computadas para generar el array a mostrar en el formulario
const opcionesParcelas = computed(() => {
    return parcelas.value.map((parcela) => {
        return { label: `${parcela.numero} (rut: ${parcela.rut})`, id: parcela._id }
    })
});

const opcionesEmpleados = computed(() => {
    return empleados.value.map((empleado) => {
        return { label: `${empleado.nombre} (DNI: ${empleado.documento})`, id: empleado._id }
    })
});

// Función para listar la preparación de suelos desde el backend
const loadPreparacionSuelos = async () => {
    loading.value = true;
    try {
        const r = await usePS.getPreparacionSuelos();
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
        preparacionSuelos.value = r.data.preparaciones;
        rows.value = preparacionSuelos.value;
    } catch (error) {
        Notify.create({
            type: "negative",
            message: "Error al cargar la preparación de suelos.",
        });
    } finally {
        loading.value = false;
    }
};

// Funciones para cargar parcelas y empleados
const loadParcelas = async () => {
    try {
        const r = await usePS.getParcelas();
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
        parcelas.value = r.data.parcelas;
    } catch (error) {
        Notify.create({
            type: "negative",
            message: "Error al cargar las parcelas.",
        });
    }
};

const loadEmpleados = async () => {
    try {
        const r = await usePS.getEmpleados();
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
        empleados.value = r.data.empleados;
    } catch (error) {
        Notify.create({
            type: "negative",
            message: "Error al cargar los empleados.",
        });
    }
};

// Función para agregar una nueva preparación de suelo
const addPreparacionSuelo = async () => {
    try {
        if (!objPreparacionSuelo.value.fecha || !objPreparacionSuelo.value.id_parcela || !objPreparacionSuelo.value.empleado_id || !objPreparacionSuelo.value.productos || !objPreparacionSuelo.value.ingredienteActivo || !objPreparacionSuelo.value.dosis || !objPreparacionSuelo.value.metodoAplicacion || !objPreparacionSuelo.value.responsable || !objPreparacionSuelo.value.observaciones) {
            Notify.create({
                type: "negative",
                message: "Por favor, completa todos los campos.",
            });
            return;
        }

        const preparacionSueloData = {
            fecha: objPreparacionSuelo.value.fecha,
            id_parcela: objPreparacionSuelo.value.id_parcela.id,
            empleado_id: objPreparacionSuelo.value.empleado_id.id,
            productos: objPreparacionSuelo.value.productos,
            ingredienteActivo: objPreparacionSuelo.value.ingredienteActivo,
            dosis: objPreparacionSuelo.value.dosis,
            metodoAplicacion: objPreparacionSuelo.value.metodoAplicacion,
            responsable: objPreparacionSuelo.value.responsable,
            observaciones: objPreparacionSuelo.value.observaciones,
        };

        await usePS.postPreparacionSuelo(preparacionSueloData);

        loadPreparacionSuelos();
        mostrarFormularioPrepararSuelo.value = false;

        Notify.create({
            type: "positive",
            message: "Preparación agregada con éxito.",
        });
    } catch (error) {
        console.error(error);
        Notify.create({
            type: "negative",
            message: "Error al agregar la preparación.",
        });
    }
};

// Función para actualizar una preparación de suelo
const updatePreparacionSuelo = async () => {
    try {
        if (!objPreparacionSuelo.value.fecha || !objPreparacionSuelo.value.id_parcela || !objPreparacionSuelo.value.empleado_id || !objPreparacionSuelo.value.productos || !objPreparacionSuelo.value.ingredienteActivo || !objPreparacionSuelo.value.dosis || !objPreparacionSuelo.value.metodoAplicacion || !objPreparacionSuelo.value.responsable || !objPreparacionSuelo.value.observaciones) {
            Notify.create({
                type: "negative",
                message: "Por favor, completa todos los campos.",
            });
            return;
        }

        const preparacionSueloData = {
            fecha: objPreparacionSuelo.value.fecha,
            id_parcela: objPreparacionSuelo.value.id_parcela.id,
            empleado_id: objPreparacionSuelo.value.empleado_id.id,
            productos: objPreparacionSuelo.value.productos,
            ingredienteActivo: objPreparacionSuelo.value.ingredienteActivo,
            dosis: objPreparacionSuelo.value.dosis,
            metodoAplicacion: objPreparacionSuelo.value.metodoAplicacion,
            responsable: objPreparacionSuelo.value.responsable,
            observaciones: objPreparacionSuelo.value.observaciones,
        };

        await usePS.putPreparacionSuelo(datos.value._id, preparacionSueloData);

        loadPreparacionSuelos();
        mostrarFormularioPrepararSuelo.value = false;

        Notify.create({
            type: "positive",
            message: "Preparación de suelo actualizada exitosamente.",
        });
    } catch (error) {
        Notify.create({
            type: "negative",
            message: "Error al actualizar la preparación de suelo.",
        });
    }
};

// Función para cambiar el estado de una preparación de suelo
const changePreparacionSueloState = async (id, estado) => {
    try {
        await usePS.putPreparacionSueloEstado(id, estado);

        loadPreparacionSuelos();
        Notify.create({
            type: "positive",
            message: "Estado de la preparación de suelo cambiado exitosamente.",
        });
    } catch (error) {
        Notify.create({
            type: "negative",
            message: "Error al cambiar el estado de la preparación de suelo.",
        });
    }
};

// Función que administra lo que se ve en el formulario
function administrarFormulario(d, boolean) {
    objPreparacionSuelo.value = {
        fecha: "",
        id_parcela: "",
        empleado_id: "",
        productos: "",
        ingredienteActivo: "",
        dosis: "",
        metodoAplicacion: "",
        responsable: "",
        observaciones: "",
    };
    mostrarBotonEditar.value = false;
    datos.value = d;

    if (datos.value && boolean === true) {
        const parcelaSeleccionada = opcionesParcelas.value.find((p) => p.id === datos.value.id_parcela);
        const empleadoSeleccionado = opcionesEmpleados.value.find((e) => e.id === datos.value.empleado_id);

        if (parcelaSeleccionada) {
            datos.value.id_parcela = parcelaSeleccionada;
        }
        if (empleadoSeleccionado) {
            datos.value.empleado_id = empleadoSeleccionado;
        }

        objPreparacionSuelo.value = { ...datos.value };
        mostrarBotonEditar.value = true;
    }

    mostrarFormularioPrepararSuelo.value = true;
}

// Cargamos los datos al montar el componente
onMounted(() => {
    loadEmpleados();
    loadParcelas();
    loadPreparacionSuelos();
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
                                Preparación de suelos
                            </h1>
                            <q-space />
                            <q-btn
                                size="md"
                                @click="administrarFormulario(null, true)"
                                label="Agregar" />
                        </div>
                        <div class="row items-center q-pb-md">
                            <q-space />
                            <q-select
                                style="width: 200px"
                                standout="bg-green text-white"
                                :options="['Todos', 'Fechas', 'Parcelas']"
                                v-model="opcion"
                                label="Filtrar por" />
                        </div>
                    </section>
                </template>
                <template v-slot:body-cell-estado="props">
                    <q-td :props="props">
                        <q-badge
                            :color="props.row.estado === 1 ? 'green' : 'red'"
                            align="top"
                            :label="props.row.estado === 1 ? 'Activo' : 'Inactivo'" />
                    </q-td>
                </template>
                <template v-slot:body-cell-actions="props">
                    <q-td :props="props">
                        <q-btn @click="controlFormulario(props.row, true)">
                            ✏️
                        </q-btn>
                        <q-btn
                            v-if="props.row.estado == 1"
                            @click="changePreparacionSueloState(props.row._id, 0)">
                            ❌
                        </q-btn>
                        <q-btn v-else @click="changePreparacionSueloState(props.row._id, 1)">
                            ✅
                        </q-btn>
                    </q-td>
                </template>
            </q-table>
        </div>

        <q-dialog v-model="mostrarFormularioPrepararSuelo">
            <q-card>
                <q-form
                    @submit="mostrarBotonEditar ? editar() : registrar()"
                    class="q-gutter-sm">
                    <p class="text-h5 text-center q-pb-md text-green">
                        {{ datos ? "Editar" : "Agregar" }} preparacion de suelos
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
                        standout="bg-green text-while"
                        type="text"
                        label="Contraseña"
                        v-model="claveAdmin" />
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