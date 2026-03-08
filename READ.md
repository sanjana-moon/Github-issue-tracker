1️⃣ What is the difference between var, let, and const?
Ans: In JavaScript, var, let and const are three types of keyword that are used to declare variable.
Difference between var, let and const are given below:

    1. Scope: var is a Function-scoped or global-scoped variable that Ignores block scope, let is a Block-scoped variable & const is a Block-scoped variable.

    2. Hoisting: var is Hoisted and initialized as undefined while let is Hoisted but not initialized & const is Hoisted but not initialized.

    3. Reassignability: var	can reassign the variable itself, let also reassign the variable itself but const cannot reassign the variable itself.

    4. Redeclaration: var can be redeclare, let cannot be redeclare and const also cannot redeclare.

    5. Initialization: Initialization of var is Optional,  Initialization of let is also Optional, but  Initialization of const is Required.


2️⃣ What is the spread operator (...)?
Ans: The spread operator (...) is a features of ES6 (2015) that allows an "iterable" (like an array, string or object) to be expanded into individual elements or properties. It is commonly used for copying, merging, or passing elements without mutating the original data.
The (...) expands elements or properties of an array/object. Then creates a copy. But original array/object is not mutated.
    Example:
        const arr1 = [1, 2];
        const arr2 = [3, 4];
        const combined = [...arr1, ...arr2];
        console.log(combined); 
    Output:
        [1, 2, 3, 4]


3️⃣ What is the difference between map(), filter(), and forEach()?
4️⃣ What is an arrow function?
5️⃣ What are template literals?