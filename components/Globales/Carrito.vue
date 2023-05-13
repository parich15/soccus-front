<template>
  <Popover class="relative">
    <PopoverButton class="p-2">
        <div class="relative">
          <div class="absolute z-50 bg-red-500 h-1 w-1 rounded-full"></div>
        </div>
        <ShoppingBagIcon class="h-6 w-6 dark:text-slate-100"></ShoppingBagIcon>
    </PopoverButton>
    <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-x-10 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="-translate-x-10 opacity-0"
        mode="out-in"
      >
    <PopoverPanel class="absolute z-10 bg-slate-50 border rounded left-0 mt-4 w-screen max-w-[290px] -translate-x-[68%] transform p-4 sm:px-0 lg:max-w-3xl dark:bg-gray-900 dark:border-gray-800">
      <div class="grid grid-cols-1">
        <h3 class="font-primary text-xl mx-auto text-slate-500">Sin articulos seleccionados</h3>
       </div>  
    </PopoverPanel>
    </transition>
  </Popover>
</template>

<script setup>
  import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
  import { ShoppingBagIcon} from '@heroicons/vue/24/outline';

</script>