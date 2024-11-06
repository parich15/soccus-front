<template>
  <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0"
    enter-to-class="opacity-100" leave-active-class="transition duration-300 ease-in" leave-from-class="opacity-100"
    leave-to-class="opacity-0 " mode="out-in">
    <div v-if="!pending" class="max-w-3xl px-6 py-24 mx-auto space-y-8 lg:max-w-4xl">
      <NuxtLink
        class="text-sm font-mono tracking-widest flex gap-x-2 items-center font-bold text-primary-300 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-200 w-auto"
        to="/">
        <i>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class=" h-3 w-3 ">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </i>
        BACK
      </NuxtLink>

      <!-- MARCA DE AGUA SI ES ARCHIVO (EN PC) -->
      <div class=" hidden lg:block relative z-0" v-if="producto.Archivo">
        <div class="absolute top-0 left-0 -z-20">
          <div class="flex items-start mb-20 -translate-x-20">
            <p class="font-primary text-9xl tracking-widest opacity-10 dark:opacity-30">ARCHIVE</p>
          </div>
        </div>
      </div>

      <!-- Categoria -->
      <div>
        <p class="font-display text-3xl lg:text-4xl text-gray-800 dark:text-gray-100">
          <span>
            {{ producto.Categoria.Categoria }}
          </span>
        </p>
      </div>

      <!-- Marcas -->
      <div class="mr-2 font-primary text-2xl lg:text-3xl text-gray-600 dark:text-slate-500 flex justify-end">
        <p>{{ (producto.Marcas.length < 2 ? 'Brand: ' : 'Brands: ') }} &nbsp</p>
            <p v-for="(marca, index) in producto.Marcas">
              <span v-if="index == producto.Marcas.length - 1 && producto.Marcas.length >= 2">&nbsp|</span>
              {{ marca.Marcas_id.Nombre }}
            </p>
      </div>

      <!-- WRAPPER PC / MOVIL -->
      <div class="flex flex-col space-y-5 md:grid md:grid-cols-2 md:gap-x-10 md:pb-5">
        <!-- Imagen -->
        <div class="relative pt-48 pb-10 overflow-hidden shadow-xl rounded-2xl h-auto lg:h-[300px]">
          <img class="absolute inset-0 object-cover w-full h-full" :src="fileUrl(producto.Imagen_Principal)" />
        </div>

        <!-- Texto y boton carrito -->
        <div class="space-y-5 md:space-y-0 md:flex md:flex-col md:justify-around">
          <div class="flex items-center lg:flex-col lg:items-start">
            <div class="relative px-2  z-20">
              <div class="relative text-lg font-medium text-gray-900 md:flex-grow font-primary">
                <p :class="producto.Archivo ? 'text-gray-500' : 'text-green-500 dark:text-red-500 animate-pulse'">{{ producto.Archivo ?
                  'ARCHIVE'
                  : 'AVAILABLE' }}</p>
                <h1 class="text-4xl font-bold drop-shadow-sm dark:text-gray-400 lg:text-5xl text-gray-700">{{ producto.Nombre }}</h1>

              </div>
            </div>
            <div v-if="!producto.Archivo"
              class="lg:text-4xl md:text-right text-center text-3xl font-extrabold font-mono text-gray-700 dark:text-gray-500 px-2 lg:mt-5">
              {{ formatCurrency(tallas[indice].Precio, { hideZeros: true }) }}
            </div>
          </div>
          <div class="flex justify-center" v-if="producto.Archivo">
            <VButton variant="secondary" class="font-primary tracking-wide text-center flex justify-center bg-gray-200 dark:bg-gray-800 w-full transition-transform hover:scale-95" @click="request">
              <InformationCircleIcon class="h-5 w-5 mr-2 text-gray-600 "></InformationCircleIcon>
              <span class="text-xl text-gray-600">Request restock</span>
            </VButton>
          </div>
          <div class="flex" v-if="!producto.Archivo">
            <VButton v-if="tallas && tallas[indice].Stock >= 1" variant="secondary"
              :class="added ? 'bg-gray-300 text-gray-500 dark:bg-red-400' : 'bg-gray-200 dark:bg-slate-900 dark:border-red-400 dark:text-gray-400'"
              class="dark:hover:bg-red-400 hover:bg-gray-300 transition-colors focus:ring-none ring-0 w-full justify-center" @click="addToCart(producto)">

              <PlusCircleIcon v-if="!added" class="h-5 w-5 mr-1 text-gray-700" />
              <span v-if="!added" class="font-primary text-lg lg:text-xl text-gray-700">Add to cart</span>

              <CheckCircleIcon v-else class="h-5 w-5 mr-1" />
              <span v-else class="font-primary text-lg lg:text-xl dark:text-gray-600">Added!</span>

            </VButton>
            <VButton v-else variant="secondary"
              class="w-full bg-gray-200 justify-center dark:bg-gray-800 dark:text-gray-300" disabled>
              <span class="font-primary text-xl">
                Sin Stock
              </span>
            </VButton>
          </div>
        </div>

      </div>

      <!-- Tallas -->
      <div v-if="!producto.Archivo" class="flex flex-col lg:flex-row">
        <div class="lg:w-1/2 pb-5 lg:pb-0 border-b lg:border-b-0 lg:border-r">
         
          <div class="flex justify-between items-center mb-5">
          <h5 class=" mx-2 font-titulo font-bold dark:text-gray-500 font-primary text-2xl text-gray-700 lg:text-3xl">
            Available sizes
            <span class="block text-lg text-gray-500">
              {{ producto.Genero }}
            </span>
          </h5>
          <div class="flex lg:items-center" v-if="producto.Categoria.Categoria == 'Sneaker'">
            <p class="hidden lg:block font-mono text-sm mr-2 text-gray-300 dark:text-gray-600">Size system</p>
            <select v-model="formatoSelected" name="selectorFormatoTalla" id=""
            class="mr-1 rounded-md border-gray-400 h-12 font-primary text-xl bg-left pr-3 pl-8 focus:ring-gray-600 focus:border-gray-600 dark:bg-transparent dark:text-gray-300">
            <option value="EU" :selected="tallaStore.formato == 'EU'">EU</option>
            <option value="US" :selected="tallaStore.formato == 'US'">US</option>
            <option value="UK" :selected="tallaStore.formato == 'UK'">UK</option>
          </select>
          </div>
          </div>

          <div class="flex flex-row mx-2 gap-x-3">
          <div :class="indice == index ? 'border-2 border-gray-500 dark:border-red-400' : ' '"
            class="border cursor-pointer px-4 py-3 dark:border-gray-700 hover:border-gray-500 hover:dark:border-red-400 transition" @click="indice = index"
            v-for="(propiedad, index) in tallas" :key="propiedad.Talla">
            <p class="font-sans font-bold text-2xl dark:text-gray-400"><span>
               
                {{ tallaStore.formato !== 'EU' && type === 'Sneakers' ?
                  tallasMap[tallaStore.formato][producto.Genero][propiedad.Talla] : propiedad.Talla }}
               
              </span></p>
          </div>
          </div>

        </div>
        <div class="lg:w-1/2 lg:pl-4 mt-5 lg:mt-0">
        <h4 class="mb-2 font-primary text-gray-700 text-xl dark:text-gray-400 lg:text-2xl">Description</h4>
        <div id="desc" class="prose max-w-none lg:prose-lg" v-html="producto.Descripcion"></div>
        </div>
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

