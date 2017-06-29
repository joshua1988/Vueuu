# ECMAScript 2015 Features
---
## ECMAScript란?
ECMAScript는 자바스크립트 표준 단체인 ECMA가 제정하는 자바스크립트 표준으로, ES1 ~ ES3, ES6 까지 존재하며 ES4는 폐기됨

## ES6의 새로운 기능
### Arrows and Lexical This

* 화살표 `=>` 는 function expression을 대체

```javascript
// Expression Bodies
ES5
odds  = evens.map(function (v) { return v + 1; });
nums  = evens.map(function (v, i) { return v + i; });

ES6
odds  = evens.map(v => v + 1)
nums  = evens.map((v, i) => v + i)
```
```javascript
// Statement Bodies
ES5
nums.forEach(function (v) {
   if (v % 5 === 0)
       fives.push(v);
});

ES6
nums.forEach(v => {
   if (v % 5 === 0)
       fives.push(v)
})
```
* `this` 문법

```javascript
// Lexical this
ES5
var self = this;
this.nums.forEach(function (v) {
    if (v % 5 === 0)
        self.fives.push(v);
});

ES6
this.nums.forEach((v) => {
    if (v % 5 === 0)
        this.fives.push(v)
})
```

### Classes
* 프로토타입 기반의 상속, 인스턴스, 정적 메소드, 생성자 등의 기능 제공

```javascript
// Class Inheritance, Static method
ES5
var Rectangle = function (id, x, y, width, height) {
    Shape.call(this, id, x, y);
    this.width  = width;
    this.height = height;
};
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.defaultRectangle = function () {
    return new Rectangle("default", 0, 0, 100, 100);
};
var defRectangle = Rectangle.defaultRectangle();


ES6
class Rectangle extends Shape {
    constructor (id, x, y, width, height) {
        super(id, x, y)
        this.width  = width
        this.height = height
    }
    static defaultRectangle () {
        return new Rectangle("default", 0, 0, 100, 100)
    }
    var defRectangle = Rectangle.defaultRectangle()
}
```
```javascript
// Getter/Setter
ES5
var Rectangle = function (width, height) {
    this._width  = width;
    this._height = height;
};
Rectangle.prototype = {
    set width  (width)  { this._width = width;               },
    get width  ()       { return this._width;                },
    set height (height) { this._height = height;             },
    get height ()       { return this._height;               },
    get area   ()       { return this._width * this._height; }
};
var r = new Rectangle(50, 20);
r.area === 1000;


ES6
class Rectangle {
    constructor (width, height) {
        this._width  = width
        this._height = height
    }
    set width  (width)  { this._width = width               }
    get width  ()       { return this._width                }
    set height (height) { this._height = height             }
    get height ()       { return this._height               }
    get area   ()       { return this._width * this._height }
}
var r = new Rectangle(50, 20)
r.area === 1000
```

### Enhanced Object Literals
* property 이름과 같은 변수이면 생략

```javascript
ES5
obj = { x: x, y: y };

ES6
obj = { x, y }
```

* method 사용 시 function 생략

```javascript
ES5
obj = {
    foo: function (a, b) {
        …
    }
};

ES6
obj = {
    foo (a, b) {
        …
    }
}
```

### Template Strings
* 문자열 템플릿의 변화

```javascript
ES5
var a = 3;
var b = 'hi';
var object = {
  c: 'friends'
};
var string = b + ', my ' + a + ' ' + object.c; // 'hi, my 3 friends'

ES6
const string2 = `${b}, my ${a} ${object.c}`;
```
* 백틱(backtick)을 이용한 줄 구분

```javascript
ES5
var string3 = 'hello\nfriends!';

ES6
const string4 = `hello
friends!`;
```

### Destructuring (객체 파괴..? 해제..?)
* Array 요소를 쉽게 분해함

```javascript
ES5
var array = [1, 2, 3];
var a = array[0];
var b = array[array.length - 1];
console.log(a); // 1
console.log(b); // 3

ES6
const [c, ,d] = [1, 2, 3];
console.log(c); // 1
console.log(d); // 3
```
* Object 요소를 쉽게 분해함 (없는 변수를 선언했을 경우 자동으로 undefined으로 지정되어 오류 발생하지 않음)

```javascript
ES5
var obj = {
  e: 'Eeee',
  f: {
    g: 'Gee'
  }
};
var e = obj.e; // 'Eeee'
var g = obj.f.g; // 'Gee'

ES6
const obj2 = {
  h: 'Eich',
  i: {
    j: 'Jay'
  }
}
const { h, i: { j }, k } = obj2;
console.log(h, j, k); // 'Eich', 'Jay', undefined
```

