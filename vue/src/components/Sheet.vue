<script setup>
import { useSheetStore } from '../stores/sheet';

const sheetStore = useSheetStore();

</script>

<template>
  <div class="sheet elem">
    <h1 :style="sheetStore.classTitle" class="sheet__title elem">{{ sheetStore.title.content }}</h1>
    <h2 :style="sheetStore.classSubtitle" class="sheet__subtitle elem">{{ sheetStore.subtitle.content }}</h2>
  </div>
</template>


<style lang="stylus" scoped>

.sheet
  background: #fff
  // margin: 5rem auto
  width: 595px
  height: 841px
  box-shadow: 1px 1px 1px #ddd
  position: relative

  &__title 
    position: absolute
    left: 0px
    margin: 0
    width: max-content

  &__subtitle 
    position: absolute
    left: 0px
    margin: 0
    width: max-content

</style>