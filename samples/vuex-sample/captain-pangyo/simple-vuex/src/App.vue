<template>
  <div id="app">
    Parent counter : {{ this.$store.state.counter }} <br>
    <button @click="addCounter">+</button>
    <button @click="subCounter">-</button>

    <child></child>
  </div>
</template>

<script>
import Child from './Child.vue'

export default {
  data () {
    return {
      // counter: this.$store.state.counter
    }
  },
  methods: {
    addCounter() {
      this.$store.state.counter++;
    },
    subCounter() {
      this.$store.state.counter--;
    }
  },
  components: {
    'child': Child
  }
}
</script>

<style>

</style>
