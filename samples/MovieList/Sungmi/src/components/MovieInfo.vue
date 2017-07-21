<template>
  <div class="container">
    <div class="row">
      <form @submit.prevent="fetchMovie()">
        <div class="columns large-8">
          <input type="text" v-model="title">
          <button type="submit" :disabled="!title" class="button expanded">
            Search titles
          </button>
        </div>
      </form>
    </div>
    <!-- search form -->

    <div v-if="loading" class="loader">
      <img src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/0.16.1/images/loader-large.gif" alt="loader">
    </div>

    <div class="row" v-else-if="Object.keys(movie).length !== 0" id="movie">
      <div class="columns large-7">
        <h4> {{ movie.show_title }}</h4>
        <img :src="movie.poster" :alt="movie.show_title">
      </div>
      <div class="columns large-5">
        <p>{{ movie.summary }}</p>
        <small><strong>Cast:</strong> {{ movie.show_cast }}</small>
      </div>
    </div>
  </div>
  <!-- /container -->
</template>

<script>

const API_URL = 'https://netflixroulette.net/api/api.php'
function buildUrl (title) {
  return `${API_URL}?title=${title}`
}

export default {
  name: 'movie', // component name
  data () {
    return {
      title: '',
      loading: false,
      movie: {}
    }
  },
  methods: {
    fetchMovie () {
      let title = this.title
      if (!title) {
        alert('please enter a title to search for')
        return
      }

      this.loading = true
      fetch(buildUrl(title))
      .then(response => response.json())
      .then(data => {
        this.loading = false
        this.movie = data
      }).catch((e) => {
        console.log(e)
      })
    }
  }
}

<style scoped>
#movie {
  margin: 30px 0;
}
.loader {
  text-align: center;
}
</style>
