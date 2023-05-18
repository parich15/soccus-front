import { useAuth } from '~/store/auth'
const msg = 'Debes de estar logueado para ver esta página.'

export default defineNuxtRouteMiddleware((to, from) => {
  const user = useAuth()

  if (!user.isLoggedIn) {
    if (process.client) {
      window.alert(msg)
    }
    return navigateTo('/')
  }
})
