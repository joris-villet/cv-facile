import { defineStore } from 'pinia'


export const useSheetStore = defineStore('sheet', {
  state: () => ({
    sheetWidth: 595,
    sheetHeight: 841,
    title: {
      content: '',
      pos: {
        x: "0",
        y: "0"
      }
    },
    subtitle: {
      content: '',
      pos: {
        x: 0,
        y: 0
      }
    },
  }),
  getters: {
    classTitle: (state) => {
      return {
        left: state.title.pos.x + 'px',
        top: state.title.pos.y + 'px'
      }
    },
    classSubtitle: (state) => {
      return {
        left: state.subtitle.pos.x + 'px',
        top: state.subtitle.pos.y + 'px'
      }
    },
  }
})