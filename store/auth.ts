import { defineStore } from 'pinia'

interface AuthState {
  loggedIn: boolean
  user: any
}

export const useAuth = defineStore('auth', {
  state: (): AuthState => ({
    loggedIn: false,
    user: {},
  }),

  getters: {
    isLoggedIn: (state) => state.loggedIn,
    userData: (state) => state.user,
  },

  actions: {
    async login({ email, password, redirect }) {
      const router = useRouter()
      const { $directus } = useNuxtApp()

      try {
        // Logueamos
        const response = await $directus.auth.login({
          email,
          password,
        })

        // Si 200, fectheamos data
        const user = await $directus.users.me.read({
          fields: ['*'],
        })

        // Actualizamos info de la store
        this.loggedIn = true
        this.user = user

        // Anti Redirecciones
        if (redirect) {
          router.push(redirect)
        }
      } catch (e) {
        console.log(e)
        throw new Error('Wrong email address or password')
      }
    },
    async logout() {
      const router = useRouter()
      const { $directus } = useNuxtApp()
      try {
        // Try to logout
        const response = await $directus.auth.logout()

        // Remove the auth_expires_at cookie that is left over from the logout
        const authExpiration = useCookie('auth_expires_at')
        authExpiration.value = null

        // If logout was successful, reset the auth store
        this.$reset()

        // Send the user back to the home page
        router.push('/')
      } catch (e) {
        console.log(e)
        throw new Error('Issue logging out')
      }
    },
    async getUser() {
      const { $directus } = useNuxtApp()
      try {
        // Try to fetch the user data
        const user = await $directus.users.me.read({
          fields: ['*'],
        })
        // Update the auth store with the user data
        this.loggedIn = true
        this.user = user
      } catch (e) {
        console.log(e)
      }
    },
    async resetState() {
      this.$reset()
    },
  },
})
