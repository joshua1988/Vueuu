<template>
  <div id="app">
    <app-header></app-header>
    <todo-input v-bind:passed-data="todoItems"></todo-input>
    <todo-list class="todo-list" v-bind:passed-data="todoItems"></todo-list>
  </div>
</template>

<script>
import AppHeader from './components/app-header.vue'
import TodoInput from './components/todo-input.vue'
import TodoList from './components/todo-list.vue'

export default {
  name: 'app',
  components: {
    AppHeader: AppHeader,
    TodoInput: TodoInput,
    TodoList: TodoList
  },
  data () {
    return {
      todoItems:[]
    }
  },
  created() {
    for (var key in localStorage) {
      this.todoItems.push({
          title: localStorage.getItem(key)
        })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 5px 0;
}

a {
  color: #a8a8a8;
}

.todo-list {
  margin-top: 30px;
}
</style>
