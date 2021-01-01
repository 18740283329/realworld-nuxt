export default {
    middleware: ['notAuthenticated', 'authenticated'],
    plugins: ['~/plugins/request', '~/plugins/filter'],
    router: {
        extendRoutes(routes, resolve) {
            routes.splice(0);
            routes.push(...[
                {
                    name: 'home',
                    path: '/',
                    component: resolve(__dirname, 'pages/index.vue')
                },
                {
                    name: 'article',
                    path: '/article/:slug',
                    component: resolve(__dirname, 'pages/article.vue')
                },
                {
                    name: 'setting',
                    path: '/setting',
                    component: resolve(__dirname, 'pages/setting.vue')
                },
                {
                    name: 'register',
                    path: '/register',
                    component: resolve(__dirname, 'pages/register.vue')
                },
                {
                    name: 'login',
                    path: '/login',
                    component: resolve(__dirname, 'pages/register.vue')
                },
                {
                    name: 'editor',
                    path: '/editor/:slug?',
                    component: resolve(__dirname, 'pages/editor.vue')
                },
                {
                    name: 'profile',
                    path: '/profile/:username?',
                    component: resolve(__dirname, 'pages/profile.vue')
                }
            ])
        }
    },
    server: {
        host: '0.0.0.0',
        port: 3000
    },
}