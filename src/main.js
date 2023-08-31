// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

// Firebase
import { firebaseApp } from './firebase'
import { VueFire, VueFireAuth } from 'vuefire'

const app = createApp(App)

app.use(VueFire, {
  firebaseApp,
  modules: [
    // we will see other modules later on
    VueFireAuth(),
  ],
})

registerPlugins(app)

app.mount('#app')
