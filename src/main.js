import 'core-js/stable'
import Vue from 'vue'
import CoreuiVue from '@coreui/vue'
import App from './App'
import router from './router/index'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import vuexI18n from 'vuex-i18n';
import Locales from './locale/vue-i18n-locales.generated.js';
import { BootstrapVue, IconsPlugin, BootstrapVueIcons } from 'bootstrap-vue';
import VueMaterial from 'vue-material';
import Vuelidate from 'vuelidate';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
// import 'vue-material/dist/vue-material.min.css'
// import 'vue-material/dist/theme/default.css'
import VueAxios from 'vue-axios';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import VueCryptojs from 'vue-cryptojs';


import { library } from '@fortawesome/fontawesome-svg-core'
import { faFilePdf, faFileCode } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFilePdf, faFileCode)
import ThemifyIcon from "vue-themify-icons";
Vue.use(ThemifyIcon);

Vue.component('font-awesome-icon', FontAwesomeIcon);

import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

import VueFormWizard from 'vue-form-wizard'
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg.css'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import Vue2Filters from 'vue2-filters'

Vue.use(VueMaterial)
Vue.use(Vue2Filters)
Vue.use(VueFormWizard)

Vue.use(VueFormGenerator)
Vue.use(VueSweetalert2);

Vue.use(VueCryptojs)

Vue.use(IconsPlugin)
Vue.use(BootstrapVueIcons)
Vue.use(VueAxios, axios)
Vue.use(Vuelidate)
Vue.use(BootstrapVue)

// const server = "http://192.168.100.35:8000";
const server='http://18.218.153.207';

Vue.prototype.$apiAdress = server;

Vue.prototype.$prefijoamazon = 'https://pagosfile.s3-us-west-2.amazonaws.com/'
Vue.prototype.$keysecret = 'evolucionweb'

Vue.use(CoreuiVue)
Vue.use(vuexI18n.plugin, store);
Vue.i18n.add('en', Locales.en);
Vue.i18n.add('es', Locales.es);

let locale = 'en';
if (typeof localStorage.locale !== 'undefined') {
    locale = localStorage.getItem("locale")
}
Vue.i18n.set(locale);


try {
    let user = 'user'; ///usuario registrador anteriormente
    let token = 'token'; // token valido del usuario
    let roles = 'roles'; ///roles para este usuario
    let tema = "tema";
    let metodo = "metodo";


    if (localStorage.getItem(user) && localStorage.getItem(token)) {


        let usuario = {

            user: null,
            token: null,
            roles: null,
            tema: null,
            metodo: null


        };


        usuario.user = localStorage.getItem(user);

        usuario.token = Vue.CryptoJS.AES.decrypt(localStorage.getItem(token).toString(), Vue.prototype.$keysecret).toString(Vue.CryptoJS.enc.Utf8);
        usuario.roles = localStorage.getItem(roles);
        usuario.tema = localStorage.getItem(tema);
        usuario.metodo = localStorage.getItem(metodo);

        store.commit('setUserActionMain', usuario);
    } else {
        // console.log("notfound")
        store.commit('setUserActionMain', null);

    }


} catch (error) {

    // console.log(error)
}


new Vue({
    el: '#app',
    router,
    store,
    //CIcon component documentation: https://coreui.io/vue/docs/components/icon
    icons,
    template: '<App/>',
    components: {
        App,

    }
})
