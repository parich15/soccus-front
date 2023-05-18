<template>
    <section>
        <div class="grid grid-cols-2 my-3 gap-2 mx-2">
            <!-- Miniatura -->
                <LazyProductosMiniaturaProducto v-for="(producto,index) in productos" :key="producto.id" :producto="producto" :class="esImpar && index == total-1 ? 'transform translate-x-[50%] mt-2':''"></LazyProductosMiniaturaProducto>
        </div>
    </section>
</template>

<script setup>
const props = defineProps({
    productos: Array
})
const esImpar = computed(()=>{
   return props.productos.length % 2 !== 0
} )
const total = computed(()=> props.productos.length)
</script>
