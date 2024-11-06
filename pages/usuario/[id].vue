<template>
    <div v-if="!pending">
        <main class="pt-24 pb-10">
            <section class="max-w-sm mx-auto container md:max-w-2xl lg:w-full lg:max-w-none lg:mx-10">
                <div class="my-5 ml-3">
                    <span class="text-sm font-primary text-gray-300">WELCOME BACK</span>
                    <h2 class="font-primary text-5xl text-gray-800 mt-1 dark:text-gray-600">{{ user.first_name }} {{ user.last_name }}</h2>
                </div>
                <div class="lg:grid lg:grid-cols-2 lg:gap-x-5">
                    <div class="bg-gray-50 dark:bg-gray-950 rounded p-3 mt-10 lg:mt-0">
                        <div class="flex justify-between">
                            <h5 class="font-mono text-gray-400 text-sm">Datos de cliente</h5>
                            <button @click="editMode = true" v-if="!editMode && user.Telefono && user.Direccion"
                                class="font-mono text-gray-400 text-sm">Editar</button>
                        </div>
                        <div class="my-4">
                            <div v-if="!editMode && user.Telefono == null && user.Direccion == null"
                                class="border border-dashed p-1  flex items-center justify-center group hover:border-solid">
                                <button @click="editMode = true"
                                    class="p-3 w-full font-primary text-xl text-gray-400 group-hover:text-gray-300 transition-all group-hover:scale-95">+
                                    Añadir datos</button>
                            </div>

                            <form v-if="editMode" class="flex flex-col gap-2" @submit.prevent="updateData">
                                <label for="Telefono" class="font-mono text-sm text-gray-500">Telefono</label>
                                <VInput id="Telefono" type="number" inputmode="number" required v-model="telefono"
                                    class="font-mono text-gray-800"></VInput>

                                <label for="CP" class="font-mono text-sm text-gray-500">Codigo Postal</label>
                                <VInput id="CP" type="number" inputmode="number" required v-model="cp"
                                    class="font-mono text-gray-800"></VInput>

                                <label for="Pais" class="font-mono text-sm text-gray-500">Pais</label>
                                <VInput id="Pais" type="text" inputmode="number" required v-model="pais"
                                    class="font-mono text-gray-800"></VInput>

                                <label for="Direccion" class="font-mono text-sm text-gray-500">Direccion</label>
                                <VInput id="Direccion" required type="text" v-model="direccion"></VInput>

                                <div class="flex justify-around mt-2">
                                    <VButton type="submit" variant="secondary"
                                        class="bg-red-500 dark:bg-green-400  text-white font-primary tracking-wider disabled:bg-red-300 dark:disabled:bg-green-200"
                                        :disabled="!formCompleto">Guardar</VButton>
                                    <VButton @click="editMode = false">Cancelar</VButton>
                                </div>
                            </form>

                            <div v-else-if="!editMode && user.Telefono && user.Direccion" class="flex flex-col space-y-3">
                                <div>
                                    <span class="font-primary text-lg text-gray-400 tracking-wider">Codigo Postal:</span>
                                    <p class="font-primary text-2xl text-gray-600 tracking-wider">{{ user.Zip_Code }}</p>
                                </div>
                                <div>
                                    <span class="font-primary text-lg text-gray-400 tracking-wider">Pais: </span>
                                    <p class="font-primary text-2xl text-gray-600 tracking-wider">{{ user.Pais }}</p>
                                </div>
                                <div>
                                    <span class="font-primary text-lg text-gray-400 tracking-wider">Telefono:</span>
                                    <p class="font-primary text-2xl text-gray-600 tracking-wider">{{ user.Telefono }}</p>
                                </div>
                                <div>
                                    <span class="font-primary text-lg text-gray-400 tracking-wider">Direccion:</span>
                                    <p class="font-primary text-2xl text-gray-600">{{ user.Direccion }}</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="mt-5 bg-gray-50 dark:bg-gray-950 rounded p-3 lg:mt-0 lg:h-fit" id="pedidos">
                        <div class="flex">
                            <h5 class="font-mono text-gray-400 text-sm">Pedidos</h5>
                        </div>
                        <div v-if="!pedidos || pedidos.length == 0">
                            <h3 class="my-2 font-primary text-xl text-gray-600 lg:text-center lg:text-2xl lg:mt-5">Sin Pedidos</h3>
                        </div>
                        <div v-else>
                            <div v-for="pedido in pedidos" :key="pedido.id">
                                <div v-for="producto in pedido.Productos" :key="producto"
                                    class="flex flex-row mx-1 items-center lg:py-2"
                                    @click="$router.push(`/articulos/${producto.Productos_id.slug}`)">
                                    <img class="h-12 w-12 rounded" :src="fileUrl(producto.Productos_id.Imagen_Principal)"
                                        alt="">
                                    <div class="flex flex-col">
                                        <h4 class="font-primary text-xl ml-3 dark:text-red-500">{{
                                            producto.Productos_id.Nombre }}</h4>
                                        <div class="flex items-center">
                                            <span class="font-mono text-xs ml-3 text-gray-400">
                                             Fecha: {{ new Date(pedido.date_created).toLocaleDateString() }}
                                            </span>
                                        <span class="font-mono text-xs ml-3 text-gray-400">
                                           Estado: {{ estadoDelPedido(pedido.Estado) }}
                                        </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </main>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAuth } from '~~/store/auth'
const auth = useAuth()
const { user } = storeToRefs(auth)
const { path } = useRoute()
const { $directus } = useNuxtApp()
const { fileUrl } = useFiles()

const { data: pedidos, pending } = useAsyncData(path, () => {
    return $directus.items('Pedidos').readByQuery({
        fields: ['*', 'Productos.Productos_id.*', 'Productos.Productos_id.Marcas.Marcas_id.Nombre'],
        filter: {
            User_id: { _eq: user.value.id }
        }
    })
}, {
    server: false,
    transform: (data) => data.data
})

definePageMeta({
    middleware: 'auth',
})

const editMode = ref(false);
const direccion = ref(null);
const cp = ref(null);
const pais = ref(null)
const telefono = ref(null);

const formCompleto = computed(() => (direccion.value !== null && direccion.value !== '') && (telefono.value !== null && telefono.value !== '') && (cp.value !== null && cp.value !== '') && (pais.value !== null && pais.value !== ''))
const estadoDelPedido = (estado)=>{
    switch (estado) {
        case "0":
            return "Procesando"
            break;
        case "1":
            return "Preparando"
            break;
        case "2":
            return "En camino"
            break;
        case "3":
            return "Recibido"
            break;
    }
}
async function updateData() {
    try {
        await $directus.users.me.update({ Direccion: direccion.value, Telefono: telefono.value, Zip_Code: cp.value, Pais: pais.value })
        return user.value.Direccion = direccion.value,
            user.value.Telefono = telefono.value,
            user.value.Zip_Code = cp.value,
            user.value.Pais = pais.value,
            editMode.value = false;
    } catch (error) {
        console.log(error)
    } finally {
        direccion.value = null,
            cp.value = null,
            pais.value = null;
        telefono.value = null;
    }
}
</script>
