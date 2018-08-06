const userName = 'echo';
const avatar = 'echo.png';
const user = {
  userName,
  avatar
};
console.log(user);


// function buildFunctions() {
//   var arr = [];
//
//   for (var i = 0; i < 3; i++) {
//     arr.push(
//       function() {
//         console.log(i)
//       }
//     )
//   }
//   return arr;
// }
//
// const fs = buildFunctions()
// fs[0]()
// fs[1]()
// fs[2]()
//
//
// const hello = function () {
//   let numb = 1234
//   if (2 - 1 == 1) {
//     console.log(true)
//     let numb = 'abc'
//     return numb
//   }
//
//   return numb
// }
//
// console.log(hello())




// const ollie = {
//   name: "Ollie",
//   age: 27
// }
//
// console.log(ollie)
// console.log(ollie.age)

//
// function Person(name, age, dob) {
//   this.name = name
//   if (age == undefined) {
//     this.age = 19
//   }
//   else {
//     this.age = age
//   }
//   this.birthday = new Date(dob)
//   console.log(typeof this.birthday)
//   this.calculateAge = function() {
//     const diff = Date.now() - this.birthday.getTime()
//     const ageDate = new Date(diff)
//     return Math.abs(ageDate.getUTCFullYear() - 1970)
//   }
// }
//
// const ollie = new Person('Ollie', '9-10-1991')
// const john = new Person('John')
// //
// // console.log(ollie.name)
// // console.log(john)
// console.log(ollie.calculateAge())
