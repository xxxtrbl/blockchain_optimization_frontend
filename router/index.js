import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../src/view/HomePage.vue'
import TransactionsPage from '../src/view/TransactionsPage.vue'
import BlocksPage from '../src/view/BlocksPage.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage,
    },
    {
        path:'/transactions',
        name:'allTransactions',
        component:TransactionsPage,
    },
    {
        path:'/blocks',
        name:'allBlocks',
        component:BlocksPage
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router