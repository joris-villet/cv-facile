import { defineStore } from 'pinia'


export const useStore = defineStore('global', {
  state: () => ({ 
    counter: 0
  })
})
