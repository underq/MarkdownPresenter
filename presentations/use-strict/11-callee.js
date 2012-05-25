function factorialWrapper() {  
   return function(n) {  
      if (n <= 1)  
         return 1;  
      return n * arguments.callee(n - 1);  
   };  
}  
  
console.log( factorialWrapper()(5) );