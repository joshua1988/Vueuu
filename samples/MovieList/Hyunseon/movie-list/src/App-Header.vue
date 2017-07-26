<template>
  <div id="app-header">
    <div class="header-container">
      <div class="header-input">
        <input type="text" v-model="title" placeholder="영화 제목으로 검색">
        <button v-on:click="searchByTitle(title)" class="search-btn">search</button>
        <input type="text" v-model="director" placeholder="영화 감독으로 검색">
        <button v-on:click="searchByDirector(director)" class="search-btn">search</button>
        <input type="text" v-model="actor" placeholder="배우로 검색">
        <button v-on:click="searchByActor(actor)" class="search-btn">search</button>
      </div>

    </div>
  </div>
</template>

<script>
import { EventBus } from './main'

export default {
  name: 'header',
  data () {
    return {
      title: '',
      director: '',
      actor: ''
    }
  },
  methods: {
    searchByTitle: function (title) {
      EventBus.$emit('searchByTitle', title)
    },
    searchByDirector: function (director) {
      EventBus.$emit('searchByDirector', director)
    },
    searchByActor: function (actor) {
      EventBus.$emit('searchByActor', actor)
      }
  }
}
</script>

<style>
#app-header {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.header-container {
  background: url('./assets/netflix_header.png') no-repeat center center;
  background-size: 100% 100%;
  height: 300px;
  top: 0;
  left: 0;
  right: 0;
}

.header-input {
  padding-top: 175px;
}

.search-btn {
  border: 2px solid white;
  border-radius: 5px;
  color: white;
  background-color: Transparent;
  padding: 5px 3px;
  margin-right: 5px;
}

.search-btn:hover {
  border-color: black;
  color: black;
}

input[type=text] {
  box-sizing: border-box;
  padding: 8px 8px;
  /*border: 2px solid black;*/
  border: none;
  background-color: white;
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
