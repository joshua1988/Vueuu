<template lang="html">
  <ul v-if="passedData">
    <li v-for="todoItem in passedData" :key="todoItem.id">
      <input v-if="editMode == todoItem.title" type="text"
          v-model="todoItem.title"
          v-focus
          @change="onChange(todoItem.title)"
          @keyup.enter="doneEdit(todoItem)"
          @keyup.esc="cancelEdit(todoItem)">
      <span v-else id="edited">{{ todoItem.title }}</span>
      <a @click="removeTodo(todoItem)"><i class="glyphicon glyphicon-remove"></i></a>
      <a @click="editTodo(todoItem)"><i class="glyphicon glyphicon-pencil"></i></a>

          <!-- : You are binding v-model directly to a v-for iteration alias.
          This will not be able to modify the v-for source array
          because writing to the alias is like modifying a function local variable.
          Consider using an array of objects
          and use v-model on an object property instead. -->
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TodoList',
  data () {
    return {
      beforeTodo: null,
      editMode: null
    }
  },
  // props: ['passedData'],
  // props 검증
  props: {
    passedData: {
      type: [String, Array, Number]
    }
  },
  methods: {
    removeTodo(todoItem) {
      localStorage.removeItem(todoItem.title)
      var index = this.passedData.indexOf(todoItem.title)
      this.passedData.splice(index, 1)
    },
    editTodo(todoItem) {
      this.beforeTodo = todoItem.title
      this.editMode = todoItem.title
    },
    doneEdit(todoItem) {
      todoItem.title = todoItem.title.trim()
      if(!todoItem.title) {
        this.removeTodo(todoItem)
      } else {
        localStorage.removeItem(this.beforeTodo)
        localStorage.setItem(todoItem.title, todoItem.title)
        console.log(localStorage)
        // console.log(this.passedData)
        // var index = this.passedData.map(function(e) { return e.title }).indexOf(this.beforeTodo)
        // console.log("index: " + index)
        // console.log("value: " + this.passedData[index])
      }
      this.editMode = null
      this.beforeTodo = null
    },
    cancelEdit(todoItem) {
      todoItem.title = this.beforeTodo
      this.editMode = null
    },
    onChange(newVal) {
      this.editMode = newVal
    }
  },
  directives: {
    // 'focus': function (el, binding) {
    //   console.log(el)
    //   console.log(binding)
    //   el.focus()
    // }
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 100px;
  font-family: Helvetica, Arial, sans-serif;
  color: #42b983;
}

li {
  font-size: 20px;
}

</style>
