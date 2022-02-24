import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '@/views/AboutView.vue')
  },
  // User routes
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/user/Login")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/user/Register")
  },
  {
    path: "/account",
    name: "account",
    component: () => import("@/views/user/Account")
  },
  // Items
  {
    path: "/items",
    name: "viewItems",
    component: () => import('./views/items/ViewItems.vue')
  },
  {
    path: "/items/:id",
    name: "viewSingleItem",
    component: () => import('./views/items/ViewSingleItem.vue')
  },
  {
    path: "/items/add",
    name: "addItem",
    component: () => import('./views/items/AddItem.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router