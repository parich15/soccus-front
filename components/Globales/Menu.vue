<template>
  <Popover class="relative">
    <PopoverButton class="p-2 rounded-full hover:bg-gray-300/20">
      <Bars3BottomLeftIcon class="h-7 w-7 dark:text-slate-100 md:hidden" />
      <AdjustmentsHorizontalIcon class="h-7 w-7 dark:text-slate-100 hidden md:block"></AdjustmentsHorizontalIcon>
    </PopoverButton>
    <transition enter-active-class="transition duration-200 ease-out" enter-from-class="translate-x-10 opacity-0"
      enter-to-class="translate-y-0 opacity-100" leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100" leave-to-class="-translate-x-10 opacity-0" mode="out-in">
      <PopoverPanel v-slot="{ close }"
        class="absolute z-10 bg-slate-50 border rounded left-0 mt-[0.9rem] w-screen max-w-[290px] -translate-x-[81.8%] lg:-translate-x-[84.5%] transform p-4 md:px-4 sm:px-0 lg:max-w-xs dark:bg-gray-900 dark:border-gray-800">
        <div class="grid grid-cols-1">
          <h3 class="font-primary text-sm tracking-wide text-gray-500 md:hidden">LINKS</h3>
          <div v-for="enlace in props.enlaces" :key="enlace.key" class="my-2 pb-1 md:hidden">
            <NuxtLink @click.native="() => close()" :to="enlace.url" class="font-primary text-4xl dark:text-gray-400">
              {{ enlace.texto }}
            </NuxtLink>
          </div>
          <hr class=" dark:opacity-50 md:hidden">
          <h3 class="font-display text-xl text-slate-500 text-left mt-2 md:text-2xl md:mb-3">
            Soccus Retro Web
          </h3>
          <div class="p-3 bg-gray-100 shadow rounded mt-2 dark:bg-gray-900 dark:lg:p-0 dark:lg:shadow-none">
            <h3 class="font-primary text-xl tracking-wide text-gray-600 mb-1 lg:mb-3">OPTIONS</h3>
            <div class="flex justify-between mb-2 items-center">
              <div class="w-1/2 flex items-center">
                <span class="font-primary text-lg text-gray-600 mr-1">
                  SIZES:
                </span>
                <select v-model="formatoSelected" name="selectorFormatoTallaMenu" id=""
                  class="ml-1 bg-left pr-3 pl-3 bg-none bg-transparent font-primary text-lg focus:border-gray-400 focus:ring-gray-400 rounded-lg dark:text-gray-500">
                  <option value="EU">EU</option>
                  <option value="US">US</option>
                  <option value="UK">UK</option>
                </select>
              </div>
              <div class="w-1/2 flex items-center">
                <span class="font-primary text-lg text-gray-600">
                  THEME:
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
import { Bars3BottomLeftIcon, AdjustmentsHorizontalIcon } from '@heroicons/vue/24/outline';
import { storeToRefs } from 'pinia';
import { useTallasStore } from '~/store/tallas';
const tallas = useTallasStore()
const ruta = useRoute();
const {formato} = storeToRefs(tallas)
const formatoSelected = ref(formato)
const props = defineProps({
  enlaces: Array
})

watch(ruta, () => close.value = !close.value)
watch(formatoSelected,()=>{
  tallas.setFormato(formato.value)
})

</script>
