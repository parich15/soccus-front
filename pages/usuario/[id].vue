<template>
    <div v-if="!pending">   
        {{ pedidos }}
        <div class="h-[200vh]">
            hola
        </div>
        <div id="pedidos">
            test
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAuth } from '~~/store/auth'
const auth = useAuth()
const {user} = storeToRefs(auth)
const {path} =useRoute()
const {$directus} = useNuxtApp()

const {data:pedidos, pending} = useAsyncData(path,()=>{
    return $directus.items('Pedidos').readByQuery({
        fields: ['*'],
        filter:{
            User_id: {_eq: user.value.id}
        }
    })
},{
    server:false,
  transform:(data)=>data.data

})

definePageMeta({
  middleware: 'auth',
})
</script>
