<template>
    <Popover class="relative">
        <PopoverButton class="p-2 rounded-full hover:bg-gray-300/20">
            <UserCircleIcon  v-if="auth.isLoggedIn" class="h-6 w-6 dark:text-slate-100" />
            <UserPlusIcon v-else class="h-6 w-6 dark:text-slate-100" />
        </PopoverButton>
        <transition enter-active-class="transition duration-200 ease-out" enter-from-class="translate-x-10 opacity-0"
            enter-to-class="translate-y-0 opacity-100" leave-active-class="transition duration-150 ease-in"
            leave-from-class="translate-y-0 opacity-100" leave-to-class="-translate-x-10 opacity-0" mode="out-in">
            <PopoverPanel
                class="absolute z-10 bg-slate-50 border rounded left-0 mt-4 w-screen max-w-[290px] -translate-x-[54%] lg:-translate-x-[50%] transform p-4 md:p-5 sm:px-0 lg:max-w-sm dark:bg-gray-900 dark:border-gray-800">
                <div class="grid grid-cols-1" v-if="!auth.isLoggedIn">
                    <div class="flex justify-between">
                        <button class="font-primary mb-3 text-xl dark:text-gray-100 opacity-50 transition-opacity disabled:opacity-100" :disabled="showLogin" @click="showLogin = true">Inicia sesión</button>
                        <button class="font-primary mb-3 text-xl dark:text-gray-100 opacity-50 transition-all disabled:opacity-100 focus:scale-95" :disabled="!showLogin" @click="showLogin = false">Registrate</button>
                    </div>
                   <Transition 
                   enter-active-class="transition duration-200 ease-out"
                   enter-from-class="opacity-0 scale-0"
                   enter-to-class="opacity-100 scale-100"
                   leave-active-class="transition duration-200 ease-in"
                   leave-from-class="opacity-100"
                   leave-to-class="opacity-0 scale-0"
                   mode="out-in">
                      <!-- Login -->
                    <form @submit.prevent="login" v-if="showLogin">
                        <VAlert v-if="error" type="error" class="mb-4"> Error: {{ error }} </VAlert>
                        <div v-if="loading" class="flex items-center justify-center flex-1">
                            <VLoading class="w-12 h-12 text-primary-600" />
                        </div>
                        <div v-if="!loading">
                            <label for="email" class="font-primary text-sm text-gray-500">Email</label>
                            <VInput class="my-2 font-mono bg-gray-200 dark:bg-gray-700" v-model="email" name="email" type="email" label="Email address"
                                placeholder="user@example.com" required />

                            <label for="email" class="font-primary text-sm text-gray-500 mb-0">Password</label>
                            <VInput class="my-2 font-mono bg-gray-200 dark:bg-gray-700" v-model="password" name="password" type="password" label="Password" required />
                            
                            <div class="flex items-center justify-center space-x-4 mt-5">
                                <VButton type="submit" variant="secondary" class="bg-red-500 disabled:bg-red-200" :disabled="!email || !password">
                                    <span class="font-primary text-xl text-white tracking-wide">Login</span>
                                </VButton>
                            </div>
                        </div>
                    </form>

                    <!-- Registro -->
                    <form @submit.prevent="register" v-else>
                        <VAlert v-if="error" type="error" class="mb-4"> Error: {{ error }} </VAlert>
                        <div v-if="loading" class="flex items-center justify-center flex-1">
                            <VLoading class="w-12 h-12 text-primary-600" />
                        </div>
                        <div v-if="!loading">
                            <label for="email" class="font-primary text-sm text-gray-500">Nombre</label>
                            <VInput class="my-2 font-mono bg-gray-200 dark:bg-gray-700" v-model="nombre" name="name" type="text" label="Nombre"
                                placeholder="Tu nombre" required />
                            <label for="surname" class="font-primary text-sm text-gray-500">Apellido</label>
                            <VInput class="my-2 font-mono bg-gray-200 dark:bg-gray-700" v-model="apellido" name="surname" type="text" label="Nombre"
                                placeholder="Tu apellido" required />

                            <label for="email" class="font-primary text-sm text-gray-500">Email</label>
                            <VInput class="my-2 font-mono bg-gray-200 dark:bg-gray-700" v-model="email" name="email" type="email" label="Email"
                                placeholder="user@example.com" required />

                            <label for="email" class="font-primary text-sm text-gray-500 mb-0">Password</label>
                            <VInput class="my-2 font-mono bg-gray-200 dark:bg-gray-700" v-model="password" name="password" type="password" label="Password" required />
                            
                            <div class="flex items-center justify-center space-x-4 mt-5">
                                <VButton type="submit" variant="secondary" class="bg-gray-500 disabled:bg-red-200" :disabled="!email || !password">
                                    <span class="font-primary text-xl text-white tracking-wide">Registrate</span>
                                </VButton>
                            </div>
                        </div>
                    </form>
                   </Transition>
                  
                </div>
                <div class="grid grid-cols-1" v-else>
                    <NuxtLink :to="{path:'/usuario/'+auth.user.id}">
                        <h3 class="font-primary text-xl text-gray-800 dark:text-gray-200">Hola {{ auth.user.first_name }} {{ auth.user?.last_name }}</h3>
                    </NuxtLink>
                    <div class="grid grid-cols-2 mt-4">
                        <NuxtLink :to="{path:'/usuario/'+auth.user.id, hash:'#pedidos'}">
                             <div class="font-primary text-lg flex items-center text-gray-600">
                                <ArchiveBoxArrowDownIcon class="h-4 w-4 mr-1"/> Orders
                            </div>
                        </NuxtLink>
                       
                        <div>
                            <button class="ml-auto mr-3 font-primary text-lg flex items-center text-gray-600" @click="auth.logout(), showLogin = true">
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
import { useAuth } from '~/store/auth';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { UserPlusIcon, UserCircleIcon, ArchiveBoxArrowDownIcon, PowerIcon } from '@heroicons/vue/24/outline';
const auth = useAuth()
const email = ref()
const password = ref()
const showLogin = ref(true)
const error = ref(null)
const loading = ref(false)
const nombre = ref(null);
const apellido = ref(null);


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

async function register(){
    loading.value = true;
    const config = useRuntimeConfig();
    const user = {
        first_name: nombre.value,
        last_name: apellido.value,
        role: "dbd657b7-0fcc-42b5-93ba-2af20cba0d48",
        email: email.value,
        password:password.value
    }
    const {data} = useFetch(config.public.directusApi+'/users',{
        method:'POST',
        body:user
    })
    setTimeout(async()=>await login(),1500)
}
</script>