<template>
  <div class="todoapp">
    <h1>{{ msg }}</h1>
    <input class="newe-todo" type="text" placeholder="Type your todo here" v-model="newTodo" @keyup.enter="addTodo" />
    <button @click="addTodo">Add</button>
    <h2>Your Todo List</h2>
    <ul>
      <li v-for="todo in todos" class="todo" :key="todo.id"
      :class="{ completed: todo.completed, editing: todo == editedTodo }">
        <label @dbclick="editTodo(todo)">{{ todo.title }}</label>
        <button @click="removeTodo(todo)">delete</button>
        <button @click="editTodo(todo)">edit</button>
        <input class="edit" type="text" v-model="todo.title" v-todo-focus="todo == editTodo"
        @blur="doneEdit(todo)"
        @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)"
      </li>
    </ul>

  </div>
</template>

<script>

// localStorage
var STORAGE_KEY = 'todoapp-vuejs'
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

var data = {
  msg: 'This is your Todos',
  todos: todoStorage.fetch(),
  newTodo: '',
  editedTodo: null
}

export default {
  name: 'todoapp',
  data: function () {
    return data
  },
  newTodo: ' ',
  methods: {
    addTodo: function () {
      var text = this.newTodo
      if (!text) {
        return
      }
      this.todos.push({
        id: todoStorage.uid++,
        title: text,
        completed: false
      })
      this.newTodo = ''
    },
    removeTodo: function (todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
    },
    editTodo: function (todo) {
      this.beforeEditCache = todo.title
      this.editedTodo = todo
    },
    doneEdit: function (todo) {
      if (!this.editedTodo) {
        return
      }
      this.editedTodo = null
      todo.title = todo.title.trim()
      if (!todo.title) {
        this.removeTodo(todo)
      }
    },
    cancelEdit: function (todo) {
      this.editTodo = null
      todo.title = this.beforEditCache
    }
  },
  watch: {
    todos: {
      handler: function (todos) {
        todoStorage.save(todos)
      },
      deep: true
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  /*display: inline-block;*/
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
