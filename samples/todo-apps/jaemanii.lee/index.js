// verify whether it's enabled browser.
if (!(typeof(Storage) !== "undefined")) {
  alert("Your Browser isn't supported LocalStorage!!");
} else {
  console.log("Your Browser is supported LocalStorage!!");
}

// Local Storage API extension.
Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}

function generateId() {
  var len = localStorage.length;
  var nextId = 1;
  for (var i=0; i<len; i++) {
    if (nextId<=localStorage.key(i)) {
      var currentId = Number(localStorage.key(i));
      nextId = (++currentId);
    }
  }

  if (nextId>=0 && nextId<=9) {
    nextId = '00'+ nextId;
  } else if (nextId>=10 && nextId<=99) {
    nextId = '0'+ nextId;
  }
  return nextId;
}

var listVm = new Vue({
  el: '#toToList',
  data: {
    items: []
  },
  created: function () {
    console.log('listVm is created.');
  },
  methods: {
    deleteItem: function(item, index) {
      console.log("item : " + item.date + ", item.index : " + item.index);
      localStorage.removeItem(item.index);
      this.items.splice(index, 1);
    },
    modifyFormItem: function(item, index) {
      console.log("item : " + item.date + ", item.index : " + item.index);
      var modifyVm = new Vue({
        el: "#toModifyId_"+item.index,
        template: '<div><input placeholder="할 일을 수정하세요." class="field__input" size="30" type="text" v-model="message" /><a class="waves-effect waves-purple lime btn" onclick="Materialize.toast(\'Your Item\\\'s modification is completed!\', 3000);" v-on:click="modifyItem(\''+item.index+'\')">수정</a></div>',
        data: {
          message: item.contents
        },
        created: function () {
          console.log('modifyVm is created.');
        },
        methods: {
          modifyItem: function(id) {
            var date = new Date();
            var newItem = {
              index: id,
              date: date.getFullYear() + "." + (date.getMonth()+1) + "." + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
              contents: this.message
            };

            localStorage.setObject(newItem.index, newItem);
            window.location.reload();
          }
        }
      });
    },
    toNumber: function(num) {
      console.log("num : " + num);
      return Number(num);
    },
    toModifyId: function(index) {
      return "toModifyId_"+index;
    }
  },
  computed: {
    // Get data From Browser Local Storage, and then it is created reverse list data.
    getItems: function() {
      var len = localStorage.length;
      for (var i=0; i<len; i++) {
        this.items.push(localStorage.getObject(localStorage.key(i)));
      }
      return this.items;
    }
  }
});

var addVm = new Vue({
  el: '#toAddItem',
  data: {
    message: ''
  },
  created: function () {
    console.log('addVm is created.');
  },
  methods: {
    addItem: function(event) {
      var nextId = generateId();
      var date = new Date();
      var newItem = {
        index: nextId,
        date: date.getFullYear() + "." + (date.getMonth()+1) + "." + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
        contents: this.message
      };

      localStorage.setObject(nextId, newItem);
      this.message = '';
      listVm.items.push(newItem);
    }
  }
});

var len = localStorage.length;
for (var i=0; i<len; i++) {
  listVm.items.push(localStorage.getObject(localStorage.key(i)));
}
