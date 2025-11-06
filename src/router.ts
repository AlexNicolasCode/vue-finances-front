import { createRouter, createWebHistory } from 'vue-router';

import HomePage from './pages/home/index.vue';
import AccountPage from './pages/account/index.vue';
import CreateTransactionPage from './pages/create-transaction/index.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/account', component: AccountPage },
  { path: '/transactions/create', component: CreateTransactionPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;