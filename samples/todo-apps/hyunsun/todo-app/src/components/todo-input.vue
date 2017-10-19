<template lang="html">
  <input type="text" class="todo_input" v-model="newItem" v-on:keyup.enter="addTodo">
</template>

<script>
export default {
  name: 'TodoInput',
  props: {
    passedData: {
      type: [String, Array, Number]
    }
  },
  data () {
    return {
      newItem: ''
    }
  },
  methods: {
    addTodo() {
      if(this.newItem !== '') {
        localStorage.setItem(this.newItem, this.newItem)
        this.passedData.push({
          title: this.newItem
        })
        this.newItem = ''
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

.todo_input {
  padding: 12px 50px;
  margin: 8px 0;
  box-sizing: border-box;
}

input[type="text"] {
  font-size: 20px;
}

</style>
