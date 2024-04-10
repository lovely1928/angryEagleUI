const users = [
  {name:'lovely',age:32},
  {name:'12',age:14},
  {name:'aa',age:52},
  {name:'ss',age:52},
  {name:'dd',age:14},
  {name:'xx',age:3},
  {name:'cc',age:32},
  {name:'gg',age:8},
]


// to findout no. of users having ages
// const ages = Array.from(new Set(users.map(x=>x.age)))
// console.log('ages',ages)
const final = users.reduce((a,c)=>{
  if(a[c.age]){ 
    a[c.age]   = a[c.age] +1
  }else{
    a[c.age]=1
  }
  return a
},{})
console.log(final)

const lessThan30 = users.reduce((a,c)=>{
  if(c.age<30){
    a.push(c.name)
  }
  return a
},[])

console.log(lessThan30)