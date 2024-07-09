import { createApp } from "vue";
import { Quasar, Notify } from "quasar";
import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";
import { router } from "./router/router.js";
import App from "./App.vue";
import "./style.css";

import "@quasar/extras/material-icons/material-icons.css";
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import "quasar/src/css/index.sass";

const pinia = createPinia();
pinia.use(piniaPluginPersist);

const app = createApp(App);

app.use(Quasar, {
  plugins: {
    Notify,
  },
});

app.use(pinia);
app.use(router);
app.mount("#app");
