

const matchingOrder = (existingBook, incomingOrder, i) => {
  existingBook[i].type !== incomingOrder.type && existingBook[i].price === incomingOrder.price
  return 
}


const existingMinusIncomingQuantity = (existingBook, incomingOrder, i) => {
  if (existingBook[i].quantity > incomingOrder.quantity) {
    return (existingBook[i].quantity -= incomingOrder.quantity)
  }
}

const incomingMinusExistingQuantity = (existingBook, incomingOrder, i) => {
  incomingOrder.quantity -= existingBook[i].quantity
}

// //////////////////////////////////////////////////////

// const updateQuantityRequired = (existingBook, incomingOrder) => {
//   return (consolidateOrderQuantity && matchingOrder) || (matchingOrder && (existingBook[i].quantity > incomingOrder.quantity)) ? (existingBook[i].quantity - incomingOrder.quantity)
//     : (consolidateOrderQuantity && matchingOrder) || (matchingOrder && (existingBook[i].quantity < incomingOrder.quantity)) ? (incomingOrder.quantity - existingBook[i].quantity)
// }

// const consolidateOrderQuantity = (existingBook) => {
//   (existingBook[0].type === existingBook[1].type) && (existingBook[0].price === existingBook[1].price)
//     ? (existingBook[0].quantity + existingBook[1].quantity)
//     :
//  }

const updateQuantity = (matchingOrder, incomingOrder) => matchingOrder.quantity <= incomingOrder.quantity
  ? { ...incomingOrder, quantity: incomingOrder.quantity - matchingOrder.quantity }
  : { ...matchingOrder, quantity: matchingOrder.quantity - incomingOrder.quantity, }
   
/* function for updateQuantity? assuming the orders are otherwise matching
    Need to do:
      1. (#5) when the existingBook contains a > larger quantity:  existingBook[i].quantity - incomingOrder.quantity
      2. (#6) when the existingBook contains a < smaller quantity: incomingOrder.quantity - existingBook[i].quantity
        3. (#7) add the matching existingBook quantities together: existingBook[0].quantity + existingBook[1].quantity
      4. (#8) do ^ #7, then #5.
      5. (#9) do ^ #7, then #6.

  const updateQuantity = (i) => {
    return (consolidateOrderQuantity && matchingOrder) || (matchingOrder && (existingBook[i].quantity > incomingOrder.quantity)) ? (existingBook[i].quantity - incomingOrder.quantity)
      : (consolidateOrderQuantity && matchingOrder) || (matchingOrder && (existingBook[i].quantity < incomingOrder.quantity)) ? (incomingOrder.quantity - existingBook[i].quantity)


  const consolidateOrderQuantity = (i) => {
    (existingBook[0].type === existingBook[1].type) && (existingBook[0].price === existingBook[1].price) ? (existingBook[0].quantity + existingBook[1].quantity)
  }

      FROM MDN:
      function example(…) {
        return condition1 ? value1
            : condition2 ? value2
            : condition3 ? value3
            : value4;
}
  */

const reconcileOrder = (existingBook, incomingOrder) => {
  let updatedBook = []
  
  // PASSED. 1.
  if (existingBook.length === 0) {
    updatedBook.push(incomingOrder)
    return updatedBook
  }
  for (let i = 0; i < existingBook.length; i++) {
    // PASSED. 2.
    if (existingBook[i].type === incomingOrder.type) {
      updatedBook = updatedBook.concat(existingBook)
      updatedBook.push(incomingOrder)
      return updatedBook
    }

    // PASSED. 3.
    if (existingBook[i].type !== incomingOrder.type
      && existingBook[i].quantity !== incomingOrder.quantity
      || existingBook[i].price !== incomingOrder.price) {
      updatedBook = updatedBook.concat(existingBook)
      updatedBook.push(incomingOrder)
      return updatedBook
    }

    // PASSED. 4.
    if (matchingOrder) {
      updatedBook = updatedBook.concat(existingBook)  
      updatedBook.shift(existingBook)
      return updatedBook
    }

    // ////////////////////////////////////////////////


    // TO DO 5. fulfills an order and reduces the matching order
    //      when the book contains a matching order of a larger quantity

    if (matchingOrder() && updateQuantity()) {
      updatedBook = [...existingBook[i], updateQuantity ]
      updatedBook.push(existingBook)
      return updatedBook
    }


    // updatedBook = updatedBook.concat(existingBook)
    // updatedBook.push(incomingOrder)

    // if (matchingOrder && existingBook[i].quantity > incomingOrder.quantity) {

    //   updateQuantity = (existingBook[i].quantity -= incomingOrder.quantity)

    //   updatedBook = updatedBook.concat(existingBook)
    
    //   return updatedBook
    
    // }

    // /////////////////////////////////////////////////

    // TO DO 6. partially fulfills an order, removes the matching order and adds the remainder
    // of the order to the book when the book contains a matching order of a smaller quantity
    if (matchingOrder && existingBook[i].quantity < incomingOrder.quantity) {
      updatedBook = [...existingBook[i], (incomingOrder.quantity - existingBook[i].quantity)]
      updatedBook = updatedBook.concat(existingBook)  
      return updatedBook
    }

    // TO DO 7. uses two existing orders to completely fulfill an order, removing the matching orders from the book
    // ..... effectively, add the quantities of the two otherwise matching existing orders INTO ONE ORDER, remove it with the matching incomingOrder,
    // .............and return the remaining existingBook order.
    if (existingBook[i].type === existingBook[i].type
      && existingBook[i].quantity !== existingBook[i].quantity) {
      
      
      let quantityCalculation = (existingBook[i].slice(1)) - (existingBook[1].slice(i))


      updatedBook = updatedBook.shift(updatedQuantity)

      updatedBook = updatedBook.concat(existingBook)  
      return updatedBook
    }

    // TO DO 8. uses two existing orders to completely fulfill an order,
    // removing the first matching order from the book and reducing the second
    if (existingBook[i].type !== incomingOrder.type
      && existingBook[i].quantity === incomingOrder.quantity) {
      
      updatedBook = updatedBook.concat(existingBook)
      return updatedBook
    }

    // TO DO 9. uses two existing orders to partially fulfill an order,
    // removing the matching orders from the book and reducing the incoming order before adding it to the book
    if (existingBook[i].type !== incomingOrder.type
      && existingBook[i].quantity === incomingOrder.quantity) {
      
      updatedBook = updatedBook.concat(existingBook)  
      return updatedBook
    }
  }
}




module.exports = reconcileOrder