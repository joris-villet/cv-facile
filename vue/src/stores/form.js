import { defineStore } from 'pinia'


export const useFormStore = defineStore('form', {
  state: () => ({
    inputRangeX: 0,
    inputRangeY: 0,
    elementSelected: '',
    disabled: true,
    css: {
      background: ''
    },
    elements: [
      { 
        value: 'sheet__title', 
        content: 'titre principal'
      },
      { 
        value: 'sheet__subtitle', 
        content: 'sous-titre optionnel'
      },
    ]
  })
})