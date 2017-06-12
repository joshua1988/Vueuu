## var vs let, const
- let
  - 한번 선언한 값에 대해서 다시 선언 불가능

  ```js
  let a;
  let a; // ERROR: Uncaught SyntaxError: Identifier 'a' has already been declared
  ```

  - 대입 값 변경은 가능

  ```js
  let a;
  a = 10;
  a = 20;
  ```

  - 호이스팅 적용 안됨

  ```js
  console.log(a); // undefined
  var a;

  console.log(a); // Error: Uncaught ReferenceError: a is not defined
  let a;
  ```

  - 변수 유효범위가 `{}` 안으로 지정

  ```js
  let a = '1';
  console.log(a); // 1

  if (true) {
    let a = '2';
    console.log(a) // 2
  }

  console.log(a); // 1
  ```

- const
  - 한번 값을 대입하고 나서 변경 불가능

```js
function f() {
  {
    let x;
    {
      // this is ok since it's a block scoped name
      const x = "sneaky";
      // error, was just defined with `const` above
      // x = "foo";
    }
    // this is ok since it was declared with `let`
    x = "bar";
    // error, already declared above in this block
    // let x = "inner";
    x = "foo";
  }
}
```

## Fat Arrows
- function 의 축약형

```js
// ES5
var arr = ["a", "b", "c"];
arr.forEach(function (value) {
  console.log(value);
});

// ES6
var arr = ["a", "b", "c"];
arr.forEach((value) => console.log(value));
```

- 객체 property 의 값으로 사용 불가능

```js
// function ()
var myObj = {
    a: 1,
    b: 2,
    c: function () {
      return this.a + this.b;
    }
};
console.log(myObj.c()); // 3;

// Fat Arrow
var myObj = {
    a: 1,
    b: 2,
    c: () => {
        return this.a + this.b;
    }
};
console.log(myObj.c()); // NaN
```

## 참고
- [ES6 Features, Babel](https://babeljs.io/learn-es2015/#ecmascript-2015-features-symbols)
- [var, let, const](http://blog.nekoromancer.kr/2016/01/26/es6-var-let-%EA%B7%B8%EB%A6%AC%EA%B3%A0-const/)
