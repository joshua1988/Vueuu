<template>
  <div>
    <hr>
    Child counter : {{ childCounter }} <br>
    <button>+</button>
    <button>-</button>
  </div>
</template>

<script>
export default {
  computed: {
    childCounter() {
      return this.$store.getters.getCounter;
    }
  },
  methods: {

  }
}
</script>

<style>
</style>
