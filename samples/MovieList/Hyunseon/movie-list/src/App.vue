<template>
  <div id="app-list">
    <ul class="list-group">
      <li class="list-group-item" v-for="item in items" v-bind:key="item.id">
        <img v-bind:src="item.poster" />
        <h2>{{ item.title }}</h2>
        <p>director: {{ item.director }}</p>
        <p>cast: {{ item.show_cast }}</p>
        <p>release: {{ item.release_year }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { EventBus } from './main'

var data = {
  items: []
}
export default {
  name: 'app',
  data () {
    return data
  },
  created() {
    let self = this
    EventBus.$on('searchByTitle', function (data) {
      var URL = "https://cors-anywhere.herokuapp.com/http://netflixroulette.net/api/api.php?title="
      var URL_title = URL.concat(data.toLowerCase())
      this.$http.get(URL_title)
      .then((result) => {
        self.searchByTitle(result.data)
      })
      .catch(function (error) {
        self.noSearch()
      })
    })
    EventBus.$on('searchByDirector', function (data) {
      var URL =  "https://cors-anywhere.herokuapp.com/http://netflixroulette.net/api/api.php?director="
      var URL_director = URL.concat(data.toLowerCase())
      this.$http.get(URL_director)
      .then((result) => {
        self.searchByDirector(result.data)
      })
      .catch(function (error) {
        self.noSearch()
      })
    })
    EventBus.$on('searchByActor', function (data) {
      var URL =
      "https://cors-anywhere.herokuapp.com/http://netflixroulette.net/api/api.php?actor="
      var URL_actor = URL.concat(data.toLowerCase())
      this.$http.get(URL_actor)
      .then((result) => {
        self.searchByActor(result.data)
      })
      .catch(function (error) {
        self.noSearch()
      })
    })
  },
  methods: {
    noSearch: function () {
      this.items = []
      var item = {
        title: 'No result'
      }
      this.items.push(item)
    },
    searchByTitle: function (data) {
      this.items = []
      var item = {
        title: data.show_title,
        category: data.category,
        director: data.director,
        release_year: data.release_year,
        show_cast: data.show_cast,
        poster: data.poster
      }
      this.items.push(item)
    },
    searchByDirector: function (data) {
      this.items = []
      var item = ''
      for (var i = 0; i < data.length; i++) {
        item = {
          title: data[i].show_title,
          category: data[i].category,
          director: data[i].director,
          release_year: data[i].release_year,
          show_cast: data[i].show_cast,
          poster: data[i].poster
        }
        this.items.push(item)
      }
    },
    searchByActor: function (data) {
      this.items = []
      console.log(data)
      var item = ''
      for (var i = 0; i < data.length; i++) {
        item = {
          title: data[i].show_title,
          category: data[i].category,
          director: data[i].director,
          release_year: data[i].release_year,
          show_cast: data[i].show_cast,
          poster: data[i].poster
        }
        this.items.push(item)
      }
    }
  }
}
</script>

<style>
#app-list {
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
