<template>
  <Popover class="relative">
    <PopoverButton class="p-2">
      <Bars3BottomLeftIcon class="h-7 w-7 dark:text-slate-100" />
    </PopoverButton>
    <transition enter-active-class="transition duration-200 ease-out" enter-from-class="translate-x-10 opacity-0"
      enter-to-class="translate-y-0 opacity-100" leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100" leave-to-class="-translate-x-10 opacity-0" mode="out-in">
      <PopoverPanel
        class="absolute z-10 bg-slate-50 border rounded left-0 mt-[0.9rem] w-screen max-w-[290px] -translate-x-[81.8%] transform p-4 sm:px-0 lg:max-w-3xl dark:bg-gray-900 dark:border-gray-800">
        <div class="grid grid-cols-1">
          <h3 class="font-primary text-xl tracking-wide text-gray-600">Enlaces</h3>
          <div v-for="enlace in enlaces" :key="enlace.key" class="my-2 pb-1">
            <NuxtLink :to="enlace.url" class="font-primary text-4xl dark:text-gray-400">
              {{ enlace.texto }}
            </NuxtLink>
          </div>
          <hr class=" dark:opacity-50">
          <h3 class="font-display text-xl text-slate-500 text-left mt-2">Soccus Retro Web</h3>
          <div class="p-3 bg-gray-200 rounded mt-2 dark:bg-gray-900">
            <h3 class="font-primary text-xl tracking-wide text-gray-600 mb-1">Configuración</h3>
            <div class="flex justify-between mb-2">
              <div class="w-1/2">
                <span class="font-primary text-lg text-gray-600 mr-1">
                  Tallas:
                </span>
                <span class="font-bold text-lg text-gray-600">EU</span>
              </div>
              <div class="w-1/2 flex items-center">
                <span class="font-primary text-lg text-gray-600">
                  Tema:
                </span>
                <DarkModeToggle class="ml-5"></DarkModeToggle>
              </div>
            </div>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>
  
<script setup>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { Bars3BottomLeftIcon } from '@heroicons/vue/24/outline';
const enlaces = [
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