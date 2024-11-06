<template>
  
  <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-400 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0 "
      mode="out-in">
    
      <main class="w-full max-w-md md:max-w-none md:w-full" v-if="!pending && !textPending" @scroll.native="test">
      
        <InicioHero :Texto="'SOCCUS RETRO'"/>  
      
        <div v-if="loading">
          <VLoading class="w-6 h-6"></VLoading>
        </div>

        <!-- TEXTO DESTACADO -->
        <div class="w-full my-3" >
          <div class="flex flex-col items-center justify-center lg:p-5">
            <h2 class="font-primary text-3xl md:text-4xl text-center text-gray-300 dark:text-gray-700">
                {{ texts[0] }}
            </h2>
            <div class="px-5 text-sm md:max-w-xl lg:mt-3 font-primary sm:text-lg md:text-xl text-center text-gray-300 dark:text-gray-700" v-html="texts[1]"></div>
           
          </div>
        </div>


        <div v-for="carousel in carousels" :key="carousel.Nombre" class="my-3 lg:my-5">
          <GlobalesCarousel :title="carousel.Nombre" :products="carousel.Items" :show="showItems" :show-navigation="true" :show-pagination="true"></GlobalesCarousel>
        </div>
                
      </main>

    <main v-else class="h-screen w-screen overflow-hidden">
      <div class=" flex h-full justify-center items-center">
        <div class="flex flex-col justify-center items-center">
          <h5 class="font-primary text-5xl mb-4 text-gray-300 dark:text-gray-700 animate-pulse tracking-wide">CARGANDO</h5>
        <VLoading class="h-12 w-12 text-gray-300 dark:text-gray-700"></VLoading>
        </div>
      </div>
    </main>
  </Transition>

</template>

<script setup>
useHead({
  title: "Inicio",
})
const {$directus} = useNuxtApp();
const loading = ref(false);

const {data: texts, textPending} = useAsyncData('homeTexts', ()=> {
  return $directus.items('Paginas').readByQuery({
        filter: {
            Titulo: {_eq: 'Home'}
        },
        fields: ['Secciones.Contenido.item.*'],
        sort: ['-id']
})}, {
  server: false,
  transform:(data)=> {
    return data.data[0].Secciones[0].Contenido.map((item)=> {
      if(item.item.hasOwnProperty('Texto')){
        return item.item.Texto
      }else{
        return item.item.Titulo
      }
    })
  }
})

const {data: carousels, pending} = useAsyncData('homeCarousels', ()=> {
  return $directus.items('Colecciones').readByQuery({
        fields: ['Nombre,Items.Productos_id.*.*'],
        sort: ['-id']
})},{
  server: false,
  transform:(data)=> {
    return data.data.map((carousel)=> {
      return {
        Nombre: carousel.Nombre,
        Items: carousel.Items.map((item)=> item.Productos_id)
      }
    })
  }
})


// const {data: productos, pending} = useAsyncData('home', ()=>{
//   return $directus.items('Productos').readByQuery({
//         filter: {
//             status: {_eq: "1"},
//             Archivo: {_eq:false},
//         },
//         fields: ['*', 'Categoria.*'],
//         sort: ['-id']
// })},{
//   server: false,
//   transform:(data)=> data.data
// })


// const filters = computed(()=> {
//   let filtro = {};
//   if (productos.value) {
//     productos.value.forEach((product)=> {
//       if(filtro[product.Categoria.id]){
//         return
//       }else{
//         filtro[product.Categoria.id] = product.Categoria
//       }
//     })
//   }
//   return filtro; 
// })




</script>