### Extended Parameter Handling (Default + Rest + Spread)
* 호출 시 바로 계산

```javascript
// Default parameter
ES5
function f (x, y, z) {
    if (y === undefined)
        y = 7;
    if (z === undefined)
        z = 42;
    return x + y + z;
};
f(1) === 50

ES6
function f (x, y = 7, z = 42) {
    return x + y + z
}
f(1) === 50
```

* 기존의 arguments를 대체

```javascript
// Rest parameter
ES5
function f (x, y) {
    var a = Array.prototype.slice.call(arguments, 2);
    return (x + y) * a.length;
};
f(1, 2, "hello", true, 7) === 9;

ES6
function f (x, y, ...a) {
    return (x + y) * a.length
}
f(1, 2, "hello", true, 7) === 9
```

* 배열을 풀어서 인자로 넘기기

```javascript
// Spread
ES5
var str = "foo";
var chars = str.split(""); // [ "f", "o", "o" ]

ES6
var str = "foo"
var chars = [ ...str ] // [ "f", "o", "o" ]
```

### Let + Const
* `let`과 `const`는 `var`와 같은 변수 선언 방법으로 `var`는 함수스코프, `let`과 `const`는 블록스코프(해당 변수를 해당 블록에서만 접근할 수 있음)를 따름.

```javascript
// var
if (true) {
  var x = 3;
}
console.log(x); // 3

// let, const
if (true) {
  const y = 3;
}
console.log(y); // Uncaught ReferenceError: y is not defined
```

* `const`와 `let`의 차이점: `const`는 한 번 초기화하면 다른 값을 대입할 수 없지만 let은 계속 값을 바꿔줄 수 있음

```javascript
const a = 100;
a = 101; // Uncaught TypeError: Assignment to constant variable.
let b = 100;
b = 101; // 101
```
* 그러나 `const`는 `=` 를 사용한 대입만 막을 뿐 `const`에 할당된 객체나 배열의 요소를 바꾸는 것은 가능함

```javascript
const c = [1, 2, 3];
c[0] = 4;
c; // [4, 2, 3]
```

### Iterators + For..Of
* `iterator`속성은 반복을 나타내며 `next`를 만들어 주어야 반복기가 완성이 됨. return에서 `done`은 반복 완료 여부를 나타내며 `value`는 현재 값을 나타냄.

```javascript
let factorial = {
  [Symbol.iterator]() {
    let count = 1;
    let cur = 1;
    return {
      next() {
        [count, cur] = [count + 1, cur * count];
        return { done: false, value: cur };
      }
    }
  }
};
for (let n of factorial) {
  if (n > 10000000) {
    break;
  }
  console.log(n);
} // 1, 2, 6, 24, 120, 720, 5040, 40320, ...
```

### Generators
* 반복기와 유사하나 `function*` 과 `yield` 구문에서 차이를 보임. `function*` 이 반복기를 나타내며 `yield`는 value 값을 지정, `next`로 생성기에 값을 전달함

```javascript
function* factGenerator() {
  let cur = 1;
  let count = 1;
  while (true) {
    [count, cur] = [count + 1, cur * count]
    yield cur;
  }
}
let factGen = factGenerator();
factGen.next().value; // 1
factGen.next().value; // 2
factGen.next().value; // 6
```

### Unicode

```javascript
ES5
"𠮷".length === 2;
"𠮷".match(/(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF][\uD800-\uDBFF][\uDC00-\uDFFF][\uD800-\uDBFF](?![\uDC00-\uDFFF])(?:[^\uD800-\uDBFF]^)[\uDC00-\uDFFF])/)[0].length === 2;
"𠮷" === "\uD842\uDFB7";

ES6
// same as ES5.1
"𠮷".length == 2-
// new RegExp behaviour, opt-in ‘u’
"𠮷".match(/./u)[0].length == 2
// new form
"\u{20BB7}" == "𠮷" == "\uD842\uDFB7"
// new String ops
"𠮷".codePointAt(0) == 0x20BB7
// for-of iterates code points
for(var c of "𠮷") {
  console.log(c);
}
```

### Modules
* javascript는 예전부터 리소스관리가 어려운 문제점(페이지에 필요한 파일을 모두 불러와야 하므로)이 있었으며, 변수가 겹치는 문제, 스크립트 로딩 순서에 따른 문제점이 있었음.

