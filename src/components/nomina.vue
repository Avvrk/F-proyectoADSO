<script setup>
import { ref, onMounted, computed } from "vue";
import { useStoreNomina } from "../stores/nomina.js";
import { Notify } from "quasar";

// Variables usadas en el filtro
const opcionesTabla = ["Todos", "Fechas", "Empleados"]
const opcion = ref("Todos");
const mostrarSelectEmpleados = ref(false);
const mostrarInputFechas = ref(false);
const mostrarInput = ref(false);
const empleado = ref("");
const fechaInicio = ref("");
const fechaFin = ref("");

const storeNomina = useStoreNomina();

const loading = ref(false);
const dialogEditNomina = ref(false);
const dialogAddNomina = ref(false);
const editNomina = ref({});
const newNomina = ref({
    fecha: "",
    tipo: "",
    valor: 0,
    id_empleado: "",
    estado: 1,
});
const empleados = ref([]);


const nominas = ref([]);
const columns = [
    {
        name: "fecha",
        label: "Fecha",
        align: "center",
        field: (row) => row.fecha.split("T")[0],
    },


    {
        name: "id_empleado",
        label: "Empleado",
        align: "center",
        field: (row) => `${row.id_empleado.nombre} (dni: ${row.id_empleado.documento})`,
    },
    { name: "tipo", label: "Tipo", align: "center", field: "tipo" },

    {
        name: "valor",
        label: "Valor",
        align: "center",
        field: "valor",
        format: (val) => `$${val.toFixed(2)}`,
    },
    { name: "actions", label: "Acciones", align: "center" },
];

const opcionesEmpleado = computed(() => {
    return empleados.value.map((e) => ({
        label: `${e.nombre} (DNI: ${e.documento})`,
        id: e._id,
    }));
});


const loadNominas = async () => {
    loading.value = true;
    try {
        const response = await storeNomina.getNomina();
        nominas.value = response.data.nomina;
    } catch (error) {
        Notify.create({
            type: "negative",
            message: "Error al cargar las nóminas.",
        });
    } finally {
        loading.value = false;
    }
};

const loadEmpleados = async () => {
    try {
        const response = await storeNomina.getEmpleados();
        empleados.value = response.data.empleados;
    } catch (error) {
        Notify.create({
            type: "negative",
            message: "Error al cargar los empleados.",
        });
    }
};

const addNomina = async () => {
    try {
        if (!newNomina.value.fecha || !newNomina.value.tipo || !newNomina.value.valor || !newNomina.value.id_empleado) {
            Notify.create({
                type: "negative",
                message: "Por favor, completa todos los campos.",
            });
            return;
        }

        const nominaData = {
            fecha: newNomina.value.fecha,
            tipo: newNomina.value.tipo,
            valor: newNomina.value.valor,
            id_empleado: newNomina.value.id_empleado.id,
        };

        await storeNomina.postNomina(nominaData);
        await loadNominas();
        dialogAddNomina.value = false;
        Notify.create({ type: "positive", message: "Nómina agregada con éxito." });
    } catch (error) {
        console.error(error);
        Notify.create({ type: "negative", message: "Error al agregar la nómina." });
    }
};

const editNominaData = async (nomina) => {
    try {
        // Convertir la fecha al formato "yyyy-MM-dd"
        const fechaFormateada = nomina.fecha.split("T")[0];

        // Cargar los datos de la nómina seleccionada en el formulario de edición
        editNomina.value = {
            ...nomina,
            fecha: fechaFormateada, // Asignar la fecha formateada
            id_empleado: opcionesEmpleado.value.find((e) => e.id === nomina.id_empleado),
        };
        dialogEditNomina.value = true;
    } catch (error) {
        Notify.create({
            type: "negative",
            message: "Error al cargar la nómina para edición.",
        });
    }
};

const updateNomina = async () => {
    try {
        await storeNomina.putNomina(editNomina.value._id, {
            ...editNomina.value,
            id_empleado: editNomina.value.id_empleado.id, // Asegurarse de enviar solo el ID del empleado
        });
        await loadNominas();
        dialogEditNomina.value = false;
        Notify.create({
            type: "positive",
            message: "Nómina actualizada con éxito.",
        });
    } catch (error) {
        console.error(error);
        Notify.create({
            type: "negative",
            message: "Error al actualizar la nómina.",
        });
    }
};


