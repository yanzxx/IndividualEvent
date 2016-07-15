//var a = {n: 1}
//a.x = a = {n: 2}
//console.log(b.x)
//console.log(a);
//console.log('2222');
var a = {n: 1}
var b = a;
a = {n: 2};
a.x = a;
console.log(a.x);
console.log(b.x)