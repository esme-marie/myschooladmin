import Vue from 'vue'
import VueRouter from 'vue-router'
// import router from './router'
import App from './App.vue'
import Home from './components/Home.vue'
import Grades from './components/Grades.vue'

Vue.use(VueRouter)

Vue.config.productionTip = false

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home
  },
  {
    name: 'Grades',
    path: '/grades',
    component: Grades
  },
];

const router = new VueRouter({ mode: 'history', routes: routes })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
