<template>
  <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-400 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0 "
      mode="out-in">
    <main class="w-full max-w-md" v-if="!pending" @scroll.native="test">
      <InicioHero :Texto="'SOCCUS RETRO'"></InicioHero>
      <div>
        <AnimacionesTextoBarcode class="p-3 font-display text-4xl text-gray-700" :texto='"HOT SHOTS"'></AnimacionesTextoBarcode>
      </div>
      <div v-if="loading">
        <VLoading class="w-6 h-6"></VLoading>
      </div>
      <ProductosGridProductos :productos="productos"></ProductosGridProductos>
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

const {data: productos, pending} = useAsyncData('home', ()=>{
  return $directus.items('Productos').readByQuery({
        filter: {
            status: {_eq: "1"},
            Archivo: {_eq:false},
        },
        fields: ['*']
})},{
  server: false,
  transform:(data)=>data.data
})
function test (e){
  console.log(e.currentTarget)
}
// onMounted(()=>{
//   window.addEventListener('scroll', test)
// })
// onBeforeUnmount(()=>{
//   window.removeEventListener('scroll', test)
// })
</script>
