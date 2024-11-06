<template>
    <h3 class="animacion2 dark:text-gray-500" v-html="contenido"></h3>
</template>

<script setup>
const {$anime} = useNuxtApp()
const props = defineProps({
    texto: String
})
    

const contenido = computed(()=>{
    return props.texto.replace(/\S/g, "<span class='letra'>$&</span>")
})

onMounted(()=>{
    $anime.timeline({loop: false})
  .add({
    targets: '.animacion2 .letra',
    translateX: [40,0],
    translateZ: 0,
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 3000,
    delay: (el, i) => 500 + 30 * i
  })
})
</script>