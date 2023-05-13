<template>
    <section>
        <div class="grid grid-cols-2 my-3 gap-2 mx-2">
            <!-- Miniatura -->
            <div v-for="producto in productos" :key="producto">
                <LazyProductosMiniaturaProducto :producto="producto"></LazyProductosMiniaturaProducto>
            </div>
        </div>
    </section>
</template>

<script setup>
defineProps({
    productos: Array
})
</script>
