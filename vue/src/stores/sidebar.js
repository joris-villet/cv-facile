import { defineStore } from 'pinia'


export const useSidebarStore = defineStore('sidebar', {
  state: () => ({ 
    isActive: false,
  })
})