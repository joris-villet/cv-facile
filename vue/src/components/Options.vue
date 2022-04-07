<script setup>
import { useFormStore } from '../stores/form';

const formStore = useFormStore();

</script>


<template>
  <select v-model="formStore.elementSelected" @input="$emit('init-range')" id="inputSelect" class="form__select"> 
    <!-- <option>Choisir un élément à déplacer</option> -->
    <option
      v-for="(el, index) in formStore.elements"
      :key="index"
      :value="el.value">
        {{ el.content }}
    </option>
  </select> 
</template>


<style lang="stylus" scoped>


</style>