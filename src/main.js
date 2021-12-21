import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import { BootstrapVueIcons } from "bootstrap-vue";
import App from "./App.vue";
import { firestorePlugin } from "vuefire";

Vue.config.productionTip = false;
Vue.use(firestorePlugin);
Vue.use(BootstrapVueIcons);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
