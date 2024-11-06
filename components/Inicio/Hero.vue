<template>
    <section class="pt-32 container mx-auto">
        <AnimacionesTextoFlotante :texto="Texto" class="font-primary text-5xl text-center text-gray-700 dark:text-gray-300 md:text-7xl xl:text-8xl lg:tracking-wider"></AnimacionesTextoFlotante>
        <slot></slot>
        <div class="h-[50px] md:h-[75px]"></div>
        <div class="h-[1px] w-full bg-gray-200 dark:bg-gray-600"></div>
      </section>
</template>

<script setup>
defineProps({
    Texto: String,
})
</script>
