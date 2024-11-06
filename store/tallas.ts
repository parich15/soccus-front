import { defineStore } from 'pinia';
export interface FormatoTallas {
    formato: 'EU'| 'US' | 'UK'
  }
export const useTallasStore = defineStore('tallas',{
  state: (): FormatoTallas => ({
    formato: 'EU' , // inicialmente se usa formato europeo
  }),
  actions: {
    setFormato(formato: FormatoTallas['formato']) {	
      this.formato = formato as any;
    },
  },
});