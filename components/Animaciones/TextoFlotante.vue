<template>
    <h3 class="animacion" v-html="contenido"></h3>
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
        targets: '.animacion .letra',
        scale: [4,1],
        opacity: [0,1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 950,
        delay: (el, i) => 70 * i
    })
    })
</script>

