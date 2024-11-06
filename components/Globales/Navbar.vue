<template>
    <div class="fixed top-0 z-50 bg-slate-100/30 backdrop-blur-md min-w-full p-3 mb-1 flex align-center border-b dark:bg-gray-950/80 dark:border-slate-950">

        <!-- Logo -->
        <div class="flex align-center ml-2">
            <div>
              <NuxtLink to="/">
                <img :src="isDark ?'/logos/logo-white.png' : '/logos/logo-black.png'" class="h-10 w-auto">
              </NuxtLink>

            </div>
        </div>
        
        <div class="justify-end ml-auto w-9/12 items-center hidden sm:flex sm:mr-1">
            <div v-for="enlace in enlaces" :key="enlace.key">
                <nav class="mx-3 font-primary text-2xl dark:text-gray-300 lg:text-2xl lg:mx-1 ">
                  <NuxtLink :to="enlace.url" class="px-3 py-2 rounded hover:bg-gray-200/20">
                    {{ enlace.texto }}
                  </NuxtLink>
                </nav>
            </div>
        </div>

        <!-- Movil -->
        <div class="flex ml-auto w-1/3 justify-between items-center md:w-1/5 lg:w-2/12 lg:m-0 lg:justify-around">
            <GlobalesLogin></GlobalesLogin>
            <GlobalesCarrito></GlobalesCarrito>
            <GlobalesMenu :enlaces="enlaces"></GlobalesMenu>
        </div>

        <!-- Ordenador -->
        
    </div>
</template>

<script setup>
const enlaces = [
  {
    url: '/',
    texto: 'HOME',
    key: 1,
  },
  {
    url: '/Archive',
    texto: 'ARCHIVE',
    key: 2,
  },
  {
    url: '/Raffles',
    texto: 'RAFFLES',
    key: 3,
  },
  {
    url: '/About',
    texto: 'ABOUT',
    key: 4
  }
]
</script>
