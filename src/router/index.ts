import { createRouter, createWebHistory } from "vue-router"
import { useAuthStore } from "../stores/authStore"
import HomeView from "../views/HomeView.vue"
import LoginView from "../views/LoginView.vue"
import RegisterView from "../views/RegisterView.vue"
import DashboardView from "../views/DashboardView.vue"
import ProfileView from "../views/ProfileView.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/login",
            name: "login",
            component: LoginView,
        },
        {
            path: "/register",
            name: "register",
            component: RegisterView,
        },
        {
            path: "/dashboard",
            name: "dashboard",
            component: DashboardView,
            meta: { requiresAuth: true },
        },
        {
            path: "/profile",
            name: "profile",
            component: ProfileView,
            meta: { requiresAuth: true },
        },
    ],
})


router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next({ name: "login", query: { redirect: to.fullPath } })
    } else {
        next()
    }
})

export default router

