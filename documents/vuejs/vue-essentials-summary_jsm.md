# Vue.js Essentials
---
## The Vue Instance

### 생성자
1. `Vue` 생성자로 Vue 인스턴스를 생성함
```javascript
var vm = new Vue({
  // options
})
```
2. Vue 인스턴스를 인스턴스화 할 때에는 option 객체를 함께 전달해야함
```javascript
var MyComponent = Vue.extend({
  // 옵션 확장
})
// `MyComponent`의 모든 인스턴스는
// 미리 정의된 확장 옵션과 함께 생성됩니다.
var myComponentInstance = new MyComponent()
```

### 속성과 메소드
1. Vue 인스턴스는 `data` 객체에 있는 모든 속성을 프록시(반응형) 처리함.
```javascript
var data = { a: 1 }
var vm = new Vue({
  data: data
})
vm.a === data.a // -> true
// 속성 설정은 원본 데이터에도 영향을 미칩니다.
vm.a = 2
data.a // -> 2
// ... 당연하게도
data.a = 3
vm.a // -> 3
```
2. `$` 로 프록시 속성과 구별
```javascript
var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
})
vm.$data === data // -> true
vm.$el === document.getElementById('example') // -> true
// $watch 는 인스턴스 메소드 입니다.
vm.$watch('a', function (newVal, oldVal) {
  // `vm.a`가 변경되면 호출 됩니다.
})
```

### 인스턴스 라이프사이클 훅
1. Vue 인스턴스가 일련의 초기화 단계를 거칠 때, 사용자 정의 로직을 실행할 수 있는 라이프사이클 훅을 함께 호출. `created`, `mounted`, `updated`, `destroyed` 등이 있음
```javascript
var vm = new Vue({
  data: {
    a: 1
  },
  //created 훅이 인스턴스 생성 후 호출됨
  created: function () {
    // `this` 는 vm 인스턴스
    console.log('a is: ' + this.a)
  }
})
// -> "a is: 1"
```
---
## Computed Properties and Watchers

### 계산된 속성

1. 템플릿 내에 많은 로직을 넣을 경우 복잡해지기 때문에 계산된 속성을 사용해야함. `vm.reversedMessage`는 `vm.message`의 값에 의존함 **<app1.html>**

```html
<div id="example">
  {{ message.split('').reverse().join('') }}

  <p>원본 메시지: "{{ message }}"</p>
  <p>뒤집히도록 계산된 메시지: "{{ reversedMessage }}"</p>
</div>
```
```javascript
var vm = new Vue({
  el: '#example',
  data: {
    message: '안녕하세요'
  },
  computed: {
    // 계산된 getter
    reversedMessage: function () {
      // `this` 는 vm 인스턴스를 가리킵니다.
      return this.message.split('').reverse().join('')
    }
  }
})
```

2. 계산된 캐싱 vs 메소드
* 표현식에서 메소드를 호출할 수 있음. 속성과 메소드의 차이점은 계산된 속성은 종속성에 따라 캐시(변경된 경우에만 다시 계산)된다는 것이며, 메소드는 렌더링 할때마다 항상 메소드를 호출함.
* 캐싱이 필요한 이유? 시간이 많이 소요되는 속성이 있다고 가정할 때 캐싱하지 않으면 getter를 많이 실행하게 됨

```html
<p>뒤집힌 메시지: "{{ reverseMessage() }}"</p>
```
```javascript
// 컴포넌트 내부
methods: {
  reverseMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
```

3. 계산된 속성 vs 감시된 속성
* Vue 인스턴스는 일반적으로 속성 감시 방법을 제공하는데, `watch` 콜백보다 계산된 속성을 사용하는 것이 더 좋음. **<app2.html>**

```html
<div id="demo">{{ fullName }}</div>
```
```javascript
//감시된 속성
var vm2 = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})

// 계산된 속성: 더 간단함
var vm2 = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})
```

4. 계산된 Setter
* 계산된 속성은 기본적으로 getter를 제공하지만 필요한 경우 setter를 제공함 **<app2.html>**

```javascript
//...
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
//...vm.fullName = 'John Doe'을 실행시 업데이트됨
```

