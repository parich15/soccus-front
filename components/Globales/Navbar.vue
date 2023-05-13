<template>
    <div class="fixed top-0 z-50 bg-slate-100 min-w-full p-3 mb-1 flex align-center border-b dark:bg-gray-950 dark:border-slate-950">

        <!-- Logo -->
        <div class="flex align-center ml-2">
            <div>
              <NuxtLink to="/">
                <img v-if="!isDark" src="/logos/logo-black.png" class="h-10 w-auto" alt="">
                <img v-else src="/logos/logo-white.png" class="h-10 w-auto" alt="">
              </NuxtLink>

            </div>
        </div>

        <!-- Movil -->
        <div class="flex ml-auto w-1/3 justify-between items-center sm:hidden">
            <GlobalesLogin></GlobalesLogin>
            <GlobalesCarrito></GlobalesCarrito>
            <GlobalesMenu></GlobalesMenu>
        </div>

        <!-- Ordenador -->
        <div class="justify-end ml-auto w-9/12 items-center hidden sm:flex">
            <div v-for="enlace in enlaces" :key="enlace.key">
                <nav class="mx-3 font-primary text-2xl dark:text-gray-300">
                  {{ enlace.texto }}
                </nav>
            </div>
            <GlobalesAjustes></GlobalesAjustes>
        </div>
    </div>
</template>

<script setup>
import { isDark } from '~~/composables/useDark'
const enlaces = [
  {
    url: '/',
    texto: 'Inicio',
    key: 1,
  },
  {
    url: '/Archivo',
    texto: 'Archivo',
    key: 2,
  },
  {
    url: '/Sorteos',
    texto: 'Sorteos',
    key: 3,
  },
  {
    url: '/Nosotros',
    texto: 'Nosotros',
    key: 4
  }
]
</script>
