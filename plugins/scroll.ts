export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.$router.options.scrollBehavior = (to, from, savedPosition) => {
    if(savedPosition){
      return savedPosition
    }else if(to.hash){
      return{
        el:to.hash,
        behavior: 'smooth'
      }
    }else{
      return {
        top:0
      }
    }
  }
})