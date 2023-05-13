<template>
    <section class="pt-32 container mx-auto">
        <AnimacionesTextoFlotante :texto="Texto" class="font-primary text-4xl text-center text-gray-700 dark:text-gray-300"></AnimacionesTextoFlotante>
        <div class="h-[50px]"></div>
        <div class="h-[1px] w-full bg-gray-200 dark:bg-gray-600"></div>
      </section>
</template>

<script setup>
defineProps({
    Texto: String,
})
</script>
