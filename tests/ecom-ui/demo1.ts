//String
let message1 : string = "hi";
// message = "2"; // Cannot be assigned to another datatype
console.log('message:', message1);
//Number
let age1: number = 20;
console.log('age:', age1);
//Boolean
let isActive : boolean = false;
//Array
let numArray: number[] = [1,2,3];
//Any
let data: any = "Thihs could be anything";
data = 2;
console.log('data:', data);

//Functions:
function add(a: number, b: number) : number{
    return a+b;
}
console.log("add:", add(2, 3));

//Objects: 
let user :{name: string, age: number, location: string}= {
    name : "Bob",
    age : 24,
    location : "Delhi",
}
user.location = "Hyderabad";

console.log('user:', user);

