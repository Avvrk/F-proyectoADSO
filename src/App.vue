<script setup></script>

<template>
    <div>
        <router-view />
    </div>
</template>

<style scoped>
div {
    height: 100vh;
}
</style>

<!-- <template>
    <div>
        <q-input
            standout="bg-green text-white"
            type="textarea"
            label="Resultados (separar con comas)"
            v-model="resultadosInput"
        />
        <q-btn @click="procesarResultados" label="Guardar Resultados" />

        <div v-for="(resultado, index) in resultados" :key="index" class="q-mt-md">
            <q-chip removable @remove="removerResultado(index)">
                {{ resultado }}
            </q-chip>
        </div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            resultadosInput: '',
            resultados: [],
        };
    },
    methods: {
        procesarResultados() {
            this.resultados = this.resultadosInput.split(',').map(item => item.trim()).filter(item => item);
            this.resultadosInput = ''; // Limpiar el campo
        },
        removerResultado(index) {
            this.resultados.splice(index, 1);
        },
    },
};
</script> -->
