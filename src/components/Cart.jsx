import React from "react"
import { XIcon } from "@heroicons/react/outline"

function Cart({ isOpen, closeCart, cartItems, removeFromCart }) {
  if (!isOpen) return null

  const subtotal = cartItems.reduce((sum, item) => sum + item.Price * item.quantity, 0)

  return (
    <div className="fixed inset-y-0 right-0 w-[400px] bg-white shadow-xl z-50 flex flex-col">
      <div className="flex justify-between items-center p-6 border-b">
        <h2 className="text-lg font-medium">Shopping Cart</h2>
        <button onClick={closeCart}>
          <XIcon className="h-6 w-6 text-gray-400" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-4 mb-6">
            <img
              src={`https://interview.gdev.gosbfy.com/api/files/${item.collectionId}/${item.id}/${item.image}`}
              alt={item.Name}
              className="w-20 h-20 object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="font-medium">{item.Name}</h3>
                <button onClick={() => removeFromCart(item.id)}>
                  <XIcon className="h-4 w-4 text-gray-400" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-1">Qty: {item.quantity}</p>
              <p className="text-sm mt-1">Price: ${item.Price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 border-t">
        <div className="flex justify-between mb-4">
          <span className="font-medium">Subtotal:</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <button className="w-full bg-white border border-gray-300 text-gray-900 py-3 mb-3">View cart</button>
        <button className="w-full bg-black text-white py-3">Checkout</button>
      </div>
    </div>
  )
}

export default Cart