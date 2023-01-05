function* fizzBuzzGenerator(max) {
  // Tu código acá:
  let num = 1

  // while / if ( (condición) ? (si se cumple) : (si no se cumple) )
  while (max ? num <= max : true) { // Si tengo max y num es menor o igual a max, pero si no tengo max, es true y se genera un bucle infinito
    if (num % 3 === 0 && num % 5 === 0) yield "Fizz Buzz"
    else if (num % 3 === 0) yield "Fizz"
    else if (num % 5 === 0) yield "Buzz"
    else yield num
    
    num++
  }
}

module.exports = fizzBuzzGenerator;
