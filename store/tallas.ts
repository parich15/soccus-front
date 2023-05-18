import { defineStore } from 'pinia';
interface FormatoTallas {
    formato: 'EU'| 'US' 
  }
export const useTallasStore = defineStore('tallas',{
  state: ():FormatoTallas => ({
    formato: 'EU' , // inicialmente se usa formato europeo
  }),
  actions: {
    setFormato(formato:FormatoTallas) {
      this.formato = formato;
    },
  },
});