### 감시자
1. 대부분 계산된 속성이 더 적합하지만 감시자가 필요한 경우가 있음. Vue는 `watch` 옵션을 제공하며 비동기식 수행에 가장 유용함
* `watch` 옵션을 사용하면 비동기 연산 (API 엑세스)를 수행하고, 그 연산을 얼마나 자주 수행하는지 제한하고, 최종 응답을 얻을 때까지 중간 상태를 설정할 수 있음. 계산된 속성은 불가능
**<app3.html>**

---
## List Rendering

### v-for
`v-for`로 리스트를 렌더링할 수 있음. `item in items`의 방법으로 나타내며 `item`은 별칭, `items`는 원본 배열, `index`는 현재 항목에 대한 인덱스

1. 기본 사용방법

```html
<ul id="example-1">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>
```
```javascript
var example1 = new Vue({
  el: '#example-1',
  data: {
    parentMessage: 'Parent',
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
```

* `in` 대신에 `of`를 사용할 수 있음

```html
<div v-for="item of items"></div>
```

2. `v-for` 템플릿
* 템플릿 `v-if`와 마찬가지로, `v-for`와 함께 `<template>` 태그를 사용하여 여러 엘리먼트의 블럭을 렌더링할 수 있음

```html
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider"></li>
  </template>
</ul>
```

3. `v-for`와 객체
* `v-for`를 사용하여 객체의 속성을 반복할 수 있음, key와 index 또한 전달 가능

```html
<ul id="repeat-object" class="demo">
  <div v-for="(value, key, index) in object">
  {{ index }}. {{ key }} : {{ value }}
  </div>
</ul>
```
```js
new Vue({
  el: '#repeat-object',
  data: {
    object: {
      firstName: 'John',
      lastName: 'Doe',
      age: 30
    }
  }
})
```

4. Range `v-for`
* `v-for`는 정수를 사용할 수 있음

```html
<div>
  <span v-for="n in 10">{{ n }}</span>
</div>
```

5. `v-for`와 `v-if`
* `v-for`는 `v-if`보다 더 높은 우선 순위를 가짐. 다음의 경우 `v-if`는 반복문이 돌때 계속 실행되는데, 일부만 렌더링하려는 경우에 유용

```html
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo }}
</li>
```

* 루프의 실행을 조건부로 건너뛰는 것이 목적이라면 `v-if`를 옮기면 됨

```html
<ul v-if="shouldRenderTodos">
  <li v-for="todo in todos">
    {{ todo }}
  </li>
</ul>
```
### Key
1. Vue가 각 노드의 ID를 추적하고 기존 엘리먼트를 재사용하고 재정렬할 수 있도록 힌트를 제공하려면 각 항목에 고유한 `key` 속성을 제공해야 함. `key`값은 고유한 ID를 사용
```html
<div v-for="item in items" :key="item.id">
  <!-- content -->
</div>
```

### 배열 변경 탐지
1. 변이 메소드
* Vue는 아래와 같은 배열의 변이 메소드를 통해 뷰를 갱신
* push(), pop(), shift(), unshift(), splice(), sort(), reverse()

```js
example1.items.push({ message: 'Baz' })
```

2. 배열 대체
* 변이 메소드는 원본 배열을 변형할 수 있음. 하지만 변형하지 않고 filter(), concat(), slice()를 사용하면 변형하지 않고 새 배열을 반환함.

```js
example1.items = example1.items.filter(function (item) {
  return item.message.match(/Foo/)
})
```

3. 주의사항
* JavaScript의 제한으로 인해 Vue는 배열에 대해 다음과 같은 변경 사항을 감지할 수 없음
* (1) 인덱스로 배열에 있는 항목을 직접 설정하는 경우. 예) `vm.items[indexOfItem] = newValue`
* (2) 배열 길이를 수정하는 경우. 예) `vm.items.length = newLength`

```js
// (1)을 해결하기 위한 방법
// Vue.set
Vue.set(example1.items, indexOfItem, newValue)
// Array.prototype.splice
example1.items.splice(indexOfItem, 1, newValue)

// (2)를 해결하기 위한 방법
example1.items.splice(newLength)
```

### 필터링 / 정렬된 결과 표시
1. 원본 데이터를 변경하거나 재설정하지 않고 필터링 된 배열이나 정렬된 배열을 반환하는 계산된 속성을 만들 수 있음

```html
<li v-for="n in evenNumbers">{{ n }}</li>
```
```js
data: {
  numbers: [ 1, 2, 3, 4, 5 ]
},
computed: {
  evenNumbers: function () {
    return this.numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```

