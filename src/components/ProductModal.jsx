import React, { useState } from "react"
import { XIcon, HeartIcon } from "@heroicons/react/outline"
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/solid"

function ProductModal({ product, isOpen, onClose, addToCart, isFavorite, toggleFavorite }) {
  const [quantity, setQuantity] = useState(1)

  if (!isOpen || !product) return null

  const imageUrl = `https://interview.gdev.gosbfy.com/api/files/${product.collectionId}/${product.id}/${product.image}`

  // Check if the product is in stock
  const isInStock = product.inStock !== false // Assuming inStock is a boolean field from the backend

  return (
    <div className="fixed inset-0 bg-black/50  flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-4xl relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 transition-transform duration-200 hover:scale-110"
        >
          <XIcon className="h-6 w-6 text-gray-400" />
        </button>

        <div className="grid md:grid-cols-2">
          <div className="bg-gray-100 p-8">
            <img src={imageUrl || "/placeholder.svg"} alt={product.Name} className="w-full h-full object-cover" />
          </div>

          <div className="p-8">
            <h2 className="text-2xl font-medium">{product.Name}</h2>
            <p className="text-2xl mt-4">${product.Price.toFixed(2)}</p>

            <div className="mt-6">
              <p className="text-sm">
                Available:{" "}
                <span className={isInStock ? "text-green-500" : "text-red-500"}>
                  {isInStock ? "in-stock" : "out of stock"}
                </span>
              </p>
              <p className="mt-4 text-gray-600">{product.Desc}</p>
            </div>

            <div className="flex items-center gap-4 mt-8">
              <div className="flex border border-gray-300">
                <button
                  className="px-4 py-2 border-r border-gray-300 transition-colors duration-200 hover:bg-gray-100"
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                >
                  -
                </button>
                <span className="px-6 py-2">{quantity}</span>
                <button
                  className="px-4 py-2 border-l border-gray-300 transition-colors duration-200 hover:bg-gray-100"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>

              <button
                onClick={() => {
                  addToCart({ ...product, quantity })
                  onClose()
                }}
                className="flex-1 bg-black text-white py-3 px-6 hover:bg-gray-900 transition-colors duration-200"
                disabled={!isInStock}
              >
                {isInStock ? "Add to Cart" : "Out of Stock"}
              </button>

              <button
                onClick={toggleFavorite}
                className="border border-gray-300 p-3 transition-colors duration-200 hover:bg-gray-100"
              >
                {isFavorite ? <HeartSolidIcon className="h-6 w-6 text-red-500" /> : <HeartIcon className="h-6 w-6" />}
              </button>
            </div>

            <div className="mt-8 space-y-2 text-sm text-gray-600">
              <p>SKU: {product.SKU}</p>
              <p>Categories: {product.Category}</p>
              <p>Tags: {product.tag}</p>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="font-medium">Share this item:</p>
              {/* Add social sharing buttons here if needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductModal

