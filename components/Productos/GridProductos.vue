<template>
    <section class="md:mx-5 lg:mx-10 xl:max-w-7xl xl:mx-auto xl:mb-20 xl:mt-10">
        
        <div class="flex justify-between items-center">
            
            <AnimacionesTextoBarcode class="p-3 font-display text-4xl text-gray-700" :texto='subtitulo'></AnimacionesTextoBarcode>
            
            <!-- filtros -->
            <div class="relative">
                <button @click="toggleFilters()" class="p-3 lg:p-0">
                    <i class="text-gray-800 dark:text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 lg:h-6 lg:w-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                        </svg>
                    </i>
                </button>
               
                <div ref="filterContainerRef" class="absolute right-2 top-6 bg-white dark:bg-gray-800 p-4 rounded-lg z-10 shadow w-52 transition-transform origin-top-right" :class="showFilters ? 'scale-100' : 'scale-0'">
                    <div class="flex flex-col">
                        
                        <h5 class="mb-2 font-primary text-lg text-gray-700 ">Filter by category</h5>

                        <form>
                            <div v-for="category in filters" class="flex items-center gap-x-2">
                                <input type="checkbox" checked :key="category.id" :id="category.id" :name="category.nombre" :value="category.active" class="dark:bg-gray-500" @click="runFilters(category.id)">
                                <label :for="category.id" class="dark:text-red-500 font-primary">
                                    {{ category.nombre }}
                                </label>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
        <div v-if="filteredProducts.length" class="grid grid-cols-2 my-3 gap-2 mx-2 md:grid-cols-3 md:gap-y-5 md:gap-x-5 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-6 xl:grid-cols-5">
            <!-- Miniatura -->
            <LazyProductosMiniaturaProducto v-for="(producto,index) in filteredProducts" :key="producto.id" :producto="producto" :class="esImpar && index == total-1 ? 'transform translate-x-[50%] mt-2 md:translate-x-0 md:mt-0':''"></LazyProductosMiniaturaProducto>
           
        </div>
        <div v-else class="w-full flex justify-center items-center h-56">
            <h5 class="font-primary text-4xl text-gray-400">
                No products found
            </h5>
        </div>
    </section>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
    productos: Array,
    subtitulo: String,
    filtros: Object
})

const esImpar = computed(()=>{
   return props.productos.length % 2 !== 0
} )

const filterContainerRef = ref(null);

const total = computed(()=> props.productos.length)

const showFilters = ref(false);

function toggleFilters() {
    showFilters.value = !showFilters.value;
}

const filters = ref([]);

const initFilters = () => {

    if(props.filtros){
        let filtros = Object.values(props.filtros);
        filters.value = filtros.map((filtro) => {
            return {
                id: filtro.id,
                nombre: filtro.Categoria,
                active: true
            }
        })
    }

}

const filteredProducts = computed(() => {
    const productos = props.productos;
    
    if(filters.value.length === 0){
        return productos;
    }else{
        return productos.filter((producto) => {
            return filters.value.some((filter) => {
                return filter.active && filter.id === producto.Categoria.id;
            })
        })
    }
    
})

function runFilters(id) {
    let actualFilter = filters.value.find((filter) => filter.id === id);
    actualFilter.active = !actualFilter.active;
}

onClickOutside(filterContainerRef, () => {
    showFilters.value = false;
})

onMounted(()=>{
    initFilters();
    console.log(filters.value)
}) 


</script>
