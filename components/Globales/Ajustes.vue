<template>
    <Popover class="relative">
      <PopoverButton class="p-2">
        <Cog8ToothIcon class="h-7 w-7 dark:text-slate-100" />
      </PopoverButton>
      <transition enter-active-class="transition duration-200 ease-out" enter-from-class="translate-x-10 opacity-0"
        enter-to-class="translate-y-0 opacity-100" leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100" leave-to-class="-translate-x-10 opacity-0" mode="out-in">
        <PopoverPanel
          class="absolute z-10 bg-slate-50 border rounded left-0 mt-[0.9rem] w-screen -translate-x-[67%] transform p-4 sm:px-0 lg:max-w-[15vw] dark:bg-gray-900 dark:border-gray-800">
          <div class="grid grid-cols-1 p-2">
              <h3 class="font-primary text-xl tracking-wide text-gray-600 mb-1 text-center">Configuración</h3>
              <div class="grid grid-cols-2 grid-rows-2 mb-2 gap-y-2 mt-3">
                <div class="w-full text-center">
                  <span class="font-primary text-lg text-gray-600 mr-1">
                    Tallas:
                  </span>
                </div>
                <div class="text-center">
                    <button @click="cambiarFormato()" class="font-bold text-lg text-gray-600">{{ tallas.formato }}</button>
                </div>
                <div class="w-full flex justify-center items-center">
                  <span class="font-primary text-lg text-gray-600">
                    Tema:
                  </span>
                </div>
                <div class="flex items-center">
                  <DarkModeToggle class="ml-6"></DarkModeToggle>

                </div>
              </div>
            </div>
        
        </PopoverPanel>
      </transition>
    </Popover>
  </template>
    
  <script setup>
  import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
  import { Cog8ToothIcon } from '@heroicons/vue/24/outline';
  import { useTallasStore } from '~/store/tallas';
  const tallas = useTallasStore()

  function cambiarFormato (){
    if(tallas.formato == 'EU'){
      tallas.setFormato('US');
    }else{
      tallas.setFormato('EU')
    }
  }
  </script>