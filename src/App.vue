<template>
  <div> <router-view /></div>
     
</template>

<script setup>
import { ref } from "vue";

const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>

<style scoped>
.drawer-links {
  text-align: center !important;
  font-size: 20px !important;
  /* Centra los enlaces horizontalmente */
  overflow: hidden;
  margin-top: 20px;
  height: 100%;
  margin: 0;
  padding-top: 20px;
  padding-bottom: 20px;
  overflow-y: auto;
}

.r {
  color: rgb(65, 60, 77);
}

.bg-primary {
  background-color: rgb(60, 63, 77) !important;
}
</style>
