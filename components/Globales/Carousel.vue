<template>

    <section class="xl:mb-20 xl:mt-10">
        
        <AnimacionesTextoBarcode class="p-3 font-display text-4xl text-gray-700 md:mx-5 lg:mx-10 xl:max-w-7xl xl:mx-auto" :texto='title'></AnimacionesTextoBarcode>


        <carousel ref="carouselComponent" v-if="products.length" :items-to-show="itemsToShow">
            
            <slide v-for="product in products" :key="product.id">
                <ProductosMiniaturaProducto :producto="product"></ProductosMiniaturaProducto>
            </slide>

            <template #addons>
                <navigation v-if="showNavigation"></navigation>
                <pagination v-if="showPagination"></pagination>
            </template>

        </carousel>


    </section>
</template>

<script setup>

const props = defineProps({
    title: String,
    show: {
        type: Number,
        default: 1
    },
    products: Array,
    showNavigation: Boolean,
    showPagination: Boolean,
})

const carouselComponent = ref(null);

const itemsToShow = ref(1);
const windowWidth = ref(0);

// Función para actualizar el ancho de la ventana
const updateWindowWidth = () => {
    windowWidth.value = window.innerWidth;
    recalculateItemsToShow();
};


// Agrega un event listener para el evento 'resize'
onMounted(() => {
  updateWindowWidth();
  recalculateItemsToShow();
  window.addEventListener('resize', updateWindowWidth);
});

// Remueve el event listener cuando el componente se desmonta
onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth);
});


const recalculateItemsToShow = () => {
    switch (true) {
        case windowWidth.value < 640: // sm
            itemsToShow.value = 2.5;
            break;
        case windowWidth.value < 1024: // md
            itemsToShow.value = 3;
            break;
        case windowWidth.value < 1280: // lg
            itemsToShow.value = 4;
            break;
        default: // xl and above
    itemsToShow.value = 5; 
}

carouselComponent.value.updateSlideWidth()

};


</script>
