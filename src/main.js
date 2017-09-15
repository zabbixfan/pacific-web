// === DEFAULT / CUSTO http.fetch(api.getDnsList, {

// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
// require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

import Vue from 'vue'
import Quasar from 'quasar'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)
Vue.use(Quasar) // Install Quasar Framework

Quasar.Toast.setDefaults({
    // props from above
    color: '#eee',
    timeout: 3000
})

Quasar.start(() => {
    /* eslint-disable no-new */
    new Vue({
        el: '#q-app',
        store,
        router,
        render: h => h(require('./App'))
    })
})