<script setup lang="ts">
import { formatCurrency } from '~/utils/currency';
import { PlusCircleIcon, CheckCircleIcon, InformationCircleIcon } from '@heroicons/vue/24/outline';
import { useCart } from '~/store/cart'
import { FormatoTallas, useTallasStore } from '~/store/tallas';
import { useAuth } from '~/store/auth';
import mapaTallas from '~/assets/utils/tallas.min.json'
import { storeToRefs } from 'pinia';

// Datos de Producto
const { $directus } = useNuxtApp() as any;
const { path, params } = useRoute()
const { fileUrl } = useFiles()
const { data: producto, pending, error } = await useAsyncData(path, () => {
  return $directus.items('Productos').readByQuery({
    filter: {
      slug: { _eq: params.slug }
    },
    fields: ['*', 'Marcas.Marcas_id.*', 'Categoria.*'],
    limit: 1
  })},
  {
    server: false,
    transform: (data: any) => data.data[0],
  },
);


// Cargamos Stores (Carrito, Formato Tallas y Usuario)
const carrito = useCart()
const tallaStore = useTallasStore()
const auth = useAuth()
const { formato } = storeToRefs(tallaStore)

// Logica de la pagina - Indice de Inventario (Tallas) y Funcion de añadido
const indice = ref(0)
const added = ref(false);
const formatoSelected = ref(formato)
function addToCart(producto: any) {
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

// LOGICA DE TALLAS
type Tallas = {
  Talla: string;
  Precio: number;
  Stock: number;
}

type MapaTallas = {
  [key: string] : {
    [key: string] : {
      [key: string] : string
    }
  }
}

let type!: 'Sneakers' | 'Ropa' | 'Accessorios';
let tallas: Tallas[] = [];

const tallasMap: MapaTallas = mapaTallas;

function setType(): void {
  debugger;
  switch (producto.value.Categoria.Categoria) {
    case 'Sneakers':
      type = 'Sneakers';
      break;

    case 'Ropa':
      type = 'Ropa';
      break;

    case 'Accessorios':
      type = 'Accessorios';
      break;

    default:
      break;
  }

  setTallas();
}

function setTallas(): void {
  switch (type) {
    case 'Sneakers':
      tallas = producto.value.Propiedades;
      break;
    case 'Ropa':
      tallas = producto.value.Propiedades_Ropa;
      break;
    case 'Accessorios':
      tallas = producto.value.Propiedades_Accesorios;
      break;
  }

  if (type === 'Sneakers') {
    filtrarTallas();
  }
}

function filtrarTallas(): void {
  tallas = tallas.filter((talla) => {
    return talla.Stock > 0 && talla.Precio > 0;
  })
  console.log(tallas)
}

// onMounted(()=> setType())

// Request en Archivo
const request = async() => {
  if(process.client && !auth.isLoggedIn ){
    window.alert('You must be logged to request a restock')
  }
  try {
    const token = useCookie('auth_token')
    const req = await $directus.items('Solicitudes').createOne({
      user_created: auth.user.id,
      Producto: producto.value.id
    })

    let notificationObj = {
      timestamp: req.date_created,
      status: "inbox",
      recipient: "c5e334bd-42a0-4c35-939d-f10d7ebea193",
      subject: `New Request: ${producto.value.Nombre}`,
      item: req.id,
      message: "Nueva solicitud de producto",
      collection: 'Solicitudes'
    }
    
    const {data} = useFetch($directus._url+'/notifications',{
      method: 'POST',
      body:notificationObj,
      params:{
        access_token: token.value
      }
    })
    window.alert('Request done')
  } catch (error) {
    console.log(error)
  }
  
}

watch(() => producto.value, () => {
  setType()
})

watch(formatoSelected, () => {
  const formatoVal = formatoSelected.value as FormatoTallas['formato']
  tallaStore.setFormato(formatoVal)
})

// watch(producto.value,()=> {
//   setType()
// })

useHead({
  title: producto?.value?.Nombre,
})

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