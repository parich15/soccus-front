<template>
<main>
    <InicioHero :Texto="'RAFFLES'"></InicioHero>
    <section class="my-10 container mx-auto">
        <div class="mx-5 p-5 rounded-md bg-gray-50/90 dark:bg-gray-800 h-[70vh] md:h-[40vh] ">
            <div class="flex flex-col h-full justify-center items-center">
                <BellAlertIcon class="h-14 w-14 text-gray-400 animate-bounce"></BellAlertIcon>
                <h4 class="font-primary text-5xl tracking-wider mt-5 text-gray-400">SORRY</h4>
                <p class="mt-2 font-primary text-3xl text-gray-500" >There is no Raffle going on</p>
            </div>
        </div>
    </section>
    <!-- <section>{{ sorteo }}</section> -->
</main>
</template>

<script setup>
import { BellAlertIcon } from '@heroicons/vue/24/outline';

const {$directus} = useNuxtApp();

const {data:sorteo, pending, error} = await useAsyncData('Raffles',()=>{
    return $directus.items('Sorteo').readByQuery({
        limit: -1,
        fields:['*','Producto_Promocionado.*']
    })
},{
    server:false,
    transform: data => data.data[0]
})
</script>
