<template>
  <Popover class="relative">
    <PopoverButton class="p-2">
      <div class="relative">
        <div class="absolute z-50 bg-red-500 dark:bg-green-500 h-1 w-1 rounded-full animate-pulse" v-if="carrito.hasItems"></div>
      </div>
      <ShoppingBagIcon class="h-6 w-6 dark:text-slate-100"></ShoppingBagIcon>
    </PopoverButton>
    <transition enter-active-class="transition duration-200 ease-out" enter-from-class="translate-x-10 opacity-0"
      enter-to-class="translate-y-0 opacity-100" leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100" leave-to-class="-translate-x-10 opacity-0" mode="out-in">
      <PopoverPanel
        class="absolute z-10 bg-slate-50 border rounded left-0 mt-4 w-screen max-w-[290px] -translate-x-[68%] transform p-4 sm:px-0 lg:max-w-3xl dark:bg-gray-900 dark:border-gray-800">
        <div class="grid grid-cols-1">
          <h3 class="font-primary text-xl mx-auto text-slate-500" v-if="!carrito.hasItems">Sin articulos seleccionados
          </h3>
          <div v-else>
            <div v-for="(producto, index) in items" :key="producto.id" class="flex flex-wrap border dark:border-b dark:border-b-gray-700 dark:border-t-0 dark:border-l-0 dark:border-r-0">
              <div class="flex h-12 w-auto">
                <img class="h-full" :src="fileUrl(producto.Imagen_Principal)" alt="">
              </div>
              <div class="ml-3">
                <h3 class="font-primary text-lg tracking-wide text-gray-400">{{ producto.Nombre }}</h3>
                <p class="font-mono text-gray-700 dark:text-gray-400">{{ formatCurrency(producto.Propiedades.Precio * producto.quantity) }} | <span class="text-sm">{{ producto.Propiedades.Talla }}</span><span class="text-xs"> x{{ producto.quantity}}</span></p>
              </div>
              <div class="flex ml-auto mr-5">
                <button @click="carrito.removeItem(index)" class="w-5">
                  <XMarkIcon class="h-5 w-5 dark:text-gray-500"></XMarkIcon>
                </button>
              </div>
            </div>
            <div>
              <h5 class="font-mono my-2 dark:text-gray-400">Total: {{formatCurrency(carrito.totalPrice)}}</h5>
            </div>
            <div class="flex items-center mt-3">
              <VButton variant="default" class="font-primary">FINALIZAR COMPRA</VButton>
              <button class="bg-transparent shadow-none flex mx-auto" @click="carrito.$reset">
                <TrashIcon class="h-6 w-6 dark:text-gray-500 hover:text-red-500 transform hover:scale-90"></TrashIcon>
              </button>    
            </div>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script setup>
import { useCart } from '~/store/cart'
import { formatCurrency } from '~/utils/currency';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { ShoppingBagIcon, TrashIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { storeToRefs } from 'pinia';
const carrito = useCart();
const { fileUrl } = useFiles()

const {items} = storeToRefs(carrito)

</script>