import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'
import { router } from './routes/routes.js'
import './style.css'
import App from './App.vue'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

const pinia = createPinia()
const app = createApp(App)

app.use(Quasar, {
    plugins: {},
})
app.use(router)
app.use(pinia)
app.mount('#app')
