            <script setup>
            import { ref, onMounted } from "vue";
            import { useQuasar } from "quasar";
            const $q = useQuasar();
            // Variables para el funcionamiento de la tabla
            let rows = ref([
              {
                _idAdmin: 34546546,
                nombre: 'Julian',
                rut: 8765421,
                direccion: 'Vereda Los Naranjales',
                ubicacionGeografica: 83274983,
                departamento: 'Santander',
                ciudad: 'Barichara',
                limites: 6787678923,
                area: '5000 Km',
              },
              {
                _idAdmin: 456547657,
                nombre: 'Fernando',
                rut: 45657345,
                direccion: 'Vereda Robles Km 5',
                ubicacionGeografica: 34546567,
                departamento: 'Santander',
                ciudad: 'Villanueva',
                limites: 5645345345,
                area: '3000 Km',
              },
            ]);
            let columns = ref([
              { name: '_idAdmin', align: 'center', label: 'ID de Administrador', field: '_idAdmin', sortable: true },
              { name: 'nombre', align: 'center', label: 'Nombre', field: 'nombre', sortable: true },
              { name: 'rut', align: 'center', label: 'RUT', field: 'rut', sortable: true },
              { name: 'direccion', align: 'center', label: 'Dirección', field: 'direccion', sortable: true },
              { name: 'ubicacionGeografica', align: 'center', label: 'Ubicación Geográfica', field: 'ubicacionGeografica', sortable: true },
              { name: 'departamento', align: 'center', label: 'Departamento', field: 'departamento', sortable: true },
              { name: 'ciudad', align: 'center', label: 'Ciudad', field: 'ciudad', sortable: true },
              { name: 'limites', align: 'center', label: 'Límites', field: 'limites', sortable: true },
              { name: 'area', align: 'center', label: 'Área', field: 'area', sortable: true },
              { name: 'estado', align: 'center', label: 'Estado', field: 'estado', sortable: true },
              { name: 'opciones', align: 'center', label: 'Opciones', field: 'opciones', sortable: true },
            ]);
            onMounted(() => {
            });
            </script>



<template>
  <div class="container">

    <div class="title text-h2 text-center">
      Fincas
    </div>
    <hr class="divider">
    <q-table v-if="!loading" flat bordered title="Lista de Fincas" :rows="rows" :columns="columns" row-key="id" class="table">
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
