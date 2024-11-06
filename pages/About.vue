<template>
    <main>
        <InicioHero :Texto="'ABOUT US'"></InicioHero>

        <div v-if="seccionesData">
            
            <!-- QUOTE -->
            <section class="text-gray-600 body-font">
            <div class="container px-5 py-24 mx-auto">
                <div class="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="inline-block w-8 h-8 text-gray-400 mb-8" viewBox="0 0 975.036 975.036">
                    <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                </svg>
                <div v-if="seccionesData" class="leading-relaxed text-lg font-primary dark:text-gray-400" v-html="seccionesData[0].Contenido[0].item.Texto"></div>
                
                <span class="inline-block h-1 w-10 rounded bg-gray-500 dark:bg-red-500 mt-8 mb-6"></span>
                <span class="text-gray-900 dark:text-gray-500 font-medium title-font tracking-wider text-lg font-primary " v-html="seccionesData[0].Contenido[1].item.Texto"></span>
                
                <span class="text-gray-500 font-display text-xl" v-html="seccionesData[0].Contenido[2].item.Texto" ></span>
                </div>
            </div>
            </section>
            
            <!-- HERO -->
            <section class="text-gray-600 body-font">
                <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                    <img v-if="seccionesData[1].Contenido[2]" class="object-cover object-center rounded" alt="hero" :src="fileUrl(seccionesData[1].Contenido[2].item.Imagen)">
                    </div>
                    <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                    <div class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 font-primary dark:text-red-500" v-html="seccionesData[1].Contenido[0].item.Titulo">

                    </div>
                    
                    <span class="mb-8 leading-relaxed dark:text-gray-500 font-primary lg:text-lg pr-6" v-html="seccionesData[1].Contenido[1].item.Texto"></span>
                    
                    </div>
                </div>
            </section>

            <!-- CONTACT -->
            <section class="text-gray-600 body-font relative">
                <div class="container px-5 py-24 mx-auto">
                    <div class="flex flex-col text-center w-full mb-12">
                    <h1 class="sm:text-4xl text-3xl font-medium title-font mb-4 text-gray-900 dark:text-gray-400 font-display " v-html="seccionesData[2].Contenido[0].item.Titulo"></h1>
                    <div class="lg:w-2/3 mx-auto leading-relaxed text-base dark:text-red-500 font-primary" v-html="seccionesData[2].Contenido[1].item.Subtitulo"></div>
                    </div>
                    <div class="lg:w-1/2 md:w-2/3 mx-auto">
                    <div class="flex flex-wrap -m-2">
                        <div class="p-2 w-1/2">
                        <div class="relative">
                            <label for="name" class="leading-7 text-sm text-gray-600">Name</label>
                            <input type="text" id="name" name="name" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                        </div>
                        </div>
                        <div class="p-2 w-1/2">
                        <div class="relative">
                            <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
                            <input type="email" id="email" name="email" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                        </div>
                        </div>
                        <div class="p-2 w-full">
                        <div class="relative">
                            <label for="message" class="leading-7 text-sm text-gray-600">Message</label>
                            <textarea id="message" name="message" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                        </div>
                        </div>
                        <div class="p-2 w-full">
                        <button class="flex mx-auto text-white bg-gray-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-500 transition-colors rounded text-lg font-primary tracking-wider">Send Message</button>
                        </div>
                    
                    </div>
                    </div>
                </div>
            </section>

        </div>

        <div class="h-[calc(100vh-256px)] flex items-center justify-center" v-else>
            <div class="h-20 w-20">
                <VLoading></VLoading>
            </div>
        </div>

    </main>
</template>

<script setup>
useHead({
    title: 'About Us',
    meta: [
        {
            hid: 'description',
            name: 'description',
            content: 'About Us'
        }
    ]
})
const {$directus} = useNuxtApp();
const { fileUrl } = useFiles()


const { data: secciones, pending } = useAsyncData('about', ()=>{
    return $directus.items('Paginas').readByQuery({
        filter: {
            id: {_eq: 2}
        },
        fields: ['*', 'Secciones.Contenido.item.*'],
    })},{
    server: false,
    transform:(data)=> data.data
})

const seccionesData = computed(()=> {
    if(secciones.value){
        return secciones.value[0].Secciones
    }
})
</script>

<style lang="scss" scoped>

</style>