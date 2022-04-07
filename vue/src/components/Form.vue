<script setup>
import { useSidebarStore } from '../stores/sidebar';
import { useSheetStore } from '../stores/sheet';
import { useFormStore } from '../stores/form';
import { computed, ref } from 'vue';
import Options from './Options.vue';

const sidebarStore = useSidebarStore();
const sheetStore = useSheetStore();
const formStore = useFormStore();

const elementWidth = ref(0);
const elementHeight = ref(0);


const initRange = computed(() => {
  formStore.disabled = false;
  const elem = formStore.elementSelected.split('sheet__').join('');
  if (!elem) return;
  const targetWidth = document.querySelector('.' + formStore.elementSelected).clientWidth;
  const targetHeight = document.querySelector('.' + formStore.elementSelected).clientHeight;
  elementWidth.value = targetWidth;
  elementHeight.value = targetHeight;
  formStore.inputRangeX = sheetStore[elem].pos.x;
  formStore.inputRangeY = sheetStore[elem].pos.y;
})


const moveElement = () => {
  const elem = formStore.elementSelected.split('sheet__').join('');
  sheetStore[elem].pos.x = formStore.inputRangeX;
  sheetStore[elem].pos.y = formStore.inputRangeY;

  const offsetX = sheetStore.sheetWidth - elementWidth.value;
  const offsetY = sheetStore.sheetHeight - elementHeight.value;
 
  if (sheetStore[elem].pos.x >= offsetX) {
    return sheetStore[elem].pos.x = offsetX;
  }

  if (sheetStore[elem].pos.y >= offsetY) {
    return sheetStore[elem].pos.y = offsetY;
  }

}


</script>

<template>
  <Transition name="form">
    <div v-if="sidebarStore.isActive">
      <form class="form">

        <label class="form__label">
          <input 
            class="form__title"
            type="type" 
            placeholder="Titre principal"
            v-model="sheetStore.title.content"
          > 
        </label>
        <label class="form__label">
          <input 
            class="form__subtitle"
            type="type" 
            placeholder="Sous-titre optionel" 
            v-model="sheetStore.subtitle.content"
          >
        </label>

        <Options @init-range="initRange" />
      
        <div class="form__coor">
          <label class="form__label"> Axe x 
            <input 
              :disabled="formStore.disabled"
              @input="moveElement"
              v-model="formStore.inputRangeX"
              class="form__range" 
              type="range"
              min="0" 
              max="595"
            >
          </label>
      
          <label class="form__label"> Axe y
            <input 
              :disabled="formStore.disabled"
              @input="moveElement"
              v-model="formStore.inputRangeY"
              class="form__range y" 
              type="range" 
              min="0" 
              max="841"
            >
          </label>
        </div>

        <!-- <label class="form__label">
          <textarea class="form__textarea"></textarea>
        </label> -->

        <div>
          <button id="btnAddText">Ajouter un bloc de texte</button>
        </div>

        <button id="btnGetStore" class="form__btn">get store</button>

      </form>
    </div>
  </Transition>
</template>


<style lang="stylus" scoped>

.form
  margin: 0 auto
  border: 1px solid red

  &-enter-active
    animation: .8s ease-in-out go

  @keyframes go
    0%
      opacity: 0
    60%
      transform: scale(0.7)
      opacity: 0
    100%
      transform: scale(1)
      opacity: 1

  &-leave-active
    animation: .4s ease-in-out pleaseDontGo

    @keyframes pleaseDontGo
      0%
        transform: scale(1)
      100%
        opacity: 0
        transform: scale(0)

  &__coor
    border: 2px solid orange
    margin: 2rem auto

  &__label
    display: grid
    width: 100%
    margin-bottom: 1rem

  &__title
    border-radius: 30px
    height: 25px
    border: none
    padding-left: 1rem
    font-weight: bold
    font-style: italic
    outline: none
    color: #7d7d7d

    &::placeholder
      font-weight: bold
      color: #7d7d7d
      
  &__subtitle
    border-radius: 30px
    height: 25px
    border: none
    padding-left: 1rem
    font-weight: bold
    font-style: italic
    outline: none
    color: #7d7d7d

    &::placeholder
      font-weight: bold
      color: #7d7d7d

.focusActive
  background: red
</style>