2. 계산된 속성을 실행할 수 없는 상황(예: 중첩 된 `v-for` 루프 내부)에서는 다음과 방법을 사용

```html
<li v-for="n in even(numbers)">{{ n }}</li>
```
```js
data: {
  numbers: [ 1, 2, 3, 4, 5 ]
},
methods: {
  even: function (numbers) {
    return numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```

---

## Form Input Bindings

### 기본 사용법
`v-model` 디렉티브를 사용하여 폼 input과 textarea 엘리먼트에 양방향 데이터 바인딩을 생성할 수 있음.
`v-model`은 모든 form 엘리먼트의 초기 `value`와 `checked` 그리고 `selected` 속성을 무시하며, `data` 옵션 안에 있는 JavaScript에서 초기값을 선언해야 함

1. 문자열

```html
<input v-model="message" placeholder="여기를 수정해보세요">
<p>메시지: {{ message }}</p>
```

2. Multiline 문장
* `<textarea>{{ text }}</textarea>`은 작동하지 않으므로 `v-model`을 사용
```html
<span>여러 줄을 가지는 메시지:</span>
<p style="white-space: pre">{{ message }}</p>
<br>
<textarea v-model="message" placeholder="여러줄을 입력해보세요"></textarea>
```

3. 체크박스

```html
<input type="checkbox" id="checkbox" v-model="checked">
<label for="checkbox">{{ checked }}</label>
```

* 여러개의 체크박스는 같은 배열 바인딩 가능

```html
<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
<label for="jack">Jack</label>
<input type="checkbox" id="john" value="John" v-model="checkedNames">
<label for="john">John</label>
<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
<label for="mike">Mike</label>
<br>
<span>체크한 이름: {{ checkedNames }}</span>
```
```js
new Vue({
  el: '...',
  data: {
    checkedNames: []
  }
})
```

4. 라디오

```html
<input type="radio" id="one" value="One" v-model="picked">
<label for="one">One</label>
<br>
<input type="radio" id="two" value="Two" v-model="picked">
<label for="two">Two</label>
<br>
<span>선택: {{ picked }}</span>
```

5. 셀렉트

```html
<select v-model="selected" multiple>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
<br>
<span>Selected: {{ selected }}</span>
```

* `v-for`를 사용한 동적 옵션 렌더링

```html
<select v-model="selected">
  <option v-for="option in options" v-bind:value="option.value">
    {{ option.text }}
  </option>
</select>
<span>Selected: {{ selected }}</span>
```
```js
new Vue({
  el: '...',
  data: {
    selected: 'A',
    options: [
      { text: 'One', value: 'A' },
      { text: 'Two', value: 'B' },
      { text: 'Three', value: 'C' }
    ]
  }
})
```

### 값 바인딩
라디오, 체크박스 및 셀렉트 옵션의 경우, `v-model` 바인딩 값은 보통 정적인 문자열임. 하지만 때로는 동적 속성에 바인딩 해야하는 경우가 발생함. `v-bind`를 사용함.

```html
<!-- `picked` 는 선택시 문자열 "a" 입니다 -->
<input type="radio" v-model="picked" value="a">
<!-- `toggle` 는 true 또는 false 입니다 -->
<input type="checkbox" v-model="toggle">
<!-- `selected`는 "ABC" 선택시 "abc" 입니다 -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>
```

1. 체크박스

```html
<input
  type="checkbox"
  v-model="toggle"
  v-bind:true-value="a"
  v-bind:false-value="b"
>
```
```js
// 체크 하면:
vm.toggle === vm.a
// 체크하지 않으면:
vm.toggle === vm.b
```

2. 라디오

```html
<input type="radio" v-model="pick" v-bind:value="a">
```
```js
// 체크 하면:
vm.pick === vm.a
```

3. 셀렉트

```html
<select v-model="selected">
  <!-- inline object literal -->
  <option v-bind:value="{ number: 123 }">123</option>
</select>
```
```js
// 선택 하면:
typeof vm.selected // -> 'object'
vm.selected.number // -> 123
```

### 수식어
1. `v-model`은 입력 이벤트 후 입력과 데이터를 동기화 함. `.lazy` 수식어를 추가하여 change 이벤트 이후에 동기화

