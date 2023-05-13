<template>
    <main>
        <div class="relative w-full">
            <span ref="curvedText" class="absolute">Hola</span>
        </div>
    </main>
</template>

<script setup>
useHead({
  title: "Inicio",
})
const {$anime} = useNuxtApp()
const curvedText = ref();
const textContainer = ref();
// //Crea una animación con Anime.js

onMounted(()=>{
    console.log($anime);
    $anime({
        targets: curvedText.value,
        rotate: '2turn', // Rota el texto 2 vueltas completas
        loop: true, // Repite la animación en un bucle
        duration: 2000, // Duración de la animación (en milisegundos)
        easing: 'linear' // Función de suavizado de la animación
    });
})
</script>
