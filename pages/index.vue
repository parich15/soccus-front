<template>
    <main class="w-full max-w-md">
      <InicioHero :Texto="'WELCOME TO SOCCUS RETRO'"></InicioHero>
      <div>
        <AnimacionesTextoBarcode class="p-3 font-display text-4xl text-gray-700" :texto='"HOT SHOTS"'></AnimacionesTextoBarcode>
      </div>
      <div v-if="loading">
        <VLoading class="w-6 h-6"></VLoading>
      </div>
      <ProductosGridProductos :productos="productos"></ProductosGridProductos>
    </main>
</template>

<script setup>
useHead({
  title: "Inicio",
})
const {$directus} = useNuxtApp();
const loading = ref(false);
const productos = ref([]);

const getProductos = async () =>{
    loading.value = true;
  try {
    const {data} =  await $directus.items('Productos').readByQuery({
        filter: {
            status: {_eq: 1},
        },
        fields: ['*']
    })
    productos.value = data;
  } catch (error) {
    console.log(error)
  }finally{
    loading.value = false
  }
}
await getProductos()
</script>
