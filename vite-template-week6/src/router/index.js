import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  // 主板頁面
  {
    path: '/',
    component: () => import('../views/FrontLayout.vue'),
    // 建立巢狀路由
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/front/HomeView.vue')
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../views/front/AboutView.vue')
      },
      {
        path: 'products',
        name: '產品列表',
        component: () => import('../views/front/ProductsView.vue')
      },
      {
        // 單一產品會使用動態路由
        path: 'product/:id',
        name: '單一產品內容',
        component: () => import('../views/front/ProductView.vue')
      },
      {
        path: 'cart',
        name: '購物車',
        component: () => import('../views/front/CartView.vue')
      },
      {
        path: 'login',
        name: '登入',
        component: () => import('../views/front/LoginView.vue')
      }
    ]
  },
  // Admin 後台頁面
  {
    path: '/admin',
    component: () => import('../views/DashboardView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/admin/AdminProducts.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/admin/AdminOrders.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
