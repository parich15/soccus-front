<template>
    <div class="w-full flex-col transition-transform hover:scale-105 group hover:shadow md:p-2 lg:p-5 md:rounded dark:hover:shadow-slate-800/50">
        <NuxtLink :to="`/articulos/${producto?.slug}`">
            <div>
                <img :src="fileUrl(producto?.Imagen_Principal.id ?? producto?.Imagen_Principal)" alt="" class="rounded h-full w-auto group-hover:scale-110 transition-transform relative z-0 dark:group-hover:scale-100">
            </div>
            <div class="mb-3 mt-2 md:m-0 z-10 relative">
                <h4 class="font-primary text-xl text-gray-700 dark:text-gray-300 md:text-2xl">{{ producto!.Nombre }}</h4>
                
                    <p v-if="tallas.length" class="font-mono text-sm font-semibold text-gray-500 dark:text-gray-400 md:text-base">
                        From
                        <span >{{ formatCurrency(tallas[0].Precio, { hideZeros: true }) }}</span>
                    </p>
                
            </div>
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import { formatCurrency } from '~/utils/currency';
const { fileUrl } = useFiles()
const props = defineProps({
    producto: Object
})


// TALLAS
type tallas = {
    Talla: string;
    Precio: number;
    Stock: number;
}

// Filtrar y establecer tallas.
let tallas: tallas[] = [];
let type!: 'Sneakers' |'Ropa' | 'Accesorios';

function setType(): void {
    switch (props.producto!.Categoria.Categoria) {
        case 'Sneakers':  
            type = 'Sneakers';
            break;
        
        case 'Ropa':
            type = 'Ropa';
            break;
        
        case 'Accesorios':
            type = 'Accesorios';
            break;

        default:
            break;
    }
    
    setTallas();
}

function setTallas(): void {
    switch(type){
        case 'Sneakers':
            tallas = props.producto!.Propiedades;
            break;
        case 'Ropa':
            tallas = props.producto!.Propiedades_Ropa;
            break;
        case 'Accesorios':
            tallas = props.producto!.Propiedades_Accesorios;
            break;  
    }

    if(type === 'Sneakers'){
        filtrarTallas();
    }
    
}

function filtrarTallas(): void {
    tallas = tallas.filter((talla) => {
        return talla.Stock > 0 && talla.Precio > 0;
    })
}

onMounted(() => {
    setType();
})
</script>