```html
<!-- "input" 대신 "change" 이후에 동기화 됩니다. -->
<input v-model.lazy="msg" >
```

2. 자동으로 숫자로 형변환 되기를 바란다면 input 내에 `.number`수식어를 추가

```html
<input v-model.number="age" type="number">
```

3. `v-model`이 관리하는 input을 자동으로 trim 하기 원하면, `.trim` 수식어 사용

```html
<input v-model.trim="msg">
```

---
## Components

### 컴포넌트란 무엇인가?
뷰의 단위를 쪼개어 재사용 가능한 코드로 캡슐화하는 것

### 컴포넌트 사용
1. 등록
* 태그 이름에 대하여 모두 소문자여야 하고 하이픈을 포함해야함.

```js
// 새 Vue 인스턴스 생성
new Vue({
  el: '#some-element',
  // 옵션
})

// 전역 컴포넌트 등록
Vue.component('my-component', {
  // 옵션
})
```

* 등록되면 `<my-component></my-component>`로 사용가능

```html
<div id="example">
  <my-component></my-component>
</div>
```
```js
// 등록
Vue.component('my-component', {
  template: '<div>사용자 정의 컴포넌트 입니다!</div>'
})
// 루트 인스턴스 생성
new Vue({
  el: '#example'
})
```
```html
<!--아래와 같이 렌더링 됨-->
<div id="example">
  <div>사용자 정의 컴포넌트 입니다!</div>
</div>
```

2. 지역 등록
* 모든 것을 전역으로 등록할 필요 없음. `components` 옵션을 등록함으로써 인스턴스/컴포넌트의 범위에서만 사용할 수있는 컴포넌트를 생성할 수 있음

```js
var Child = {
  template: '<div>사용자 정의 컴포넌트 입니다!</div>'
}
new Vue({
  // ...
  components: {
    // <my-component> 는 상위 템플릿에서만 사용할 수 있습니다.
    'my-component': Child
  }
})
```

3. `data`는 반드시 함수여야 함
* 다음의 경우 콘솔에서 경고, 컴포넌트 인스턴스의 함수여야 함.
```js
Vue.component('my-component', {
  template: '<span>{{ message }}</span>',
  data: {
    message: 'hello'
  }
})
```

* 다음과 같이 사용해야 함

```html
<div id="example-2">
  <simple-counter></simple-counter>
  <simple-counter></simple-counter>
  <simple-counter></simple-counter>
</div>
```
```js
var data = { counter: 0 }
Vue.component('simple-counter', {
  template: '<button v-on:click="counter += 1">{{ counter }}</button>',
  // 데이터는 기술적으로 함수이므로 Vue는 따지지 않지만
  // 각 컴포넌트 인스턴스에 대해 같은 객체 참조를 반환합니다.

  // 1) 아래의 경우 3개가 동시에 count 증가
  data: function () {
    return data
  }

  // 2) 3개가 별개로 증가
  data: function () {
    return {
      counter: 0
    }
  }
})
new Vue({
  el: '#example-2'
})
```

