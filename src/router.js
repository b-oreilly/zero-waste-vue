import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    /* route level code-splitting
    this generates a separate chunk (home.[hash].js) for this route
    which is lazy - loaded when the route is visited.*/
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue')
  },
  // User routes
  /* The code below is importing the Login and Register components from the users folder. */
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/users/Login"),
    meta: {
      requiresAuth: false,
    }
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/users/Register")
  },
  {

    path: "/account",
    name: "account",
    /* This is a route guard. It checks if the user is logged in. 
    If they are not, it redirects them to the register page. */
    component: () => import('./views/users/Account.vue'),
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (store.state.loggedIn == false) {
          router.push({
            name: 'login'
          })
        }
      } else {
        next();
      }
    }
  },
  {
    path: "/account/edit",
    name: "editAccount",
    component: () => import("@/views/users/EditAccount.vue"),
    /* This checks if the user is logged in - 
    if they are not, it redirects them to the register page. */
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!(store.state.loggedIn())) {
          router.push({
            name: 'login'
          })
        }
      } else {
        next()
      }
    }
  },

  // Search 
  {
    path: "/search",
    name: "search",
    component: () => import('./views/Search.vue')
  },

  // Messages

  /* The code below is importing the message components from the messages folder. */
  {
    path: "/user/messages",
    name: "messages",
    component: () => import('./views/messages/Messages.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/user/messages/create",
    name: "createMessage",
    component: () => import('./views/messages/CreateMessage.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/user/messages/:id",
    name: "viewSingleMessage",
    component: () => import('./views/messages/ViewSingleMessage.vue'),
    meta: {
      requiresAuth: true,
    }
  },

  // User Items


  {
    path: "/items/user/:id",
    name: "viewUserItems",
    component: () => import('./views/users/ViewUserItems.vue')
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
    /* This is a route guard. It checks if the user is logged in. 
    If they are not, it redirects them to the register page. */
    path: "/items/add",
    name: "addItem",
    component: () => import('./views/items/AddItem.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/items/:id",
    name: "viewSingleItem",
    component: () => import('./views/items/ViewSingleItem.vue')
  },
  {
    path: "/items/edit/:id",
    name: "editItem",
    component: () => import('./views/items/EditItem.vue'),

  },

  // Categories
  {
    path: "/items/category/all",
    name: "allCategories",
    component: () => import('./views/categories/AllCategories.vue')
  },
  {
    path: "/items/category/:id",
    name: "viewSingleCategory",
    component: () => import('./views/categories/ViewSingleCategory.vue')
  },

  // Qualities
  {
    path: "/items/quality/all",
    name: "allQualities",
    component: () => import('./views/qualities/AllQualities.vue')
  },
  {
    path: "/items/quality/:id",
    name: "viewSingleQuality",
    component: () => import('./views/qualities/ViewSingleQuality.vue')
  },

  /* Catch-all route -
     If the user tries to go to a route that doesn't exist, 
     it will redirect them to the 404 page. */

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

// routes.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (!(auth.loggedIn())) {
//       router.push({
//         name: 'login'
//       })
//     }
//   } else {
//     next()
//   }
// })

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router