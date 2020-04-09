

const isMatchingOrder = (existingBook, incomingOrder) => {
  if (existingBook.type !== incomingOrder.type) {
    if (incomingOrder.type === 'sell') {
      if (existingBook.price >= incomingOrder.price) {
        return true
      }
    } else if (existingBook.price <= incomingOrder.price) {
      return true
    }
  }
  return false
}

function reconcileOrder(existingBook, incomingOrder) {

  let updatedBook = [...existingBook]
  let newIncomingOrder = {...incomingOrder}

  for (let i = 0; i < updatedBook.length; i++) {
    if (isMatchingOrder(updatedBook[i], incomingOrder)) {

      if (updatedBook[i].quantity > newIncomingOrder.quantity) {
        updatedBook[i].quantity -= newIncomingOrder.quantity
        if (updatedBook[i].quantity >= newIncomingOrder.quantity) {
          const temporaryOrder = updatedBook.splice(i, 1)
          updatedBook = updatedBook.concat(temporaryOrder)
        }

        return updatedBook.filter(order => order.quantity)
      } else {
        newIncomingOrder.quantity -= updatedBook[i].quantity
        updatedBook[i].quantity = 0
      }
    }
  }

  //   if (existingBook.length === 0) return [incomingOrder] 

  //   for (let i = 0; i < existingBook.length; i++) {
  //     if (isMatchingOrder(existingBook[i], incomingOrder)) {

  //       if (existingBook[i].quantity > incomingOrder)
  //       {
  //         existingBook
  //  }    }
  //  }
  // for loop through array
  // if ismatchingOrder (existingBook[i], incomingOrder)
  // if match
  //update quantities 
  //return filtered quantities  so orders wth 0 aren't in the book

  updatedBook.push(newIncomingOrder)
  
  return updatedBook.filter(orderUpdate => orderUpdate.quantity)
}
  
module.exports = reconcileOrder
