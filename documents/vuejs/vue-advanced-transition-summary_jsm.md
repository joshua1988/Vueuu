# Vue.js Advanced
---
## Transition Effects

### 개요
Vue는 삽입, 갱신 또는 제거될 때 다양한 전환효과를 제공함
* CSS 전환 및 애니메이션을 위한 클래스를 자동 적용
* 타사 CSS 애니메이션 라이브러리 통합
* 전환 훅 중에 JavaScript를 사용하여 DOM을 직접 조작
* Velocity.js와 같은 써드파티 JavaScript 애니메이션 라이브러리 통합

### 단일 엘리먼트 / 컴포넌트 전환
Vue는 `transition` 이라는 컴포넌트를 제공하기 때문에 다음과 같은 상황에서 모든 엘리먼트/컴포넌트에 대한 전환효과를 추가할 수 있음
* 조건부 렌더링 (`v-if` 사용)
* 조건부 출력 (`v-show` 사용)
* 동적 컴포넌트
* 컴포넌트 루트 노드

1. 전환 클래스
* `v-enter`: enter의 시작 상태. 엘리먼트가 삽입되기 전에 적용되고 한 프레임 후에 제거됨
* `v-enter-active`: enter에 대한 활성 및 종료 상태. 엘리먼트가 삽입되기 전에 적용, 전환 / 애니메이션이 완료되면 제거됨
* `v-enter-to`: 2.1.8 이상 버전 지원. enter 상태의 끝에서 실행. 엘리먼트가 삽입된 후 (동시에 `v-leave`가 제거됨), 전환/애니메이션이 끝나면 제거되는 하나의 프레임을 추가
* `v-leave`: leave를 위한 시작 상태. leave 전환이 트리거 될 때 적용되고 한 프레임 후에 제거됨
* `v-leave-active`: leave에 대한 활성 및 종료 상태. leave 전환이 트리거되면 적용되고 전환 / 애니메이션이 완료되면 제거됨
* `v-leave-to`: 2.1.8 이상 버전 지원. leave 상태의 끝에서 실행. leave 전환이 트리거되고 (동시에 `v-leave`가 제거됨), 전환/애니메이션이 끝나면 제거되는 하나의 프레임을 추가
![transition](https://kr.vuejs.org/images/transition.png)

* `v-`는 `<transition>`엘리먼트를 사용할때 기본 값, 예를들어 `<transition name = "my-transition">`를 사용하면 `v-enter`클래스는 `my-transition-enter`가 됨

2. CSS 전환
* 가장 일반적인 전환 유형 중 하나임

```html
<div id="example-1">
  <button @click="show = !show">
    Toggle render
  </button>
  <transition name="slide-fade">
    <p v-if="show">hello</p>
  </transition>
</div>
```
```javascript
new Vue({
  el: '#example-1',
  data: {
    show: true
  }
})
```
```CSS
/* 애니메이션 진입 및 진출은 다른 지속 시간 및  */
/* 타이밍 기능을 사용할 수 있습니다. */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
```

3. CSS 애니메이션
* CSS 전환과 같은 방식이나 다른점은 요소가 삽입 된 직후에 `v-enter`가 제거되지 않지만 `animationend` 이벤트에 있음

4. 사용자 정의 클래스
* 다음과 같은 속성을 지정하여 사용자 정의 클래스를 생성할 수 있음
* enter-class
* enter-active-class
* enter-to-class (>= 2.1.8 only)
* leave-class
* leave-active-class
* leave-to-class (>= 2.1.8 only)

```html
<link href="https://unpkg.com/animate.css@3.5.1/animate.min.css" rel="stylesheet" type="text/css">
<div id="example-3">
  <button @click="show = !show">
    Toggle render
  </button>
  <transition
    name="custom-classes-transition"
    enter-active-class="animated tada"
    leave-active-class="animated bounceOutRight"
  >
    <p v-if="show">hello</p>
  </transition>
</div>
```
```javascript
new Vue({
  el: '#example-3',
  data: {
    show: true
  }
})
```

5. 전환 지속 시간
* `<transition>` 컴포넌트에 `duration` 속성을 사용하여 명시적인 전환 지속 시간(밀리 초)을 지정할 수 있음
```html
<transition :duration="1000">...</transition>
```
* enter와 leave 기간에도 지정 가능
```html
<transition :duration="{ enter: 500, leave: 800}">...</transition>
```

6. javascript 훅
* 속성에서 javascript 훅을 정의할 수 있음

```html
<!-- Velocity는 jQuery.animate와 매우 비슷하게 동작하며 -->
<!-- JavaScript 애니메이션의 훌륭한 옵션입니다. -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js"></script>
<div id="example-4">
  <button @click="show = !show">
    Toggle
  </button>
  <transition
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:leave="leave"
    v-bind:css="false"
  >
    <p v-if="show">
      Demo
    </p>
  </transition>
</div>
```
```javascript
new Vue({
  el: '#example-4',
  data: {
    show: false
  },
  methods: {
    beforeEnter: function (el) {
      el.style.opacity = 0
    },
    enter: function (el, done) {
      Velocity(el, { opacity: 1, fontSize: '1.4em' }, { duration: 300 })
      Velocity(el, { fontSize: '1em' }, { complete: done })
    },
    leave: function (el, done) {
      Velocity(el, { translateX: '15px', rotateZ: '50deg' }, { duration: 600 })
      Velocity(el, { rotateZ: '100deg' }, { loop: 2 })
      Velocity(el, {
        rotateZ: '45deg',
        translateY: '30px',
        translateX: '30px',
        opacity: 0
      }, { complete: done })
    }
  }
})
```

### 최초 렌더링 시 전환
1. 최초 렌더링 시 전환을 사용하려면 `appear`속성을 사용
```html
<transition appear>
  <!-- ... -->
</transition>

<!--원하는 경우 사용자 css 사용 -->
<transition
  appear
  appear-class="custom-appear-class"
  appear-to-class="custom-appear-to-class" (>= 2.1.8 only)
  appear-active-class="custom-appear-active-class"
>
  <!-- ... -->
</transition>

<!--사용자 정의 javascript 훅-->
<transition
  appear
  v-on:before-appear="customBeforeAppearHook"
  v-on:appear="customAppearHook"
  v-on:after-appear="customAfterAppearHook"
  v-on:appear-cancelled="customAppearCancelledHook"
>
  <!-- ... -->
</transition>
```

### 엘리먼트 간의 전환
1. `v-if` `v-else`를 사용하여 엘리먼트 간의 전환 가능.
```html
<transition>
  <table v-if="items.length > 0">
    <!-- ... -->
  </table>
  <p v-else>Sorry, no items found.</p>
</transition>
```

* 주의해야 할 점은 같은 태그 이름 을 가진 엘리먼트 사이를 전환할 때, Vue에 고유한 key 속성을 부여함으로써 별개의 엘리먼트임을 알려야함

```html
<transition>
  <button v-if="isEditing" key="save">
    Save
  </button>
  <button v-else key="edit">
    Edit
  </button>
</transition>

-------------------------------------------------------------------

<transition>
  <button v-bind:key="isEditing">
    {{ isEditing ? 'Save' : 'Edit' }}
  </button>
</transition>

```

2. 전환모드
* `in-out`: 새로운 엘리먼트가 먼저 전환되고, 완료되면 현재 엘리먼트가 전환. 잘 사용되지 않음
* `out-in`: 현재 엘리먼트가 먼저 전환되고, 완료되면 새로운 요소로 바뀜

```html
<transition name="fade" mode="out-in">
  <!-- ... the buttons ... -->
</transition>
```

### 컴포넌트 간의 전환
1. key 속성이 필요없음.

```html
<transition name="component-fade" mode="out-in">
  <component v-bind:is="view"></component>
</transition>
```
```javascript
new Vue({
  el: '#transition-components-demo',
  data: {
    view: 'v-a'
  },
  components: {
    'v-a': {
      template: '<div>Component A</div>'
    },
    'v-b': {
      template: '<div>Component B</div>'
    }
  }
})
```
```CSS
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for <2.1.8 */ {
  opacity: 0;
}
```

### 리스트 전환
1. `v-for`를 사용해 동시에 렌더링하고자 하는 리스트가 있는 경우 `<transition-group>` 컴포넌트를 사용함
* `<transition>` 과 달리, 실제 요소인 `<span>`을 렌더링하며 `tag` 속성으로 렌더링 된 요소를 변경할 수 있음. 고유한 `key`속성을 가짐

```html
<!-- 숫자를 넣고 빼는 리스트 전환 -->
<div id="list-demo">
  <button v-on:click="add">Add</button>
  <button v-on:click="remove">Remove</button>
  <transition-group name="list" tag="p">
    <span v-for="item in items" v-bind:key="item" class="list-item">
      {{ item }}
    </span>
  </transition-group>
</div>
```
```javascript
new Vue({
  el: '#list-demo',
  data: {
    items: [1,2,3,4,5,6,7,8,9],
    nextNum: 10
  },
  methods: {
    randomIndex: function () {
      return Math.floor(Math.random() * this.items.length)
    },
    add: function () {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove: function () {
      this.items.splice(this.randomIndex(), 1)
    },
  }
})
```

2. 리스트 이동 전환
* `<transition-group>`컴포넌트는 위치의 변화도 표현 가능함. 위치를 바꿀때 `v-move` 클래스를 추가해줌

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.14.1/lodash.min.js"></script>
<div id="flip-list-demo" class="demo">
  <button v-on:click="shuffle">Shuffle</button>
  <transition-group name="flip-list" tag="ul">
    <li v-for="item in items" v-bind:key="item">
      {{ item }}
    </li>
  </transition-group>
</div>
```
```javascript
new Vue({
  el: '#flip-list-demo',
  data: {
    items: [1,2,3,4,5,6,7,8,9]
  },
  methods: {
    shuffle: function () {
      this.items = _.shuffle(this.items)
    }
  }
})
```
```CSS
.flip-list-move {
  transition: transform 1s;
}
```

### 전환 재사용
1. Vue의 컴포넌트 시스템을 통해 재사용할 수 있다. 재사용할 수 있는 전환을 만드려면 루트에 `<transition>`또는 `<transition-group>` 컴포넌트를 놓고 하위의 전환 컴포넌트에 전달하면 됨

```
// template 컴포넌트를 사용한 예
Vue.component('my-special-transition', {
  template: '\
    <transition\
      name="very-special-transition"\
      mode="out-in"\
      v-on:before-enter="beforeEnter"\
      v-on:after-enter="afterEnter"\
    >\
      <slot></slot>\
    </transition>\',
  methods: {
    beforeEnter: function (el) {
      // ...
    },
    afterEnter: function (el) {
      // ...
    }
  }
})
```

### 동적 전환
1. 동적 변환의 가장 기본적인 예제는 name 속성을 동적 속성에 바인딩하는 것임.  Vue의 전환 클래스 규칙을 사용하여 CSS 전환 / 애니메이션을 정의하고 단순히 전환하려는 경우에 유용

```html
<transition v-bind:name="transitionName">
  <!-- ... -->
</transition>
```
