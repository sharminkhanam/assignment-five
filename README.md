#1 What is the difference between var, let, and const?

Ansewer :  

var : 1. old way to declear a variable.
      2. function scoped -> avilable inside a function.
      3. can be redeclared and updated .
      4. Hoisting applies -> declaration moves to the top automatically.
let : 1. New ES6 declaration.
      2. Block scoped -> only avilable inside `{}`.
      3. Cannot be redeclared in the same block but value cabn be updated.
const : 1. Contant variable.
        2. Value cannot be changed.
        3. Bolock scoped.
        4. For object or arrays , reference cannot change byt internal data can.


#2 Spread Operator (...)

Answer : ...is called the spread operator.
	It extands elements of an array or properties of an object

#3 What is the difference between map(), filter(), and forEach()?
Answer : map () : 
                    Purpose : Transform each element in an array into a new element.
                    Returns : A new array of the same length.
                    Original array: Remains unchanged

        filter() : 
                    Purpose : Select elements form an array that satisfy a condition.
                    Returns : A new array with only the elemnets that pass the test.
                    Original array: Remains unchanged



        forEach() :
                    Purpose : Execute a function for each element in an array.
                    Returns : undefinned (does not return a new array).
                    Original array: can be modified if desired, but not replaced automatically.
       

 #4 What is an arrow function?
 Answer : Less code than aregular function,
          Automatically binds this to the surrounding context


#5 What are template literals?
Answer : Template literals are settings enclosed bakticks `.
         Variables or expressions can be embedded using ${},
         Multiline srtings are easier






          