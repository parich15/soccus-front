<template>
  <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0"
    enter-to-class="opacity-100" leave-active-class="transition duration-300 ease-in" leave-from-class="opacity-100"
    leave-to-class="opacity-0 " mode="out-in">
    <div v-if="!pending" class="max-w-3xl px-6 py-24 mx-auto space-y-8">
      <NuxtLink
        class="text-sm font-mono tracking-widest items-center font-bold text-primary-300 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-200 w-auto"
        to="/">
        Volver
      </NuxtLink>

      <!-- Categoria -->
      <div>
        <p class="font-display text-3xl text-gray-800 dark:text-gray-100">
          <span>
            {{ producto.Categoria.Categoria }}
          </span>
        </p>
      </div>

      <!-- Marcas -->
      <div class="mr-2 font-primary text-2xl text-gray-600 dark:text-slate-500 flex justify-end">
        <p>{{ (producto.Marcas.length < 2 ? 'Brand: ' : 'Brands: ') }} &nbsp</p>
            <p v-for="(marca, index) in producto.Marcas">
              <span v-if="index == producto.Marcas.length - 1 && producto.Marcas.length >= 2">&nbsp|</span>
              {{ marca.Marcas_id.Nombre }}
            </p>
      </div>

      <!-- Imagen -->
      <div class="relative pt-48 pb-10 overflow-hidden shadow-xl rounded-2xl">
        <img class="absolute inset-0 object-cover w-full h-full" :src="fileUrl(producto.Imagen_Principal)" />
      </div>

      <!-- Texto y boton carrito -->
      <div class="flex items-center">
        <div class="relative px-2 w-2/3">
          <div class="relative text-lg font-medium text-gray-900 md:flex-grow font-primary">
            <p :class="producto.Archivo ? 'text-gray-500' : 'text-green-500 animate-pulse'">{{ producto.Archivo ?
              'ARCHIVO'
              : 'Disponible' }}</p>
            <h1 class="text-4xl font-bold drop-shadow-sm dark:text-gray-400">{{ producto.Nombre }}</h1>

          </div>
        </div>
        <div v-if="!producto.Archivo"
          class="w-1/3 text-center text-3xl font-extrabold font-sans text-gray-700 dark:text-gray-500">
          {{ formatCurrency(producto.Propiedades[indice].Precio, { hideZeros: true }) }}
        </div>
      </div>
      <div class="flex" v-if="!producto.Archivo">
        <VButton v-if="producto.Propiedades[indice].Stock >= 1" variant="secondary"
          :class="added ? 'bg-gray-300 text-gray-500 dark:bg-green-400' : 'bg-gray-200 dark:bg-slate-900 dark:border-green-400 dark:text-gray-400'"
          class=" focus:ring-none ring-0 w-full justify-center" @click="addToCart(producto)">

          <PlusCircleIcon v-if="!added" class="h-5 w-5 mr-1" />
          <span v-if="!added" class="font-primary text-lg">Añadir al carrito</span>

          <CheckCircleIcon v-else class="h-5 w-5 mr-1" />
          <span v-else class="font-primary text-lg">Añadido correctamente</span>

        </VButton>
        <VButton v-else variant="secondary" class="w-full bg-gray-200 justify-center dark:bg-gray-800 dark:text-gray-300"
          disabled>
          <span class="font-primary text-xl">
            Sin Stock
          </span>
        </VButton>
      </div>
      <!-- Tallas -->
      <div v-if="!producto.Archivo">
        <h4 class=" mx-2 font-titulo font-bold mb-3 dark:text-gray-500">Tallas disponibles <span class="text-xs ml-1">({{ tallas.formato }})</span></h4>
        <div class="flex flex-row mx-2 gap-x-3">
          <div :class="indice == index ? 'border-2 border-gray-500 dark:border-green-400' : ' '"
            class="border px-4 py-3 dark:border-gray-700" @click="indice = index"
            v-for="(propiedad, index) in producto.Propiedades" :key="propiedad.id">
            <p class="font-sans font-bold text-2xl dark:text-gray-400"><span>
                {{tallas.formato == 'US' && producto.Categoria.Categoria == 'Sneaker' ? tallajeAmericano[propiedad.Talla] : propiedad.Talla}}
              </span></p>
          </div>
        </div>


      </div>
      <div class="mx-2">
        <hr>
        <h4 class="mt-6 mb-2 font-primary text-gray-800 text-xl dark:text-gray-400">Descripcion del producto</h4>
        <div id="desc" v-html="producto.Descripcion"></div>
      </div>
    </div>
    <div v-else class="h-screen w-screen overflow-hidden">
      <div class=" flex h-full justify-center items-center">
        <div class="flex flex-col justify-center items-center">
          <h5 class="font-primary text-5xl mb-4 text-gray-300 dark:text-gray-700 animate-pulse tracking-wide">CARGANDO
          </h5>
          <VLoading class="h-12 w-12 text-gray-300 dark:text-gray-700"></VLoading>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { formatCurrency } from '~/utils/currency';
import { PlusCircleIcon, CheckCircleIcon } from '@heroicons/vue/24/outline';
import { useCart } from '~/store/cart'
import { useTallasStore } from '~/store/tallas';

const { $directus } = useNuxtApp()
const { path, params } = useRoute()
const { data: producto, pending, error } = await useAsyncData(path, () => {
  return $directus.items('Productos').readByQuery({
    filter: {
      slug: { _eq: params.slug }
    },
    fields: ['*', 'Marcas.Marcas_id.*', 'Categoria.*'],
    limit: 1
  })
},
  {
    server: false,
    transform: (data) => data.data[0],
  },
);
const { fileUrl } = useFiles()

const carrito = useCart()
const tallas = useTallasStore()

const indice = ref(0)
const added = ref(false);

function addToCart(producto) {
  added.value = true;
  //Creamos una copia añadiendo los campos clave. (TALLA Y PRECIO)
  let protoitem = { ...producto };
    protoitem.Propiedades = producto.Propiedades[indice.value],
    carrito.addItem(protoitem),
    protoitem = {};

  setTimeout(() => {
    added.value = false;
  }, 1500)
}

useHead({
  title: producto?.value?.Nombre,
})

// Logica de Tallas
const tallajeAmericano = {
  "15": "0C",
  "16": "1C",
  "17": "2C",
  "18": "3C",
  "19": "4C",
  "21": "5C",
  "22":"6C",
  "23": "7C",
  "25": "8C",
  "26": "9C",
  "27": "10C",
  "27.5": "10.5C",
  "28": "11C",
  "29": "12C",
  "30": "12.5C",
  "31": "13C",
  "31.5": "13.5C",
  "32": "1",
  "32.5": "1.5",
  "33": "2",
  "33.5": "2.5",
  "34": "3",
  "35": "3.5",
  "35.5": "4",
  "36": "4.5",
  "36.5": "5",
  "37":"5",
  "37.5":"5.5",
  "38": "6",
  "38.5": "6.5",
  "39": "6.5",
  "39.5": "7",
  "40": "7.5",
  "40.5":"8",
  "41": "8.5",
  "42": "9",
  "43": "10",
  "44": "10.5",
  "45":"11.5",
  "46":"12"
}
</script>
<style>
#desc p {
  font-family: 'Squada One';
  color: #334155
}

html.dark #desc * {
  color: #cbd5e1
}
</style>