```javascript
ES5
//  lib/math.js
LibMath = {};
LibMath.sum = function (x, y) { return x + y };
LibMath.pi = 3.141593;

//  someApp.js
var math = LibMath;
console.log("2π = " + math.sum(math.pi, math.pi));

//  otherApp.js
var sum = LibMath.sum, pi = LibMath.pi;
console.log("2π = " + sum(pi, pi));

ES6
//  lib/math.js
export function sum (x, y) { return x + y }
export var pi = 3.141593

//  someApp.js
import * as math from "lib/math"
console.log("2π = " + math.sum(math.pi, math.pi))

//  otherApp.js
import { sum, pi } from "lib/math"
console.log("2π = " + sum(pi, pi))
```

* `export default` = `export *` default로 지정한 경우 괄호를 사용하지 않아도 불러올 수 있음.

```javascript
// lib/mathplusplus.js
export * from "lib/math";
export var e = 2.71828182846;
export default function(x) {
    return Math.exp(x);
}

// app.js
import exp, {pi, e} from "lib/mathplusplus";
console.log("e^π = " + exp(pi));
```

### Module Loaders
ES2015에 포함되지 않은 진행중인 표준.

### Map + Set + WeakMap + WeakSet
* Map은 Object를 변형한 것이고 Set은 Array를 변형한 것.
* Map은 넣은 순서대로 반복하며 키 값이 문자열이 아닌 어떤 값이라도 가능.
* Set은 값이 중복 불가하며, set[1] 처럼 중간 값을 확인할 수 없음

* `set`으로 설정하고 `get`으로 불러옴. `has`로 해당 키가 있는지 확인 가능. `entries`로 모든 키,값 쌍을 불러올 수 있으며 `delete`로 삭제, `clear`로 초기화 가능

```javascript
var map = new Map([['zero', 'ZeroCho']]);
map.set('hero', 'Hero');
map.get('zero'); // 'ZeroCho'
map.size; // 2
map.has('hero'); // true
map.has('nero'); // false
map.entries(); // {['zero', 'ZeroCho'], ['hero', 'Hero']}
map.keys(); // {'zero', 'hero'}
map.values(); // {'ZeroCho', 'Hero'}
map.delete('hero');
map.clear();
```

* WeakMap은 키가 객체인 Map

```javascript
var weakMapObj = { example: 'any' };
var weakMap = new WeakMap();
weakMap.set(weakMapObj, 'zero');
weakMap.get(weakMapObj); // 'zero'
```

* WeakSet은 객체만을 값으로 받음

```javascript
var weakSetObj = { example: 'any' };
var weakSet = new WeakSet();
weakSet.add(weakSetObj);
```

### Proxies
* 프록시는 기존 객체를 건들지 않고도 새 기능을 추가하거나 기존 기능을 수정 할 수 있음.
* 프록시는 타겟과 핸들러로 구성
* 타겟은 목표하는 객체이고, 핸들러는 추가 또는 수정할 기능을 적는 부분
* 핸들러 옵션 종류: get, set, has, deleteProperty, apply, construct, getOwnPropertyDescriptor, defineProperty, getPrototypeOf, setPrototypeOf, ownKeys, perventExtensions, isExtensible

```javascript
const target = {};
const handler = {
  get: function(obj, name) {
    return `안녕 ${name}`;
  }
};
const proxy = new Proxy(target, handler);
proxy.zero; // 안녕 zero
target.zero; // undefined
```
```javascript
const target = {};
const handler = {
  set: function(obj, name, value) {
    console.log(`${name}가 ${value}로 설정되었습니다`);
  }
};
const proxy = new Proxy(target, handler);
proxy.zero = 'Zero'; // zero가 Zero로 설정되었습니다.
target.zero; // undefined
```
```javascript
const target = (a, b) => a + b;
const handler = {
  apply: function(target, thisArg, argList) {
    return target.apply(thisArg, argList);
  }
};
const proxy = new Proxy(target, handler);
proxy(3, 5); // 8
```

### Symbols
* Symbol은 불변값. 생성할 때마다 새로운 값이 생성
* javascript 자료형: String, Boolean, Number, Undefined, Null, Object, Symbol

```javascript
Symbol('creator') === Symbol('creator'); // false (두 개는 다른 값)
Symbol.for('creator') === Symbol.for('creator'); // true
```
```javascript
const sb = Symbol('creator');
const obj = {
  [sb]: 'zerocho',
  a: 1,
  b: 2,
};

obj.creator; // undefined
obj[Symbol('creator'); // undefined
obj[sb]; // 'zerocho' (정확히 같은 Symbol 객체를 사용해야만 조회 가능)
Object.keys(obj); // [a, b] (심볼은 표시되지 않습니다)
```

### Subclassable Built-ins
* Array, Date, DOM Element 가 내장되어 있음

```javascript
// User code of Array subclass
class MyArray extends Array {
    constructor(...args) { super(...args); }
}

var arr = new MyArray();
arr[1] = 12;
arr.length == 2
```

