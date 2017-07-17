let localStorageLength = 0;
const key = "key_"

function isNull(text) {
  console.log("isNull");
  //console.log("text ", text);
  if(!text || text == "" || text === " ")
    return true;
}

// Component 에서 Data 는 왜 함수 여야 하지?
Vue.component('todo-item', {
  template: '\
    <li>\
      {{ title }}\
      <i class="fa fa-pencil" v-on:click="modifyEvent"></i>\
      <i class="fa fa-minus" v-on:click="deleteEvent"></i>\
    </li>\
  ',
  // A prop is a custom attribute for passing information from parent components.
  props: ['title'],
  methods: {
    deleteEvent: function () {
      console.log("deleteEvent");
      this.$emit('delete-event');
    },

    modifyEvent : function () {
      console.log("modifyEvent");
      this.$emit('modify-event');
    }
  }
})

var inputToDo = new Vue({
  el: '#todo-list',
  data: {
    newTodo: '',
    todos: [

    ]
  },
  created: function () {
    console.log(localStorage.length);
    localStorageLength = localStorage.length;
    for(var i=0; i < localStorageLength; i++ ) {
      var initItem = localStorage.getItem(localStorage.key(i));
      this.todos.push(JSON.parse(initItem));
    }
  },
  methods: {
    addItem: function (event) {
      console.log('addItem Function');

      var date = new Date();

      if( isNull(this.newTodo) )
        return false;

      var newItem = {
        id : key + localStorageLength,
        itemContents : this.newTodo
      }
      console.log( 'you input ', this.newTodo );
      this.todos.push(newItem);

      localStorage.setItem(newItem.id, JSON.stringify(newItem));
      localStorageLength++;

      this.newTodo = '';
    },

    deleteItem: function(index, todos) {
      console.log("deleteItem");
      console.log("index", index);

      localStorage.removeItem(todos[index].id);
      todos.splice(index, 1);
    },

    modifyItem: function(index, todo) {
      console.log("modifyItem");
      console.log("index", index);
      var modifiedItem = prompt("Modify the item");

      if( isNull(modifiedItem) )
        return false;

      console.log("modified item", modifiedItem);
      todo.itemContents = modifiedItem;

      localStorage.setItem(newItem.id, JSON.stringify(newItem));
    }
  }
})
