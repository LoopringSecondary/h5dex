const storeP2POrder = (order) => {
  const p2pOrders = localStorage.p2pOrders ? JSON.parse(localStorage.p2pOrders) : []
  p2pOrders.push(order)
  localStorage.p2pOrders = JSON.stringify(p2pOrders)
}

const getP2POrder = (hash) => {
  const p2pOrders = localStorage.p2pOrders ? JSON.parse(localStorage.p2pOrders) : []
  return p2pOrders.find(order=> order.hash === hash)

}

export default {
  storeP2POrder,
  getP2POrder
}
