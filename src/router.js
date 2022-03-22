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
    component: () => import("@/views/users/Login")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/users/Register")
  },
  {
    path: "/account",
    name: "Dashboard",
    component: () => import('./views/users/Dashboard.vue')
  },
  {
    path: "/account/edit",
    name: "editAccount",
    component: () => import("@/views/users/EditAccount")
  },
  {
    path: "/items/user/:id",
    name: "viewUserItems",
    component: () => import('./views/users/UserItems.vue')
  },
  {
    path: "/user/:id",
    name: "viewUser",
    component: () => import('./views/users/ViewUser.vue')
  },
  // Items
  {
    path: "/items",
    name: "viewItems",
    component: () => import('./views/items/ViewItems.vue')
  },
  {
    path: "/items/add",
    name: "addItem",
    component: () => import('./views/items/AddItem.vue')
  },
  {
    path: "/items/:id",
    name: "viewSingleItem",
    component: () => import('./views/items/ViewSingleItem.vue')
  },
  {
    path: "/items/:id",
    name: "viewSingleItem",
    component: () => import('./views/items/ViewSingleItem.vue')
  },
  {
    path: "/items/edit/:id",
    name: "editItem",
    component: () => import('./views/items/EditItem.vue')
  },

  // Categories

  {
    path: "/items/category/:id",
    name: "viewCategory",
    component: () => import('./views/categories/ViewCategory.vue')
  },

  // Qualities

  {
    path: "/items/quality/:id",
    name: "viewQuality",
    component: () => import('./views/qualities/ViewQuality.vue')
  },

  // 404 Page not found
  {
    path: '*',
    beforeEnter: (to, from, next) => {
      next('/404')
    }
  }, {
    path: '/404',
    name: '404',
    component: () => import('./views/PageNotFound.vue')
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router