async function listarAnalisisSueloFechas() {
    if (fechaInicio.value && fechaFin.value) {
        const inicio = new Date(fechaInicio.value);
        const fin = new Date(fechaFin.value);

        if (inicio > fin) {
            $q.notify({
                type: "negative",
                message:
                    "La fecha de inicio no puede ser mayor que la fecha de fin.",
                position: "bottom",
            });
            return;
        }
        try {
            loading.value = true;
            const r = await storeNomina.getNominaFechas(
                fechaInicio.value,
                fechaFin.value
            );
            nominas.value = r.data.nomina;
        } finally {
            loading.value = false;
        }
    } else {
        Notify.create({
            type: "negative",
            message: "Llena los campos",
            position: "bottom",
        });
    }
}


async function listarNominaEmpleados() {
    try {
        if (empleado.value) {
            loading.value = true;
            const r =  await storeNomina.getNominaEmpleados(empleado.value.id)
            nominas.value = r.data.nomina
        } else {
            Notify.create({
                type: "negative",
                message: "Complete el campo",
                position: "bottom",
            })
        }
    } finally {
        loading.value = false;
    }
}

function estadoTabla() {
    if (opcion.value == "Fechas") {
        mostrarSelectEmpleados.value = false;
        mostrarInputFechas.value = true;
        mostrarInput.value = true;
    } else if (opcion.value == "Empleados") {
        mostrarInputFechas.value = false;
        mostrarSelectEmpleados.value = true;
        mostrarInput.value = true;
    } else {
        mostrarInputFechas.value = false;
        mostrarSelectEmpleados.value = false;
        mostrarInput.value = false;
        loadNominas();
    }
}

onMounted(() => {
    loadNominas();
    loadEmpleados();
});
</script>

<template>
    <q-page>
        <q-card>
            <q-card-section>
                <q-btn @click="dialogAddNomina = true" label="Agregar Nómina" color="positive" />
            </q-card-section>

            <q-table :rows="nominas" :columns="columns" row-key="_id" :loading="loading">
                <template v-slot:top>
                    <q-select
                        v-if="mostrarSelectEmpleados"
                        :options="opcionesEmpleado"
                        v-model="empleado"/>
                    <q-input
                        v-if="mostrarInputFechas"
                        type="date"
                        label="Fecha Inicio"
                        v-model="fechaInicio"/>
                    <q-input
                        v-if="mostrarInputFechas"
                        type="date"
                        label="Fecha Fin"
                        v-model="fechaFin"/>
                    <q-btn
                        v-if="mostrarInput"
                        label="Buscar"
                        @click="mostrarInputFechas ? listarAnalisisSueloFechas() : mostrarSelectEmpleados ? listarNominaEmpleados() : ''"
                        />
                    <q-select
                        standout="bg-green text-while"
                        :options="opcionesTabla"
                        v-model="opcion"
                        @update:model-value="estadoTabla"/>
                </template>
                <template v-slot:loading>
                    <q-inner-loading :showing="loading" />
                </template>
                <template v-slot:body-cell-actions="props">
                    <q-td :props="props">
                        <q-btn @click="editNominaData(props.row)" icon="edit" color="primary" />
                    </q-td>
                </template>
            </q-table>

            <!-- Diálogo para editar nómina -->
            <q-dialog v-model="dialogEditNomina" persistent>
                <q-card>
                    <q-card-section>
                        <q-input v-model="editNomina.fecha" label="Fecha" type="date" />
                        <q-input v-model="editNomina.tipo" label="Tipo" />
                        <q-input v-model="editNomina.valor" label="Valor" type="number" />
                        <q-select v-model="editNomina.id_empleado" :options="opcionesEmpleado" label="Empleado" />
                    </q-card-section>

                    <q-card-actions>
                        <q-btn @click="updateNomina" label="Guardar" color="primary" />
                        <q-btn @click="dialogEditNomina = false" label="Cancelar" color="secondary" />
                    </q-card-actions>
                </q-card>
            </q-dialog>

            <!-- Diálogo para agregar nómina -->
            <q-dialog v-model="dialogAddNomina" persistent>
                <q-card>
                    <q-card-section>
                        <q-input v-model="newNomina.fecha" label="Fecha" type="date" />
                        <q-input v-model="newNomina.tipo" label="Tipo" />
                        <q-input v-model="newNomina.valor" label="Valor" type="number" />
                        <q-select v-model="newNomina.id_empleado" :options="opcionesEmpleado" label="Empleado" />
                    </q-card-section>

                    <q-card-actions>
                        <q-btn @click="addNomina" label="Agregar" color="primary" />
                        <q-btn @click="dialogAddNomina = false" label="Cancelar" color="secondary" />
                    </q-card-actions>
                </q-card>
            </q-dialog>
        </q-card>
    </q-page>
</template>
