/*
 * @Author: dongqingming
 * @Date: 2021-07-28 20:21:04
 * @LastEditTime: 2021-07-29 20:49:19
 * @LastEditors: dongqingming
 * @Description: Do not edit
 * @FilePath: /articles/test.js
 * no bug no code
 */
// function getArray (arr) {
  // Array.from(new Set(arr.toSting().split('')))
//   let tempArr = removeRepeat(flatten(arr));

//   console.log(tempArr.sort((a, b) => a - b));
// }

// function flatten(arr, level) {
//   return arr.reduce((prev, next) => prev.concat(Array.isArray(next) && level > 1 ? flatten(next, --level) : next), [])
// }

// console.log(flatten([1,2,[3,[4,5,[6,7]]]], 2))

// function removeRepeat(arr) {
//   return arr.filter((item, index) => arr.indexOf(item) === index);
// }

// getArray([1,4,2,[2,5,[7,9],[6,5,[5,7]]]]);

// function revert(str) {
//   let arr = str.split('').reverse().join('');
//   let res = '';

//   for (let i = 0, length = arr.length; i < length; i += 3) {
//     let ii = arr.slice(i, i + 3);
//     res =  i >= (3 * parseInt(length/3))
//       ? `￥${ii.split('').reverse().join('')}` + res
//       : `,${ii.split('').reverse().join('')}` + res;
//   }

//   console.log(res);
// }

// revert('1234567890');
// const scheduler = new Scheduler(2);
// const addTask = (time, order) => {
//   scheduler.add(time, order);
// };
// addTask(1000, "1");
// addTask(500, "2");
// addTask(300, "3");
// addTask(400, "4");
// scheduler.taskStart();

// class Scheduler{
//   constructor(count) {
//     this.count = count;
//     this.list = [];
//     this.runCount = 0;
//   }

//   taskStart() {
//     for (let i = 0; i < this.count; i++) {
//       this.request();
//     }
//   }

//   add(time, order) {
//     const task = new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve()
//       }, time)
//     })

//     this.list.push(task);
//   }

//   request() {
//     if (this.runCount >= this.count) return;

//     this.runCount++;
//     this.list.shift()().then(() => {
//       this.runCount--;
//       this.request()
//     });
//   }
// }
// function compose(middlewares) {
//   return function(context, next) {
//     dispatch(0);

//     function dispatch(i) {
//       if(i > middlewares.length) return;

//       let fn = middlewares[i];
//       if (i === middlewares.length) fn = next;
//       if (!fn) fn = Promise.resolve();

//       return Promise.resolve(fn(context, function next(){
//         return dispatch(i+1);
//       }))
//     }
//   }
// }
let cache = [];
function fib(n) {
  if (cache[n] !== undefined) {
    return cache[n]
  }
  if (n === 1 || n === 2) {
    cache[n] = 1
    return 1
  }

  cache.push(fib(n - 1) + fib(n - 2));
  return cache[n];
}
