<template>
    <div class="w-full flex-col">
        <NuxtLink :to="`/articulos/${producto.slug}`">
            <div>
                <img :src="fileUrl(producto.Imagen_Principal)" alt="" class="rounded h-full w-auto">
            </div>
            <div class="mb-3 mt-2">
                <h4 class="font-primary text-xl text-gray-700 dark:text-gray-300">{{ producto.Nombre }}</h4>
                <div class="flex">
                    <p class="font-mono text-sm font-semibold text-gray-600 dark:text-gray-400">
                        Desde
                        <span>{{ formatCurrency(producto.Propiedades[0].Precio, { hideZeros: true }) }}</span>
                    </p>
                </div>
            </div>
        </NuxtLink>
    </div>
</template>

<script setup>
import { formatCurrency } from '~/utils/currency';
const { fileUrl } = useFiles()
const props = defineProps({
    producto: Object
})
</script>
