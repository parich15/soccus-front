<template>
    <Popover class="relative">
        <PopoverButton class="p-2">
            <UserPlusIcon v-if="!auth.isLoggedIn" class="h-6 w-6 dark:text-slate-100" />
            <UserCircleIcon v-else class="h-6 w-6 dark:text-slate-100" />
        </PopoverButton>
        <transition enter-active-class="transition duration-200 ease-out" enter-from-class="translate-x-10 opacity-0"
            enter-to-class="translate-y-0 opacity-100" leave-active-class="transition duration-150 ease-in"
            leave-from-class="translate-y-0 opacity-100" leave-to-class="-translate-x-10 opacity-0" mode="out-in">
            <PopoverPanel
                class="absolute z-10 bg-slate-50 border rounded left-0 mt-4 w-screen max-w-[290px] -translate-x-[54%] transform p-4 sm:px-0 lg:max-w-3xl dark:bg-gray-900 dark:border-gray-800">
                <div class="grid grid-cols-1" v-if="!auth.isLoggedIn">
                    <form @submit.prevent="login">
                        <h4 class="font-primary text-center mb-3 text-xl dark:text-gray-100">Inicia sesión en tu cuenta</h4>
                        <VAlert v-if="error" type="error" class="mb-4"> Error: {{ error }} </VAlert>
                        <div v-if="loading" class="flex items-center justify-center flex-1">
                            <VLoading class="w-12 h-12 text-primary-600" />
                        </div>
                        <div v-if="!loading">
                            <label for="email" class="font-primary text-sm text-gray-500">Email</label>
                            <VInput class="my-2 font-mono" v-model="email" name="email" type="email" label="Email address"
                                placeholder="user@example.com" required />

                            <label for="email" class="font-primary text-sm text-gray-500 mb-0">Password</label>
                            <VInput class="my-2 font-mono" v-model="password" name="password" type="password" label="Password" required />
                            
                            <div class="flex items-center justify-center space-x-4">
                                <VButton type="submit" variant="secondary" class="bg-red-500" :disabled="!email || !password">
                                    <span class="font-primary text-xl text-white tracking-wide">Login</span>
                                </VButton>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="grid grid-cols-1" v-else>
                    <h3 class="font-primary text-xl text-gray-800 dark:text-gray-200">Hola {{ auth.user.first_name }} {{ auth.user?.last_name }}</h3>
                    <div class="grid grid-cols-2 mt-4">
                        <div class="font-primary text-lg flex items-center text-gray-600">
                           <ArchiveBoxArrowDownIcon class="h-4 w-4 mr-1"/> Mis Pedidos
                        </div>
                        <div>
                            <button class="ml-auto mr-3 font-primary text-lg flex items-center text-gray-600" @click="auth.logout()">
                                <PowerIcon  class="h-4 w-4 mr-1"/> Logout
                            </button>
                            
                        </div>
                    </div>
                </div>
            </PopoverPanel>
        </transition>
    </Popover>
</template>
  
<script setup>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { UserPlusIcon, UserCircleIcon, ArchiveBoxArrowDownIcon, PowerIcon } from '@heroicons/vue/24/outline';
import { useAuth } from '~/store/auth';
const auth = useAuth()
const email = ref()
const password = ref()
const error = ref(null)
const loading = ref(false)

async function login() {
  loading.value = true
  error.value = null
  try {
    // Login
    await auth.login({
      email: email.value,
      password: password.value,
    })
    // Clear the form
    email.value = ''
    password.value = ''
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>