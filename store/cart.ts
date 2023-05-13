import { defineStore } from 'pinia';

export const useCart = defineStore('cart', {
  state: () => ({
    items: [],
  }),
  getters: {
    totalPrice (): Number {
      return this.items.reduce((total, item) => item.Propiedades.Precio * item.quantity + total, 0);
    },
    hasItems(): Boolean {
        return this.items.length > 0 ? true : false;
    }
  },
  actions: {
    addItem(item: Object) {
      const existingItem = this.items.find(i => i.id === item.id && i.Propiedades.Talla === item.Propiedades.Talla);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.items.push({ ...item, quantity: 1 });
      }
    },

    removeItem(index) {
        this.items.splice(index, 1);
    },
    $reset(){
        this.items = [];
    }
  },
 
});