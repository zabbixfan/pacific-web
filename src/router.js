import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store'
import config from 'config'
import cookie from 'assets/js/cookie_operator'

Vue.use(VueRouter)

function load(component) {
    return () => System.import(`components/${component}.vue`)
}

const router = new VueRouter({
    /*
     * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
     * it is only to be used only for websites.
     *
     * If you decide to go with "history" mode, please also open /config/index.js
     * and set "build.publicPath" to something other than an empty string.
     * Example: '/' instead of current ''
     *
     * If switching back to default "hash" mode, don't forget to set the
     * build publicPath back to '' so Cordova builds work again.
     */

    routes: [{
            path: '/',
            component: load('Index-layout'),
            children: [{
                path: '',
                component: load('Index')
            },
            {
                path: 'dns',
                component: load('dnslist')
            },
            {
                path: 'git',
                component: load('gitrepo')
            },
            {
                path: 'search',
                component: load('searchList')
            }]
        }, // Default
        {
            path: '*',
            component: load('Error404')
        } // Not found
    ]
})

router.beforeEach((to, from, next) => {
    if (store.state.account.token) {
        next()
    } else {
        if (to.query.accesstoken) {
            store.dispatch('setUserToken', to.query.accesstoken)
            next()
        } else if (cookie.getCookie('token')) {
            store.dispatch('setUserToken', cookie.getCookie('token'))
            next()
        } else {
            let s = `${config.authServerHost}/login?appid=${config.appid}&callback=${encodeURI(config.localHost + '/%23' + to.fullPath)}`
            location.href = s
        }
    }
})

export default router
