<template>
  <div class="overflow-hidden">
    <NuxtLayout>
      <NuxtLoadingIndicator
        color="repeating-linear-gradient(to right,#dc2626 0%,#1e293b 100%)"
      />
      <GlobalesNavbar/>
      <Transition>
        <NuxtPage />
      </Transition>
      <Footer/>
    </NuxtLayout>
  </div>
</template>
<script setup>
  useHead({
    titleTemplate: (titulo) => {
      return titulo ? `${titulo} - Soccus Retro` : 'Soccus Retro';
    }
  })
</script>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>