4. 부모-자식 컴포넌트 관계
* 부모 -> 자식: Props 아래로
* 자식 -> 부모: Events 위로
![](https://kr.vuejs.org/images/props-events.png)

### Props

1. Props로 데이터 전달
* 모든 컴포넌트 인스턴스에는 자체 범위가 있음. 즉, 하위 컴포넌트의 템플릿에서 상위 데이터를 직접 참조 할 수 없음. 데이터는 `props` 옵션(`prop`은 상위 컴포넌트의 정보를 전달하기 위한 사용자 지정 특성) 을 사용하여 하위 컴포넌트로 전달될 수 있음

```js
Vue.component('child', {
  // props 정의
  props: ['message'],
  // 데이터와 마찬가지로 prop은 템플릿 내부에서 사용할 수 있으며
  // vm의 this.message로 사용할 수 있습니다.
  template: '<span>{{ message }}</span>'
})
```
```html
<child message="안녕하세요!"></child>
```

2. camelCase vs. kebab-case
* HTML 속성은 대소 문자를 구분하지 않으므로 템플릿을 사용할 때 kebab-case(하이픈 구분)를 사용

```js
Vue.component('child', {
  // JavaScript는 camelCase
  props: ['myMessage'],
  template: '<span>{{ myMessage }}</span>'
})
```
```html
<!-- HTML는 kebab-case -->
<child my-message="안녕하세요!"></child>
```

3. 동적 Props
* `v-bind`를 사용하여 부모의 데이터에 props을 동적으로 바인딩함. 데이터가 상위에서 업데이트 될 때 하위에 전달.

```html
<div>
  <input v-model="parentMsg">
  <br>
  <child v-bind:my-message="parentMsg"></child>
</div>

<!--v-bind 단축 구문-->
<child :my-message="parentMsg"></child>
```

4. 일반 문자열 vs. 동적
* 흔히하는 실수는 문자열을 숫자로 전달함. `v-bind`를 사용해야함

```html
<!-- 이것은 일반 문자열 "1"을 전달 -->
<comp some-prop="1"></comp>

<!-- 이것은 실제 숫자로 전달 -->
<comp v-bind:some-prop="1"></comp>
```

5. Props 검증
* prop에 대한 요구사항을 지정할 수 있음. 요구사항이 충족 되지 않으면 Vue에서 경고를 내보냄. 다음과 같은 타입이 있음
* String, Number, Boolean, Function, Object, Array

### 사용자 정의 이벤트
1. `v-on`을 이용한 사용자 정의 이벤트
* $on(eventName)을 사용하여 이벤트를 감지
* $emit(eventName)을 사용하여 이벤트를 트리거

```html
<div id="counter-event-example">
  <p>{{ total }}</p>
  <button-counter v-on:increment="incrementTotal"></button-counter>
  <button-counter v-on:increment="incrementTotal"></button-counter>
</div>
```
```js
Vue.component('button-counter', {
  template: '<button v-on:click="increment">{{ counter }}</button>',
  data: function () {
    return {
      counter: 0
    }
  },
  methods: {
    increment: function () {
      this.counter += 1
      this.$emit('increment')
    }
  },
})
new Vue({
  el: '#counter-event-example',
  data: {
    total: 0
  },
  methods: {
    incrementTotal: function () {
      this.total += 1
    }
  }
})
```

2. `.sync`
* `.sync`를 가지는 속성을 변경하면 값의 변경이 부모에 반영됨

```html
<!--아래 두개가 동일-->
<comp :foo.sync="bar"></comp>

<comp :foo="bar" @update:foo="val => bar = val"></comp>
```

3. 사용자 정의 이벤트를 활용하여 폼 입력 컴포넌트 생성
* 사용자 정의 이벤트는 `v-model` 에서 작동하는 사용자 정의 입력을 만드는 데에도 사용됨
* `v-model`을 사용하는 컴포넌트는 `value`prop을 가지며, 새로운 값으로 `input`이벤트를 내보냄

```html
<input v-model="something">

<!--위에 것과 동일-->
<input
  v-bind:value="something"
  v-on:input="something = $event.target.value">

<!--컴포넌트 사용-->
<custom-input
  :value="something"
  @input="value => { something = value }">
</custom-input>
```

4. 컴포넌트의 `v-model`정의
* 컴포넌트의 `v-model`은 `value`를 보조 변수로 사용하고 `input`을 이벤트로 사용하지만 체크 박스와 라디오 버튼과 같은 일부 입력 타입은 다른 목적으로 `value` 속성을 사용할 수 있음

```js
Vue.component('my-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    // 다른 목적을 위해 `value` prop를 사용할 수 있습니다.
    value: String
  },
  // ...
})
```
```html
<my-checkbox v-model="foo" value="some value"></my-checkbox>

<!--아래와 같다-->
<my-checkbox
  :checked="foo"
  @change="val => { foo = val }"
  value="some value">
</my-checkbox>
```

5. 두 컴포넌트가 서로 부모-자식 관계가 아닐 경우의 통신은 Vue 인스턴스를 사용하여 event bus를 사용할 수 있음

```js
var bus = new Vue()

// 컴포넌트 A의 메소드
bus.$emit('id-selected', 1)

// 컴포넌트 B의 created 훅
bus.$on('id-selected', function (id) {
  // ...
})
```

### 슬롯을 사용한 컨텐츠 배포
1. 범위 컴파일
```html
<!--다음의 경우 부모에 바인딩-->
<child-component>
  {{ message }}
</child-component>
```

* 컴포넌트 범위에 대한 법칙은 다음과 같다
```
상위 템플릿의 모든 내용은 상위 범위로 컴파일되며 하위 템플릿의 모든 내용은 하위 범위에서 컴파일됨
```

2. 단일 슬롯
* 하위 컴포넌트 템플릿에 최소한 하나의 `<slot>` 콘텐츠가 포함되어 있지 않으면 부모 콘텐츠가 삭제됨
* `<slot>` 태그 안에 있는 내용은 대체 콘텐츠로 간주됨. 대체 콘텐츠는 하위 범위에서 컴파일되며 삽입할 콘텐츠가 없는 경우에만 표시

```html
<div>
  <h2>나는 자식 컴포넌트의 제목입니다</h2>
  <slot>
    제공된 컨텐츠가 없는 경우에만 보실 수 있습니다.
  </slot>
</div>

<!--그리고 그 컴포넌트를 사용하는 부모는-->
<div>
  <h1>나는 부모 컴포넌트의 제목입니다</h1>
  <my-component>
    <p>이것은 원본 컨텐츠 입니다.</p>
    <p>이것은 원본 중 추가 컨텐츠 입니다</p>
  </my-component>
</div>

<!--아래처럼 렌더링 됩니다.-->
<div>
  <h1>나는 부모 컴포넌트의 제목입니다</h1>
  <div>
    <h2>나는 자식 컴포넌트의 제목 입니다</h2>
    <p>이것은 원본 컨텐츠 입니다.</p>
    <p>이것은 원본 중 추가 컨텐츠 입니다</p>
  </div>
</div>
```

3. 이름을 가지는 슬롯
* `<slot>` 엘리먼트는 특별한 속성 인 `name`을 가짐

```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>

<!--부모 마크업-->
<app-layout>
  <h1 slot="header">여기에 페이지 제목이 위치합니다</h1>
  <p>메인 컨텐츠의 단락입니다.</p>
  <p>하나 더 있습니다.</p>
  <p slot="footer">여기에 연락처 정보입니다.</p>
</app-layout>

<!--아래와 같이 렌더링 됩니다.-->
<div class="container">
  <header>
    <h1>여기에 페이지 제목이 위치합니다</h1>
  </header>
  <main>
    <p>메인 컨텐츠의 단락입니다.</p>
    <p>하나 더 있습니다.</p>
  </main>
  <footer>
    <p>여기에 연락처 정보입니다.</p>
  </footer>
</div>
```

4. 범위를 가지는 슬롯
* 하위 컴포넌트에서 prop을 컴포넌트에 전달하는 것처럼 슬롯에 데이터를 전달

```html
<div class="child">
  <slot text="hello from child"></slot>
</div>

<!--부모-->
<div class="parent">
  <child>
    <template scope="props">
      <span>hello from parent</span>
      <span>{{ props.text }}</span>
    </template>
  </child>
</div>

<!--위를 렌더링하면 출력은 다음과 같습니다.-->
<div class="parent">
  <div class="child">
    <span>hello from parent</span>
    <span>hello from child</span>
  </div>
</div>
```

### 동적 컴포넌트
* `<component>` 엘리먼트를 사용하여 여러 컴포넌트 간에 동적으로 전환하고, `is` 속성에 동적으로 바인딩

```js
var vm = new Vue({
  el: '#example',
  data: {
    currentView: 'home'
  },
  components: {
    home: { /* ... */ },
    posts: { /* ... */ },
    archive: { /* ... */ }
  }
})
```
```html
<component v-bind:is="currentView">
  <!-- vm.currentView가 변경되면 컴포넌트가 변경됩니다! -->
</component>
```

* 원하는 경우 객체에 직접 바인딩 가능

```js
var Home = {
  template: '<p>Welcome home!</p>'
}
var vm = new Vue({
  el: '#example',
  data: {
    currentView: Home
  }
})
```

1. keep-alive
* 전환된 컴포넌트를 메모리에 유지하여 상태를 보존하거나 다시 렌더링하지 않도록하려면 동적 컴포넌트를 `<keep-alive>` 사용

```html
<keep-alive>
  <component :is="currentView">
    <!-- 비활성화 된 컴포넌트는 캐시 됩니다! -->
  </component>
</keep-alive>
```

### 기타
1. 재사용 가능한 컴포넌트 제작
* Vue 컴포넌트의 API는 다음과 같이 Props, 이벤트, 슬롯으로 구분
* Props: 외부 환경이 데이터를 컴포넌트로 전달하도록 허용
* 이벤트: 컴포넌트가 외부 환경에서 사이드이펙트를 발생할 수 있도록 함
* 슬롯: 외부 환경에서 추가 컨텐츠가 포함 된 컴포넌트를 작성할 수 있음
* `v-bind` 와 `v-on` 을 위한 약어문을 사용하여 의도를 명확하고 간결하게 템플릿에 전달할 수 있음

```html
<my-component
  :foo="baz"
  :bar="qux"
  @event-a="doThis"
  @event-b="doThat"
>
  <img slot="icon" src="...">
  <p slot="main-text">Hello!</p>
</my-component>
```

2. 자식 컴포넌트 참조
* 하위 컴포넌트에 직접 액세스 해야 할 수도 있는데, 이를 위해 `ref` 를 활용하여 참조 컴포넌트 ID를 자식 컴포넌트에 할당함

```html
<div id="parent">
  <user-profile ref="profile"></user-profile>
</div>
```
```js
var parent = new Vue({ el: '#parent' })
// 자식 컴포넌트 인스턴스에 접근합니다.
var child = parent.$refs.profile
```

3. 비동기 컴포너트
* Vue를 사용하면 컴포넌트 정의를 비동기식으로 해결하는 팩토리 함수로 컴포넌트를 정의 할 수 있음

```js
Vue.component('async-example', function (resolve, reject) {
  setTimeout(function () {
    // 컴포넌트 정의를 resolve 콜백에 전달합니다.
    resolve({
      template: '<div>I am async!</div>'
    })
  }, 1000)
})
```

4. 컴포넌트 이름
* 컴포넌트(또는 prop)를 등록 할 때 kebab-case, camelCase 또는 TitleCase를 사용

```js
// 컴포넌트 정의에서
components: {
  // kebab-case를 사용한 등록
  'kebab-cased-component': { /* ... */ },
  // camelCase를 사용한 등록
  'camelCasedComponent': { /* ... */ },
  // TitleCase를 사용한 등록
  'TitleCasedComponent': { /* ... */ }
}
```
```html
<!-- HTML 템플릿에서 항상 kebab-case를 사용하세요 -->
<kebab-cased-component></kebab-cased-component>
<camel-cased-component></camel-cased-component>
<title-cased-component></title-cased-component>
```

* 문자열은 대소문자를 구분하지 않음

```html
<!-- 문자열 템플릿은 무엇을 사용해도 상관 없습니다. -->
<my-component></my-component>
<myComponent></myComponent>
<MyComponent></MyComponent>
```

5. 재귀 컴포넌트
* 컴포넌트는 `name` 옵션을 사용하여 자신의 템플릿에서 재귀적으로 호출할 수 있음.

```js
name: 'unique-name-of-my-component'
```

* Vue 컴포넌트를 등록하면 id가 `name` 옵션으로 자동 설정

```js
Vue.component('unique-name-of-my-component', {
  // ...
})
```

6. inline template
* 하위 컴포넌트에 `inline-template` 이라는 특수한 속성이 존재할 때, 컴포넌트는 그 내용을 분산된 내용으로 취급하지 않고 템플릿으로 사용

```html
<my-component inline-template>
  <div>
    <p>이것은 컴포넌트의 자체 템플릿으로 컴파일됩니다.</p>
    <p>부모가 만들어낸 내용이 아닙니다.</p>
  </div>
</my-component>
```

7. X-templates
* 템플릿을 정의하는 또 다른 방법은 `text/x-template` 내의 id로 템플릿을 참조

```html
<script type="text/x-template" id="hello-world-template">
  <p>Hello hello hello</p>
</script>
```
```js
Vue.component('hello-world', {
  template: '#hello-world-template'
})
```

8. `v-once`를 이용한 정적 컴포넌트
* 정적 콘텐츠가 많이 포함 된 컴포넌트가 있을 수 있는데 이런 경우 `v-once` 디렉티브를 추가함으로써 캐시가 한번만 실행되도록 함

```js
Vue.component('terms-of-service', {
  template: '\
    <div v-once>\
      <h1>Terms of Service</h1>\
      ... a lot of static content ...\
    </div>\
  '
})
```
