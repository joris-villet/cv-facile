<script setup>
import Sidebar from './components/Sidebar.vue';
import Sheet from './components/Sheet.vue';
import { useSidebarStore } from './stores/sidebar';


const sidebarStore = useSidebarStore();
const openSidebar = (active) => sidebarStore.isActive = active;

</script>

<template>
  <main class="interface" :class="{ sidebarActive: sidebarStore.isActive }">
    <Sidebar @open-sidebar="openSidebar" />
    <section class="interface__sheet">
      <Sheet />
    </section>
  </main>
</template>

<style lang="stylus">

body
  padding: 0
  margin: 0
  box-sizing: border-box
  background: #f1f1f1

#app 
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale

.interface
  display: grid
  grid-template-columns: 35px 1fr
  height: 100vh
  transition: .6s ease-in-out

  &__sheet
    display: flex
    justify-content: center
    width: 100%
    height: 100%
    padding: 2rem 0

.sidebarActive
  grid-template-columns: 350px 1fr

</style>
