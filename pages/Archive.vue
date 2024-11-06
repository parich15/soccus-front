<template>
    <main class="w-full max-w-md md:max-w-none md:w-full">
      <InicioHero :Texto="'VIP ARCHIVE'"></InicioHero>
      <ProductosGridProductos :productos="productos" :subtitulo="'OLD TREASURES'"></ProductosGridProductos>
    </main>
</template>

<script setup>
useHead({
  title: "Archivo",
})
const {$directus} = useNuxtApp();
const loading = ref(false);
const productos = ref([]);

const getProductos = async () =>{
    loading.value = true;
  try {
    const {data} =  await $directus.items('Productos').readByQuery({
        filter: {
            Archivo: {_eq:true}
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
