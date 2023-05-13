<template>
    <main class="w-full max-w-md">
      <InicioHero :Texto="'VIP ARCHIVE'"></InicioHero>
      <div>
        <AnimacionesTextoBarcode class="p-3 font-display text-4xl text-gray-700" :texto='"OLD TREASURES"'></AnimacionesTextoBarcode>
      </div>
      <ProductosGridProductos :productos="productos"></ProductosGridProductos>
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
