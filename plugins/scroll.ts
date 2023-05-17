export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.$router.options.scrollBehavior = () => {
  let ra = nuxtApp.$router.currentRoute.value.name;
  if(ra !== 'index'){
    return { left: 0, top: 0 }
  }
}
})