### Math + Number + String + Object + Array APIs
* Math

```javascript
// Math.sign: 숫자의 부호를 알려줌. 1, -1, 0, -0, NaN
Math.sign(-3); // -1
Math.sign(-0); // -0

// Math.trunc: 소수점을 버림. Math.floor와 동일
Math.trunc(1.5); // 1
Math.trunc(-1.5); // -1
```

* Number

```javascript
// Number.isInteger: 정수인지 아닌지 알려줌
Number.isInteger(1); // true
Number.isInteger(0.1); // false
Number.isNaN("NaN") // false
```

* String

```javascript
// startsWith: 문자열이 주어진 인자로 시작하는지 체크
// endsWith: 문자열이 주어진 인자로 끝나는지 체크
'Zero is Great'.startsWith('Zero'); // true
'Zero is Great'.startsWith('is', 5); // true
// repeat: 문자열 반복
'Zero'.repeat(3); // 'ZeroZeroZero'
// includes: 찾는 문자열이 있는지 없는지 체크
'Zero is great'.includes('gr'); // true
```

* Object

```javascript
// Object.aasign(목표, 소스1, 소스2): 모든 소스를 목표에 합침
Object.assign({ }, { a: 1 }); // { a: 1 }
Object.assign({ a: 1, b: 1 }, { a: 2 }, { a: 3 }); // { a: 3, b: 1 }
// Object.is: 값이 같은지 아닌지 체크
Object.is(window, window); // true
Object.is(0, -0); // false
Object.is(null, null); // true
```

* Array

```javascript
// Array.from: 배열이 아닌 것을 배열로
Array.from('Zero'); // ['Z', 'e', 'r', 'o']
// Array.of: 인자들을 배열로
Array.of('Zero', 'Nero', 'Hero'); // ["Zero", "Nero", "Hero"]
// 배열.fill(값, 시작위치, 끝위치): 원하는 숫자로 대체
[1, 3, 5, 7, 9].fill(4); // [4, 4, 4, 4, 4]
[1, 3, 5, 7, 9].fill(4, 1, 3); // [1, 4, 4, 7, 9]

// 배열.find: 만족하는 첫번째 요소 반환
// 배열.findIndex: 만족하는 첫번째 요소의 위치 반환
[1, 2, 3, 4, 5].find(function(number) {
  return number % 2 === 0;
}); // 2
[{ name: 'Zero' }, { name: 'Nero' }, { name: 'Hero' }].find(function(person) {
  return person.name === 'Zero';
}); // { name: 'Zero' }
```

### Binary and Octal Literals
* binary(b), octal(o)

```javascript
0b111110111 === 503 // true
0o767 === 503 // true
```

### Promises
callback이 중첩될 수록 `});`등이 계속 반복해서 나오면서 가독성을 해치는데, 이를 callback hell이라고 부름. 이를 해결할 수 있는 패턴이 Promise 패턴!

```javascript
Users.findOne({}, (err, user) => {
  if (err) {
    return console.error(err);
  }
  user.name = 'zero';
  user.save((err) => {
    if (err) {
      return console.error(err); // 점점 더 앞의 공백이 깊어짐
    }
    Users.findOne({ gender: 'm' }, (err, user) => {
      ...
    });
  });
});
```

* Promise는 객체

```javascript
const promise = new Promise((resolve, reject) => {
  try {
    ...비동기 작업
    resolve(결과); // 성공했을 때의 결과 전달
  } catch (err) {
    reject(err); // 실패했을 때의 에러 전달
  }
});

// then, catch로 결과를 받음
promise.then((result) => {
  // result 처리
}).catch((err) => {
  console.error(err);
});
```

### Reflect API

```javascript
// 객체 속성 조회
const obj = { a: 1, b: 'zero', c: true };
Reflect.get(obj, 'a'); // 1

// 속성명을 배열로 출력
var O = {a: 1};
Object.defineProperty(O, 'b', {value: 2});
O[Symbol('c')] = 3;

Reflect.ownKeys(O); // ['a', 'b', Symbol(c)]

// 새로운 객체 생성
function Person(first, last) {
  this.firstName = first;
  this.lastName = last;
};
const zero = Reflect.construct(Person, ['zero', 'cho']); // new Person('zero', 'cho')와 같음
```

### Tail Calls
* 호출을 무한대로 스택을 늘리지 않음. 무한 입력에도 안전함

```javascript
function factorial(n, acc = 1) {
    "use strict";
    if (n <= 1) return acc;
    return factorial(n - 1, n * acc);
}

// Stack overflow in most implementations today,
// but safe on arbitrary inputs in ES2015
factorial(100000)
```
