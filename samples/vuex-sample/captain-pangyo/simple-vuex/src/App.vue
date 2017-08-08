<template>
  <div id="app">
    Parent counter : {{ parentCounter }} <br>
    <button @click="addCounter">+</button>
    <button @click="subCounter">-</button>

    <child></child>
  </div>
</template>

<script>
import Child from './components/Child.vue'
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters({
    parentCounter : 'getCounter'
  }),
  methods: {
    addCounter() {
      // this.$store.state.counter++;
      // this.$store.mutations.addCounter();
      // console.log(this.$store);

      // this.$store.commit('addCounter');
      this.$store.dispatch('addCounter');
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
