<template>
  <div id="app">
    <section>
      <div>
        <input type="text" v-model="searchKeyword">
        <button type="button" @click="searchMovie">search</button>
      </div>
      <div>
        <ul>
          <li v-for="figure in figures">{{figure}}</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import {mapGetters} from 'vuex';
import * as types from './store/types';

export default {
  data () {
    return {
      searchKeyword: '',
      figures: {}
    }
  },
  computed: {
    // ...mapGetters([
    //   'doubleCounter',
    //   'stringCounter'
    // ])
    ...mapGetters({
      doubleCounter: types.DOUBLE_COUNTER
    })
  },
  methods: {
    searchMovie() {
      let url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
      axios.get(url).then((response) => {
        console.log(response.data.query.results.channel.atmosphere);
        this.figures = response.data.query.results.channel.atmosphere;
      });
    }
  }
}
</script>

<style>
</style>
