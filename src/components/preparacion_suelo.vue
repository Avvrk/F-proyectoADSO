<script setup>
import { ref, onMounted, computed } from "vue";
import { useStorePreparacionSuelos } from "../stores/preparacion_suelo.js";
import { Notify } from "quasar";

const usePS = useStorePreparacionSuelos();

// loading es el loading
const loading = ref(false);

// Variable que contendra todos los datos al estar editando
const datos = ref([]);

// Variables que manejan lo que se muestra en pantalla
const mostrarFormularioPrepararSuelo = ref(false);
const mostrarBotonEditar = ref(false);

// Obj que contiene las claves vacias que se llenaran antes de ser enviado al backend
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

const parcelas = ref([]);
const empleados = ref([]);

// Variables usadas para controlar la informacion de la tabla
const preparacionSuelos = ref([]);
const columns = [
    { name: "fecha", label: "Fecha", align: "center", field: "fecha" },
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
    {
        name: "actions",
        label: "Acciones",
        align: "center",
        field: "actions",
        slots: { default: "actions" },
    },
];
// Variable que es usada en el select que esta en al tabla para filtrar los datos
const opcionesTabla = ["Todos", "Fechas", "Parcelas"];
// Variable que se encarga de tener el dato seleciconado por el select que filtra
const opcion = ref("Todos");

// Variables que contiene los datos a buscar o filtrar en la tabla
const parcela = ref("");
const fechaInicio = ref("");
const fechaFin = ref("");

// Funcion computada que genera el array a mostrar en el formulario
const opcionesParcelas = computed(() => {
  return parcelas.value.map((parcela) => {
    return { label: `${parcela.numero} (rut: ${parcela.rut})`, id: parcela._id }
  })
})

const opcionesEmpleados = computed(() => {
  return empleados.value.map((empleado) => {
    return { label: `${empleado.nombre} (DNI: ${empleado.documento})`, id: empleado._id }
  })
})

// Funcion flecha para mandar la peticion al backend
// sobre listar todos los datos de preparacion suelos
const loadPreparacionSuelos = async () => {
    loading.value = true;
    try {
        const r = await usePS.getPreparacionSuelos();
        preparacionSuelos.value = r.data.preparaciones;
    } catch (error) {
        Notify.create({
            type: "negative",
            message: "Error al cargar la preparación de suelos.",
        });
    } finally {
        loading.value = false;
    }
};

// Funcion flecha que trae todas las parcelas
const loadParcelas = async () => {
    try {
        const r = await usePS.getParcelas();
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
        empleados.value = r.data.empleados;
    } catch (error) {
        Notify.create({
            type: "negative",
            message: "Error al cargar los empledos.",
        });
    }
};

// Funcion flecha que valida y manda los datos al backend
const addPreparacionSuelo = async () => {
    try {
        console.log(objPreparacionSuelo.value);

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
            message: "preparacion agregada con éxito.",
        });
    } catch (error) {
        console.error(error);
        Notify.create({
            type: "negative",
            message: "Error al agregar la preparacion.",
        });
    }
};

// Funcion flecha que se encarga de validar y mandar los datos editados al backend
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
            fecha: objPreparacionSuelo.value.fecha.split("T")[0],
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
        console.error("Error al actualizar la preparación de suelo:", error);
    }
};

// Funcion flecha que se encarga de editar el estado
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
        console.error("Error al cambiar el estado de la preparación de suelo:", error);
    }
};

// Funcion mal hecha, piense
const filtrarDatos = async () => {
    if (opcion.value === "Fechas") {
        await listarPreparacionSuelosFechas();
    } else if (opcion.value === "Parcelas") {
        await listarPreparacionSuelosParcela();
    }
};

// Funcion flecha que hace el filtro por parcela creo:V
/* const listarPreparacionSuelosParcela = async () => {
	try {
		const r = await usePS.getPreparacionSuelosParcela(parcela.value);
		preparacionSuelos.value = r.data.preparaciones;
	} catch (error) {
		Notify.create({
			type: "negative",
			message: "Error al filtrar la preparación de suelos por parcela.",
		});
	}
}; */

// Funcion que administra lo que se ve en el formulario
function administrarFormulario(d, boolean) {
    // Resetear el objeto de preparación de suelos
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

    mostrarFormularioPrepararSuelo.value = boolean;
}


onMounted(() => {
    loadEmpleados();
    loadParcelas();
    loadPreparacionSuelos();
});
</script>

<template>
    <div>
        <div>
            <q-btn @click="administrarFormulario(null, true)" label="Agregar" color="primary" />
        </div>
        <q-table :rows="preparacionSuelos" :columns="columns" row-key="_id" :loading="loading">
            <template v-slot:top>
                <div class="q-mb-md">
                    <q-select v-if="opcion.value === 'Parcelas'" :options="opcionesParcelas" v-model="parcela" label="Selecciona Parcela" />
                    <q-input v-if="opcion.value === 'Fechas'" v-model="fechaInicio" label="Fecha Inicio" type="date" />
                    <q-input v-if="opcion.value === 'Fechas'" v-model="fechaFin" label="Fecha Fin" type="date" />
                    <q-btn v-if="opcion.value !== 'Todos'" label="Filtrar" @click="filtrarDatos" color="primary" />
                </div>
                <q-select v-model="opcion" :options="opcionesTabla" label="Opciones Tabla" />
            </template>
            <template v-slot:body-cell-actions="props">
                <q-btn icon="edit" color="primary" @click="administrarFormulario(props.row, true)" />
                <q-btn icon="delete" color="negative" @click="changePreparacionSueloState(props.row._id, props.row.estado)" />
            </template>
        </q-table>
        <q-dialog v-model="mostrarFormularioPrepararSuelo">
            <q-card>
                <q-form>
                    <q-input v-model="objPreparacionSuelo.fecha" label="Fecha" type="date" />
                    <q-select :options="opcionesParcelas" v-model="objPreparacionSuelo.id_parcela" label="Parcela" />
                    <q-select :options="opcionesEmpleados" v-model="objPreparacionSuelo.empleado_id" label="Empleado" />
                    <q-input v-model="objPreparacionSuelo.productos" label="Productos" />
                    <q-input v-model="objPreparacionSuelo.ingredienteActivo" label="Ingrediente Activo" />
                    <q-input v-model="objPreparacionSuelo.dosis" label="Dosis" />
                    <q-input v-model="objPreparacionSuelo.metodoAplicacion" label="Método de Aplicación" />
                    <q-input v-model="objPreparacionSuelo.responsable" label="Responsable" />
                    <q-input v-model="objPreparacionSuelo.observaciones" label="Observaciones" />
                    <div>
                        <q-btn @click="administrarFormulario(null, false)" label="Cancelar" />
                        <q-btn v-if="!mostrarBotonEditar" @click="addPreparacionSuelo()" color="primary" label="Agregar" />
                        <q-btn v-else @click="updatePreparacionSuelo()" color="primary" label="Editar" />
                    </div>
                </q-form>
            </q-card>
        </q-dialog>
    </div>
</template>
