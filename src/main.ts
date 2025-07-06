import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { VueReCaptcha } from 'vue-recaptcha-v3'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueReCaptcha, {
  siteKey: '6LctkGwrAAAAAC6Q25pUJItPfEa5C4CoSA7vcSAJ',
  loaderOptions: {
    useRecaptchaNet: true,
    autoHideBadge: true
  }
})


app.mount('#app')
