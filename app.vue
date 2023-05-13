<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator
        color="repeating-linear-gradient(to right,#F21BB9
    0%,#6366f1 100%)"
      />
      <GlobalesNavbar></GlobalesNavbar>
      <NuxtPage />
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