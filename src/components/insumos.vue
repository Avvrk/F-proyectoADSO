          <script setup>
          import { ref, onMounted } from "vue";
          import { useQuasar } from "quasar";
          const $q = useQuasar();
          // Variables para el funcionamiento de la tabla
          let rows = ref([
            {
              _idProveedor: 23534546,
              nombre: 'Insecticida',
              relacionNPK: '20-10-30',
              cantidad: 30,
              unidad: '$ 12.000',
              total: '$ 360.000',
              responsable: 'Miguel',
              observaciones: 'Aplicar con sus medidas de precaución',
            },
            {
              _idProveedor: 3454567,
              nombre: 'Plaguicida',
              relacionNPK: '40-5-10',
              cantidad: 10,
              unidad: '$ 8.000',
              total: '$ 80.000',
              responsable: 'Josue',
              observaciones: 'Utilizar elementos de protección personal',
            },
          ]);
          let columns = ref([
            { name: '_idProveedor', align: 'center', label: 'ID de Proveedor', field: '_idProveedor', sortable: true },
            { name: 'nombre', align: 'center', label: 'Nombre', field: 'nombre', sortable: true },
            { name: 'relacionNPK', align: 'center', label: 'Relación NPK', field: 'relacionNPK', sortable: true },
            { name: 'cantidad', align: 'center', label: 'Cantidad', field: 'cantidad', sortable: true },
            { name: 'unidad', align: 'center', label: 'Unidad', field: 'unidad', sortable: true },
            { name: 'total', align: 'center', label: 'Total', field: 'total', sortable: true },
            { name: 'responsable', align: 'center', label: 'Responsable', field: 'responsable', sortable: true },
            { name: 'observaciones', align: 'center', label: 'Observaciones', field: 'observaciones', sortable: true },
          ]);
          onMounted(() => {
          });
          </script>

<template>
  <div class="container">

    <div class="title text-h2 text-center">
      Insumos
    </div>
    <hr class="divider">
    <q-table v-if="!loading" flat bordered title="Lista de Insumos" :rows="rows" :columns="columns" row-key="id" class="table">
      <template v-slot:body-cell-opciones="props">
        <q-td :props="props" class="actions-cell">
          <q-btn @click="editarVistaFondo(true, props.row, false)" class="btn-editar">
            ✏️
          </q-btn>
          <q-btn v-if="props.row.estado == 1" @click="editarEstado(props.row)" class="btn-inactivar">
            ❌
          </q-btn>
          <q-btn v-else @click="editarEstado(props.row)" class="btn-activar">
            ✅
          </q-btn>
        </q-td>
      </template>
      <template v-slot:body-cell-estado="props">
        <q-td :props="props" class="status-cell">
          <p v-if="props.row.estado == 1" class="status-activo">
            Activo
          </p>
          <p v-else class="status-inactivo">Inactivo</p>
        </q-td>
      </template>
    </q-table>
  </div>

</template>


<style scoped>
.container {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
}
.title {
  margin-top: 20px;
  margin-bottom: 20px;
  color: #333;
}
.divider {
  height: 5px;
  background-color: #007bff;
  border: none;
  margin: 20px 0;
}
.table {
  margin-top: 40px;
  border-radius: 10px;
  overflow: hidden;
}
.actions-cell {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.btn-editar, .btn-inactivar, .btn-activar {
  font-size: 1pc;
  margin: 5px 5px;
}
.btn-editar {
  color: #007bff;
}
.btn-inactivar {
  color: #e74c3c;
}
.btn-activar {
  color: #2ecc71;
}
.status-cell p {
  margin: 0;
  font-weight: bold;
}
.status-activo {
  color: #2ecc71;
}
.status-inactivo {
  color: #e74c3c;
}
</style>
