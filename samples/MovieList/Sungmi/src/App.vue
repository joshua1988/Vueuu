<template>
  <div id="app">
    <MovieHeader></MovieHeader>
    <MovieInfo></MovieInfo>
  </div>
</template>

<script>
import MovieHeader from './components/MovieHeader.vue'
import MovieInfo from './components/MovieInfo.vue'

export default {
  name: 'app',
  components: {
    // component name
    MovieHeader: MovieHeader,
    MovieInfo: MovieInfo
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
