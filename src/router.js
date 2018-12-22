import Vue from 'vue'
import Router from 'vue-router'
import passport from './views/passport.vue'
import step1 from './views/step1.vue'
import step2 from './views/step2.vue'
import BankTransferResult from './views/BankTransferResult.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/passport',
      name: 'passport',
      component: passport
    },
    {
      path: '/step1',
      name: 'stept1',
      component: step1
    },
    {
      path: '/step2',
      name: 'BankTransferStep2',
      component: step2
    },
    {
      path: '/BankTransferResult',
      name: 'BankTransferResult',
      component: BankTransferResult
    },
    {
      path: '/product/list',
      name: 'productList',
      beforeEnter: (to, from, next) => {
        console.log('to:', to);
        console.log('from:', from);
        let token = localStorage.getItem("token");
        if (token) {
          next();
        } else {
          alert("请先登录！")
          next({
            name: 'passport',
            query: {
              action: 'sign_in'
            }
          });
        }
      },
      component: () => import('./views/ProductList.vue'),
    }
  ]
})