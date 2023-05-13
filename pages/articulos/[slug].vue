<template>
  <div class="max-w-3xl px-6 py-24 mx-auto space-y-8">
    <NuxtLink
      class="flex items-center font-bold text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-200"
      to="/"
    >
      <span class="mr-2 text-xl">←</span>
      Atrás
    </NuxtLink>
    
    <div>
        <p class="font-display text-2xl dark:text-gray-100">
          <span>
            {{ page.Categoria.Categoria }}
          </span>
        </p>
      </div>
      <div class="mr-5 font-primary text-xl text-gray-600 dark:text-gray-200 flex justify-end">
        <p>{{(page.Marcas.length < 2 ? 'Brand: ':'Brands: ')}}</p>
        <p v-for="(marca, index) in page.Marcas">
          <span v-if="index == page.Marcas.length - 1"> ,</span>
          &nbsp{{ marca.Marcas_id.Nombre }}
        </p>
        
      </div>
    <div class="relative pt-48 pb-10 overflow-hidden shadow-xl rounded-2xl">
     
      <img
        class="absolute inset-0 object-cover w-full h-full"
        :src="fileUrl(page.Imagen_Principal)"
      />
    </div>
    
    
    <div class="flex items-center">
      <div class="relative px-2 w-2/3">
        <div class="relative text-lg font-medium text-gray-900 md:flex-grow font-primary">
        <p class="text-green-500 animate-pulse">Disponible</p>
        <h1 class="text-4xl font-bold drop-shadow-sm dark:text-gray-400">{{ page.Nombre }}</h1>
       
        </div>
      </div>
      <div class="w-1/3 text-center text-3xl font-semibold font-sans text-gray-700 dark:text-gray-500">
        {{ formatCurrency(page.Propiedades[0].Precio) }}
      </div>
    </div>
    <div class="flex">
          <VButton variant="secondary" class="w-full bg-gray-200 justify-center dark:bg-gray-800 dark:text-gray-300">
            <PlusCircleIcon class="h-5 w-5 mr-1"/>
            Añadir al carrito
          </VButton>
        </div>
    <div>
      <h4 class=" mx-2 font-titulo font-bold mb-3 dark:text-gray-500">Tallas disponibles</h4>
      <div  class="flex flex-row mx-2 gap-x-3">
        <div class="border px-4 py-3 dark:border-gray-700" v-for="propiedad in page.Propiedades">
        <p class="font-sans font-bold text-2xl dark:text-gray-400"><span>
          {{ propiedad.Talla }}
        </span></p>
      </div>
      </div>
      

    </div>
    <div>
      <hr>
      <h4 class="mt-6 mb-2 font-primary text-gray-800 text-xl dark:text-gray-400">Descripcion del producto</h4>
      <div id="desc" v-html="page.Descripcion"></div>
    </div>
    <!-- <div class="prose dark:prose-invert" v-html="page.content" /> -->
  </div>
</template>

<script setup>
import { formatCurrency } from '~/utils/currency';
import { PlusCircleIcon } from '@heroicons/vue/24/outline';
const { $directus } = useNuxtApp()
const { fileUrl } = useFiles()
const { params, path } = useRoute()
const {
  data: page,
  pending,
  error,
} = await useAsyncData(
  path,
  () => {
    return $directus
      .items('Productos')
      .readByQuery({ 
        filter: {
           slug: { _eq: params.slug }
        },
        fields: ['*','Marcas.Marcas_id.*','Categoria.*'],
        limit: 1 
      })},
  {
    transform: (data) => data.data[0]
  }
)
useHead({
  title: page.value.Nombre,
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